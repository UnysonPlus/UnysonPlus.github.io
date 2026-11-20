---
slug: page-timelines-in-the-live-editor
title: Why page timelines are made in the Live Editor, not in Kinetic Scenes
authors: [jon]
tags: [animation-engine, kinetic-scenes, live-editor, architecture]
date: 2026-11-19
description: The Animation Creator's page timelines move from Kinetic Scenes in a second window to a lean, contextual Animate workspace inside the Live Editor, without any Kinetic Scenes interface; one Save, class targets, and the scroll tools inside Animate.
---

**The question:** after using it, "the overall UX is stupid": Animate sent you to kinetic-scenes.unysonplus.com in
another window. Should the user stay in the Live Editor, with a timeline editor beside the visual editor? And if so,
should Kinetic Scenes' interface be brought into the Live Editor?

<!-- truncate -->

## Context

Animation Creator phases 5c–5e (November 2026) built page timelines as Kinetic Scenes' *page mode*: the Live Editor's
Animate opened Kinetic Scenes in a second window, connected by messages, and the canvas played the timeline. It
worked end to end, but:

- another website in another window, which on one monitor covers the page you are animating;
- two toolbars that both affect the page (in the Live Editor's Preview, the Kinetic Scenes timeline moved nothing you
  could see);
- two Saves;
- admin tools (the Scroll Ruler, the Scroll Timeline button, the AI Assistant, the chat bubble) floating over the
  canvas.

Webflow, which does the same job with its Interactions with GSAP (July 2025), keeps everything in its Designer: the
interaction's settings in the right sidebar, and a timeline that appears at the bottom of the canvas while you build
one. Framer has no timeline at all, only per-layer effects (that is what our Animations tab already is).

## Options considered

1. **Keep the second window** and polish it. Cheapest, but the core problem (two windows) stays.
2. **Kinetic Scenes inside the Live Editor**, as the hosted app in a panel or as its timeline, keyframe and curve
   editors built into the plugin. One codebase, but the animation editor would carry a full motion-graphics
   interface it mostly does not need.
3. **A lean Animate workspace in the Live Editor**, native, grown from its Interaction timeline and Navigator, showing
   only the tools for the selection.

## Decision

**Option 3**, with these choices:

- **No Kinetic Scenes interface in the Live Editor.** "Putting the Kinetic Scenes interface in would make the
  animation editor clunky and bloated. We created Kinetic Scenes for its purpose, and the animation editor should
  only display the tools needed. When someone selects an object, the workspace should display the tools available."
- **One Save and one undo** for the page and its timelines.
- **Kinetic Scenes' page mode is retired**; Kinetic Scenes stays the app for scenes and videos.
- **Class targets** (every element with a class, with stagger) are part of this plan, not later.
- **The Scroll Ruler and Scroll Timeline** leave the canvas and the public pages, and live inside Animate.

It shipped as [Page Timelines](/animation-engine/page-timelines) in the Animate workspace (phases A1–A5).

## Why

- **The user never leaves the editor**, and it works on one laptop screen.
- **Only what is needed:** an element animation editor needs tracks, keyframes, a few properties and curves. Scenes,
  layers, presets, audio, cameras and export belong to Kinetic Scenes.
- **Nothing is thrown away:** the page timeline data, its runtime, saving, Runs on, Import / Export and the curves
  (5a) stay exactly as they are; only the editing surface changes. The curves are shared through the engine's curve
  list, not through Kinetic Scenes code.

**Status:** Accepted. Supersedes [Why the Animation Creator reuses Kinetic Scenes](/decisions/animation-creator-reuses-kinetic-scenes).
