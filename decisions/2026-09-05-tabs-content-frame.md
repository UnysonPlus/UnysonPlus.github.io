---
slug: tabs-content-frame
title: "Why the tab content frame is one 'Content Frame' select (not separate border/padding toggles)"
authors: [jon]
tags: [conversion, shortcodes]
date: 2026-09-05
description: "The tabs shortcode always drew a bordered, rounded, padded white box around the content panel — so a source whose panel is frameless (a menu card grid) landed inside a box it never had. The question was whether to add a disable-border option, and whether disabling the border should also drop the padding. The decision is a single Content Frame select (Framed / Frameless) that toggles border + radius + background + SIDE padding together (keeping a top gap), decoupled from the nav design, with the converter auto-detecting from the source panel."
---

**The question:** The tabs content panel (`.tab-content`) always carries `border: 1px solid #dee2e6; border-radius: .375rem; padding: 1rem; background: #fff`. A source whose panel is *frameless* — its content is a card grid that brings its own boxing (jukeboxburgers.com's menu) — then sits inside a bordered white box the source never had. Should we add a **disable-border** option, and if so, should disabling the border **also disable the padding**?

<!-- truncate -->

## Context

The content frame was coupled to the nav **`design`**: only `minimal` is frameless (`border:0; padding-left:0; padding-right:0; background:transparent`), and it also strips the nav. So there was no way to pair a *segmented pill* nav with a *frameless* panel — exactly what the converted menu needs (centered brand-pill toggle above, a flush card grid below). And there was no explicit control at all; the frame was an implicit side effect of the design.

The padding sub-question is the crux. Three states are possible, but two of them look broken:

- **Border on, padding on** — the default framed box (fine, when you want a box).
- **Border off, padding on** — the content floats with an unexplained indentation on all sides.
- **Border on, padding off** — the text is glued to the border.
- **Border off, padding off** — flush content (what a frameless card grid wants).

So border, radius, background and (side) padding are not independent knobs — they read as **one visual unit**, a "frame." Splitting them into separate toggles mostly just manufactures the two broken combinations.

## Options considered

- **Single `Content Frame` select — Framed / Frameless.** Frameless bundles off border + radius + background + side padding, keeping a small top gap (the nav → content breathing room, exactly what `minimal` already does). *Pro:* no broken half-states; one decision; decoupled from `design`; the converter can set it from one signal. *Con:* less granular than separate switches (but the granularity is the footgun).
- **Two independent toggles — Content Border + Content Padding.** *Pro:* full control. *Con:* surfaces the border-with-no-padding / no-border-with-padding combinations that look wrong, and asks the user to reason about a coupling the design already implies.
- **Converter-only, no option.** Emit scoped `custom_css` to zero the frame when the source panel is frameless. *Con:* no builder control; a user who wants the box back on a converted page has nothing to toggle.

## Decision

A single **`Content Frame`** select — **Framed** (default) or **Frameless** — added to the tabs Layout options, **decoupled from `design`**:

- Frameless adds a `tabs--content-frameless` wrapper class; the CSS drops `border` + `border-radius` + `background` + `padding-left/right` (and `padding-bottom`), and **keeps `padding-top`** as the nav → content gap. Any nav style can now be frameless.
- `framed` stays the default, so every existing tabs element is unchanged.
- The Site Converter reads the source's first `role="tabpanel"` (`data-sc-cs`): a real `border-top-width` or an opaque `background-color` → `framed`; neither → `frameless`. Most Tailwind/React panels are frameless, so the common case converts to a flush panel automatically; a genuinely boxed source still comes out framed.

Verified: the converted menu's panel renders `border:0; border-radius:0; background:transparent; padding:16px 0 0` — the card grid sits flush under the centered pill toggle, matching the source.

## Why

The frame is one thing, so the control should be one thing. Border and side padding travel together — a border needs padding to not crush the text, and padding without a border is just mysterious indentation — so exposing them as separate switches would trade a clean binary for four states, two of which are mistakes. Keeping a **top** gap on frameless is the one asymmetry that matters (content shouldn't jam against the nav), and it costs nothing to bake in. Decoupling from `design` is the real unlock: nav style and content framing are independent choices, and the old coupling (only `minimal` is frameless) is exactly why a segmented-pill-plus-frameless layout was impossible before. And because a frameless panel is the *common* shape for captured tab widgets, letting the converter detect it from the panel's own box — rather than defaulting to the shortcode's framed box — makes the faithful result the automatic one, with the option there for anyone who wants to put the box back.
