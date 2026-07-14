---
sidebar_position: 7
title: AI assist
---

# AI assist (optional)

By default the converter is **fully deterministic and offline** — no AI, no account, no keys. AI
assist is an **optional** refinement that, when enabled, has **Claude** improve the conversion. It
runs inside the **[capture service](./capture-service.md)** on your machine.

## What it does — refine the mapping, not the design

AI assist has a **deliberately narrow** job: make the **deterministic engine smarter**, never compete
with it. The engine already reads the source's real classes and reproduces the exact look (colors,
sizes, layout, header/footer). The AI only improves the **mapping** — the judgment calls a heuristic
gets wrong.

After the capture, the draft mapping (each block carries its source content) is sent to the service's
`POST /ai-convert`, where Claude returns **only a corrected mapping**:

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

The service auto‑detects a backend (order: `AI_BACKEND` env → API key → `claude` on PATH → off):

### Option A — Claude Code (your subscription)

1. Install the Claude Code CLI (native installer is most reliable on Windows):
   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```
   macOS / Linux:
   ```bash
   curl -fsSL https://claude.ai/install.sh | bash
   ```
2. Make sure `claude --version` works in a **new** terminal (add `~/.local/bin` to PATH if needed).
3. Run `claude` once, sign in, then `/exit`.
4. Restart the service (`node serve.mjs`) — its log should say **"AI ON — Claude Code subscription"**.

### Option B — Anthropic API key (pay‑per‑use)

Create a key at [console.anthropic.com](https://console.anthropic.com) (it needs billing and is
**separate** from a Claude.ai subscription), then start the service with it:

```powershell
$env:ANTHROPIC_API_KEY="sk-ant-..."; node serve.mjs
```
```bash
ANTHROPIC_API_KEY=sk-ant-... node serve.mjs
```

Either way, your key/subscription stays in the local service — **never** sent to or stored in
WordPress. The Convert screen shows the detected backend next to the AI checkbox (from `/health`).

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
| "no AI backend" | Sign in to Claude Code or set `ANTHROPIC_API_KEY`, then restart the service. |
| `claude --version` not recognized | Add the install folder to PATH (new terminal), or set `CLAUDE_CLI` to the binary path. |
| Want a specific model | Set `ANTHROPIC_MODEL` (e.g. `claude-opus-4-8`). |
| It "timed out" | Update the service (the AI step no longer caps runtime by default). |
