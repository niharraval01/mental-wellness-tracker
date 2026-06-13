import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { COMPANION_SYSTEM_PROMPT } from '@/lib/ai/prompts';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, data } = await req.json();

    const contextMessage = data ? `\n\nUser Context: ${JSON.stringify(data)}` : '';
    const systemPrompt = COMPANION_SYSTEM_PROMPT + contextMessage;

    const result = await streamText({
      model: google('models/gemini-1.5-pro'),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
