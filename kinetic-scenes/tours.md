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
- **Magnify** lifts a layer off the screen: it comes forward, larger, on a soft shadow, with a coloured ring if you give
  one, and stays until an Out clip.
- **Cut a piece out** (an image's settings) makes a button, panel or row of a screenshot its own layer, in the same place,
  ready to press, slide or glow.

### Animated screenshots

A still screenshot of a settings screen can come alive: its rows build in one after another, and the option you are
talking about lifts off the screen while everything else dims, with a label beside it.

<img src="/img/kinetic-scenes/animated-screenshot.jpg" alt="Three frames of an animated Theme Settings screenshot: the rows building in, the Site Width Mode row magnified with the rest dimmed and a label, then a second row labelled" width="810" />

**In the Studio:** add the screenshot as an image layer, then open **Animate this screenshot** in its settings.

1. **Find the rows.** The Studio looks for bands of content separated by plain background and marks each one on a small
   copy of the picture, numbered. **Rows closer than** (in % of the picture's height) keeps an option's label and its
   description together; raise it if one option is split into two rows, lower it if two options are joined.
   Or paste the rows the AI Dev Kit measured in the real page (below), which are exact.
2. **They arrive:** one after another sliding up, one after another landing like cards, or already there. Set when the
   first starts and the time **between rows**.
3. **Row to focus** (its number on the picture, 0 for none) and **Focus with**: Magnify and spotlight, Magnify,
   Spotlight, or only the label. **Label beside it** adds a Callout; **Hold for** says how long the focus stays before it
   lets go (0 keeps it to the end).
4. **Animate it.** Each row becomes its own layer (Row 1, Row 2…) in exactly the same place, the gaps they leave are
   filled with the screen's own background colour, and the clips are added. The scene grows to fit if it needs to.

Everything it makes is ordinary layers and clips: move a clip, change a label, or add a cursor clicking the focused row.

**With the AI Dev Kit:** its screenshot command measures the rows in the real page instead of guessing them, saves
each row as its own picture and the screen with the rows hidden (the real empty panel), and writes their places to a
`rows.json`. An agent builds the scene from those files; you can also paste `rows.json` into the Studio. See the kit's
`docs/screencasts.md` (Animated screenshots).

**Limits:** row finding works on flat interface screens (settings, lists, tables); on a photo or a busy gradient, mark
the rows with the kit or **Cut a piece out** instead. On a phone-shaped (9:16) scene make the screenshot nearly full
width and let it run off the bottom, or the rows are too small to read. Keep Magnify near 1.08 for a full-width row.

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
