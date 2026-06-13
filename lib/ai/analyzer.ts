import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { ANALYZER_SYSTEM_PROMPT } from './prompts';

export const analysisSchema = z.object({
  sentiment: z.enum(['positive', 'neutral', 'negative']),
  triggers: z.array(z.string()),
  crisisFlag: z.boolean(),
});

export type AnalysisResult = z.infer<typeof analysisSchema>;

export async function analyzeJournalEntry(entry: string): Promise<AnalysisResult> {
  const result = await generateObject({
    model: openai('gpt-4o-mini'),
    system: ANALYZER_SYSTEM_PROMPT,
    prompt: `Analyze the following journal entry:\n\n${entry}`,
    schema: analysisSchema,
  });

  return result.object;
}
