---
slug: block-attributes-are-not-validated
title: "A block's values never meet the validator that guards the page builder. Why leave it that way?"
authors: [jon]
tags: [gutenberg, architecture, back-compat, option-types]
date: 2026-08-18
description: Block attributes go from the editor straight to the element's PHP view, skipping _get_value_from_input() entirely. Turning validation on was tried and measured against all 62 blocks. Decision — leave it off, because switch requires a JSON-encoded wire format that no already-saved block holds, so enabling it would silently flip working switches off in existing content.
---

**The question:** the page builder validates every saved value through each option type's
`_get_value_from_input()`. A Gutenberg block does not — its attributes reach the element's
view directly from the editor. That asymmetry looks like an oversight. Why not close it?

<!-- truncate -->

## Context

Every Unyson+ block is a dynamic block: it stores option values as one `upOptions` attribute
and renders on the server by delegating to the matching shortcode. The render callback fills
in the element's declared defaults underneath the block's values, then calls the shortcode.

What it does *not* do is run the values through the option types. So the two authoring
surfaces have different guarantees:

- **Page builder** — the value is whatever `_get_value_from_input()` returned. Invalid input
  is replaced by the option's default. This is the security and shape boundary.
- **Block** — the value is whatever the React control emitted, unexamined.

Nothing was visibly broken by this, because the React control layer is written to emit exactly
what each validator would have produced, and the contract suite asserts that for every control.
But "nothing is wrong today" and "the shape is enforced" are different claims, and only the
second survives someone editing a value by hand or a control drifting.

## Options considered

**1. Leave it.** The controls agree with the validators, and the test suite holds that line.
Cheap, and already true. But the agreement is a convention rather than a mechanism, and the
suite tests the controls, not the content — a block whose attributes were written by an older
plugin version, or hand-edited in the code editor, is checked by nothing.

**2. Validate at render.** Pass the block's attributes into
`fw_get_options_values_from_input()` instead of an empty array. One line. It makes the block
path use the identical validator, and the two surfaces agree by construction.

**3. Validate at save, in the editor.** Round-trip attributes through a REST endpoint on
change. Closest to what the page builder does, and by far the most machinery — a network call
per keystroke, or a debounce that makes the sidebar feel laggy.

## What the measurement showed

Option 2 was implemented and the rendered output of **all 62 blocks** was captured before and
after, with representative attributes, ids and nonces normalised. Three blocks changed.

Two were **improvements**:

- `icon-box` and `image-content` gained the `<p>` wrappers that `wpautop()` adds to a
  `wp-editor` value. That is a real inconsistency the change would fix — the same text typed
  into a block and into the page builder currently produces different markup, and the block's
  unwrapped version inherits none of the paragraph styling.

One was a **regression**, and it decided the question:

- `notification` lost its dismiss button.

`FW_Option_Type_Switch::_get_value_from_input()` runs `json_decode()` on its input and then
compares with `in_array( …, strict )`. It therefore requires the JSON-encoded form: the
**string** `'true'` passes; boolean `true` does not, because `json_decode(true)` yields int `1`,
which matches neither declared choice — so the option's default comes back instead.

The React switch control emits the **declared** value, boolean `true`. That is correct for the
unvalidated path, and it is what every block already saved contains.

## Decision

**Leave block attributes unvalidated at render.** Record the finding at the call site, and keep
the contract suite as the thing that holds the two surfaces in agreement.

## Why

Turning validation on does not merely require changing the switch control's wire format. It
requires **migrating attributes that already exist**. Every block in every post with a switch
set to its non-default choice holds a raw boolean, and validation would read that as invalid
and return the default — silently turning working switches off in published content, at render
time, with nothing in the editor to indicate it had happened.

That is the worst shape a regression can take: invisible at the moment of change, visible only
to visitors, and attributable to nothing the site owner did.

The fix is a real piece of work — change the control's emitted format, change its comparison so
an existing raw value still reads as checked, migrate saved attributes, and re-measure. It is
worth doing. It is not worth doing as a one-line improvement discovered late in an unrelated
batch of work.

The honest summary of the current state: the two surfaces agree because the controls are
careful and the suite checks them, not because anything enforces it at render. That is weaker
than it should be, and it is now written down where the next person to reach for the one-line
version will find it.

*Status: Accepted. Revisit when the switch control's wire format is migrated.*
