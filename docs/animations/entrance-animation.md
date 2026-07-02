---
sidebar_position: 2
title: Entrance Animation
---

# Entrance Animation

A one-shot **"appear with…"** effect that plays when an element scrolls into view, powered by [Animate.css](https://animate.style/). Every Section, Column and element has it on the **Animations** tab. It's **always available** (part of core) — you don't need the Animation Engine for it, and it's independent of [Scroll Motion (GSAP)](./overview.md), so you can use both on the same element.

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

:::tip Entrance vs. Scroll Motion
Use **Entrance Animation** for a quick one-shot "appear". Reach for **[Scroll Motion (GSAP)](./overview.md)** (part of the [Animation Engine](/docs/animation-engine)) when you want scroll-*linked* motion — staggered reveals, parallax, pinning or scrubbing.
:::
