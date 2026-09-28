---
sidebar_position: 7
title: AI assist
---

# AI assist (optional)

By default the converter is **fully deterministic and offline** — no AI, no account, no keys. AI
assist is an **optional** refinement that, when enabled, has an **AI model** improve the conversion. It
runs inside the **[capture service](./capture-service.md)** on your machine.

## What it does — refine the mapping, not the design

AI assist has a **deliberately narrow** job: make the **deterministic engine smarter**, never compete
with it. The engine already reads the source's real classes and reproduces the exact look (colors,
sizes, layout, header/footer). The AI only improves the **mapping** — the judgment calls a heuristic
gets wrong.

After the capture, the draft mapping (each block carries its source content) is sent to the service's
`POST /ai-convert`, where the AI returns **only a corrected mapping**:

1. **Fix mis‑detected roles** — e.g. "this block is a heading, not a paragraph; this is a button."
2. **Mark decorative / chrome blocks** to skip.
3. **Recognize custom widgets** (an audio player, an image‑with‑overlay) and flag them as one
   verbatim `code` block so the engine keeps them pixel‑faithful.

It does **not** write any CSS or header/footer markup — the deterministic engine produces all of that
from the source. (Earlier versions had the AI author a whole stylesheet + chrome; that made the two
engines *conflict* — both writing CSS, the AI's version overriding the faithful one — so the AI was
scoped back to **mapping‑only**.)

AI assist is **best‑effort**: any failure (no backend, a network error) falls back to the pure
deterministic result, so a conversion never breaks. It's available on **both** the URL and the file
paths — tick **AI assist** in the options. An "AI‑refined" badge marks the reviewed mapping.

## It makes the engine smarter — locally, with no data collection

Every AI refinement also teaches the **offline** engine for next time: the diff between the AI's
mapping and the deterministic draft is distilled into **local learned rules** (`distill_from_ai()`),
which the no‑AI path consults first on future conversions. So the engine gradually needs the AI less —
which was the whole point of adding AI: to grow the deterministic engine's intelligence, not to fight it.

This learning is **100% local** — nothing about your pages is ever collected or sent anywhere. We
deliberately **rejected** any "collect samples from every user" telemetry: converted pages can contain
real, private content, and harvesting it would raise serious privacy and legal problems. Improvements
reach everyone only through the maintainer's reviewed, committed releases — never through harvested data.

## Backends — pick one

The service detects an AI backend by itself, in this order: an explicit backend setting, then a
provider API key, then a signed-in command-line AI agent (your subscription), then a selected free local
model, else off. Pick one:

- **Your AI subscription**, through the command-line agent it signs in with: no key needed.
- **A provider API key**: pay per use, set when starting the service.
- **A free local model**, downloaded in the AI Dev Kit dashboard.

The exact steps for each service are in the guide
**[Set up AI for Unyson+](/guides/set-up-ai-for-unysonplus)**. Either way, your key or subscription
stays in the local service — **never** sent to or stored in WordPress. The Convert screen shows the
detected backend next to the AI checkbox (from `/health`).

## Runtime & cost

- The AI step now returns **only a refined mapping** (no stylesheet/chrome authoring), so it's much
  lighter and faster than before. A transient API hiccup is retried automatically; set `AI_TIMEOUT_MS`
  (ms) to impose a cap if you want one.
- A rotating progress message plays during the wait, so a longer run never looks stuck.

## When to use it (and when not)

Use AI assist when the source's **structure is ambiguous** and the heuristic mis‑identifies elements —
unusual section layouts, custom widgets, decorative bands. For clean, conventional pages the
deterministic mapping is already correct and instant, so AI adds little. Because the AI now only
corrects the **mapping** (never the CSS or layout reproduction), turning it on no longer changes the
*look* — only *what each element is mapped to* — so it can't make a conversion look worse than the
deterministic baseline; at worst it's a no‑op.

## Troubleshooting

| Symptom | Fix |
|---|---|
| "no AI backend" | Sign in the command-line agent, set a provider API key, or select a local model, then restart the service ([setup guide](/guides/set-up-ai-for-unysonplus)). |
| The agent's command is not recognized | Add its install folder to PATH (new terminal), or point the service at the program's full path ([setup guide](/guides/set-up-ai-for-unysonplus#troubleshooting)). |
| Want a specific model | Set the model environment variable before starting the service ([setup guide](/guides/set-up-ai-for-unysonplus#troubleshooting)). |
| It "timed out" | Update the service (the AI step no longer caps runtime by default). |
