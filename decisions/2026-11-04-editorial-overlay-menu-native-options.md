---
slug: editorial-overlay-menu-native-options
title: Should the editorial fullscreen-menu look (off-center list, 01–05 numbering, corner aside) be native Theme Settings or left to child-theme CSS?
authors: [jon]
tags: [header, theme-settings]
date: 2026-11-04
description: The Overlay (Panel) header gained three native options — Menu Alignment, Numbered Items, and a corner Aside — rather than leaving those looks to custom CSS, because they are the standard vocabulary of editorial fullscreen menus and every designed or converted site that picks Overlay reaches for them.
---

**The question:** the Overlay (fullscreen) header already reproduced most of a modern editorial menu
natively — a dark full-screen panel, large serif labels via Menu Font, a legible light ramp via Color
Mode. But three signatures of that look were missing: the menu list sitting **off-center** (left- or
right-aligned), each item carrying a **`01`–`05` number**, and a **tagline + contact aside** in a corner.
Should those be added as native Theme Settings options, or left to child-theme CSS per site?

<!-- truncate -->

## Context

Reproducing a reference overlay menu on a test site landed ~90%: the only gaps were alignment, numbering
and the aside. Each is a few lines of CSS (the theme already emits `--i` / `--count` per item and a CSS
counter is trivial), so "just write the CSS" was a real option. The alternative was to fold them into the
existing `overlay` reveal group as first-class options.

## Options considered

- **Leave it to CSS.** Zero new option surface; each site adds a scoped rule. But the rules are identical
  across sites, so every editorial overlay re-derives the same CSS — it drifts, it isn't discoverable, and
  a converted site can't pick the look from the UI. Custom CSS for a thing many sites want is a smell.
- **Native options (chosen).** Three additions to the Panel overlay: **Menu Alignment** (Center / Left /
  Right), **Numbered Items** (switch), and an **Aside** (tagline + contact text). All opt-in — center /
  off / empty leave the classic centered panel untouched — and all pure config: alignment and numbering
  are CSS driven by a drawer modifier class, numbering uses a CSS counter (no markup, no per-item data),
  the aside is one small shared render helper.

## Decision

Add them natively, housed in the `overlay` reveal alongside Color Mode, Panel-only (Radial and Concentric
ignore them). The toggle's **Menu / Close** text label was **not** added — it's already native via the
existing Mobile & Tablet options (the toggle Label and Close Button → Text), so a fourth option would have
duplicated it.

## Why

These three are the standard grammar of editorial fullscreen menus, not a one-site quirk, so they belong
in the product the same way Color Mode does — reusable, discoverable, and reachable by the Site Converter's
native mapping instead of transplanted CSS. Baking them in means they regenerate through the normal Save
flow and a later edit changes every site that uses them, where per-site CSS would silently diverge. The
cost is low: no new markup for alignment or numbering, and the whole set stays invisible until opted into,
so the classic centered overlay is byte-for-byte unchanged.
