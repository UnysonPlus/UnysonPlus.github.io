---
sidebar_position: 9.8
title: Learn the rhythm of a reel
description: Read the pacing of a finished reel (its cuts, its reveals and transitions, its sections) and put that rhythm on a new Kinetic Scenes scene as markers, so the new video is paced like one that already works.
keywords: [video pacing, reel rhythm, scene detection, cut detection, contact sheet, motion graphics timing, kinetic scenes, reference video]
---

# Learn the rhythm of a reel

A reel that works has a rhythm: something new arrives every second or two, the opening is often quicker than the
middle, and the ending holds still long enough to read. **Reference rhythm** reads that rhythm from a finished video,
explains it in plain words, and puts it on your own scene as markers, so you can place each part on the same beats.

Only the **timing** is taken from the reference. Its footage, design and words are never copied, so you can learn from a
reel you admire, or from the client's own best-performing one, and still make something entirely your own.

## What it finds

| | What it is |
|---|---|
| **Hard cuts** | Places where the picture changes at once, found with FFmpeg's scene detection. Two detections on neighbouring frames count as one cut. |
| **Motion peaks** | Moments where the picture changes most without a cut: a reveal, a wipe, a slide, a burst of text. In motion graphics these carry most of the rhythm, so a reel with no cuts at all still gets a full reading. |
| **Moments** | The cuts and motion peaks together, in time order. This is the reel's beat. |
| **Pace** | How often something new arrives (average and median), the shortest and longest beat, moments per 10 seconds, and how the pace changes, per 5 seconds. |
| **Sections** | 3 to 8 parts (hook, beat 1, beat 2…, ending), each starting on a real moment near an even split. |
| **Contact sheet** | One numbered frame from the middle of each shot, in order, to read the visual flow at a glance. |

The pace is summed up in one sentence, for example:

> 10 moments of change in 25.37 s (5 hard cuts, 5 reveals or transitions): steady, something new every 2.31 s on
> average (median 2.1 s, 3.94 per 10 s). It starts calm and speeds up.

## Use it from the command line

The tool is part of the AI Dev Kit's Kinetic Scenes tools (it needs FFmpeg):

```sh
node studio-cli.mjs reference reel.mp4
```

This writes `reel.reference.json` (the timing map) and `reel.reference.jpg` (the contact sheet) beside the video.

| Option | What it does |
|---|---|
| `--scene my-scene.json` | Puts the rhythm on that scene as markers, stretched to the scene's own length (a 30 s reference on a 20 s scene keeps the same proportions). |
| `--sections-only` | With `--scene`: marks only where each section starts, not every moment. |
| `--fit 20` | Writes the timing map stretched to 20 seconds. |
| `--threshold 0.2` | Cut sensitivity from 0 to 1. Lower finds softer cuts; the default suits most reels. |
| `--no-sheet` | Skips the contact sheet. |
| `--json` | Machine-readable output. |

## The markers it adds

Rhythm markers have the ids `r1`, `r2`, `r3`… and are labelled with the section they start (`beat 2`, `ending`) or
their number. They appear on the Studio's timeline like any other marker, so you can line up clips, reveals and words
with them. Running it again replaces the earlier rhythm markers and keeps every other marker.

## With an AI agent

Agents connected to the Kinetic Scenes tools get the same reading as the `video_reference` tool. It returns the
summary, the sections, every moment and the contact sheet as an image, and with a scene path it adds the markers to
that scene. A good habit for any reel made "like" another one: read the reference first, build the new scene on its
markers, then check it with the usual stills before handing it over.

## Limits

- It reads timing, not meaning: it knows *when* something changes, not *what* the shot shows. Look at the contact sheet.
- Very gentle changes (a slow fade, a small drift) may not count as a moment. Lower the threshold for softer cuts.
- A reference is a guide, not a template. Use its rhythm where it suits your content, and change it where it doesn't.
