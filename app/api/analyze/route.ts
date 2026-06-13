import { NextResponse } from 'next/server';
import { analyzeJournalEntry } from '@/lib/ai/analyzer';

export async function POST(req: Request) {
  try {
    const { entry } = await req.json();

    if (!entry) {
      return NextResponse.json({ error: 'Journal entry is required' }, { status: 400 });
    }

    const analysis = await analyzeJournalEntry(entry);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing journal entry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
