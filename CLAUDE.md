# Project Context for AI Assistants

This file provides comprehensive context about the Sell The Pen AI project for AI assistants.

## Quick Reference

**Project:** Sell The Pen AI - AI-Powered Sales Training Platform
**Status:** Hackathon Project (Frontend Complete, Backend In Progress)
**Theme:** Digital Economy & Future of Work
**Tech Stack:** React + TypeScript (Frontend), Python/Node.js (Backend - TBD)

## Important Links

- **Full Project Overview:** See `overview.md` for complete documentation
- **Frontend Documentation:** See `frontend.md` for UI/UX details

## Project Summary

Sell The Pen AI is an AI-powered sales training platform that uses voice AI agents and RAG-based feedback to help sales professionals practice and improve their skills. The platform simulates realistic sales scenarios (cold calling, pitching, objection handling) and provides detailed, actionable feedback based on proven methodologies like Mike Ferry's cold calling approach.

### Key Components

1. **Lead Outreach Voice Agent** (Hackathon MVP)
   - Real-time voice conversations with AI prospects
   - Mike Ferry methodology integration
   - Speech-to-text and text-to-speech
   - Live transcript generation

2. **Feedback Agent** (Hackathon MVP)
   - RAG-based concept extraction from Mike Ferry principles
   - 4-category scoring system
   - PDF report generation
   - Interactive chatbot for follow-up questions

3. **Positioning Agent** (Future/Placeholder)
   - Text-based pitching practice
   - Frontend UI exists but backend not implemented

## Current Status (November 2025)

### ✅ Completed
- Full React + TypeScript frontend (production-ready)
- **8-step onboarding flow with user profiling**
- **UserProfile context for global state management**
- **Recommendations page with smart skill matching**
- **"Hello Amir" greeting on all pages post-onboarding**
- Landing page, skill selection, persona selection, call simulation UI
- Feedback display interface
- 50+ shadcn/ui components
- Responsive design (mobile + desktop)
- React Query configuration
- LocalStorage persistence for user profiles

### 🚧 In Progress
- Backend API server
- WebSocket for real-time voice
- STT/TTS integration
- LLM integration with persona prompts
- RAG system for feedback
- PDF generation

### ❌ Not Started
- User authentication
- Database setup
- Multiple personas (only "Dominant & Aggressive" active)
- Historical analytics
- Deployment

## Technical Architecture

### Frontend
- **Framework:** React 18.3.1 + TypeScript 5.8.3
- **Build:** Vite 5.4.19
- **Routing:** React Router DOM 6.30.1
- **UI:** shadcn/ui (Radix primitives)
- **Styling:** Tailwind CSS 3.4.17
- **State:** React Query 5.83.0
- **Dev Server:** Port 8080

### Backend (Planned)
- **Language:** Python or Node.js
- **Framework:** FastAPI / Express
- **Real-time:** WebSockets
- **Database:** PostgreSQL / MongoDB

### AI Services (To Implement)
- **STT:** OpenAI Whisper / Deepgram / Google Cloud Speech-to-Text
- **TTS:** ElevenLabs / OpenAI TTS / Google Cloud TTS
- **LLM:** OpenAI GPT-4 / Anthropic Claude
- **Vector DB:** Pinecone / Weaviate / Chroma
- **Embeddings:** OpenAI text-embedding-3

## User Journey (Hackathon MVP)

```
Onboarding (8 steps) → Recommendations → Skill Selection → Persona Selection
→ Call Simulation → Processing → Feedback Display → Interactive Chat
→ Practice Again
```

### Onboarding Flow (NEW)
The app now includes a comprehensive 8-step onboarding process to capture user profile:

1. **Basic Info** - Name (Amir Kazamkhani), Company (Nova Real Estate)
2. **Experience Level** - Just Starting Out / Building Momentum / Experienced / Veteran
3. **Sales Role** - SDR/BDR, AE, AM, Real Estate, B2B SaaS, Retail, Other
4. **Rejection Handling** - Deeply Affected / Bothered / Accepting / Thrives
5. **Communication Style** - Analytical / Relationship / Assertive / Patient
6. **Top Challenges** - Select up to 2 (Fear, Gatekeepers, Rapport, Objections, Control, Value, Closing, Consistency)
7. **Learning Style** - Trial & Error / Guided / Analytical / Quick Wins
8. **Goals & Timeline** - Confidence / Quota / Top Performer / Mastery / Advancement

**Demo Profile (Pre-filled):**
- Name: Amir Kazamkhani
- Company: Nova Real Estate
- Experience: Beginner
- Role: SDR/BDR
- Rejection: Deeply Affected
- Style: High-Energy & Assertive
- Challenges: Fear of calling, Handling objections
- Learning: Trial & Error
- Goal: Hit quota this month

Profile data is stored in localStorage and used to:
- Personalize AI persona difficulty
- Adjust feedback tone and focus
- Generate smart skill recommendations
- Display "Hello Amir" greeting on all pages post-onboarding

## Key Files & Structure

```
src/
├── components/
│   ├── ui/                    # 50+ shadcn components
│   ├── OnboardingLayout.tsx   # Shared onboarding template
│   └── UserGreeting.tsx       # "Hello Amir" component
├── contexts/
│   └── UserProfileContext.tsx # Global profile state
├── hooks/                     # React hooks
├── lib/                       # Utilities
├── pages/
│   ├── onboarding/           # 8-step onboarding flow
│   │   ├── BasicInfo.tsx
│   │   ├── Experience.tsx
│   │   ├── Role.tsx
│   │   ├── Personality.tsx
│   │   ├── CommunicationStyle.tsx
│   │   ├── Challenges.tsx
│   │   ├── LearningStyle.tsx
│   │   └── Goals.tsx
│   ├── Recommendations.tsx   # Post-onboarding personalized path
│   ├── Index.tsx            # Landing page
│   ├── TryNow.tsx           # Skill selection
│   ├── PersonaSelection.tsx
│   ├── CallSimulation.tsx
│   ├── Feedback.tsx
│   └── NotFound.tsx
├── types/
│   └── profile.ts           # UserProfile types & DEMO_PROFILE
├── App.tsx                  # Routing (with onboarding routes)
└── main.tsx                 # Entry point
```

## Mike Ferry Methodology

The platform integrates Mike Ferry's proven cold calling methodology:

1. **Opening Statement** - First 7 words determine success
2. **Objection Handling** - Acknowledge, don't argue; pivot with questions
3. **Conversation Control** - Ask questions to lead, use pauses strategically
4. **Closing** - Assumptive close, ask for commitment

Knowledge base structure:
- opening_statements/
- objection_handling/
- conversation_control/
- closing_techniques/

## Hackathon Scope

### In Scope ✅
- Lead Outreach Voice Agent (1 persona)
- RAG-based Feedback System
- PDF generation
- Interactive feedback chatbot
- Complete frontend UI

### Out of Scope ❌
- Positioning & Pitching Agent (UI only, no backend)
- User authentication
- Multiple personas
- Historical analytics
- Additional sales methodologies

## Development Priorities

1. **Week 1-2:** Complete voice agent backend + STT/TTS
2. **Week 2-3:** RAG system + feedback generation
3. **Week 3:** PDF generation + chatbot
4. **Week 4:** Integration + testing + demo prep

## API Endpoints (Planned)

```
POST   /api/sessions/start           # Initialize call session
WS     /api/sessions/:id/stream      # WebSocket for voice
POST   /api/sessions/:id/end         # End call
GET    /api/sessions/:id/feedback    # Get feedback
GET    /api/sessions/:id/pdf         # Download PDF
POST   /api/chat/feedback            # Feedback chatbot
GET    /api/personas                 # List personas
```

## Environment Variables

```bash
# Frontend
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000

# Backend
OPENAI_API_KEY=sk-...
DEEPGRAM_API_KEY=...
PINECONE_API_KEY=...
DATABASE_URL=postgresql://...
PORT=3000
```

## Git Status (Start of Session)

Current branch: main
Untracked files:
- frontend.md
- overview.md

Recent commits:
- test change
- Update color palette to warm
- Changes
- Build premium multi-page flow

## Design System

The project uses a warm, professional color palette:
- Primary: Orange tones (#F97316, #FB923C)
- Secondary: Purple accents (#9333EA, #A855F7)
- Background: Slate grays (#0F172A, #1E293B)
- Success/Warning/Error: Standard colors

## Success Metrics (Hackathon Demo)

- Average call duration: 2-3 minutes
- Feedback generation: <10 seconds
- STT latency: <500ms
- TTS latency: <800ms
- Transcript accuracy: >90%
- Persona consistency: 95%+

## Competitive Advantages

1. **Voice-First AI** - Most competitors are text-based
2. **RAG-Powered Feedback** - Connects moments to proven concepts
3. **Mike Ferry Integration** - Specialized methodology
4. **Practice Loop** - Immediate feedback application
5. **24/7 Accessibility** - No scheduling needed

## Common Commands

```bash
# Frontend
npm run dev          # Start dev server (port 8080)
npm run build        # Production build
npm run preview      # Preview build

# Backend (TBD)
# Commands will be added when backend is implemented
```

---

## For AI Assistants: Key Considerations

1. **Frontend is Complete** - Focus backend work on API integration
2. **Mock Data** - Frontend currently uses mock data; needs real API connection
3. **Single Persona** - Only "Dominant & Aggressive" should be functional
4. **RAG is Critical** - Feedback quality depends on good concept matching
5. **Latency Matters** - Voice conversations need <1s round-trip
6. **Mike Ferry Focus** - All feedback should reference specific methodology principles
7. **Hackathon Scope** - Prioritize working MVP over feature completeness

## Using User Profile Data (Backend Integration)

When implementing the backend, the user profile should be used to personalize the experience:

### AI Persona Customization
```python
# Adjust persona based on profile
if profile.experience_level == 'beginner':
    difficulty = "Use simpler objections, be slightly easier"
elif profile.experience_level == 'veteran':
    difficulty = "Be more challenging, use complex objections"

# Adjust based on resilience (1-4 scale)
if profile.resilience_score < 3:
    aggression = "Be firm but not overly harsh"
else:
    aggression = "You can be very aggressive"
```

### Feedback Personalization
```python
# Adjust feedback tone based on learning style
if profile.learning_style == 'quick-wins':
    feedback_format = "Concise bullet points"
elif profile.learning_style == 'analytical':
    feedback_format = "Detailed analysis with examples"

# Focus on their specific challenges
focus_areas = profile.top_challenges  # e.g., ['fear', 'objections']
```

### Recommendations Algorithm
The Recommendations page calculates match scores:
- Lead Outreach: +15 if "fear" in challenges, +10 if "gatekeepers", +5 if beginner
- Objection Handling: +20 if "objections", +10 if "control"
- Pitching: +20 if "value" in challenges

## Next Steps (Backend Development)

1. Set up backend server (FastAPI recommended for Python)
2. Implement WebSocket for real-time voice streaming
3. Integrate STT service (Deepgram or OpenAI Whisper)
4. Integrate TTS service (ElevenLabs or OpenAI TTS)
5. Create LLM prompts for "Dominant & Aggressive" persona
6. Build RAG system with Mike Ferry knowledge base
7. Implement feedback generation pipeline
8. Add PDF generation
9. Create feedback chatbot endpoint
10. Connect frontend to backend APIs

---

**For complete details, always refer to `overview.md` and `frontend.md`**

*Last Updated: November 15, 2025 - Added comprehensive onboarding flow*