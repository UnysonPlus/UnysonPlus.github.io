---
slug: header-two-state-layout-model
title: "Why can't a header be transparent AND shrink its logo on scroll? Splitting header behavior into two composable states."
authors: [jon]
tags: [header, architecture, back-compat]
date: 2026-08-19
description: The single header_behavior enum conflates position, top-transparency, scroll transforms, and glass into one mutually-exclusive list, so real setups (transparent + shrink, clear-at-top then glass-on-scroll) simply can't be expressed. Decision — model the header as two composable appearance states (At top / On scroll) plus a slim position axis, with a master toggle for progressive disclosure. No DB migration; a read-side shim covers legacy values.
---

**The question:** a user wants a header that is transparent over the hero *and* shrinks its
logo once you scroll. Today they can't — "Transparent overlay" and "Sticky + shrink" are two
different values of the same **Header Behavior** dropdown. Why is a header's behavior a single
choice at all, and how should we organize it so every setup is possible?

<!-- truncate -->

## Context

`header_behavior` is one `select` with five values: `static`, `sticky`, `sticky-shrink`,
`hide-on-scroll`, `transparent-overlay`. But a header's "behavior" is really **four
independent things**:

- **Position / motion** — does it pin? does it hide on scroll-down?
- **Top transparency** — clear over the hero, or a solid bar?
- **Scroll transform** — shrink the logo / tighten padding when stuck?
- **Background chrome** — the fill, plus Glass, Border, Shadow.

Forcing those into one mutually-exclusive list means most combinations are unreachable:
transparent + shrink, solid + hide-on-scroll, and — the one that started this — **clear at the
top, frosted glass only on scroll**. Glass compounds the problem: it is currently a *constant*
background (frosted at the top *and* on scroll, by design), so it can't express "frost appears
on scroll." Every recent header gap traced back to this one enum.

The converter made the smell obvious. The capture already records the header in **two states** —
`header_scroll = { top, scrolled }` — and then we throw half of it away trying to collapse both
into a single enum value, guessing whether the result should be `transparent-overlay` or
`sticky` or `sticky-shrink`.

## Options considered

- **Keep one enum, add modifier toggles** (Shrink on scroll, Frost on scroll, Solid on scroll).
  Least disruptive and no migration, but the enum still owns position *and* transparency, so the
  toggles can still contradict the mode (e.g. "Frost on scroll" under a `static` header). It
  patches symptoms, not the conflation.

- **Literal two sub-tabs, "On load" / "On scroll", both always visible.** Discoverable and
  honest about the two states, but it doubles the visible surface for everyone even though most
  headers never differ between states — and it still needs a separate home for position.

- **Two composable appearance states + a slim position axis, with progressive disclosure.**
  Model exactly the two states the header has. **Behavior** shrinks to position (`static` /
  `sticky` / `overlay`) plus a `hide on scroll` toggle. **Appearance — At top** is always shown.
  **Appearance — On scroll** (same fields + shrink) is revealed by one master toggle,
  "Change appearance on scroll"; off means the scrolled header inherits the at-top look.

## Decision

Adopt the **two-state model**: a slim **Behavior** (position + a hide toggle), **Appearance — At
top**, and a toggle-gated **Appearance — On scroll** (Background, Glass, Border, Shadow, Shrink).
The CSS splits today's constant chrome rules into `:not(.is-stuck)` (at top) and `.is-stuck` (on
scroll) halves keyed off data-attributes, with a second `--header-scroll-bg` variable; the
`.is-stuck` observer and the hide-on-scroll JS already exist and are reused as-is.

**No database migration.** The handful of live sites are re-picked by hand once the option shape
lands; a small **read-side shim** derives a missing `header_position` from any legacy
`header_behavior` so nothing renders broken in the meantime. The **converter mapping** (fill At-top
from the resting snapshot, On-scroll from `header_scroll` / `data-sc-scrolled`) and the **header
presets** are deliberately sequenced as follow-ups, so the first pass is options + CSS + JS + docs
only.

## Why

The four things the old enum bundled are genuinely orthogonal, so the honest model is orthogonal
controls, not a longer list of pre-baked combinations — a list can never cover the whole product
of four axes, and every gap becomes a support question. Two states is the *complete* description
of a header (there is no third), so the model is not just more flexible, it's bounded: you can't
invent a fifth thing to forget.

It also collapses two hard problems into one. The converter's `header_scroll` is *already* two
states; giving Theme Settings two states makes the mapping a 1:1 copy instead of the lossy
"guess a single behavior" heuristic we kept patching — the OBSIDIAN case (transparent hero,
frosted-and-shrunk on scroll) becomes an exact reproduction rather than an approximation.

The cost is real — it spans options, CSS, JS, the converter, and presets — but skipping the DB
migration (the riskiest piece) in favor of a read-side shim and hand-fixing a few sites removes
most of that risk, and the master "Change appearance on scroll" toggle keeps the panel as light
as today's for the common case. Modifier toggles on the old enum were rejected because they leave
the core conflation in place; the always-visible two-tab layout was rejected for taxing every user
with a split that most headers don't use.

*Status: Accepted. Implementation spec: `Header-Two-State-Model-Spec.docx`. Build order — theme
options + CSS/JS + docs first; converter mapping and presets follow.*
