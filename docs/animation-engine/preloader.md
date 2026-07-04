---
sidebar_position: 8.8
title: Preloader
---

# Preloader / Page Loader

Show a **full-screen loading screen until the page is ready**, then animate it away. Six styles, configured once site-wide. The overlay is printed at the very top of the page so it covers content from the first paint, and it's removed on load (after a minimum display time). Distinct from [Page Transitions](./page-transitions.md), which animate *route changes* — this is the *first* load.

## Where to find it

**Theme Settings → Animations → Preloader** → turn on **Enable preloader** and pick a style.

## Styles

| Style | What it shows |
| --- | --- |
| **Spinner** | A rotating ring. |
| **Progress bar** | An indeterminate sweeping bar. |
| **Bouncing dots** | Three bouncing dots. |
| **Counter (%)** | A number that counts up toward 100 as the page loads. |
| **Curtain** | Two panels that slide apart to reveal the page. |
| **Logo pulse** | Your logo, gently pulsing (needs a logo below). |

## Options

| Option | Notes |
| --- | --- |
| **Background** | The overlay colour (and the curtain panels). |
| **Accent** | Spinner / bar / dots / counter colour. |
| **Logo** *(optional)* | Shown above the animation — and centred for the Logo pulse style. |
| **Minimum display** | Keep the loader up at least this long so it never just flashes. |
| **Fade out** | How long the exit fade / curtain slide takes. |

## Performance & accessibility

- **Front end only**, and its CSS/JS **load only when enabled**.
- Locks page scroll while visible and **always releases** — a safety timeout removes the loader even if a resource stalls, so it can never trap the page.
- **Reduce motion** — the animated indicators hold still; the loader still appears and clears.

:::tip Brand moment
Set the **Background** to your brand's dark colour, add your **Logo**, and pick **Curtain** — the page opens like a stage. Keep **Minimum display** around 0.4–0.6s so it reads as intentional, not slow.
:::
