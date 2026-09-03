---
title: 3D Model Viewer
description: The Unyson+ 3D Model Viewer block — an interactive glTF/GLB 3D model with orbit controls, auto-rotate and AR, authored in the block editor and rendered by the model-viewer element.
---

# 3D Model Viewer

An **interactive 3D model** — load a `.glb`/`.gltf` file and visitors can orbit, zoom and (on supported devices) view it in **augmented reality**. Perfect for product showcases, characters and 3D art. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [3D Model Viewer element](/animation-engine/model-viewer) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/model-viewer/front.png" alt="The 3D Model Viewer block — an interactive 3D astronaut model" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Model (`model_url`, `model_file`) | The `.glb`/`.gltf` model to load, by URL or upload. |
| Camera (`camera_controls`, `camera_orbit`, `auto_rotate`, `min_orbit`/`max_orbit`, `field_of_view`) | Orbit/zoom controls, the starting angle, auto-rotation and limits. |
| Lighting (`environment`, `env_image`, `exposure`, `shadow_intensity`, `tone_mapping`) | Image-based lighting, exposure and contact shadow. |
| Background (`background`, `bg_color`, `skybox`) | Transparent, a solid colour, or a skybox. |
| AR (`ar`, `ar_placement`, `ar_scale`) | Enable "view in your space" on supported devices. |
| Playback (`animation_name`, `animation_autoplay`) | Play a named animation baked into the model. |
| Hotspots (`hotspots`) | Pin annotations to points on the model. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note Part of the Animation Engine
The 3D Model Viewer is an **Animation Engine** element. Activate the Animation Engine extension to use it.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above loads a `.glb` with orbit controls:

```html
<!-- wp:unysonplus/model-viewer {"upOptions":{"source":"url","model_url":"https://…/model.glb","camera_controls":"yes","camera_orbit":"-25deg 80deg 105%"}} /-->
```

## The 3D Model Viewer element

The block and the page builder's [3D Model Viewer element](/animation-engine/model-viewer) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
