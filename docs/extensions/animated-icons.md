---
sidebar_position: 13
title: "Free WordPress Animated Icons — Lottie, Rive & Animated SVG"
sidebar_label: "Animated Icons"
description: "Free animated icons for WordPress — add Lottie, Rive, animated SVG and GIF/APNG/WebP icons to any icon option, with a lean runtime loaded only where you use them."
---

# Animated Icons

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">Icons that move, anywhere an icon goes.</p>
  <p class="ext-hero__sub">Adds an <b>Animated</b> tab to the icon picker, so any icon option can use a Lottie, Rive, animated SVG or animated raster icon — alongside the usual font glyphs, SVGs, emoji and images.</p>
</div>

Every icon control in Unyson+ — on buttons, icon boxes, list items, menus, headings — gains an
extra **Animated** tab. Pick an animated icon there and it renders on the front end with the right
runtime, loaded **only** on the sites and pages that actually use one.

Animated Icons ships **inactive**. Activate it from **Unyson+ → Extensions** on the sites that need
animated icons, and every other site keeps a lean icon picker with no animation runtime loaded at
all.

## The four technologies

Each kind is toggled **per-site** under **Theme Settings → Icons → Animated**, so you load only the
runtimes you use:

| Technology | File | Notes |
| --- | --- | --- |
| **Lottie** | `.json` | Vector animations exported from After Effects (Bodymovin). Small, crisp at any size. |
| **Rive** | `.riv` | Interactive, state-driven animations. **Off by default** — it loads a heavier WASM runtime, so enable it only when you need it. |
| **Animated SVG** | `.svg` (SMIL) | Self-contained animated SVGs, no extra runtime. |
| **Animated raster** | `.gif` / `.apng` / `.webp` | Animated bitmap formats, for when you already have one. |

:::tip[💡 Web dev tip: load the runtime only where it's used]
An animation runtime you never call is wasted bytes on every page. Animated Icons keeps each
runtime behind a per-site toggle and only enqueues it when a page actually renders an icon of that
kind — the same discipline as code-splitting a bundle so visitors download only what the page needs.
:::

## Use an animated icon

1. Activate **Animated Icons** from **Unyson+ → Extensions**.
2. Enable the technologies you want under **Theme Settings → Icons → Animated** (Lottie, animated
   SVG and animated raster are on by default; Rive is opt-in).
3. Open any element with an icon option, switch to the **Animated** tab, and upload or pick your
   animated icon.

Uploaded animated icons are stored under the shared uploads folder (`uploads/unysonplus/lottie`,
`uploads/unysonplus/rive`), so they stay organized with everything else Unyson+ manages.

## Turning it off later

Icons that are **already using** an animation keep rendering on the front end even if the extension
is later deactivated — so disabling it to slim down a site never leaves a broken icon behind.
