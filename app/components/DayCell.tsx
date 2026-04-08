"use client";

import { MonthTheme } from "../utils/themes";
import { MONTH_NAMES } from "../utils/calendar";

type Props = {
  day: number | null;
  month: number;
  year: number;
  isToday: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  holiday: string | null;
  onClick: (day: number) => void;
  theme: MonthTheme;
};

export default function DayCell({
  day, month, year, isToday, isStart, isEnd,
  isInRange, holiday, onClick, theme,
}: Props) {
  if (day === null) {
    return <div role="gridcell" aria-hidden="true" className="h-12" />;
  }

  const isSelected = isStart || isEnd;

  const dateLabel    = `${day} ${MONTH_NAMES[month]} ${year}`;
  const stateLabel   = isStart  ? ", selected as start date"
                     : isEnd    ? ", selected as end date"
                     : isInRange ? ", within selected range"
                     : isToday  ? ", today"
                     : "";
  const holidayLabel = holiday ? `, holiday: ${holiday}` : "";
  const ariaLabel    = `${dateLabel}${stateLabel}${holidayLabel}`;

  const cellStyle: React.CSSProperties = isSelected
    ? { backgroundColor: theme.selectedBg, color: theme.selectedText, borderRadius: "9999px" }
    : isInRange
    ? { backgroundColor: theme.rangeBg,    color: theme.rangeText,    borderRadius: "4px"    }
    : isToday
    ? { border: `1.5px solid ${theme.todayBorder}`, color: theme.todayText, borderRadius: "9999px" }
    : { color: theme.dayDefault };

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if ((e.key === "Enter" || e.key === " ") && day !== null) {
      e.preventDefault();
      onClick(day); 
    }
  }

  return (
    <div role="gridcell" className="relative h-12 flex flex-col items-center justify-start pt-1 group">
      <div
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-pressed={isSelected}
        aria-current={isToday ? "date" : undefined}
        className="w-8 h-8 flex items-center justify-center text-sm cursor-pointer
                   select-none transition-all duration-150 font-light tracking-wide
                   focus:outline-none focus-visible:ring-2"
        style={cellStyle}
        onClick={() => onClick(day)}
        onKeyDown={handleKeyDown}
        onMouseEnter={e => {
          if (!isSelected && !isInRange && !isToday) {
            (e.currentTarget as HTMLDivElement).style.backgroundColor = theme.dayHover;
            (e.currentTarget as HTMLDivElement).style.borderRadius = "9999px";
          }
        }}
        onMouseLeave={e => {
          if (!isSelected && !isInRange && !isToday) {
            (e.currentTarget as HTMLDivElement).style.backgroundColor = "";
            (e.currentTarget as HTMLDivElement).style.borderRadius = "";
          }
        }}
      >
        {day}
      </div>

      {holiday && (
        <div className="relative flex justify-center mt-0.5">
          <div
            aria-hidden="true"
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: theme.todayBorder, opacity: 0.85 }}
          />
          <div
            role="tooltip"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50
                       px-2 py-1 rounded-lg pointer-events-none
                       opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                       transition-opacity duration-200"
            style={{
              backgroundColor: theme.selectedBg,
              color:           theme.selectedText,
              fontSize:        "10px",
              lineHeight:      "1.3",
              boxShadow:       "0 4px 12px rgba(0,0,0,0.18)",
              maxWidth:        "140px",
              whiteSpace:      "normal",
              textAlign:       "center",
            }}
          >
            {holiday}
            <div
              aria-hidden="true"
              className="absolute left-1/2 -translate-x-1/2 top-full"
              style={{
                width:       0,
                height:      0,
                borderLeft:  "4px solid transparent",
                borderRight: "4px solid transparent",
                borderTop:   `4px solid ${theme.selectedBg}`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}