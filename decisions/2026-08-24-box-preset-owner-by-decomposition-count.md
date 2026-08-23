---
slug: box-preset-owner-by-decomposition-count
title: "Which container owns a card's box on conversion — the icon_box, or its column?"
authors: [jon]
tags: [conversion, architecture, shortcodes]
date: 2026-08-24
description: "A source feature card is a bordered box holding an icon, a heading and some content. When the converter turns it into native shortcodes, who should carry the box — the icon_box's own Box Style, or the column's Border Preset? We decide by the decomposition the converter already computes: a card that collapses to ONE icon_box lets the icon_box own the box; a card that becomes TWO OR MORE shortcodes (icon_box + a list/button) lets the column own it, so the box wraps everything. And it's always a Box Preset, never a one-off CSS class."
---

**The question:** A source "feature card" is a bordered panel (fill + border + radius + padding) holding an
icon, a title and some content. When the deterministic Site Converter reproduces it natively, **which
container should carry the box** — the `icon_box`'s own **Box Style**, or the enclosing column's **Border
Preset**? And should the box be a real **Box Preset** or a one-off scoped CSS class?

<!-- truncate -->

## Context

Two bugs surfaced it. First, a converted section-3 card showed the box dropped into the icon_box's **Custom
CSS** with a bare `box` utility class — no Box Preset selected — so it wasn't reusable, wasn't editable as a
preset, and didn't travel like one. Second, and more structural: once a card that contains a **nested list**
is decomposed (icon + heading + description → `icon_box`, and the list → a native `feature_list`), a box put
on the icon_box alone would only wrap the header and leave the list outside the card.

So there are really two questions: **who owns the box**, and **is it a preset or a class**. The owner
question needs a rule that's deterministic (same source → same output) and doesn't re-sniff content the
converter has already classified.

## Options considered

1. **Decide by content type.** Inspect the card: icon + title + a single paragraph → icon_box owns it;
   contains a list or a button → column owns it.
   - *For:* Matches intuition directly.
   - *Against:* Re-inspects and re-classifies content the converter already turned into shortcodes; a second
     heuristic to keep in sync with the recognizers, and fragile at the edges ("is this a list?").

2. **Decide by decomposition count.** The converter already knows how many shortcodes a card cell becomes.
   If it collapses to **one** `icon_box`, the icon_box owns the box (`box_style`). If it becomes **two or
   more** shortcodes (icon_box + feature_list / button / …), the **column** owns it (`border_preset` on the
   inner wrapper), so the box wraps all of them. N boxed icon_boxes in one column → each owns its own box.
   - *For:* Uses a signal the pipeline already computes — zero extra heuristic, and it's exactly the
     content-type rule expressed structurally (a list/button is *why* the card became 2+ shortcodes).
   - *Against:* None material; it is the same decision, sourced from data instead of a re-scan.

3. **Always the column.** Put every card's box on the column.
   - *Against:* A self-contained single icon_box is more portable when the box is its own (`box_style`
     travels with the element on export); forcing it onto the column loses that and over-nests.

Orthogonally, for the skin itself: a **Box Preset** (registered once, emitted in Theme Settings, referenced
by `box_style` / `border_preset`) versus a **one-off scoped box class + Custom CSS**. The preset is
reusable, editable in one place, and portable; the class is a per-element dead-end.

## Decision

**Own the box by decomposition count, always as a Box Preset.** One `icon_box` → the icon_box owns it via
`box_style = boxp-<slug>`. Two or more shortcodes → the column owns it via `border_preset = boxp-<slug>` on
the inner wrapper, wrapping every child. Multiple boxed icon_boxes in a column → each owns its own preset.
In every path the skin is **registered** (`register_box_preset`, keyed by a hash of the normalized skin so
identical cards share one preset) and emitted as a real Box Preset — never a bare `box` class + Custom CSS.

This also corrected a latent bug in the other card paths (counter grids, stacked cards, nested grids): they
were matching against *pre-existing* theme presets only (`box_preset_slug` → the box lookup), so a freshly
captured skin fell through to one-off CSS. They now `register_box_preset` like the primary path, so every
captured card box becomes a real, deduped preset.

## Why

The decomposition count **is** the content-type signal, already computed — a card becomes 2+ shortcodes
precisely *because* it holds a list or a button beyond what one icon_box can represent. Keying the owner off
that count means one source of truth and no second heuristic drifting out of sync with the recognizers. The
box must enclose everything it enclosed in the source, so a multi-shortcode card has to be boxed at the
column; a lone icon_box is most portable owning its own box. And registering a real Box Preset — rather than
stamping a one-off class — is what makes the converted box behave like a designed box: reusable across the
cards that share it, editable in Theme Settings, and portable on template export. The bug where fresh skins
silently degraded to Custom CSS was the same mistake in four other places (match-only lookup instead of
register), now fixed uniformly.
