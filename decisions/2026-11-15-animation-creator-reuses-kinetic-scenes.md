---
slug: animation-creator-reuses-kinetic-scenes
title: Why the Animation Creator reuses Kinetic Scenes instead of a new timeline in WordPress
authors: [jon]
tags: [animation-engine, kinetic-scenes, live-editor, architecture]
date: 2026-11-15
description: For a general-purpose visual keyframe editor for page elements, Kinetic Scenes is reused as the editor, in its own window connected to the Live Editor, with a native page timeline and a small runtime on the page — rather than growing the Scroll Timeline or building a second timeline inside WordPress.
---

**The question:** a list of popular web-animation libraries prompted "should we build a powerful animation
creator?" The Animation Engine already has the effects; what it lacks is one place to author a multi-element,
multi-keyframe sequence visually. Should that creator be built in WordPress (growing the front-end Scroll Timeline),
or should it reuse Kinetic Scenes?

<!-- truncate -->

> **Status: Superseded (19 November 2026)** by [Why page timelines are made in the Live Editor, not in Kinetic Scenes](/decisions/page-timelines-in-the-live-editor): after use, the second window was the wrong experience. The page timeline data, runtime and curves this decision produced are kept; the editing moved into the Live Editor.

**Context.** The engine's motion tools each cover a slice: Scroll Keyframes (three beats on scroll), the Scroll
Timeline (retime and edit what a page already has), Interactions (up to three steps per trigger) and the Interaction
timeline (their timing). [Kinetic Scenes](/kinetic-scenes) already has a full timeline, keyframe editor, curve editor
with springs, scroll-linked playback, a preset library, AI assist, and a postMessage bridge to the builder for the
Kinetic Scene element. Its keyframe props (Move X / Y, Scale, Rotate, Opacity, Blur) are nearly the ones Scroll
Keyframes animate. In October 2026 we decided **not** to embed its React editor in the front-end Scroll Timeline
overlay ([keyframe-lane-native-editor](/decisions/keyframe-lane-native-editor)): too much weight on the page and a
second source of truth, for editing three beats.

**Options considered.**

- **Grow the Scroll Timeline in WordPress.** Native and light, but it means writing a second timeline, keyframe
  editor and curve editor, and keeping two of each in step with Kinetic Scenes forever.
- **Embed the Kinetic Scenes editor in the page.** Rejected before, for good reasons that still hold: React on every
  admin page view, and a scene file mirroring the page's options.
- **Reuse Kinetic Scenes as the editor, in its own window.** It connects to the Live Editor (the page is the
  preview, played by the same runtime visitors get), and saves a native **page timeline**: its own data, its own
  small runtime, mirroring nothing.

**Decision.** Reuse Kinetic Scenes in its own window, connected to the Live Editor. The timeline is a native piece
of page data in the Kinetic Scenes keyframe format, played by a small build of the Kinetic Scenes player's motion
core, loaded only on pages that use it. The full plan: [Animation Creator](/animation-engine/3d-motion-roadmap/animation-creator).

**Why.** It gives users one motion editor to learn for both scenes and pages, and gives us one timeline codebase to
maintain. It keeps both rules from the October decision: no editor code on the page (Kinetic Scenes stays a separate
app; the page gets only a message bridge in the Live Editor and the playback runtime), and one source of truth (the
page timeline is its own data, edited only in the Creator, not a copy of other options). The existing tools stay as
they are for simple, inline motion; the Creator is for authoring sequences.
