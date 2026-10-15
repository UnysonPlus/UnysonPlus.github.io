---
sidebar_position: 1
slug: /
title: "Animation Studio — timeline motion graphics for the web"
sidebar_label: "Animation Studio"
keywords: [html animation editor, gsap timeline editor, web motion graphics, animated hero section, kinetic typography html, three.js animation editor, ai animation generator]
description: "The plan for the Unyson+ Animation Studio: a browser editor for timeline motion graphics, with drag-and-drop presets, that exports plain HTML for website heroes and sections rather than video."
---

# Animation Studio

> **Alpha, live at [animation-studio.unysonplus.com](https://animation-studio.unysonplus.com/).** The player,
> the responsive stage, the editor and export (phases 1 to 3) are built. Alpha means features are still
> missing and the scene file format may change between versions; exported pages and embeds keep working
> regardless. This page records the plan and the decisions behind
> it; the [roadmap](./roadmap.mdx) tracks each task, and the [research](./research.md) page covers what
> already exists and what we borrow from it.

The Animation Studio is a browser editor for motion graphics: big kinetic type, shapes, images and 3D, laid
out on a timeline the way a video editor lays out clips. You drag a preset onto the timeline, change its
text, image or timing, and watch it play. The difference from a video tool is the output: the Studio
exports **plain HTML**, not an MP4. The result plays live in the page, stays sharp at any size, and weighs
kilobytes instead of megabytes.

It will live at **`animation-studio.unysonplus.com`**. The first target is **website heroes and sections**,
dropped into a Unyson+ page or embedded on any site.

## Why HTML instead of video

- **Small.** A scene is a few kilobytes of data plus a shared player, not a multi-megabyte video file.
- **Sharp everywhere.** Text and shapes are drawn by the browser, so they stay crisp on any screen.
- **Real text.** Headlines remain text, so search engines, screen readers and translation tools can read
  them, and the words can change without re-rendering anything.
- **Interactive.** A scene can play on load, when it scrolls into view, or in step with the scroll.
- **Kind to motion-sensitive visitors.** Scenes respect the visitor's reduced-motion setting automatically.

## How it is built

The Studio has three parts, and each uses the technology that suits its job.

| Part | Technology | Why |
|---|---|---|
| **The editor** (timeline, canvas, panels) | React + TypeScript, built with Vite | A drag-and-drop timeline editor is a large interactive app that runs in the browser. It compiles to static files, so the server never runs Node.js. |
| **The player** (what an exported scene ships) | Plain JavaScript + GSAP, with three.js only when a scene uses 3D | It has to be tiny and work on any page, including inside WordPress. React stays in the editor and never ships with a scene. |
| **Hosting** | GitHub Pages | Free, and published automatically from the repository. The Studio needs no server of its own: it is static files, and the AI runs on each user's own computer. |

The editor is a static site. A GitHub Action builds it from the repository on each push and publishes it to
GitHub Pages under the `animation-studio.unysonplus.com` subdomain. A server only becomes necessary for
accounts and cloud saving, which come late in the [roadmap](./roadmap.mdx).

### The scene file

Everything rests on one data format, the **scene file** (JSON). It lists:

- **Tracks**, stacked like layers.
- **Clips** on each track. A clip is one preset placed at a time, with its own settings (text, image,
  colours, duration, easing).
- **Keyframes**, for anything animated by hand rather than by a preset.
- **Assets**: images, fonts and 3D models the scene uses.
- **Breakpoints**: the stage shape and any per-device overrides (see below).

The player reads a scene file and builds one GSAP timeline from it. Each preset is a small function that adds
its tweens to that timeline at the clip's start time. Because the timeline is the single source of truth, the
same scene file drives the editor's preview, the exported HTML, the page-builder element, the AI and, later,
video export.

**Every timeline is seekable and repeatable.** Scenes use no unseeded randomness and no real-time physics, so
any frame can be shown exactly at any moment. That keeps scrubbing frame-accurate in the editor and makes
thumbnails and video export possible later.

### Presets

Presets are the building blocks people drag in: text entrances (split, slam, scramble, stretch, glitch),
shape and line reveals, image wipes, counters, backgrounds, and 3D objects. They share a library with the
[Animation Engine](/animation-engine), so an effect built once is available in both places.

## The stage

A scene plays inside a **stage**: a box with a set shape, like a video frame. You design on a fixed canvas and
it plays the same everywhere. A single 16:9 box doesn't work for website heroes, though:

- On a 1920px-wide monitor, a 16:9 stage is 1080px tall, but the browser window is only about 950px tall
  once tabs and the address bar take their share.
- On a 390px-wide phone, the same stage is 219px tall, and large headline type becomes fine print.

So the stage is responsive in three ways.

1. **A shape per breakpoint.** Desktop, tablet and mobile each have their own aspect ratio (for example 16:9,
   4:3 and 4:5). There is one timeline; each breakpoint can override position, size and type size.
2. **A height mode per placement:**
   - **Ratio**: pure video behaviour. The stage keeps its shape, and the page scrolls if it is taller than the
     window.
   - **Ratio, capped to the window**: the stage never grows taller than the window minus the site header. This
     is the default for heroes, so the whole animation is on screen at first load.
   - **Fill the window**: exactly one screen tall, whatever its shape.
3. **A safe area.** The editor shows a central safe zone, as video editors do. Key text stays inside it and
   backgrounds bleed to the edges, so nothing important is cut off when a height mode trims the stage.

Sizes and positions are stored relative to the stage width (CSS container units) rather than by scaling a
fixed-size box. Text stays sharp and selectable, and the stage lays out like any other section.

## Exports

A finished scene can leave the Studio in three ways:

- **A standalone HTML file**: open it, host it, or send it.
- **An embed snippet** for any website.
- **A Unyson+ element**: a page-builder element plays the scene inside a Unyson+ page, with an
  **Open in Studio** button to edit it again.

Every export records the player version it was made with, so later changes to a preset never alter a scene
that is already published.

## AI

The AI runs through the [AI Dev Kit](/ai-dev-kit) on the user's own computer, using their own AI
subscription or a local model. The Studio sends the prompt to the kit, and the kit sends a scene back. The
Studio's server needs no AI keys and runs no AI calls, so there is no per-use cost to cover.

The AI writes a **scene file, not code**. It chooses presets from the catalogue and fills in their settings,
so everything it makes lands on the timeline as ordinary clips that can be moved, trimmed and edited by hand.
A **custom code clip** stays available as an escape hatch for effects no preset covers.

How the connection works in practice:

- **The browser asks first.** Chrome and other browsers ask before a website may reach apps on your own
  computer ("…wants to access other apps and services on this device"). Choose **Allow** once. If it was
  refused, the Studio's AI tab says so and shows where to turn it back on.
- **Only the Studio may call the kit.** The kit answers only the Studio's own address, so other websites cannot
  use your AI.

The AI Dev Kit's local dashboard will become a hub for all its jobs (Site Converter, AI Assistant connection
and Animation Studio), each showing whether it is connected.

## Still to decide

- **Free or paid.** Whether the Studio is free with the AI optional, or tied to accounts from the start.
- **Where projects are saved.** In the browser and as downloadable project files at first, with cloud saving
  and accounts added later.
- **Playback beyond heroes.** Click-to-advance slides and longer presentations come after the hero and section
  use case works.
