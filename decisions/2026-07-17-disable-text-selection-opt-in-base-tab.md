---
slug: disable-text-selection-opt-in-base-tab
title: "Why 'disable text selection' is an opt-in General → Base toggle, not a new Settings tab"
authors: [jon]
tags: [architecture, option-types]
date: 2026-07-17
description: A missing CSS-variable fallback had made text selection render invisibly site-wide — a bug. Rather than only fix it, we turned the behaviour into a deliberate, opt-in Content-protection feature (disable selection, right-click, copy). The open question was where it belongs — a fresh Others tab, or an existing home. We put it in General → Base next to the selection-colour options, off by default, gated by body classes.
---

**The question:** A theme bug made text unselectable everywhere (the selection highlight was invisible). While
fixing it, we realised some site owners actually *want* selection disabled as a copy deterrent. So: expose it
as a real Theme Settings option — and where should it live, a new "Others" tab or somewhere that already exists?

<!-- truncate -->

## Context

The bug: `::selection { background-color: var(--selection-bg) }` referenced a custom property that is only set
when the *Selection Background* option is filled in (default empty). An **undefined `var()` with no fallback
invalidates the whole declaration**, so `background-color` resolved to `transparent` — text still selected, but
the highlight was invisible, which reads to a user as "I can't select anything." (Fixed by falling the vars
back to the `Highlight` / `HighlightText` system colours — the real browser default the code always intended.)

That surfaced a product question: an *invisible* selection is a bug, but a *deliberately disabled* selection is
a feature people ask for — a light deterrent against casual copy-paste of content. So we exposed it. The design
decision was placement. General → **Base** already describes itself as *"small site-wide polish styles that no
other tab owns: text-selection colour, a custom scrollbar, the focus outline,"* and it already contains a
**Text selection** group.

## Options considered

- **A new "Others" / "Misc" tab** just for the protection toggle(s). A clean bucket, but it orphans a single
  switch, invites tab sprawl, and duplicates the exact purpose the Base tab already serves.
- **Add it to the existing General → Base tab**, in the Text-selection group, right beside Selection Background
  / Selection Text Color. Same concept ("what happens when a visitor selects text"), same neighbourhood.

## Decision

**General → Base, in the Text-selection group.** Three opt-in switches — *Disable Text Selection*, *Disable
Right-Click*, *Disable Copy* — all **Off by default**. Each adds a body class (`up-noselect` / `up-nocontext` /
`up-nocopy`); `style.css` keys selection off `up-noselect`, `theme.js` blocks the context menu / copy events for
the other two. Form fields (`input`, `textarea`, `select`, `[contenteditable]`) are always excluded so search,
logins and comments keep working. This mirrors the tab's existing `custom-scrollbar` body-class gate.

## Why

- **The Base tab is the home for exactly this.** It is the catch-all for site-wide polish/behaviour that no
  feature tab owns, and a "disable selection" switch is conceptually adjacent to "selection colour." A one-option
  "Others" tab would orphan it; a Misc tab only earns its place once several genuinely-uncategorisable options
  pile up — not for one switch.
- **Opt-in, off by default, honestly labelled.** Disabling selection is a *deterrent, not protection* — the
  content is still reachable via View Source, Reader mode, or DevTools — and it has real costs for legitimate
  visitors (can't copy a bonus code or address) and for accessibility. So it must never be on unless the owner
  deliberately turns it on, and the option descriptions say so plainly.
- **Body-class gating keeps it backward-compatible.** Nothing changes for existing sites until a switch is
  flipped, exactly like the custom scrollbar — no new always-on CSS/JS, no per-page cost when off.

## Status

Accepted.
