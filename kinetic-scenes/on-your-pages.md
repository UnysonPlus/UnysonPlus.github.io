---
sidebar_position: 12
title: Presets on your pages
description: Use Kinetic Scenes presets (Rise, Slam, Gravity drop, Strike, Jiggle and more) on ordinary page elements in Unyson+, with the Animation Engine's Kinetic Scenes Preset.
---

# Presets on your pages

A Kinetic Scenes preset doesn't have to live inside a scene. The Animation Engine's **Kinetic Scenes Preset** plays the
Studio's presets on the ordinary elements of a page: a heading, a paragraph, a picture, a button. It uses the same
player as the Kinetic Scene element, so an effect looks the same on a page as it does in the Studio, and you only build
it once.

## Adding one

1. Turn on the **Animation Engine** extension (Unyson+ → Extensions).
2. Open an element in the page builder and go to its **Animations** tab.
3. Under **Kinetic Scenes Preset**, pick a group: **Text**, **Reveal**, **Move** or **Emphasis**.
4. Pick the preset and when it plays.

| Setting | What it does |
|---|---|
| **Preset** | The animation. The menu lists the presets that work on a single element (39 of them). |
| **Plays** | When it scrolls into view (a quarter on screen), when the page loads, on hover or on click. |
| **Direction** | **In** brings the element in; **Out** takes it away (for presets that have both). |
| **Length (s)** | 0 uses the preset's own length. |
| **Delay (s)** | Wait before it starts, for example to follow another element. |
| **Replay** | Play again each time the element comes back into view, or on every hover or click. |
| **Settings (advanced)** | The preset's own settings as JSON, the same names as in the Studio, e.g. `{"by": "words"}` or `{"from": "left"}`. See [Presets](./presets.md) for each preset's settings. |

## What works where

- **Text presets** (Rise, Slam, Drop, Type, Flip, Count…) split the element's words and letters, like a text layer in a
  scene. Use them on headings and short text. The words stay readable to screen readers and search engines.
- **Reveal, Move and Emphasis presets** work on any element: a picture, a card, a button, a whole column.
- Presets that need a scene are not offered: ones that work with another layer, keyframes, a picture's pixels, sound or
  the scene's camera.

## Good to know

- **Reduced motion.** Visitors who ask for less motion see the element as it is, without the animation (unless the
  Animation Engine's reduced-motion setting is turned off).
- **Loaded only when used.** The small runtime and the player load only on pages that use a preset, and a page that also
  has a Kinetic Scene element shares one copy of the player.
- **Entrances start hidden.** An entrance set to play in view keeps the element at its starting point (often invisible)
  until it plays, so it does not flash first.

## For developers

The player exposes the same thing to your own code:

```js
const run = UnysonPlusScene.playPreset(document.querySelector('h1'), 'text-rise', {
  duration: 0.9,           // seconds (default: the preset's own)
  delay: 0.2,
  params: { by: 'words' }, // the preset's settings
  autoplay: false,         // then call run.play()
});
run.play();   // play (again)
run.reset();  // back to the start
run.destroy();// stop and put the element back as it was
```

Load the player from the Studio (`https://kinetic-scenes.unysonplus.com/player/0.0.44/scene-player.js`, with
`data-auto-mount="false"` on the script tag if the page has no scenes). Custom-code clips only run inside scenes.
