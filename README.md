# Wall Calendar

A polished, interactive calendar component built with Next.js 15, TypeScript, and Tailwind CSS.

**[Live Demo] - https://wall-calendarr-gos1.vercel.app/**

---

## Features

- **Auto-theming** - canvas samples each month's floral image and derives the full UI palette from its dominant color. Every month looks different without touching a config file.
- **Date range selection** - click start, click end. Pill-shaped highlight with smooth range caps.
- **Notes** - per-month notes that persist to localStorage. Download as `.txt`.
- **Holiday markers** - 60+ Indian and global holidays with tooltips.
- **Keyboard accessible** - arrow keys navigate the grid, Enter selects, full ARIA grid pattern.
- **Responsive** - side-by-side on desktop, stacked on mobile.

---

## Running locally

```bash
git clone https://github.com/highonicee/wall-calendar.git
cd wall-calendar
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Requires Node 18+.

Add 12 JPEG images to `public/images/` named `january.jpeg` through `december.jpeg`. The auto-theme system works best with images that have a clear dominant color.

---

## Tech

Next.js 15 · TypeScript · Tailwind CSS · HTML Canvas API · localStorage · no UI libraries · no date libraries.
