---
slug: animation-studio-scene-links
title: "Where should a clickable button in an animated scene live?"
authors: [jon]
tags: [accessibility, animation, architecture]
date: 2026-10-16
description: The visible button is only a click area; the real link lives in the scene's hidden text, where keyboards, screen readers and search engines already find the scene's words. Focusing it rings the button on the stage.
---

**The question:** A scene's closing "Download free" button looks clickable but isn't. How should layers become links
that work for everyone, not just for a mouse?

<!-- truncate -->

## Context

The animated stage is hidden from screen readers (`aria-hidden`), because its words are split into letters, scrambled
and duplicated for effects. The scene's words are carried once, in reading order, in a visually hidden text block that
search engines index and screen readers read. Making a focusable link inside a hidden stage is an accessibility error:
keyboard users would land on something screen readers cannot see.

## Options considered

- **A real link on the stage, and stop hiding the stage.** Screen readers would then read the animated copies too,
  mid-scramble and twice.
- **A real link on the stage, focusable inside the hidden stage.** Simple, but it fails accessibility checks and
  confuses screen readers.
- **Two focusable links** (stage and text). Every link would be tabbed to twice.
- **One real link, in the text block; the stage only takes clicks.** The visible layer gets a click area kept out of
  the tab order, and the text block holds the focusable link with the layer's words. When it has keyboard focus, the
  player rings the matching layer on the stage.

## Decision

The last option. A layer's `link` (`href`, `newTab`, `label`) adds a click area on the stage and a real `<a>` in the
transcript, written identically by the player and by the WordPress element (so crawlers see it in the page's HTML). A
linked group reads as one link with the words inside it. Only web, same-site, anchor, `mailto:` and `tel:` addresses
are accepted; anything else is dropped with a warning rather than stopping the scene. In the editor, links are inert so
a click still selects the layer.

## Why

It gives exactly one link per button: one tab stop, one announcement, one thing for search engines to follow, without
exposing the animated copies to screen readers. Keyboard users still see where they are, because the focus ring is
drawn on the button they would click.
