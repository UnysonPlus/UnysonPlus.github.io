---
sidebar_position: 8
title: Motion Sequence
slug: /motion-sequence
description: Play a Section's child Reveal and Stagger animations as one choreographed sequence, in order, on a single trigger — or scrub through them with the scroll.
---

# Motion Sequence

Normally every element's [Scroll Motion](/animation-engine/scroll-motion) reveal fires on its own as it scrolls into view. **Motion Sequence** turns a Section into one choreographed timeline: its children's **Reveal** and **Stagger** animations play **in order, one flowing into the next**, on a single trigger. The steps are the children; one **Overlap** setting decides how much they blend.

## Where to find it

It is a **Section** setting: open the Section → **Animations** → **Add Animation** → **Scroll** → **Motion Sequence**, and set it to **On — play in sequence**.

## How to use it

1. On each child that should take part (heading, text, button, cards…), add **Animations → Add Animation → Scroll → Scroll Effect → Reveal** (or **Stagger**).
2. On the **Section**, add **Motion Sequence** and turn it on.
3. The children now play one after another when the Section scrolls in, in the order they appear on the page.

Other Scroll Motion effects inside the Section (Parallax, Pin, Scrub and the rest) keep running on their own; only Reveal and Stagger join the sequence.

## Options

| Option | Default | What it does |
| --- | --- | --- |
| **Play the sequence** | On view (play once) | **On view (play once)**: the whole sequence plays once when the Section scrolls in. **Scrub with scroll**: the visitor's scrolling moves through the sequence forwards and back, and the Section pins while it does. |
| **Overlap between steps (s)** | 0.35 | How much each step starts before the previous one finishes (0–1.5). 0 = strictly one after another; higher = they blend together. |
| **Start point** | A little in (80%) | How far into view the Section is before it starts (On view only): **Default — near bottom of screen**, **As soon as it enters**, **A little in (80%)**, **When it reaches the middle**. |
| **Run on mobile** | Yes | No = on phones the children animate on their own instead (a lighter fallback). |

### Per element: "In a Motion Sequence"

Each child's Reveal or Stagger has an option **In a Motion Sequence**:

- **After the previous step** (default): plays in turn, using the Section's Overlap.
- **With the previous step**: starts at the same moment as the step before it, so two elements enter together.

It has no effect outside a Motion Sequence.

## Example

A hero Section with an overline, a heading, a paragraph and two buttons: give each a **Reveal** with Direction **Up (rise in)**, set the second button to **With the previous step**, and turn on **Motion Sequence** with Overlap 0.25. The text cascades in, and both buttons arrive together at the end.

## Limits

- Section only, and only Reveal and Stagger effects are sequenced.
- Steps follow the page order (the order in the builder).
- It uses the same Scroll Motion engine as the children, so a step looks the same whether it plays alone or in a sequence. **Reduce motion** is honoured.
