import { describe, it, expect } from 'vitest';
import { getLevelForXP, getProgressToNextLevel } from '../lib/utils/xp';

describe('XP & Level System', () => {
  it('starts at Level 1 "Silent Grinder" with 0 XP', () => {
    const level = getLevelForXP(0);
    expect(level.level).toBe(1);
    expect(level.title).toBe('Silent Grinder');
  });

  it('reaches Level 2 at 100 XP', () => {
    const level = getLevelForXP(100);
    expect(level.level).toBe(2);
    expect(level.title).toBe('Steady Builder');
  });

  it('reaches Level 5 "Zen Topper" at 1000 XP', () => {
    const level = getLevelForXP(1000);
    expect(level.level).toBe(5);
    expect(level.title).toBe('Zen Topper');
  });

  it('stays at max level beyond threshold', () => {
    const level = getLevelForXP(9999);
    expect(level.level).toBe(6);
    expect(level.title).toBe('Mind Master');
  });

  it('calculates 0% progress at level start', () => {
    expect(getProgressToNextLevel(0)).toBe(0);
  });

  it('calculates 50% progress midway', () => {
    expect(getProgressToNextLevel(50)).toBe(50);
  });

  it('calculates 100% at max level', () => {
    expect(getProgressToNextLevel(9999)).toBe(100);
  });
});
