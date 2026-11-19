---
sidebar_position: 8
title: Animation Creator (plan)
slug: /3d-motion-roadmap/animation-creator
description: The plan for the Animation Creator — keyframe any element on a real page in the Kinetic Scenes timeline, preview it on the page, and ship it as light native motion. Phases, architecture, data model and open questions.
---

# Animation Creator — the plan

*Planned November 2026. Status: **planned, not started**. This page is the plan; the
[Roadmap](./roadmap#phase-5) carries the phase list and its status.*

## What it is

One place to make page motion visually. Open a page in the [Live Editor](/extensions/live-editor), choose
**Animate**, and [Kinetic Scenes](/kinetic-scenes) opens beside it, connected to that page. Every element you
pick on the page becomes a **track** on the Kinetic Scenes timeline. Add keyframes, shape the curve between
them (springs included), choose what plays it (page load, scrolling into view, scroll position, hover, click),
and watch it play **on the real page** as you edit. Save, and it ships as a small native timeline that plays
for every visitor, with nothing heavy added to the page.

It is the general-purpose visual timeline the engine has been missing. Today's tools each cover one slice:
[Scroll Keyframes](/animation-engine/scroll-keyframes) (three beats on scroll), the
[Scroll Timeline](/animation-engine/scroll-timeline) (retime what a page already has),
[Interactions](/animation-engine/interactions) (up to three steps per trigger) and the Interaction timeline
(their timing). The Creator is where you **author** a multi-element sequence from scratch, with as many keyframes
and elements as the moment needs.

## Why reuse Kinetic Scenes

Kinetic Scenes already has every piece the Creator needs, built, tested and in use:

| Kinetic Scenes has | The Creator uses it for |
| --- | --- |
| A tracks-and-clips **timeline** with a playhead, zoom, snapping and undo | The page's timeline, one track per element |
| A **keyframe editor**: Move X / Y, Scale, Rotate, Opacity, Blur, keyed at the playhead | Element keyframes (the same props the engine's Scroll Keyframes already animate) |
| A **curve editor** and named curves, including **springs** (Pop over, Bounce hard) | The ease into each keyframe |
| **Scroll-linked playback** (pinned or not, smoothed) in its player | Scroll-driven page timelines |
| A **preset library** of entrances, exits and emphasis moves | One-click starting points |
| **AI assist** and the kit's MCP tools | "Make the hero cards cascade in like a deck" |
| A **bridge to WordPress** (the Kinetic Scene element's *Open in Kinetic Scenes* / *Save to page*) | The connection to the page |

Building the same in WordPress would mean writing a second timeline, keyframe editor and curve editor, and keeping
two of each in step. Reusing it makes Kinetic Scenes **the** motion editor for both scenes and pages: one set of
skills for the user, one codebase for us.

### How this fits the earlier decision

In October 2026 we chose **not** to embed the Kinetic Scenes editor in the front-end Scroll Timeline overlay
(Design Decision [keyframe-lane-native-editor](/decisions/keyframe-lane-native-editor)): it would have loaded
React onto every admin's page view and created a second source of truth, just to edit three beats. This plan keeps
both of those rules:

- **No editor code on the page.** Kinetic Scenes stays its own app, in its own window or tab. The page side is a
  small message bridge in the Live Editor canvas, and visitors load only the playback runtime.
- **One source of truth.** A page timeline is a native piece of page data with its own runtime, edited only in
  the Creator. It does not mirror or duplicate any other option.

The decision behind this choice: [Why the Animation Creator reuses Kinetic Scenes](/decisions/animation-creator-reuses-kinetic-scenes).

## How it works

```
 Live Editor (WordPress)                          Kinetic Scenes (its own window)
 ┌──────────────────────────────┐   messages     ┌──────────────────────────────────┐
 │ canvas = the real page       │ ─────────────▶ │ Page mode                        │
 │  • element list + boxes      │  elements,     │  • tracks = picked elements      │
 │  • click to pick an element  │  selection     │  • keyframe + curve editors      │
 │  • plays the timeline live   │ ◀───────────── │  • triggers, presets, AI assist  │
 │    (the visitor runtime)     │  timeline,     │  • play / scrub                  │
 │                              │  playhead      │                                  │
 │ Save ──▶ page timeline data  │ ◀── Save ───── │                                  │
 └──────────────────────────────┘                └──────────────────────────────────┘
```

1. **Opening.** The Live Editor gets an **Animate** button (and *Animate in Kinetic Scenes* on a selected element).
   It opens Kinetic Scenes with `?connect=unysonplus&mode=page`, using the same opener handshake as the Kinetic
   Scene element (`upw-studio:hello`), extended with page messages.
2. **The page is the preview.** The canvas plays the timeline through the **same runtime visitors get**, so what you
   see while editing is exactly what ships. Kinetic Scenes shows the timeline, inspector and a simple map of the
   picked elements; it never tries to copy the page into its own stage.
3. **Picking.** Clicking an element on the canvas selects it (or adds its track) in Kinetic Scenes; selecting a track
   outlines its element on the canvas. Elements are addressed by their builder item key (`data-fw-item-id`), or by a
   class for "every card like this one".
4. **Playing and scrubbing.** Kinetic Scenes sends the timeline and playhead; the canvas seeks to that moment. For a
   scroll timeline the playhead stands for the scroll position, and the canvas scrolls with it.
5. **Saving.** *Save to page* stores the timeline on the page. Undo stays in Kinetic Scenes until you save; the page's
   own revisions hold the saved versions.

### The data: a page timeline

A page holds any number of named timelines. Each one:

| Field | Meaning |
| --- | --- |
| `name` | "Hero intro", "Pricing cards cascade" |
| `trigger` | `load`, `in-view` (element + threshold), `scroll` (pinned or not, length in screen heights), `hover`, `click` (on an element) |
| `duration` | Seconds; for a scroll timeline, the share of the scroll range instead |
| `tracks[]` | One per element: `target` (item key, or a class + "every match") and its keyframes |
| keyframes | `t` + the props keyed at that moment + the `ease` into it: **the Kinetic Scenes keyframe format unchanged**, so its editor works as is |
| `repeat`, `yoyo` | Loop and back-and-forth (new: the page runtime adds them, since scenes play once) |
| `runsOn` | Desktop / tablet / phone, like Interactions |

Props start with the six Kinetic Scenes already keys (Move X / Y, Scale, Rotate, Opacity, Blur), then add the ones
the engine's Scroll Keyframes have (Rotate X / Y) and the page-specific ones (clip, colour, filter). It is stored per
page beside the timing overrides, keyed by element, **never inside the builder JSON**, so re-imports and the
manual-edit guard leave it alone. Every page timeline can be **exported and imported** as a file (one timeline, or
all of a page's), so a set-up moves between pages and sites.

### The runtime

A small build of the Kinetic Scenes player's motion core (keyframe interpolation, the named eases and springs,
the scroll link), loaded **only on pages that have a timeline**:

- **Light:** target under 10 KB gzipped; no React, no GSAP required.
- **Exact:** the same code that previews in the canvas, so editing and visiting match frame for frame.
- **Safe:** transforms, opacity and filters by default (no layout shift); reduced motion shows the end state; the
  timeline pauses off screen; the Live Editor's Edit mode holds it still like every other effect.

## Phases

Each phase ships something useful on its own.

| Phase | What ships | Depends on |
| --- | --- | --- |
| **5a · Springs everywhere** ✅ *shipped (AE 1.5.21)* | The Kinetic Scenes named curves, springs included, plus a cubic-bezier field, in every Animation Engine ease picker (Scroll Motion, Scroll Keyframes, Interactions, States) from one shared eases file | — |
| **5b · Bursts** ✅ *shipped (AE 1.5.23)* | A **Burst** Interactions step and button effect: circles, sparks, lines and confetti bursting from an element on click or hover (grows the Confetti module) | — |
| **5c · Connect** | Kinetic Scenes *Page mode*; the Live Editor's **Animate**; element list, picking and selection in both directions; read-only display of an element's existing motion | Kinetic Scenes bridge |
| **5d · Author on the page** | Tracks, keyframes, curves and triggers (load, in view, hover, click); play and scrub on the canvas through the visitor runtime | 5c + the runtime |
| **5e · Save and ship** | Page-timeline storage, the visitor runtime, Runs on breakpoints, reduced motion, **Import / Export**, docs and a demo page | 5d |
| **5f · Scroll timelines** | Scroll trigger, pinned or not, with the playhead as the scroll position; listed on the [Scroll Timeline](/animation-engine/scroll-timeline) beside the page's other scroll motion | 5e |
| **5g · Presets and AI** | Kinetic Scenes' motion presets as one-click page starting points; save a timeline as your own preset; the AI assist and MCP tools author page timelines | 5e |
| **5h · Reuse** | A timeline for every element matching a class, and site-wide timelines (like Interactions' *Use on every page*) | 5e |

**5a and 5b come first:** they are small, they make the existing tools better straight away, and 5a's shared
eases file is the first piece of the runtime.

## Open questions

- **Live Editor only?** The classic builder shows boxes, not the page, so it can't preview motion. Plan: Animate
  lives in the Live Editor; the classic builder gets an *Open in the Live Editor to animate* link.
- **Working offline.** Kinetic Scenes is a hosted app (`kinetic-scenes.unysonplus.com`). The AI Dev Kit can serve a
  local copy; the Creator should work with either, and say clearly when it can't reach one.
- **Stable element keys.** Builder item keys survive edits, but duplicating a section copies them. Check how keys
  behave on duplicate and template import before 5e, and re-key on duplicate if needed.
- **Interactions and Scroll Keyframes.** They stay as they are (simple, inline, fine for most needs). Later, an
  *Open in Animation Creator* could turn one into a page timeline (one way), and an Interactions step could
  **play a timeline**, so a click can start a sequence made in the Creator.
- **Kinetic Scenes is in alpha.** The Page mode should ship as a clearly marked beta inside it until 5e is done.
