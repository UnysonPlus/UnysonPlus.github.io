---
title: Common controls (Animations & Advanced)
sidebar_position: 2
---

# Common controls

Nearly every element shares two tabs — **Animations** and **Advanced** — with the same set of controls. They're documented here once; each element page links back to this reference instead of repeating them.

## Animations

Standard **entrance animation** — the element animates into view the first time it scrolls onto screen.

- **Effect** — the animation to play (fade, slide from a direction, zoom, …). *None* (the default) disables it.
- **Duration** — how long the animation runs.
- **Delay** — a pause before it starts (stagger siblings by giving each a slightly larger delay).
- **Offset** — how far into the viewport the element must scroll before it triggers.

For richer, continuously scroll-driven motion (pinning, parallax, scrollytelling, text effects) use the [Animation Engine](/animation-engine) instead — it drives motion from scroll position rather than a one-shot entrance.

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
