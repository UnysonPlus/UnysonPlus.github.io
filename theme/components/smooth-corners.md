---
title: Smooth Corners
sidebar_position: 4.5
slug: /components/smooth-corners
description: "Corner Smoothing gives rounded corners the continuous squircle curve of app icons instead of a plain quarter circle, on Button Sizes, Box Presets, Section Styles, Icon Badges, Image Styles and Table Presets. What each step looks like, how to use it, and which browsers draw it."
keywords:
  - squircle css
  - smooth corners wordpress
  - corner smoothing
  - corner-shape superellipse
---

# Smooth Corners

A normal rounded corner is a quarter circle: the straight edge meets the curve abruptly. App icons and many modern
designs use a **smooth corner** instead, one continuous curve (a *squircle*) that eases out of the straight edge. Every
preset that has a corner radius has a **Corner Smoothing** setting next to it, so buttons, cards, sections, icon badges,
images and tables can all have it.

<img src="/img/theme/smooth-corners-steps.png" alt="Four green squares with a 44 pixel corner radius: Off has quarter-circle corners, Soft, Squircle and Strong have progressively squarer, continuous corners" width="880" />

## Where it is

**Theme Settings → Components**, in each preset next to its corner radius:

| Preset | Where the setting sits | What gets the smooth corners |
| --- | --- | --- |
| [Buttons](./buttons.md) | each **Button Size**, under Border Radius | every button of that size |
| [Box Presets](./box-presets.md) | under Corner Radius | columns, cards and tables that wear the preset |
| [Section Styles](./section-styles.md) | under Border radius | sections with that style |
| [Icon Badges](./icon-badges.md) | under Corner Radius (Square and Rounded shapes) | the badge tile behind an icon |
| [Image Styles](./image-styles.md) | under Corner Radius | the image, its duotone and its scrim |
| [Table Presets](./table-presets.md) | under Corner Radius | the table's frame |

Because it lives on the preset, every element wearing that preset changes together, on every page.

## The four steps

| Step | Curve | Looks like |
| --- | --- | --- |
| **Off (round)** | a quarter circle (the default) | a classic rounded corner |
| **Soft** | a light continuous curve | rounded, with a gentler start to the curve |
| **Squircle** | the app-icon curve | the smooth corner of phone app icons |
| **Strong** | a squarer continuous curve | a rounded square, almost straight-edged |

The smoothing reshapes the corner **inside the same radius**, so a smoothed corner reads a little tighter than a round
one of the same size. To keep the same overall softness, raise the radius a few pixels when you turn smoothing on (for
example 12px round → 16px Squircle). A radius of 0 has no corner to smooth.

## How to use it

1. Open **Theme Settings → Components** and the preset you want, for example **Box Presets → Card**.
2. Set its **Corner Radius** (smoothing needs a radius to work with).
3. Pick **Corner Smoothing → Squircle**. The preset's preview updates as you choose.
4. Save. Every element using that preset now has smooth corners.

For an AI agent or an import, the value is a name stored on the preset as `corner_smoothing`: `''` (off), `soft`,
`squircle` or `strong`. It travels with the preset in **Import / Export** and in the Preset Library like every other
preset field.

## How it works

The generated preset CSS adds the browser's own `corner-shape` property to the rule that already sets the radius:

```css
.boxp-card { border-radius: 12px !important; corner-shape: superellipse(2) !important; }
```

| Step | Value |
| --- | --- |
| Soft | `superellipse(1.5)` |
| Squircle | `superellipse(2)` |
| Strong | `superellipse(2.5)` |

Image Styles pass it through a variable (`--imgs-corner`) like their radius, so the image, its duotone layer and its
scrim all share the same curve.

## Browser support and limits

- **Chrome and Edge 139 and newer** draw smooth corners. Other browsers do not support `corner-shape` yet and **show the
  plain rounded corner**: nothing breaks, the corner is simply round. No extra code or fallback image is loaded.
- **Shadows and borders follow the curve** in browsers that draw it.
- **Masks are separate.** An Image Style that uses a Shape / Mask (circle, arch, blob…) is shaped by the mask; smoothing
  only reshapes rounded corners. The mask library's own *Squircle* shape stays as it is.
- **Per-element radius selects** (the older Rounded / Circle choice on some elements) do not have smoothing; use a preset
  for it.
