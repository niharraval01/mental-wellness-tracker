/* ============================================================
   BREATHING EXERCISE CONFIGURATIONS
   ============================================================ */
export interface BreathingStep {
  action: 'inhale' | 'hold' | 'exhale';
  duration: number; // seconds
  label: string;
}

export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  steps: BreathingStep[];
  emoji: string;
}

export const BREATHING_EXERCISES: BreathingExercise[] = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Used by Navy SEALs. Equal inhale-hold-exhale-hold.',
    emoji: '⬜',
    steps: [
      { action: 'inhale', duration: 4, label: 'Breathe In' },
      { action: 'hold', duration: 4, label: 'Hold' },
      { action: 'exhale', duration: 4, label: 'Breathe Out' },
      { action: 'hold', duration: 4, label: 'Hold' },
    ],
  },
  {
    id: '478',
    name: '4-7-8 Breathing',
    description: 'The relaxing breath. Great before sleep or exams.',
    emoji: '🌙',
    steps: [
      { action: 'inhale', duration: 4, label: 'Breathe In' },
      { action: 'hold', duration: 7, label: 'Hold' },
      { action: 'exhale', duration: 8, label: 'Breathe Out' },
    ],
  },
  {
    id: 'quick-calm',
    name: '2-1-4 Quick Calm',
    description: 'For exam-hall anxiety. Fast and effective.',
    emoji: '⚡',
    steps: [
      { action: 'inhale', duration: 2, label: 'Quick In' },
      { action: 'hold', duration: 1, label: 'Hold' },
      { action: 'exhale', duration: 4, label: 'Slow Out' },
    ],
  },
  {
    id: 'deep-belly',
    name: 'Deep Belly Breath',
    description: 'Simple diaphragmatic breathing for instant calm.',
    emoji: '🫧',
    steps: [
      { action: 'inhale', duration: 5, label: 'Deep In' },
      { action: 'exhale', duration: 5, label: 'Slow Out' },
    ],
  },
];

/* ============================================================
   GAMIFICATION — LEVEL TITLES & XP THRESHOLDS
   ============================================================ */
export interface LevelInfo {
  level: number;
  title: string;
  minXP: number;
  emoji: string;
}

export const LEVELS: LevelInfo[] = [
  { level: 1, title: 'Silent Grinder', minXP: 0, emoji: '🌱' },
  { level: 2, title: 'Steady Builder', minXP: 100, emoji: '🧱' },
  { level: 3, title: 'Flow State Finder', minXP: 300, emoji: '🌊' },
  { level: 4, title: 'Pressure Diamond', minXP: 600, emoji: '💎' },
  { level: 5, title: 'Zen Topper', minXP: 1000, emoji: '🧘' },
  { level: 6, title: 'Mind Master', minXP: 1500, emoji: '🧠' },
];

/* ============================================================
   XP REWARDS
   ============================================================ */
export const XP_REWARDS = {
  checkin: 10,
  journal: 20,
  breathing: 15,
  ariaChat: 25,
} as const;

/* ============================================================
   BADGE DEFINITIONS
   ============================================================ */
export interface BadgeDefinition {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export const BADGES: BadgeDefinition[] = [
  { id: 'night-owl', name: 'Night Owl', emoji: '🦉', description: 'Journaled after midnight' },
  { id: 'early-bird', name: 'Early Bird', emoji: '🐦', description: 'Checked in before 7 AM' },
  { id: 'streak-3', name: 'Hat Trick', emoji: '🔥', description: '3-day streak' },
  { id: 'streak-7', name: 'Weekly Warrior', emoji: '⚔️', description: '7-day streak' },
  { id: 'streak-30', name: 'Consistent Chaos', emoji: '🌀', description: '30-day streak' },
  { id: 'first-breath', name: 'First Breath', emoji: '🫁', description: 'Completed first breathing exercise' },
  { id: 'pre-exam-zen', name: 'Pre-Exam Zen', emoji: '🧘', description: 'Breathwork day before exam' },
  { id: 'vent-session', name: 'Let It Out', emoji: '💨', description: 'First vent session with Aria' },
  { id: 'comeback', name: 'Comeback King', emoji: '👑', description: 'Returned after a streak break' },
  { id: 'mood-lift', name: 'Mood Lifter', emoji: '📈', description: 'Improved mood after breathing' },
];

/* ============================================================
   MOOD LABELS
   ============================================================ */
export const MOOD_LABELS: Record<number, string> = {
  0: 'Terrible',
  1: 'Awful',
  2: 'Bad',
  3: 'Down',
  4: 'Meh',
  5: 'Okay',
  6: 'Fine',
  7: 'Good',
  8: 'Great',
  9: 'Amazing',
  10: 'On Top',
};

/* ============================================================
   EXAM PHASES
   ============================================================ */
export function getExamPhase(daysRemaining: number): { phase: string; description: string } {
  if (daysRemaining <= 0) return { phase: 'Post-Exam', description: "It's over. Time to breathe and recover." };
  if (daysRemaining <= 7) return { phase: '1-Week Sprint', description: 'Almost there. Protect your energy above all.' };
  if (daysRemaining <= 30) return { phase: '30-Day Crunch', description: "Deep work phase. You've got this." };
  if (daysRemaining <= 90) return { phase: 'Steady Build', description: 'Consistency beats intensity. Keep building.' };
  return { phase: 'Early Prep', description: 'The marathon starts here. Build strong habits now.' };
}

/* ============================================================
   CRISIS KEYWORDS (for client-side pre-screening)
   ============================================================ */
export const CRISIS_KEYWORDS_TIER2 = [
  'kill myself', 'end my life', 'suicide', 'want to die',
  'no reason to live', 'better off dead', 'self harm',
  'cut myself', 'hurt myself',
];

export const CRISIS_KEYWORDS_TIER1 = [
  'hopeless', 'worthless', 'can\'t go on', 'giving up',
  'nobody cares', 'all alone', 'can\'t take it',
  'breaking down', 'falling apart', 'no way out',
];
