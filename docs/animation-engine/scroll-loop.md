---
sidebar_position: 8.5
title: Infinite Scroll Loop
---

# Infinite Scroll Loop

Loop a run of full-height **Sections** into a **seamless, never-ending scroll** — mark two or more in a row and the first re-appears seamlessly after the last, with optional section snapping. Smooth scrolling is powered by [Lenis](https://lenis.darkroom.engineering/); pair it with the [Parallax](/docs/animations/parallax) scroll effect on the media inside for the classic depth look (the "[infinite scroll parallax](https://tympanus.net/Tutorials/InfiniteScrollParallax/)" experience).

## Where to find it

It's a **Section-only** control (an infinite loop only makes sense on full-height sections, not columns or leaf elements): open a **Section** → **Animations** tab → **Infinite Scroll Loop** → pick **Infinite Loop** (default **Off**).

Global on/off: **Theme Settings → Animations → Effects → Enable Infinite Scroll Loop**.

## Options

| Option | Notes |
| --- | --- |
| **Infinite Loop / Off** | Turn the loop on for this section |
| **Snap to each section** | *On* = one section per scroll gesture, eased into place (the classic look); *Off* = free continuous smooth scrolling |
| **Snap duration** | How long the eased glide to each section takes (0.4–1.5s, default 0.8) |
| **Run on mobile** | Disable the loop + smooth scroll on phones (< 768px) if it feels heavy |

## Set it up

1. Build **2 or more full-height Sections** in a row (give each a min-height of 100vh).
2. On **each** section → **Animations** tab → **Infinite Scroll Loop → Infinite Loop**.
3. (Optional) For the depth effect, add media inside and give it the **[Scroll Motion](/docs/animations) → Parallax** effect.
4. Choose **Snap** on/off and **Save**.

As you scroll past the last section, the first re-appears seamlessly — the scroll never ends.

:::caution Where does the footer go?
An infinite loop has no natural end, so a footer placed after the looped sections can't be reached by scrolling. Keep the loop to a self-contained set of sections (e.g. a hero/showcase), and put reachable content — including the footer — on a page **without** the loop, or outside the looped run.
:::

## Performance & accessibility

- **Front end only** — the loop and smooth scroll are ignored inside the Page Builder so editing stays normal.
- **Loads only when used** — Lenis + the loop runtime enqueue only on pages with a looping section.
- **Reduced motion** — visitors who prefer reduced motion get plain, normal scrolling (no loop, no smoothing).
- **Mobile** — honours the per-section *Run on mobile* switch.
