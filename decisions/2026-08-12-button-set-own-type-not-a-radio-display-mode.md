---
slug: button-set-own-type-not-a-radio-display-mode
title: "Why Button Set is its own option type instead of a display mode on radio"
authors: [jon]
tags: [option-types, architecture, accessibility]
date: 2026-08-12
description: A segmented control stores exactly what a radio stores — one key from a fixed set — so the textbook move is a presentation flag on the existing type, not a new one. We went the other way. UnysonPlus already ships presentation-variant types (short-text, medium-text, short-select, medium-select, predefined-colors-color-picker-compact), so a display flag would have been the inconsistent choice here, and a findable entry in the option-type index beats a flag buried in another type's docs. It also covers multi-select, which a flag on radio could not.
---

**The question:** A button set stores the same value a radio stores — one key from a fixed set of
choices. Everything else is presentation. So should it be a new option type at all, or just
`'display' => 'buttons'` on `radio`?

<!-- truncate -->

## Context

Comparing the Unyson+ option types against Redux Framework's field list turned up a genuine gap: no
segmented control. For three or more choices you get `radio` (a vertical list) or `select` (choices
hidden behind a click). `switch` covers two choices with custom labels, and `image-picker` covers
visual choices, but there was nothing between them.

The gap matters most in the page-builder modal, where the panel is narrow and settings like
alignment, heading tag, size preset and layout appear constantly. A three-item vertical radio list
costs three rows; a segmented control costs one. Across a builder panel that compounds.

The obvious objection is that this is *only* presentation. The stored value is identical, so the
usual advice applies — extend the existing type with a display flag rather than duplicating storage
semantics behind a second name.

## Options considered

**A display mode on `radio`.** `'display' => 'buttons'`. No new type in the index, no new docs page,
no new screenshots, no preset-library consideration. Every existing `radio` option could opt in by
adding one key, and the value shape is untouched by construction. This is what most codebases should
do, and it was the initial recommendation.

**A new `button-set` type.** A 73rd type to document and maintain, but discoverable in the
option-type index, and able to cover *both* single and multi select in one place.

**Both — a type that internally delegates to `radio`.** Rejected quickly: it buys the discoverability
of a type and the indirection cost of a flag, while making the value logic harder to follow.

## Decision

**Its own type: `button-set`.** Three things decided it.

**The framework's own precedent runs the other way.** Unyson+ already ships `short-text`,
`medium-text`, `short-select`, `medium-select` and `predefined-colors-color-picker-compact` — types
that differ from their base type only in width and chrome. Given that, a display flag on `radio`
would have been the *inconsistent* choice, not the principled one. A convention that a codebase
already contradicts five times over is not that codebase's convention.

**Discoverability is the product.** For a framework whose pitch is the breadth of its option types,
a flag documented inside another type's page is effectively invisible. People browse the index; they
do not read `radio`'s optional attributes hoping for a layout switch.

**A flag on `radio` could not have covered multi-select.** This is the argument that settles it.
Redux's `button_set` handles single *and* multiple selection, and so does ours: `'multiple' => true`
switches from radio to checkbox semantics. A display flag on `radio` would have needed a twin flag on
`checkboxes`, leaving developers to pick the right base type *first* and only then discover they could
style it. One type that asks "single or multiple?" is a better question to answer than "radio or
checkboxes, and can either look like buttons?"

Supporting decisions:

- **Value shape follows the existing types, not Redux.** Single mode returns the choice key as a
  plain string, exactly like `radio`. Multiple mode returns `array( key => true )`, exactly like
  `checkboxes`. Internal consistency was worth more than matching Redux's shape, and it means an
  existing `radio` or `checkboxes` option can switch to `button-set` with **no data migration** —
  a one-line change to `type`.
- **No third-party library.** Unlike the colour picker, where Coloris earns its place, a segmented
  control is native `<input type="radio|checkbox">` with the input visually hidden and its `<label>`
  styled. Keyboard navigation, focus rings, screen-reader group semantics and form serialization
  come from the browser. A JS library rendering `<div>` buttons would have to reimplement all of it
  in ARIA. The only JavaScript in the type is ~40 lines implementing `allow_deselect`.
- **Colours are deliberately not configurable.** The control inherits `--wp-admin-theme-color`
  through the framework's `--fw-accent` token, so it follows the admin colour scheme *the user*
  chose. A per-option colour would override that preference, break panel consistency, and move
  contrast policing onto option authors.

## Why this doesn't generalise

Worth stating plainly, because the reasoning here inverts the usual advice: this is not a licence to
create a type per visual variant. It held because the framework already had presentation-variant
types, because the index is the discovery surface, and because the multi-select requirement crossed
two base types. Absent those, a display flag remains the right default.
