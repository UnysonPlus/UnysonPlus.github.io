---
sidebar_position: 11.5
title: Image Sequence
slug: /image-sequence
---

# Image Sequence

Scrub through a sequence of frames as the visitor scrolls — the **product-reveal** effect (a 3D object or product spinning/assembling as you scroll). Frames are preloaded and drawn to a `<canvas>`.

:::tip Try it live
Play with every option — frames, mode, scroll length, direction, fit and background — in the **[interactive playground ⚡](./playground.mdx)** (it scrubs a real preloaded frame set on a canvas, exactly like the runtime).
:::

## Add it

Builder palette → **Media Elements** → **Image Sequence**.

## Frames

Pick **Frames from**:

- **Uploaded frames** — upload the frames in order (drag to reorder). Best for short sequences.
- **Numbered URL pattern** — a template with `%d` where the frame number goes (e.g. `https://site.com/seq/frame_%d.jpg`), plus **count**, **start number**, and **zero-pad digits**. Best for long (100+) sequences without uploading each file.

## Options

| Tab | Option | Notes |
| --- | --- | --- |
| **Playback** | **Mode** | **Pin & scrub** (sticks the sequence full-screen and plays it as you scroll through it) · **Scrub while in view** (plays as the element passes the viewport) |
| | **Scroll length (screens)** | How much scrolling the pinned sequence spans — higher = slower scrub |
| | **Direction** | Forward · Reverse |
| **Style** | **Fit** | Cover (fill, crop) · Contain (letterbox) |
| | **Height** | Element height for *Scrub in view* (pinned mode is always full-screen) |
| | **Background** | Shown behind letterboxed frames |

## Set it up

1. Render or export your sequence as evenly-sized frames (e.g. a product rotating over ~60–120 frames).
2. Add **Image Sequence** → point it at the frames (upload or URL pattern).
3. **Pin & scrub**, set the **Scroll length**, and **Save**.
4. Scroll the page — the frames play, pinned full-screen.

## Performance & accessibility

- **Preloaded** frames drawn to a canvas for flicker-free scrubbing; loads only on pages that use it.
- **Reduced motion** shows a single static frame (no scrubbing).
- For long sequences prefer the **URL pattern** (no per-file uploads) and reasonably compressed frames.
