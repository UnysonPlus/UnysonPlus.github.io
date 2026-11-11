---
sidebar_position: 4
title: Exit Animation
slug: /exit-animation
---

# Exit Animation

The way out that pairs with an [Entrance Animation](/animation-engine/entrance-animation): an element animates **out as it scrolls off the screen**, and **back in when it returns**. Every Section, Column and element has it on the **Animations** tab, next to the entrance.

:::info[Core feature — not an Animation Engine module]
Like the Entrance Animation, Exit Animation is part of **core**, so it works even when the [Animation Engine](/animation-engine) is switched off.
:::

## Live demo

**→ [Exit Animations in the demos](https://demos.unysonplus.com/animation-engine/exit/)** — four live cards: scroll them off the top of the screen and back to watch them leave and return.

## Add an exit

Open any element → **Animations** tab → **Add Animation** → **Exit Animation** (filter by **Exit** to find it quickly). Or, inside an Entrance Animation card, click **+ Add a matching exit**.

The new card starts on **Reverse the entrance**, so it works straight away:

```
Animations  ▸  Entrance Animation: [ Zoom In ▾ ]
               Exit Animation:     [ Reverse the entrance ▾ ]   →  opens a grid of 44 exits
```

- **Reverse the entrance** plays the element's entrance backwards: Zoom In leaves as a zoom out, Fade In Up sinks back down. Change the entrance later and the exit follows it.
- **Pick a different exit** for a different way out: rise in, but leave with a bounce or a slide.

To remove the exit, click the card's **×**.

## The exits

**43 exits** plus **Reverse the entrance**, grouped like the entrances:

| Group | Exits |
| --- | --- |
| **Mirror** | Reverse the entrance |
| **Back Exits** | Back Out Down · Left · Right · Up |
| **Bouncing Exits** | Bounce Out (+ Down/Left/Right/Up) |
| **Fading Exits** | Fade Out (+ Down/Up/Left/Right, the *Big* variants, and the four corners) |
| **Flippers** | Flip Out X · Flip Out Y |
| **Lightspeed** | Light Speed Out Right · Left |
| **Rotating Exits** | Rotate Out (+ the four corners) |
| **Sliding Exits** | Slide Out Down · Left · Right · Up |
| **Zooming Exits** | Zoom Out (+ Down/Left/Right/Up) |
| **Specials** | Hinge · Roll Out · Jack Out Of The Box |

Every exit is an entrance played backwards (Hinge, already an exit, plays forwards), so an exit always matches the look of the entrances and adds almost nothing to the page.

## Options

Open the card to set:

| Option | Notes |
| --- | --- |
| **Plays when** | *It leaves the screen either way* (default) · *It scrolls off the top* (scrolling down) · *It scrolls off the bottom* (scrolling back up) |
| **Duration (seconds)** | 0 = the same length as the entrance (or 0.8 s when there is no entrance) |
| **Delay (seconds)** | Wait before the exit starts |
| **Item Order** | Galleries, grids and the Motion Gallery: *Last in, first out* (default) or *Same order as the entrance* |

## How it plays

- **Out while you can still see it.** The exit starts as the element's middle crosses 30% from the top of the screen (scrolling down) or 80% (scrolling up), so most of it is still in view, not hidden under a sticky header.
- **Back in when it returns.** Once its middle is back in the central part of the screen, the element animates in again: with its Entrance Animation, or, when it has no entrance, with the exit played forwards.
- **Only after it has been seen.** An element never exits before it has been on screen, so nothing near the edge animates out as the page loads.
- **Item by item on collections.** On galleries, grids, logo grids, posts, pricing tables, timelines, testimonials and every Motion Gallery design that shows its photos as cards, the items leave one after another (the entrance's *Stagger* sets the spacing), while the gallery keeps moving.
- **Takes over from Replay On Scroll.** With an exit, the entrance already plays again on every return, so the entrance's *Replay On Scroll* switch isn't needed.

## Without an entrance

An Exit Animation works on its own too. The element is visible from the start, plays its exit as it leaves, and comes back with the same effect played forwards. Pick an exit rather than *Reverse the entrance* here (with no entrance to reverse, that falls back to a plain fade).

## Limits

- **Motion Gallery on Scroll-scrub + Pin** keeps its own scroll-driven in and out (the gallery's Style-tab Entrance), so an Exit Animation there plays on the whole gallery once it unpins.
- **One-photo designs** (Reveal & Wipe, Device Cycler, Device Trio) and **Photo Scatter** animate as one block.
- **Attention seekers** (Pulse, Bounce, Shake…) have no hidden starting point, so *Reverse the entrance* on them falls back to a fade out.
- **In the builder** exits don't play; they play on the front end.

## Performance & accessibility

- **Loads only when used.** Exits reuse the entrance keyframes and the same small trigger script, loaded only on pages that use an entrance or an exit.
- **Reduced motion.** With `prefers-reduced-motion: reduce`, nothing animates and nothing is hidden.
- **No dead clicks.** A gone element doesn't catch clicks while it's hidden, and its text stays in the page for search engines and screen readers.
