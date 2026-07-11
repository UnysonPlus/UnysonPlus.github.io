---
sidebar_position: 8
title: Smooth Scroll
---

# Smooth Scroll

Buttery inertia scrolling via [Lenis](https://lenis.darkroom.engineering/). When a page also uses Scroll Motion, Smooth Scroll is bridged into GSAP's ticker and ScrollTrigger, so pinned and scrubbed effects stay perfectly in sync. Same-page anchor links scroll smoothly too.

## Where to control it

Smooth Scroll is set at two levels:

| Level | Where | Choices |
| --- | --- | --- |
| **Per page** | The **Smooth Scroll** box in the Page/Post editor | Use site default · On · Off |
| **Site-wide** | **Smooth Scroll site-wide** switch on the Shortcodes extension **Settings** page | On · Off |

A page set to **On** / **Off** overrides the global; otherwise it inherits the site-wide default.

## Set it up

- **One page:** edit the page → **Smooth Scroll** box → **On** → Update.
- **Whole site:** go to **Unyson+ → Extensions → Shortcodes → Settings** → turn **Smooth Scroll site-wide** on. Individual pages can still override it.

:::note
Like the GSAP effects, Lenis is **loaded only where it resolves to on**, and it respects `prefers-reduced-motion`.
:::
