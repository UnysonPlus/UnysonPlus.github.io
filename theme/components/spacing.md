---
title: Spacing
sidebar_position: 12
slug: /components/spacing
description: The Unyson+ Spacing library — the values behind Bootstrap-style margin/padding utilities (.m-NAME, .p-NAME, .mt-NAME…) plus the gap scale.
---

# Spacing

**Theme Settings → Components → Spacing + Gap** defines the **values behind the margin / padding
utilities**. Each entry in the scale produces a complete set of Bootstrap-style classes, so the whole
site's spacing rhythm is editable in one place and every element's Spacing control offers the same
named steps.


![Theme Settings → Components → Spacing](/img/theme/components/spacing.png)

## How it's coded

An [`addable-box`](/docs/options/option-types/addable-box) stored under **`spacing_scale`**
(`components-spacing.php`), plus a `gap_scale` group for flex/grid gaps. Each row:

- **Name** — the slot suffix (e.g. `3` → `.m-3` / `.p-3`). Avoid Bootstrap-reserved names
  (`sm md lg xl xxl n1–n5 auto`).
- **Value** — any CSS length: `0.5rem`, `8px`, `calc(1rem + 2px)`…

## The output CSS

For each entry, `unysonplus_build_presets_css_string()` emits the **full family** of margin and padding
utilities — all-sides, per-axis and per-side:

```css
.m-{name}  { margin: {value}; }
.p-{name}  { padding: {value}; }
.mt-{name} { margin-top: {value}; }  .mx-{name} { margin-left: {value}; margin-right: {value}; }
/* …mb / ms / me / my, and the p* equivalents */
```

The presets stylesheet loads **after** Bootstrap, so these values override the framework defaults.
Written to the shared cached `presets-{hash}.css` — see the
[shared pipeline](./index.md#how-the-whole-system-works-shared-pipeline).

## How it's picked

Every element's **Spacing** control (the [`spacing`](/docs/options/option-types/spacing) option type)
offers the named steps; the element renders `.m{side}-{name}` / `.p{side}-{name}` classes.

## Related

- [`spacing`](/docs/options/option-types/spacing) option type · [Components overview](./index.md)
