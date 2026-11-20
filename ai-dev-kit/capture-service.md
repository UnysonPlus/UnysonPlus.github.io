---
title: The Capture Service
sidebar_label: Capture Service
sidebar_position: 5
slug: /capture-service
description: The UnysonPlus Capture Service grabs a source page's rendered DOM, media, and computed styles so the Site Converter can rebuild it as native UnysonPlus pages.
---

# The Capture Service

The **Capture Service** is the companion tool that feeds the conversion pipeline. When you point the
agent at a URL, the capture step visits the page in a real browser and records everything the converter
needs to rebuild it faithfully:

- the **rendered DOM** (including JS-built content and inline SVGs a plain *view-source* misses),
- the page's **media** (images, video) so assets are side-loaded and used, not hot-linked, and
- the **computed styles** — the actual values behind the design, so the converter translates rather
  than guesses.

## Why it matters

This is what powers the **capture-first** rule ([How It Works](./how-it-works.md)): because the real
rendered page and its computed styles are captured up front, the converter can map each block to the
right shortcode with native options and compile the styling into design tokens — instead of the agent
hand-measuring the source.

## Running it

The service lives in the kit under the assembled capture pipeline and is a small Node tool. In the
`tools/design-capture` folder, install once (`npm install`), then capture a page:

```bash
node capture.mjs "https://example.com" capture-out/
```

It also runs as a local HTTP service that the WordPress **Site Converter** extension talks to, so you can
capture and convert straight from the *Unyson+ → Convert* screen. Its main endpoints:

| Endpoint | What it does |
|---|---|
| `/health` | Service status + version + which AI backend is active. |
| `/capture` | Render a live URL and return the converted bundle (or, with `?html=1`, the rendered HTML). |
| `/capture-screenshot` | The reference screenshot for a captured URL. |
| `/capture-file` | Upload a Stitch `.zip` or raw HTML and run it through the same engine as a live URL. |
| `/ai-convert` | Optional AI refinement of a draft mapping (uses your local AI backend). |
| `/pen-shortcode` | Turn a pasted pen (HTML/CSS/JS) into an installable UnysonPlus **shortcode** `.zip` — see [What It Can Build](./what-it-can-build.md#turn-a-pen-into-a-shortcode). |
| `/local-ai/chat*` | The dashboard's built-in chat (history / send / clear) against a local model. |
| `/studio/status`, `/studio/ai` | The [Kinetic Scenes](/kinetic-scenes)'s AI tab: whether AI is ready, and a scene file made (or changed) from a request. Only the Studio's own pages may call these. |
| `/studio/render` | Kinetic Scenes' video export: starts a render (scene, size, frame rate, MP4 or WebM), reports its progress, and serves the finished file. Headless Chrome draws each frame and ffmpeg encodes them. Only the Studio's own pages may call it. |
| `/hub/status` | The dashboard's Home page: the service version, whether AI is ready, and when the Site Converter, the AI Assistant and Kinetic Scenes last called the kit (and from which site). Kept in memory only, so it resets when the kit restarts. |

## The dashboard

Starting the AI Dev Kit (`start.bat` on Windows, `start.command` on macOS — or, run standalone, the service's own `start-converter.bat` / `.sh`)
also opens a **browser dashboard** at `http://localhost:4600`. It's the visual face of the
service, with these tabs:

- **Home** — where the dashboard opens: a card for each job the kit does (see [The Home page](#the-home-page) below).
- **Convert** — run and watch a URL → WordPress conversion live, with design tokens, section mapping, and
  a source-vs-result comparison.
- **Pen (Alpha)** — paste a pen's HTML/CSS/JS and download an installable shortcode `.zip` (see below).
- **Chat** — a chat panel backed by a local AI model (no key needed).
- **Benchmarks** — local-AI model benchmarks for conversion quality.
- **Settings** — the destination WordPress + token, and the local-AI model picker.

### The Home page

The dashboard opens on **Home**, which answers one question: is the kit ready for what you want to do? A line at the top
says whether the capture service is running (with its version and port), which AI is in use, and whether an update is
available. Under it is one card per job:

| Card | What it is for | Its button |
|---|---|---|
| **Create a Site** | Builds a site from a brief, a reference site, a design or an industry template, in your AI agent | Open the creator |
| **Kinetic Scenes** | The Studio's AI tab sends requests here and gets scenes back | Open the Studio |
| **Site Converter** | Captures a site in a real browser and rebuilds it in WordPress | Open the converter |
| **AI Assistant** | The chat panel in WordPress uses the kit's AI and tools on the same computer | AI settings |
| **SEO Check** | Checks a website the way a search engine sees it and gives one plan | Open the checker |

Each card shows its state with a coloured dot:

- **Ready** (green): the kit is running and can take the job. **Connected** means that job called the kit in the last
  hour (for Kinetic Scenes, that the Studio is open right now).
- **Running, but no AI is set up** (amber): the kit is up but has no AI to answer; pick one in **Settings** or with the
  AI picker at the top of the dashboard.
- **Not running** (grey): the capture service is off; start the kit again.

Under the state, a card lists the facts that matter for it: the AI it will use, when it was **last used** and from which
site, and for SEO Check the last site checked and its score. If part of the kit is older than the dashboard, Home says
to restart the kit to finish updating.

**Which AI does the work** is chosen with the picker at the top of every dashboard page: Automatic (the strongest one
available), your Claude, ChatGPT or Cursor subscription through its own command, a Claude API key, your own endpoint, a
local model, or no AI. Each choice says whether it can run on this computer. See
[Which AI does the work](/kinetic-scenes/ai#which-ai-does-the-work).

## The two ways to feed a source

| Input | How |
|---|---|
| **A live URL** (best) | The agent runs the capture service — it reads the DOM **and** computed styles. |
| **A downloaded bundle** | A zip of `devtools.html` + `view-source.html` + media + a screenshot, uploaded to the Site Converter. |

## Get it

The Capture Service is bundled with the kit (assembled on setup) and is also its own repository:
[github.com/UnysonPlus/UnysonPlus-Capture-Service](https://github.com/UnysonPlus/UnysonPlus-Capture-Service).

Next: **[Get the Kit](./get-the-kit.md)**.
