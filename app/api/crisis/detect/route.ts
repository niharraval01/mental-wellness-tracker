import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { CRISIS_DETECT_PROMPT } from '@/lib/ai/prompts';

const crisisSchema = z.object({
  tier: z.enum(['none', 'tier1', 'tier2']),
  reason: z.string(),
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ tier: 'none', reason: '' });
    }

    const result = await generateObject({
      model: google('gemini-1.5-flash'),
      system: CRISIS_DETECT_PROMPT,
      prompt: text,
      schema: crisisSchema,
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error('Crisis detection error:', error);
    // Fail safe — if detection errors, don't block the user
    return NextResponse.json({ tier: 'none', reason: 'detection unavailable' });
  }
}
