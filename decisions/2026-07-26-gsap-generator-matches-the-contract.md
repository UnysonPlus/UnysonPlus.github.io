---
slug: gsap-generator-matches-the-contract
title: "The GSAP snippet generator mirrors the Custom Code contract — it is not a full GSAP playground"
authors: [jon]
tags: [animation, javascript]
date: 2026-07-26
description: "The Custom Code (Motion Snippet) field is powerful but has a blank-page problem for GSAP newcomers. We added a code generator to the docs — but scoped it to exactly what the runtime provides (el, a pre-triggered tl, gsap; core only; fixed trigger) rather than exposing GSAP's full surface. This records why matching the contract beat building a general playground."
---

**The question:** the Scroll Motion **Custom Code (Motion Snippet)** field lets an author hand-write
GSAP, but a newcomer faces a blank editor with no idea of the API surface. A code generator would
help — but *how much* of GSAP should it expose: everything (a general GSAP playground), or only what
the field actually gives you?

<!-- truncate -->

## Context

The field runs the snippet with three things already in scope — `el` (the element), `tl` (a
`gsap.timeline()` **already tied to a ScrollTrigger** on `el`, start `top 80%`), and `gsap`. Two
constraints follow from the runtime that a general GSAP tool would ignore:

- **The timeline and its trigger are provided.** You don't write `gsap.timeline()` or `ScrollTrigger`
  — you add tweens to `tl`. The trigger start is fixed in the runtime (`runSnippets`).
- **Only GSAP core + ScrollTrigger are guaranteed.** SplitText/MorphSVG and other plugins load only
  when their *preset* effect is used elsewhere on the page, so a snippet can't rely on them.

## Options considered

- **A general GSAP playground.** Expose timelines, ScrollTrigger config, all plugins — teach GSAP
  broadly. But most of it produces code that **won't paste** into the field (the field already owns
  the timeline/trigger, and the plugins may be absent), so it would mislead exactly the beginners
  it's meant to help.
- **Mirror the field's contract (chosen).** Generate only `tl.from/to(el | el.querySelectorAll(...),
  {…})` chains — the shape the field runs — using core tweens, eases, stagger and the position
  parameter. Preview by executing the generated code the **same way the plugin does**
  (`new Function('el','tl','gsap', code)` on a fresh timeline), so what you see is what you paste.

## Decision

The generator emits snippets against the exact contract: `el` / a provided `tl` / `gsap`, **core-only**,
**trigger fixed**. Everything it produces pastes and runs unchanged. Exposing the trigger start / scrub
is explicitly deferred — it would require extending the runtime (`runSnippets` reading those off the
element) in lockstep, so it's a "change both sides together" follow-up, not a v1 knob.

## Why

- **Correctness over breadth.** A generator whose output sometimes doesn't work is worse than none —
  it burns the trust of the beginner it targets. Matching the contract guarantees every snippet pastes.
- **It teaches the right mental model.** The visible code reinforces "you're handed a scroll-tied
  timeline; add tweens to it" — which is the one idea that unlocks the field.
- **Single source of truth.** The preview runs the generated string through the plugin's own execution
  shape, so the tool can't drift from the runtime — if it previews, it ships.
- **Room to grow honestly.** When we want trigger/scrub controls, we extend the runtime and the
  generator together, keeping the "what you see is what you paste" guarantee intact.

*Status: Accepted. Lives at `/animation-engine/gsap-generator`.*

*Update (same day): the deferred trigger controls were added **on both sides together** — the exact
"change the runtime and the generator in lockstep" follow-up this decision anticipated. The Custom
Code field gained **Trigger start** + **Scrub** options (the runtime `runSnippets` reads them off the
element); the generator mirrors them as a preview mode (play vs. a scrub slider) and a "set these in
the builder" hint. The guarantee still holds: the generated **snippet** is only the tween chain —
trigger/scrub are field options, not code — so what you paste always works.*

*Update 2 (same day): v1 mirrored the built-in presets, which made it redundant with the module —
there's no reason to hand-write an effect that's already a tile. So it grew into a **GSAP Timeline
Studio** that does what the options can't: multi-target choreography on one timeline, a full
per-property palette (2D + real 3D transforms, filters, clip-path, colour), keyframe steps, loop/yoyo,
and advanced stagger. The core decision is unchanged and is exactly what keeps this safe — still
**contract-faithful and core-only** (the provided `tl`, GSAP core, no plugins), so every composed
snippet still pastes and runs. "Fuller tool" ≠ "full GSAP playground": it went deeper WITHIN the
contract, not outside it.*
