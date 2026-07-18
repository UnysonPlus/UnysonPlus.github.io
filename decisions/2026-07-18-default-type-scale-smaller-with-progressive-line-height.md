---
slug: default-type-scale-smaller-with-progressive-line-height
title: "Why the default heading scale shrank — and why line-height was the real fix"
authors: [jon]
tags: [typography, architecture]
date: 2026-07-18
description: The theme's default headings looked large. The obvious move is to shrink the px values, but the deeper cause was a uniform 1.2 line-height applied to every heading — a display value that reads as dense and oversized on mid and small headings. We trimmed the top of the scale AND let line-height breathe as sizes descend, keeping body at 16px.
---

**The question:** The default heading sizes look kind of large. What's a better scale?

<!-- truncate -->

## Context

The shipped default scale was `h1 40 · h2 32 · h3 28 · h4 24 · h5 20 · h6 16` (px), every one at
line-height **1.2**, weight 500; body 16 / 1.6. Two problems, only one of which is the sizes:

1. **Uniform `1.2` line-height is a *display* value.** It's right for a 40px h1, but on a 20px h5 or
   24px h4 it's too tight — the heading reads dense and heavier than its px value, which is a big part of
   why the whole scale *felt* large.
2. **The ratio wandered** — steps bounced between 1.14 and 1.25, so h2/h3/h4 sat too close together
   (weak mid-hierarchy) while h1 spiked.

Body at 16px was never the issue; the paragraph size was fine.

## Options considered

- **Just shrink the px values.** Addresses the literal complaint, but leaves the tight uniform
  line-height — the headings would still read dense, just smaller. Treats the symptom.
- **Shrink the top + taper the ratio + relax line-height progressively.** Fixes the actual cause: big
  headings stay tight (they should), small headings get room to breathe.

## Decision

New default scale, with line-height that loosens as size drops and slight negative tracking on the three
largest headings:

| Element | Size | Line-height | Tracking |
|---|---|---|---|
| `h1` | 36px | 1.15 | -0.7px |
| `h2` | 28px | 1.2 | -0.4px |
| `h3` | 24px | 1.3 | -0.2px |
| `h4` | 20px | 1.35 | 0 |
| `h5` | 18px | 1.4 | 0 |
| `h6` | 16px | 1.45 | 0 |
| `body` / `p` | 16px | 1.6 | 0 |

Implemented as the **default values of the Typography options** (`general-typography.php`), so they flow
through the existing `--h*-font-size` / `--h*-line-height` token pipeline and the mobile auto-scale (h1
→ 27, h2 → 24, h3 → 20…) for free. Body is unchanged. Weight stays 500 (bumping it globally would reach
past defaults into every site, since weight isn't a per-site token — left as a separate opt-in).

## Why

Because it's the option *defaults*, the rollout is self-scoping: a site that never customized typography
gets the new baseline, and any site with **saved** typography values keeps exactly what it had — no
migration, no clobbering hand-tuned demos. The curated Typography Presets keep their own scales; this
only moves the no-preset baseline.

The lasting lesson is the line-height one: when a type scale "feels too big," check the line-height
before the font-size. A uniform display line-height across six heading levels is the quiet cause, and
tapering it (tight at the top, loose at the bottom) does more for perceived size and rhythm than shaving
a few px off each step.

Status: **Accepted.**
