---
title: "Tutorial: Asset swaps"
sidebar_label: "Tutorial — Asset swaps"
sidebar_position: 5
slug: /rive/asset-swaps
description: Step-by-step — replace the images (or fonts) a Rive file references with your own, from the UnysonPlus builder, a URL, or your data.
---

# Tutorial — Asset swaps

[Data binding](./data-binding.md) covers a file's **text, numbers and colours**. This is the other half: its **images and fonts**. A `.riv` can *reference* an image — an avatar, a product photo, a logo — instead of baking it in, and you replace it with your own at load. It's the **[asset-swap demo](https://demos.unysonplus.com/animation-engine/rive/)**, where three images are swapped from outside the file.

## The idea in one line

A Rive **referenced asset** is an image/font the file expects to be supplied at runtime. This element supplies it — from an upload, a URL, or your data — matched by name.

## Step 1 — Make the asset swappable (in Rive)

By default Rive **embeds** images and fonts inside the `.riv`. To swap one, the designer marks it **referenced** in the Rive editor: open the **Assets** panel, select the image/font, and set it to **Referenced** (a.k.a. "export" / "keep outside") before exporting. Note the asset's **name** exactly (e.g. `avatar.png`) — that's what you'll match.

:::note[Embedded vs. referenced]
An **embedded** asset ships inside the file and is used as-is. A **referenced** asset is a placeholder the runtime fills. Only referenced assets can be swapped; an embedded one is ignored by the swap (it keeps the baked-in version).
:::

## Step 2 — Add the swap

On the element's **Animation** tab, open **Swap file assets (images / fonts)** and add a row:

| Field | What to enter |
| --- | --- |
| **Asset name** | The name from the Rive **Assets** panel, exactly — e.g. `avatar.png`. |
| **Image** | Upload / pick the replacement from the Media Library. |
| **…or a URL** | A direct image **or** font URL (wins over the upload). Use it for a `.ttf` / `.otf` / `.woff` font, or a remote/CDN image. |

The demo swaps three image assets — `cat.jpg`, `sloth.jpg`, `flower.jpeg` — each with a different photo URL.

## Step 3 — Save and view

On load, the runtime fetches your image/font, decodes it, and hands it to the file in place of the referenced asset. Images go through `decodeImage`, fonts through `decodeFont` — the file just renders what you supplied.

## Where the image comes from

- **A Media Library upload** — the everyday case (a fixed avatar/logo).
- **A URL** — a remote/CDN image, or a font file.
- **Your data** — set the same swap at runtime from JavaScript for a per-user avatar or per-product photo. Asset swaps are applied at construction, so for a *changing* image, re-mount the element with the new URL, or bind an image-driven View Model where the file supports it.

## Tips

- The **name must match** the Rive Assets-panel name exactly (including the extension). A mismatched row is ignored — the file keeps its own asset.
- **Fonts** work the same way — reference the font in Rive, then point a row at a `.ttf` / `.otf` / `.woff` URL to re-brand the type.
- Same-origin images/fonts always load; a **cross-origin** URL must allow CORS (the browser fetches it).
