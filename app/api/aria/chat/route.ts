import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { ARIA_SYSTEM_PROMPT } from '@/lib/ai/prompts';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, data } = await req.json();

    // Build rich context from student data
    const contextParts: string[] = [];

    if (data?.mode) {
      contextParts.push(`Current conversation mode: ${data.mode.toUpperCase()} MODE`);
    }
    if (data?.mood !== undefined) {
      contextParts.push(`Current mood score: ${data.mood}/10`);
    }
    if (data?.profile?.name) {
      contextParts.push(`Student's name: ${data.profile.name}`);
    }
    if (data?.profile?.examName) {
      contextParts.push(`Preparing for: ${data.profile.examName}`);
    }
    if (data?.profile?.examDate) {
      const daysLeft = Math.ceil(
        (new Date(data.profile.examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      if (daysLeft > 0) {
        contextParts.push(`Days until exam: ${daysLeft}`);
      }
    }
    if (data?.recentTriggers?.length) {
      contextParts.push(`Recent stress triggers identified: ${data.recentTriggers.join(', ')}`);
    }
    if (data?.recentEntries?.length) {
      contextParts.push(`Recent journal summaries:\n${data.recentEntries.map((e: string) => `- ${e}`).join('\n')}`);
    }

    const contextBlock = contextParts.length > 0
      ? `\n\n--- STUDENT CONTEXT ---\n${contextParts.join('\n')}\n--- END CONTEXT ---`
      : '';

    const result = await streamText({
      model: google('gemini-1.5-pro'),
      system: ARIA_SYSTEM_PROMPT + contextBlock,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Aria chat error:', error);
    return new Response('Something went wrong. Please try again.', { status: 500 });
  }
}
