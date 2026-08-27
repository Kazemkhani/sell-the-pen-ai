# Security Policy

Thanks for taking the time to examine the security of **Sell The Pen AI**. Reports are welcome and reviewed carefully.

The pre-launch security review and shipped mitigations are documented in [`docs/SECURITY_AUDIT.md`](./docs/SECURITY_AUDIT.md). This file defines the disclosure process.

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security reports. Instead, email:

> **amir@amirkazemkhani.com** (or contact [@Kazemkhani](https://github.com/Kazemkhani))

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
