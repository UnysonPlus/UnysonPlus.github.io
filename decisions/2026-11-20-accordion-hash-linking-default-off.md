---
slug: accordion-hash-linking-default-off
title: Should the accordion write a "#accordion-…" hash into the URL by default?
authors: [jon]
tags: [shortcodes]
date: 2026-11-20
description: The accordion's URL Hash Deep-Linking option now defaults OFF, because writing a "#accordion-…-header-n" fragment into the address bar every time a panel opens surprises people and clutters the URL, while true deep-linking is a niche need that stays available as opt-in.
---

**The question:** opening an accordion panel wrote a `#accordion-…-header-n` fragment into the
browser's address bar (so `.../guides/where-to-stay/` became `.../guides/where-to-stay/#accordion-1-header-0`).
Should that keep happening by default, or should the accordion leave the URL alone unless someone
asks for deep links?

<!-- truncate -->

## Context

The accordion already had a **URL Hash Deep-Linking** option. When on, it does two things: on load it
auto-opens (and scrolls to) the item whose id matches the URL hash, and on toggle it writes that item's
id into the address bar via `history.replaceState`, so a copied link reopens the same item. The option
defaulted to **on**, so every accordion did this unless the builder turned it off — and a page with a
plain, clean permalink would visibly gain a `#accordion-…` tail the moment a visitor expanded anything.

## Options considered

- **Keep the default on.** Links to a specific FAQ answer "just work" out of the box. But the visible
  cost — a changing, cluttered URL on an ordinary content page — lands on *every* accordion, while the
  benefit only matters to the small number of pages that actually share deep links. Most people read it
  as the page behaving oddly.
- **Remove the feature.** Too far: deep-linking to a specific item is genuinely useful for long FAQ /
  guide pages, and some sites rely on it.
- **Default off, keep it as opt-in (chosen).** New accordions leave the URL untouched; anyone who wants
  shareable item links turns the one switch on. An accordion saved while the old default applied keeps
  its stored value until the option is switched off on that element (we don't rewrite saved content).

## Decision

Flip the **URL Hash Deep-Linking** default from `yes` to `no`. The renderer now enables the hash
behaviour only when the option is explicitly `yes` (an unset / newly-created accordion is off), and the
option remains in the Accordion settings for the deep-linking case.

## Why

The default should be the behaviour that surprises the fewest people. A clean page URL that stays put is
what almost everyone expects from an accordion; a self-rewriting `#…` fragment is not, and it reads as a
bug even though it is a feature. The useful case (shareable deep links to one item) is real but narrow,
so it belongs behind an opt-in switch rather than imposed on every page. Nothing is lost — the capability
is one toggle away — and the common case gets the tidy URL it should have had.
