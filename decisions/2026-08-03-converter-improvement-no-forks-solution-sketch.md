---
slug: converter-improvement-no-forks-solution-sketch
title: "How should an outside agent improve the converter — fork it, or build the full site + report a fix sketch?"
authors: [jon]
tags: [conversion, architecture]
date: 2026-08-03
description: "Worry: an external AI agent might ship a half-baked site when it hits the deterministic Site Converter's limits, and maybe agents should fork the converter (or keep a custom converter folder) and report their changes. We rejected forks — the converter lives twice (JS+PHP) and outside edits break sync + land untrusted code — and reframed it: the agent already builds the FULL site in the child theme (the converter is a head-start, not a ceiling); improving the converter is the maintainer's job, fed by a got-vs-expected report with an OPTIONAL fix-sketch the maintainer reviews and promotes."
---

**The question:** the Site Converter is deterministic, so an outside AI agent will hit cases it can't map.
Will that make the agent ship a **half-baked** site? And to fully convert, should the agent **fork** the
converter (or keep a **custom converter folder/hook**) and report its changes?

<!-- truncate -->

## Context
The premise contains a misconception worth naming: the converter is only **Phase 1**. The AI agent then
runs Phases 2–7 — finishing every section to full fidelity with native Theme-Settings options, real/
child-theme shortcodes, and `misc_custom_css`, behind a **per-section fidelity gate**. A converter
`code_block` fallback is the source **preserved verbatim** (nothing dropped), which the agent then upgrades
or keeps. So converter limits change *how much hand-work the agent does*, **not** the output quality — an
agent following the protocol never ships half-baked because of the converter.

Two separate concerns were being conflated: **delivering a full site** (the site-builder's job, done in the
child theme) vs. **improving the converter** (the maintainer's job, fed by the feedback report).

## Options considered
1. **Outside agents fork / edit the converter and submit changes.** Rejected: the converter exists **twice**
   (JS `to-pages`/`capture-extract` + PHP `Mapper`/`Stitch`) and must stay in sync; an outside fork breaks
   that invariant and lands **untrusted code** in the tool everyone runs — a supply-chain + maintenance
   hazard. Outside builders usually don't even have the converter repos.
2. **A "custom converter folder/hook" per agent.** Rejected as redundant: that override layer already exists
   — it's the **child theme** (`framework-customizations/extensions/shortcodes/shortcodes/<name>/` + CSS).
   The agent builds *on top of* the converter output there; the core converter is never touched.
3. **Converter head-start → agent finishes the full site in the child theme → structured got-vs-expected
   report, with an OPTIONAL maintainer-review fix sketch → maintainer promotes recurring patterns into the
   converter (both paths).** **Chosen.**

## Decision
- **No forks, no converter edits by outside agents.** The child theme is the per-site custom layer; the site
  is always fully built there. Improving the converter is the maintainer's job.
- **The report can optionally carry a `solution`** — a fix *sketch* for a **reusable** pattern (a recognizer
  approach, or the child-theme shortcode the agent wrote). It's the agent's OWN code (not source content),
  capped ~2000 chars + URL/email-redacted, and it is a **suggestion the maintainer reviews and promotes —
  never an auto-applied patch.** `aggregate-reports.mjs` marks solution-bearing findings (**✎**) and prints
  the sketches under "Proposed solutions (REVIEW, never auto-apply)."
- Documented in `site-build-protocol.md` (finding shape + "you build the full site regardless; never fork
  the converter") and the capture service's `report-sharing.md`.

## Why
Capping site quality at the converter's deterministic reach would be the real failure — so the protocol puts
the *agent* in charge of full fidelity and treats the converter as a head start. Keeping the converter
itself **maintainer-owned, reviewed, and both-paths-in-sync** is what keeps it trustworthy; accepting
outside edits would trade that for chaos. The optional `solution` sketch captures the genuine value in the
"fork and show your fix" instinct — *here's how I'd solve it* — as a reviewable suggestion, so good ideas
flow upstream without any untrusted code landing in the tool.
