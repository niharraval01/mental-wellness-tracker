# Mental Wellness Tracker

## Brief Description
The **Mental Wellness Tracker** is a production-grade, Next.js AI micro-app designed specifically to support students preparing for high-stakes competitive exams (e.g., NEET, JEE, UPSC). It provides a safe, judgment-free sanctuary where students can log their daily moods and journal entries.

### How GenAI Uncovers Hidden Patterns
The application utilizes the Vercel AI SDK and advanced GenAI models in a two-tier approach:
1. **Background Analysis (`/api/analyze`)**: As the student types in their journal, the text is debounced and silently analyzed by an LLM instructed to extract specific academic stress triggers (e.g., "fear of failure," "sleep deprivation," "mock test anxiety"). This structured output (using Zod validation) feeds into a local state store, dynamically generating "Observed Patterns" without interrupting the user's flow.
2. **Conversational Support (`/api/chat`)**: A hyper-personalized AI companion uses the extracted triggers and logged mood to contextualize its support. The companion streams empathetic advice and coping strategies tailored to exam stress.

### Safety First (Clinical/Safety Protocol)
The system incorporates a strict fallback mechanism. If the AI detects severe distress or potential self-harm, it flags the response with `CRISIS_DETECTED: TRUE`. The UI intercepts this flag, immediately halting the AI's generation and displaying a localized `CrisisAlert` component with immediate helpline numbers, safely refusing to offer medical advice.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Vanilla CSS Modules (Deep dark mode, Framer Motion transitions)
- **AI Integration**: Vercel AI SDK (`ai`, `@ai-sdk/openai`)
- **State Management**: React Context (`useWellnessStore`)
- **Testing**: Vitest (`tests/analyzer.test.ts`)

## Zero-Config Vercel Deployment
This repository is optimized for immediate deployment on Vercel:
1. Push to GitHub.
2. Import project into Vercel.
3. Add `OPENAI_API_KEY` to Vercel Environment Variables.
4. Deploy! The application uses Edge-compatible API routes for low-latency streaming.
