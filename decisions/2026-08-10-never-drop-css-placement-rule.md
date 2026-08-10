---
slug: never-drop-css-placement-rule
title: "When the converter can't map a source class (like max-w-2xl) to a native shortcode option, where must that style go — and what's the rule between the child theme stylesheet, an element's Custom CSS, and Theme Settings → Miscellaneous → Custom CSS?"
authors: [jon]
tags: [conversion, architecture, page-builder]
date: 2026-08-10
description: A merged heading subtitle carrying `max-w-2xl mx-auto` was silently dropped — the appearance-only faithful base excludes layout, and the subtitle's standalone block was consumed by the special_heading so the section styler never saw it. Decision — a strict never-drop rule with three destinations chosen by SCOPE (element-specific → the element's Custom CSS att; structural/theme-level → child theme style.css; global chrome / apply-to-active-theme → Misc Custom CSS), plus a machine-graded parity guard that FAILS on any uncarried width class.
---

**The question.** A converted "About" section's subtitle paragraph carried
`max-w-2xl mx-auto` (a 672px centered content measure). The converter dropped it: the section
rendered full-width. Two questions fell out of that: **(1)** what's the rule for putting converted
CSS in Theme Settings → **Miscellaneous → Custom CSS** vs the **child theme stylesheet**? And **(2)**
what's the strict rule so a class that can't map to a native shortcode option is never *silently*
dropped — it MUST land somewhere?

<!-- truncate -->

**Context.** The converter maps a source into native shortcode options + theme-settings + preset
families wherever it can (that's what makes the output editable). What a native option can't express
is carried as CSS. There are **three** CSS destinations, and the bug exposed that "carry it as CSS"
had a hole for **layout**:

- The **appearance faithful base** (`cs_appearance`) reproduces any unmapped *skin* prop
  (color/background/font/border/radius/shadow/transform/transition) as a specificity-0
  `:where(selector){…}` on the element — never dropped. But it **deliberately excludes layout**
  (max-width/margin/padding), on the theory that layout maps to native options or the structural
  row/column decomposition.
- A **merged heading subtitle** is folded into the `special_heading` — its standalone block is
  *consumed* — so the section styler (`collect_section_style`, which *does* carry max-width for
  standalone prose) never sees it. Layout excluded from the base + block consumed by the merge =
  `max-w-2xl` fell through both nets.

**The placement rule (answer to Q1), by SCOPE not preference.**

1. **The element's own `custom_css` att** (shortcode → Advanced → Custom CSS), scoped
   `:where(.uHASH){…}` — for **element-specific** styling with no native option (the appearance base,
   button typography/hover, and now a heading part's constrained measure). Lives *with* the element
   in the builder, editable, specificity-0 so native options still win.
2. **The child theme `style.css`** (emitted via `page_css()`) — for **structural / theme-level** CSS:
   section skins, component CSS, button-preset rules, `:root` design tokens, `@font-face`. The
   explicit *clean child theme* goal — CSS in the theme file (versionable, uploaded with the theme),
   not the DB, bypassing the dynamic-CSS aggregator.
3. **Theme Settings → Miscellaneous → Custom CSS** (`misc_custom_css`) — for **global / chrome-level**
   CSS: the carried header/footer chrome residual, the container-width responsive ladder, and — in the
   **apply-to-an-active-theme** mode where no child theme is generated — the *entire* design-token
   CSS, because there's no child stylesheet to write to.

So Misc Custom CSS vs the child stylesheet is largely: **is a child theme being generated?** If yes,
structural CSS goes in `style.css` and only global chrome residuals go to Misc Custom CSS. If no, the
design CSS goes to Misc Custom CSS because there's nowhere else.

**Options considered for the never-drop rule (Q2).**

1. **Blanket layout carry** — dump every unmapped layout prop (display/position/flex/grid/width/
   margin/padding/max-width) as scoped `:where()`. *Rejected:* structural props
   (display/position/flex) are handled by the row/column decomposition; carrying them verbatim would
   *fight* the builder's layout, the exact reason layout was excluded from the base.
2. **Native-only, log the rest** — keep dropping, just record it. *Rejected:* the user's whole point
   is the style must survive, not merely be noted.
3. **Native-first, carry the CONSTRAINT props, guard the rest** *(chosen)* — prefer a native option;
   for a heading part's own measure (`max-w-*` + `mx-auto` centering) that no native option and no
   styler covers, reproduce it as scoped Custom CSS on the part's element; and add a machine-graded
   **parity guard** that FAILS on any element that dropped a width utility and carries no width
   anywhere.

**Decision — Option 3, a strict never-drop rule with three enforcing parts.**

- **Carry (the fix):** `heading_measures()` reproduces each rendering heading part's constrained
  measure as `selector .heading-subtitle{max-width:42rem !important;margin-left/right:auto}` (scoped to
  `.uHASH`, specificity 0). The Tailwind class compiler emits no `max-width`, so a local `max-w-*`
  table (the same one `heading_layout` uses) is the resolver, with a computed-`max-width` fallback
  from `data-sc-cs`. The honored utilities are recorded as **kept**, so they leave the dropped set.
- **Guard (the enforcement):** a new `dropped_measures` check in the conversion parity report scans
  every element's dropped classes for width utilities (`max-w-*`/`min-w-*`/`w-[…]`) and FAILS if any
  element dropped one while carrying no native `max_width`/`block_max_width` and no `max-width` in its
  Custom CSS. "We quietly dropped `max-w-2xl`" is now a red parity line that auto-guards the rule as
  new mappers are added.
- **Parity:** mirrored in the capture-service JS path (`to-pages.mjs`) so both engines emit the same
  base.

**Why.** The blanket carry was the tempting "strict" reading but it re-introduces the layout-fighting
the appearance base was built to avoid — strictness that breaks conversions isn't strictness. Carrying
only the CONSTRAINT props (a measure never fights structural layout — it just narrows content) closes
the demonstrated hole without that risk, and the parity guard turns the *principle* ("never silently
drop a visual class") into a **check that regresses loudly** instead of a promise. The placement rule
was already implicit in the code (element/structural/global); writing it down means a maintainer meets
one scope-driven rule instead of reverse-engineering three destinations. Verified: the exact
`max-w-2xl mx-auto` subtitle now carries `max-width:42rem` centered, the guard reports it as carried
(0 dropped), and the golden fixture holds (332/0, +3 new never-drop assertions).
