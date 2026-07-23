---
slug: builder-pages-hide-theme-title
title: "Should Page Builder pages show the theme's page title?"
authors: [jon]
tags: [page-builder, accessibility, architecture]
date: 2026-07-23
description: A global "Show Page Title on Builder Pages" toggle briefly shipped defaulting to yes, injecting an H1 title bar above every builder-built page. The default flipped to no — a builder page is a designed composition whose hero owns the H1 — matching the Elementor/Divi/Astra convention, while the toggle and the per-page Hide Page Title checkbox both survive.
---

**The question:** Builder pages started rendering the theme's page title as an H1 bar above the
built content (so "every page has exactly one H1"). Was that a good default — or should the
theme title simply be disabled whenever the Page Builder is used, leaving the per-page
"Hide the page title" checkbox to classic-editor pages only?

<!-- truncate -->

## Context

The theme renders a classic title header on ordinary pages, with a per-page **Hide the page
title** checkbox (Page Settings). A header/footer batch added a global default —
`pages_show_title_on_builder`, shipping as `yes` — that extended a title-only H1 header to
builder pages too, motivated by the heading-outline audit (every page should have exactly one
H1). The immediate effect: existing builder-built sites (the marketing home, the demos hub)
suddenly grew a duplicate title bar above their heroes.

## Options considered

- **Keep showing by default** — guarantees an H1 on builder pages whose authors forgot one, but
  breaks every existing designed page and duplicates the H1 on every page that *does* have a
  hero heading (the normal case).
- **Hard-disable on builder pages** — the Bricks/Oxygen philosophy: a built page owns its
  markup, the checkbox becomes classic-editor-only. Simplest, but removes the option for
  docs-style sites that genuinely want a uniform title bar above builder content.
- **Hide by default, keep the opt-ins** *(chosen)* — flip the global default to `no`; the
  site-wide toggle remains for uniform-title-bar sites, and the per-page checkbox still
  force-hides when the global is on.

## Decision

Builder pages hide the theme title **by default**. `pages_show_title_on_builder` defaults to
`no` (declaration and code fallback both), the global toggle stays available as a site-wide
opt-in, and the per-page **Hide the page title** checkbox keeps working everywhere — it is the
control that matters on classic-editor pages, and it still wins on builder pages when the
global is enabled.

## Why

Every major builder ecosystem treats the theme title as opt-out-by-design on built pages:
Elementor's Canvas/Full-Width templates and starter kits ship with the title hidden, Divi and
the Astra/GeneratePress/Kadence companion themes expose a per-page "Disable Title" that their
starter sites pre-check, and Bricks/Oxygen render no theme title at all. The common thread is
that a builder page is a designed composition whose hero supplies its own H1 — injecting the
theme title above it duplicates headings and defaces the design, which is exactly what happened
to the existing sites. The one-H1 accessibility goal is better enforced by the ship-gate
checklist (the hero must contain the H1) than by forcing a title bar onto every built page.
Flipping one default restored every existing site without editing a single page, and no
capability was lost: both the global and per-page controls survive.
