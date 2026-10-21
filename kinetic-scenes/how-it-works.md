---
sidebar_position: 14
title: How it works
description: How Kinetic Scenes is built — the scene file, the player, seekable timelines, the editor, hosting, and what runs on your own computer.
---

# How it works

## Three parts

| Part | Technology | Why |
|---|---|---|
| **The editor** (timeline, stage, panels) | React and TypeScript, built with Vite | A drag-and-drop timeline editor is a large interactive app that runs in the browser. It compiles to static files, so the server never runs Node.js. |
| **The player** (what an exported scene ships) | Plain JavaScript and GSAP, with three.js only when a scene uses 3D | It has to be small and work on any page, including inside WordPress. React stays in the editor and never ships with a scene. |
| **Hosting** | GitHub Pages | Published automatically from the repository on each push. The Studio needs no server of its own: it is static files, and the AI runs on each user's own computer. |

The AI, speech recognition, voice-overs, cutting people out of footage and video rendering run in the
[AI Dev Kit](/ai-dev-kit) on your computer. A server only becomes necessary for accounts and cloud saving.

## The scene file

Everything rests on one data format, the **scene file** (JSON, format `unysonplus-scene`). It holds the stage (layouts,
height mode, safe area, background, fonts), playback (trigger, loop, still frame, advance), the layers with their boxes,
per-layout overrides and clips, the audio, the camera keys, the markers, and for a video its formats and platform. The
**Scene file** tab in the Studio shows and edits it; the [published skill](https://kinetic-scenes.unysonplus.com/skill/)
documents every field.

The player reads a scene file and builds one GSAP timeline from it. Each preset is a small function that adds its motion
to that timeline at the clip's start. Because the timeline is the single source of truth, the same file drives the
Studio's preview, the exported HTML, the WordPress element, the AI and video export.

## Every frame is a function of time

Scenes use no unseeded randomness and no real-time physics, so any frame can be shown exactly at any moment. Effects that
look random (particles, grain, a glitch) use numbers fixed by the clip, the same on every play. That keeps scrubbing
frame-accurate, makes exact video export possible, and is tested: a self-test plays every preset forwards and then jumps
to hundreds of moments in random order, and every frame must match.

## Responsive by design

Sizes and positions are relative to the stage (container units), not a fixed-size box scaled down, so text stays sharp and
selectable and the stage lays out like any other section. See [Stage, layouts and playback](./stage.md).

## Versions

Each published player version stays online at its own address forever, and every export names the version it was made
with, so a published scene never changes when presets improve. The Studio always uses the newest.
