---
slug: relationships-reuse-multi-select-population
title: "Relationship fields drive the multi-select option type's population modes — we did not build a new control"
authors: [jon]
tags: [option-types, architecture]
date: 2026-07-29
description: "Custom Fields had no way to link one post to another — the gap that usually sends people to ACF. It turned out the framework already shipped the control: multi-select supports posts / taxonomy / users population with AJAX search. Three new field types expose what existed rather than adding a fourth relationship picker."
---

**The question:** Custom Fields could not link content to content. No way to point a Property at its
Agent, a Case Study at related Case Studies, a Team Member at a WordPress user. That is the single
most common reason to reach for ACF instead. Do we build a relationship option type?

<!-- truncate -->

## Context

The obvious plan was a new `relationship` option type: an AJAX-searched picker with a post-type
filter, a max-items setting and a sortable selected list. A few hundred lines of PHP and JS, plus a
new value shape to document, migrate and keep in sync.

Before writing it, an audit of all 53 option types under `framework/includes/option-types` turned up
`multi-select`, which Custom Fields already used for the "Show on post types" location picker. Its
defaults read:

```
'population'  => 'array',   // array | posts | taxonomy | users
'source'      => '',        // post types, taxonomies, or user roles to search
'limit'       => 100,       // maximum items selectable
'show-type'   => false,     // label each result with its post type / taxonomy
```

It has a working AJAX search endpoint for all three modes. Custom Fields had only ever used
`'array'`. The relationship picker had been in the framework the whole time, wired to nothing.

## Options considered

- **Build a dedicated relationship option type.** Full control over the UI, and a chance to add
  things `multi-select` lacks — inline "create new", a preview of the linked post, drag ordering
  with thumbnails. But it duplicates a working control, adds a second value shape for "a list of
  post IDs", and creates two places to fix the next search bug.
- **Expose the existing modes as field types (chosen).** Three entries in the field-type list, three
  cases in the mapper, and two small helpers to enumerate taxonomies and roles for the source picker.
- **Do nothing and point people at ACF.** Defensible for genuinely deep relational needs, but not for
  "link this post to that one", which is table stakes.

## Decision

**Related posts**, **Taxonomy terms** and **Users** are field types that emit `multi-select` with
`population` set to `posts`, `taxonomy` and `users` respectively. Each exposes a **source** (which
post types / taxonomies / roles are searchable) and a **maximum items** setting; set that to `1` for
a single relationship. An empty source means "anything of that kind" rather than "nothing" — the
reading a user actually intends when they leave it blank.

The saved value is an array of IDs, including in the single case, so a one-item relationship is read
as `$ids[0]`. We deliberately did not special-case single relationships into a scalar: one shape for
one field type is easier to document than a shape that changes with a setting.

## Why

- **The best control is the one that already works.** `multi-select`'s search, rendering and value
  handling are exercised across the framework. A new picker would start with none of that history.
- **One value shape for "a list of things".** Anything reading a relationship gets an array of IDs,
  the same as any other `multi-select`, rather than a bespoke shape only Custom Fields understands.
- **Fixes land once.** A bug in the search endpoint is one fix, not two.
- **It reframes the audit.** The lesson generalised: of the eighteen field types added in this batch,
  almost all were controls the framework already shipped and Custom Fields had simply never offered.
  The gap was never missing capability — it was missing wiring, and the audit's job was to find it.
