'use client';

import { useAppStore } from '@/lib/store/useAppStore';
import { getLevelForXP, getProgressToNextLevel } from '@/lib/utils/xp';
import { calculateStreak } from '@/lib/utils/streaks';
import { useMemo } from 'react';

export default function StatsBar() {
  const xp = useAppStore((s) => s.xp);
  const activeDates = useAppStore((s) => s.activeDates);

  const level = useMemo(() => getLevelForXP(xp), [xp]);
  const progress = useMemo(() => getProgressToNextLevel(xp), [xp]);
  const streak = useMemo(() => calculateStreak(activeDates), [activeDates]);

  return (
    <div className="glass-card p-4 flex items-center gap-4">
      {/* Level Badge */}
      <div className="flex items-center gap-2 flex-1">
        <span className="text-2xl">{level.emoji}</span>
        <div>
          <p className="text-xs text-text-muted font-body">Level {level.level}</p>
          <p className="text-sm font-display font-semibold text-text-primary">{level.title}</p>
        </div>
      </div>

      {/* XP Bar */}
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-[10px] text-text-muted">{xp} XP</span>
          <span className="text-[10px] text-text-muted">{progress}%</span>
        </div>
        <div className="h-2 bg-midnight-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet to-violet-light rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-1.5 pl-2 border-l border-midnight-border">
        <span className={`text-xl ${streak > 0 ? 'animate-flame' : ''}`}>🔥</span>
        <div>
          <p className="text-sm font-display font-bold text-coral">{streak}</p>
          <p className="text-[10px] text-text-muted">streak</p>
        </div>
      </div>
    </div>
  );
}
