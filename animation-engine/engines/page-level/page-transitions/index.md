---
sidebar_position: 8
title: Page Transitions
slug: /page-transitions
---

# Page Transitions

:::tip[Try it live]
Preview all 23 transitions in the **[Page Transitions playground](./playground.mdx)** — pick a
style, set its options, and watch it reveal on load and cover on navigate.
:::

Full-screen transitions between pages — a colored overlay reveals each page on load and covers the screen when the visitor navigates, so pages feel **connected** instead of a hard flash.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/page-transitions/)** — an interactive showcase you can explore.

## Where to find it

It's **site-wide**: **Theme Settings → Site-wide UX → Page Transitions**. Turn on **Enable page transitions** (off by default) and pick a **Transition**. Front-end only — nothing runs in the admin.

## Transitions

**23 styles**, in the same four tabs as the picker:

- **Wipe & Slide:** Wipe · Slide · Diagonal · Curtain · Doors · Split · Bars · Blinds · Stripes
- **Shape & Iris:** Circle Reveal · Iris · Shape Reveal · Conic Wipe · Morph Blob
- **Fade & Zoom:** Fade · Content Fade-Up · Zoom
- **3D & FX:** Flip 3D · Rotate · Glitch · Pixel Dissolve · Checkerboard · Ripple (from the click)

Some styles reveal extra controls:

| Style | Extra controls |
| --- | --- |
| **Slide**, **Wipe** | Direction |
| **Diagonal** | Direction: Top-left → Bottom-right, or Top-right → Bottom-left |
| **Curtain**, **Split** | Split: vertical or horizontal |
| **Circle Reveal** | Origin: Center or a corner |
| **Shape Reveal** | Shape: Circle, Square or Diamond |
| **Flip 3D** | Axis: Vertical (Y) or Horizontal (X) |
| **Blinds** | Orientation, and **Strips** (3–10, default 6) |
| **Checkerboard** | **Columns** (8–20, default 12) |
| **Pixel Dissolve** | **Columns** (8–20, default 14) |

## Global options

| Option | Notes |
| --- | --- |
| **Overlay color** | The color of the covering overlay *(default dark navy)* |
| **Duration** | 0.2–1.5s *(default 0.6)* — grid styles add internal stagger so they run a touch longer |
| **First-visit loader** | Show a loader on the visitor's first page of the session *(default off)* |
| **Loader style** | Spinner · Bar · Dots |

## How it behaves

- On **load**, the page appears behind the overlay, which animates away — this starts from the first paint via pure CSS, even before JS loads.
- On **navigation** to an internal link, the overlay plays in reverse (covering the screen), then the browser navigates.
- Optionally, a **loader** shows once per session on the first page, until it finishes (with an 8-second cap).

## Performance & accessibility

- **Loads only when enabled**; nothing is output otherwise (front-end only).
- **Reduced motion:** navigation is plain and instant.
- **Link-safe:** the cover animation is skipped for new-tab / download / hash / `mailto:` / external / modified-click links, and any link marked `data-no-transition`. A fallback timeout always completes navigation, and a restored (back/forward) page is never left covered.
