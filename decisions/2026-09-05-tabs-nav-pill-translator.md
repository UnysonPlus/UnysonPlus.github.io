---
slug: tabs-nav-pill-translator
title: "Why the tabs nav converts via a scoped-CSS pill translator, not new native options"
authors: [jon]
tags: [conversion, shortcodes]
date: 2026-09-05
description: "A source menu used a centered brand-pill toggle for its tabs — a muted rounded-full track with a 2px primary border and a primary-filled active pill (jukeboxburgers.com). The converter already picked the segmented design but rendered its generic white pill, left-aligned. The question was how to reach exact fidelity: add native tabs options for the pill (fill, border, shape), or read the captured styling and emit scoped CSS. The decision is a deterministic segmented-pill TRANSLATOR — the alignment rides the tabs' existing Tab Alignment option, and the pill skin is reproduced from the captured data-sc-cs as hex, !important, scoped custom_css."
---

**The question:** A source tabs nav is a **centered brand-pill toggle** — `flex justify-center` around an `inline-flex bg-muted rounded-full p-1.5 border-2 border-primary` track whose active button is `rounded-full bg-primary text-primary-foreground shadow-md`, buttons `uppercase tracking-wide`. The converter already classified it as `design = segmented`, but rendered the built-in segmented look: a left-aligned, light-gray, `10px`-radius pill with a **white** active tab. To make it match exactly, do we **add native tabs options** for the pill (active fill, container border, pill shape), or **read the source's captured styling and emit scoped CSS**?

<!-- truncate -->

## Context

Two gaps separated the converted nav from the source:

1. **Alignment.** The source centers the nav (`justify-center`); the converted nav was `justify-content-start`. This one is not a missing feature — the tabs shortcode **already** has a `Tab Alignment` option (start / center / end, default start). The converter simply never set it.
2. **Pill skin.** The built-in `segmented` CSS is a generic iOS-style toggle: `background: rgba(0,0,0,.06)`, `border: 0`, `border-radius: 10px`, active `background: #fff`. The source is `bg-muted` + `rounded-full` + `border-2 border-primary`, active `bg-primary` white uppercase. There is **no native option** for active-fill colour, container border, or pill radius.

Crucially, the capture normalizes a source tab component to generic `sc-tabs` markup **but stamps the computed nav styling as `data-sc-cs`** on the tablist and each button — so the exact tokens survive even though the Tailwind classes don't: track `background-color:rgb(245,245,245); border-radius:9999px; border-top-width:2px; border-top-color:rgb(226,60,68)`, active `background-color:rgb(226,60,68); color:rgb(255,255,255); border-radius:9999px; text-transform:uppercase`.

## Options considered

- **Native pill options.** Add real tabs controls — `segmented_shape` (rounded/full), `segmented_active_fill` (surface/accent), `segmented_border` (colour) — and have the converter set them. *Pro:* fully editable via controls, reusable as UI. *Con:* meaningful surface area added to the tabs shortcode for a niche look; still wouldn't cover every per-site variation (exact padding, tracking) without yet more options; more code across options + view + converter.
- **Scoped-CSS translator.** The converter reads the captured `data-sc-cs` tokens and emits a small scoped `custom_css` block that repaints `.nav` / `.nav-link` / `.nav-link.active`. *Pro:* pixel-exact from the source's own values, reusable for ANY site's pill toggle (the Tailwind/shadcn "segmented control" is a very common motif), no shortcode UI churn, editable in the tabs Advanced → Custom CSS. *Con:* the look lives as generated CSS rather than option controls.
- **Center only.** Just set `alignment = center` and keep the default white pill. *Con:* the pill colour/border/radius still wouldn't match — the user explicitly wants an exact match.

## Decision

A deterministic **segmented-pill translator**, split cleanly between the two things it maps:

- **Alignment → the existing native option.** `detect_tabs_design()` reads the nav wrapper's `justify-center` / `justify-end` (or a `mx-auto` tablist parent) and sets `alignment`; the mapper passes it to the tabs' own Tab Alignment option. No shortcode change — the option was always there.
- **Pill skin → captured tokens → scoped CSS.** `detect_tabs_design()` stashes the track/active/typography tokens from `data-sc-cs` under `design.pill`, and `tabs_pill_css()` assembles a scoped block onto the tabs node:

  ```
  selector .nav{background:#f5f5f5;border:2px solid #e23c44;border-radius:9999px !important}
  selector .nav .nav-link{border-radius:9999px;text-transform:uppercase;opacity:1 !important}
  selector .nav .nav-link.active{background:#e23c44 !important;color:#ffffff !important;border-radius:9999px !important}
  ```

Two constraints made this work and are worth remembering: the token capture had to move **before** the `tab_style` classification's early `return`s (a confidently-styled track returns immediately, so end-of-function code never ran); colours must be **hex** (`rgb_to_hex()`) because a comma-bearing `rgb()`/`hsl()` **silently voids** the `selector{…}` custom_css pipeline; and the overrides carry **`!important`** to beat the design stylesheet's equal-specificity defaults.

Result, verified against the source: a centered muted pill track with a 2px primary border and full radius, "MAIN MENU" as a primary-filled white uppercase active pill, "DESSERT MENU" quiet and undimmed.

## Why

The pill toggle is a *reproduction* problem, and the source already carries the answer in its captured computed styles — reading them is exact and needs no guesswork, whereas native options would approximate a fixed set of knobs and still miss the long tail (padding, tracking, exact radius). It is also the *reusable* path: every Tailwind/shadcn segmented control stamps the same `data-sc-cs` shape, so one translator serves all of them, where per-look native options would each need their own converter mapping anyway. Alignment is the opposite case — it is a genuine, editable layout choice that already exists as a control, so it belongs in the option, not in generated CSS. Keeping the two on their natural rails (a native option for placement, generated CSS for the branded skin) is the same division the converter already uses elsewhere: native where the builder has a real control, scoped `.sc-tw`/custom_css where fidelity needs the source's own values. Promoting the two most common pill knobs (active-fill = accent, pill shape) to native options later stays open if the motif recurs enough to earn the UI.
