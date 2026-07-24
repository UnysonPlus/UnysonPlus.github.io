---
title: Bleed Section
sidebar_position: 60
---

# Bleed Section

A split section with content on one side and a full-bleed image on the other, extending to the viewport edge and stacking on mobile. Its options live across the **Layout**, **Styling**, **Animations**, and **Advanced** tabs.

## Layout

- **Bleed Image** — the image that fills one half and bleeds to the viewport edge. Use a high-resolution image; it's cropped to fill (cover), so edge detail may be trimmed depending on the ratio. Picked from the Media Library it's served responsively (`srcset`).
- **Image Alt Text** — describe the image for screen readers / SEO. Blank uses the alt saved on the media item; leave empty only for a decorative image.
- **Image Side** — which side the image appears on (desktop): *Right* (default) or *Left*.
- **Image / Content Ratio** — how much width the image takes vs. the content; each pair sums to 12 columns. Choices run from *1/12 Image + 11/12 Content* through *5/12 Image + 7/12 Content* (default) to *11/12 Image + 1/12 Content*.
- **Image Position** — which part of the image stays visible when cropped: *Center* (default), *Top*, *Bottom*, *Left*, *Right*, or any corner (*Left Top*, *Right Top*, *Left Bottom*, *Right Bottom*).
- **Lazy-load Image** — switch. Off (default) loads the image immediately — best when the section is near the top of the page (better LCP); on for a section further down.
- **Mobile Stacking Order** — which half appears first when the section stacks on mobile: *Content First* (default) or *Image First*.
- **Minimum Height** — force a minimum section height so the split reads as a hero even with short content: *Auto (fit content)* (default), *Small (40vh)*, *Medium (60vh)*, *Large (80vh)*, or *Fullscreen (100vh)*. Pairs with Content Vertical Align.
- **Full Width Content** — switch. On, the content side uses the full-width container; off, the standard site container width. The image always bleeds to the viewport edge.

## Styling

- **Content Background** — a `background-pro` control (color, gradient and/or image) for the content side. It bleeds to the viewport edge behind the content; the image side is the Bleed Image on the Layout tab.
- **Image Overlay** & **Overlay Opacity** — a color tint/scrim laid over the bleed image (0–100). Use it to darken the image or wash it toward a brand color; only applied when an overlay color is set.
- **Content Vertical Align** — vertical alignment of the content within the section: *Top*, *Center* (default), or *Bottom*.
- **Content Padding** — vertical padding above and below the content: *None*, *Small* (2rem), *Medium* (3rem, default), or *Large* (5rem).

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
