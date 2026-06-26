---
sidebar_position: 6
title: AI assist
---

# AI assist (optional)

By default the converter is **fully deterministic and offline** — no AI, no account, no keys. AI
assist is an **optional** refinement that, when enabled, has **Claude** improve the conversion. It
runs inside the **[capture service](./capture-service.md)** on your machine.

## What it does

After the capture, the draft mapping (each section carries its source markup) is sent to the
service's `POST /ai-convert`, where Claude returns:

1. A **refined section→element mapping** — fixing mis‑detected roles and structure.
2. A **higher‑fidelity stylesheet** — merged into the child theme **after** the deterministic
   per‑section CSS, so it wins the cascade.

The header/footer keep the dynamic WordPress mirror (real nav menu + footer widgets). AI assist is
**best‑effort**: any failure (no backend, a network error) falls back to the deterministic result
with no AI CSS, so a conversion never breaks.

It's available on **both** the URL and the file paths — tick **AI assist** in the options. An
"AI‑refined" badge marks the reviewed mapping.

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

- The AI step authors a full stylesheet + refined mapping in one turn; it can take a few minutes for
  design‑heavy pages. There is **no timeout** by default — set `AI_TIMEOUT_MS` (ms) to impose one.
- A rotating progress message plays during the wait (named steps, then reassurances tied to the
  progress bar), so a long run never looks stuck.

## When to use it (and when not)

AI assist shines on **visually rich** pages where matching the exact look matters. For
structurally‑simple pages, the deterministic result is already clean and instant. Because the AI
authors a stylesheet on top of the page‑builder DOM, results vary with design complexity — if a
conversion ever looks worse with AI on, convert with it **off** (the deterministic path matches the
builder markup) and refine in the builder.

## Troubleshooting

| Symptom | Fix |
|---|---|
| "no AI backend" | Sign in to Claude Code or set `ANTHROPIC_API_KEY`, then restart the service. |
| `claude --version` not recognized | Add the install folder to PATH (new terminal), or set `CLAUDE_CLI` to the binary path. |
| Want a specific model | Set `ANTHROPIC_MODEL` (e.g. `claude-opus-4-8`). |
| It "timed out" | Update the service (the AI step no longer caps runtime by default). |
