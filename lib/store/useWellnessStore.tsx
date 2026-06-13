import React, { createContext, useContext, useState, ReactNode } from 'react';

type Mood = 'great' | 'good' | 'okay' | 'bad' | 'awful' | null;

interface WellnessState {
  entry: string;
  setEntry: (entry: string) => void;
  mood: Mood;
  setMood: (mood: Mood) => void;
  triggers: string[];
  setTriggers: (triggers: string[]) => void;
  crisisFlag: boolean;
  setCrisisFlag: (flag: boolean) => void;
}

const WellnessContext = createContext<WellnessState | undefined>(undefined);

export function WellnessProvider({ children }: { children: ReactNode }) {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState<Mood>(null);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [crisisFlag, setCrisisFlag] = useState(false);

  return (
    <WellnessContext.Provider value={{ entry, setEntry, mood, setMood, triggers, setTriggers, crisisFlag, setCrisisFlag }}>
      {children}
    </WellnessContext.Provider>
  );
}

export function useWellnessStore() {
  const context = useContext(WellnessContext);
  if (context === undefined) {
    throw new Error('useWellnessStore must be used within a WellnessProvider');
  }
  return context;
}
