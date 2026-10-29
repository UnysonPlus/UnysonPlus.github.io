---
sidebar_position: 12
title: Scroll Timeline & Ruler
slug: /scroll-timeline
description: Two admin-only author tools that show every scroll animation on a page. The Scroll Timeline is a video-editor-style, horizontal tracks view with a draggable playhead that scrubs the real page live; the Scroll Ruler is its compact vertical read-out.
---

# Scroll Timeline & Ruler

Two **author tools** for composing scroll motion. They are **admin-only** and run on the **front end**:
they appear only for logged-in administrators, stay hidden until you open them, and never load or render
anything for a visitor. Both read the page's live **GSAP ScrollTriggers** — every scroll animation the
Animation Engine put on the page (Scroll Motion, Scroll Keyframes, Motion Sequence, Motion Gallery
choreography, scrollytelling, pinned sections…) — so you see exactly what fires where.

## Scroll Timeline — the visual editor

A **video-editor-style timeline** docked at the bottom of the screen. Open it with the **Timeline**
button (bottom-right) or press **Shift + T**.

- **One track per scroll animation.** Each is drawn as a coloured block on a **0–100 % scroll axis**,
  so position left-to-right is *where down the page* the animation runs — readable percentages, not raw
  pixel offsets. A cascade of entrance animations shows as a neat staircase of blocks.
- **A draggable playhead scrubs the real page.** Drag the white knob along the axis (or click anywhere
  on the ruler) and the page scrolls to that point — so **scrub-linked** animations animate **live** as
  you drag, and you can park the playhead exactly where a beat lands.
- **Live read-out.** The header shows the current **scroll %** and how many animations are **active**
  (currently inside their range) at that position.
- **Hover a track to highlight its element** on the page (a teal outline), so you can tell which block
  belongs to which section, heading or card.
- **Click a track label or block to jump** the page to that animation's start.
- Badges mark **pinned** (📌) and **scrubbed** tracks.

This is the page-level answer to "what runs when, and in what order" — the view you want open while you
tune a choreography so every animation lands on the beat you intend.

### Drag to retime

Tracks that are **Scroll Motion** effects are **editable** (others show as `locked`):

- **Drag the block** to move when the animation **starts** (a scrub block keeps its length as it moves).
- **Drag the right handle** of a **scrub** block to change where it **ends** (its duration).
- The change **previews live** — scrub animations update as you drag — and the track shows an **edited**
  badge with a **reset (↺)** button.
- **↺ Reset** reverts the track to its original timing.

A retime is saved to a **per-page store (post meta), never the page's builder content**, so it is additive
and safe: it survives editing the page in the builder and re-importing it, and it **ships to real
visitors** — the runtime applies your new start/end for everyone, not just in the editor. (The element is
matched by a stable per-element key, so a Scroll Motion element must have been saved at least once since
this feature shipped for its key to exist; brand-new effects get one on save.)

### Keyframe lanes (Scroll Keyframes)

A [Scroll Keyframes](/animation-engine/scroll-keyframes) element — one that moves through a **Start →
Middle → End** (or a **Pin · Hold · Exit**) timeline — shows on the Scroll Timeline as a lane with a
**diamond for each beat**, placed where that beat lands as the element scrolls:

- **Drag an interior beat** (a bright diamond) to change **when it lands** — the *Middle* of a Start →
  Middle → End, or the *appear* / *hold* beats of a Pin · Hold · Exit. The first and last beats are the
  endpoints and stay put (dim diamonds).
- A beat can't cross its neighbours, so the order never breaks.
- The change **previews live** and is **saved to the same per-page store** as a drag-to-retime — never the
  builder content — so it survives a re-import and **ships to real visitors**.
- The edited lane shows the **edited** badge and a **reset (↺)** that restores the authored beats.

**Click a beat** (any diamond, including the endpoints) to open its **state editor** — the eight animatable
properties (X, Y, scale, rotate, rotate X/Y, opacity, blur) plus the **ease** into that beat. The page jumps
to that beat so you see the pose you're editing, and every change **previews live**. Edited beats get a
white ring; **↺ Reset beat** restores just that beat, and the lane's ↺ resets the whole timeline.

Both the *when* (beat positions) and the *what* (beat states) are saved to the **same per-page store, as a
diff from the authored values** — never the builder content — so they survive a re-import and **ship to real
visitors**. (An element is matched by a stable per-element key, so a Scroll Keyframes element must have been
saved at least once since this shipped for its key to exist; new ones get it on save.)

## Scroll Ruler — the compact read-out

A thin **vertical** overlay for a quick glance without giving up screen width. Open it with the **⟺**
button (bottom-left) or press **Shift + R**.

- Lists every ScrollTrigger (element, start/end scroll position, pin and scrub flags).
- Maps all their ranges onto a vertical rail down the right edge, with a live playhead.
- Click a row or a rail bar to jump to that trigger.

The Ruler reports **raw scroll positions** (e.g. `486–6156`) — the pixel offsets at which each trigger
starts and ends. The Timeline shows the **same ranges as percentages** of the page, which most people
find easier to reason about; use whichever reads better for the task.

## When to reach for which

| | Scroll Timeline | Scroll Ruler |
|---|---|---|
| Shape | Horizontal, docked bottom | Vertical, right-edge rail |
| Toggle | **Shift + T** / Timeline button | **Shift + R** / ⟺ button |
| Axis | 0–100 % of the page | Raw scroll pixels |
| Scrub the page | ✅ Drag the playhead | View-only playhead |
| Retime (persisted) | ✅ Drag a Scroll Motion block / handle | Read-only |
| Keyframe beats | ✅ Drag a Scroll Keyframes beat on its lane | Read-only |
| Beat states | ✅ Click a beat → edit transform / opacity / ease | Read-only |
| Best for | Tuning timing & order, scrubbing to a beat, retiming | A compact glance at what pins/scrubs where |

## What's next {#whats-next}

The Scroll Timeline now covers the whole of roadmap item **1b**: drag-to-retime for Scroll Motion, and
**keyframe lanes** for Scroll Keyframes — retiming each beat's **position** *and* editing its **state** right
on the lane. The Ruler's ranges stay read-only. Beyond the timeline, the
[3D Motion & Roadmap](/animation-engine/3d-motion-roadmap/roadmap) moves on to **real 3D scenes** (item 2).

Neither tool affects what a visitor *sees as chrome*: they are author aids, gated to administrators and
off until you open them. A **retime you save**, however, is meant to ship — it changes the animation's
timing for everyone, which is the point.
