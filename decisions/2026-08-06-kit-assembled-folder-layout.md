---
slug: kit-assembled-folder-layout
title: "Why the AI Dev Kit's fetched folders live under assembled/"
authors: [jon]
tags: [architecture, naming]
date: 2026-08-06
description: The AI Dev Kit's root had grown cluttered because its five gitignored, assemble.ps1-populated folders (the full plugin, parent theme, child-theme starter, capture service, site-converter extension) sat right next to the kit's own authored files (AGENTS.md, PLAYBOOK.md, docs/, scripts, launchers). We moved all machine-fetched folders under a single assembled/ directory — self-documenting as "produced by assemble.ps1, don't hand-edit" — so the root shows only what a human authors, and added a samples/ folder for the sample-* examples.
---

**The question:** As the AI Dev Kit grew, its root filled with a mix of hand-authored files and
machine-fetched folders. Should the fetched/assembled folders be collected into one directory — and
if so, what should it be called?

<!-- truncate -->

## Context

The kit is a git repo of *authored* material — `AGENTS.md`, `PLAYBOOK.md`, `README.md`,
`START-HERE.md`, `docs/`, `assemble.ps1`, `update.ps1`, the one-click launchers. On top of that,
`assemble.ps1` populates **five heavy, gitignored folders** from their own sources so the kit never
drifts from the real projects: the full plugin (`unysonplus/`), the parent theme
(`unysonplus-theme/`), the child-theme starter (`unysonplus-theme-child/`), and clones of the two
conversion repos (`UnysonPlus-Capture-Service/`, `UnysonPlus-Site-Converter-Extension/`) — plus, opt-in,
a portable `ollama/`.

At the root, those six machine-managed folders sat interleaved with the authored files. Nothing was
*broken*, but a human (or an agent) scanning the root couldn't tell at a glance what was theirs to edit
versus what was regenerated and should never be hand-touched.

## Options considered

- **Leave it flat** — no churn, but the root stays ambiguous and grows worse as more is bundled.
- **`vendor/`** — a familiar convention for third-party dependencies. But these aren't third-party;
  they're *our own* projects mirrored in, so "vendor" reads wrong.
- **`include/`** — the first instinct, but it collides with the meaning of PHP includes and doesn't
  convey "regenerated, don't edit."
- **`assembled/`** — names exactly what the folder *is*: the output of `assemble.ps1`.

## Decision

Collect all `assemble.ps1`-populated folders under **`assembled/`** (gitignored). Separately, move the
`sample-*` example folders into **`samples/`**, and `design-parity-checklist.md` into `docs/`. The root
now holds only authored material: the entry-point docs, the setup scripts, the launchers, `docs/`,
`samples/`, `tools/`, and `kit-manifest.json`.

Everything that referenced the old layout was updated in lockstep: `assemble.ps1`'s destination paths
and its manifest-refresh block, the kit-root launchers (`start-converter.bat`/`.command`), `.gitignore`,
and every folder-location reference across `AGENTS.md`, `README.md`, `PLAYBOOK.md`, and `docs/`.

## Why

- **`assembled/` is self-documenting.** The name tells a reader (human or agent) "this is produced by
  `assemble.ps1` — read it, but never hand-edit it," which is precisely the invariant the kit relies on.
  `vendor/` implies third-party (wrong — these are our projects); `include/` is ambiguous.
- **The root becomes a clean table of contents.** What's authored vs. regenerated is obvious at a glance,
  which matters most for the agents the kit exists to guide.
- **One gitignore entry, one mental model.** `/assembled/` replaces five scattered root entries, and any
  future bundled component drops in under the same folder with no new convention to remember.
- **Pure prose left alone.** Only actual *paths* and folder-location references were rewritten; conceptual
  mentions of the repos by name were deliberately untouched, keeping the diff about *location*, not wording.
</content>
