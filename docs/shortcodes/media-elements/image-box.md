---
title: Image Box
sidebar_position: 50
---

# Image Box

An image paired with a heading, text and link, rendered in many hover-overlay, caption, card and frame designs. Its options are organized across the **Content**, **Design**, **Effects & Link**, **Styling**, **Animations**, and **Advanced** tabs.

<img src="/img/shortcodes/image-box-backend.png" alt="Image Box on the Page Builder canvas" width="936" />

## Content

<img src="/img/shortcodes/image-box-content.png" alt="Image Box options panel — Content tab" width="1200" />

- **Image** — upload a new image or choose one from the media library. Pick a source larger than the display size so it stays sharp.
- **Alt Text Override** — optional text. Leave blank to use the alt text saved on the image in the media library; leave empty for a purely decorative image.
- **Eyebrow / Subtitle** — small line shown above the title (e.g. a category like "Web Development"). Blank to hide.
- **Title** — the main heading. Leave blank to render an image-only box.
- **Title HTML Tag** — semantic tag for the title; choices `H2`, `H3` (default), `H4`, `H5`, `H6`, `Span (decorative, not a heading)`, `Paragraph`.
- **Text** — optional textarea description shown below the title. On hover-overlay designs this is revealed over the image.
- **Icon** — optional icon (icon-v2 picker). Shown over the image on overlay designs, or above the title on stacked/feature designs. Recolor it via Icon Color in Styling.
- **Custom Icon (Emoji / SVG)** — optional text. If filled, overrides the Icon picker; accepts an emoji or inline SVG markup (whose colors are fixed, so Icon Color won't affect them).
- **Button / Link Style** — select for the call-to-action under the text; choices `None` (default), `Button`, `Text link`, `Arrow link`.
- **Button Label** — text shown on the button / link (default `Read More`). Ignored when Button / Link Style is None.

## Design

<img src="/img/shortcodes/image-box-design.png" alt="Image Box options panel — Design tab" width="1200" />

- **Design** — image-picker of the overall box layout (default `stacked`). Choices are built from the design registry; hover-overlay designs reveal the text over the image, while caption / card / frame designs keep it visible.
- **Image Crop Ratio** — select that forces the image into a fixed shape via `object-fit: cover`; choices `Original (uncropped)`, `Square 1:1`, `Landscape 4:3` (default), `Landscape 3:2`, `Widescreen 16:9`, `Portrait 3:4`, `Portrait 2:3`.
- **Media Width (Side designs)** — select used only by the Side designs for how much of the row the image occupies; choices `One third (33%)`, `Two fifths (40%)`, `Half (50%)` (default), `Three fifths (60%)`. Ignored by other designs.
- **Content Alignment** — alignment control (with Inherit) for the horizontal alignment of the eyebrow, title, text and button. Leave on Inherit to use each design's default.

## Effects & Link

<img src="/img/shortcodes/image-box-effects-link.png" alt="Image Box options panel — Effects & Link tab" width="1200" />

- **Hover Effect** — select for a motion / image effect on hover (composes with the Design); choices `None`, `Image zoom in` (default), `Image zoom out`, `Grayscale → Color`, `Image blur`, `Shine sweep`, `Lift card`, `3D tilt`.
- **Transition Speed** — select; choices `Fast (0.2s)`, `Normal (0.4s)` (default), `Slow (0.7s)`.
- **Overlay Color** — compact color picker for the tint over the image on overlay / scrim / caption-bar designs. Defaults to a dark scrim when empty.
- **Overlay Opacity** — select for the overlay tint strength on hover-overlay / scrim designs; choices `0% (none)`, `25%`, `40%`, `60%` (default), `75%`, `90%`.
- **Link Behavior** — select for what happens on click; choices `Not clickable` (default), `Link to URL`, `Open image in lightbox`, `Open video in lightbox`.
- **Link / Video URL** — full URL used when Link Behavior is "Link to URL" or "Open video in lightbox" (a YouTube / Vimeo page URL or a direct `.mp4`). Ignored for the lightbox-image and not-clickable behaviors.
- **Open Link in New Tab** — switch (`_blank` / `_self`; default `_self`). Only applies to the "Link to URL" behavior.

## Styling

<img src="/img/shortcodes/image-box-styling.png" alt="Image Box options panel — Styling tab" width="1200" />

- **Background Color** — compact color picker for the box background.
- **Font Size** — a named size from the framework presets (customizable in Theme Settings on the official Unyson+ theme).
- **Title Color** — color applied to the title.
- **Eyebrow / Subtitle Color** — color applied to the small eyebrow line above the title.
- **Text Color** — color applied to the body text.
- **Icon Color** — color applied to the icon (font icons only).
- **Accent Color** — color used for the button background, arrow link and frame / badge accents.
- **Margin & Padding** — spacing control. All Sides applies to every side at once; any per-side value overrides it for that direction.

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
