---
sidebar_position: 1
title: Interactions
slug: /interactions
description: Hover, click, page-load, in-view and scrolled-past triggers that animate an element and other elements on the page, in up to three steps.
---

# Interactions

**One trigger, many targets.** An Interaction starts on one element, when it is hovered, clicked, loaded or scrolled to, and plays a short list of steps. Each step can animate **a different element**: the element itself, elements inside it, or any element on the page.

That covers the patterns a single effect cannot:

- **Hover a card:** the card lifts, its picture zooms and its arrow slides.
- **Click a button:** a panel elsewhere on the page slides in, and a second click slides it away.
- **Scroll past the hero:** the header shrinks, or a badge further down reacts.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/interactions/)**. Every example there is live: hover cards, a click-to-open panel, a staggered in-view row, a page-load heading and a scrolled-past badge.

## Where to find it

Open any element's **Animations** tab, click **Add Animation**, and choose **Interactions** (under *Interaction*). Pick a trigger, then set up the steps.

An element can have **two** Interactions, for example a hover *and* a click. It needs the **Animation Engine** extension.

## Triggers

| Trigger | When it plays | Playing it back |
| --- | --- | --- |
| **On hover** | The pointer moves onto the element, or keyboard focus moves into it. | Plays backwards when the pointer leaves. |
| **On click** | The element is clicked. | **Clicking again:** plays it backwards (a toggle), plays it again from the start, or does nothing (plays once). |
| **On page load** | As soon as the page has loaded. | Plays once. |
| **In view** | A fifth of the element has scrolled into view. | **When it leaves the screen:** play it backwards (so it plays again next time), or keep the end state. |
| **Scrolled past** | The element's bottom has scrolled above a line *N* px from the top of the screen (80 by default). | Plays backwards when you scroll back above the line. |

## Devices and reuse

Two options sit above the steps of every trigger:

| Option | What it does |
| --- | --- |
| **Runs on** | **Desktop**, **Tablet**, **Phone** (all ticked by default). The breakpoints are the builder's own *Hide on* ones: phone under 768 px, tablet 768–991 px, desktop 992 px and up. On an unticked device the Interaction does nothing, and its targets keep their own look (no *From* start values either). It switches on and off as the window crosses a breakpoint. |
| **Runs for** | **This element**, or **Every element on the page that matches…** a selector (`.card`). With the second, every matching element gets its own copy of the Interaction. *This element* and *Elements inside it* in the steps then mean **that** element, so one Interaction set up on one card makes every card lift and zoom its own picture. |

To use *Runs for*, give the cards a shared CSS class in their **Advanced** tab (for example `card`), put one Interaction on any one of them, and set **Runs for** to *Every element on the page that matches…* `.card`.

In the [Live Editor](/extensions/live-editor), switch the device toggle to tablet or phone and click **Play** to check how it behaves at that width.

## Steps

Each trigger plays up to **three steps** (Step 1, Step 2, Step 3). Set a later step's **Animate** to *Not used* to leave it out.

| Option | What it does |
| --- | --- |
| **Animate** | The step's target: **This element**, **Elements inside it that match…**, or **Elements on the page that match…** |
| **Do** | **Animate it with the values below** (the default), or switch the target's [state](./states.md): **Put it in a state**, **Take it out of a state** or **Toggle a state**, with the state's name in **State**. |
| **That match** | The CSS selector for the target: a CSS ID (`#promo`), a class (`.card-arrow`) or a tag (`img`). With *Inside* and nothing typed, the element's direct children are animated. |
| **Direction** | **To these values** moves the target from how it looks now to the values. **From these values** starts it at the values and brings it back to how it looks now, which makes a reveal. Before the trigger, a *From* target waits at its start values. |
| **Move X / Move Y** | Moves it, in pixels. |
| **Scale** | 1 = its own size. |
| **Rotate** | In degrees. |
| **Opacity** | 0 = invisible, 1 = fully visible. |
| **Blur** | In pixels. |
| **Duration**, **Delay** | In seconds. |
| **Easing** | Smooth stop, Smooth start and stop, Speed up, Overshoot or Linear. |
| **Stagger** | When the selector matches several elements, the gap between each one starting (in seconds). |
| **Starts** | **After the previous step**, or **With the previous step** (they play together). |

The whole sequence plays backwards in reverse order, and a hover that ends halfway reverses from wherever it had got to.

## States

For menus, drawers, tabs and accordions, give the element that changes named **[States](./states.md)** (Open, Active, Hidden…) and switch them from Interactions on any element. Several buttons can then drive one panel, and a group keeps one tab active at a time.

## Naming the element to animate

A step finds its target by CSS selector, so the target needs a name:

- **In the Live Editor**, click **Pick on the page** under *That match*, then click the element on the canvas. If it has a CSS ID, that is used. Otherwise a short class such as `ix-b03cd5` is added to its CSS classes. *Animate* switches to match: *This element*, *Inside it* or *On the page*. **Esc** or **Cancel** stops picking, and the added class can be undone like any other edit.
- **Anywhere else**, give the target a **CSS ID** or **CSS class** in its **Advanced** tab and type it into *That match* (`#ix-panel`, `.card-arrow`).
- Tags work too: `img` for every picture inside a card, `h2` for a heading's title.

## Works with other effects

Interactions move elements with the separate `translate`, `scale` and `rotate` properties, which **add to** any transform the element already has. A card can still have its Entrance Animation, Hover effect or Scroll Motion, and the Interaction plays on top. Opacity and blur replace the element's own values while the step holds.

## Previewing

In the [Live Editor](/extensions/live-editor), **Edit** holds Interactions still so elements are easy to select. To watch one, select the element and click **Play**: it replays in place, so hover over it or click it there. *Scrolled past* needs scrolling, so use **Full preview** for that one.

## Limits

- The targets are found when the page loads. Elements added to the page later (for example by a filter or an infinite scroll) are not included.
- **On click** does not make an element focusable. To start a click Interaction from the keyboard, put it on a button or link.
- *From* reveals hide their targets until the trigger fires. Use them on content that is fine to wait for, not on the only copy of important text.
- **Reduce motion:** when a visitor asks for less motion (and *Respect "reduce motion"* is on in Theme Settings → Animation Engine), every step jumps straight to its end state.
- It runs on the browser's own Web Animations, with no library. Every current browser supports it.

## Example: a hover card

One Interaction on the card's text block, trigger **On hover**:

| Step | Animate | That match | Values | Starts |
| --- | --- | --- | --- | --- |
| 1 | This element | | Move Y −10, 0.35 s | |
| 2 | Elements inside it | `.ix-img` | Scale 1.12, 0.6 s | With the previous step |
| 3 | Elements inside it | `.ix-arrow` | Move X 10, Overshoot, 0.3 s | With the previous step |
