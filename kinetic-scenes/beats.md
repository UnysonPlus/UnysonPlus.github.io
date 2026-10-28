---
sidebar_position: 9.9
title: Beats — a reel from a few lines
description: Describe a reel in a few lines (a headline, a photo, a split, a list, a proof, a closing frame) and Kinetic Scenes builds the whole branded scene, with words kept clear of the apps' buttons and the credit on the closing frame.
keywords: [reel template, video from text, storyboard to video, motion graphics, kinetic scenes, social reel, brand video]
---

# Beats: a reel from a few lines

Most reels follow the same shape: a hook, a few things worth showing, some proof, and a closing frame with how to find
you. **Beats** lets you write that shape as a short list. Kinetic Scenes then builds every layer, entrance and
transition in your brand. The result is an ordinary scene, so everything can still be changed in the Studio.

```json
{
  "title": "Spring menu",
  "format": "9x16",
  "brand": { "bg": "#121212", "fg": "#F4EFE8", "accent": "#B08968", "font": "Jost", "logo": "logo.png" },
  "beats": [
    { "kind": "headline", "text": "Fresh every morning.", "sub": "Your neighbourhood café" },
    { "kind": "photo", "image": "coffee.jpg", "text": "Coffee", "sub": "A new roaster each month" },
    { "kind": "split", "images": ["pastry.jpg", "food.jpg"], "text": "Pastry & food" },
    { "kind": "list", "text": "On the menu", "items": ["Coffee", "Pastry", "Lunch", "Cakes"] },
    { "kind": "close", "text": "Your Café", "lines": ["12 Main St", "Open from 7:30am", "@yourcafe"] }
  ]
}
```

## The brand

| Field | What it sets |
|---|---|
| `bg` / `fg` | Background and text colours. |
| `accent` | The colour of transitions, list marks, the split's divider, and the proof and close backgrounds. |
| `font` | Any Google font by name (loaded for you). |
| `logo` | A picture used by the logo and close beats. |
| `transition` | How each beat after the first arrives: `slash` (a diagonal line, the default), `wipe` or `fade`. |

`format` is `9x16` (the default), `1x1`, `4x5` or `16x9`.

## The beats

| Kind | Needs | What you get |
|---|---|---|
| `headline` | `text` (and `sub`) | Big words rising in, word by word, on the background, held with a slow drift. |
| `photo` | `image` (and `text`, `sub`) | A full-frame photo with a gentle push, a shade at the foot, and a caption. |
| `split` | `images` (two) | Two photos wiping in, one after the other, a divider line, and a label in a pill. |
| `list` | `items` (up to 6, and `text` as a title) | A title, then each item with a mark, arriving one by one. |
| `proof` | `text` (and `sub`) | A big number or rating on the accent colour, for example `★ 4.8` and "386 Google reviews". |
| `logo` | the brand `logo` or `image` (and `text`) | The logo popping in, with the name opening out below. |
| `close` | `text` and up to 4 `lines` | The closing frame: logo, name, details, and the credit. It must be the last beat. |

Every beat takes an optional `seconds`. Otherwise each kind has a sensible length (a headline 2.6 s, a list 3.8 s,
the close 4.5 s), and the whole reel can be stretched to a length you choose.

## Made for social apps

- **Clear of the buttons.** On vertical video, TikTok, Reels and Shorts cover the top of the screen, the bottom fifth
  (caption and account) and a strip on the right (likes, comments, share). Beats keeps every word between 12% and 75%
  down and away from that strip.
- **The credit stays.** The close beat puts "Made with / kinetic-scenes.unysonplus.com" at the foot of your own
  closing frame. Trimming it off would also cut off your address and handle.
- **Checked.** Every built reel runs through Check scene, which reports reading time, held frames and layout.

## Paced like a reel that works

Give it the rhythm of a reference reel (see [Learn the rhythm of a reel](./reference-rhythm.md)) and each beat
starts on one of that reel's moments, so the new video is paced the same way.

## Use it

From the AI Dev Kit's command line:

```sh
node studio-cli.mjs beats spring.beats.json --duration 20 --rhythm reference.reference.json
```

| Option | What it does |
|---|---|
| `--duration 20` | The whole reel in 20 seconds (the beats keep their proportions). |
| `--rhythm file.reference.json` | Beat starts snap to the reference's moments (within 0.6 s). |
| `--music file.mp3` | A music track for the reel. |
| `--out scene.json` | Where to write the scene (default: beside the beats file). |

AI agents use the `scene_from_beats` tool with the same document. Open the scene in the Studio to adjust anything,
then export it when it's right.

## Limits

- Beats is a fast first draft in a consistent house style, not a replacement for a hand-directed scene. Change any
  layer afterwards in the Studio.
- Photos are cropped to fill their frame. Choose pictures whose subject sits near the middle.
- Up to 6 list items and 4 closing lines, so the words stay readable on a phone.
