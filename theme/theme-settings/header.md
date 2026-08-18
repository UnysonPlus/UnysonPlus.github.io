---
title: Header
sidebar_position: 4
slug: /theme-settings/header
description: The Unyson+ theme header - the Layout tab in full. The two-state model (Behavior/position + a composable At-top and On-scroll appearance) makes every header setup expressible, including transparent-over-hero that frosts and shrinks on scroll. Plus the Identity logo builder.
---

# Header

The **Header** tab builds the site header across several sub-tabs: **Identity**, **Layout**, **Menu**,
**Top Bar**, **Main Header**, and **Bottom Bar**. This page documents the **Layout** tab in full - it is
where the header's *chrome* (position, background, borders, shadow, glass) lives.

:::tip[Element reference]
For each element you place in a bar/column (logo, menu, CTA, text, search, social icons, spacer...), see
[Header & Footer Elements](/theme/header-footer-elements) - full detail, generated HTML, and examples.
:::

## Identity (logo) - in brief

**Header -> Identity** (`header_logo`) offers two logo builders via a **Logo Type** picker: a **Simple**
uploaded image (with retina/sticky/mobile/transparent variants, a width, and alt text - synced with
WordPress's Custom Logo), or a **Custom** text wordmark (**Site Title** + size/weight/color, an optional
**tagline**, and an optional **logo icon** with a frame and a layout arrangement). The **Favicon / Site
Icon** is always available. A dedicated Identity page follows later.

---

# Layout - the two-state model

A header only ever has **two visual states**: how it looks **at the top** of the page, and how it looks
**once you scroll** (when it "sticks"). The Layout tab models exactly those, plus an orthogonal
**position** control - so any setup is possible, including the tricky ones (transparent over the hero that
frosts *and* shrinks on scroll).

The panel reads: **Mode -> Design -> Structure -> Behavior (position + hide) -> Appearance: At top ->
Appearance: On scroll -> Row alignment -> Mobile.**

## 1. Mode & Design

The **Header Layout Mode** picker (`header_mode`) chooses the overall shape: **Top** (the standard bar),
**Vertical** (a fixed side rail), **Off-canvas only** (hamburger, no bar), or **Overlay** (a fullscreen
menu). In **Top** mode, **Header Design** gives the bar its structure: **Classic**, **Pill** (radius /
inset / shadow), **Card** (radius / shadow), or **Centered** (spacing).

## 2. Structure & dimensions

**Container** (Fixed / Full width) + **Container Width**, **Main Header Height** (`min_height`), **Mobile
Header Height**, and **Collapse to Mobile Menu At** (`mobile_breakpoint`, `lg` <992px / `md` <768px).

## 3. Behavior - position + motion

**Header Position** (`header_position`) is *just* how the header is positioned - shrink, hide, and a
different look on scroll are separate options, so they compose freely:

| Position | At the top | On scroll |
| --- | --- | --- |
| **Static** | In flow; scrolls away with the page. | - |
| **Sticky** | Pinned to the top. | Stays pinned (its look is set by the appearance sections below). |
| **Transparent overlay** | Sits **over** the first section (clear). | Pins to the top (its scrolled look is set below). |

Plus one motion toggle:

- **Hide on scroll down** (`header_hide_on_scroll`) - slides the header up out of view on scroll-down,
  reveals it on scroll-up. Works with Sticky or Overlay. (Respects reduced-motion; never hides while a
  menu is open or the header has keyboard focus.)

## 4. Appearance - At top

The resting look. These also apply *on scroll* unless you turn on **Change appearance on scroll** (next
section).

| Option | Effect |
| --- | --- |
| **Main Header Background** (`bg_color`) | The header fill -> `--header-bg`. **Empty = transparent.** Also tints Glass. |
| **Translucent / Glass** (`header_glass`) | A frosted, blurred background (`72%` of the background + `blur`). |
| **Header Border** | A hairline rule under the header. |
| **Header Shadow** | A soft drop shadow. |
| **Uppercase Navigation** | Uppercases the primary menu links. |

## 5. Appearance - On scroll

Turn on **Change appearance on scroll** (`header_scroll_change`) to give the header a **different** look
once it sticks. Leave it off and the scrolled header simply keeps the At-top look. Every field composes
independently:

| Option | Effect while stuck |
| --- | --- |
| **Scrolled Background** (`scroll_bg_color`) | The fill once stuck -> `--header-scroll-bg`. Empty = keep the At-top background. |
| **Glass on scroll** (`scroll_glass`) | Frost once stuck - e.g. a **clear header over the hero that frosts on scroll**. |
| **Border on scroll** / **Shadow on scroll** | Add the rule / drop shadow once stuck. |
| **Shrink logo on scroll** (`scroll_shrink`) + **Shrunk Logo Height** | Tighten the padding and shrink the logo once stuck. |

:::tip[This is what makes every setup possible]
Because position and the two appearance states are separate, combinations that used to be impossible now
just work: **transparent overlay + shrink on scroll**, **clear at top then frosted glass on scroll**,
**solid bar that shrinks**, and so on. Glass is no longer forced to be constant - it can be an at-top
look, an on-scroll look, or both.
:::

## How the two states combine

- **At top** = the Appearance -> At top options.
- **On scroll** = if **Change appearance on scroll** is **off**, the header keeps its At-top look; if
  **on**, the On-scroll options take over while stuck (and any On-scroll option you leave off falls back
  to a neutral default, not the At-top value).

**Common setups:**

| Goal | Position | At top | Change on scroll -> On scroll |
| --- | --- | --- | --- |
| Static solid bar | Static | a background color | off |
| Sticky bar, constant glass | Sticky | Glass on | off (inherits) |
| Clear over hero -> solid on scroll | Overlay | transparent | on -> Scrolled Background = a color |
| **Clear over hero -> frosted glass on scroll** | Overlay | transparent, Glass **off** | on -> **Glass on scroll** (+ a dark Scrolled Background for a dark frost) |
| **Transparent + shrink on scroll** | Overlay | transparent | on -> **Shrink on scroll** (+ optional bg/glass) |
| Solid bar that shrinks | Sticky | a background color | on -> Shrink on scroll |

:::info[Reproducing the OBSIDIAN-style header]
Overlay position, **At top:** transparent with Glass off; **On scroll:** Change-on-scroll on, Glass on
scroll on, Shrink on scroll on, Scrolled Background a dark colour. Result: clear over the hero, then a
dark frosted bar that shrinks as you scroll.
:::

## 6. Row alignment & Mobile

**Vertical Alignment** (`header_valign`) and **Element Gap** (`header_element_gap`) control how elements
sit within each row. **Mobile Menu Side**, **Scroll Spy** (`nav_scrollspy`, one-page highlight +
smooth-scroll), and **Hide Top / Bottom Bar on Mobile** round out the tab.

---

The remaining sub-tabs - **Menu**, **Top Bar**, **Main Header**, **Bottom Bar** - configure the rows and
navigation inside the chosen layout, and are documented separately.
