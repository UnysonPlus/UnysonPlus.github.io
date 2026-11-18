---
sidebar_position: 11
title: Restyle effects
description: Four Kinetic Scenes effects that change the style of what is already in your scene, with no new drawings - Silhouette, Pixel art, Line drawing and Low poly. Use them to show one mascot in several animation styles.
keywords: [silhouette effect, pixel art effect, line drawing effect, low poly effect, blueprint animation, mascot animation styles, kinetic scenes]
---

# Restyle effects

Four effects change the **style** of something that is already in your scene: a mascot, a picture, a logo, a group of
shapes. You draw it once, and an effect turns it into a silhouette, pixel art, a line drawing or low poly for as long
as you like. Nothing is redrawn by hand, and nothing is sent anywhere: the player does it while the scene plays.

<img src="/img/kinetic-scenes/restyle-mascot.jpg" alt="One mascot four ways: as he was drawn, as a black silhouette against a sunset with light eyes and mouth, as a white line drawing on blueprint paper, and as pixel art on a game level" width="900" />

Use them to:

- show **one mascot in several animation styles** in the same video (the picture above is one scene);
- make a character or a logo fit a style it was not drawn for (a blueprint, a sunset, a retro game);
- turn a photo into a low poly backdrop.

## The four effects

| Effect | What it does | Works on |
|---|---|---|
| **Silhouette** | The layer in one flat ink, its outline kept. The nearly white parts (eyes, teeth, a highlight) can stay in a second colour, so a face still reads. | Any layer, mascots included |
| **Pixel art** | The layer in square pixels with hard edges, like a 16-bit game sprite. It **stays** for the whole clip; **Pixelate** only resolves a layer in or out. | Any layer, mascots included |
| **Line drawing** | Only the outlines: a line wherever two colours meet and round the outer edge, in one colour. White lines make a blueprint, dark lines a pencil drawing. | Any layer, mascots included |
| **Low poly** | The picture rebuilt from flat triangles, each lit a little differently, like a 1990s 3D game. | Pictures and footage |

Silhouette, Pixel art and Line drawing work on **the whole layer as it is drawn at that moment**. That is why a
[mascot](./mascots.md) keeps talking, blinking and changing pose inside each of them.

## Add one

1. Select the layer (a mascot, a picture, a group…).
2. In the **Library**, open **Give it a look** and choose **Silhouette**, **Pixel art**, **Line drawing** or
   **Low poly**. They are also under **Emphasis**.
3. On the timeline, drag the clip's ends so it covers the part of the scene that should be in that style.
4. Change its settings in the **Inspector** (below).

The effect blends in over a quarter of a second and out again at the end of the clip. To change style several times,
put one clip after another and let them overlap a little, so one style blends into the next.

To ask your AI instead, name the effect and the moment: *"turn the mascot into a silhouette while it says 'at sunset',
then a white line drawing for the blueprint part"*.

## Settings

### Silhouette

| Setting | What it does | Default |
|---|---|---|
| **Ink** | The colour of the silhouette. | Near black |
| **Keep the light parts** | Leaves the nearly white parts (the whites of the eyes, teeth, a highlight) in a second colour. On a mascot the whole mouth stays light too, so you can see it talk. Turn it off for scenery. | On |
| **Their colour** | The colour of those light parts. | White |
| **How light counts as light** | Lower it when eyes or teeth disappear; raise it when too much stays light (a white shirt, pale skin). | 0.9 |
| **Blend in and out** | Seconds the effect takes to arrive and to leave. 0 switches at once. | 0.25 s |
| **Stay after the clip** | Keeps the look to the end of the layer. | Off |

### Pixel art

| Setting | What it does | Default |
|---|---|---|
| **Pixel size** | The size of one pixel, as a share of the stage width, so a preview and an export show the same blocks. | 0.7 |
| **Short palette** | Cuts the colours to that many shades of red, green and blue each (4 to 6 looks like an old console). 0 keeps every colour. | 0 (off) |
| **Grow in and out** | Seconds the pixels take to grow from nothing, and to shrink away. | 0.25 s |
| **Stay after the clip** | Keeps the look to the end of the layer. | Off |

### Line drawing

| Setting | What it does | Default |
|---|---|---|
| **Line colour** | One colour for every line. | White |
| **Fill** | A colour inside the outline. Empty leaves it see-through, so the background shows between the lines. | Empty |
| **Line weight** | The thickness of the lines, as a share of the stage width. | 0.18 |
| **Detail** | Higher draws a line at smaller colour differences (a lapel on a suit, a shadow). Lower keeps only the main outlines. | 0.8 |
| **Blend in and out** | Seconds the effect takes to arrive and to leave. | 0.25 s |
| **Stay after the clip** | Keeps the look to the end of the layer. | Off |

### Low poly

<img src="/img/kinetic-scenes/restyle-low-poly.jpg" alt="A photo of a desk with a keyboard, a mouse, a phone and two notebooks, and the same photo rebuilt from flat triangles" width="800" />

| Setting | What it does | Default |
|---|---|---|
| **Triangle size** | The size of the triangles, as a share of the stage width. Small keeps more of the picture; large is more abstract. | 3.2 |
| **Unevenness** | How far the corners are pushed off a regular grid. 0 gives tidy rows of triangles. | 0.6 |
| **Light and shade** | How differently neighbouring triangles are lit. | 0.14 |
| **Edges** | A colour draws the edge of every triangle (a wireframe). Empty draws none. | Empty |
| **Stay after the clip** | Keeps the look to the end of the layer. | Off |

The triangles are fixed, so a still picture holds still and footage moves through them. Transparent parts stay
transparent.

## Two styles made with them

<img src="/img/kinetic-scenes/styles-silhouette-low-poly.jpg" alt="The Ink silhouette style (a black figure, tree and hill against an orange sky and a pale sun) and the 90s low poly style (mountains, trees and a sun built from flat triangles)" width="800" />

Two [styles](./motion-styles.md) come with these effects, in the [Style library](./style-library.md):

- **Ink silhouette**: black shapes against a glowing sky and a low sun, figures you know by their outline.
- **90s low poly**: mountains, trees and clouds built from a few flat triangles, bright sky colours and chunky type.

That makes 51 styles in all.

## An example to open

**One Mascot, Many Styles** is a 19-second scene: Daniel, one of the [sample mascots](./mascots.md#the-sample-mascots),
talks while he turns into a silhouette, a blueprint drawing and a pixel sprite, each on the word that names it. It uses
three clips on one mascot layer and a background for each part. Build the same from any mascot:

```json
{ "preset": "silhouette",   "start": 6.2, "duration": 3.15, "params": { "fade": 0.25 } }
{ "preset": "line-drawing", "start": 9.1, "duration": 2.85, "params": { "color": "#ffffff", "weight": 0.2 } }
{ "preset": "pixel-art",    "start": 11.7, "duration": 2.65, "params": { "size": 0.8 } }
```

## Limits

- **Line drawing is made for flat drawn art**: a mascot, an icon, an illustration. A photo has edges everywhere and
  gives a busy drawing; lower **Detail** or use **Engraving** or **Manga ink** from the
  [video editing effects](./video-effects.md) instead.
- **Low poly works on pictures and footage only**, not on mascots, text or shapes. For a low poly character, use a
  picture of it.
- **Silhouette cannot tell a face from a shirt.** It keeps whatever is nearly white, so a white collar stays light
  with the eyes. Change **How light counts as light**, or turn **Keep the light parts** off.
- **Pixel art and Line drawing follow the layer when it moves or turns**, so the pixels of a spinning layer spin with
  it. Animate the position, not the rotation, when the grid should look fixed.
- Low poly reads the picture's pixels, so footage from another website must allow that (the AI Dev Kit's own server
  does). When it does not, the plain picture shows.
- The effects need player 0.0.71 or newer. The Studio, its previews and video exports have it. The Unyson+ Kinetic
  Scene element in WordPress gets it with the next Animation Engine update; until then a scene on a WordPress page
  shows these layers as they were drawn.
