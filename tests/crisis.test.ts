import { describe, it, expect } from 'vitest';
import { detectCrisisClient } from '../lib/ai/crisisDetector';

describe('Crisis Detection (Client-Side)', () => {
  describe('Tier 2 — Severe (immediate intervention)', () => {
    it('detects explicit self-harm language', () => {
      expect(detectCrisisClient('I want to hurt myself')).toBe('tier2');
    });

    it('detects suicidal ideation', () => {
      expect(detectCrisisClient('I want to end my life, everything is pointless')).toBe('tier2');
    });

    it('detects "kill myself" phrasing', () => {
      expect(detectCrisisClient('Sometimes I think about killing myself')).toBe('tier2');
    });

    it('is case-insensitive', () => {
      expect(detectCrisisClient('I WANT TO DIE')).toBe('tier2');
    });
  });

  describe('Tier 1 — Moderate distress (gentle intervention)', () => {
    it('flags multiple distress keywords', () => {
      expect(detectCrisisClient('I feel hopeless and worthless, nobody cares about me')).toBe('tier1');
    });

    it('does NOT flag a single keyword (avoids false positive)', () => {
      expect(detectCrisisClient('I feel hopeless about this exam')).toBe('none');
    });
  });

  describe('No crisis — normal academic stress', () => {
    it('allows normal exam frustration', () => {
      expect(detectCrisisClient('I failed my mock test today and I feel terrible')).toBe('none');
    });

    it('allows general stress language', () => {
      expect(detectCrisisClient('Physics is killing me, I can never get optics right')).toBe('none');
    });

    it('handles empty input', () => {
      expect(detectCrisisClient('')).toBe('none');
    });
  });
});
