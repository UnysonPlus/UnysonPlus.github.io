---
sidebar_position: 11.3
title: Blender — 3D models and shots from your AI agent
description: Let an AI agent such as Claude build anything in Blender and use it in Kinetic Scenes, as a live 3D model on your page or a transparent video over your scene, with nothing to open in Blender.
keywords: [blender ai, claude blender, blender to web, gltf, glb, 3d model for website, blender python, kinetic scenes]
---

# Blender: 3D models and shots from your AI agent

With Blender installed, an AI agent (Claude Code, Cursor, Codex, or Claude through the AI Dev Kit) can **build almost
anything in Blender and bring it straight into a Kinetic Scene**. You describe what you want; the agent writes the Blender
Python that builds it; the AI Dev Kit runs Blender **in the background** (no window to open, no add-on to start) and
brings the result into your scene in one of two ways:

| | What you get | Use it for |
|---|---|---|
| **A 3D model** (`blender_model`) | A glTF model (GLB) in a 3D layer. It turns, lights and moves **live** on your page and in video, with the 3D presets (orbit, spin, camera push…). | Products, logos in 3D, objects, characters' props, anything you'd like to spin and light. |
| **A rendered shot** (`blender_render`) | An animated shot rendered with a **transparent background** to a video, laid over your scene as footage. | Simulations, particles, smoke, liquids, cloth, a camera flying through a scene: anything a 3D model can't carry. |

## How it works

1. **The agent writes the Blender Python** (Blender's own scripting language) that builds the object or the shot:
   shapes, modifiers (bevel, subdivision, solidify, array…), materials, and for a shot, its animation or physics.
2. **The kit runs it in Blender in the background.** For a model it centres the object, sizes it to fit, applies the
   modifiers, exports a GLB with its materials and textures, and renders **four views** (front, three-quarter, side,
   above). For a shot it frames everything (unless the script sets a camera), renders every frame with Eevee and
   encodes a transparent WebM.
3. **The agent looks at the views,** fixes the script if anything reads wrong, and adds the result to your scene. Named a
   project, the file goes straight into that project's `media/` folder, ready to open in the Studio.

Colours come out exactly as given: scripts can use `hex_color('#00B295')`, which converts a web colour to Blender's
linear colour, and the kit renders with Blender's Standard view so brand colours aren't washed out.

## What you need

- **Blender 4.2 or later** on the same computer (free from blender.org). The kit finds it in the usual install folder,
  or set `BLENDER` to its path. With several versions installed it uses the newest **4.x**: Blender 5's renderer runs
  about three times slower in the background (measured on a GTX 1660 Ti: 3.5 s a frame against 1.3 s on 4.2). Blender 5
  works too when it is the only one.
- **The [AI Dev Kit](/ai-dev-kit)** (for the kit's tools) and an AI agent connected to it.

## Ask your agent

Examples of requests that use it:

- "Make a 3D model of a brass table lamp with a linen shade, and put it in my hero scene, slowly orbiting."
- "Build our logo as a glossy 3D object in brand green and spin it in at the start."
- "Render 4 seconds of green paint drops splashing, with a transparent background, for the intro."

## From the command line

```sh
node studio-cli.mjs blender model lamp.py --project "Spring launch"
node studio-cli.mjs blender render splash.py --seconds 4 --fps 30 --width 1080 --height 1080
node studio-cli.mjs blender import lamp.blend --objects "Lamp" --project "Spring launch"
```

A model prints its triangle count, materials and size, the four-view preview, and the 3D layer to add. A shot prints its
frames and the footage layer to add.

## Working in a live Blender window

Sometimes you want to watch the model take shape and adjust it yourself. For that, connect your AI agent to an open
Blender with **Blender's own MCP connector** (an add-on inside Blender plus a small server your AI app starts, from
[projects.blender.org/lab/blender_mcp](https://projects.blender.org/lab/blender_mcp); free, GPL-3.0). The agent builds
in your Blender window while you watch, and you can change anything by hand.

When it looks right, the agent saves the file (or you do) and brings it into Kinetic Scenes with **`blender_import`**:
the kit opens the saved file in a background Blender (your window is untouched), leaves out objects hidden from render,
cameras and lights, runs the [model checks](#the-model-checks), exports a web-ready GLB with four views and adds it as a
3D layer, into your project's `media/` folder. Fix what the checks report in Blender, save, and import again. To take
only part of the file, name the objects ("just the lamp").

`blender_import` also brings in models made in other tools or downloaded (GLB, glTF, FBX, OBJ, STL, PLY, USD) through
the same checks and export.

## The model checks

Every model is checked after it is exported, and what the check finds comes back to the agent with the four views:

| Check | Why it matters on a web page |
|---|---|
| **Open edges** on a part with depth | Faces are one-sided on the web, so a hole shows an empty inside. |
| **Inside-out parts** | A closed part whose faces point inwards renders dark or see-through. |
| **Loose vertices, faces with no area** | Leftovers that add weight and can flicker. |
| **No material** on a part | It shows plain white. |
| **Procedural textures** (noise, Voronoi, colour ramps…) | The model file keeps only plain material values, so the pattern disappears. |
| Note: **no bevels**, **all faces flat-shaded** | Hard edges with no bevel catch no light; flat curved parts look faceted. |

The agent fixes them and builds the model again. Behind the checks is a written checklist the agent follows (real
proportions, the silhouette first, bevels on hard edges, smooth shading, closed parts, materials a web page can carry,
a web-sized triangle count, then look and fix one thing at a time), drawn from the open, MIT-licensed blender-skills
pack and adapted to web scenes.

## Limits and tips

- **Keep web models light:** aim for under 100,000 triangles; the kit warns above 150,000 triangles or 6 MB; a Decimate
  modifier or 1,024 px textures fix it.
- **A model's own animation plays on the scene's clock** (player 0.0.51 and later): keyframe the objects in your script and the GLB carries the animation; the 3D layer plays it from its start, at its speed, looped or once (see [3D layers](./layers#animated-models)).
  For animation made in Blender (bones, physics, particles), render a shot instead.
- **Rendered shots take time** (seconds for a short simple shot, minutes for long or heavy ones). Ask for a short test
  first.
- **For hands-on work in a live Blender window,** see [Working in a live Blender window](#working-in-a-live-blender-window).
- **Simple objects** built from a few boxes, spheres and rings are quicker as a hand-built 3D layer.
