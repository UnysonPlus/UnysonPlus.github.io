---
slug: a-generated-site-gets-a-real-logo
title: Why a generated site gets a real logo, and why the no-invented-content rule never forbade one
authors: [jon]
tags: [site-creator, design]
date: 2026-11-27
description: A missing logo was treated like a missing testimonial, so generated sites shipped their name set in the body font. A wordmark drawn from the business name cannot be wrong about the business, so the rule that bans invented facts never reached it.
---

**The question:** "There's not even a proper logo. It's just a text. We can't show this."

<!-- truncate -->

## Context

Generated sites were shipping with the site title rendered in the body font as their brand mark. That is the theme's
**fallback**, not a design, and it is the clearest single signal that nobody finished the job — a visitor reads it
before they read anything else.

It was happening by the rules, not against them. The build rules mentioned a logo only once, to say *"a text logo is
a perfectly good fallback"*, and `brand.logo` sat in the spec's `missing[]` list beside the testimonials and the
opening hours. Treated as one more fact nobody supplied, the build correctly declined to invent it.

## Options considered

1. **Leave it.** Honest, and it looks unfinished on every site the tool produces.
2. **Generate a placeholder mark** — an initial in a circle, a generic glyph. Fills the space and is worse than the
   wordmark, because it looks like a decision rather than an omission.
3. **Treat the logo as part of the design system** and build one, from the system, every time.

## Decision

Option 3, written as `recipes/logo.md` and wired into step 3 of the create-site flow, alongside applying the style.

The build rules were corrected too: the sentence licensing the fallback now says the fallback is a safety net rather
than the plan, and that `brand.logo` in `missing[]` is a reason to **make** one.

The recipe's constraints are what make the mark belong to the site rather than float beside it:

- **Built after the style and from it** — its typeface is the heading font already chosen, its colour a role already
  in the palette, its shape language the one the style set. A mark in a fourth typeface is a second design system
  fighting the first.
- **Scoped to the theatre level** — Quiet and Measured get a composed logotype, Full earns a constructed symbol. A
  pictorial mark on a Quiet brief is the enthusiasm failure in miniature.
- **One mark, two renderings**, because the header sits on the page ground and the footer usually on a dark band, and
  a dark logotype on a near-black footer is the commonest way this ships broken.
- **Sideloaded, never hotlinked**, since the theme re-resolves logos from their attachment id on the current site.
- **Checked rendered** — at header size, at phone width, reversed on the real footer colour, and at 16px as a
  favicon, where most logotypes stop being a shape and need a monogram cut.

## Why

**The no-invented-content rule's own test clears it.** That rule asks one question of anything a build is about to
put on a page: *could this be wrong about them?* A fabricated testimonial can — it attributes words to a person who
never said them. An invented opening time can. **A wordmark drawn from the business's own name cannot.** It asserts
nothing that the business name does not already assert, so the rule never reached it, and reading it as forbidden
was a misreading rather than caution.

This is the same correction already made for photographs, and the pair is worth stating together: the rule bans
invented **facts**, and it is routinely misread as a reason to ship bare pages. A photograph of the subject matter
and a logotype of the name are both illustration, not assertion.

**The practical test of the recipe was a bakery brief** built cold from a clean install. The flow produced a mark
before any page existed — a three-peak ridge over a board, reading as both the moorland the bakery is named for and
a loaf on a board — in the style's own colour and rounded shape language, reversed for the footer and cut down to a
single peak for the favicon. Three earlier concepts were drawn and thrown out, one of which read as a padlock. That
the first attempts were bad is the point: a logo step produces something to reject, and a missing logo step produces
a wordmark nobody chose.
