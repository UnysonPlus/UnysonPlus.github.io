---
slug: seo-overrides-empty-not-prefilled
title: "Why is the per-post SEO title empty by default — shouldn't it be pre-filled with the template?"
authors: [jon]
tags: [extensions, option-types, storage-model, architecture]
date: 2026-08-26
description: "The rebuilt SEO extension ships the per-post SEO title and meta description as empty fields, even though the page clearly outputs a resolved title and an auto-generated description. Pre-filling them would look more helpful and is what the empty boxes seem to be missing. We keep them empty and surface the resolved value as a placeholder instead, because a pre-filled value is an override — and an override silently detaches that post from the template forever."
---

**The question:** On the post editor, the new SEO metabox shows **SEO title** and **Meta description** as
empty boxes — while the counters underneath them report a real pixel width and character count, and the
page really does emit a title and a description. If the extension already knows what those values are,
why not just **pre-fill the two fields** with them?

<!-- truncate -->

## Context

The rebuilt SEO extension resolves every field through one ladder:

```
override  →  template  →  auto-generated  →  fallback
```

The **override** is the per-post box in the metabox. The **template** is the site-wide pattern for that
content type (`%%title%% %%sep%% %%sitename%%`). The **auto** stage writes a description from the post's
content. First non-empty wins.

So an empty box is not an absence of a value — it is a *deliberate position in that ladder*. It means
"I have nothing special to say about this post; use the template, or generate one." The page is fully
described; nothing is missing. The counters showing 79px and 157 characters over two empty fields are
reporting exactly that: the resolved output.

The confusion is real, though, and it is a UI problem rather than a behaviour problem. A blank field
reads as *unconfigured*, and the natural fix — put the value in the box — is the one thing we must not
do.

## Options considered

1. **Pre-fill the field with the resolved value.**
   - *For:* The field looks configured. The user sees exactly what will be output and can edit it in
     place. No explanation needed.
   - *Against:* **It converts every post into an override.** The moment that text is the field's *value*,
     saving the post writes it to `_fw_seo_title` — and that post is now permanently detached from the
     template. Change the site-wide title pattern six months later and nothing updates, because all 500
     posts carry a frozen snapshot of the pattern as it was on the day they were saved. The template
     becomes decorative. This is the single failure mode templates exist to prevent, and it would be
     invisible until the day someone tries to do a site-wide title change and it silently does nothing.
   - Worth noting the damage is *quiet*: no error, no warning, just a template that has stopped
     mattering. That is much worse than a field that looks empty.

2. **Leave the field empty and explain it in the description text.** (What we shipped first.)
   - *For:* Correct behaviour; the "Leave empty to use the template for this content type" hint is right
     there.
   - *Against:* Demonstrably not enough — the hint sits *below* the field, and an empty box is a loud
     visual signal that outshouts a line of small grey text. This decision exists because that is what
     happened.

3. **Leave the field empty, and show the resolved value as its placeholder.** *(Chosen.)*
   - *For:* The field's **value** stays empty, so the override is never created and the post stays bound
     to its template. But the field is no longer *visually* blank — it shows the exact string the page
     will use, in muted italic so it reads as inherited rather than typed. Typing replaces it; clearing
     the box brings it back. The distinction between "inherited" and "mine" becomes visible instead of
     documented.
   - *Against:* A placeholder is slightly less discoverable than real text, and it cannot be edited in
     place — you type over it. That is the correct trade: editing in place is precisely the action that
     should require the deliberate act of creating an override.

## Decision

**Per-object override fields ship empty and stay empty. The resolved value is surfaced as the field's
placeholder, styled muted-italic to read as inherited.**

The fields that *are* pre-filled are the ones where a value genuinely belongs: the **settings-screen
templates**, which ship with sensible defaults (`%%title%% %%sep%% %%sitename%%`) because a template is
meant to be a value someone edits.

The same rule governs the storage layer, for the same reason: writing an empty override **deletes** the
meta row rather than storing `''`. "The user cleared this" and "there is nothing here" are the same
state, and keeping them the same state is what lets a post fall back to its template cleanly.

## Why

Because the cost is asymmetric and the failure is silent.

A field that looks emptier than it is costs a moment of confusion, and a placeholder fixes it. A field
that is quietly an override costs a site-wide template edit that appears to work and does nothing — and
nobody discovers it until they are trying to fix titles across five hundred posts and cannot work out why
the setting has no effect.

This is also how Yoast and All in One SEO behave, which matters less as a justification than as a
signal: both arrived at the same answer, and users migrating from either will find the behaviour they
already expect.

The general principle, worth applying to any future inherited-value field: **the value a field holds
should mean what the user intended, not what the system computed.** Anything the system computed belongs
in a placeholder, a preview, or a hint — never in the input, where it will be saved back as though a
human had chosen it.
