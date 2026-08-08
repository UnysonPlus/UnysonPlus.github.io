---
title: Quick Start
sidebar_label: Quick Start
sidebar_position: 2
slug: /quick-start
description: Set up the UnysonPlus AI Dev Kit in minutes — stand up WordPress with wp-env or your own install, then paste one prompt to have an AI agent build your site.
---

# Quick Start

Two steps: get a WordPress the agent can build into, then hand your agent the kit and one prompt.

## 1. A WordPress to build into

The agent builds into a running WordPress that already has the UnysonPlus **plugin** and the
**unysonplus-theme** parent active. Pick one path.

### Option A — one command (recommended)

Needs [Node](https://nodejs.org), [Docker](https://www.docker.com/products/docker-desktop/), and
[PowerShell](https://learn.microsoft.com/powershell/scripting/install/installing-powershell).

```bash
git clone https://github.com/UnysonPlus/UnysonPlus-AI-Dev-Kit
cd UnysonPlus-AI-Dev-Kit
pwsh assemble.ps1 -Source github   # downloads the full plugin (latest release) + parent theme
npx @wordpress/env start           # boots WordPress with both installed & active
```

WordPress is now at **http://localhost:8888** (admin at `/wp-admin`, user `admin` / pass `password`).
Stop it later with `npx @wordpress/env stop`.

### Option B — your own WordPress (Local, XAMPP, MAMP, a dev host…)

Install and activate these, then use your own site URL:

- **Classic Editor** — install & activate **first** (the page builder assumes the classic editor, not
  Gutenberg).
- **UnysonPlus plugin** — the **latest release zip** from
  [the releases page](https://github.com/UnysonPlus/UnysonPlus/releases/latest) → *Plugins → Add New →
  Upload*. Don't `git clone` the repo — that's core-only; the release zip is the full plugin.
- **unysonplus-theme (parent)** — [download ZIP](https://github.com/UnysonPlus/UnysonPlus-Theme) →
  *Appearance → Themes → Add New → Upload*.
- **Site Converter extension** — only if converting a source; activate it under *Unyson+ → Extensions*.

## 2. Point your agent at the kit and paste the prompt

Open your agent (Claude Code, Cursor, …) in the kit folder and paste this, filling the three blanks:

```text
Please turn this site — [SOURCE: a URL, or a file:// path to the mockup HTML] —
into a fully functional WordPress site using the UnysonPlus framework.

- The UnysonPlus AI Dev Kit is set up at: [PATH TO THIS KIT FOLDER]
- The source files I downloaded (mockup, images, video) are in: [PATH TO YOUR FILES]
- Create the dev site at: [DEV SITE URL — e.g. http://localhost:8888/]

Read the kit's AGENTS.md and PLAYBOOK.md and follow them.
```

That's the whole setup — everything after this, the agent does.

## What happens next

On its own, the agent will:

1. Assemble the plugin/theme sources if needed.
2. Copy the child-theme starter into WordPress, rename and activate it.
3. **Lock the header, footer, and container** to your mockup first — using native theme options — and
   **measure** instead of eyeballing.
4. Build the page **section by section**, then fill in the details.

See **[How It Works](./how-it-works.md)** for the method behind those steps.
