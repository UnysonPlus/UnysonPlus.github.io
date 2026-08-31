---
title: Shape Dividers
sidebar_position: 9
slug: /components/shape-dividers
description: The Unyson+ Shape Dividers library — reusable SVG edge shapes picked for a Section's top/bottom edge.
---

# Shape Dividers

**Theme Settings → Components → Shape Dividers** is a library of reusable **SVG edge shapes** (waves,
slants, curves…) you pick for a Section's **Top** or **Bottom** edge. The shape is defined once here;
its **Color / Height / Flip** are set per Section.


![Theme Settings → Components → Shape Dividers](/img/theme/components/shape-dividers.png)

## How it's coded

An [`addable-box`](/options/option-types/addable-box) (`components-shape-dividers.php`). Each row
is a **Name** plus an **SVG** (an [`svg-code`](/options/option-types/code-editor) field — paste
markup or upload a `.svg`). Follow the shape-divider convention: `viewBox="0 0 1200 120"` with a single
`<path>`. **Scripts are stripped for safety.** Each collapsed row shows a live preview.

## The output

The chosen divider's `<path>` is rendered into the Section's top/bottom edge as an inline SVG, colored
and sized by the Section's own Color / Height / Flip settings (so the same shape can look different per
Section). The shape library is stored in Theme Settings; the render happens in the Section view.

## How it's picked

A Section's **Top Shape Divider** / **Bottom Shape Divider** controls (a `multi-picker`) list every
saved divider; picking one reveals its Color / Height / Flip.

## Related

- [Section shortcode](/shortcodes/layout-elements/section) · [Components overview](./index.md)
