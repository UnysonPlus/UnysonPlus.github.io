---
sidebar_position: 9
title: Scroll → CSS Variable
slug: /scroll-var
description: Publish an element's scroll progress (0 to 1 as it crosses the screen) to a CSS variable you name, and drive any custom CSS with it.
---

# Scroll → CSS Variable

**Scroll → CSS Variable** writes an element's scroll progress to a CSS custom property you name: **0** as it starts crossing the screen and **1** when it has finished. What the number drives is up to your CSS: opacity, a transform, a colour, a clip-path, a gradient stop. Use it when none of the ready-made effects does exactly what you want.

## Where to find it

Open any element → **Animations** → **Add Animation** → **Scroll** → **Scroll → CSS Variable**.

## Options

| Option | Default | What it does |
| --- | --- | --- |
| **Variable name** | `--progress` | The CSS custom property to write. A leading `--` is added automatically, and the name is cleaned to letters, numbers, `-` and `_`. |
| **Axis** | Vertical (Y) | **Vertical (Y)** or **Horizontal (X)** scrolling. |
| **Progress range** | Cover | When 0 and 1 happen. **Cover**: from entering at the bottom to leaving at the top. **Enter**: until it is fully in view. **Center**: as the element's centre crosses the screen's centre. |

## Using it

Put the CSS in the same element's **Advanced → Custom CSS** (or a class on it). The value is a plain number from 0 to 1:

```css
/* Fade and rise in as it crosses the screen */
selector { opacity: var(--progress); transform: translateY(calc((1 - var(--progress)) * 40px)); }

/* A progress bar inside the element */
selector .bar { width: calc(var(--progress) * 100%); }
```

## Limits

- It only sets the variable. Nothing moves until your CSS uses it.
- The value is clamped to 0–1 and updated at most once a frame, only while the element is near the screen. It follows smooth scrolling automatically.
- No library, and it loads only on pages that use it.
- For a visible page-progress bar, use [Scroll Progress](/animation-engine/scroll-progress); for ready-made scroll effects, use [Scroll Motion](/animation-engine/scroll-motion) or [Scroll Keyframes](/animation-engine/scroll-keyframes).
