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

## Shared elements between pages

A **shared element** flows from its place on one page into its place on the next, while the rest of the page
cross-fades: a product photo grows into the product page, a card's title slides up into the post's heading, a logo
stays put while everything around it changes. It uses the browser's **View Transitions**, so it is smooth and costs
almost nothing.

**→ [See it on the Interactions demo page](https://demos.unysonplus.com/animation-engine/interactions/)** (scroll to
*Shared elements*): the square flows into the small one on the Exit Animations page, and back with the browser's
Back button.

### By name: the Shared Element card

On the element, **Animations → Add Animation → Shared Element**, and give it a **Name** (letters, numbers and dashes:
`product-photo`, `site-logo`). Give **the same name** to the element it should flow to, on the other page. That is
all: a page with a Shared Element card opts in to page transitions by itself, and two pages with the same name
connect.

- `{post}` in the name becomes the post's ID, for post templates (`post-{post}-photo`).
- Each name must be used **once per page**; if it appears twice, the second is ignored (two elements with one name
  would cancel the whole transition).

### Automatically: featured images and titles

**Theme Settings → Animations → Page Transitions → Featured images and titles flow into their post.** From a list
of posts (the blog, an archive, a grid of cards), the clicked card's picture and title move into the post's
featured image and title as the page changes, and back again when the visitor returns to the list. No names to set.

| Option | Default | What it does |
| --- | --- | --- |
| **Featured images and titles flow into their post** | Off | The automatic list ↔ post transition. Independent of *Enable page transitions*. |
| **Shared elements: duration** | 0.45 s | How long the move takes (0.2–1.5 s). |
| **Shared elements: easing** | Soft land | The speed curve, from the shared curve picker. |

### Good to know

- **Browsers:** Chrome and Edge (126+) and Safari (18.2+). Other browsers change page as before, so nothing breaks.
- **With the overlay transitions on:** in browsers that have View Transitions, the cover overlay steps aside on pages
  that use shared elements (it would hide them); in the others it plays as usual.
- **Reduce motion:** visitors who ask for less motion change page without the transition.
- While a page arrives through a transition, `<html>` carries the class `upw-vt-active`, for CSS that should wait.
- A card's picture and title are found from the clicked link: the nearest `article` or list item around it, then its
  first image and first heading.

## Performance & accessibility

- **Loads only when enabled**; nothing is output otherwise (front-end only).
- **Reduced motion:** navigation is plain and instant.
- **Link-safe:** the cover animation is skipped for new-tab / download / hash / `mailto:` / external / modified-click links, and any link marked `data-no-transition`. A fallback timeout always completes navigation, and a restored (back/forward) page is never left covered.
