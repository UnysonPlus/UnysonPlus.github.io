---
title: Performance
sidebar_position: 11
---

# Performance

Speed isn't a plugin you bolt on afterward in Unyson+, it's how the framework renders by default.
This page collects the mechanisms that keep pages light, with links to where each is documented in
depth. Most of it is automatic; the rest is one toggle.

## Clean, un-bloated markup

The Page Builder emits **lean, semantic HTML**, just the section → container → row → column grid plus
your content, with no extra per-element wrapper `<div>`s and **no inline styles** scattered through
the markup. Less DOM means less for the browser to parse, style, and lay out.

See [The clean-DOM philosophy](/docs/page-builder/clean-dom).

## One generated stylesheet, not inline soup

All of your design, colors, typography, header/footer, custom CSS, is compiled into a **single
generated stylesheet** rather than a pile of inline `<style>` blocks. It's rebuilt only when its
content hash changes (so there's no per-request compute cost), and served from the uploads directory
with a `filemtime()` cache-buster.

Per-element custom CSS and per-page styling are written to a **hashed, per-page stylesheet**, so
view-source collapses to one global file plus one per-page file, both cacheable.

See [How settings become CSS](/theme/settings-to-css).

## Assets load only when they're used

Element CSS/JS is **conditionally enqueued**, an element's stylesheet and script load only on pages
where that element actually appears. A couple of consequences worth calling out:

- **Animation CSS (Animate.css) loads only when an element animates.** If a page uses no animations,
  it ships zero animation CSS, so the Animations tab is effectively free when ignored.
- **Minified assets in production.** When `SCRIPT_DEBUG` is off, the framework serves pre-built
  `.min.css` / `.min.js` siblings (and falls back to the readable source if a build is absent, so a
  missing `.min` never 404s).

## Responsive, CLS-friendly images

Images rendered through the framework's shared image helper (`fw_image_tag()`, used by the Media
Image element and others) ship with:

- a responsive `srcset` / `sizes` (plus a 1x/2x density `srcset` for exact crops),
- explicit `width` / `height` attributes to prevent layout shift (good CLS),
- `fetchpriority="high"` + eager loading for above-the-fold images, and lazy + async decoding
  otherwise,

with a graceful fallback when image resizing (GD/Imagick) isn't available.

## Combine what's left: Asset Optimizer

After the above, a page already has few stylesheets and scripts. The optional **Asset Optimizer**
folds the remaining CSS and JS into one combined, cached file each, cutting HTTP requests further. It
keeps the cascade correct (theme styles last) and only merges scripts that are safe to combine.

See [Asset Optimizer](/docs/extensions/asset-optimizer).

## A quick checklist

| Lever | Where |
| --- | --- |
| Clean markup (automatic) | [Clean-DOM philosophy](/docs/page-builder/clean-dom) |
| One generated stylesheet (automatic) | [Settings → CSS](/theme/settings-to-css) |
| Conditional element assets (automatic) | this page |
| Minified production assets (`SCRIPT_DEBUG` off) | this page |
| Responsive / CLS-safe images (automatic in the image elements) | this page |
| Combine remaining CSS/JS (one toggle) | [Asset Optimizer](/docs/extensions/asset-optimizer) |
| Cache hosts can hide the asset scan | [Troubleshooting](/docs/troubleshooting#asset-optimizer-lists-no-cssjs-to-combine) |

:::tip Disabling styling for a "bring your own CSS" build
For a structure-only build (you supply all the CSS via each element's Advanced → CSS Class), the
**Styling Presets** master switch (Page Builder settings) turns off the whole preset/styling layer at
once, shipping a bare, unstyled DOM. Meant for non-Unyson themes that bring their own CSS.
:::
