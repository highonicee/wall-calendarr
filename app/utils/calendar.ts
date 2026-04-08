//  date logic

export const MONTH_NAMES = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

export const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// returns a 2D array representing the month grid
// null = empty cell (before 1st or after last day)
export function getMonthMatrix(year: number, month: number): (number | null)[][] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const cells: (number | null)[] = [];

  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const matrix: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    matrix.push(cells.slice(i, i + 7));
  }
  return matrix;
}

export function isToday(year: number, month: number, day: number): boolean {
  const now = new Date();
  return now.getFullYear() === year && now.getMonth() === month && now.getDate() === day;
}

export function isInRange(day: number, startDay: number | null, endDay: number | null): boolean {
  if (startDay === null || endDay === null) return false;
  const low = Math.min(startDay, endDay);
  const high = Math.max(startDay, endDay);
  return day >= low && day <= high;
}