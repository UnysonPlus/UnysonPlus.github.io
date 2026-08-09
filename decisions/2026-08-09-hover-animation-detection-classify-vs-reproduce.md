---
slug: hover-animation-detection-classify-vs-reproduce
title: "How should the Site Converter carry a source button's hover animation — reproduce its CSS verbatim, or classify it into the theme's named hover-effect vocabulary?"
authors: [jon]
tags: [architecture, animation, shortcodes]
date: 2026-08-09
description: A converted button lost its hover motion because the effect lived on :hover/::before/::after rules that computed-style capture can't see. Fixing it forced a choice — carry the raw source CSS, or fingerprint it into one of the theme's ~35 named .btnfx-* presets. Decision — classify into a btnfx preset first (deterministic fingerprint over a finite vocabulary), and only fall back to verbatim scoped CSS when nothing matches. Rejected — reproduce-verbatim-always, and give up because "animations aren't in the computed style".
---

**The question:** A converted button (scandi-haven-shop's hero "Shop Now") dropped its hover
animation — a translucent overlay that rises from the bottom to fill the button. The effect lives
entirely on `.btn-premium::after` + `.btn-premium:hover::after`, which `getComputedStyle(el)` never
exposes. Once we teach the capture to harvest those rules, what do we DO with them: **reproduce the
source CSS verbatim on the button, or map it to one of the theme's named hover-effect presets?**

<!-- truncate -->

**Context.** The button shortcode already ships a `hover_animation` field backed by ~35 named
`.btnfx-*` effects (`fill-up`, `fill-right`, `fill-center`, `grow`, `lift`, `sweep`, `shine`, `glow`,
`underline`, `tilt`, `skew`, `rotate`, …) in `hover-fx.css`. So the theme has a real, finite
vocabulary of hover motions — the same kind of native target the converter already maps colours and
sizes onto. The scandi effect (`::after` overlay, `translateY(100%) → 0` on hover) is visually
identical to `btnfx-fill-up` (`::before` overlay, `scaleY(0) → 1` from the bottom edge) even though
the underlying CSS differs.

Two structural facts shaped the decision:

- **Computed styles can't see it.** The earlier "stamp `transition`/`transform` on every element" fix
  still wouldn't catch this — hover motion is a `:hover` + pseudo-element phenomenon, invisible to
  `getComputedStyle`. So *either* answer needs a new capture capability: harvest the stylesheet rules
  whose selectors match a button's own classes in their `:hover` / `::before` / `::after` variants.
- **Tailwind transforms are composed from `--tw-*` vars.** The raw `transform:translate(var(--tw-…))`
  is meaningless without the vars, so "verbatim" isn't even literally verbatim — it needs
  reconstruction.

**Options considered.**

1. **Reproduce verbatim, always.** Carry the source `::before`/`::after`/`:hover` rules onto the
   button, rewritten to `{{SELECTOR}}`. *Pro:* pixel-faithful to any effect. *Con:* produces opaque,
   un-editable CSS blobs on every button; fights the theme's own hover system; brittle across
   framework-specific idioms (Tailwind var composition, keyframes, custom properties that don't
   resolve in the child theme). The user can never pick a *different* effect from a dropdown — they
   inherit a frozen CSS lump.
2. **Classify into a `btnfx-*` preset, verbatim only as a fallback.** Fingerprint the harvested rules
   against the finite effect vocabulary; set `hover_animation: btnfx-fill-up` when a signature
   matches; carry reconstructed verbatim CSS only when nothing is close. *Pro:* the result is a real,
   editable Theme-Settings value; consistent with how the converter maps colours/sizes to presets;
   the classifier is a closed, deterministic problem (bucket into ~35 known shapes, not "reproduce
   arbitrary CSS"). *Con:* needs a signature per effect; a novel effect falls through to the blob.
3. **Do nothing** — treat hover animation as out of scope because it isn't in the computed style.
   Rejected outright: the whole point is fidelity, and the effect is a prominent part of the design.

**Decision.** **Classify first, reproduce as a fallback.** Capture harvests each button's own-class
hover/pseudo rules into `data-sc-hover`; `classify_hover_animation()` fingerprints them into the
nearest `.btnfx-*` preset (overlay-reveal direction → `fill-up`/`fill-right`/`fill-center`;
element-level `scale`/`translateY`/`skew`/`rotate`/shadow → `grow`/`lift`/`skew`/`rotate`/`glow`;
growing `::after` bar → `underline`); when no signature matches but the source *did* declare a hover
effect, the rules are reconstructed (rebuilding `transform` from the `--tw-*` vars) and emitted as
`{{SELECTOR}}`-scoped Custom CSS. Every button therefore either gets a **named, editable preset** or
an **exact reproduction** — never a dropped animation.

**Why.** The theme owning a finite, named hover vocabulary is exactly what makes the deterministic
approach *stronger* than verbatim here: classification into a closed set is tractable and produces a
first-class Theme-Settings value the user can re-pick, restyle or turn off — whereas a verbatim blob
is a dead end. The verbatim path still exists as a safety net so bespoke effects aren't lost, which
means the classifier can stay conservative (only fire on high-confidence signatures) without ever
sacrificing fidelity. And the capture capability it required — "the CSS rules for an element's own
classes, including states and pseudo-elements" — is the *same* primitive the mega-menu detection
needs (JS-mounted dropdown panels), so the investment compounds. Verified end-to-end: the scandi
"Shop Now" button classifies to `btnfx-fill-up`, and its two outline siblings (a hover
background-colour change, no preset match) reproduce verbatim.
