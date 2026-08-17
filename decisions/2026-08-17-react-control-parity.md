---
slug: react-control-parity
title: "The React controls looked right and rendered right. Why test them against PHP at all?"
authors: [jon]
tags: [option-types, architecture, javascript]
date: 2026-08-17
description: Building a second renderer for the option schema meant every control had to save a value byte-identical to the PHP one. Decision — assert that against the real PHP option type for every control, not just eyeball the UI. It caught three defects that each would have silently corrupted saved values, and none of them was visible from the JavaScript side.
---

**The question:** the React controls are thin wrappers around WordPress components. They render, they
call `onChange`, the values look correct in the inspector. Writing a PHP test for each one felt like
ceremony. Why do it?

<!-- truncate -->

## Context

The React control layer is a **second renderer** for the option schema. The PHP `_render()` path stays
authoritative for the page builder and Theme Settings; the React path exists so options can appear in
a Gutenberg block sidebar, which is a React tree that will not accept server-rendered HTML.

Two renderers, one schema, one database. The entire arrangement rests on a single property:

> A value saved through React must be **indistinguishable** from the same value saved through PHP.

Break that and nothing throws. The block saves, the page renders, and the damage surfaces later — as a
preset that no longer matches, an importer fingerprint that reports a spurious change, or a colour
that quietly reverted to its default on a page nobody edited.

## Options considered

**Eyeball the inspector.** Render each control, check it looks right, move on. Fast, and it verifies
the half of the contract that was never in doubt.

**Unit-test the React components.** Meaningful for component logic, but the risk here is not "does the
component compute the right string" — it is "does PHP accept that string". A JS test cannot answer
that, because the answer lives in `_get_value_from_input()`.

**Assert against the real PHP option type.** For every control, feed the exact value it emits through
`fw_get_options_values_from_input()` and require the stored result to equal what was sent.

## Decision

Assert against the real PHP option type, for every control, as a permanent test rather than a one-off
check — the cases live in `framework/tests/core-contracts-test.php` alongside the other silent-failure
contracts.

## Why

Because the failure mode is silent, delayed, and lands on data rather than on code. There is no error
to notice and no stack trace to follow; the value is simply *slightly different* from the one the
builder would have written, and everything downstream that compares values starts disagreeing.

The other reason is that the contract is invisible from the JavaScript side. Nothing in a React
component hints that `slider` stores a float while `unit-input` stores its number as a *string*, or
that two colour option types in the same codebase have different validation rules. You cannot infer
any of it from the schema either — it lives in each option type's `_get_value_from_input()`.

## The part worth remembering

Three defects, all in code that rendered perfectly:

**1. `color-picker` emitted `rgba()`; the server accepts hex only.** The validator is
`/^#([a-f0-9]{3}|[a-f0-9]{4}|[a-f0-9]{6}|[a-f0-9]{8})$/i`, and anything else **falls back to the option
default**. WordPress's `ColorPicker` returns `rgba()` as soon as `enableAlpha` is on — so enabling
alpha would have blanked the user's colour, with no error anywhere. Alpha in this framework is 8-digit
hex.

**2. `typography` needed a *stricter* rule than `color-picker`.** Having just written a hex normaliser,
reusing it was the obvious move. Typography validates `/^#([a-f0-9]{3}){1,2}$/i` — 3 or 6 digits only.
The 4- and 8-digit alpha forms that `color-picker` *accepts* are rejected here. Reuse would have made
every alpha colour silently revert.

**3. `icon` needed the *opposite* URL treatment from `upload`.** The `upload` option type stores its
URL protocol-relative (`//example.com/…`); `icon` stores whatever it is given. Applying the same
normalisation to both — the natural instinct, having written `upload` first — would have made every
React-written icon differ from an identical builder-written one.

The pattern across all three: **the danger was consistency with my own previous control, not
inconsistency.** Each bug came from correctly reusing a solution whose rules did not transfer. Only
the PHP had the authority to say so.

A fourth thing the tests corrected was the tests themselves. Three early assertions failed against
working code because they encoded the wrong contract — `switch` declares `null` but deliberately
resolves to its left choice; its wire format (`'true'`) is not its storage format (`true`); and it is
therefore not idempotent on its own output. Those were fixed by writing down the real contract rather
than deleting the failing lines, which is now the most useful documentation of that option type
anywhere.

## Status

Accepted. 18 registered control types, all with parity cases; 103 assertions in the suite, green on a
single site and a multisite install.
