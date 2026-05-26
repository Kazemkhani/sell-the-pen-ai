# Security Policy

Thanks for taking the time to look at the security of **Sell The Pen AI**. This project is currently in a hackathon / portfolio stage, so the surface area is small — but reports are welcome and read carefully.

> **Internal note:** the full pre-launch security audit (including findings and fixes that have already shipped) lives at [`docs/SECURITY_AUDIT.md`](./docs/SECURITY_AUDIT.md) for the maintainers' reference. This file is the public-facing disclosure policy.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security reports. Instead, email:

> **security@novalabs.ae** (or DM [@amirhosseinkazemkhani](https://github.com/amirhosseinkazemkhani))

Include:

- A short description of the issue and its impact.
- Steps to reproduce (or a minimal proof of concept).
- Any affected versions / commits.

You should expect an initial reply within **72 hours**. If the issue is confirmed, I'll work on a fix and credit you in the release notes (unless you prefer to stay anonymous).

## Scope

In scope:

- The application code under `src/` and `backend/`.
- Misconfigurations that could leak API keys, transcripts, or generated reports.
- Authentication / authorisation logic once it ships.

Out of scope:

- Vulnerabilities in third-party services we depend on (please report those upstream): Vapi, OpenAI, Deepgram, Supabase, etc.
- Issues that require physical access to a user's machine.
- Rate-limit / DoS reports against the local dev server.

## Handling of secrets

- **No production secrets are stored in this repository.** All API keys are loaded from `.env` files that are git-ignored.
- The Vapi *public* key is shipped to the browser by design — it must be restricted to your production domain(s) in the Vapi dashboard.
- The Vapi *private* key, OpenAI key, and database URL are server-only and are never returned to the client.

If you ever see a real secret in this repo's history, **please report it immediately** so it can be rotated.
