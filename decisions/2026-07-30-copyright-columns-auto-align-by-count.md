---
slug: copyright-columns-auto-align-by-count
title: "Copyright columns align by count, not by a per-column dropdown"
authors: [jon]
tags: [footer, architecture]
date: 2026-07-30
description: "A cloned footer's copyright line was centered in the source but rendered left in ours. Rather than add an alignment control to every copyright column, the copyright bar now auto-aligns by column count — 1 centered, 2 left|right, 3+ left|center|right — mirroring the header's slots, with the element CSS Class as the escape hatch."
---

**The question:** the copyright bar's alignment kept coming out wrong when cloning a source (centered
in the source, left in ours). Do we give each copyright column its own alignment control, or infer the
alignment from how many columns there are?

<!-- truncate -->

## Context

The header already has a fixed three-slot mental model: `main_left`, `main_center`, `main_right`. Nobody
sets an "alignment" on the header — the slot *is* the alignment. The footer copyright bar, by contrast,
is `copyright_columns` (count 1–3 with split widths), and each column rendered left-aligned by default.
So a source whose copyright is a single centered `© …` line came out left-aligned, and the fix each time
was to remember to nudge it — a recurring miss that read as "the algorithm doesn't know about column
alignment," when really the pattern was never encoded.

The overwhelming majority of real copyright bars are one of exactly three shapes: a single centered line;
a two-part "© on the left, links on the right" split; or a three-part left/center/right. That is the
same left→center→right reading as the header's slots — just driven by count instead of named slots.

## Options considered

- **A per-column alignment dropdown.** Maximum flexibility — every column picks its own alignment. But
  it adds a control to *every* copyright column to serve a case that is ~95% predictable from the count,
  and it makes the common path (a centered © line) a thing you must configure rather than a thing that
  just works. More UI, more to document, more to keep in sync with presets.
- **Auto-align by column count, with an override.** Encode the three real shapes as the default —
  1 column centered, 2 columns left|right, 3+ left|center|right — and lean on the control that already
  exists (each element's **CSS Class** field, e.g. `text-start`/`text-center`/`text-end`) for the rare
  exception. Zero new UI; the common case needs nothing.

## Decision

Auto-align by count. `unysonplus_copyright_auto_align_class( $index, $count )` in `footer-builder.php`
returns the text-align utility for a copyright column by position (`''`=left, `text-center`, `text-end`),
and the copyright render appends it to the column wrapper. It applies to the **copyright bar only** — the
main-footer *widget* columns keep their natural left alignment (widget columns don't center by count).

The escape hatch is the element's own **CSS Class** field: a `text-*` utility there sits deeper in the
DOM than the column wrapper, so it wins. Want a single **left** copyright line (against the centered
default)? Either add `text-start`, or — as the user pointed out — just use **2 columns with column 2
blank**: column 1 is left by the same rule, no override at all.

## Why

It matches a model the product already teaches (the header's left/center/right slots), so there is one
alignment concept to learn, not two. It makes the common case free and keeps the exception cheap by
reusing the CSS Class field that every header/footer element already carries — the same "use the slot's
own option, not a stylesheet, and don't add a control for the 5% case" principle behind the spacing
utilities (`mt-4`, `pt-9`). And it removes a recurring cloning miss: a centered source copyright now
reproduces with no per-site fiddling.
