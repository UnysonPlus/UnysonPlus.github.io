---
sidebar_position: 6
title: The capture service
---

# The capture service

The capture service is a small Node program that renders a page in **real Chrome** on your machine
and returns a conversion **bundle**. It powers *Convert from a URL* and — when running — *Convert
from a file* too. It requires **no AI API and no account**; its only dependency is `playwright-core`
(which drives your system Chrome).

## Install once

1. **Prerequisites** — [Node.js 20+](https://nodejs.org/) and
   [Google Chrome](https://www.google.com/chrome/). Confirm Node:
   ```bash
   node -v
   ```
2. **Go to the service folder** (in the `UnysonPlus-Capture-Service` clone):
   ```bash
   cd tools/design-capture
   npm install   # first time only
   ```
3. **Start it** (leave the terminal open while you convert):
   ```bash
   node serve.mjs
   ```
   It serves `http://localhost:8787`. The status next to the **Analyze & convert** button turns
   green once detected. Need a different port? Set `PORT` before starting.

:::tip No Node?
You can still convert a **file** offline (lower fidelity), and you can import a pre‑built bundle
`.zip` under **Manual tools**. The capture service is only needed to render live URLs (and to
render file uploads at full fidelity).
:::

## Endpoints

The service exposes a few CORS‑enabled endpoints (your admin browser calls them directly):

| Endpoint | Purpose |
|---|---|
| `GET /health` | `{ ok, service, version, aiReady, aiBackend }` — used to detect the service + show AI status |
| `GET /capture?url=<url>` | Render a live URL → `convert-bundle.zip` |
| `POST /capture-file` | Render an uploaded Stitch **.zip** or raw **HTML** body → `convert-bundle.zip` |
| `POST /ai-convert` | (Optional) Claude refines a draft mapping + authors a stylesheet — see [AI assist](./ai-assist.md) |

### How `/capture-file` works

The body is the raw file bytes. The service detects a `.zip` (PK signature) vs HTML, lays the files
out in a temp folder (so any relative assets resolve), then opens the main `code.html` in Chrome via
a proper `file://` URL and runs the **same extractor** as `/capture`. This is what gives a file
upload the full URL‑path quality.

## Rendering robustness

Two engine details make CDN‑driven exports (e.g. the **Tailwind Play CDN** that Google Stitch uses)
capture correctly:

- **Retry on context loss** — a late client re‑render can destroy the page's execution context
  mid‑extraction; the extractor retries.
- **Wait until styled** — Tailwind compiles its CSS *after* the network is idle, so the extractor
  waits until styling is actually applied (a substantial stylesheet exists / the real font is in
  use) before reading the page. Normal sites pass this instantly.

## Security & privacy

- Everything runs **on your machine**. Your admin browser talks to `localhost`; the WordPress
  server never reaches out.
- The service makes only one outbound connection: to **the page you're capturing** (to load it in
  Chrome). Nothing about your site is sent anywhere.
- If you enable AI, your Claude subscription / API key stays in the **local** service — it is never
  sent to or stored in WordPress.

## Troubleshooting

| Symptom | Fix |
|---|---|
| "service not detected" | The service isn't running, or the Service URL/port doesn't match. Start `node serve.mjs` and check the port. |
| A capture renders blank / 0 sections | A CDN style runtime hadn't applied yet — update to the latest service version (it waits for styling). On Windows, the service uses a correct `file://` URL automatically. |
| Capture is slow | First run downloads/launches Chrome; subsequent runs are faster. Heavy pages take longer to settle. |
| AI shows "no AI backend" | Sign in to Claude Code, or set `ANTHROPIC_API_KEY`, then restart the service. See [AI assist](./ai-assist.md). |
| Want a cap on AI runtime | The AI step has **no timeout** by default; set `AI_TIMEOUT_MS` (milliseconds) to impose one. |

The **Diagnostics** tab in *Unyson+ → Convert* has a live **Check now** button that pings
`/health`.
