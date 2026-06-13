import { LEVELS, type LevelInfo } from './constants';

/** Calculate which level a user is at given their total XP */
export function getLevelForXP(xp: number): LevelInfo {
  let currentLevel = LEVELS[0];
  for (const level of LEVELS) {
    if (xp >= level.minXP) {
      currentLevel = level;
    }
  }
  return currentLevel;
}

/** Calculate progress toward the next level (0–100) */
export function getProgressToNextLevel(xp: number): number {
  const current = getLevelForXP(xp);
  const currentIndex = LEVELS.indexOf(current);
  const next = LEVELS[currentIndex + 1];

  if (!next) return 100; // max level

  const range = next.minXP - current.minXP;
  const progress = xp - current.minXP;
  return Math.min(100, Math.round((progress / range) * 100));
}
