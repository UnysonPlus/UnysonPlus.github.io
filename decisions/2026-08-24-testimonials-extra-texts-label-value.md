---
slug: testimonials-extra-texts-label-value
title: "Testimonials extra stat lines — a repeatable label+value, a single pair, or freeform text?"
authors: [jon]
tags: [shortcodes, conversion, option-types]
date: 2026-08-24
description: "Testimonial cards often carry a proof-stat footer (a muted “Total savings” label over a bold “$14,200” figure) below the name/role. The shortcode had no field for it, so conversion crammed it into the author's role line. The question: what shape should the new Extra Texts field take — a repeatable list of label+value rows, exactly one pair, or a freeform rich-text block? We choose a repeatable label+value, because it matches the real pattern, renders consistently, and maps cleanly from source."
---

**The question:** A testimonial card frequently ends with a small **stat/result footer** — a muted label
("Total savings") over an emphasized value ("$14,200", or a lone "40% more closes"). The `testimonials`
shortcode had no field for it. When we add one — an **Extra Texts** field — what value shape should it take:
a **repeatable list of `{label, value}` rows**, exactly **one label+value pair**, or a **freeform rich-text**
footer?

<!-- truncate -->

## Context

The trigger was a conversion of a mortgage site whose review cards each had a bordered footer: "Total
savings" in muted small caps, then the figure in bold brand green. The `testimonials` shortcode captures
rating, quote, avatar, name, role and location — but nothing for that footer, so the deterministic Site
Converter was **folding the stat into the author's role line** (`VP Sales, Method Homes · Total savings
$14,200`). That's lossy and wrong: the stat is a distinct, emphasized element, not part of the role.

So the card needs a real field. The open question was its shape, which drives three things at once: how
authors enter it, how it renders, and how faithfully the converter can populate it from a source card.

## Options considered

1. **Repeatable `{label, value}` rows.** A small addable list per testimonial; each row is an optional
   muted label with an emphasized value. Renders as a footer block (label over value). Placed via a new
   "Extra Texts" slot in Card Rows.
   - *For:* Matches the observed pattern exactly (label + figure). Handles the common single-stat case
     **and** cards with two stats. The muted-label / bold-value styling is intrinsic, so every card reads
     consistently. Converter mapping is a clean split: leaf label → `label`, figure → `value`.
   - *Against:* Slightly more structure than a single pair; two fields per row.

2. **A single `{label, value}` pair.** Exactly one stat per testimonial.
   - *For:* Simplest field.
   - *Against:* Can't represent a card with two stats, and the moment one design needs a second line we'd
     be back here widening it. A repeatable is barely more code and never boxes us in.

3. **Freeform rich text.** One HTML/text field for the whole footer.
   - *For:* Maximum authoring flexibility.
   - *Against:* Loses the consistent muted-label / bold-value typography (each author re-styles by hand),
     and it's the hardest for the converter to map — it would have to guess where the label ends and the
     value begins, or dump the raw run and lose the structure. Freeform trades the one thing that makes the
     stat read as a stat (its two-part styling) for flexibility we don't need.

## Decision

**A repeatable list of `{label, value}` rows**, surfaced as an **"Extra Texts" slot in Card Rows** (defaults
to a divider + the rows at the card footer, so it can be positioned like any other slot). Each row renders a
muted label above an emphasized value; a value-only row (blank label) is allowed. The slot renders only when
a row has content, so plain testimonials are unaffected. The Site Converter maps a source card's bordered
footer stat into this field — preferring two distinct leaf texts (label + value), else splitting a single
"Label $Figure" run on the figure — and pins Card Rows to surface it, instead of cramming the stat into the
role line.

## Why

The shape should follow the data, and the data is a **label paired with a figure** — sometimes one, sometimes
two. A repeatable `{label, value}` is the tightest fit: it captures exactly that structure, so the styling
(muted label / bold value) can be intrinsic and every card looks the same, and the converter maps it
deterministically instead of guessing. The single-pair option is a false economy — it saves nothing and
caps the feature the first time a design shows two stats. Freeform maximizes authoring freedom but throws
away the consistent typography and the clean converter mapping, which is the whole point of making it a
first-class field rather than leaving it as prose. Modeling it as a Card Rows slot keeps it consistent with
how every other card-like shortcode composes, so it's positionable without a bespoke layout.
