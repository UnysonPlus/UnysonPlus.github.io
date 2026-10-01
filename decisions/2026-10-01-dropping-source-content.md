---
slug: dropping-source-content
title: "When is it right for the converter to throw away text the source shows?"
authors: [jon]
tags: [site-converter, architecture]
date: 2026-10-01
description: "A card's header row held a positional counter — 01 / 3 — and the converter filed it as the card's overline, then, once that was fixed, as a loose line under the title. There was nowhere correct to put it, because the element has no slot beside its icon. The decision: drop it, keyed to the counter's shape rather than its position, and let corpus frequency decide whether a missing slot is worth building."
---

**The question:** a converted card grew an overline reading `01 / 3` that the source does not draw above the title. Is the right answer to put it where the source draws it, to build somewhere for it to go, or to delete it?

<!-- truncate -->

## Context

A services card heads itself with a single flex row: `justify-between`, the icon at the left end and a small `01 / 3` counter at the right. Then the title, the copy, and a "read more" affordance.

The icon box has exactly one slot for small text — the Overline, which renders on its own line *above* the title. `card_eyebrow()` walks every leaf that precedes the heading and accepts it on size (≤13px) or uppercase, so the counter qualified and was filed there. The converted card drew a counter on a line the source has no line for.

The first fix made it worse in an instructive way. Excluding the counter from the eyebrow slot did not make it disappear — the card's *content* collector picked it up instead, and it reappeared as a loose line under the title. One drop is not enough when several independent paths can claim the same node; a thing is only really dropped when every collector agrees to skip it.

## Options considered

**Reproduce it properly — add a "meta on the icon row" slot to the icon box.** The faithful answer. It also means permanent option surface in every icon box's panel, forever, justified by a single source's decoration. Corpus measurement: across 117 captures, a small label sharing the icon's row appears on **one site**, twice, both the string `01 / 3`.

**Fake it with CSS.** The icon box stacks vertically, so lifting the overline onto the icon's line and pushing it right needs `order: -1` plus a negative margin — and by the house rule that a shared skin belongs on the preset, not the instance, it would have to go on a Box Preset. Brittle, and brittle in service of a counter.

**Drop it.** The card then renders as the source does, minus one 31px glyph that says "this is card 1 of 3" on a row that visibly contains three cards.

## Decision

Drop it — but key the drop to the counter's **shape**, not its position.

The first implementation dropped any small label at the far end of the icon's row. That same position could hold something that matters on another source: `ab 49 €`, `15 min`, `NEU`. Silently deleting a price is a worse defect than the one being fixed, and it would be invisible — nothing errors, the page just quietly says less than the source did.

So `is_counter_text()` matches only a bare index or an index over a total — `01 / 3`, `02`, `Schritt 3`, `Nr. 2` — and nothing that carries information. The same test is shared by the eyebrow chooser and the content collector, so the two cannot disagree about what a counter is.

## Why

Three things decided it.

**A counter is not content.** `01 / 3` is a rendering of the card's own index. The page already shows three cards; the glyph adds nothing a reader doesn't have. That is the only reason deleting it is defensible at all — and it is why the rule had to be narrowed to the counter shape, because the argument does not extend one millimetre past it.

**Frequency decides whether a missing slot is a missing feature.** The kit already holds the principle that a construct repeatedly landing in the scoped-CSS fallback is evidence that a native option should exist — a recurring fallback is a missing feature with a counter attached. The contrapositive is just as binding: a construct that appears on one site out of 117 is not evidence of anything, and building permanent option surface for it taxes every future user of that element to flatter one capture.

**Where a drop is implemented matters as much as whether.** Removing the node from one claimant moved it to the next. The rule only works because both the eyebrow path and the content path consult the same shape test, so there is one definition of "counter" rather than two that drift apart.

A golden pins all of it, including the negatives that are the real point: `ab 49 EUR`, `15 min` and `NEU` all survive the identical position, because the position was never what made it droppable.
