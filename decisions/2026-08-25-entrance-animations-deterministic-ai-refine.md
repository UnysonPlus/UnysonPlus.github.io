---
slug: entrance-animations-deterministic-with-ai-refine
title: "Adding entrance animations on conversion — should the local AI drive it, or the deterministic converter?"
authors: [jon]
tags: [conversion, architecture, animation, javascript]
date: 2026-08-25
description: "We wanted a Convert-panel option that gives a converted page tasteful, sequential reveal-on-scroll animations 'with the help of the local AI'. The question was where the intelligence lives. We decided the DETERMINISTIC converter owns the sequencing (walk each section, stagger a role-appropriate effect per element, reset per band) because it is fast, free, offline and repeatable, and the local AI is an OPTIONAL refinement that only re-picks the effect/timing per element — so the feature always works even when the AI backend is off or slow, and never breaks a conversion."
---

**The question:** We're adding an "Add entrance animations" checkbox to the Site Converter that
gives a converted page sequential reveal-on-scroll motion. The user framed it as "use the
deterministic **with the help of the local AI**." Where should the intelligence actually live —
does the AI decide the animations, or does the deterministic converter, with the AI as a helper?

<!-- truncate -->

## Context

The converter already ships a complete entrance-animation surface: every content shortcode
registers the **Entrance Animation** option (Animate.css effect + a shared `animation_settings`
panel with trigger / delay / stagger / easing), and the mapper already knows every node's *role*
(heading, text, button, image, card grid, pricing table). The render reader honours the modern
`animation.effect` + `animation_settings` shape and hides each element until it scrolls into view.

So the raw capability to sequence reveals is entirely mechanical — the converter can walk the built
node tree and assign effects itself. The only thing that genuinely benefits from *taste* is the
**choice** of effect per element (should the hero CTA slide up last for emphasis? should a
testimonial row cascade left-to-right?). The local AI (Ollama / Claude Code / an API key, via the
capture service) is good at exactly that semantic judgement — but it is slower, varies run to run,
and is only present when the user has a backend configured and the capture service running.

## Options considered

- **A — AI drives the animations.** The AI decides which elements animate and how, and the
  converter just applies its output. Rejected: it makes a core feature depend on a slow, optional,
  non-deterministic component. With the AI off (the common case for an offline `.zip` upload), the
  feature would do nothing; with it on, two runs of the same page could differ, and a bad/empty AI
  response could leave elements stuck hidden (`sc-anim-pending` with no effect written).
- **B — Deterministic only.** A role → effect rule table with a per-section stagger. Fast, free,
  offline, 100% repeatable, and good for ~90% of pages. But it can't tell that *this particular*
  element deserves a different treatment.
- **C — Deterministic base + AI as an optional refinement layer.** The deterministic pass always
  runs and sets a tasteful base (fade-up for content, soft fade for media, stagger reset per band).
  When "Refine with AI" is additionally ticked *and* a backend is reachable, the AI only **re-picks
  the effect/timing per element** on top of that base, constrained to the Animate.css entrance
  vocabulary, with any failure or absence silently falling back to the deterministic result.

## Decision

**C.** The deterministic converter owns the sequencing; the local AI is an opt-in refinement that
only adjusts the per-element effect and delay. The "Add entrance animations" checkbox runs the
deterministic pass alone; a secondary "Refine with AI" sub-option layers the AI on top when it's
available.

## Why

- **Robustness first.** A conversion feature must never depend on an optional, variable component to
  function. Making the deterministic pass the base means the feature works for every path — the
  offline `.zip` upload included — and the AI can never *break* a conversion, only *improve* it.
- **The AI is applied where it actually adds value.** Sequencing and staggering are mechanical;
  effect *taste* is not. Letting the AI touch only the effect/timing (not whether an element
  animates, not the hide-until-play plumbing) keeps its blast radius tiny and its output easy to
  validate against a fixed vocabulary.
- **Consistency with the converter's whole philosophy.** This mirrors the standing rule that the
  deterministic path is the source of truth and the AI is a helper on top (the same shape as the
  always-on local micro-pass that only *names* sections while Claude/deterministic own the
  structural mapping). Determinism stays the default; intelligence is additive.
- **Graceful degradation is explicit.** "Refine with AI" is only offered when a backend + the
  capture service are present, and any error returns the deterministic base — so there is no state
  in which turning it on makes the result worse than leaving it off.
