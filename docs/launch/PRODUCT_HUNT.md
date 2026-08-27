# Sell The Pen AI Product Hunt launch kit

## Submission fields

- **Name:** Sell The Pen AI
- **Tagline:** Voice sales practice in hard mode.
- **URL:** https://sell-the-pen-ai.vercel.app/
- **Pricing:** Free
- **Topics:** AI Voice Agents; Sales Enablement; Productivity
- **Description:** Practice against a difficult AI buyer or replay a scored call. Review a 100-point, transcript-linked scorecard with exact line rewrites and one focused drill for your next rep.
- **Maker:** Amir Hossein Kazemkhani
- **Repository:** add only after Amir explicitly approves public visibility

## Gallery order

1. `product-hunt/gallery-01-hero.png` — the challenge and core promise.
2. `product-hunt/gallery-02-live-product.png` — the deployed landing page.
3. `product-hunt/gallery-03-hard-mode.png` — Mukesh's opening objection and the live voice interface.
4. `product-hunt/gallery-04-scorecard.png` — the real replay scorecard, not a fabricated mockup.
5. `product-hunt/gallery-05-loop.png` — take the call → inspect the tape → run the next drill.

All gallery images are 1270×760. Use `product-hunt/thumbnail.png` as the square thumbnail.

## 50-second video storyboard

0–5s — “Practice the call before it costs you the deal.”

5–12s — introduce Mukesh: Dubai property owner, skeptical, time-poor, hard mode.

12–24s — start the deployed call and include one interruption/objection.

24–31s — end the call; show the transcript moving into scoring.

31–43s — reveal the 100-point breakdown, then zoom into one quote and its exact rewrite.

43–50s — show the one next drill and end on “Get the bad rep out before a real prospect hears it.”

The final recording must use the deployed Vapi flow. Until the Vapi public key and assistant ID are configured on the production domain, record only the replay demo and do not call the product “live voice” in launch materials.

## Maker comment outline — rewrite in Amir's own words

Product Hunt prohibits AI-generated comments. Do not paste this outline verbatim.

1. Personal trigger: the gap between knowing a sales framework and staying composed when someone interrupts or objects.
2. The product decision: build one difficult rep first instead of a broad course library.
3. What happens: talk to the buyer, inspect the transcript, get five scores, exact rewrites and one next drill.
4. What changed during launch prep: removed unsupported performance claims, made the replay work without keys, cleared known dependency vulnerabilities and exposed the rubric boundary.
5. Honest boundary: one live persona today; two recorded fixtures; no claim that a score guarantees sales performance.
6. Ask one real question: which objection or buyer persona should become hard mode number two?

## Questions the maker must be ready to answer

### Is this just another sales chatbot?

The product is organised around a deliberate practice loop, not chat. The user faces a constrained buyer, the transcript is scored across five observable dimensions, specific lines are rewritten and the product chooses one next drill.

### Why only one persona?

Depth before breadth. The launch version proves the full voice-to-feedback loop with one difficult buyer. The first community-chosen objection/persona becomes the next release.

### Is the score scientifically validated?

No claim of clinical or causal validation is made. It is a transparent coaching rubric for opening, discovery, objection handling, appointment setting and delivery. Users can inspect how points were assigned.

### Do you record or retain calls?

The current demo keeps the transcript in browser session storage for the scoring flow. The privacy answer must be re-verified after production Vapi configuration and documented before launch.

### Are you affiliated with the sales authors referenced in the repository?

No. The repository credits frameworks that informed the rubric. It does not imply certification, endorsement or affiliation.

## Launch-day conversion path

Product Hunt → landing → **Enter the live drill** or **Replay a scored call** → scorecard → public GitHub repository/follow action.

Primary event: challenge or replay started.

Secondary events: scorecard completed; second drill started; GitHub visit; star/follow.

## Final gates

- [x] Unsupported testimonials and transformation metrics removed from the live landing.
- [x] Offline replay returns a complete scorecard without API keys.
- [x] Frontend lint passes.
- [x] Frontend production build passes.
- [x] Shipped npm audit reports zero known vulnerabilities.
- [x] Route-level code splitting implemented.
- [x] Public production URL deployed and checked.
- [ ] Vapi public key and assistant ID restricted to the production domain.
- [ ] Live microphone call tested on desktop and mobile.
- [ ] Backend tests and privacy language verified.
- [ ] Repository secret/history audit repeated immediately before public release.
- [ ] Amir explicitly approves changing the repository from private to public.
- [ ] Final assets exported and visually checked.
- [ ] 45–60 second deployed-product video uploaded to YouTube as unlisted/public, not private.
- [ ] Product Hunt draft and teaser scheduled.
