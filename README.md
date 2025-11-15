# Sell The Pen AI

> AI-Powered Sales Training Platform for Real Estate Agents

**Built with:** React + TypeScript + Vapi + FastAPI

---

## 🚀 Quick Start

### Prerequisites

- **Node.js & npm** - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **Python 3.12+** - [Download](https://www.python.org/downloads/)
- **UV** (Python package manager) - [Install](https://docs.astral.sh/uv/)

### Frontend Setup

```sh
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env

# 3. Add your Vapi API keys to .env
# VITE_VAPI_PUBLIC_KEY=your_vapi_public_key_here
# VITE_VAPI_ASSISTANT_ID=your_assistant_id_here

# 4. Start the development server
npm run dev

# Frontend will run on http://localhost:8080
```

### Backend Setup

```sh
# 1. Navigate to backend directory
cd backend

# 2. Create virtual environment with UV
uv venv

# 3. Activate virtual environment
# On macOS/Linux:
source .venv/bin/activate
# On Windows:
# .venv\Scripts\activate

# 4. Install dependencies
uv pip install .

# 5. Set up environment variables
cp .env.example .env

# 6. Add your API keys to .env
# OPENAI_API_KEY=sk-...
# DEEPGRAM_API_KEY=...

# 7. Start the development server
make dev
# Or manually: uvicorn main:app --reload --port 3000

# Backend will run on http://localhost:3000
```

---

## 📁 Project Structure

```
sell-pen-ai-flow/
├── src/                    # Frontend React app
│   ├── pages/             # Page components
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React contexts (UserProfile)
│   └── types/             # TypeScript types
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Business logic
│   │   └── db/           # Database schemas
│   └── main.py           # FastAPI app entry
├── docs/                  # Documentation
│   ├── overview.md       # Complete project overview
│   ├── frontend.md       # Frontend documentation
│   ├── USER_FLOW.md      # User flow diagram
│   └── architecture.md   # System architecture
├── CLAUDE.md             # AI assistant context (root level)
├── AGENTS.md             # AI agents documentation (root level)
└── README.md             # This file
```

---

## 🎯 Features

- ✅ **Lead Outreach Training** - Voice AI cold calling practice with Vapi
- ✅ **Proposal Crafting** - PDF analysis with Tom Sant methodology
- ✅ **8-Step Onboarding** - Personalized user profiling
- ✅ **Smart Recommendations** - AI-powered skill matching
- 🚧 **Objection Handling** - Coming soon

---

## 🔑 Environment Variables

### Frontend (.env)
```env
VITE_VAPI_PUBLIC_KEY=your_vapi_public_key
VITE_VAPI_ASSISTANT_ID=your_vapi_assistant_id
```

### Backend (.env)
```env
PORT=3000
OPENAI_API_KEY=sk-...
DEEPGRAM_API_KEY=...
DATABASE_URL=postgresql://user:password@localhost:5432/sellpenai
```

---

## 🛠️ Development

### Frontend Commands
```sh
npm run dev          # Start dev server (port 8080)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Commands
```sh
make dev             # Start FastAPI with auto-reload
make test            # Run tests (when implemented)
```

---

## 📚 Documentation

- **[overview.md](./docs/overview.md)** - Complete project overview and architecture
- **[frontend.md](./docs/frontend.md)** - Frontend implementation details
- **[USER_FLOW.md](./docs/USER_FLOW.md)** - User journey and flow diagrams
- **[CLAUDE.md](./CLAUDE.md)** - AI assistant context and guidelines
- **[AGENTS.md](./AGENTS.md)** - AI agents documentation

---

## 🌐 Deployment

### Frontend (Lovable)

Simply open [Lovable](https://lovable.dev/projects/db80a086-dcba-4b60-a1b5-fc8790686bde) and click **Share → Publish**.

### Backend

Deploy to Railway, Render, or any Python hosting platform:

```sh
# Install dependencies
uv pip install .

# Run with uvicorn
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## 🤝 Contributing

### Use Lovable (Recommended)

Visit the [Lovable Project](https://lovable.dev/projects/db80a086-dcba-4b60-a1b5-fc8790686bde) and start prompting. Changes are auto-committed.

### Local Development

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd sell-pen-ai-flow

# Make changes and push
git add .
git commit -m "Your changes"
git push
```

---

## 🎓 Methodologies

- **Mike Ferry** - Cold calling for Lead Outreach training
- **Tom Sant** - "Persuasive Business Proposals" for Proposal Crafting

## 💻 Tech Stack

**Frontend:**
- React 18.3.1 + TypeScript 5.8.3
- Vite 5.4.19 (build tool)
- Tailwind CSS 3.4.17
- shadcn/ui components
- React Router DOM 6.30.1
- Vapi (voice AI integration)

**Backend:**
- FastAPI (Python 3.12)
- UV (package manager)
- PostgreSQL (database)
- OpenAI GPT-4 (analysis)
- Deepgram/OpenAI (speech services)

---

## 📖 Additional Resources

- **Lovable Project URL**: https://lovable.dev/projects/db80a086-dcba-4b60-a1b5-fc8790686bde
- **Custom Domain Setup**: [Lovable Docs](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

**Hackathon Project** | Theme: Digital Economy & Future of Work | November 2025
