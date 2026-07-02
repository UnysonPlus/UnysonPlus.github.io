---
sidebar_position: 8
title: Page Transitions
---

# Page Transitions

Full-screen transitions between pages — a colored overlay reveals each page on load and covers the screen when the visitor navigates, so pages feel **connected** instead of a hard flash.

## Where to find it

It's **site-wide**: **Theme Settings → Animations → Page Transitions**. Turn on **Enable page transitions** (off by default) and pick a **Transition**. Front-end only — nothing runs in the admin.

## Transitions

**23 styles.** A sampler:

- **Classic:** Fade · Slide · Zoom · Rotate · Flip 3D
- **Reveals:** Curtain · Doors · Split · Wipe · Diagonal · Circle Reveal · Shape Reveal · Iris · Conic Wipe
- **Grids & dissolves:** Bars · Stripes · Blinds · Checkerboard · Pixel Dissolve
- **Expressive:** Glitch · Ripple (from the click) · Morph Blob · Content Fade-Up

Some styles reveal extra controls — e.g. **Slide/Wipe** → direction, **Curtain/Split** → orientation, **Circle Reveal** → origin, **Flip 3D** → axis, **Blinds/Checkerboard/Pixel Dissolve** → strip/column count.

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
