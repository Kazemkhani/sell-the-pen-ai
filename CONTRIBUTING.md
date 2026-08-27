# Contributing to Sell The Pen AI

Thanks for helping improve the practice loop. The best contributions make one behavior more observable, reproducible or useful without overstating what the score means.

## Before opening a pull request

1. Search existing issues and open a focused issue for large behavior changes.
2. Keep provider credentials in ignored environment files. Add only placeholders to `.env.example`.
3. Preserve the offline replay path. A reviewer must be able to inspect the core scorecard without external accounts.
4. Back changes to scoring language with a fixture or a clearly described manual reproduction.
5. Do not add testimonials, performance claims or certification language without published evidence.

## Local verification

```bash
npm ci
npm run lint
npm run build
npm audit --omit=dev --audit-level=moderate

cd backend
uv sync --frozen
uv run python -m compileall -q .
uv run python -c "from fastapi.testclient import TestClient; from main import app; assert TestClient(app).get('/').status_code == 200"
```

## Pull-request scope

- Keep one concern per pull request.
- Explain the user-visible change and its boundary.
- Add before/after screenshots for UI work.
- Call out new environment variables, external services and data-retention behavior.
- Never include real call transcripts or personally identifiable information in fixtures.

By contributing, you agree to follow [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) and license your contribution under the repository's MIT License.
