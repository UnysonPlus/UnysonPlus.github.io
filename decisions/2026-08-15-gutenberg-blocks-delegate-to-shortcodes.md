---
slug: gutenberg-blocks-delegate-to-shortcodes
title: "How should Unyson+ elements appear in Gutenberg — ported, or delegated?"
authors: [jon]
tags: [architecture, extensions, shortcodes, javascript]
date: 2026-08-15
description: Offering Unyson+ elements to block-editor users could mean reimplementing them as native blocks, or exposing the existing elements through a thin bridge. Decision — every block is a dynamic block that delegates its render to the matching shortcode, stores its values in a single upOptions attribute, and builds its inspector from the option schema PHP hands over. Verified byte-identical output. Plus two consequences that only surface once you build one - the editor canvas is an iframe, which splits a block's assets (CSS inside, JS outside), and the preview must be inert rather than interactive.
---

**The question:** Some people want the block editor but still want the Unyson+ options
framework. Getting elements in front of them could mean porting them to native blocks —
`block.json`, React `edit`, attributes per option — or exposing the elements that already exist
through a bridge. Which, and what does the bridge actually have to do?

<!-- truncate -->

## Context

There are 77 shortcodes. Porting them means writing, and then maintaining, a second implementation
of each one: a second renderer, a second set of controls, a second place for a bug to live. The
moment the two implementations disagree — and they will — every downstream consumer (the converter,
presets, the template library) has to know which one it is looking at.

The framework already has the pieces to avoid that. Every shortcode declares options and a render
path. WordPress supports **dynamic blocks**, which render on the server at display time rather than
serializing markup into post content. And the option schema is data, so it can drive controls in more
than one renderer — the position already taken in
[the modernization plan](/docs/architecture/modernization-plan).

## Options considered

- **Port elements to native blocks.** Most "Gutenberg-native", and the only route to client-side live
  editing of the markup. But it doubles the element library, forks rendering permanently, and 77
  ports is a multi-year commitment that delivers nothing to existing users.
- **Iframe or modal the existing PHP options panel.** Every option type works on day one with zero
  duplication. But it feels bolted on rather than native, and it puts a Backbone/jQuery panel inside
  a React tree — precisely the coupling the modernization work is trying to reduce.
- **A dynamic-block bridge.** Blocks store values and delegate rendering to the shortcode; inspector
  controls come from the React control layer, driven by the same option schema. Native-feeling
  sidebar, one rendering path, and the control layer is work that was happening anyway.

## Decision

**Bridge, via dynamic blocks.** Concretely:

- **A block is a second authoring surface, never a second rendering path.** The render callback calls
  the shortcode and returns its output. Front-end HTML, enqueued assets and animation hooks are
  whatever the page builder already produces. Verified rather than assumed: rendering the same values
  through both paths produced **byte-identical output** (1,537 bytes each).
- **One `upOptions` object attribute** holds the whole value blob. Unyson option values are deeply
  nested (multi-picker, addable-box, builder); Gutenberg attributes want flat typed values. Rather
  than flatten and re-inflate — inventing a lossy mapping and a migration with it — the nested value
  is stored whole and handed to the shortcode untouched.
- **The inspector is generated from the option schema**, which PHP hands to the editor as a map of
  `fw_akg()` path → option schema entry. No block hardcodes its controls. Choice lists are read from
  the element's own registry, so adding a design updates the block's dropdown with no block code
  touched.
- **Edits are immutable and path-scoped**, so options the inspector does not expose round-trip
  untouched. A layout authored in the page builder and later opened as a block keeps every value the
  block does not show.
- **Blocks ship in their own extension**, inactive by default. The React control layer lives in
  **core**, because it is options-framework infrastructure that other admin surfaces need — core
  cannot depend on an optional extension.

## Two things that only surface once you build one

Both cost real debugging time and are the reason this entry exists.

### The canvas is an iframe, and it splits a block's assets

From WordPress 6.3, the editor canvas is a real `<iframe>` for `apiVersion` 2/3 blocks. That divides
a block's assets in two directions, and getting either wrong fails silently:

- **CSS must go inside the iframe.** `enqueue_block_editor_assets` loads into the *outer* document,
  so styles enqueued there never reach the preview — it renders unstyled, absolutely-positioned
  layers collapse into normal flow, and stacked images appear where an overlay should be.
  `enqueue_block_assets` is the hook WordPress replays into the iframe.
- **JS stays outside**, in the editor window, because the block's own script runs there. It reaches
  into the canvas by passing the iframe's document to the element runtimes.

`wp_enqueue_block_style()` looks like the tidy API for the CSS half and is **not** used: when
`wp_should_load_block_assets_on_demand()` is true — the default — it registers only a `render_block`
filter and returns before adding its editor hook, leaving the canvas unstyled with no error anywhere.

### The preview must be inert

The instinct is to make the preview behave like the front end. That is wrong, and it breaks the
editor. An element's own pointer handlers swallow the click that should *select* the block, and a drag
on an element's control becomes a Gutenberg **block** drag — the block fades and starts moving. The
editor and the element end up fighting over the same gesture.

A dynamic block's preview is a **picture of the element, not a working copy**. It is wrapped in
`Disabled` with an explicit `pointer-events: none`, and still initialised underneath so it reflects
the real design and starting state. Interactivity is the front end's job.

## Why

- **One rendering path is the whole point.** Byte-identical output is not a nice property, it is the
  property that stops the element library forking into two divergent implementations.
- **Adding the next block is mostly a PHP job** — declare a shortcode tag and the option paths to
  expose. That is what makes covering a 77-element library plausible at all.
- **It compounds with work already underway.** The React controls a block inspector needs are the same
  controls the admin modernization needs. Built once, on WordPress's own React, they serve both.
- **It is reversible.** Nothing about this forecloses porting an element natively later if a specific
  one earns it. The bridge is additive, and no saved content depends on it.

Status: **Accepted.** Proven end to end with the Before / After block; the pattern is the template for
subsequent blocks.
