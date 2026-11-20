---
sidebar_position: 8
title: Animation Creator (plan)
slug: /3d-motion-roadmap/animation-creator
description: The plan for the Animation Creator — an Animate workspace in the Live Editor where you keyframe the real elements of a page, with only the tools the selection needs, saved as light native motion. Phases, layout, data and decisions.
---

# Animation Creator — the plan

*Planned November 2026, revised 19 November 2026. Status: **in progress**: 5a–5e shipped; the Animate workspace
(A1–A5) shipped; 5g and 5h are next.*

*This page is the plan; the [Roadmap](./roadmap#phase-5) carries the phase list and its status.*

## What it is

One place to make page motion visually, **inside the Live Editor**. Switch the editor to **Animate**: the page stays
in the middle, a timeline docks under it, and the side panel shows only the tools for what you select. Select an
element and animate it, or every element with its class; add keyframes, pick the curve into each (springs
included), choose what plays the timeline (page load, scrolling into view, hover, click, and scroll position in A5),
and watch it play on the real page as you scrub. Save, and it ships as a small native timeline every visitor gets.

It is the general-purpose visual timeline the engine was missing. The other tools each cover one slice:
[Scroll Keyframes](/animation-engine/scroll-keyframes) (three beats on scroll), the
[Scroll Timeline](/animation-engine/scroll-timeline) (retime what a page already has),
[Interactions](/animation-engine/interactions) (up to three steps per trigger, with their own Interaction timeline).

## The change of course (19 November 2026)

5c–5e built the Creator as **Kinetic Scenes in a second window**, connected to the Live Editor. It worked, but it was
the wrong experience: another website in another window, two toolbars, two Saves, and on one monitor the windows
covered each other. Webflow, which does the same job, keeps everything in its Designer: the interaction's settings
in a side panel and a timeline at the bottom of the canvas while you work on one. So the Creator moves into the Live
Editor, **without Kinetic Scenes' interface**: that would make the animation editor clunky and bloated, and Kinetic
Scenes keeps its own purpose (scenes and videos). The decision and its reasons:
[Why page timelines are made in the Live Editor, not in Kinetic Scenes](/decisions/page-timelines-in-the-live-editor).

What 5a–5e built stays: the shared curves with springs (5a), bursts (5b), and the page timeline itself (5d–5e): its
data, the 3 KB visitor runtime, saving on the page, Runs on, reduced motion, Import / Export, the REST field and the
[demo](https://demos.unysonplus.com/animation-engine/page-timelines/). Only the editing moves.

## The Animate workspace

```
+-----------------------------------------------------------------------------------+
| [Design | Animate]   [Hero intro v] [+ New]   [> Play] 0.45 / 1.20 s   [Preview as  |
|                                                                visitor] [Save]    |
+--------------+---------------------------------------------------+----------------+
| NAVIGATOR    |                                                   | (selection)    |
| Section      |              the page (canvas)                    |                |
|  Heading  *  |        held still, plays at the playhead          | see the table  |
|  Card     *  |                                                   | below          |
+--------------+---------------------------------------------------+----------------+
| TIMELINE  0s     0.2     0.4     0.6     0.8     1.0     1.2           [-][+] [_] |
| Heading    <>---------<>                                                          |
| .card (3)       <>--------------<>   stagger 0.15 s                               |
+-----------------------------------------------------------------------------------+
```

**Contextual:** the side panel shows the tools for what is selected, and nothing else.

| What is selected | The side panel shows |
| --- | --- |
| **Nothing** | The timeline: name; **Plays on** (page load, in view, hover, click) and its options; length; loop and back-and-forth; **Runs on** (desktop, tablet, phone); Import / Export |
| **An element not in the timeline** | **Animate this element** (a track with a first move), **Animate every “.class”** for each class it has, and which other timelines already move it |
| **An element or class in the timeline** | Its track: the values at the playhead (Move X / Y, Scale, Rotate, Opacity, Blur); changing a value where there is no keyframe adds one; for a class, the stagger and its order |
| **A keyframe** (a diamond on the timeline) | Its time, its values, the **curve** into it (the shared curve list, springs included), Delete |

The toolbar keeps only what Animate needs: the timeline picker, play and the time, Preview as visitor, Undo / Redo
and Save. Design's Edit / Preview / Play and the element tools come back with Design.

## How it is built

- **Native, in the Live Editor's own code**, grown from what is there: the **Interaction timeline** (a dock under the
  canvas with rows, draggable bars, a playhead and scrubbing on the real page, undoable edits) becomes the Animate
  timeline; the **Navigator** is the left panel; the side panel follows the editor's other panels.
- **No Kinetic Scenes code in the Live Editor.** What they share is the data format and the curves: the shared curve
  list from 5a already holds Kinetic Scenes' named curves and springs.
- **Same window:** the playhead moves the canvas directly.
- **Class targets:** a track targets one element or every element with a class, with a stagger and its order (first
  to last, last to first, from the centre, random).
- **One Save and one undo:** the timelines are part of the page's unsaved changes and history; Save writes them with
  the builder content (stored apart, so re-imports keep working), and the page's revisions include them.

## The floating tools

| Tool | Plan |
| --- | --- |
| Scroll Ruler | Never on the Live Editor canvas or the public page. Inside Animate, a toggle that draws the ruler over the canvas |
| Scroll Timeline (the Timeline button) | Never on the canvas or the public page. Becomes the **Scroll** tab of Animate's dock |
| AI Assistant + chat bubble | Hidden on the canvas (the Live Editor has its own AI panel); visitors still see the chat |

## Phases

| Phase | What ships | Depends on |
| --- | --- | --- |
| **5a · Springs everywhere** ✅ *AE 1.5.21* | Kinetic Scenes' named curves, springs included, in every engine ease picker | — |
| **5b · Bursts** ✅ *AE 1.5.23* | A Burst Interactions step and button effect | — |
| **5c–5e · Page timelines** ✅ *AE 1.5.29, Live Editor 0.3.22* | The page timeline data, runtime, saving, Runs on, Import / Export, demo (edited in Kinetic Scenes page mode, replaced by A2) | — |
| **A1 · Clean canvas** ✅ *Live Editor 0.3.23* | The Scroll Ruler, the Scroll Timeline button, the AI Assistant and the chat bubble no longer appear on the Live Editor canvas | — |
| **A2 · The Animate workspace** ✅ *Live Editor 0.3.24* | Design / Animate switch and toolbar; Navigator; contextual side panel; the timeline dock (tracks, keyframes, drag to retime, playhead, scrubbing); triggers, Runs on, Preview as visitor, Import / Export; one Save and one undo | A1 |
| **A3 · Class targets** ✅ *AE 1.5.32* | Animate every element with a class, with stagger and order, in the runtime, the data, the first-moment CSS and the CSV | A2 |
| **A4 · Retire the window** ✅ *Live Editor 0.3.25, Studio 0.1.69* | Animate no longer opens Kinetic Scenes; page mode removed from it; docs, screenshots and demo updated | A2 |
| **A5 · Scroll in Animate** (was 5f) ✅ *AE 1.5.32, Live Editor 0.3.25* | The Scroll tab: scroll timelines (the playhead is the scroll position, pinned or not), the existing scroll animations, the ruler toggle; the floating tools leave the public pages | A2 |
| **5g · Presets and AI** | Starting points, your own presets, the AI Assistant and MCP tools authoring timelines | A2 |
| **5h · Site-wide** | Timelines used on every page (like Interactions' *Use on every page*) | A3 |

## The data and the runtime

A page holds any number of named timelines, stored as post meta `_upw_page_timelines` (never inside the builder
content). Each has `id`, `name`, `duration`, `trigger` (`load`, `in-view`, `hover`, `click`, with its options),
`repeat`, `yoyo`, `runsOn` and `tracks`, one per element (`target` = its builder key; A3 adds class targets), each
with keyframes `{ t, x, y, scale, rotate, opacity, blur, ease, e }` where `e` is the curve as CSS `linear()`. The
runtime (`upw-timeline.js`, about 3 KB gzipped) loads only on pages with a timeline; the head CSS holds each element
at its first moment so nothing flashes. Full reference: [Page Timelines](/animation-engine/page-timelines).

## Risks

- **Room on a laptop:** canvas, two side panels and a dock. The dock and both panels collapse; the canvas can zoom out.
- **Two timelines in one editor:** an element's Interactions keep their own timeline (in Design); Animate is for
  page timelines. Animate lists an element's Interactions as read-only, so you can see what else moves it.
- **Keyboard shortcuts** (space to play, Delete for a keyframe) apply only while the dock has focus.
