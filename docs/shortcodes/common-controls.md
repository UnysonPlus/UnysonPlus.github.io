---
title: Common controls (Animations, Effects & Advanced)
sidebar_position: 2
---

# Common controls

Nearly every element shares three tabs — **Animations**, **Effects** and **Advanced** — with the same set of controls. They're documented here once; each element page links back to this reference instead of repeating them.

## Animations

Standard **entrance animation** — the element animates into view the first time it scrolls onto screen.

- **Effect** — the animation to play (fade, slide from a direction, zoom, …). *None* (the default) disables it.
- **Duration** — how long the animation runs.
- **Delay** — a pause before it starts (stagger siblings by giving each a slightly larger delay).
- **Offset** — how far into the viewport the element must scroll before it triggers.

For richer, continuously scroll-driven motion (pinning, parallax, scrollytelling, text effects) use the [Animation Engine](/animation-engine) instead — it drives motion from scroll position rather than a one-shot entrance.

## Effects

Every element has the **same Effects tab** — the same visual effects on each, applied to that element as scoped inline CSS. Leave a control at its default to skip it; an element with an untouched Effects tab gets no extra styling.

- **Opacity** — fade the whole element (below 100%).
- **Blend Mode** — CSS `mix-blend-mode`: blends the element with whatever sits behind it (it needs something behind to blend with).
- **Outline** — a line drawn *outside* the box (width, style, colour, offset) **without affecting layout**, unlike a border.
- **Box Shadows** — stack one or more shadows (each with offset, blur, spread, colour and inset); later layers paint over earlier ones.
- **Transform** — 2D and 3D: Move X/Y, Scale, Rotate, Skew X/Y, Tilt X/Y (rotateX/Y) with a Perspective for the 3D tilts, and a Transform Origin.
- **Filters** — blur, brightness, contrast, saturation, grayscale, hue-rotate, sepia and invert.
- **Backdrop filters** — the frosted-glass set (blur, brightness, saturation, contrast) applied to what's *behind* the element; pair it with a translucent background.
- **Transition** — a duration, easing and which properties animate, so changes (on hover, or from an Interaction or State) ease rather than snap.
- **Cursor** — the mouse cursor over the element (pointer, grab, zoom-in, none, …).
- **Pointer events** — *Ignore the mouse* lets clicks pass straight through to whatever is behind.
- **Custom Properties** — CSS variables set on the element (e.g. `--gap: 20px`), usable by its own Custom CSS or its children.

These are **per-element** values applied inline. Where a **preset** owns the look — a Box Preset's shadow, a Button Preset's skin — set it on the preset instead, so every element wearing it stays in step; the Effects tab is for one element's own adjustments. For scroll- or pointer-driven *motion*, reach for the [Animation Engine](/animation-engine).

## Advanced

Per-element escape hatches and wrapper controls.

- **CSS Class** — extra class name(s) added to the element's wrapper.
- **CSS ID** — a unique `id` for the element (anchor links, custom CSS/JS targeting).
- **Custom CSS** — element-scoped CSS. The `selector` keyword resolves to the element's own `.u{hash}` scope class, and the rules are written to the per-page `page-{id}.css` (aggregated by `dynamic-css.php`), so they travel with the element and never touch other elements.
- **Responsive Visibility** — hide the element on phone / tablet / desktop independently.
- **Custom Attributes** — arbitrary `key="value"` HTML attributes added to the wrapper (e.g. `data-*`, `aria-*`).
- **Position** — CSS `position` (*Static / Relative / Absolute / Sticky / Fixed*) with offset fields, plus **Z-Index** for stacking order. Rendered as an inline `style=` on the element wrapper (Z-Index only bites with a non-static position).
- **Margin & Padding** — a spacing control (All Sides plus per-side overrides) for the element.

Some elements add their own Advanced field on top of these — for example, **Column** adds an **Inner Wrapper Class** (renders an inner `<div>` around the content carrying those classes). Those extras are noted on the element's own page.
