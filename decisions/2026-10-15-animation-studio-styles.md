---
slug: animation-studio-styles
title: "What should an Animation Studio style control, and how is it applied?"
authors: [jon]
tags: [architecture, animation]
date: 2026-10-15
description: A style is a palette, a font pairing, a motion personality, a pace and a sound palette. Applying one restyles by role and keeps the scene's words, timing and variety; with AI, the style is art direction for the motion and is enforced exactly for colours and fonts.
---

**The question:** Should the Studio have scene presets (styles) the user can pick, so the AI bases its output on one?
And what exactly does a style decide?

<!-- truncate -->

## Context

Presets in the Studio animate one clip. A whole scene still needs consistent decisions above that level: colours,
fonts, which presets carry the headline, how fast things move, what they sound like. Users building by hand and the AI
both make those decisions, and both make them inconsistently without a reference.

## Options considered

- **Template scenes only.** A gallery of finished scenes to copy. Easy to make, but a template can't restyle a scene
  you already built, and the AI can only imitate it loosely.
- **Colour themes only.** Palette and fonts. Consistent, but leaves out motion and sound, which is most of what makes a
  motion style recognisable.
- **Styles as structured data.** Palette, fonts, a motion personality (presets per role, eases), a pace and a sound
  palette, with a title card generated from them. One definition then drives restyling, new scenes and the AI.

## Decision

Styles as structured data. Applying a style:

- **Colours by role, not by value.** Saturated colours become the accent (and the second accent), neutrals become text,
  secondary text or a panel colour according to how far they stood out from the scene's *original* background.
- **Headlines per act.** In each top-level group, the biggest text is the headline and gets the display font.
- **Motion keeps the scene's structure.** Entrances and exits change presets; emphasis, ambient, 3D, keyframes and
  code stay. Different original entrances map to different moves in the style, so variety survives. The author's
  stagger, side and distance carry over, exits never get longer, and text entrances never get longer either (that time
  comes out of reading time).
- **Each part is optional.** Colours and fonts, motion and sounds can be applied separately; words and timing never
  change.

With AI assist, the style is sent as art direction, and on a new scene its colours and fonts are applied exactly
afterwards. Users can save a scene as their own style.

## Why

Structured styles are the only option that serves all three uses (restyle, start, AI) from one definition, and the role
mapping is what makes "apply" safe: a scene changes look without losing what the author built. Each rule above came
from a measured failure. Stretching exits made acts overlap, replacing settings flattened a scene's rhythm, and
judging colours against the new background turned white text grey. Check scene verifies all eight styles applied to the
demo with no warnings.
