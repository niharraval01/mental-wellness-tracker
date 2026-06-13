'use client';

import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/layout/PageTransition';
import MoodOrb from '@/components/home/MoodOrb';
import QuickCheckin from '@/components/home/QuickCheckin';
import StatsBar from '@/components/home/StatsBar';
import DailyQuote from '@/components/home/DailyQuote';
import { useAppStore } from '@/lib/store/useAppStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const profile = useAppStore((s) => s.profile);
  const router = useRouter();

  useEffect(() => {
    if (!profile.onboarded) {
      router.push('/onboarding');
    }
  }, [profile.onboarded, router]);

  if (!profile.onboarded) return null;

  return (
    <>
      <PageTransition>
        <main className="max-w-lg mx-auto px-4 pt-6 pb-4 space-y-5">
          {/* Header */}
          <div className="flex items-baseline justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-text-primary">
                Hey{profile.name ? `, ${profile.name}` : ''} 👋
              </h1>
              <p className="text-text-muted text-sm font-body mt-0.5">
                Your mind. Understood.
              </p>
            </div>
          </div>

          {/* Mood Orb */}
          <MoodOrb />

          {/* Stats Bar */}
          <StatsBar />

          {/* Quick Check-In */}
          <QuickCheckin />

          {/* Exam Countdown / Daily Quote */}
          <DailyQuote />

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push('/journal')}
              className="glass-card-hover p-4 text-left"
            >
              <span className="text-2xl">📝</span>
              <p className="font-display text-sm font-semibold text-text-primary mt-2">Journal</p>
              <p className="text-xs text-text-muted mt-0.5">What&apos;s on your mind?</p>
            </button>
            <button
              onClick={() => router.push('/aria')}
              className="glass-card-hover p-4 text-left"
            >
              <span className="text-2xl">💬</span>
              <p className="font-display text-sm font-semibold text-text-primary mt-2">Talk to Aria</p>
              <p className="text-xs text-text-muted mt-0.5">Your wellness companion</p>
            </button>
            <button
              onClick={() => router.push('/breathe')}
              className="glass-card-hover p-4 text-left"
            >
              <span className="text-2xl">🫧</span>
              <p className="font-display text-sm font-semibold text-text-primary mt-2">Breathe</p>
              <p className="text-xs text-text-muted mt-0.5">Quick reset exercises</p>
            </button>
            <button
              onClick={() => router.push('/insights')}
              className="glass-card-hover p-4 text-left"
            >
              <span className="text-2xl">📊</span>
              <p className="font-display text-sm font-semibold text-text-primary mt-2">Insights</p>
              <p className="text-xs text-text-muted mt-0.5">Your patterns & growth</p>
            </button>
          </div>
        </main>
      </PageTransition>
      <BottomNav />
    </>
  );
}
