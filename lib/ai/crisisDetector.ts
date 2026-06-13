import { CRISIS_KEYWORDS_TIER1, CRISIS_KEYWORDS_TIER2 } from '@/lib/utils/constants';

export type CrisisTier = 'none' | 'tier1' | 'tier2';

/**
 * Client-side pre-screening for crisis language.
 * This runs locally before any API call for low-latency detection.
 */
export function detectCrisisClient(text: string): CrisisTier {
  const lower = text.toLowerCase();

  // Tier 2 first — most severe
  for (const keyword of CRISIS_KEYWORDS_TIER2) {
    if (lower.includes(keyword)) return 'tier2';
  }

  // Tier 1 — moderate distress
  let tier1Matches = 0;
  for (const keyword of CRISIS_KEYWORDS_TIER1) {
    if (lower.includes(keyword)) tier1Matches++;
  }
  // Require at least 2 tier1 keywords to reduce false positives
  if (tier1Matches >= 2) return 'tier1';

  return 'none';
}
