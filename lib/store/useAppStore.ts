import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toDateString } from '@/lib/utils/streaks';
import { XP_REWARDS } from '@/lib/utils/constants';

/* ============================================================
   TYPE DEFINITIONS
   ============================================================ */
export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  text: string;
  mood: number; // 0-10
  energy: number; // 0-10
  focus: number; // 0-10
  anxiety: number; // 0-10
  triggers: string[];
  sentiment: string;
  summary: string;
  createdAt: string; // ISO string
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type AriaMode = 'vent' | 'strategy' | 'hype';

export interface UserProfile {
  name: string;
  examName: string;
  examDate: string; // ISO string
  onboarded: boolean;
}

export interface AppState {
  /* ---- User Profile ---- */
  profile: UserProfile;
  setProfile: (profile: Partial<UserProfile>) => void;

  /* ---- Mood & Check-in ---- */
  currentMood: number;
  currentEnergy: number;
  currentFocus: number;
  currentAnxiety: number;
  setMetrics: (mood: number, energy: number, focus: number, anxiety: number) => void;

  /* ---- Journal Entries ---- */
  entries: JournalEntry[];
  addEntry: (entry: JournalEntry) => void;
  getEntryByDate: (date: string) => JournalEntry | undefined;

  /* ---- Aria Chat ---- */
  ariaMode: AriaMode;
  setAriaMode: (mode: AriaMode) => void;

  /* ---- Gamification ---- */
  xp: number;
  addXP: (action: keyof typeof XP_REWARDS) => void;
  activeDates: string[]; // YYYY-MM-DD strings for streak calculation
  addActiveDate: (date: string) => void;
  badges: string[]; // badge IDs
  addBadge: (badgeId: string) => void;

  /* ---- Crisis ---- */
  crisisActive: boolean;
  setCrisisActive: (active: boolean) => void;

  /* ---- Breathing ---- */
  breathingSessions: number;
  addBreathingSession: () => void;
}

/* ============================================================
   STORE IMPLEMENTATION
   ============================================================ */
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      /* ---- Profile ---- */
      profile: { name: '', examName: '', examDate: '', onboarded: false },
      setProfile: (updates) =>
        set((s) => ({ profile: { ...s.profile, ...updates } })),

      /* ---- Mood Metrics ---- */
      currentMood: 5,
      currentEnergy: 5,
      currentFocus: 5,
      currentAnxiety: 5,
      setMetrics: (mood, energy, focus, anxiety) =>
        set({ currentMood: mood, currentEnergy: energy, currentFocus: focus, currentAnxiety: anxiety }),

      /* ---- Journal ---- */
      entries: [],
      addEntry: (entry) =>
        set((s) => ({
          entries: [entry, ...s.entries.filter((e) => e.id !== entry.id)],
        })),
      getEntryByDate: (date) => get().entries.find((e) => e.date === date),

      /* ---- Aria ---- */
      ariaMode: 'vent',
      setAriaMode: (mode) => set({ ariaMode: mode }),

      /* ---- Gamification ---- */
      xp: 0,
      addXP: (action) => set((s) => ({ xp: s.xp + XP_REWARDS[action] })),
      activeDates: [],
      addActiveDate: (date) =>
        set((s) => ({
          activeDates: s.activeDates.includes(date) ? s.activeDates : [...s.activeDates, date],
        })),
      badges: [],
      addBadge: (badgeId) =>
        set((s) => ({
          badges: s.badges.includes(badgeId) ? s.badges : [...s.badges, badgeId],
        })),

      /* ---- Crisis ---- */
      crisisActive: false,
      setCrisisActive: (active) => set({ crisisActive: active }),

      /* ---- Breathing ---- */
      breathingSessions: 0,
      addBreathingSession: () =>
        set((s) => ({ breathingSessions: s.breathingSessions + 1 })),
    }),
    {
      name: 'mindflow-store',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') return localStorage;
        // SSR fallback — return a no-op storage
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
