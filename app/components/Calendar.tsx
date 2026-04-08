"use client";

import { useState, useEffect, useRef } from "react";
import { MONTH_NAMES } from "../utils/calendar";
import { THEMES, MonthTheme } from "../utils/themes";
import { extractThemeFromImage } from "../utils/colorExtractor";
import HeaderImage from "./HeaderImage";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";

const MONTH_IMAGE_NAMES = [
  "january", "february", "march",      "april",
  "may",     "june",     "july",       "august",
  "september","october", "november",   "december",
];

export default function Calendar({
  onMonthChange,
}: {
  onMonthChange?: (m: number) => void;
}) {
  const today = new Date();

  // Calendar state: which month/year is currently being viewed, and which days are selected
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [startDay,  setStartDay]  = useState<number | null>(null);
  const [endDay,    setEndDay]    = useState<number | null>(null);

  //Image crossfade state: which month is currently fully visible, which month is incoming, and the fade progress 

  const [displayMonth,  setDisplayMonth]  = useState(today.getMonth()); // fully visible
  const [incomingMonth, setIncomingMonth] = useState<number | null>(null); // fading in
  const [imageFade,     setImageFade]     = useState(0); // 0 = incoming invisible, 1 = fully visible

  //  Theme crossfade state
  const [currentTheme, setCurrentTheme] = useState<MonthTheme>(THEMES[today.getMonth()]);
  const [nextTheme,    setNextTheme]    = useState<MonthTheme | null>(null);
  const [themeFade,    setThemeFade]    = useState(0);

  // Prevents stale async results when user navigates quickly
  const extractionRef = useRef<number>(0);

  //Crossfade trigger: fires whenever viewMonth changes 
  useEffect(() => {
    const id = ++extractionRef.current;
    const src = `/images/${MONTH_IMAGE_NAMES[viewMonth]}.jpeg`;

    // Immediately mount the incoming image at opacity 0
    setIncomingMonth(viewMonth);
    setImageFade(0);
    setThemeFade(0);
    setNextTheme(null);

    // Sample canvas colors for the new theme
    extractThemeFromImage(src, viewMonth).then(extracted => {
      if (id !== extractionRef.current) return;

      // Mount new theme layer at opacity 0
      setNextTheme(extracted);

      // Double rAF ensures the browser has painted the opacity-0 layer
      // before we start the transition — without this you get a flash
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Start both fades simultaneously
          setImageFade(1);
          setThemeFade(1);
        });
      });

      // After transition completes, clean up both layers
      setTimeout(() => {
        if (id !== extractionRef.current) return;

        // Promote incoming → display, clear overlay
        setDisplayMonth(viewMonth);
        setIncomingMonth(null);
        setImageFade(0);

        // Promote next → current, clear overlay
        setCurrentTheme(extracted);
        setNextTheme(null);
        setThemeFade(0);
      }, 750);
    });
  }, [viewMonth]);

  // The theme components should use blends toward nextTheme during transition
  const activeTheme = nextTheme ?? currentTheme;

  // Day selection
  function handleDayClick(day: number) {
    if (startDay === null || (startDay !== null && endDay !== null)) {
      setStartDay(day);
      setEndDay(null);
    } else {
      if (day !== startDay) setEndDay(day);
    }
  }

  // Month navigation 
  function prevMonth() {
    const newMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    const newYear  = viewMonth === 0 ? viewYear - 1 : viewYear;
    setViewMonth(newMonth);
    setViewYear(newYear);
    onMonthChange?.(newMonth);
    setStartDay(null);
    setEndDay(null);
  }

  function nextMonth() {
    const newMonth = viewMonth === 11 ? 0 : viewMonth + 1;
    const newYear  = viewMonth === 11 ? viewYear + 1 : viewYear;
    setViewMonth(newMonth);
    setViewYear(newYear);
    onMonthChange?.(newMonth);
    setStartDay(null);
    setEndDay(null);
  }

  // ARIA label helpers
  const monthLabel     = `${MONTH_NAMES[viewMonth]} ${viewYear}`;
  const prevMonthLabel = viewMonth === 0
    ? `${MONTH_NAMES[11]} ${viewYear - 1}`
    : `${MONTH_NAMES[viewMonth - 1]} ${viewYear}`;
  const nextMonthLabel = viewMonth === 11
    ? `${MONTH_NAMES[0]} ${viewYear + 1}`
    : `${MONTH_NAMES[viewMonth + 1]} ${viewYear}`;


  const TRANSITION = "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)";


  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden relative"
      style={{
        boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
      }}
    >

      {/* Background theme layers */}

      {/* Layer 1: current theme  always fully visible underneath */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl"
        style={{ background: currentTheme.cardBg }}
      />

      {/* Layer 2: incoming theme fades in on top */}
      {nextTheme && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl"
          style={{
            background:  nextTheme.cardBg,
            opacity:     themeFade,
            transition:  TRANSITION,
          }}
        />
      )}

     
      <div className="relative z-10">

        {/* Image crossfade container  */}
       
        <div className="relative w-full h-52 sm:h-72 rounded-t-2xl overflow-hidden">

          {/* Current image*/}
          <div
            className="absolute inset-0"
            style={{
              opacity:    incomingMonth !== null ? 1 - imageFade : 1,
              transition: incomingMonth !== null ? TRANSITION : "none",
            }}
          >
            <HeaderImage month={displayMonth} />
          </div>

          {/* Incoming image*/}
          {incomingMonth !== null && (
            <div
              className="absolute inset-0"
              style={{
                opacity:    imageFade,
                transition: TRANSITION,
              }}
            >
              <HeaderImage month={incomingMonth} />
            </div>
          )}
        </div>

        {/* Gradient bridge: image then card background */}
        <div
          className="h-8 -mt-8"
          style={{
            background: `linear-gradient(to bottom, transparent, ${activeTheme.cardBg})`,
            transition: `background ${TRANSITION}`,
          }}
        />

        {/*Month navigation  */}
<div
  role="navigation"
  aria-label="Month navigation"
  className="flex items-center justify-between px-8 pt-4 pb-4"
>
  <button
    onClick={prevMonth}
    aria-label={`Go to previous month, ${prevMonthLabel}`}
    className="w-9 h-9 flex items-center justify-center rounded-full
               text-lg focus:outline-none focus-visible:ring-2"
    style={{
      color:      activeTheme.arrowColor,
      transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
    }}
    onMouseEnter={e => (e.currentTarget.style.color = activeTheme.arrowHover)}
    onMouseLeave={e => (e.currentTarget.style.color = activeTheme.arrowColor)}
  >
    ←
  </button>

  {/* Centre column: month name + year + Today button */}
  <div className="flex flex-col items-center gap-1" aria-live="polite" aria-atomic="true">
    <h2
      className="text-2xl tracking-tight"
      style={{
        color:      activeTheme.monthColor,
        fontFamily: "Georgia, serif",
        fontWeight: 400,
        transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {MONTH_NAMES[viewMonth]}
    </h2>
    <p
      className="text-xs tracking-widest uppercase"
      style={{
        color:      activeTheme.yearColor,
        transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {viewYear}
    </p>

    {/* Today button  */}
    {(viewMonth !== today.getMonth() || viewYear !== today.getFullYear()) && (
      <button
        onClick={() => {
          setViewMonth(today.getMonth());
          setViewYear(today.getFullYear());
          onMonthChange?.(today.getMonth());
          setStartDay(null);
          setEndDay(null);
        }}
        aria-label="Go to current month"
        className="text-xs px-3 py-0.5 rounded-full border transition-all duration-200 mt-0.5"
        style={{
          borderColor: activeTheme.todayBorder,
          color:       activeTheme.todayText,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = activeTheme.dayHover;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "";
        }}
      >
        Today
      </button>
    )}
  </div>

  <button
    onClick={nextMonth}
    aria-label={`Go to next month, ${nextMonthLabel}`}
    className="w-9 h-9 flex items-center justify-center rounded-full
               text-lg focus:outline-none focus-visible:ring-2"
    style={{
      color:      activeTheme.arrowColor,
      transition: "color 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
    }}
    onMouseEnter={e => (e.currentTarget.style.color = activeTheme.arrowHover)}
    onMouseLeave={e => (e.currentTarget.style.color = activeTheme.arrowColor)}
  >
    →
  </button>
</div>

        {/* ── Calendar grid + Notes ───────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 px-8 pb-10 pt-0">

          <div className="flex-1">
            <CalendarGrid
              year={viewYear}
              month={viewMonth}
              startDay={startDay}
              endDay={endDay}
              onDayClick={handleDayClick}
              theme={activeTheme}
            />

            {startDay && (
              <p
                className="mt-4 text-xs text-center tracking-wide"
                style={{
                  color:      activeTheme.rangeLabel,
                  transition: `color 0.7s cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
                aria-live="polite"
                aria-atomic="true"
              >
                {endDay
                  ? `${MONTH_NAMES[viewMonth]} ${Math.min(startDay, endDay)} – ${Math.max(startDay, endDay)}`
                  : `${MONTH_NAMES[viewMonth]} ${startDay} — pick an end date`}
              </p>
            )}
          </div>

          <div className="lg:w-44 xl:w-52 lg:pt-1">
            <NotesPanel
              monthLabel={monthLabel}
              theme={activeTheme}
            />
          </div>

        </div>
      </div>
    </div>
  );
}