---
title: 3D Model
sidebar_position: 45
---

# 3D Model

An interactive 3D model — glTF or GLB — with camera controls, lighting, animation and AR on supported phones.

The block renders through the `model_viewer` element — the same PHP that runs in the page builder, so the front end is identical either way.

:::caution[Needs the Animation Engine extension]
This element ships with the **Animation Engine**, which is **inactive by default**. Activate it under
*Unyson+ → Extensions* and the block appears in the inserter.

With the extension off the block does not register at all — deliberately. A block that appeared but
had an empty sidebar and rendered nothing would be indistinguishable from one that is broken.
:::

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `model_url` | Model URL |
| `model_file` | Uploaded model file |
| `alt` | What a screen reader announces |
| `poster` | Image shown while the model loads |
| `height` | Viewer height |
| `camera_controls` | Let visitors rotate it |
| `disable_zoom` | Stop the wheel zooming the model |
| `auto_rotate` | Spin it slowly by itself |
| `rotation_speed` | How fast |
| `auto_rotate_delay` | How long to wait before spinning |
| `environment` | Lighting environment |
| `exposure` | Brightness |
| `shadow_intensity` | Shadow strength |
| `animation_autoplay` | Play the model's own animation |
| `animation_name` | Which animation, when it has several |
| `ar` | Offer View in your space on supported devices |
| `ar_placement` | Floor or wall |
| `hotspots` | Labelled points on the model |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The model is not loaded in the editor]
This is the expensive kind of inert: a live viewer would download the model file and spin up WebGL in
the editor, and do it again on every re-render. The canvas shows the **poster** — which is what a
visitor sees before the model loads anyway.

Set a poster. Without one, the viewer is a blank box until the file arrives, and model files are not
small.
:::

:::caution[`alt` is not optional in practice]
A 3D viewer is completely opaque to a screen reader. Without alt text, the element conveys nothing at
all to someone who cannot see it — describe the object, not the widget.
:::

:::note[Camera limits stay in the page builder]
`min_fov`/`max_fov`, `min_orbit`/`max_orbit` and `disable_pan` are not exposed here. A badly chosen
pair can leave a model that cannot be rotated to its own front, and the only way to find that out is
to try every angle — which is a page-builder job, not a sidebar one.

`variants_show` and `variant_default` are also left out: they depend on what the model file itself
defines, so a variant name typed without the file open is a guess.
:::

:::note[`disable_zoom` is usually right for a model inside a page]
Otherwise the wheel zooms the model when a visitor scrolls past it, and the page stops moving — the
same complaint people have about embedded maps.
:::
