# 🧠 MindFlow — GenZ Mental Wellness Tracker

> **Your mind. Understood.**

MindFlow is a production-grade AI micro-app designed as a daily mental wellness companion for Indian students preparing for high-stakes competitive exams — NEET, JEE, UPSC, CAT, GATE, and CUET.

This is not a clinical tool. It's the app students open out of habit, out of comfort, out of curiosity about themselves. Every interaction leaves the student feeling *seen*, not lectured.

---

## 🌟 How GenAI Powers MindFlow

MindFlow uses a multi-layered GenAI architecture to go beyond simple mood logging:

### 1. Background Analysis Engine (`/api/analyze`)
Every journal entry is silently analyzed by **Gemini 1.5 Flash** to:
- Extract **7 emotional sentiment states** (not just positive/negative)
- Identify **hidden stress triggers** specific to exam culture: `#examFear`, `#sleepDeprivation`, `#peerComparison`, `#familyPressure`, `#syllabusBacklog`
- Generate a casual "Today's Vibe" summary
- Flag crisis-level distress for immediate intervention

### 2. Aria — Conversational AI Companion (`/api/aria/chat`)
Aria is a named, persistent AI companion (not "AI Assistant") powered by **Gemini 1.5 Pro** with:
- **3 conversation modes**: Vent (just listen), Strategy (give me a plan), Hype (gas me up)
- **Rich context injection**: Current mood, last 3 journal summaries, exam countdown, identified triggers
- **Personalized callbacks**: "Last time you mentioned Physics was stressing you out — how's that going?"
- **Strict safety boundaries**: Never gives medical advice, never roleplays as a therapist

### 3. Crisis Detection Layer (`/api/crisis/detect`)
A dedicated, fast-path safety system with:
- **Client-side pre-screening**: Instant keyword detection before any API call
- **Two-tier system**: Moderate distress (gentle nudge) vs. crisis language (full-screen intervention with Indian helplines: iCall, Kiran, Vandrevala Foundation)

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔮 **Mood Orb** | Living animated blob that changes color, size, and pulse based on mood |
| 📝 **Journal + AI Analysis** | Write freely, get instant sentiment + trigger extraction |
| 💬 **Aria (3 Modes)** | Vent / Strategy / Hype — streamed, contextual AI conversations |
| 🫧 **Breathing Exercises** | 4 animated techniques (Box, 4-7-8, Quick Calm, Deep Belly) with visual guides |
| 📊 **Mood Calendar** | GitHub-style heatmap of emotional patterns over 28 days |
| 🎮 **Gamification** | XP, levels ("Silent Grinder" → "Zen Topper"), streaks, achievement badges |
| 🛡️ **Crisis Safety** | Two-tier detection with warm, non-alarming intervention UI |
| 🎓 **Exam Intelligence** | Countdown timer with phase-aware coaching (Early Prep → Sprint → Post-Exam) |

---

## 🎨 Design — "Midnight Garden" Theme

- **Background**: Rich dark navy `#0D0F1A`
- **Primary accent**: Electric violet `#7C5CFC`
- **Secondary accent**: Warm coral `#FF6B6B`
- **Success**: Mint green `#00D9A3`
- **Fonts**: Space Grotesk (display) + Inter (body)
- **Effects**: Glassmorphism cards, Framer Motion transitions, gradient orbs

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, TypeScript strict) |
| AI | Vercel AI SDK v4 + Google Gemini (`@ai-sdk/google`) |
| Styling | Tailwind CSS + Framer Motion |
| State | Zustand + localStorage persistence |
| Testing | Vitest (crisis detection, XP, streaks) |

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/niharraval01/mental-wellness-tracker.git
cd mental-wellness-tracker
npm install

# Set up environment
cp .env.example .env.local
# Add your Gemini API key to .env.local

# Run locally
npm run dev

# Run tests
npm run test
```

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google Gemini API key (required) |

---

## ☁️ Vercel Deployment (Zero-Config)

1. Push to GitHub
2. Import project into [Vercel Dashboard](https://vercel.com/new)
3. Add `GOOGLE_GENERATIVE_AI_API_KEY` to Environment Variables
4. Deploy! ✅

---

## 🧪 Testing

```bash
npm run test
```

Test coverage includes:
- **Crisis detection**: Tier 2 (self-harm) and Tier 1 (moderate distress) keyword matching
- **XP system**: Level thresholds, progress calculation
- **Streaks**: Consecutive days, gaps, duplicates, edge cases

---

## ⚖️ Safety & Privacy

- All API keys are server-side only (Next.js API routes)
- No data leaves the device (localStorage persistence)
- No third-party trackers
- AI companion includes persistent disclaimer: "Aria is an AI companion, not a mental health professional"
- Crisis intervention shows Indian helplines: iCall, Kiran Mental Health, Vandrevala Foundation

---

*Built with 💛 for students who deserve to be understood, not just evaluated.*
