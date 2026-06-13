'use client';

import { useMemo } from 'react';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/layout/PageTransition';
import { useAppStore } from '@/lib/store/useAppStore';
import { BADGES } from '@/lib/utils/constants';
import { getLevelForXP } from '@/lib/utils/xp';
import { calculateStreak } from '@/lib/utils/streaks';

export default function InsightsPage() {
  const { entries, xp, activeDates, badges, breathingSessions } = useAppStore();

  const streak = useMemo(() => calculateStreak(activeDates), [activeDates]);
  const level = useMemo(() => getLevelForXP(xp), [xp]);

  // Mood heatmap data — last 28 days
  const heatmapData = useMemo(() => {
    const days: { date: string; mood: number | null }[] = [];
    const today = new Date();
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const entry = entries.find((e) => e.date === dateStr);
      days.push({ date: dateStr, mood: entry ? entry.mood : null });
    }
    return days;
  }, [entries]);

  // Aggregated triggers
  const triggerCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    entries.forEach((e) => {
      e.triggers.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);
  }, [entries]);

  // Average mood
  const avgMood = useMemo(() => {
    if (entries.length === 0) return null;
    const sum = entries.reduce((acc, e) => acc + e.mood, 0);
    return (sum / entries.length).toFixed(1);
  }, [entries]);

  function getMoodColor(mood: number | null): string {
    if (mood === null) return 'bg-midnight-border';
    if (mood >= 8) return 'bg-mint';
    if (mood >= 6) return 'bg-mint/60';
    if (mood >= 4) return 'bg-violet/60';
    if (mood >= 2) return 'bg-coral/60';
    return 'bg-coral';
  }

  const earnedBadges = useMemo(
    () => BADGES.filter((b) => badges.includes(b.id)),
    [badges]
  );

  return (
    <>
      <PageTransition>
        <main className="max-w-lg mx-auto px-4 pt-6 pb-4 space-y-5">
          <div>
            <h1 className="font-display text-2xl font-bold text-text-primary">Insights 📊</h1>
            <p className="text-text-muted text-sm mt-1">Your patterns, your growth.</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-2">
            <div className="glass-card p-3 text-center">
              <p className="text-xl font-display font-bold text-violet">{entries.length}</p>
              <p className="text-[10px] text-text-muted mt-0.5">Entries</p>
            </div>
            <div className="glass-card p-3 text-center">
              <p className="text-xl font-display font-bold text-coral">{streak}🔥</p>
              <p className="text-[10px] text-text-muted mt-0.5">Streak</p>
            </div>
            <div className="glass-card p-3 text-center">
              <p className="text-xl font-display font-bold text-mint">{breathingSessions}</p>
              <p className="text-[10px] text-text-muted mt-0.5">Breathes</p>
            </div>
            <div className="glass-card p-3 text-center">
              <p className="text-xl font-display font-bold text-text-primary">{level.emoji}</p>
              <p className="text-[10px] text-text-muted mt-0.5">Lv.{level.level}</p>
            </div>
          </div>

          {/* Mood Calendar (Heatmap) */}
          <div className="glass-card p-5 space-y-3">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display font-semibold text-text-primary text-sm">Mood Calendar</h3>
              {avgMood && <span className="text-xs text-text-muted">Avg: {avgMood}/10</span>}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {heatmapData.map((day) => (
                <div
                  key={day.date}
                  className={`w-full aspect-square rounded-md ${getMoodColor(day.mood)} transition-colors duration-200`}
                  title={`${day.date}: ${day.mood !== null ? `Mood ${day.mood}/10` : 'No entry'}`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-[10px] text-text-dim">
              <span>4 weeks ago</span>
              <div className="flex items-center gap-1">
                <span>Low</span>
                <div className="w-3 h-3 rounded-sm bg-coral" />
                <div className="w-3 h-3 rounded-sm bg-violet/60" />
                <div className="w-3 h-3 rounded-sm bg-mint/60" />
                <div className="w-3 h-3 rounded-sm bg-mint" />
                <span>High</span>
              </div>
              <span>Today</span>
            </div>
          </div>

          {/* Trigger Cloud */}
          {triggerCounts.length > 0 && (
            <div className="glass-card p-5 space-y-3">
              <h3 className="font-display font-semibold text-text-primary text-sm">Top Stress Triggers</h3>
              <div className="flex flex-wrap gap-2">
                {triggerCounts.map(([trigger, count]) => (
                  <span
                    key={trigger}
                    className="text-xs px-3 py-1.5 bg-coral-glow border border-coral/20 text-coral-light rounded-full"
                  >
                    #{trigger.replace(/\s+/g, '')} <span className="text-text-dim ml-1">×{count}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="glass-card p-5 space-y-3">
            <h3 className="font-display font-semibold text-text-primary text-sm">Badges Earned</h3>
            {earnedBadges.length === 0 ? (
              <p className="text-text-muted text-xs font-body">
                No badges yet — keep journaling and breathing to unlock them! 🌱
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {earnedBadges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center gap-1 text-center">
                    <span className="text-2xl">{badge.emoji}</span>
                    <span className="text-[10px] text-text-muted font-display">{badge.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Empty state encouragement */}
          {entries.length === 0 && (
            <div className="glass-card p-6 text-center space-y-2">
              <span className="text-3xl">🌱</span>
              <p className="text-text-primary font-display font-semibold">Your story starts here</p>
              <p className="text-text-muted text-xs font-body">
                Start journaling to see your mood patterns, triggers, and growth unfold here.
              </p>
            </div>
          )}
        </main>
      </PageTransition>
      <BottomNav />
    </>
  );
}
