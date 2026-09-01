---
slug: block-enrichment-which-types-stay-core
title: "Which converted regions become UnysonPlus blocks, and which stay core"
authors: [jon]
tags: [conversion, gutenberg, extensions]
date: 2026-09-01
description: The block-theme converter's "enriched" vocabulary swaps some intermediate types for UnysonPlus blocks — but images and the columns wrapper deliberately stay core blocks, because there the core block is strictly better.
---

**The question:** The block-theme output has an optional *enriched* vocabulary that emits
`unysonplus/*` blocks instead of core blocks. Should **every** intermediate type enrich, or do some
regions genuinely belong on core blocks even when the user opted into enrichment?

<!-- truncate -->

## Context

Tier C6 of the [block theme roadmap](/ai-dev-kit/block-theme-roadmap) adds a second *vocabulary* to the
converter's block emitter: `core` (the default — a portable, plugin-independent block theme) and
`enriched` (emit the matching **UnysonPlus block** where one exists, so the output carries the
framework's own controls). It is one emitter with a swappable vocabulary, not a second pipeline.

Each `unysonplus/*` block is a **dynamic** block that delegates its render to the matching Unyson+
shortcode, carrying `upOptions` = that shortcode's saved atts. Mapping an intermediate type therefore
means shaping `upOptions` correctly. `button`, `heading` and `text` map cleanly to
`unysonplus/button`, `unysonplus/special-heading` and `unysonplus/text-block`, and the `section` band
maps to the container block `unysonplus/section`. The open question was the remaining types — `image`
and the `row`/columns wrapper.

## Options considered

- **Enrich everything.** Maximum "nativeness" — every region becomes a UnysonPlus block. But it forces
  a mapping even where the UnysonPlus block is *worse* than the core block, and where the block
  vocabulary has no clean equivalent at all.
- **Enrich only where the UnysonPlus block is as good or better; leave the rest on core.** Keeps the
  enriched output honest: the framework's controls where they add value, the core block where it wins.
- **A per-type opt list the user tunes.** Maximum control, but nobody wants to configure a
  block-by-block enrichment matrix for a one-shot conversion; it is complexity with no real audience.

## Decision

**Enrich `button`, `heading`, `text` and the `section` wrapper. Deliberately keep `image` and the
`row`/columns *wrapper* on core blocks — even in enriched mode.** Two specific carve-outs:

- **`image` → stays `core/image`.** `unysonplus/media-image` has no `alt` option, and its image URL
  would live inside the block's `upOptions` JSON — which the install-time media localizer scans as
  `<img src>`, not as JSON. Enriching images would therefore **lose alt text and skip localization**
  (the image would hotlink the source). `core/image` keeps alt and is localized on install.
- **`row`/columns → the *wrapper* stays `core/columns` → `core/column`; the *content* still
  enriches.** There is no UnysonPlus `row` block: the `.fw-row` Bootstrap-grid parent that
  `unysonplus/column` needs is not exposed as a block, and a bare `unysonplus/column` renders
  `fw-col-12` and stacks. `core/columns` is the superior responsive, plugin-free layout, so the columns
  wrapper stays core while the emitter still threads the enriched vocabulary *into* each column — an
  enriched row is `core/columns → core/column → unysonplus/*`.

## Why

This is the converter's own version of **faithful degradation over fake nativeness** (futureproofing
principle #6). "Enriched" is a promise that the output is *better* for someone staying in the
UnysonPlus world — not that every block carries the `unysonplus/` namespace for its own sake. Where a
UnysonPlus block would lose information (image alt), break a guarantee (media localization), or has no
correct structural equivalent (the missing row grid container), the core block is the *more* faithful
choice, and forcing enrichment there would make the feature worse while looking more "native." Keeping
the carve-outs also keeps the emitter thin and the mapping table honest: a type earns an enricher only
when it renders at least as well as the core block, verified by a golden fixture and a real
`do_blocks()` render. More leaf types can join later on exactly that bar; these two are out by design,
not by omission.
