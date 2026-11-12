---
sidebar_position: 10
title: Model Viewer (3D)
slug: /model-viewer
---

# Model Viewer

:::tip[Try it live]
Orbit a real 3D model in the **[Model Viewer playground](./playground.mdx)** — drag to rotate a
sample product model, toggle auto-rotate, pick a starting angle and field of view, and tune the
lighting (environment, tone mapping, exposure, shadows). It runs Google's real `<model-viewer>`.
:::

An interactive **3D model** (glTF / GLB) visitors can orbit, zoom and inspect — with auto-rotate, image-based lighting, a ground shadow, a poster placeholder, hotspots and optional **AR**. Powered by Google's `<model-viewer>` (vendored, loaded only when used).

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/model-viewer/)** — an interactive showcase you can explore.

## Add it

Builder palette → **Animation Engine** → **Model Viewer**. Upload a `.glb` / `.gltf` in the Media Library (the engine enables those file types) or paste a model URL.

## Options by tab

| Tab | What you configure |
| --- | --- |
| **Model** | Model URL or Media upload · Alt text · **Poster image** · Height · Material / color switcher, with a **Default variant** |
| **Camera** | Let visitors orbit / drag · Disable zoom · Disable pan · Auto-rotate (speed, delay) · Starting angle · Field of view · **Zoom-in limit** / **Zoom-out limit** · **Min / Max camera orbit** |
| **Lighting** | Environment lighting (Neutral / Legacy / Custom HDR / None) · **Show environment as background** · Tone mapping · Exposure · Ground shadow & softness |
| **Playback & AR** | Play embedded animation (clip name) · Interaction hint · **Enable AR** · AR placement (floor / wall) · AR scale |
| **Hotspots** | Add labelled hotspots (label, detail, link, 3D position) · fade behind the model |
| **Scroll Choreography** | **Choreograph on scroll** — the model travels across the page as the visitor scrolls (see below) |
| **Styling** | Background (transparent / solid) · Margin & Padding |

## Scroll Choreography

Turn on **Choreograph on scroll** (Scroll Choreography tab) and the model leaves its box: it is pinned in a
fixed, transparent layer and its **position, rotation, size and opacity follow the scroll**, so it can drop
in, glide from corner to corner, spin and fade as the visitor scrolls past the following sections. While
it's on, drag-to-orbit and auto-rotate are off (the scroll owns the motion).

| Option | What it does |
| --- | --- |
| **Layer (z-index)** | −5…50 (default 2). The model's stacking order: give a section a *higher* z-index in its own settings to put its text in front of the model, a lower one to put it behind. |
| **Model size (%)** | 15–100 (default 60). The model box's base size, as a % of the smaller screen side; each keyframe's Scale multiplies it. |
| **Scroll length (screens)** | 1–10 (default 3). How many screen-heights of scrolling the whole choreography spans, from where the element sits. |
| **Scroll smoothing** | 0–90 (default 18). 0 locks the model to the scrollbar; higher values let it glide toward its target. |
| **Show choreography guide** | Shows a marker in the scroll for each keyframe while you set it up. Turn it off before publishing. |
| **Keyframes** | The model's pose at points in the scroll. Each has **At (scroll %)**, **X position** and **Y position** (−100…100 % of the screen), **Scale** (10–300 %), **Rotate — turntable** (−720…720°, past ±360 for several turns), **Rotate — tilt** (−80…80°), **Opacity** and **Easing** into the pose (Linear, Smooth, Ease out, Ease in). The model moves smoothly between them, in scroll order. |

:::tip[Getting hotspot positions]
Hotspot positions (and normals) are the `x y z` values from the free model editor at [modelviewer.dev/editor](https://modelviewer.dev/editor/) — load your model there, click a point, copy the position.
:::

## Performance & accessibility

- **Loads only when used** — the model-viewer library (which bundles its own Three.js) is enqueued only on pages with a Model Viewer.
- **Poster image** shows while the model streams, and as a fallback when 3D isn't supported or reduce-motion is on.
- **Reduced motion:** auto-rotate is disabled automatically.
- **AR** appears as a "View in your space" button on supporting phones (WebXR / Scene Viewer / Quick Look).
