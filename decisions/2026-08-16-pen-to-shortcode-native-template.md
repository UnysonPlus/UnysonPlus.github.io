---
slug: pen-to-shortcode-native-template
title: "Should a pasted CodePen become native shortcodes, and where should that live?"
authors: [jon]
tags: [conversion, extensions, page-builder, architecture]
date: 2026-08-16
description: Users wanted to paste a pen's HTML/CSS/JS and get a proper UnysonPlus block rather than a raw Code Block. Decision — treat a pen as just another conversion source, run it through the same deterministic converter to produce a native page-builder TEMPLATE, surface it as a "Pen" tab in the AI Dev Kit dashboard, and detect behavioral pens to degrade honestly instead of force-mapping them.
---

**The question:** Can we let a user paste a pen (separate HTML, CSS, and optional JS panels) and
have it come out as *proper* UnysonPlus shortcodes — a real special_heading / icon_box / button
section — instead of just dumping the markup into a Code Block shortcode? And if so, where does the
feature live, and what do we do with pens whose whole point is runtime JS?

<!-- truncate -->

## Context

We already own two of the three pieces this needs. The `code-block` shortcode can output raw
HTML/CSS/JS verbatim (the trivial "embed" answer). The Site Converter already does deterministic,
AI-optional **semantic mapping** of captured HTML into native shortcodes, and its `/capture-file`
route already renders a raw HTML document in headless Chrome and converts it into a native-shortcode
bundle. So "pen → native shortcodes" is mostly gluing existing parts together — not new rendering
primitives.

The honest complication is the JS panel. A pen splits into two very different kinds:

- **Structural pens** — a card, a hero, a pricing table written in raw HTML/CSS. These *have* native
  shortcode equivalents; mapping them is exactly the converter's job.
- **Behavioral pens** — a canvas animation, a WebGL scene, a physics sim, a bespoke GSAP timeline.
  These have **no** native shortcode equivalent, because native shortcodes are declarative UI, not a
  JS runtime. There is nothing to map them *to*.

## Options considered

1. **Always wrap in a Code Block (or iframe).** Deterministic and safe, but it's the thing users
   explicitly said they *didn't* want for structural pens — it produces a black box, not editable
   native blocks.
2. **Always force native mapping.** Great for structural pens, but a behavioral pen (a canvas that
   the headless renderer captures as one frozen frame) yields an empty or broken template — a silent
   failure that looks like the converter "lost" the pen.
3. **Classify first, then branch.** Run structural pens through the deterministic converter to native
   shortcodes; detect behavioral pens up front and tell the user plainly that runtime JS can't become
   native shortcodes (use a Code Block / iframe, where the animation stays live).

For the *output artifact* we also weighed: a whole child theme (wrong — a pen is a component, not a
site), an install onto a specific page, a downloadable bundle, or an **importable page-builder
template** that shows up in the builder's Templates picker.

## Decision

- **A pen is just another conversion source.** Assemble the three panels into one HTML document and
  run it through the *same* deterministic `build_from_html` path a captured URL uses — so a pen gets
  the same native-shortcode mapping quality, with zero new converter logic.
- **Output = an importable page-builder template**, saved into the Template Library exactly like an
  installed template (`template.json` envelope + `meta.json` under
  `uploads/unysonplus/templates/<slug>/`), so it appears in the builder's **Templates** picker with
  no extra wiring. One section → a `section` template; multiple → a `full` template.
- **Home = a new "Pen" tab in the AI Dev Kit dashboard.** It reuses the dashboard's existing
  `data-view` shell and its `/api/*` → capture-service → WordPress relay. A new
  `POST /fw-sc/v1/pen-template` REST route (token-authed, localhost-only, alongside `/convert`) does
  the convert-and-save.
- **Classify first; degrade honestly.** A behavioral detector (canvas / `getContext` / WebGL /
  `requestAnimationFrame` / known animation libs / large JS bodies) short-circuits with a clear
  message rather than emitting a dead template. Native mapping is the sweet spot; behavioral pens are
  named as such and pointed at the Code Block / iframe path.

## Why

Routing a pen through the existing converter means the "proper shortcode, not a Code Block" outcome
comes for free wherever it's *meaningful* — and the one case where it isn't meaningful (runtime JS)
is exactly where forcing it would produce garbage. Detecting that case and saying so is more useful
than a converter that appears to succeed and hands back nothing. Emitting a Template Library template
(rather than a theme or a one-off page) matches what a pen actually is: a reusable component you drop
onto any page. And putting it in the dashboard keeps it visible next to the URL converter it shares
almost all its plumbing with, instead of hiding a second entry point.

*Behavioral pens as a first-class "preserve" output (a hand-crafted, fully-defaulted Code Block /
iframe shortcode node saved as a template) is a natural follow-up; for now they are detected and
handed back to the user with guidance rather than force-mapped.*
