---
slug: validation-explains-it-does-not-block
title: "Post Types validation reports what will not register — it never blocks the save"
authors: [jon]
tags: [architecture]
date: 2026-07-29
description: "A row with a duplicate or reserved key can't be registered. The obvious response is to reject the save, but that throws away the user's typing to protect a definition that harms nothing while it sits unregistered. Validation now runs at save time, stores everything as entered, and explains per row why something won't appear."
---

**The question:** the Post Types screen silently dropped invalid rows — a reserved key, a duplicate,
a taxonomy attached to nothing. The user saved, saw "Saved.", and nothing appeared, with no way to
find out why. Adding validation was obvious. Whether validation should **refuse the save** was not.

<!-- truncate -->

## Context

Registration happens on `init`, where the only available response to a bad row is `return`. Every
failure mode was a silent early exit: empty key, reserved key, a key another plugin already owns, a
duplicate within the list, a taxonomy with no post types. All of them looked identical to the user —
like the save hadn't worked.

The natural fix is to validate on submit and reject. But a definition row is inert: an unregistered
row does nothing at all until it becomes valid. Nothing downstream reads it, nothing renders from it,
no content depends on it. The cost of storing an invalid row is zero.

The cost of *rejecting* one is not. The screen holds two `addable-popup` lists whose rows each carry
around thirty options across six tabs. Refusing a save means handing all of that back and asking the
user to find the problem — or worse, losing it.

## Options considered

- **Block the save on any error.** Conventional, and it guarantees the stored state is always valid.
  But it discards a large amount of work to prevent a state that is harmless, and it makes the
  common case — a half-finished row someone wants to come back to — impossible.
- **Silently fix what we can.** We already did a version of this by truncating over-length keys, and
  it was the worst behaviour of the lot: a key typed as `customer_testimonial` registered as
  `customer_testimonia`, so the row label and the real key disagreed permanently.
- **Store everything, explain everything (chosen).** Validate on the save request, write the
  definitions exactly as entered, and render the problems as per-row admin notices naming the row and
  the fix.

## Decision

Validation runs in the save handler — which sits on the page's `load-` hook, so it runs *after*
`init` and can therefore use `post_type_exists()` / `taxonomy_exists()` meaningfully. It returns a
list of errors and warnings, which are stashed in a transient and rendered as notices after the
post-redirect-get. The definitions are always stored as submitted.

Errors cover what cannot register: missing, unusable, over-length or reserved keys; duplicates within
a list; a post type and taxonomy sharing a key; a key another plugin owns; a taxonomy bound to
nothing. Warnings cover what will register but probably isn't what was meant: a key adjusted by
`sanitize_key`, a URL slug colliding with an existing page, an archive enabled on a non-public type,
a non-numeric menu position.

Over-length keys became an **error** rather than a silent truncation, reversing the earlier
behaviour.

## Why

- **An invalid row is inert, so storing it costs nothing.** The only thing rejection protects is the
  tidiness of an option row that nothing reads until it is valid.
- **Losing the user's input is a real cost.** With thirty options across six tabs per row, a rejected
  save is a genuinely expensive event, and validation exists to help the user — not to defend the
  database from a state that harms nothing.
- **Silent correction is worse than either.** Truncation taught us that: the system and the user end
  up with different ideas of what the key is, and nothing ever tells them.
- **Save-time is the only place with enough information.** At `init` we can't report anything; in the
  browser we don't know what other plugins have registered. The save request knows both.
