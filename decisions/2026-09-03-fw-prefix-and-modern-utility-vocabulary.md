---
slug: fw-prefix-and-modern-utility-vocabulary
title: "One prefix (fw-) for everything, with a modernized utility vocabulary"
authors: [jon]
tags: [naming, architecture, shortcodes, page-builder]
date: 2026-09-03
description: The Div's output leaned on unprefixed, Bootstrap-identical utility classes (d-flex, justify-content-center, fw-col-6) that both collide with real Bootstrap and read as an old stack — so the decision is to keep a single house prefix fw- across everything (not introduce upw-), pull the unprefixed classes into that namespace, and modernize the words after the prefix, naming the width/grid utility fw-span-N after CSS Grid's own span keyword.
---

**The question:** The modern Div renders through utility classes like `d-flex`, `flex-row`,
`justify-content-center`, `align-items-center` and `fw-col-6`. The unprefixed ones are literally
Bootstrap's class names, and `fw-col-6` apes Bootstrap's `col-6` — so the output *reads* as Bootstrap and
`.d-flex` even collides with real Bootstrap if a theme loads it. Do we rebrand the utilities (e.g. a new
`upw-` prefix, or Tailwind-style names), and what do we call the column/grid utility?

<!-- truncate -->

## Context

This came out of a wider "should we adopt Tailwind" discussion (see
[the Tailwind decision](/decisions/tailwind-integration-vs-curated-utility-layer)). Tailwind's engine
can't run in a database-driven builder, so that was ruled out — but a narrower, real issue remained: the
*class vocabulary* in the output. Two concrete problems, not just optics: (1) `d-flex`,
`justify-content-*`, `align-items-*`, `flex-row/-wrap` are **unprefixed and identical to Bootstrap's**, so
they clash with a Bootstrap-loading theme; (2) the words themselves (`col`, Bootstrap's flex utilities)
telegraph an old stack to the developers who'd champion or dismiss the tool.

A check of where the ecosystem is heading informed this: Bootstrap 6 is officially in development
(`v6-dev` is the default branch on `twbs/bootstrap`) but framed only as a vague "conceptual reset" with
**no committed grid/naming direction**, while browsers and both frameworks converge on native CSS (Grid,
`:has()`, container queries, custom properties). So chasing either framework's *class-name fashion* is
chasing a moving target; the durable bet is our own stable namespace plus more native CSS.

## Options considered

- **Introduce a `upw-` prefix for a rebranded set.** Reads as the plugin's own brand and distances it from
  the abandoned Unyson. But mixing `upw-` utilities with the pervasive existing `fw-` structural classes
  (`fw-flexbox`, `fw-container`, `fw-page-builder-content`) looks like a half-finished migration — and a
  visible split is exactly what makes a codebase *feel* legacy. It also invites "why two prefixes?"
- **Copy Tailwind's exact names** (`flex`, `w-1/2`, `justify-center`). Familiar for five seconds, then
  backfires: it looks like Tailwind without being it (different semantics — our width is a 12-col
  flex-basis/grid-span, not Tailwind's `width:50%`), re-collides (now with Tailwind), and invites "why not
  real Tailwind?".
- **Keep one house prefix `fw-` for everything, and modernize the words after it.** Pull the unprefixed
  Bootstrap classes into the namespace (`d-flex` → `fw-flex`, `justify-content-center` →
  `fw-justify-center`) and rename the loaded ones (`fw-col-6` → `fw-span-6`). Old classes stay as CSS
  aliases so nothing breaks.

## Decision

**One prefix — `fw-` — across the whole system, with a modernized vocabulary.** The insight that settled
it: "legacy feel" comes from *inconsistency*, not from a prefix. A uniformly `fw-` surface reads as a
deliberate house style; `fw-` is a neutral "framework" namespace with no history attached to a fresh
developer, and using it everywhere means there is no old-vs-new split to point at — nothing looks like
leftover legacy. So we do **not** introduce `upw-` (the server-side `upw_` helpers stay as they are; this
decision is about the CSS/class layer). The unprefixed Bootstrap-identical utilities move into `fw-`
(`fw-flex`, `fw-row`/`fw-column`, `fw-wrap`, `fw-justify-*`, `fw-items-*`, `fw-self-*`, `fw-grow`,
`fw-no-shrink`, `fw-gap-*`, `fw-order-*`), fixing the collision. The width/grid utility becomes
**`fw-span-6`** (responsive `fw-span-md-6` / `fw-span-lg-6`), named after CSS Grid's own `span` keyword.
Responsive stays an **infix** (`-md-`/`-lg-`), not a Tailwind `md:` prefix, to match the existing scheme
and avoid escaping `:` in selectors. Every old class is kept as a CSS alias so already-built pages,
hand-written HTML and theme references keep working; new output emits only the new names.

## Why

`fw-span-6` is the crux and it earns its place three ways: it is CSS Grid's actual `span` keyword (reads
as modern CSS, not Bootstrap cargo); one word honestly covers the utility's *two* jobs — a flex width and
a grid track span — since "spans 6 of 12" describes both; and choosing `span` for width frees "column" for
flex-direction (`fw-row` / `fw-column`) with no clash, which keeping `col` would have blocked. Standardizing
on a single neutral prefix buys consistency and kills the Bootstrap collision without tying the vocabulary
to any framework's naming fashion — the part most likely to look dated next, whichever way Bootstrap 6 and
Tailwind land.
