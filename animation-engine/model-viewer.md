---
sidebar_position: 10
title: Model Viewer (3D)
---

# Model Viewer

An interactive **3D model** (glTF / GLB) visitors can orbit, zoom and inspect — with auto-rotate, image-based lighting, a ground shadow, a poster placeholder, hotspots and optional **AR**. Powered by Google's `<model-viewer>` (vendored, loaded only when used).

## Add it

Builder palette → **Media Elements** → **Model Viewer**. Upload a `.glb` / `.gltf` in the Media Library (the engine enables those file types) or paste a model URL.

## Options by tab

| Tab | What you configure |
| --- | --- |
| **Model** | Model URL or Media upload · Alt text · **Poster image** · Height · Material/color variant switcher |
| **Camera** | Orbit / zoom / pan toggles · Auto-rotate (speed, delay) · Starting angle · Field of view · Orbit limits |
| **Lighting** | Environment (Neutral / Legacy / Custom HDR / None) · Skybox · Tone mapping · Exposure · Ground shadow & softness |
| **Playback & AR** | Play embedded animation (clip name) · Interaction hint · **Enable AR** · AR placement (floor / wall) · AR scale |
| **Hotspots** | Add labelled hotspots (label, detail, link, 3D position) · fade behind the model |
| **Styling** | Background (transparent / solid) · Margin & Padding |

:::tip Getting hotspot positions
Hotspot positions (and normals) are the `x y z` values from the free model editor at [modelviewer.dev/editor](https://modelviewer.dev/editor/) — load your model there, click a point, copy the position.
:::

## Performance & accessibility

- **Loads only when used** — the model-viewer library (which bundles its own Three.js) is enqueued only on pages with a Model Viewer.
- **Poster image** shows while the model streams, and as a fallback when 3D isn't supported or reduce-motion is on.
- **Reduced motion:** auto-rotate is disabled automatically.
- **AR** appears as a "View in your space" button on supporting phones (WebXR / Scene Viewer / Quick Look).
