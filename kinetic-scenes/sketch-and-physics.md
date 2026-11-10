---
sidebar_position: 2.46
title: Hand-drawn shapes and physics
description: Draw shapes in wobbly pencil with scribbled fills, and drop layers so they fall, bounce and pile up like real objects, in Kinetic Scenes. Both play and export the same every time.
keywords: [hand drawn animation, sketch style motion graphics, rough sketch shapes, physics animation, falling objects animation, kinetic scenes]
---

# Hand-drawn shapes and physics

Two tools for scenes that shouldn't look computer-perfect. **Hand-drawn** redraws shapes in pencil, and **Drop with
physics** makes layers fall and pile up like real objects. You can use them together.

<img src="/img/kinetic-scenes/sketch-physics.png" alt="Three moments of hand-drawn shapes falling, tumbling and settling in a pile" width="540" />

Both play the same on every viewing and export, so what you preview is what you get.

## Hand-drawn

Select a rectangle or circle and click **Make it hand-drawn** in the Inspector. That adds a **Hand-drawn** clip that runs
for the whole scene, and the button goes away. Select the clip to change the options below.

You can also add it yourself from the Ambient presets. If you do, run the clip for the whole layer. Each shape keeps its
own scribble, and it uses the layer's fill colour unless you choose another.

| Option | What it does | Default |
|---|---|---|
| **Fill** | Scribble, Cross-hatch, Zigzag, Dots, Solid or Outline only. | Scribble |
| **Roughness** | How wobbly the lines are. 0 is ruler-straight. | 1.4 |
| **Bowing** | How much long lines curve. | 1 |
| **Line weight** | How thick the pencil is. | 1.6 |
| **Scribble gap** | The space between scribble lines. | 6 |
| **Scribble angle** | The direction of the scribble. | -41° |
| **Line colour**, **Fill colour** | Override the layer's own colours. | The layer's |
| **Redraws per second** | Above 0, the shape is redrawn a few times a second, like a flip book. Around 4 to 6 works well. | 0 |

**Sketchbook** is a [motion style](./motion-styles.md) built around this look, with handwritten fonts on a pale page.
For real watercolour, ink and charcoal instead of a quick pencil scribble, use [Painted](./painted.md).

## Drop with physics

1. Select the layers to drop. Hold Shift or Ctrl and click them on the timeline.
2. Move the playhead to where they should start.
3. Click **Drop with physics…** in the Inspector, or choose **Tools › Drop with physics**.
4. Set the options, then click **Drop them**.

| Option | What it does | Default |
|---|---|---|
| **Start from** | **Above the stage**, or **Where they are** on the stage. | Above the stage |
| **Floor** | How far down the stage they land. | 88% |
| **Bounce** | From a dead stop (0) to very bouncy (0.9). | 0.35 |
| **Time between drops** | The gap between each layer being let go. | 0.12 s |
| **Add a thud** | A soft sound on up to eight of the hardest landings. | On |

The motion is worked out once and written into each layer as ordinary **Keyframes** clips. That means you can adjust any
of it by hand, and **Undo** takes it all back. Dropping the same layers again replaces the earlier physics. If the
drop runs past the end of the scene, the scene gets longer to fit.

Your AI agent can do the same with the `scene_physics` tool, once your AI Dev Kit has been updated to include it.

### Limits

- It runs for up to 4 seconds. Anything still moving then stops where it is.
- Rectangles and perfect circles collide by their real shape. An oval, a picture or a word collides as a rectangle.
- A text layer with no width set has its size estimated, so it may overlap its neighbours slightly.
- Layers are simulated in the scene's main format. In other formats they keep the same motion, in proportion.
- Hand-drawn works on shape layers. It doesn't change lines, diagrams or pictures.

## Credits

Hand-drawn uses [Rough.js](https://github.com/rough-stuff/rough), and physics uses
[Matter.js](https://github.com/liabru/matter-js), both under the MIT licence. Matter.js only loads when you use the tool,
so it adds nothing to exported scenes.
