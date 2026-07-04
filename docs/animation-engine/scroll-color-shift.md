---
sidebar_position: 8.6
title: Scroll Color Shift
---

# Scroll Color Shift

Give each **Section** a target colour, and the **page background smoothly morphs** from one section's colour to the next as the visitor scrolls — the agency-site "scroll colour shift". One passive scroll check picks whichever section is crossing the middle of the screen and transitions the body colours. No library.

## Where to find it

Open a **Section** → **Animations** tab → **Scroll Color Shift** (a popover). Set the section's page colour. Do the same on several sections down the page and the background glides between them as you scroll.

Global on/off: **Theme Settings → Animations → Effects → Enable Scroll Color Shift**.

## Options

| Option | Notes |
| --- | --- |
| **Page colour** | The background the page morphs to while this section is in view (preset or custom). |
| **Text colour** *(optional)* | Also shift the body text colour so it stays readable on the new background. |
| **Transition** | How long the colour glide takes. |

:::info Use transparent sections
The effect colours the **page** behind your content, so it shows best on **full-bleed, transparent Sections** (no own background). A section with its own solid background will cover the shifting page colour.
:::

## Performance & accessibility

- **One CSS transition** on the body, driven by a single passive, rAF-throttled scroll handler.
- **Loads only on pages that use it.**
- **Reduce motion** — the colour still reflects the current section, but changes instantly instead of gliding.

:::tip Palette journey
Give your hero a deep colour, the next section a light cream, the next a brand tint — scrolling becomes a guided palette journey. Set a matching **Text colour** on the dark sections so copy stays legible.
:::
