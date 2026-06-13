import { describe, it, expect, vi } from 'vitest';
import { analyzeJournalEntry } from '../lib/ai/analyzer';

vi.mock('ai', () => ({
  generateObject: vi.fn().mockImplementation(async ({ prompt }) => {
    if (prompt.includes('hurt myself') || prompt.includes('cannot take this anymore')) {
      return {
        object: {
          sentiment: 'negative',
          triggers: ['severe distress'],
          crisisFlag: true,
        }
      };
    }
    
    return {
      object: {
        sentiment: 'negative',
        triggers: ['fear of failure', 'mock test anxiety'],
        crisisFlag: false,
      }
    };
  }),
}));

describe('Analyzer Logic', () => {
  it('identifies stress triggers without setting crisis flag for standard anxiety', async () => {
    const result = await analyzeJournalEntry('I failed my mock test today and I am so scared of failing the real exam.');
    
    expect(result.sentiment).toBe('negative');
    expect(result.triggers).toContain('fear of failure');
    expect(result.crisisFlag).toBe(false);
  });

  it('sets the crisisFlag to true when severe distress is detected', async () => {
    const result = await analyzeJournalEntry('I cannot take this anymore, I want to hurt myself, the pressure is too much.');
    
    expect(result.sentiment).toBe('negative');
    expect(result.crisisFlag).toBe(true);
  });
});
