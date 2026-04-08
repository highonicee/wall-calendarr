// app/utils/colorExtractor.ts
// Samples a floral image using <canvas>, clusters the colors,
// and returns a full MonthTheme derived purely from the image.

import { MonthTheme, THEMES } from "./themes";

type RGB = { r: number; g: number; b: number };

// Sample NxN grid of pixels from an image element
function samplePixels(img: HTMLImageElement, samples = 20): RGB[] {
  const canvas = document.createElement("canvas");
  canvas.width = samples;
  canvas.height = samples;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  ctx.drawImage(img, 0, 0, samples, samples);
  const data = ctx.getImageData(0, 0, samples, samples).data;

  const pixels: RGB[] = [];
  for (let i = 0; i < data.length; i += 4) {
    // Skip near-white and near-black pixels — not useful for theming
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const brightness = (r + g + b) / 3;
    if (brightness > 240 || brightness < 15) continue;
    pixels.push({ r, g, b });
  }
  return pixels;
}

// Find the most "saturated" color from sampled pixels
// Saturation = how colorful a pixel is (not grey)
function findDominant(pixels: RGB[]): RGB {
  let best = pixels[0] ?? { r: 100, g: 100, b: 100 };
  let bestScore = 0;

  for (const { r, g, b } of pixels) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max === 0 ? 0 : (max - min) / max;
    const brightness = (r + g + b) / 3 / 255;
    // Score = saturation heavily weighted, moderate brightness preferred
    const score = saturation * 2 + (1 - Math.abs(brightness - 0.5));
    if (score > bestScore) { bestScore = score; best = { r, g, b }; }
  }
  return best;
}

// Determine if a color is "dark" (so we can flip text colors)
function isDark(color: RGB): boolean {
  // Perceived luminance formula
  return (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) < 90;
}

// Convert RGB to hex string
function toHex({ r, g, b }: RGB): string {
  return `#${[r, g, b].map(v => v.toString(16).padStart(2, "0")).join("")}`;
}

// Mix two RGB colors at a given ratio (0 = all a, 1 = all b)
function mix(a: RGB, b: RGB, t: number): RGB {
  return {
    r: Math.round(a.r * (1 - t) + b.r * t),
    g: Math.round(a.g * (1 - t) + b.g * t),
    b: Math.round(a.b * (1 - t) + b.b * t),
  };
}

// Lighten a color toward white
function lighten(c: RGB, amount: number): RGB {
  return mix(c, { r: 255, g: 255, b: 255 }, amount);
}

// Darken a color toward black
function darken(c: RGB, amount: number): RGB {
  return mix(c, { r: 0, g: 0, b: 0 }, amount);
}

// Build a complete MonthTheme from a single dominant color
function buildThemeFromColor(accent: RGB, dark: boolean): MonthTheme {
  const accentHex    = toHex(accent);
  const lightAccent  = toHex(lighten(accent, 0.72));  // very pale — backgrounds
  const softAccent   = toHex(lighten(accent, 0.50));  // medium — range highlight
  const deepAccent   = toHex(darken(accent, 0.30));   // deep — selected bg
  const textBase     = dark ? "#f0f0f0" : toHex(darken(accent, 0.55));
  const subtleText   = dark ? "#aaaaaa" : toHex(darken(accent, 0.25));
  const pageBgRgb    = dark ? darken(accent, 0.82) : lighten(accent, 0.88);
  const cardBgRgb    = dark ? darken(accent, 0.78) : lighten(accent, 0.94);
  const pageBg       = toHex(pageBgRgb);
  const cardBg       = toHex(cardBgRgb);

  return {
    pageBg,
    cardBg,
    gradientTo: cardBg,
    monthColor:      textBase,
    yearColor:       subtleText,
    arrowColor:      softAccent,
    arrowHover:      textBase,
    weekdayColor:    subtleText,
    dayDefault:      textBase,
    dayHover:        lightAccent,
    todayBorder:     accentHex,
    todayText:       textBase,
    selectedBg:      deepAccent,
    selectedText:    dark ? textBase : "#ffffff",
    rangeBg:         softAccent,
    rangeText:       dark ? textBase : toHex(darken(accent, 0.60)),
    rangeLabel:      accentHex,
    noteLabel:       accentHex,
    noteBorder:      softAccent,
    noteFocusRing:   softAccent,
    notePlaceholder: softAccent,
    noteText:        textBase,
    noteBg:          dark ? toHex(darken(accent, 0.70)) : toHex(lighten(accent, 0.90)),
    saveBtnBorder:   softAccent,
    saveBtnText:     dark ? textBase : toHex(darken(accent, 0.40)),
    saveBtnHoverBg:  lightAccent,
    charCount:       softAccent,
  };
}

// Main export — loads the image, samples it, returns a derived theme
// Falls back to the hardcoded theme if anything fails
export async function extractThemeFromImage(
  src: string,
  fallbackMonth: number
): Promise<MonthTheme> {
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const pixels = samplePixels(img, 24);
        if (pixels.length < 10) {
          resolve(THEMES[fallbackMonth]);
          return;
        }
        const dominant = findDominant(pixels);
        const dark = isDark(dominant);
        resolve(buildThemeFromColor(dominant, dark));
      } catch {
        resolve(THEMES[fallbackMonth]);
      }
    };

    img.onerror = () => resolve(THEMES[fallbackMonth]);
    img.src = src;
  });
}