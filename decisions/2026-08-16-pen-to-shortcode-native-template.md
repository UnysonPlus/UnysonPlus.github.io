---
slug: pen-to-shortcode-native-template
title: "Should a pasted CodePen become native shortcodes, and where should that live?"
authors: [jon]
tags: [conversion, extensions, page-builder, architecture]
date: 2026-08-16
description: Users wanted to paste a pen's HTML/CSS/JS and get a proper UnysonPlus block rather than a raw Code Block. Decision — treat a pen as just another conversion source, convert it LOCALLY in the capture service (no WordPress) into a native page-builder template the user DOWNLOADS and imports, surface it as a "Pen" tab in the AI Dev Kit dashboard, and detect behavioral pens to degrade honestly instead of force-mapping them.
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

For the *output artifact* — and, just as importantly, *how the user receives it* — we weighed: a
whole child theme (wrong — a pen is a component, not a site); a push-install onto a configured
destination WordPress (the URL converter's model); a downloadable full-site bundle; or a single,
**downloadable page-builder template file** the user imports themselves. A first cut pushed the
result to a destination WordPress via a REST route — which was wrong: it demanded a destination URL
and token the user never set (a pen has nothing to do with any particular site), offered no download,
and turned a "paste code, get a file" task into a configuration chore.

## Decision

- **A pen is just another conversion source, converted LOCALLY.** Assemble the three panels into one
  HTML document and run it through the capture service's *own* JS converter (`capture.mjs` render →
  `toPages`) — the same deterministic pipeline a captured URL uses, but entirely in Node. **No
  WordPress, no destination, no token.**
- **Output = a downloadable template `.json`** (the `_fw_template_export` envelope). The dashboard
  hands the browser a Blob download; the user imports it on *any* site via the page builder →
  **Templates → My templates → Import template**, which already exists. One section → a `section`
  template; multiple → a `full` template.
- **Home = a new "Pen" tab in the AI Dev Kit dashboard**, reusing the existing `data-view` shell. Its
  `/api/pen-convert` is a thin pass-through to a local capture-service route (`/pen-template`) — no
  cross-site relay, no auth surface.
- **Classify first; degrade honestly.** A behavioral detector (canvas / `getContext` / WebGL /
  `requestAnimationFrame` / known animation libs / large JS bodies) short-circuits with a clear
  message rather than emitting a dead template. Native mapping is the sweet spot; behavioral pens are
  named as such and pointed at the Code Block / iframe path.

## Why

Converting locally and handing back a file matches the mental model exactly — *paste code, get a
template you can import anywhere* — and keeps the feature self-contained in the standalone capture
service (which already ships the JS converter), so it works with zero setup and no WordPress
connection. Pushing to a configured site was a category error: it coupled a code-snippet tool to
site credentials it had no reason to need, and it's why the first attempt felt broken. Emitting a
Template Library envelope (rather than a theme or a one-off page) matches what a pen actually is: a
reusable component you drop onto any page. And the one case where "native shortcode" isn't meaningful
(runtime JS) is detected and named, instead of silently producing an empty template.

*Behavioral pens as a first-class "preserve" output (a hand-crafted, fully-defaulted Code Block /
iframe shortcode node saved as a template) is a natural follow-up; for now they are detected and
handed back to the user with guidance rather than force-mapped.*
