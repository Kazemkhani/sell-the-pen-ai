# Repository Guidelines

## Project Structure & Module Organization
Sell The Pen AI couples a Vite + React SPA with a FastAPI service. Frontend source lives in `src/`: reusable primitives in `components/ui`, screens in `pages` (including `pages/onboarding/*`), shared state in `contexts`, custom hooks in `hooks`, and utilities in `lib`. Static files sit in `public/`. The API lives under `backend/`; routers reside in `backend/app/routes`, AI/voice helpers in `backend/app/services`, stubs in `backend/app/db`, and persona prompt corpora in `backend/prompts`. The alias `@/` resolves to `src/` via `tsconfig.json`.

## Build, Test, and Development Commands
```bash
npm install          # sync frontend deps
npm run dev          # Vite dev server (http://localhost:5173)
npm run lint         # ESLint across TS/TSX
npm run build        # emits dist/
npm run preview      # serve the prod bundle
cd backend && uv sync
cd backend && uvicorn main:app --reload --port 3000
```
Run both servers together; FastAPI already whitelists localhost:5173 for CORS.

## Coding Style & Naming Conventions
Stick to TypeScript, functional React components, and two-space indentation. Components take PascalCase file names, hooks stay camelCase with a `use` prefix, and Tailwind class soup should be funneled through `cn()` from `src/lib/utils`. Keep JSX compact, colocate route-level state in the relevant page component, and surface shared logic through context providers (see `UserProfileProvider`). ESLint (React Hooks + Refresh configs) must be clean before pushing.

## Testing Guidelines
An automated suite has not been added yet. Until Vitest/React Testing Library are wired in, every change should: run `npm run lint`, document manual walkthrough steps for the touched flows (onboarding, recommendations, voice call), and provide HTTP examples when changing FastAPI endpoints. When introducing tests, place `*.test.tsx` next to the component or page, keep fixtures under `src/lib/__fixtures__`, and target the persona selection and scoring logic first.

## Commit & Pull Request Guidelines
Recent commits favor short, imperative subjects (“Build premium multi-page flow”). Follow that style, stay under 72 characters, and add optional scopes like `frontend:` when helpful. Pull requests need a concise description, screenshots or clips for UI updates, reproduction steps or curl samples for backend tweaks, linked issues, and callouts for migrations or env variables. Draft PRs are welcome for early design reviews.

## Security & Configuration Tips
Keep secrets out of the repo. Frontend keys belong in `/.env.local` (available via `import.meta.env`); the backend loads `OPENAI_API_KEY`, `DEEPGRAM_API_KEY`, and `PORT` through `python-dotenv`. Document any new variables in your PR and update `CORSMiddleware` origins if you change dev ports.
