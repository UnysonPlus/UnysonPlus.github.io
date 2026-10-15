---
sidebar_position: 11.8
title: Studio Scene
slug: /studio-scene
description: Play a timeline motion-graphics scene made in the Unyson+ Animation Studio inside any Unyson+ page, as live HTML, and edit it in the Studio straight from the element.
---

# Studio Scene

Put a scene made in the [Animation Studio](/animation-studio) on any page: kinetic type, shapes and images animated on a
timeline, playing as **live HTML**. The words stay real text (sharp at any size, readable by search engines and screen
readers), the whole scene weighs a few kilobytes, and it has its own layout for desktop, tablet and mobile.

[See the live demo](https://demos.unysonplus.com/animation-engine/studio-scene/) on the demos site.

## Add it

Builder palette → **Animation Engine** → **Studio Scene**. Then either:

- **Paste a scene.** In the Studio, use **Export → Embed code** (or **Save** for the scene file) and paste it into the
  element's **Scene** field. Both work; the element reads the scene out of the embed code.
- **Open it in the Studio.** Click **Open in Animation Studio**. The Studio opens in a new window with this element's
  scene loaded (or your current Studio work, if the element is empty). Edit it, then click **Save to page** in the Studio's
  green bar: the scene comes straight back into the field. Update the page to keep it.

Under the field, a summary shows what is pasted ("Make it move": 7 layers, 7 s), or what is wrong with it.

## Layout tab

Each option starts at **Scene default**, which keeps what was set in the Studio.

| Option | What it does |
|---|---|
| **Height** | How tall the scene may grow: **keep the shape** (the page scrolls if it is taller than the window), **keep the shape, never taller than the window**, or **fill the window**. |
| **Header height** | Pixels left for a sticky site header when the scene is capped to, or fills, the window. |
| **Starts** | When the scene plays: when scrolled into view, or when the page loads. |
| **Loop** | Loop or play once. |

Visitors who have turned off animation in their system settings always see the scene's still frame instead.

## Good to know

- **Layouts follow the element's width, not the screen's.** In a half-width column, a scene uses the layout that fits
  that width (often its mobile one).
- **Nothing loads from outside your site.** The scene player ships with the plugin and loads only on pages that use the
  element. Web fonts named in the scene still load from their font service.
- **It plays alongside the rest of the Animation Engine**, including Scroll Motion, without interfering.
- **Scenes made in the Studio are versioned.** If the Studio's scene format changes, the element's player is updated with
  the plugin, and older scenes keep playing.
