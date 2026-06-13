'use client';

import { useEffect, useState } from 'react';
import { useWellnessStore } from '@/lib/store/useWellnessStore';
import { useDebounce } from '@/lib/utils/debounce';
import styles from './Journal.module.css';

export default function JournalEntry() {
  const { entry, setEntry, setTriggers, setCrisisFlag } = useWellnessStore();
  const [localEntry, setLocalEntry] = useState(entry);
  const debouncedEntry = useDebounce(localEntry, 1000);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    setEntry(localEntry);
  }, [localEntry, setEntry]);

  useEffect(() => {
    const analyze = async () => {
      if (!debouncedEntry.trim()) return;
      setIsAnalyzing(true);
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entry: debouncedEntry }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.triggers) setTriggers(data.triggers);
          if (data.crisisFlag) setCrisisFlag(true);
        }
      } catch (err) {
        console.error('Failed to analyze entry', err);
      } finally {
        setIsAnalyzing(false);
      }
    };
    analyze();
  }, [debouncedEntry, setTriggers, setCrisisFlag]);

  return (
    <div className={styles.journalContainer}>
      <h2 className={styles.title}>Your Sanctuary</h2>
      <p className={styles.subtitle}>Write whatever is on your mind. We're here to listen.</p>
      <textarea
        className={styles.textarea}
        value={localEntry}
        onChange={(e) => setLocalEntry(e.target.value)}
        placeholder="How was your mock test today? Are you feeling overwhelmed?"
        rows={8}
      />
      {isAnalyzing && <span className={styles.analyzingIndicator}>Analyzing silently...</span>}
    </div>
  );
}
