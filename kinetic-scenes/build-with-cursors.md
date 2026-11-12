---
sidebar_position: 2.47
title: Build with cursors
description: A team of coloured, named cursors builds the opening of your Kinetic Scenes video in front of the viewer, drawing each box with a live size badge and typing each line of text, like collaborators in a shared design file.
keywords: [cursor animation, multiplayer cursors animation, website building animation, design tool animation, figma style animation, typing animation, kinetic scenes]
---

# Build with cursors

**Build with cursors** turns the opening of a scene into a build. A team of coloured cursors, each with a name tag, puts
the layout together in front of the viewer, the way collaborators work in a shared design file:

- each box is **dragged out** with a crosshair, showing its size (`730 × 540`) over a grey placeholder, and then the
  real layer sweeps in from the top;
- each line of text is **typed** into its box, with the cursor turned into a text I-beam;
- when everything is in place, the cursors leave and the rest of your scene plays on.

<img src="/img/kinetic-scenes/build-with-cursors.png" alt="Three moments of a landing page being built: cursors named Ana, Kai and Mia draw boxes with size badges, a green panel sweeps in over its grey placeholder, and the heading is typed letter by letter" width="810" />

It works best on a designed layout: a landing page, a dashboard, a card grid, an app screen. It makes a strong opener for
a product video ("watch your page get built") and a good way to show that something is made of real, editable parts.

## How to use it

1. Lay out the scene as it should look when it is built (the opening frame). The layers you want built must be on the
   stage at the start.
2. Open **Tools › Build with cursors…** (it is also listed in **Help › What's new**).
3. Choose the options below and click **Build it**.
4. Play the scene. Everything the build made is ordinary layers and clips, so you can move, retime or delete any of it,
   and **Undo** takes the whole build back.

## Options

| Option | What it does | Default |
|---|---|---|
| **Cursors** | How many cursors work at once, 1 to 8. | 3 to 6, by how much there is to build |
| **Speed** | 0.5× (slow, easy to follow) to 3× (a quick flourish). | 1× |
| **Name tags** | A short first name beside each cursor (Ana, Kai, Mia…). Turn it off for plain coloured cursors. | On |
| **Soft clicks and typing sounds** | A quiet click as each box is drawn and typing while text is typed. | On |
| **Start at the playhead** | Build from the playhead instead of the beginning, for a scene that opens with something else first. | Off |

## What it makes

The build is written into the scene as ordinary parts you can edit, so it plays, scrubs and exports the same every time:

- **Cursor layers**, one per cursor (ids start `swarm-cursor-`), each with a **pointer colour** and a **name tag**. You
  can change both in the Inspector, or give any cursor of your own a colour and a name.
- On each cursor: **Move to** clips to each layer's top-left corner, **Drag** clips that draw the box as a crosshair,
  **Type** clips that show the I-beam while text types, and a last **Move to** that takes it off the stage.
- On each layer it builds: a **Build: draw** clip (the outline, the size badge and the placeholder, then the reveal) and,
  for text, a **Typewriter** clip. The entrance the layer had at the opening (a fade or rise in the first two seconds) is
  removed, because the build is now its entrance.
- Everything after the start of the build (other clips, markers, music, camera keys, the cover frame) moves later by the
  length of the build, and the scene gets that much longer.

### The presets on their own

You can use the three new presets by hand too, for one cursor drawing one thing:

| Preset | Works on | What it does |
|---|---|---|
| **Build: draw** | most layers | Draws the layer as a box: an outline grows from its top-left corner with corner handles and a live W × H badge over a grey placeholder, then the layer sweeps in (or fades in). **Then: leave it to the next clip** keeps the layer hidden for a Typewriter to type into. Options: outline colour, the part of the clip spent drawing, the reveal, the placeholder, the size badge. |
| **Drag** | cursor | Holds the button down and drags, as a crosshair, to a point on a layer (100 / 100 is its bottom-right corner) in a straight line. Move the cursor to the top-left corner first and put Build: draw on the layer over the same seconds. |
| **Type** | cursor | The cursor stays put as a text I-beam while text types. Put Typewriter on the text over the same seconds. |

The badge shows the size the box would have on a 1920-pixel-wide frame, as a design tool would show it.

## For AI agents

Agents use the MCP tool **`scene_swarm`** (options `cursors`, `speed`, `at`, `names`, `colors`, `sound`, `maxLayers`),
or the command line:

```
studio-cli swarm scene.json --cursors 4 --speed 1.5 [--at 2] [--no-names] [--no-sound] [--out built.json]
```

Both are in the [AI Dev Kit](/ai-dev-kit/) and make exactly what the Studio makes.

## Limits

- **Only the opening is built**: top-level layers that are on the stage when the build starts (or come in during its
  first two seconds). A layer that appears later keeps its own entrance.
- **A group is built as one box**, not piece by piece. To have its parts built one by one, ungroup them first.
- **Up to 30 layers** are built; any more keep their own entrances.
- **Once per scene.** A scene that already has a build refuses a second one: Undo it, or start from the scene before.
- Text sizes are estimated to time the typing, so a very long paragraph types quickly. Shorten it or slow the build.
- Pinned layers (a channel logo pinned to the stage) are left out.
