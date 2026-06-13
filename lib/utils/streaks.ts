/** Calculate the current streak given an array of ISO date strings (YYYY-MM-DD) */
export function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const sorted = Array.from(new Set(dates)).sort().reverse(); // newest first
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = toDateString(today);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = toDateString(yesterday);

  // Streak must start from today or yesterday
  if (sorted[0] !== todayStr && sorted[0] !== yesterdayStr) return 0;

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diffDays = Math.round((prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/** Format a Date to YYYY-MM-DD */
export function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}
