---
slug: styled-content-card-verbatim-vs-mirror
title: "Why a styled content card converts VERBATIM (Tailwind reproducer), not as a decomposed mirror"
authors: [jon]
tags: [conversion, shortcodes]
date: 2026-09-05
description: "A source section often holds a styled CONTENT CARD — a white rounded panel (bg + border + shadow) wrapping an image, heading, address and a pill button (jukeboxburgers.com's location card). The deterministic converter first FLATTENED the card (content spilled onto the section band, unreadable), then a structural-mirror pass rebuilt it as native flexbox+text — which carried the panel but dropped most Tailwind (spacing, alignment, the pill button, max-widths, image height). The question was mirror-decompose vs keep-verbatim; the decision is keep the whole card VERBATIM inside the .sc-tw Tailwind reproducer (like the food grid / reels), re-asserting only the few things the reproducer can't (each heading's own colour), because fidelity beats editability for a detail-dense card."
---

**The question:** A source section is a styled **content card** — a white rounded panel (`rounded-2xl border bg-background shadow`) wrapping a full-bleed image, an overline, a big coloured heading, an address, contact links and a pill button (jukeboxburgers.com's "Visit Us" location card). Should the deterministic (PHP) converter **decompose** it into native builder elements, or keep it **verbatim** inside the Tailwind reproducer?

<!-- truncate -->

## Context

Two earlier attempts each lost something:

1. **Flatten (the original behaviour).** The section recognizer decomposed the card's *content* into flat blocks and threw away the wrapper, so the heading/address/button sat directly on the section's red band — no white panel, the content barely legible.
2. **Structural mirror.** A tightly-gated recognizer routed the card to `n_structural_mirror`, which rebuilds an un-decomposable subtree as a nested flexbox (containers → flexbox Divs, leaves → native text/image). That recovered the white panel and — with added carries — the box skin, the heading/overline colours, uppercase/tracking, and a full-width image. But it still **dropped most of the card's styling**: element spacing (`mb-3`, `py-6`), flex alignment, the `bg-primary … rounded-full` **pill button** (flattened to faint link text), `max-w-*` measures, and the image's `h-48 md:h-64` aspect. The user's verdict was blunt: "a lot of classes are still dropped."

The mirror is the wrong tool here **by design**: it trades fidelity for editability, decomposing to a curated subset of native options. For a detail-dense card that's a bad trade — the food-grid and reels sections already look faithful precisely because they stay **verbatim** inside `.sc-tw`, where the offline Tailwind reproducer compiles their classes.

## Options considered

- **Decompose (mirror).** Editable native elements. *Con:* drops spacing / alignment / button / max-width / image-height — most of what makes the card look like the card. Verified visually: wrong.
- **Keep verbatim inside `.sc-tw`.** Emit the whole card as a `code_block` wrapped in the Tailwind-reproducer scope so every class survives. *Con:* not individually editable in the builder, and a class the reproducer doesn't cover still won't render — notably **custom colour classes** (`bg-primary`, `border-border`) and the section's `!important` white-heading rule bleeding onto the card's `text-primary` heading (white-on-white).
- **Enhance the mirror to carry everything.** Teach `mirror_el` spacing, alignment, buttons, max-widths, aspect… *Con:* re-implementing Tailwind piecemeal inside the mirror — high effort, perpetually behind, and still a decomposition.

## Decision

Keep a detected styled content card **verbatim inside `.sc-tw`**, and patch only the gaps the reproducer genuinely can't close:

- A tightly-gated `is_content_card()` (opaque fill + rounding ≥ 8px + border/shadow + contains a heading — so it never fires on an image tile or a plain wrapper) routes the card to a `code` block flagged **`verbatim`**; the mapper's code builder honours that flag and **skips the structural mirror**, emitting the faithful block.
- Before stripping `data-sc-cs`, **re-assert each heading's own computed colour inline as `color:… !important`** — a card heading's `text-primary` (no `!important`) otherwise loses to the section's `!important` white heading rule and renders white-on-white on the panel. (Subtlety that cost time: `saveHTML()` serialises `data-sc-cs` with **single** quotes when its value holds a double quote — a `font-family:"Neutraface …"` — so the injector had to match both quote styles, exactly like `strip_cs()` does.)

Result, verified against the source: white rounded panel, full-width bar image at the right height, red "JUKEBOX BURGERS", uppercase-tracked overlines, the red **pill** button, and the contact icon circles — all reproduced.

## Why

Fidelity beats editability for a card this dense: the user is converting to *reproduce* the source, and a faithful-but-locked card is far more valuable than an editable one that looks wrong. The reproducer already exists and already handles the food grid and reels, so verbatim is the *consistent* path, not a special case. The mirror stays the right tool for genuinely un-decomposable *layout* regions (its gating is unchanged) and its carries (box skin, text colour/transform, full-width image) still serve those — but a styled content card is a reproduction problem, and the reproducer is what solves it. Injecting only the heading colour keeps the patch surface minimal: we lean on `.sc-tw` for everything it can do and hand-fix only the one thing it structurally can't (a stylesheet `!important` war it can't win from a class).

*Status: Accepted.*
