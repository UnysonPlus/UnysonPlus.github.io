---
slug: a-palette-role-must-pass-both-ways
title: "Thirty design systems were adapted into presets — why did so many of their own accent colours fail?"
authors: [jon]
tags: [site-creator, accessibility, color, architecture]
date: 2026-10-23
description: Thirty published design-system specs were turned into Unyson+ Theme Settings presets, and a third of them named an accent colour that could not be used as specified. The pattern was not carelessness — it was a structural gap between how a design system describes colour and how a theme consumes it. Decision — a palette ROLE must pass contrast in both directions, as a fill and as text, and a value that passes in only one direction is a decoration rather than a role.
---

**The question:** Thirty design-system specs were adapted into presets. Roughly a third of them
specify an accent colour that cannot be used the way the spec itself says to use it. Why does this
keep happening, and what rule stops it?

<!-- truncate -->

## Context

Each preset is a set of **Theme Settings values**: a palette of named roles (Primary, Secondary,
Accent, Muted), a type stack, a radius, three surfaces. Buttons and links follow the roles *by
reference*, which is the whole point — change the role and everything wearing it changes.

That reference model is also where the failures come from. A design-system document describes colour
**per component**: "primary button, violet background, white text" in one place, "links are violet" in
another. Nothing forces those two statements to be checked against each other. A theme role has no
such freedom: **one value feeds the button fill, the link text and the icon**, so it has to work in
both directions at once.

Measuring every spec in the set made the pattern visible.

### Colours that fail in both directions

Six specs name a value that fails *as text on the page* **and** *under a white label* — no text
colour rescues it, because the fill itself is wrong for the job:

| Preset | The spec's value | As text | Under white |
|---|---|---|---|
| Playful Geometric | violet `#8B5CF6` | 4.16:1 | 4.23:1 |
| Professional | gold `#B8860B` | 3.11:1 | 3.25:1 |
| Botanical | sage `#8C9A84` | 2.79:1 | 2.97:1 |
| Sketchbook | marker red `#FF4D4D` | 3.16:1 | 3.27:1 |
| Industrial | alert red `#FF4757` | 2.64:1 | 3.34:1 |
| Neumorphism | accent `#6C63FF` | 3.41:1 | 4.32:1 |

Each sits in the middle of the lightness range — bright enough that white disappears on it, dark
enough that it disappears on a light page. A mid-tone is the one place a colour can fail twice.

### Colours that are simply the wrong way round

A second group fails only under white, because the spec assumed a saturated fill must be a dark one:
the void colour on a neon green measures **15.66:1** while the page ink on it is **1.02:1** —
identical luminance, an invisible label. The same holds for acid yellow, hot magenta, brass, amber and
every highlighter in the set. *A glowing surface feels dark and is not.*

### And one that is nobody's fault

Theme Settings uses the **Muted** role as a *text* colour — the small label above a heading. Several
specs name a pale surface for "muted" (`#E0E0E0`, `#F3F4F6`, `#F2F2F2`), which is a perfectly good
description of what they meant and renders that label at **1.16:1** when taken literally.

## Options considered

**Keep the spec's values and fix each failure where it appears.** Faithful to the source, and wrong in
practice: the failures appear in places the preset does not control — a skip link, a site title, a
label emitted by a theme template. Patching per element also means the next element added inherits the
broken value again.

**Add a second value per role — one for fills, one for text.** This is what the Modern Dark preset
genuinely needs (`#5E6AD2` as a fill, `#6872D9` as text, because the fill value as type misses AA by
0.18). But doubling every role to solve a problem that only two of thirty presets actually have makes
the common case worse, and gives an agent two values to choose between where one would do.

**Move the value until it works in both directions, and demote the original.** One step darker usually
does it: the professional gold goes from 3.11/3.25 to 4.81/5.02 and is still recognisably the same
burnished gold. The bright original stays in the style as a decorative fill, where nothing has to be
read on it.

## Decision

**A palette ROLE must pass contrast in both directions — as a fill carrying a label, and as text on
the page. A value that passes in only one direction is a decoration, not a role.**

Three corollaries, each of which caught a real defect:

1. **The Muted role is text.** Whatever a spec calls "muted", the preset's value must be readable
   against the page. The pale surface the spec was describing belongs on the Alt surface instead.
2. **A gradient's contrast is its worst stop**, never its average. Checking the dark end of an
   orange-to-gold sweep and shipping white on it fails along most of the button.
3. **Where no single value can satisfy both uses, the style says so out loud.** Neo-brutalism's
   highlighter red cannot be darkened without losing the black label the style requires, so the fill
   keeps the red and the two chrome elements take ink through scoped preset CSS.

## Why

Because the reference model is the feature. A role that only works in one direction quietly converts
"change the palette and the site follows" into "change the palette and check every element" — which is
the thing Theme Settings exists to avoid.

It is also the cheapest possible check. Every one of these was found by rendering the preset on a real
page and measuring each visible text node against its nearest opaque surface — the same pass, run
thirty times, in the same place the user will look. Stored option values were correct in all thirty
cases while the rendered page was wrong in eleven of them, which is the part worth remembering: the
data being right does not mean the page is.
