---
sidebar_position: 9.85
title: Long videos
description: Make long videos in Kinetic Scenes, tutorials, explainers and walkthroughs over 10 minutes, as chapters joined into one video, with looping background music and a YouTube chapter list made for you.
keywords: [long video, tutorial video, explainer video, join videos, youtube chapters, loop music, kinetic scenes]
---

# Long videos

Kinetic Scenes isn't only for reels. A scene can be landscape 16:9 at 1920 × 1080 and up to **10 minutes** long, and a
longer video (a tutorial, a course lesson, a product walkthrough) is made of **chapters** joined into one file.

## Build it in chapters

Make each part of the video its own scene: an intro, one scene per chapter, an outro. Chapters are easier to preview, to
change and to check than one very long scene, and a change to chapter 3 means rendering chapter 3 again, not the whole
video.

1. Make the scenes, one per chapter. Keep them the same size and frame rate (for example all 1920 × 1080 at 30 fps).
2. Render each one: **Export › Video** in the Studio, or `node studio-cli.mjs render` with the AI Dev Kit.
3. Join them in order with the AI Dev Kit:

```bash
node studio-cli.mjs join 01-intro.mp4 02-setting-up.mp4 03-first-page.mp4 04-outro.mp4 --out tutorial.mp4
```

An AI agent connected to the kit does the same with the `video_join` tool.

### What the join does

- **Chapters that match are joined without re-encoding:** same size, frame rate and sound, which every render from the
  kit has. Nothing in the picture changes, and a 30-minute video joins in seconds.
- **Chapters that don't match are fitted to the first one** (letterboxed, never stretched) and encoded once. A chapter
  with no sound gets silence, so the picture and sound stay in step.
- **`--fade 0.5`** fades through black between chapters instead of cutting straight. A fade always means one encode.
- **The YouTube chapter list is written for you** next to the video, as `tutorial-chapters.txt`:

```text
0:00 Intro
0:42 Setting up
3:15 First page
8:02 Outro
```

Paste it into the YouTube description and the video gets chapters. The titles come from the file names (`02-setting-up`
becomes "Setting up"), or give your own with `--titles "Intro|Setting up|First page|Outro"`. YouTube shows chapters only
when there are at least three and each is 10 seconds or longer; the join tells you when that isn't the case.

## Music under a long video

Background tracks are usually two or three minutes long. Select the music clip and tick **Loop**: the track repeats from
its trim start to its end until the clip's **Length** runs out, or to the end of the scene when Length is empty. The
timeline marks a looped clip with ↻ and the Inspector says how many times it repeats. It loops the same way in the
Studio, in **Export › Video** and in kit renders.

- Give it a **fade out** so the last repeat ends gently.
- A loop restarts the track where it ends, so pick music that loops cleanly, or trim the start (**Trim start**) to a
  bar line.
- Beats found on a looped track mark the first pass only.

## Limits

- **One scene is at most 10 minutes (600 seconds).** Renders always cover the whole scene: a scene is never cut short. A
  render of a longer scene is refused with a message to split it into chapters.
- **Rendering takes time:** about real time to three times real time on a typical computer, so a 10-minute chapter
  takes 10 to 30 minutes. That is another reason to render chapter by chapter.
- **Keep a chapter to a few hundred layers.** The Studio plays a scene of about 1,500 layers at around 26 frames a second,
  and an extreme one of 3,000 at around 17; a normal reel plays at full speed. Opening a very large scene, or jumping far
  into it for the first time, also takes a few seconds. Renders are exact at any size: they never drop frames.
