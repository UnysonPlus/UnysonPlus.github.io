---
sidebar_position: 9.8
title: Make a reel from a video
description: Turn a long video — a talk, a product demo, a day's filming — into a short reel in Kinetic Scenes. The AI Dev Kit finds the sharp, steady, well-lit moments and what is talked about, cuts them together on the music's beat, and leaves every part as an ordinary clip you can change.
keywords: [video highlights, long video to reel, auto edit video, shorts from long video, kinetic scenes, ai video editing]
---

# Make a reel from a video

Give Kinetic Scenes a long video and a length; it finds the moments worth keeping and cuts them together into a reel.
Every part stays an ordinary footage clip, so the result is a starting point you edit, not a finished render you have
to accept or redo.

<img src="/img/kinetic-scenes/make-a-reel.jpg" alt="Three moments of a 15-second reel made from a 31-second video, each a different part of it" width="540" />

## How to use it

1. **Tools › Make a reel from a video…**
2. **Choose a video.** Anything the browser can play: a recorded talk, a product demo, a screen recording, phone footage.
3. Pick the **length** (15 to 90 seconds), the **shape** (vertical 9:16 for Shorts, Reels and TikTok, square, portrait
   4:5 or landscape), and whether each part gets a **title**.
4. **Make the reel.** The AI Dev Kit on your computer watches the video (a few seconds per minute of video; longer
   when it also transcribes the speech). The reel replaces the current scene; **Undo** brings your scene back.

Then finish it like any scene: add music from **Sounds**, use **Reframe to follow the face** on wide footage in a tall
reel, swap a part for a better moment by changing its start in the footage (the clip's offset), or trim one.

## What it looks for

Each second of the video is scored on:

| | What it means | Why |
|---|---|---|
| **Sharp** | detail in the picture | blurry and out-of-focus stretches lose |
| **Steady** | little change inside a shot | shaky or panning moments lose |
| **Well lit** | neither dark nor blown out | |
| **Talked about** | words being said | a reel keeps what the speaker says; needs speech recognition (below) |

- **Shots:** the cuts in the video are found first, and a part never crosses one (no half a shot of something else).
- **Picking:** the best-scoring stretches are taken first, kept apart, and spread over the whole video, then put back in
  the order they happened.
- **On the beat:** with music, each part lasts a whole number of beats, so the cuts land on the beat.
- **Each part** is a footage clip with a hard cut and a slow push-in (a keyframed 6% zoom) so held shots don't look
  frozen. Its name says where it came from and why it was picked (`Part 2 (10-13.21 s: sharp, steady, talked about)`).
- **Titles** come from the first few words said in the part. They are a first draft: rewrite them. Turn them off for a
  video that already has words on screen.

## Limits

- **Speech** needs speech recognition installed in the AI Dev Kit (select any audio clip, **Words**, **Install**). Without
  it the picture alone decides, and parts have no titles.
- It judges how a moment **looks** and whether something is **said**; it does not understand what is shown (a product
  being held up, a reveal). Check the parts and swap any that miss the point.
- The video is sent to the AI Dev Kit on your computer, never uploaded. Very large files (over about 500 MB) are best cut
  down first.

## For AI agents

```
studio-cli highlights talk.mp4 --length 30 --format 9x16 --music track.mp3 --out reel.json
```

`--part 3` sets the seconds per part, `--no-titles` leaves titles out, `--title` names the scene. The MCP tool is
`video_highlights`. Hand the scene over for preview; render only when asked.
