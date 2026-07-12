---
sidebar_position: 4.85
title: Scroll Text Highlight
slug: /scroll-text-highlight
---

# Scroll Text Highlight

:::tip Try it live
Scrub the reveal in the **[Scroll Text Highlight playground](./playground.mdx)** — drag the vertical
scroll on the right to light the words up one at a time, switch between all **20 styles** (fill,
gradient, sweep, glow, neon, rise, scale, pill, underline…), and tweak split (word/character),
colour, ease and keep-highlighted. It runs the real word-splitter and scroll scrub.
:::

Light up a block of text **word-by-word as the reader scrolls through it** — the "scrollytelling" read where each word goes from muted to full as it passes. **20 styles**, pure CSS transitions + one passive scroll check, no library.

## Where to find it

Open a text element (heading, Text Block, Special Heading…) → **Animations** tab → **Scroll Text Highlight** (a popover of style tiles). Best on a large, bold paragraph or headline.

Global on/off: **Theme Settings → Site-wide UX → Effects → Enable Scroll Text Highlight**.

## Styles

The **20 styles**, grouped by how they light a word up:

| Group | Styles |
| --- | --- |
| **Colour** | **Fill** (dim → full, optionally to a highlight colour), **Gradient fill**, **Colour sweep** (a colour wipes across the letters), **Greyscale → colour**, **Outline to fill** (stroked → filled). |
| **Opacity & focus** | **Fade** (opacity up), **Dim to bright**, **Blur to sharp**, **Spotlight** (a soft blur snaps into focus). |
| **Glow** | **Glow**, **Neon flicker** (a neon-sign flicker-on), **Shimmer** (a brightness pulse). |
| **Motion** | **Rise up**, **Scale pop**, **Skew settle**, **Track in** (letter-spacing tightens). |
| **Decoration** | **Marker sweep** (highlighter bar), **Highlight pill** (rounded background), **Underline grow**, **Strike clear** (a strikethrough retracts as it lights). |

## Options

| Option | Notes |
| --- | --- |
| **Reveal by** | Word (default) or Character — light up one word, or one letter, at a time. |
| **Highlight colour** | Preset (theme palette) or custom — the lit colour used by the colour / decoration styles (Fill, Gradient, Sweep, Marker, Pill, Underline, Outline, Glow, Neon). The opacity, focus and motion styles ignore it. |
| **Per-word ease** | How softly each word transitions on. |
| **Keep highlighted** | Stay lit once revealed (off = re-dims when scrolled back up). |

## Performance & accessibility

- **Pure CSS transitions** driven by one passive, rAF-throttled scroll handler shared by every instance.
- **Loads only on pages that use it.**
- **Reduce motion** — everything is shown lit immediately, no scrubbing.

:::tip Big statement paragraph
Use a **Special Heading** or Text Block with large type, pick **Fill** with your brand colour, and keep "Reveal by = Word". As the reader scrolls, the sentence writes itself in colour.
:::
