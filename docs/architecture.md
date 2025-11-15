# Sell The Pen AI - Architecture Documentation

## System Overview

```mermaid
graph TB
    User[User/Sales Rep] --> Frontend[React Frontend]
    Frontend --> Backend[Backend API Server]
    Backend --> STT[Speech-to-Text Service]
    Backend --> TTS[Text-to-Speech Service]
    Backend --> LLM[LLM Service<br/>GPT-4/Claude]
    Backend --> VectorDB[(Vector Database<br/>Pinecone/Chroma)]
    Backend --> DB[(PostgreSQL/MongoDB)]

    VectorDB --> RAG[RAG System]
    RAG --> LLM

    Backend --> PDF[PDF Generator]

    style Frontend fill:#fb923c
    style Backend fill:#9333ea
    style LLM fill:#10b981
    style VectorDB fill:#3b82f6
    style RAG fill:#3b82f6
```

## Frontend Architecture

```mermaid
graph TB
    subgraph "React Application (Port 8080)"
        Router[React Router] --> Landing[Landing Page]
        Router --> Onboarding[Onboarding Flow<br/>8 Steps]
        Router --> Recommendations[Recommendations]
        Router --> TryNow[Skill Selection]
        Router --> Persona[Persona Selection]
        Router --> Call[Call Simulation]
        Router --> Feedback[Feedback Display]

        Onboarding --> Step1[Basic Info]
        Onboarding --> Step2[Experience]
        Onboarding --> Step3[Role]
        Onboarding --> Step4[Rejection Handling]
        Onboarding --> Step5[Communication Style]
        Onboarding --> Step6[Top Challenges]
        Onboarding --> Step7[Learning Style]
        Onboarding --> Step8[Goals & Timeline]

        Step8 --> ProfileContext[UserProfile Context]
        ProfileContext --> LocalStorage[(localStorage)]
        ProfileContext --> AllPages[All Pages<br/>User Greeting]

        Call --> WS[WebSocket Client]
        Call --> Audio[Audio Recording]
        Call --> Transcript[Live Transcript]

        Feedback --> Chat[Feedback Chatbot]
        Feedback --> PDFDownload[PDF Download]

        subgraph "State Management"
            ReactQuery[React Query]
            ProfileContext
        end

        subgraph "UI Components"
            Shadcn[50+ shadcn/ui<br/>Components]
            Tailwind[Tailwind CSS]
        end
    end

    style ProfileContext fill:#f97316
    style ReactQuery fill:#a855f7
```

## Backend Architecture (Planned)

```mermaid
graph TB
    subgraph "API Server (FastAPI/Express)"
        Gateway[API Gateway] --> SessionMgr[Session Manager]
        Gateway --> ChatAPI[Chat API]
        Gateway --> PersonaAPI[Persona API]

        SessionMgr --> WSHandler[WebSocket Handler]

        WSHandler --> AudioPipeline[Audio Pipeline]
        AudioPipeline --> STTService[STT Integration]
        AudioPipeline --> TTSService[TTS Integration]
        AudioPipeline --> LLMService[LLM Integration]

        LLMService --> PromptEngine[Prompt Engine<br/>Persona Templates]
        LLMService --> ContextManager[Conversation Context]

        SessionMgr --> FeedbackEngine[Feedback Engine]
        FeedbackEngine --> RAGSystem[RAG System]
        RAGSystem --> Embeddings[Embedding Service<br/>OpenAI/text-embedding-3]
        RAGSystem --> VectorSearch[(Vector Database)]

        FeedbackEngine --> Scorer[4-Category Scorer<br/>Opening/Objection/Control/Close]
        Scorer --> ConceptMatcher[Concept Matcher<br/>Mike Ferry Principles]

        FeedbackEngine --> PDFGen[PDF Generator]

        ChatAPI --> ChatBot[Feedback Chatbot<br/>RAG-Enhanced]

        SessionMgr --> DB[(Database)]
        FeedbackEngine --> DB

        subgraph "Knowledge Base"
            MikeFerry[Mike Ferry Methodology]
            MikeFerry --> Opening[Opening Statements]
            MikeFerry --> Objection[Objection Handling]
            MikeFerry --> Control[Conversation Control]
            MikeFerry --> Closing[Closing Techniques]
        end
    end

    style RAGSystem fill:#3b82f6
    style FeedbackEngine fill:#10b981
    style PromptEngine fill:#f59e0b
```

## Data Flow - Call Simulation

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant STT
    participant LLM
    participant TTS
    participant RAG

    User->>Frontend: Start Call
    Frontend->>Backend: POST /api/sessions/start<br/>{profile, skill, persona}
    Backend->>Backend: Initialize session<br/>Load persona prompt
    Backend-->>Frontend: {sessionId, wsUrl}

    Frontend->>Backend: WS Connect
    Backend-->>Frontend: Connected

    loop Real-time Conversation
        User->>Frontend: Speak (audio)
        Frontend->>Backend: Send audio chunk
        Backend->>STT: Transcribe
        STT-->>Backend: Text transcript
        Backend->>LLM: Generate response<br/>{transcript, persona, context}
        LLM-->>Backend: AI response text
        Backend->>TTS: Synthesize speech
        TTS-->>Backend: Audio response
        Backend-->>Frontend: Audio + transcript
        Frontend-->>User: Play audio + show text
    end

    User->>Frontend: End Call
    Frontend->>Backend: POST /api/sessions/:id/end
    Backend->>Backend: Save transcript
    Backend->>RAG: Analyze conversation<br/>Extract key moments
    RAG->>RAG: Match to Mike Ferry concepts
    Backend->>Backend: Calculate scores<br/>Generate feedback
    Backend-->>Frontend: {feedbackId}
    Frontend->>Backend: GET /api/sessions/:id/feedback
    Backend-->>Frontend: Feedback data
    Frontend-->>User: Display feedback
```

## Data Flow - Feedback Generation

```mermaid
graph LR
    Transcript[Call Transcript] --> Analyzer[Conversation Analyzer]

    Analyzer --> Moments[Key Moments<br/>Extraction]
    Moments --> Opening[Opening Analysis]
    Moments --> Objections[Objection Analysis]
    Moments --> Control[Control Analysis]
    Moments --> Close[Close Analysis]

    Opening --> RAG1[RAG Search]
    Objections --> RAG2[RAG Search]
    Control --> RAG3[RAG Search]
    Close --> RAG4[RAG Search]

    subgraph "Vector Database"
        KB[Mike Ferry<br/>Knowledge Base]
    end

    RAG1 --> KB
    RAG2 --> KB
    RAG3 --> KB
    RAG4 --> KB

    RAG1 --> Scorer1[Score Opening<br/>/10]
    RAG2 --> Scorer2[Score Objection<br/>/10]
    RAG3 --> Scorer3[Score Control<br/>/10]
    RAG4 --> Scorer4[Score Close<br/>/10]

    Scorer1 --> Combiner[Feedback Combiner]
    Scorer2 --> Combiner
    Scorer3 --> Combiner
    Scorer4 --> Combiner

    Profile[User Profile] --> Combiner

    Combiner --> Personalizer[Personalize Tone<br/>& Focus Areas]
    Personalizer --> Output[Final Feedback<br/>+ PDF]

    style RAG1 fill:#3b82f6
    style RAG2 fill:#3b82f6
    style RAG3 fill:#3b82f6
    style RAG4 fill:#3b82f6
```

## User Journey Flow

```mermaid
graph TD
    Start[Landing Page] --> Onboarding[8-Step Onboarding]

    Onboarding --> Profile[Profile Created<br/>Stored in localStorage]
    Profile --> Recs[Recommendations Page<br/>Smart Matching]

    Recs --> Choice{User Choice}
    Choice --> |Lead Outreach| Skills1[Skill Selection]
    Choice --> |Objection Handling| Skills2[Skill Selection]
    Choice --> |Pitching| Disabled[Disabled - Coming Soon]

    Skills1 --> PersonaSelect[Persona Selection<br/>Only: Dominant & Aggressive]
    Skills2 --> PersonaSelect

    PersonaSelect --> CallSim[Call Simulation<br/>Voice AI Conversation]

    CallSim --> Speaking{Call Active}
    Speaking --> |Continue| Speaking
    Speaking --> |End Call| Processing[Processing...]

    Processing --> FeedbackPage[Feedback Display<br/>4-Category Scores]

    FeedbackPage --> Actions{Next Action}
    Actions --> |Download| PDF[Download PDF]
    Actions --> |Ask Question| Chatbot[Feedback Chatbot]
    Actions --> |Practice Again| PersonaSelect
    Actions --> |Change Skill| Skills1

    style Profile fill:#f97316
    style CallSim fill:#9333ea
    style FeedbackPage fill:#10b981
```

## Technology Stack Detail

```mermaid
graph TB
    subgraph "Frontend Stack"
        React[React 18.3.1] --> TS[TypeScript 5.8.3]
        React --> Vite[Vite 5.4.19]
        React --> Router[React Router 6.30.1]
        React --> Query[React Query 5.83.0]
        React --> Tailwind[Tailwind CSS 3.4.17]
        React --> Shadcn[shadcn/ui<br/>Radix Primitives]
    end

    subgraph "Backend Stack (Planned)"
        Server[FastAPI / Express] --> Lang{Language}
        Lang --> Python[Python 3.11+]
        Lang --> Node[Node.js 20+]
        Server --> WS[WebSocket Support]
        Server --> DB[(PostgreSQL /<br/>MongoDB)]
    end

    subgraph "AI Services"
        STT[Speech-to-Text]
        STT --> Deepgram[Deepgram API]
        STT --> Whisper[OpenAI Whisper]
        STT --> GoogleSTT[Google Cloud STT]

        TTS[Text-to-Speech]
        TTS --> ElevenLabs[ElevenLabs]
        TTS --> OpenAITTS[OpenAI TTS]
        TTS --> GoogleTTS[Google Cloud TTS]

        LLM[Large Language Model]
        LLM --> GPT4[OpenAI GPT-4]
        LLM --> Claude[Anthropic Claude]

        Vector[Vector Database]
        Vector --> Pinecone[Pinecone]
        Vector --> Chroma[Chroma]
        Vector --> Weaviate[Weaviate]

        Embed[Embeddings]
        Embed --> OpenAIEmbed[OpenAI<br/>text-embedding-3]
    end

    style React fill:#fb923c
    style Server fill:#9333ea
    style LLM fill:#10b981
    style Vector fill:#3b82f6
```

## API Endpoints

```mermaid
graph LR
    subgraph "REST API"
        POST1[POST /api/sessions/start]
        POST2[POST /api/sessions/:id/end]
        GET1[GET /api/sessions/:id/feedback]
        GET2[GET /api/sessions/:id/pdf]
        POST3[POST /api/chat/feedback]
        GET3[GET /api/personas]
        GET4[GET /api/health]
    end

    subgraph "WebSocket"
        WS1[WS /api/sessions/:id/stream]
    end

    POST1 --> SessionCreate[Create Session<br/>Initialize Context]
    WS1 --> Streaming[Real-time Audio<br/>Bidirectional]
    POST2 --> SessionEnd[End Session<br/>Trigger Feedback]
    GET1 --> FeedbackData[Return Feedback<br/>JSON]
    GET2 --> PDFFile[Generate & Return<br/>PDF]
    POST3 --> ChatResponse[Chatbot Response<br/>RAG-Enhanced]
    GET3 --> PersonaList[List Available<br/>Personas]

    style POST1 fill:#10b981
    style WS1 fill:#f59e0b
    style GET1 fill:#3b82f6
```

## Persona Prompt System

```mermaid
graph TB
    UserProfile[User Profile] --> Loader[Persona Loader]
    PersonaSelect[Selected Persona<br/>Dominant & Aggressive] --> Loader

    Loader --> BasePrompt[Base Persona Prompt<br/>Character & Behavior]

    BasePrompt --> Customizer[Prompt Customizer]
    UserProfile --> Customizer

    Customizer --> Experience{Experience Level}
    Experience --> |Beginner| Easy[Easier Objections<br/>More Forgiving]
    Experience --> |Veteran| Hard[Complex Objections<br/>More Challenging]

    Customizer --> Resilience{Resilience Score}
    Resilience --> |Low 1-2| Gentle[Firm but Not Harsh]
    Resilience --> |High 3-4| Aggressive[Very Aggressive]

    Customizer --> Challenges[Focus on<br/>Top Challenges]
    Challenges --> Fear[Address Fear]
    Challenges --> Objections[Throw Objections]

    Easy --> FinalPrompt[Final Persona Prompt]
    Hard --> FinalPrompt
    Gentle --> FinalPrompt
    Aggressive --> FinalPrompt
    Challenges --> FinalPrompt

    FinalPrompt --> LLM[LLM Context<br/>During Call]

    style UserProfile fill:#f97316
    style FinalPrompt fill:#9333ea
```

## RAG System Architecture

```mermaid
graph TB
    subgraph "Knowledge Base Preparation (Offline)"
        Docs[Mike Ferry<br/>Documents] --> Chunker[Document Chunker]
        Chunker --> Chunks[Text Chunks<br/>~500 tokens]
        Chunks --> Embedder[Embedding Model]
        Embedder --> Vectors[Vector Embeddings]
        Vectors --> Store[(Vector Database)]

        Metadata[Metadata<br/>Category/Topic/Source] --> Store
    end

    subgraph "Query Time (Runtime)"
        Transcript[Call Transcript<br/>Key Moment] --> QueryEmbed[Embed Query]
        QueryEmbed --> Search[Similarity Search<br/>Top-K Results]
        Store --> Search
        Search --> Results[Relevant Concepts<br/>Mike Ferry Principles]

        Results --> Context[Build LLM Context]
        Transcript --> Context
        UserProfile[User Profile] --> Context

        Context --> LLM[LLM Generate<br/>Feedback]
        LLM --> Feedback[Personalized<br/>Feedback]
    end

    style Store fill:#3b82f6
    style LLM fill:#10b981
    style Feedback fill:#f97316
```

## Performance Requirements

```mermaid
graph LR
    subgraph "Latency Targets"
        STTLatency[STT Latency<br/>< 500ms]
        TTSLatency[TTS Latency<br/>< 800ms]
        RoundTrip[Round Trip<br/>< 1 second]
        FeedbackGen[Feedback Gen<br/>< 10 seconds]
    end

    subgraph "Quality Targets"
        TranscriptAcc[Transcript Accuracy<br/>> 90%]
        PersonaConsist[Persona Consistency<br/>> 95%]
        CallDuration[Avg Call Duration<br/>2-3 minutes]
    end

    subgraph "Scalability"
        Concurrent[Concurrent Users<br/>Initial: 10-50]
        Future[Future: 100-500]
    end

    style RoundTrip fill:#ef4444
    style FeedbackGen fill:#f59e0b
    style TranscriptAcc fill:#10b981
```

## Deployment Architecture (Future)

```mermaid
graph TB
    subgraph "Production Environment"
        LB[Load Balancer<br/>NGINX/Cloudflare]

        LB --> FE1[Frontend<br/>React App<br/>CDN/Vercel]

        LB --> BE1[Backend Server 1]
        LB --> BE2[Backend Server 2]
        LB --> BE3[Backend Server 3]

        BE1 --> Cache[(Redis Cache<br/>Session State)]
        BE2 --> Cache
        BE3 --> Cache

        BE1 --> PrimaryDB[(Primary DB<br/>PostgreSQL)]
        BE2 --> PrimaryDB
        BE3 --> PrimaryDB

        PrimaryDB --> Replica[(Read Replica)]

        BE1 --> VectorDB[(Vector DB<br/>Pinecone)]
        BE2 --> VectorDB
        BE3 --> VectorDB

        BE1 --> S3[(S3/Storage<br/>PDFs/Audio)]
        BE2 --> S3
        BE3 --> S3
    end

    subgraph "External Services"
        STTService[STT API<br/>Deepgram]
        TTSService[TTS API<br/>ElevenLabs]
        LLMService[LLM API<br/>OpenAI/Anthropic]
    end

    BE1 --> STTService
    BE1 --> TTSService
    BE1 --> LLMService

    style LB fill:#f59e0b
    style FE1 fill:#fb923c
    style PrimaryDB fill:#3b82f6
    style VectorDB fill:#3b82f6
```

---

## Notes

- **Frontend:** Production-ready, all UI complete
- **Backend:** In development, core services planned
- **AI Integration:** STT/TTS/LLM vendors to be finalized
- **Hackathon Scope:** Single persona, basic RAG, MVP feedback
- **Post-Hackathon:** Multi-persona, auth, analytics, scaling

**Last Updated:** November 15, 2025
