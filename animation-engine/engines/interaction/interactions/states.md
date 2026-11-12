---
sidebar_position: 2
title: States
slug: /states
description: Named looks (Open, Active, Hidden…) an element can switch to, changed by Interactions on any element. Exclusive groups for tabs and accordions, a CSS class per state, and a preview on the Live Editor canvas.
---

# States

A **state** is a named look an element can switch to: *open*, *active*, *hidden*, *selected*. You set the look **once, on the element itself**. An [Interaction](./index.md) on **any** element then puts it in that state, takes it out, or toggles it.

That is what menus, drawers, tabs and accordions need:

- **Several controls, one panel.** An Open button, a Close button and a Toggle all drive the same panel. Each control doesn't need its own animation, and they can't disagree about whether the panel is open.
- **One at a time.** In a *group*, putting one element in a state takes it away from the others. Tabs and accordions work this way.
- **Restyle anything.** In a state the element also gets the class `upw-is-<name>`, so Custom CSS can change colours, borders or anything else.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/interactions/)** (scroll to *States*): a panel opened and closed by three buttons, and tabs built from three states.

## Setting up states

1. On the element that changes (the panel, a tab, a card), open **Animations → Add Animation → States**.
2. Fill in **State 1**: give it a **Name** (`open`, `closed`, `active`…) and the values the element has in that state. Values are relative to how it normally looks. **States 2 and 3** are optional; leave a name empty to not use it.
3. On the element that triggers the change (a button, a tab, a card), add an **Interactions** card. In a step, set **Do** to **Put it in a state**, **Take it out of a state** or **Toggle a state**, type the **State** name, and choose the target under **Animate** / **That match**, as for any step.

<img src="/img/animation-engine/states/states-card.png" alt="The States card on a tab button: State 1 named active, with its values, Start in this state, a Group and Inactive" width="1240" />

| State option | What it does |
| --- | --- |
| **Name** | The state's name. It is turned into a class-safe name: "Open menu" becomes `open-menu`. |
| **Move X / Y, Scale, Rotate, Opacity, Blur** | The element's look in the state. It animates there on the way in and back on the way out. |
| **Also add CSS class** | Extra classes added while in the state, besides `upw-is-<name>`. |
| **Duration**, **Easing** | How the change animates. |
| **Start in this state** | The element is in the state as the page loads, for example a panel that starts closed or the first tab that starts active. |
| **Group** | States with the same name and group are **exclusive**: putting one element in the state takes it away from the others in the group. |
| **Inactive in this state** | While in the state, the element can't be clicked or focused and is hidden from screen readers. Use it for a hidden panel, so invisible content is never in the way. |

### Step actions

| Do | Playing the Interaction forwards | Playing it backwards (hover out, a click toggle, leaving the screen…) |
| --- | --- | --- |
| **Put it in a state** | enters the state | leaves it |
| **Take it out of a state** | leaves the state | enters it |
| **Toggle a state** | switches it | switches it back |

<img src="/img/animation-engine/states/states-step.png" alt="An Interactions step set to Do: Put it in a state, with the state name" width="1240" />

State steps keep their place in the step order, delay and stagger, so they mix with ordinary *Animate* steps. A **Click** Interaction that toggles a state also sets `aria-expanded` on the clicked element.

:::tip
For buttons that should change a state *every* time they are clicked (an Open button, a tab), set the Interaction's **Clicking again** to **Plays it again from the start**. Use **Plays it backwards (a toggle)** for a single toggle button.
:::

## Example: tabs

- **Each tab** has a state `active` in the group `tabs`. The first tab has *Start in this state*.
- **Each panel** has the class `tab-pane tab-pane-1` (`-2`, `-3`) and a state `hidden` (Move Y 14, Opacity 0, *Inactive*). Every panel except the first has *Start in this state*.
- **Each tab's Interaction** is *On click* with *Clicking again: Plays it again*, and three steps:
  1. **This element:** *Put it in a state* `active`.
  2. **Elements on the page** `.tab-pane`: *Put it in a state* `hidden`, Stagger 0, starts *With the previous step*.
  3. **Elements on the page** `.tab-pane-1` (its own panel): *Take it out of a state* `hidden`, starts *With the previous step*.
- **To colour the active tab:** `.upw-is-active .tab-label { background: #00b295; color: #fff; }` in Custom CSS.
- **To make the panels sit on top of each other:** give their column the class `tab-panes` and use `.tab-panes { display: grid } .tab-panes > * { grid-area: 1 / 1 }`.

<img src="/img/animation-engine/states/states-tabs-demo.png" alt="The tabs demo: the Build tab is active (filled green) and only its panel shows" width="1250" />

## A state without a States card

A step can name a state the target never defined. The target then just gets or loses the class `upw-is-<name>`, with no animation. This is a quick way to drive pure-CSS changes from any trigger.

## Previewing a state

In the [Live Editor](/extensions/live-editor), each state has a **Show this state on the canvas** button. The options window steps aside, the element is centred, and it animates into the state from the values you have typed, even before saving. **Play again** repeats it, and **Back to the options** (or Esc) puts everything back.

<img src="/img/animation-engine/states/states-show-on-canvas.png" alt="The Live Editor showing a tab button in its active state on the canvas, with Play again and Back to the options at the bottom" width="1920" />

## For developers

- `upwIx.state( el, 'open' )` reads a state, and `upwIx.state( el, 'open', true | false )` sets it.
- Every change fires a bubbling `upw:state` event, with `detail.state` and `detail.on`.
- The current states are listed in the element's `data-upw-state` attribute.

## Limits

- States are switched by Interactions or by code. There is no URL or "remember the open tab" yet.
- Values add to the element's own transform. Opacity and blur replace its own values while it is in the state.
- **Reduce motion:** state changes happen instantly for visitors who ask for less motion.
