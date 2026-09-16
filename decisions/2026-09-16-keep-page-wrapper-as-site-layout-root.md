---
slug: keep-page-wrapper-as-site-layout-root
title: "Why the #page wrapper stays instead of moving its role onto <body>"
authors: [jon]
tags: [architecture, performance, accessibility]
date: 2026-09-16
description: "A pass at trimming the theme's body-to-section wrapper chain raised the tempting idea of dropping the #page.site div and putting its flex/box/grid layout straight on <body>. The decision: keep #page. It's the one layout root the theme fully controls, and it is load-bearing for three separate systems — the Boxed/Framed site-width boxing, the Vertical header grid, and the sticky-footer flex column — none of which can safely live on <body>, because <body> is a shared namespace that plugins and wp_body_open() inject uncontrolled direct children into. The wrapper divs worth trimming are the deeper, single-owner ones instead."
---

**The question:** Walking the DOM from `<body>` down to the first page-builder `<section>` shows a stack of wrappers — `#page.site` → `#content.site-content` → `main#main.site-main` → `article.fw-col-12` → `.entry-content` → the plugin's `.fw-page-builder-content` → `section`. For a full-width, all-builder page that's a lot of nesting. The obvious first cut is the outermost one: drop `#page` and move its `.site` layout (the flex column, `min-height:100vh`) onto `<body>` itself. Should we?

<!-- truncate -->

## Context

`#page.site` looks like a plain site wrapper, but it is the anchor element for **three** distinct layout systems, each keyed on the `.site` class:

- **Sticky-footer flex** — `.site { display:flex; flex-direction:column; min-height:100vh }`, with `.site-content { flex:1 0 auto }` growing to push the footer down.
- **Boxed / Framed site widths** — these are a two-layer design: the **outer** element (`body`) paints the site background / frame colour / margin gap, and the **inner** element (`#page`) is the constrained box that Boxed centres (`max-width` + `margin:auto` + shadow) and Framed insets. Two separate elements are required — one full-viewport surface, one box inside it.
- **Vertical header mode** — the side-rail layout makes `.site` a **CSS grid** with named areas (`"header content" / "header footer"`), placing its direct children `#masthead`, `#content`, `#colophon` into the rail / content / footer cells.

The catch with moving any of that onto `<body>` is that `<body>` is not a container the theme owns. It is a shared namespace: WordPress core injects `#wpadminbar`; `wp_body_open()` is where cookie-consent banners, tag-manager `<noscript>`, chat widgets, A/B snippets and page-transition overlays inject nodes; plugins and child themes add their own. All of these are **direct children of `<body>`**.

## Options considered

- **Move `.site` onto `<body>`, delete `#page`.** *Pro:* removes one wrapper on every page. *Con:* whichever element carries `.site` *becomes* the flex/grid/box container, so `<body>`'s uncontrolled foreign children become its flex/grid items. In the flex modes that risks stray gaps and mis-ordered content above the header; in Vertical mode — a grid with named areas — unnamed foreign nodes auto-place into the implicit grid and break the rail. Boxed/Framed also lose their outer surface (it would have to be relocated onto `<html>`). One saved div, bought with a permanent dependency on what every plugin injects into `<body>`.
- **Keep `#page`; trim the deeper, single-owner wrappers instead.** Merge `.entry-content` into the plugin's builder wrapper and drop the pointless `fw-col-12` grid class on the `<article>` (both builder-page-gated), optionally relabel `#content` onto `<main>`. *Pro:* every one of those is inside `#page`, below the width/header-mode layer, so nothing about Boxed/Framed/Vertical is touched; the hooks survive by moving the id/class onto a surviving element rather than deleting it. *Con:* saves fewer divs than nuking the outermost one.
- **Leave the whole chain as-is.** *Pro:* zero risk. *Con:* keeps genuinely redundant deep wrappers on the most common page type.

## Decision

**Keep `#page.site`.** It is the single wrapper the theme fully controls, and it is load-bearing for the sticky-footer flex, the Boxed/Framed boxing, and the Vertical header grid — three systems that each need a theme-owned element distinct from `<body>`. The DOM trimming happens on the deeper wrappers instead, by relabelling rather than deleting: fold `.entry-content` onto the builder wrapper and drop `article.fw-col-12` on builder pages (with `#content`→`<main>` as an optional further merge). Boxed/Framed can grow extra inner containers later if a design needs them; that is cheap precisely *because* `#page` is still there to hang them on.

## Why

A wrapper div costs nothing at render or paint — the reason to remove one is a cleaner tree, not speed. So the trade is purely risk versus tidiness, and moving layout onto `<body>` loses that trade badly: it swaps one empty div for a standing bet that no plugin will ever inject an in-flow node at `wp_body_open()`, and it breaks the Vertical grid the moment one does. `#page` exists so the theme has a layout root insulated from that shared `<body>` namespace — that is the whole point of the wrapper, not incidental bloat. The wrappers that *are* safe to collapse are the ones with a single owner and no cross-cutting role (the article's grid class, the prose `.entry-content`), and those get merged by moving their identity onto an element that stays, so every CSS/JS hook keeps working.
