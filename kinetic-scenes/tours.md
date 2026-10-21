---
sidebar_position: 8
title: Product tours and code
description: Show a product working from screenshots — cursor, clicks, spotlight, callout, before and after, steps and hotspots — and explain code with typed, edited and run code layers, diagrams and flow lines.
---

# Product tours and code

## Product tours

Show a product working from screenshots, without a screen recording. A tour is a screenshot (or a few), a cursor that
moves and clicks, and something drawing the eye to what matters.

![A cursor moving to a button, with a spotlight and a callout](/img/kinetic-scenes/tour.jpg)

### The cursor

**+ Cursor** adds a pointer, drawn big enough to read in a video (about 4–7% of the stage width). Its X and Y are where its
**tip** starts, so put it off the stage and it enters.

- **Move to** sends it to a layer you pick (a point on it), or to a point on the stage to leave by, along a gentle curve
  with a pointer's easing. Over a link or a button it turns into a pointing hand.
- **Click** presses: the cursor dips, a ring ripples out and the button under it dips, all on one frame.
- The cursor always draws on top.

### Drawing the eye

- **Spotlight** dims everything but a layer. **Callout** points at it with a labelled pill, on the side you choose.
- **Select box** draws a coloured box with corner handles around a word or two.
- **Focus the camera on it** (a layer's settings) adds camera keys that glide in to frame the layer, hold and glide back.
- **Before and after** swaps a screenshot for a second one of the same screen on the frame a click lands.
- **Cut a piece out** (an image's settings) makes a button, panel or row of a screenshot its own layer, in the same place,
  ready to press, slide or glow.

### Steps

In the scene's **Steps** settings, write a walkthrough as a list of steps, each saying what changes (this button pops,
that panel slides in). The Studio turns them into clips and markers; AI assist can write them too.

### Hotspots and presentations

A link can **play from** a marker instead of leaving the page, so a visitor chooses what to see next. With **Advance: On
click**, the scene stops at each marker and waits (see [Presentations](./stage.md#presentations)).

## Code

A **Code** layer is an editor window or a terminal showing real code with syntax colours (from the file name, or a language
you pick), line numbers and an optional **Run** button. It is drawn from its clips, so every moment can be scrubbed and
exported exactly.

- **Type code** types lines in, in a natural rhythm with a caret, with an optional **autocomplete popup**.
- **Change code** turns the code into a new version the way a person edits: each changed part is selected and deleted,
  the new text typed in its place, new lines opened with Enter first, and the lines below slide to make room. Give the
  whole new version; only what differs is touched.
- **Highlight code** marks lines with a coloured band, or one word with a box.
- **Code note** puts a pill beside a line, joined by a dashed connector ("reads the name").
- **Run code** presses Run and shows the output in a panel under the code, a line at a time.

Window or terminal frame, dark or light theme, font size and line numbers are the layer's own settings.

![A code window: typed, then run](/img/kinetic-scenes/code.jpg)

## Diagrams and flow lines

- **Diagram:** nodes (boxes, pills, circles, commit dots, value boxes) and connections as data, each appearing at its own
  moment, nodes moving with their connections bending along, and a **tag** travelling from node to node (HEAD moving
  between commits). Good for flowcharts, architecture and how data moves.
- **Flow lines:** glowing curves joining two layers, attached however they move, with light pulses running along them.
- **Line** with **Draw**, and **Follow path** to send something along it.

See [Layers](./layers.md) for every setting.

## A tutorial with AI

In AI assist, choose **Plan first** and **Tutorial**: the AI writes the narration and names the exact code typed or
changed in each segment, then builds it, optionally on a voice-over it has spoken for you. See [AI](./ai.md).
