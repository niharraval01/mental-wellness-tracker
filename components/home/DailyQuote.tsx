'use client';

import { useAppStore } from '@/lib/store/useAppStore';
import { getExamPhase } from '@/lib/utils/constants';
import { useMemo } from 'react';

export default function DailyQuote() {
  const profile = useAppStore((s) => s.profile);
  const mood = useAppStore((s) => s.currentMood);

  const examInfo = useMemo(() => {
    if (!profile.examDate) return null;
    const daysLeft = Math.ceil(
      (new Date(profile.examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    return { daysLeft, ...getExamPhase(daysLeft) };
  }, [profile.examDate]);

  return (
    <div className="glass-card-hover p-5">
      {examInfo && examInfo.daysLeft > 0 ? (
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <p className="font-display text-sm text-text-muted">{profile.examName || 'Exam'}</p>
            <p className="text-2xl font-display font-bold text-gradient-violet">{examInfo.daysLeft} days</p>
          </div>
          <p className="text-xs text-text-muted">{examInfo.phase} — {examInfo.description}</p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-text-muted font-display">✨ Daily Reminder</p>
          <p className="text-text-primary font-body text-sm leading-relaxed">
            Progress isn&apos;t always visible. Some days, just showing up is the win.
          </p>
        </div>
      )}
    </div>
  );
}
