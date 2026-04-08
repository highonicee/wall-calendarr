"use client";

import { useRef, useCallback } from "react";
import { WEEKDAY_LABELS, getMonthMatrix, isToday, isInRange, MONTH_NAMES } from "../utils/calendar";
import { MonthTheme } from "../utils/themes";
import { getHoliday, HOLIDAYS } from "../utils/holidays";
import DayCell from "./DayCell";

type Props = {
  year: number;
  month: number;
  startDay: number | null;
  endDay: number | null;
  onDayClick: (day: number) => void;
  theme: MonthTheme;
};

export default function CalendarGrid({
  year, month, startDay, endDay, onDayClick, theme,
}: Props) {
  const matrix  = getMonthMatrix(year, month);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleGridKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const grid = gridRef.current;
    if (!grid) return;

    const cells = Array.from(
      grid.querySelectorAll<HTMLDivElement>('[role="button"][tabindex="0"]')
    );
    const focused       = document.activeElement as HTMLElement;
    const currentIndex  = cells.indexOf(focused as HTMLDivElement);
    if (currentIndex === -1) return;

    const moves: Record<string, number> = {
      ArrowRight:  1,
      ArrowLeft:  -1,
      ArrowDown:   7,
      ArrowUp:    -7,
      Home:       -currentIndex,
      End:         cells.length - 1 - currentIndex,
    };

    if (!(e.key in moves)) return;
    e.preventDefault();

    const nextIndex = Math.max(0, Math.min(currentIndex + moves[e.key], cells.length - 1));
    cells[nextIndex]?.focus();
  }, []);

  return (
    <div className="w-full">

      {/* Weekday column headers */}
      <div role="row" className="grid grid-cols-7 mb-2" aria-label="Days of the week">
        {WEEKDAY_LABELS.map(label => (
          <div
            key={label}
            role="columnheader"
            aria-label={label}
            className="text-center text-xs font-semibold uppercase tracking-widest py-2"
            style={{ color: theme.weekdayColor }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        className="mb-2"
        style={{ height: "1px", backgroundColor: theme.noteBorder, opacity: 0.5 }}
      />

      {/* Date grid */}
      <div
        ref={gridRef}
        role="grid"
        aria-label={`Calendar for ${MONTH_NAMES[month]} ${year}`}
        onKeyDown={handleGridKeyDown}
      >
        {matrix.map((week, wi) => (
          <div key={wi} role="row" className="grid grid-cols-7">
            {week.map((day, di) => (
              <DayCell
                key={di}
                day={day}
                month={month}
                year={year}
                isToday={day !== null && isToday(year, month, day)}
                isStart={day === startDay}
                isEnd={day === endDay}
                isInRange={day !== null && isInRange(day, startDay, endDay)}
                holiday={day !== null ? getHoliday(month, day) : null}
                onClick={onDayClick}
                theme={theme}
              />
            ))}
          </div>
        ))}
      </div>

      <HolidayLegend month={month} theme={theme} />
    </div>
  );
}

function HolidayLegend({ month, theme }: { month: number; theme: MonthTheme }) {
  const entries = Object.entries(HOLIDAYS[month] ?? {});
  if (entries.length === 0) return null;

  return (
    <div
      className="mt-5 pt-4"
      style={{ borderTop: `1px solid ${theme.noteBorder}` }}
      aria-label="Holidays this month"
    >
      <p
        aria-hidden="true"
        className="text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: theme.weekdayColor }}
      >
        Holidayss
      </p>
      <ul className="flex flex-col gap-1" role="list">
        {entries.map(([day, name]) => (
          <li key={day} className="flex items-center gap-2">
            <div
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: theme.todayBorder }}
            />
            <span className="text-xs" style={{ color: theme.yearColor }}>
              <span className="font-semibold mr-1" style={{ color: theme.monthColor }}>
                {day}
              </span>
              {name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}