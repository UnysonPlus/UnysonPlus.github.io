---
sidebar_position: 1
title: Layout Animation
slug: /layout-animation
description: When the layout inside an element changes (an accordion opens, a filter hides cards, a panel is shown), its items glide to their new places instead of jumping.
---

# Layout Animation

**Things glide instead of jumping.** When the layout inside an element changes, its items move to their new places
smoothly: an accordion opens and the questions below slide down, a filter hides some cards and the rest close the
gaps, a panel appears and pushes the content under it gently aside. You set it once on the element whose contents
change; whatever makes the change (an [Interactions](/animation-engine/interactions) Set step, a
[state](/animation-engine/states), a filter, your own script) gets the glide.

**→ [See it on the Interactions demo page](https://demos.unysonplus.com/animation-engine/interactions/)** (scroll to *Layout Animation*).

## Where to find it

On the **section, column or element whose contents change**: **Animations → Add Animation → Layout Animation**.

- A grid of cards that gets filtered: put it on the element (or column) that holds the cards.
- An accordion: put it on each question for its own height, and on the column that holds the questions so the
  ones below glide.
- A list that grows: put it on the list.

## Options

| Option | Default | What it does |
| --- | --- | --- |
| **What glides** | Its items | **Its items, to their new places**; **Its own height, as it grows or shrinks** (an accordion's panel, a card that opens); or **Both**. |
| **Items** | automatic | Which elements count as items, as a CSS selector inside this element (`.card`, `li`). Empty = found automatically: the children of the first level inside it that holds several. |
| **Duration** | 0.45 s | How long a glide takes (0.1–1.5 s). |
| **Easing** | Soft land | The speed curve, from the shared curve picker ([springs included](/animation-engine/interactions#easing-and-springs)). |
| **New items fade in** | Yes | Items that appear (shown again, or added to the page) fade and grow in. |

## How it works

It remembers where every item sits. When something changes inside the element (an item is added, removed, shown,
hidden or resized, or an element gets a new class), the browser lays the page out again and reports it; before the
new layout is painted, each item that moved is drawn back where it was and eased to its new place. The movement is
a transform **added** to the item's own, so its Entrance, Hover or other effects keep working. An item caught in the
middle of a glide starts again from where it is on screen.

**Its own height** animates the element's height from the old value to the new one, with its contents clipped while
it moves, then lets it go back to its natural height.

Nested Layout Animations work together: while a question glides its own height, the column around it simply follows
it, instead of animating on top of it.

## Example: a filtered grid

1. Put a **Layout Animation** on the element holding the cards, **Items** `.card`.
2. On a button, add an **Interaction** on click: **Do → Set something instantly → Hide it**, **Animate: Elements on
   the page that match** `.card.is-blue`, **Stagger 0**, *Clicking again: Plays it backwards*.

Click: the blue cards disappear and the others glide into the gaps. Click again: they come back, fading in, and the
others glide back to make room.

## Limits

- **Removed items** disappear at once (they are no longer on the page to animate); the items around them glide.
- **Reduce motion:** visitors who ask for less motion see the new layout at once.
- **Window resizes** and the page's own loading (images, fonts) re-measure without animating, so a page never
  glides on its own.
- Changes made only through an element's inline `style` are seen through the size changes they cause (an item shown,
  hidden or resized). A change that moves items without resizing any of them, and without a class change, is not
  seen.
- The Live Editor's Edit canvas holds it still, like every other effect; use **Play** or **Full preview**.
