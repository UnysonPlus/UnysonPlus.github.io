---
sidebar_position: 9.95
title: Breakdown — how this reel was made
description: Turn a finished reel into a "how it was made" video, with the reel playing beside its storyboard, the beat on screen highlighted in sync, and a progress bar. For pitches, teaching and showing your process.
keywords: [video breakdown, storyboard, how it was made, behind the scenes video, reel breakdown, kinetic scenes, motion design process]
---

# Breakdown: how this reel was made

A **breakdown** shows a finished reel next to its plan. The reel plays on one side, in a phone frame (or a browser
frame for a landscape video). On the other side is its storyboard: one card per beat with its number, its kind, what it
says and when it starts. A highlight moves to the beat that is on screen, and a progress bar runs underneath.

It's useful for:

- **Pitching.** Show a client how their reel was put together, beat by beat, and what a series of them could look like.
- **Teaching.** Explain why a reel works: where the hook ends, how long each idea stays on screen, where the proof lands.
- **Showing your process** on your own channels.

The breakdown is an ordinary 16:9 Kinetic Scenes scene. Preview it in the Studio, change anything, and export it like
any other video.

## What you need

1. **The finished reel as a video file** (MP4 or WebM). If the reel is still a scene, export it first.
2. **Where its beats are**, in one of three ways (the first one available is used):
   - the **beats document** the reel was built from (see [Beats](./beats.md)) together with its scene: each card shows
     the beat's kind and words;
   - the **scene's markers**: each card is named after its marker, and shows the first words that appear in that part;
   - a **reference rhythm** (see [Learn the rhythm of a reel](./reference-rhythm.md)): the cards are its sections.

Up to 8 cards are shown. A longer reel is thinned to 8 evenly spread steps.

## Make one

From the AI Dev Kit's command line:

```sh
node studio-cli.mjs breakdown reel.mp4 --scene reel.scene.json --beats reel.beats.json
```

| Option | What it does |
|---|---|
| `--scene file.json` | The reel's scene (its markers, and with `--beats`, where each beat starts). |
| `--beats file.json` | The beats document the reel was built from. |
| `--rhythm file.reference.json` | Use a reference rhythm's sections as the steps instead. |
| `--title "…"` | The heading (default "How this reel was made"). |
| `--accent #B08968` | The colour of the highlight, step labels and progress bar. |
| `--out file.json` | Where to write the breakdown scene (default: `<reel>.breakdown.json`). |

AI agents use the `scene_breakdown` tool. If the reel hasn't been exported yet, the agent asks you before rendering it.

## The layout

- **The reel**, at the left, with its own sound. A vertical reel sits in a phone frame and a landscape one in a browser
  frame.
- **The title** and a small "Made with kinetic-scenes.unysonplus.com" line at the top right.
- **The cards**, each with a step number and kind in the accent colour, its start time, and its words on one line
  (shortened with "…" when long).
- **The highlight**, an outline that steps to the next card just before that beat starts and holds there.
- **The progress bar** under the cards, filling across the reel's length.

All text is sized to stay readable on a phone, and everything stays clear of the area a video player's controls cover.

## Limits

- It needs the reel as a video. A scene can't be embedded inside another scene.
- The cards follow the beats or markers you give it. Add markers in the Studio for a reel without any.
- Footage, photos and names in the reel are yours or your client's to share. A breakdown of a client's reel is for
  that client, unless they agree to it being shown elsewhere.
