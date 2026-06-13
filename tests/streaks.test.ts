import { describe, it, expect } from 'vitest';
import { calculateStreak, toDateString } from '../lib/utils/streaks';

describe('Streak Calculation', () => {
  it('returns 0 for empty dates', () => {
    expect(calculateStreak([])).toBe(0);
  });

  it('returns 1 for today only', () => {
    const today = toDateString(new Date());
    expect(calculateStreak([today])).toBe(1);
  });

  it('returns 2 for today + yesterday', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    expect(calculateStreak([toDateString(today), toDateString(yesterday)])).toBe(2);
  });

  it('returns 1 for yesterday only (still valid streak start)', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(calculateStreak([toDateString(yesterday)])).toBe(1);
  });

  it('returns 0 if most recent date is 2+ days ago', () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    expect(calculateStreak([toDateString(twoDaysAgo)])).toBe(0);
  });

  it('handles duplicates correctly', () => {
    const today = toDateString(new Date());
    expect(calculateStreak([today, today, today])).toBe(1);
  });

  it('counts a 5-day streak correctly', () => {
    const dates: string[] = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(toDateString(d));
    }
    expect(calculateStreak(dates)).toBe(5);
  });

  it('breaks streak on gap', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    expect(calculateStreak([toDateString(today), toDateString(yesterday), toDateString(threeDaysAgo)])).toBe(2);
  });
});
