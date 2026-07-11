---
sidebar_position: 3
title: Entrance Animation
slug: /entrance-animation
---

# Entrance Animation

A one-shot **"appear with…"** effect that plays when an element scrolls into view, powered by [Animate.css](https://animate.style/) v4.1.1. Every Section, Column and element has it on the **Animations** tab.

:::info Core feature — not an Animation Engine module
Entrance Animation is part of **core** (it ships with the shortcodes framework), so it's **always available** even when the [Animation Engine](/animation-engine) is switched off. That's why it lives on its own here rather than under an engine module.
:::

:::tip Try it live
Preview all 56 effects in the **[Entrance Animation playground](./playground.mdx)** — pick an
effect, set speed / delay / repeat / loop / easing, and copy the generated sample.
:::

## Pick an effect

Open any element → **Animations** tab → **Entrance Animation**. The picker is a **popover of animated tiles** — each tile previews its motion with the effect name on it. Leave it on **None** for no entrance (nothing loads).

```
Animations  ▸  Entrance Animation: [ None ▾ ]   →  opens a grid of 56 animated effects
```

There are **56 effects**, grouped like Animate.css:

| Group | Effects |
| --- | --- |
| **Attention Seekers** | Bounce · Flash · Pulse · Rubber Band · Shake X · Shake Y · Head Shake · Swing · Tada · Wobble · Jello · Heart Beat |
| **Fading Entrances** | Fade In (+ Down/Up/Left/Right, the *Big* variants, and the four corners) |
| **Sliding Entrances** | Slide In Down · Left · Right · Up |
| **Zooming Entrances** | Zoom In (+ Down/Left/Right/Up) |
| **Bouncing Entrances** | Bounce In (+ Down/Left/Right/Up) |
| **Back Entrances** | Back In Down · Left · Right · Up |
| **Rotating Entrances** | Rotate In (+ the four corners) |
| **Flippers** | Flip · Flip In X · Flip In Y |
| **Lightspeed** | Light Speed In Right · Left |
| **Specials** | Hinge · Jack In The Box · Roll In |

## Options

Once you pick an effect, two more controls appear:

| Option | Notes |
| --- | --- |
| **Speed Preset** | Default (1s) · Slow (2s) · Slower (3s) · Fast (800ms) · Faster (500ms) |

Under **Advanced Tweaks**:

| Option | Notes |
| --- | --- |
| **Animation Delay** | Seconds to wait after the element enters view before it animates |
| **Custom Duration** | Override the length in seconds (leave 0 to use the Speed Preset) |
| **Repeat Count** | How many times it plays (ignored when *Loop Forever* is on) |
| **Loop Forever** | Run continuously — great with attention-seekers like Pulse or Bounce |
| **Replay On Scroll** | Re-trigger every time the element re-enters the viewport |
| **Easing Function** | Override the timing curve (Ease, Ease In/Out, Linear, Smooth, Overshoot, …) |

:::note Each effect remembers its own settings
Switching effects keeps the panel — the speed and advanced tweaks you set are remembered per effect.
:::

## Performance & accessibility

- **Loads only when used.** Animate.css and the tiny trigger script are enqueued **only on pages that use an entrance effect** — a page with none ships zero of those bytes.
- **Reduced motion.** Respects `prefers-reduced-motion: reduce` — the effect is skipped and content shows normally.
- **Flash-free.** Elements that start hidden use a guard so there's no flash of un-animated content, and they stay visible if scripts fail to load.
- **Editor-safe.** Entrance effects are suppressed inside the Page Builder canvas; they play on the front end.

:::tip Entrance vs. the Animation Engine
Use **Entrance Animation** for a quick one-shot "appear" — it's core and needs nothing switched
on. For scroll-*linked* motion (staggered reveals, parallax, pinning, kinetic text, hover, etc.),
activate the **[Animation Engine](/animation-engine)** and reach for its modules.
:::
