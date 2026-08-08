---
title: Get the Kit
sidebar_label: Get the Kit
sidebar_position: 6
slug: /get-the-kit
description: Download the UnysonPlus AI Dev Kit from GitHub, check the requirements, and keep it up to date so you always build against the current plugin and theme.
---

# Get the Kit

The AI Dev Kit is a public GitHub repository. Clone it, run the setup, and you're ready to build.

## Requirements

- **[Node](https://nodejs.org)** — for the setup scripts and the capture pipeline.
- **[Docker](https://www.docker.com/products/docker-desktop/)** — only for the one-command WordPress
  (`wp-env`); skip it if you use your own local WordPress.
- **[PowerShell](https://learn.microsoft.com/powershell/scripting/install/installing-powershell)** — for
  the `assemble.ps1` / `update.ps1` scripts.
- A **WordPress** with the UnysonPlus plugin + parent theme active (the kit can provision this for you).

## Download

```bash
git clone https://github.com/UnysonPlus/UnysonPlus-AI-Dev-Kit
cd UnysonPlus-AI-Dev-Kit
pwsh assemble.ps1 -Source github   # pulls the full plugin (latest release) + parent theme
```

Repository: [github.com/UnysonPlus/UnysonPlus-AI-Dev-Kit](https://github.com/UnysonPlus/UnysonPlus-AI-Dev-Kit).

Then follow **[Quick Start](./quick-start.md)** to boot WordPress and run your first build.

## Keeping it current

The bundled plugin, theme, and playbook evolve. Refresh with one command whenever you come back, so you
always build against the current sources:

```powershell
pwsh update.ps1 -Check     # "are there updates?" — reports only, changes nothing
pwsh update.ps1            # pull the kit + re-assemble sources + refresh dependencies
pwsh update.ps1 -Source github   # same, on a non-maintainer machine
```

## What's inside

| Path | |
|---|---|
| `README.md` | The front door — WordPress setup + the kickoff prompt. |
| `AGENTS.md` | The AI entry point — purpose, layout, process. |
| `PLAYBOOK.md` | The outside-in build process (frame → sections → elements). |
| `docs/` | Reference docs (per shortcode / option type / module / extension) + the build protocol. |
| `tools/` | The measure / compare / capture / build tooling. |
| `assemble.ps1` · `.wp-env.json` | Populate the assembled sources; one-command WordPress. |

## For AI agents

If you're an agent working in the kit, your entry point is **`AGENTS.md`** → **`PLAYBOOK.md`** — read
those and follow them. This documentation site is the human-facing overview; the kit repo carries the
full build instructions.
