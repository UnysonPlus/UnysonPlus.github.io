---
slug: animation-engine-gap-report-loop
title: "When the AI agent hits an animation the engine can't do — bespoke it, or grow the engine?"
authors: [jon]
tags: [animation-engine, architecture]
date: 2026-10-21
description: As we push AI-assisted site creation and replication, an agent reproducing a source's motion will routinely hit an animation the Animation Engine / Motion Gallery doesn't cover. Write bespoke code and move on, or something that grows the engine over time? Decision — extend the proven Site Converter findings loop to motion — the agent tries a native effect first, else writes a scoped, labelled child-theme fallback via the per-element hooks, and always sends a fixture-backed report; the ledger's demand drives which gaps get promoted into the engine, gated on a reusable / accessible / performant quality bar.
---

**The question:** As AI-assisted site creation and replication becomes the focus, an agent reproducing
a source's motion will routinely hit an animation the Animation Engine or Motion Gallery doesn't cover.
What should it do — write bespoke code and move on, or something that also **grows the engine** over
time so the next agent doesn't hit the same wall?

<!-- truncate -->

## Context

- The **Site Converter already has a proven findings loop:** `send-finding.mjs` → a shared findings
  form; `pull-findings.mjs` → the Converter Reports ledger; only **fixture-backed rows** are adopted,
  through golden + corpus gates. We don't need a second mechanism — we need to point this one at motion.
- **The Animation Engine's per-element effects are cleanly pluggable.** A child theme can register a new
  effect with the *same hooks the built-in modules use* — `sc_animation_fields` (add the option to the
  Animations tab), `sc_build_wrapper_attr` (emit its config as data-attributes on the element wrapper),
  `sc_needs_wrapper` (declare the wrapper), plus an enqueued runtime. So a child-theme fallback *is* a
  first-class effect, not a hack bolted on the side.
- **But the Motion Gallery (3D gallery) is NOT pluggable today.** Its designs are a **static list in
  `gallery-3d/options.php`** plus a per-design JS file — there is no `apply_filters`, so a child theme
  **cannot add a gallery design** without editing the plugin.
- **The agent won't "just know" the pattern.** `extending.md` covers building elements and modules and
  mentions the wrapper hook, but there is **no focused recipe** for "register a child-theme Animation
  Engine effect as a fallback, with the labelling / reduce-motion / report conventions."

## Options considered

- **A — Bespoke and move on.** The agent writes one-off code for the missing animation. Fast per site,
  but the engine never learns, and sites fragment into bespoke motion — the opposite of the token moat.
- **B — Extend the converter findings loop to motion (chosen).** The agent (1) tries a **native engine
  effect first**, (2) else writes a **scoped, labelled child-theme fallback via the per-element hooks**
  (so the site works today and can be migrated cleanly later), and (3) **always sends a fixture-backed
  report**. The ledger's **demand frequency** drives which gaps get promoted into the engine, gated on a
  reusable / accessible (reduce-motion) / performant quality bar.

## Decision

**B.** Reuse the existing findings machinery for the Animation Engine, with a **child-theme fallback
tier via the per-element hooks**. Two engine-side enablers this requires:

1. **A Motion Gallery design-registration filter**, so galleries become pluggable from a child theme the
   way per-element effects already are (today they are a hardcoded list — a real gap).
2. **A focused kit recipe** teaching the agent the fallback pattern and the conventions — a stable
   label / `data-` key tying the fallback to its report id (so it migrates off cleanly when the effect
   ships natively), a reduce-motion branch, and the `send-finding` report — so it reliably knows how.

## Why

- It turns **every gap into data** and grows the engine from *real demand*, not guesses — the Motion
  Gallery's long tail gets filled in priority order.
- The child-theme fallback means a missing effect **never blocks a site**; labelled + scoped means it
  **migrates cleanly** when the effect ships natively, instead of leaving bespoke motion behind.
- It **reuses one proven discipline** (the converter loop + its gates) rather than inventing a second.
- The **token economics compound**: a scoped fallback is cheap to write once; a promoted native effect
  is near-zero tokens for every future agent. That compounding is the moat — fewer tokens *and* a more
  native result the more the engine covers.

The agent discipline that protects it: **always try the engine first, never silently absorb a gap into a
fallback — always report it.** Status: **Accepted**.
