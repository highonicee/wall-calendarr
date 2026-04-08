// date logic 

export const MONTH_NAMES = [
  "January", "February", "March",    "April",
  "May",     "June",     "July",     "August",
  "September","October", "November", "December",
];

export const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


export type CalendarCell = {
  day:         number;
  isCurrentMonth: boolean;
};

export function getMonthMatrix(year: number, month: number): CalendarCell[][] {
  const daysInMonth    = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // how many days the previous month has
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: CalendarCell[] = [];

  //  end of the previous month
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
  }

  //current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isCurrentMonth: true });
  }

  // start of the next month
  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: nextDay++, isCurrentMonth: false });
  }

  const matrix: CalendarCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    matrix.push(cells.slice(i, i + 7));
  }

  return matrix;
}

export function isToday(year: number, month: number, day: number): boolean {
  const now = new Date();
  return (
    now.getFullYear() === year &&
    now.getMonth()    === month &&
    now.getDate()     === day
  );
}

export function isInRange(
  day: number,
  startDay: number | null,
  endDay:   number | null
): boolean {
  if (startDay === null || endDay === null) return false;
  const low  = Math.min(startDay, endDay);
  const high = Math.max(startDay, endDay);
  return day >= low && day <= high;
}