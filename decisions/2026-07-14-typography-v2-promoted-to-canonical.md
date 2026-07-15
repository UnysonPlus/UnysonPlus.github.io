---
slug: typography-v2-promoted-to-canonical
title: "Why typography-v2 became just typography (and an alias)"
authors: [jon]
tags: [option-types, naming, architecture, typography]
date: 2026-07-14
description: UnysonPlus is a fresh restart of Unyson, so the -v2 option-type suffixes are being retired. Here is why the rich typography control was promoted to the clean name and typography-v2 kept only as a deprecation alias.
---

**The question:** UnysonPlus is a fresh restart of Unyson. The rich typography control shipped as
`typography-v2` while the original `typography` was a weaker, older implementation. Do we upgrade
`typography-v2` in place, or promote it to the clean `typography` name and scrap the `-v2` suffix?

<!-- truncate -->

## Context

Two option types existed side by side: the modern `typography-v2` (family + Google-font
variation/subset + size / line-height / letter-spacing + color) used in ~11 real places, and a
stale `typography` (size / family / style / color only) used essentially nowhere but the demo files.
Shipping `typography-v2` as the *canonical* control forever contradicts the "fresh restart" premise —
a `-v2` suffix implies there is a v1 you should avoid, which is confusing in a clean product.

## The key realisation

The option-type string is **not stored in the database** — saved values are keyed by option id, and
the `type` lives only in the PHP schema. So renaming `typography-v2` → `typography` (with the new
`typography` *being* today's v2 code) needs **no data migration**: the value shape is identical, it
just gets served under a cleaner name.

## Options considered

- **Bolt the enhancements onto `typography-v2`.** Buys nothing the rename doesn't, and locks in the
  `-v2` name permanently.
- **Promote v2 → `typography`, keep `typography-v2` as a thin alias.** Clean name, no data migration,
  and old schemas keep working.

## Decision

Promote the v2 implementation to the canonical `typography`. `typography-v2` becomes a **deprecation
alias** — a small subclass that overrides only `get_type()` and reuses the canonical view, editor
JS/CSS, google-fonts, value parsing, and defaults. Both `'type' => 'typography'` and
`'type' => 'typography-v2'` now render and save identically. New code should use `typography`.

## Why

Because the rename is *cheap now* (11 call sites, no stored-type coupling) and only gets more
expensive later, and because a deprecation alias means we modernise the name **without breaking**
anyone still referencing `typography-v2`. This is the pilot pattern for retiring the other
`-v2` / `-v3` option types the same way.
