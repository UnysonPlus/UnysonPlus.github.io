---
sidebar_position: 5
title: Kinetic Scenes Preset
slug: /kinetic-preset
description: Play any of the Kinetic Scenes Studio's text, reveal, move and emphasis presets on an ordinary page element — Rise, Slam, Gravity drop, Strike, Jiggle and 34 more.
---

# Kinetic Scenes Preset

**Kinetic Scenes Preset** plays one of the [Kinetic Scenes](/kinetic-scenes) Studio's animations on an ordinary page element: a heading that slams in letter by letter, a number that counts up like an odometer, a word struck through, a button that jiggles. It uses the same player as the [Kinetic Scene element](/animation-engine/studio-scene), so an effect you know from the Studio looks exactly the same on your page.

## Where to find it

Open any element → **Animations** → **Add Animation** → **Entrance** → **Kinetic Scenes Preset**. Pick a group tile, then choose the preset and its options.

## Presets

**39 presets** in four groups:

| Group | Presets |
| --- | --- |
| **Text** (14): words and letters | Rise · Slam · Stretch · Scramble · Typewriter · Blur in · Flip · Tracking · Count up · Carry in · Gravity drop · Knockout · Odometer · Running timecode |
| **Reveal** (9): in and out | Fade · Wipe · Iris · Slide · Grow · Stack · Fly-in strip · Soft wipe · Blinds |
| **Move** (5) | Pop · Zoom · Spin · Progress bar · Turn |
| **Emphasis** (11): draw the eye | Wave · Pulse · Shake · Float · Recolour · Glow · Burst · Strike · Jiggle · Tick · Sheen |

Presets that need a full scene (another layer, keyframes, sound, a picture's pixels or the camera) aren't offered here; use a [Kinetic Scene](/animation-engine/studio-scene) for those.

## Options

| Option | Default | What it does |
| --- | --- | --- |
| **Preset** | The group's first | The animation to play. |
| **Plays** | When it scrolls into view | **When it scrolls into view** (a quarter on screen), **When the page loads**, **On hover** or **On click**. |
| **Direction** | In | **In** brings it in; **Out** takes it away. Shown for presets that have both. |
| **Length (s)** | 0 | 0 = the preset's own length (up to 20 s). |
| **Delay (s)** | 0 | Wait before it starts. |
| **Replay** | Off | Play again each time it comes back into view (or on every hover or click). |
| **Settings (advanced)** | (empty) | The preset's own settings as JSON, with the same names as in the Studio, e.g. `{"by": "words"}` or `{"from": "left"}`. Only plain values are kept, never code. |

## Example

A hero heading: **Text → Gravity drop**, **Plays: When the page loads**, Settings `{"by": "words"}`. A "Save 30%" badge: **Emphasis → Jiggle**, **Plays: On hover**, Replay on.

## Limits

- **Text presets split the element's words and letters** (screen readers still read the words). Use them on headings and short text; on a block with pictures or buttons, the preset treats the element as one shape instead.
- **Reduce motion:** the element is left as it is.
- A page that also has a Kinetic Scene element shares one copy of the player.
