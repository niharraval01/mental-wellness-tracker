import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { ANALYZER_SYSTEM_PROMPT } from '@/lib/ai/prompts';

const analysisSchema = z.object({
  sentiment: z.string(),
  triggers: z.array(z.string()),
  summary: z.string(),
  crisisFlag: z.boolean(),
});

export async function POST(req: Request) {
  try {
    const { entry, mood, energy, focus, anxiety } = await req.json();

    if (!entry || typeof entry !== 'string') {
      return NextResponse.json({ error: 'Journal entry text is required' }, { status: 400 });
    }

    const context = `Student's current metrics — Mood: ${mood}/10, Energy: ${energy}/10, Focus: ${focus}/10, Anxiety: ${anxiety}/10`;

    const result = await generateObject({
      model: google('gemini-1.5-flash'),
      system: ANALYZER_SYSTEM_PROMPT,
      prompt: `${context}\n\nJournal Entry:\n${entry}`,
      schema: analysisSchema,
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { sentiment: 'neutral', triggers: [], summary: 'Entry saved', crisisFlag: false },
      { status: 200 }
    );
  }
}
