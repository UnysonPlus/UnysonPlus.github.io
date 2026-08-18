---
title: Header
sidebar_position: 4
slug: /theme-settings/header
description: The Unyson+ theme header — the Layout tab in full (modes, designs, dimensions, scroll behavior, and exactly how the Header Background / Behavior / Glass / Border / Shadow options combine at rest and on scroll), plus the Identity logo builder.
---

# Header

The **Header** tab builds the site header across several sub-tabs: **Identity**, **Layout**, **Menu**,
**Top Bar**, **Main Header**, and **Bottom Bar**. This page documents the **Layout** tab in full — it is
where the header's *chrome* (background, behavior, borders, shadow, glass) lives, and where the option
combinations are easiest to misread.

:::tip[Element reference]
For each element you place in a bar/column (logo, menu, CTA, text, search, social icons, spacer…), see
[Header & Footer Elements](/theme/header-footer-elements) — full detail, generated HTML, and examples.
:::

## Identity (logo) — in brief

**Header → Identity** (`header_logo`) offers two logo builders via a **Logo Type** picker: a **Simple**
uploaded image (with retina/sticky/mobile/transparent variants, a width, and alt text — synced with
WordPress's Custom Logo), or a **Custom** text wordmark (**Site Title** + size/weight/color, an optional
**tagline**, and an optional **logo icon** with a frame and a layout arrangement). The **Favicon / Site
Icon** is always available and syncs with WordPress's Site Icon. A dedicated Identity page follows later.

---

# Layout

**Header → Layout** (`header_layout`) is a single grouped panel. It reads top-to-bottom as: **Mode →
Design → Structure & dimensions → Scroll behavior → Appearance/chrome → Row alignment → Mobile.**

## 1. Header Layout Mode

The **Header Layout Mode** picker (`header_mode`) chooses the whole shape of the header:

| Mode | What it is |
| --- | --- |
| **Top** | The standard horizontal bar (the common case). Reveals **Header Design** below. |
| **Vertical** | A fixed side rail — choose **Rail Side** (left/right) and **Vertical Header Width**. |
| **Off-canvas only** | A hamburger that opens a slide-in panel, with *no* persistent bar. |
| **Overlay** | A fullscreen overlay menu — choose an **Overlay Style** (panel / radial / concentric), color mode, opacity, and backdrop. |

Every mode also shares the **Off-Canvas** drawer settings (its content list + open/close trigger icons)
for the mobile/hamburger panel.

### Header Design (Top mode)

In **Top** mode, **Header Design** gives the bar its structural treatment. Each choice reveals its own
sub-controls:

| Design | Sub-controls |
| --- | --- |
| **Classic** | A full-width bar (no extra controls). |
| **Pill** | A rounded floating bar — **Roundness**, **Side Inset**, **Shadow**. |
| **Card** | A floating elevated card — **Corner Radius**, **Shadow**. |
| **Centered** | Logo centered above the menu — **Spacing**. |

## 2. Structure & dimensions

| Option | Effect |
| --- | --- |
| **Container** | `Fixed Width` caps the header content to the site container; `Full Width` runs edge-to-edge. |
| **Container Width** | The fixed content width (when Container = Fixed Width). |
| **Main Header Height** (`min_height`) | Minimum height of the main row (default `5rem`). |
| **Mobile Header Height** | Main-row height below 768px. |
| **Collapse to Mobile Menu At** (`mobile_breakpoint`) | Where the inline menu becomes a hamburger — `lg` (&lt;992px) or `md` (&lt;768px). |

## 3. Scroll behavior

**Header Behavior** (`header_behavior`) sets what the header does as the page scrolls. This is the option
that most affects the **background**, because most behaviors add a **stuck** state once the header reaches
the top edge (the theme toggles an `.is-stuck` class):

| Behavior | At rest (top of page) | On scroll |
| --- | --- | --- |
| **Static** | In flow; scrolls away with the page. | — (no stuck state) |
| **Sticky** | Pinned; shows **Main Header Background**. | Repaints to the **sticky fill** (near-opaque header color) + a soft shadow. |
| **Sticky + Shrink** | Same as Sticky. | Same repaint, **plus** the padding tightens and the logo shrinks to **Shrunk Logo Height**. |
| **Sticky, hide/reveal** | Pinned. | Slides **up out of view** on scroll-down, reveals on scroll-up (respects reduced-motion; never hides while focused/open). |
| **Transparent over the first section** | **Transparent** — overlays the hero, no fill. | Becomes **stuck & solid** (see the background table below). |

## 4. Appearance / chrome

These compose **on top of** any mode/design/behavior. They are the crux of the "why does my header look
like that" confusion, so read them together with the [background matrix](#how-the-header-background-actually-behaves) below.

| Toggle | Effect |
| --- | --- |
| **Main Header Background** (`bg_color`) | The header fill → the `--header-bg` variable. **Leave empty for a transparent header** (the page shows behind). A set color fills it — and also **tints the glass** and drives the stuck/scrolled repaint. |
| **Header Border** | A hairline rule under the header (an inset shadow — no layout shift). Slightly stronger when stuck. |
| **Header Shadow** | A soft drop shadow lifting the header off the page. Slightly stronger when stuck. |
| **Translucent / Glass** (`header_glass`) | A frosted, semi-transparent background: `72%` of **Main Header Background** + a `blur(10px)`. **See the important note below.** |
| **Uppercase Navigation** | Uppercases the primary menu links with a touch of letter-spacing. |

:::warning[Glass is ALWAYS on — it does not wait for scroll]
**Translucent / Glass is a *constant* look.** When it's on, the header is frosted **from first page load
AND on scroll — identically.** It intentionally overrides the transparent-at-top state, so a
**Transparent-over-first-section header with Glass is *frosted* over the hero, not fully clear.** There is
currently **no "transparent at top, glass only on scroll"** mode. The frost **tint** comes from **Main
Header Background** — set it dark for a dark frost, light for a light frost. If you want the header fully
clear over the hero and only frosting on scroll, use **Transparent over the first section *without* Glass**
and set **Main Header Background** to your scrolled color (see below).
:::

## How the header background actually behaves

The header has **two visual states** and the background is decided by **Main Header Background +
Behavior + Glass** together. Think of it as: *the base fill*, *what the stuck state repaints to*, and
*whether Glass overrides both with a constant frost*.

**The base fill** is **Main Header Background** (`--header-bg`): empty = transparent, a color = solid.

**Common combinations (Top mode):**

| Main Header Background | Behavior | Glass | At top | On scroll |
| --- | --- | --- | --- | --- |
| *(empty)* | Static | off | Transparent | — |
| A color | Sticky | off | That solid color | Near-opaque header color + shadow |
| *(empty)* | Transparent-overlay | off | **Fully transparent** over hero | **Solid** (repaints to the sticky fill — set a color to control it) |
| A **dark** color | Transparent-overlay | off | Transparent over hero | **Solid dark** bar (matches a dark site) |
| A color | *any sticky/overlay* | **on** | **Frosted** (72% color + blur) | **Frosted** — *the same*, no repaint |
| A **dark** color | Transparent-overlay | **on** | **Dark frosted** (not clear) | **Dark frosted** — the same |

**Reading the table:**

- **Transparent-overlay + no Glass** is the "clear over the hero, solid on scroll" pattern. Its scrolled
  bar color follows **Main Header Background** (leave it empty and it repaints to a near-white default;
  set it dark for a dark scrolled bar).
- **Glass (any behavior)** makes the header a **constant frost** — it looks the same at the top and on
  scroll, and it is *never* fully transparent, so it does **not** produce the "clear hero → frost on
  scroll" effect on its own.
- **Border/Shadow** layer on top of any of the above and only intensify slightly when stuck.

:::info[Reproducing a "clear → frosted on scroll" header (e.g. a glassy dark hero header)]
Today the closest native combination is **Transparent over the first section + Glass + a dark Main Header
Background** — the header reads dark-frosted over the hero and stays dark-frosted on scroll. A *true*
"fully clear at top, frost only after scrolling" behavior is a planned enhancement (a scroll-triggered
glass), not a current option.
:::

## 5. Row alignment & spacing

| Option | Effect |
| --- | --- |
| **Vertical Alignment** (`header_valign`) | Aligns elements within each row — top / center / bottom. |
| **Element Gap** (`header_element_gap`) | Space between elements in a column. |

## 6. Mobile

| Option | Effect |
| --- | --- |
| **Mobile Menu Side** | Which side the drawer slides in from (left / right). |
| **Scroll Spy** (`nav_scrollspy`) | One-page nav: highlights the active section + smooth-scrolls to anchors. |
| **Hide Top Bar on Mobile** / **Hide Bottom Bar on Mobile** | Hide those rows below 768px. |

---

The remaining sub-tabs — **Menu**, **Top Bar**, **Main Header**, **Bottom Bar** — configure the rows and
navigation inside the chosen layout, and are documented separately.
