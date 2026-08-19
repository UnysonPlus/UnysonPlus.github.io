---
slug: source-reassertion-vs-overrule-detector
title: "Why converted styles keep getting overruled — and why we re-assert the source instead of building an overrule detector"
authors: [jon]
tags: [conversion, architecture, css]
date: 2026-08-20
description: 'Converted headings rendered bold, icons green, footer text black — each time a shortcode rule or a parent-theme default outranked the source styles the converter emitted. The recurring cause is one thing: the faithful base is emitted at zero specificity (:where), so anything with real specificity wins. Rather than a separate runtime "overrule detector", we re-assert the source''s computed value for a fixed set of high-overrule-risk properties at a scoped specificity that wins by construction — so the source is authoritative without per-case patching.'
---

**The question:** The Site Converter kept producing pages where a shortcode's own CSS or a
`unysonplus-theme` default silently overruled the styles we mapped from the source — headings rendered
bold when the source was regular, service-card icons came out green instead of grey, footer address text
went black. Each was fixed one property at a time. Should we build a general "checker/detector" that stops
shortcode and parent-theme styles from overruling the source?

<!-- truncate -->

## Context

A conversion maps a source element onto a UnysonPlus construct (a `special_heading`, an `icon_box`, a
footer section) and emits the source's look as a **faithful base**. The base is written with
`:where(selector){…}` — deliberately **zero specificity**, so a user can override any of it later without
fighting `!important`.

That same zero specificity is the trap. A shortcode's own rule (`h2.heading-title { font-weight:
var(--h2-font-weight, revert) }` = specificity 0,1,1) or the parent theme's tag rule (`h2 { … }` = 0,0,1)
both **outrank** the `:where` base (0,0,0). When the theme/shortcode default happens to equal the source,
everything looks right; when it doesn't, the source loses:

- **Heading weight** — the shortcode's `revert` fallback resolves to the UA default for `<h2>`, which is
  **bold**; a source heading at `400` rendered bold.
- **Heading casing** — the source's CSS-applied `text-transform: uppercase` (no `uppercase` class) was
  dropped, so "OUR SERVICES" became "Our Services".
- **Icon colour** — an unresolved `text-muted-foreground` fell through to the `icon_box` shortcode's
  **default green** instead of the source grey.
- **Footer text** — a stale section rule painted the address rows **black** on a dark footer.

Read individually these look like four bugs. They are one architectural fact: *the base cannot win a
specificity battle it was designed to lose.*

## Options considered

1. **Keep patching per property.** Fast each time, but it is whack-a-mole — every new shortcode or theme
   default is a fresh way for the source to be overruled, and nothing tells us which properties are at
   risk until a site looks wrong.
2. **A separate runtime "overrule detector".** Render the converted page, diff every element's computed
   style against the source, emit corrective CSS. Accurate, but a conversion is imported **server-side**
   (PHP) into a site that isn't live yet — there is no rendered page to diff at import time. It would need
   a headless browser in the import path, which we don't have and don't want there.
3. **Deterministic source re-assertion at build time (chosen).** For a fixed set of *high-overrule-risk*
   properties, always emit the source's computed value at a **scoped specificity that wins** — the
   `.uHASH .part` (0,2,0) selector the mapper already uses for `heading_weight_css()`. The source is
   authoritative *by construction*; no rendering, no diffing, no per-case chase.

## Decision

Re-assert, don't detect. When the converter maps an element it already holds that element's computed
style (`data-sc-cs`); it emits the overrule-prone properties — **font-weight, font-family, text-transform,
letter-spacing, line-height, colour** — as a scoped rule at `.uHASH .part` specificity (0,2,0), which
beats a shortcode's `hN.heading-title` (0,1,1) and the theme's bare tag rule (0,0,1). The mapper's
`significant_text_decls()` already extracts exactly this set from a computed-style string, so the
mechanism is a generalisation of an existing helper rather than a new subsystem.

The first place this landed: `heading_weight_css()` now recovers the weight from the heading part's own
computed style (`*_cs`) when no explicit weight/class carries it, so a source `<h2>` at 400 re-asserts
`font-weight:400 !important` scoped to its node and renders regular. Casing was fixed in the same spirit by
carrying the heading's `text-transform` through to a `--hN-text-transform` token the theme's `hN` rules
consume. The icon-colour case was the same root in a different guise — the admin rebuild path wasn't
seeding the semantic-colour config, so `text-muted-foreground` couldn't resolve and fell to the
shortcode default; enriching the config is the "re-assert the real source value" move for colour.

## Why

- **Deterministic and offline.** It runs in the PHP importer with no browser and no live page — the same
  constraint that rules out a runtime detector.
- **Wins by construction, not by luck.** Specificity is chosen so the source outranks the constructs it is
  mapped onto; we stop depending on the theme default happening to match.
- **Bounded, not universal `!important` soup.** Only the small, named set of properties that shortcode and
  theme defaults actually clobber is re-asserted — the rest of the base stays overridable `:where`, so
  users keep the clean override story the base was designed for.
- **One concept, many symptoms.** Weight, casing, colour and footer text were all the base losing a
  specificity battle; framing the fix as "re-assert the source at winning specificity" turns a growing
  list of one-off patches into a single rule with a known property set to extend.

*Status: Accepted.* Applied to heading parts first; the property set and the `.uHASH .part` re-assertion
pattern are the template for extending it to other converted constructs as new overrule cases surface.
