'use client';
import { WellnessProvider } from '@/lib/store/useWellnessStore';

export function Providers({ children }: { children: React.ReactNode }) {
  return <WellnessProvider>{children}</WellnessProvider>;
}
