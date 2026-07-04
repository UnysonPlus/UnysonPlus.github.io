---
sidebar_position: 4.85
title: Scroll Text Highlight
---

# Scroll Text Highlight

Light up a block of text **word-by-word as the reader scrolls through it** — the "scrollytelling" read where each word goes from muted to full as it passes. Four styles, pure CSS transitions + one passive scroll check, no library.

## Where to find it

Open a text element (heading, Text Block, Special Heading…) → **Animations** tab → **Scroll Text Highlight** (a popover of style tiles). Best on a large, bold paragraph or headline.

Global on/off: **Theme Settings → Site-wide UX → Effects → Enable Scroll Text Highlight**.

## Styles

| Style | What it does |
| --- | --- |
| **Fill** | Words go from a dimmed version of the text to full — optionally to a **highlight colour** you choose. |
| **Fade** | Words fade up from low opacity to full. |
| **Blur to sharp** | Words start blurred and come into focus. |
| **Marker sweep** | A highlighter bar sweeps in behind each word (uses the highlight colour). |

## Options

| Option | Notes |
| --- | --- |
| **Reveal by** | Word (default) or Character — light up one word, or one letter, at a time. |
| **Highlight colour** | Preset (theme palette) or custom — the lit colour for Fill and the marker for Marker. |
| **Per-word ease** | How softly each word transitions on. |
| **Keep highlighted** | Stay lit once revealed (off = re-dims when scrolled back up). |

## Performance & accessibility

- **Pure CSS transitions** driven by one passive, rAF-throttled scroll handler shared by every instance.
- **Loads only on pages that use it.**
- **Reduce motion** — everything is shown lit immediately, no scrubbing.

:::tip Big statement paragraph
Use a **Special Heading** or Text Block with large type, pick **Fill** with your brand colour, and keep "Reveal by = Word". As the reader scrolls, the sentence writes itself in colour.
:::
