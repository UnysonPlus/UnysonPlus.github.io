---
title: Animated Counter
sidebar_position: 23
sidebar_custom_props: { icon: '/img/shortcode-icons/counter.svg' }
---

# Animated Counter

A number that counts up when it scrolls into view, with optional prefix/suffix, label and
full typography control. Tabs: **Content**, **Style**, **Animations**, **Advanced**.

<img src="/img/shortcodes/counter-backend.png" alt="Animated Counter on the Page Builder canvas" width="936" />

:::tip[💡 Web dev tip: the count-up motion should honour "reduced motion"]
Rapidly ticking numbers are exactly the kind of movement that can bother visitors who've told their operating system they prefer reduced motion, even though the number itself is harmless. UnysonPlus's Animated Counter respects that `prefers-reduced-motion` setting and shows the final value right away instead of forcing the animation, and the number is rendered as real text either way so it's never lost to a screen reader. [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
:::

## Live demo

**▶ [See the Animated Counter live on the demos site](https://demos.unysonplus.com/shortcodes/counter/)** — an interactive example you can click through.

## Content

<img src="/img/shortcodes/counter-content.png" alt="Animated Counter options panel — Content tab" width="840" />

| Option | Choices |
| --- | --- |
| **Number** | Value to count up to (e.g. `45280`, `96`, `4.2`) |
| **Start From** | Starting value (default `0`) |
| **Prefix** | Text before the number (e.g. `$`) |
| **Suffix** | Text after the number (e.g. `+`, `%`, `k`) |
| **Decimal Places** | 0 · 1 · 2 · 3 |
| **Thousands Separator** | On/Off |
| **Duration (ms)** | Count-up animation length (default `2000`) |
| **Easing** | Ease Out (fast → slow) · Linear · Ease In-Out |

## Style

<img src="/img/shortcodes/counter-style.png" alt="Animated Counter options panel — Style tab" width="840" />

**Alignment** (Left · Center · Right · Inherit), plus independent **Font** and **Color** for
the **Number**, **Prefix** and **Suffix**.
