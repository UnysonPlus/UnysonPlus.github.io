---
title: 3D Gallery
sidebar_position: 74
---

# 3D Gallery

Images arranged in a real WebGL scene — a ring, a wall, a sphere, a totem — that the visitor can spin
and explore.

The block renders through the `gallery_3d` element — the same PHP that runs in the page builder, so
the front end is identical either way.

:::caution[Needs the Animation Engine extension]
This element ships with the **Animation Engine**, which is **inactive by default**. Activate it under
*Unyson+ → Extensions* and the block appears in the inserter.

With the extension off the block does not register at all — deliberately, so it cannot appear as an
entry with an empty sidebar that renders nothing.
:::

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `source` | Where the images come from |
| `design_settings` | Which scene, and the settings that scene needs |
| `as_background` | Place the scene behind the section's content |
| `box_style` | Box / border preset |
| `shadow` | Card shadow |
| `captions` | Whether and where captions show |
| `caption_source` | Which media field the caption comes from |
| `click` | What a click does |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::caution[`as_background` changes what the block's height means]
It takes the scene out of the flow and puts it behind the section's content. The block's own height
then stops describing what you see, and the section's content decides the space instead.
:::

:::note[No WebGL runs in the editor]
A live 3D scene would hold a GPU context and run a render loop behind the editor, starting a fresh one
on every re-render. The canvas shows the element's static rendering; preview the page to spin it.
:::

:::note[The page builder's scene preview is not repeated here]
`design_preview` is a live scene the page builder draws inside its options modal. It is **value-less**
— it stores nothing, and its JS reads its sibling options out of that modal's DOM, which does not
exist in a block sidebar.

It renders nothing here, on purpose. The block canvas already previews the real element rendered by
the real PHP; a second approximate scene beside it would only be one more thing that can disagree.
:::

:::note[`shadow` is a box-shadow control]
Four offsets, a colour and an inset toggle, with a live sample — see
[`box-shadow`](/docs/options/option-types/box-shadow).
:::
