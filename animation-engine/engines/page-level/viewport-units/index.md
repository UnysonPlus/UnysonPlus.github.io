---
sidebar_position: 3
title: Viewport Units
slug: /viewport-units
description: Stable --vh and --vw CSS variables site-wide, for a full-height section that doesn't jump when a phone's address bar shows or hides.
---

# Viewport Units

On phones, `100vh` changes size as the browser's address bar slides in and out, so a "full-screen" hero jumps while you scroll. **Viewport Units** publishes two stable CSS variables on every page:

- `--vh`: one hundredth of the window's height, in pixels.
- `--vw`: one hundredth of the window's width, in pixels.

They update when the window is resized or the phone is turned, **never while scrolling**, so layouts built on them stay still.

## Where to find it

**Theme Settings → Site-wide UX → Viewport Units** → **Stable viewport units: Yes** (off by default). It is a site-wide utility, not a per-element effect.

## Options

| Option | Default | What it does |
| --- | --- | --- |
| **Stable viewport units** | No | Publish `--vh` and `--vw` on the page's root element, on the front end. |

## Using it

Use the variables in any Custom CSS instead of `vh` / `vw`. Keep the native unit as a fallback, so the CSS still works when the setting is off:

```css
/* A jump-free full-height hero on mobile */
.hero { min-height: calc(var(--vh, 1vh) * 100); }

/* Fluid side padding */
.band { padding-inline: calc(var(--vw, 1vw) * 4); }
```

## Limits

- It only publishes the variables; nothing changes on the page until your CSS uses them.
- The script is tiny, has no dependencies and loads site-wide only while the setting is on.
- The [Scrollytelling](/animation-engine/scrollytelling) Full-screen Stage sets its own `--vh` / `--vw` while it is pinned; this setting makes the same values available everywhere else.
