---
sidebar_position: 91
title: Research
description: What open-source animation editors and HTML video tools already exist, what each offers Kinetic Scenes, and why the Studio builds its own editor around a GSAP player.
---

# Research

Before planning the Studio, we looked for an open-source project to build on. None does the whole job:
there is no open-source, preset-driven timeline editor that exports standalone HTML. Several projects cover
part of it, and each shaped the plan.

## What exists

| Project | What it offers | What it lacks for the Studio |
|---|---|---|
| **Theatre.js** | The closest thing to the editor: a keyframe timeline and curve editor in the browser that animates page elements and three.js objects. | No preset library and no AI; it is a tool for developers more than a drag-and-drop editor. Development has slowed, and its editor package carries a stricter licence than its core. |
| **HyperFrames** | The closest thing to the AI side: scenes are plain HTML, CSS and GSAP, and it ships instructions for AI coding agents. Apache 2.0 licence. | Built for video: the end product is an MP4. There is no visual timeline editor. |
| **Remotion** and **Motion Canvas** | Mature tools for animation written as code, with frame-accurate rendering. | Video output. Remotion is built on React and needs a company licence for teams. |
| **GSAP** | The animation engine: timelines, easing, text splitting and scroll triggers. It is now free in full, including the plugins that used to be paid. | No visual editor of its own. |
| **Commercial browser editors** | Polished timeline editors for motion graphics, some with AI generation. | Closed source, and most export video rather than HTML. |

## What this settles

**Build the editor, don't fork one.** The part that matters most is the scene file: tracks, clips that
are presets with settings, keyframes and assets. The editor, the AI and every export are built around it.
Theatre.js's data model is keyframes on properties, which does not fit a clip-and-preset workflow, so it
serves as a reference for how a timeline should feel rather than as a base.

**GSAP is the engine.** It is free, fast and widely understood, and the [Animation Engine](/animation-engine)
already uses it. One GSAP timeline per scene keeps playback simple and makes every frame seekable.

**The AI writes data, not code.** The tools that generate animation with AI produce code, and editing that
code afterwards is the user's problem. When the AI picks presets and fills in their settings instead, every
result opens on the timeline as ordinary clips. This is the main difference between the Studio and the tools
above.

**Keep video export possible.** Because every timeline is seekable, the HyperFrames approach (a headless
browser stepping through frames and an encoder joining them) can be added later without changing the scene
file. It is on the [roadmap](./roadmap.mdx) as a later phase.

## Lessons

- **The data format outlives the editor.** Breakpoints, versioning and asset handling belong in the scene
  file from version 1, because changing the format after scenes are published is far harder than changing
  the editor.
- **Text editing on the canvas makes or breaks the feel.** Editors are judged on typing directly into the
  stage, snapping and undo. These get time early, not at the end.
- **Small exports are the selling point.** The player has to stay small, and 3D support loads only when a
  scene uses it.
