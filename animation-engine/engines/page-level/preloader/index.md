---
sidebar_position: 8.8
title: Preloader
slug: /preloader
---

# Preloader / Page Loader

:::tip[Try it live]
Preview all 16 loader styles in the **[Preloader playground](./playground.mdx)** — pick a style,
set the colours, logo and timing, and watch it fade away to reveal the page.
:::

Show a **full-screen loading screen until the page is ready**, then animate it away. Sixteen built-in styles plus your own code, configured once site-wide. The overlay is printed at the very top of the page so it covers content from the first paint, and it's removed on load (after a minimum display time). Distinct from [Page Transitions](../page-transitions/index.md), which animate *route changes* — this is the *first* load.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/preloader/)** — an interactive showcase you can explore.

## Where to find it

**Theme Settings → Site-wide UX → Preloader** → turn on **Enable preloader** and pick a style.

## Styles

Seventeen to choose from: sixteen built-in styles, plus **Custom (code)**.

| Style | What it shows |
| --- | --- |
| **Spinner** | A rotating ring. |
| **Dual ring** | Two counter-rotating rings. |
| **Gradient ring** | A conic-gradient ring that spins. |
| **Bouncing dots** | Three bouncing dots. |
| **Fading dots** | Eight dots fading around a circle (the classic OS spinner). |
| **Orbit** | A dot circling a track. |
| **Equalizer bars** | Five bars pumping like an audio meter. |
| **Pulsing grid** | A 3×3 grid pulsing in a wave. |
| **Pulse** | A single disc growing and fading. |
| **Ripple** | Expanding concentric rings. |
| **Flip square** | A square flipping in 3D. |
| **Progress bar** | An indeterminate sweeping bar. |
| **Progress ring (%)** | A circular ring that fills toward 100 with the number inside. |
| **Counter (%)** | A big number that counts up toward 100 as the page loads. |
| **Curtain** | Two panels that slide apart to reveal the page. |
| **Logo pulse** | Your logo, gently pulsing (needs a logo below). |
| **Custom (code)** | Your own loader, from three code boxes (see below). |

:::info[Replaces the theme's preloader]
The UnysonPlus theme has its own basic preloader under the same **Site-wide UX** tab. When the Animation Engine is **active**, this richer one takes over and the theme's stands down automatically — so the two never stack. With the engine deactivated, the theme still provides its own "Site-wide UX" tab (Preloader · Scrolling · Scroll to Top), so nothing is lost.
:::

## Options

| Option | Notes |
| --- | --- |
| **Background** | The overlay colour (and the curtain panels). |
| **Accent** | Spinner / bar / dots / counter colour. |
| **Logo** *(optional)* | Shown above the animation — and centred for the Logo pulse style. |
| **Minimum display (s)** | Keep the loader up at least this long so it never just flashes (0–4, default 0.4). |
| **Fade out (s)** | How long the exit fade / curtain slide takes (0.2–1.5, default 0.5). |

### Custom (code)

Pick **Custom (code)** to build your own loader. Three boxes appear:

| Option | Notes |
| --- | --- |
| **Custom HTML** | The loader's markup, placed inside the overlay. |
| **Custom CSS** | Added in a `<style>` tag. The overlay sets `--pl-bg` and `--pl-accent` (your **Background** and **Accent**), so your CSS can use the same colours. |
| **Custom JS** | Runs after the markup. Call `window.upwPreloaderDone()` to dismiss the loader early; otherwise it fades on page load like the other styles (honouring **Minimum display** and **Fade out**). |

The code is output as written on the front end, so only administrators should edit it.

## Performance & accessibility

- **Front end only**, and its CSS/JS **load only when enabled**.
- Locks page scroll while visible and **always releases** — a safety timeout removes the loader even if a resource stalls, so it can never trap the page.
- **Reduce motion** — the animated indicators hold still; the loader still appears and clears.

:::tip[Brand moment]
Set the **Background** to your brand's dark colour, add your **Logo**, and pick **Curtain** — the page opens like a stage. Keep **Minimum display** around 0.4–0.6s so it reads as intentional, not slow.
:::
