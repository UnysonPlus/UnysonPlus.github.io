---
slug: animation-studio-groups
title: "Groups, compositions or scenes: what should the Animation Studio call layers kept together?"
authors: [jon]
tags: [naming, animation]
date: 2026-10-15
description: The Animation Studio calls nested timelines "Groups". A group behaves like a precomposition (its own clock, opened with a double-click, moved in time as one) but takes the name web designers already use, because "scene" is already the whole timeline.
---

**The question:** Big scenes need a way to keep layers together, like compositions in a video editor, where you
double-click a composition to work inside it. What should the Animation Studio call that: a composition, a scene, or a
group?

<!-- truncate -->

## Context

In the [Animation Studio](/kinetic-scenes), the **scene** is the whole thing: one timeline, one file, one placement on a
page. Video tools let you nest a timeline inside another (a precomposition) so a headline and its underline can be
timed, moved and animated as one. The Studio needed the same, and the name decides how people understand it.

## Options considered

**Composition.** Familiar to video editors, but the Studio already calls the top-level timeline a scene, so it would
have both "scenes" and "compositions", and every new user would ask how they differ.

**Scene (nested scenes).** Consistent with the file, but confusing in practice: a scene inside a scene sounds like a
second page, not a part of this one.

**Group.** What website and design tools (Figma, Framer, Webflow) call a layer that holds layers. Most Studio users
come from building websites, not from video editing.

## Decision

Call it a **Group**, and give it the behaviour of a precomposition:

- It holds layers and has **its own clock**: its contents' clips start from the group's start, so moving the group in
  time moves its whole animation.
- **Double-click** opens it: the timeline shows its layers, a breadcrumb shows where you are, the rest of the stage is
  dimmed, and Escape steps back out.
- Presets on the group animate it **as a whole**, around its own frame.
- Grouping and ungrouping never move anything, on the stage or in time.

Reusable groups that update everywhere when edited are left for later, under their own name (components).

## Why

The word people already know should carry the feature, and "group" is that word for this audience. Using "composition"
would have added a second top-level concept next to "scene" for no gain; the precomposition behaviour comes along
regardless of the name.
