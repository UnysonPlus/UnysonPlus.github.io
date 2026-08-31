---
slug: replacing-the-wp-media-modal-frame
title: "Was it worth replacing WordPress's media frame to get Backbone out of the core?"
authors: [jon]
tags: [architecture, javascript, back-compat]
date: 2026-08-15
description: Removing Backbone from fw.js looked like a two-call-site job until the options modal turned out to be built on wp.media.view.MediaFrame — which is Backbone, and which a Backbone object was subscribing to. Decision — reimplement the slice of the media frame the framework used, keeping the DOM and public API identical, behind a kill switch. Plus the three implicit Backbone behaviours that broke, which are the real lesson for the builder work still to come.
---

**The question:** `fw.js` called `Backbone.Model.extend` and `Backbone.View.extend` in exactly two
places. Replacing them looked like an afternoon. Then the modal underneath turned out to be
`wp.media.view.MediaFrame` — WordPress's media frame, which is Backbone, and which Backbone still
loads for anyway. Is removing it worth the risk?

<!-- truncate -->

## Context

The measured position was encouraging: Backbone appeared in 12 files, and inside `fw.js` — the
framework's central admin script — in only two call sites. See
[the admin JavaScript layer](/architecture/admin-js-layer).

Three facts complicated it:

1. **`fw.Modal` was built on `wp.media.view.MediaFrame`.** The modal did not merely use Backbone; it
   lived inside a Backbone view hierarchy owned by WordPress core.
2. **A Backbone object subscribed to ours.** A `wp.media.controller.State` called
   `listenTo(modal, 'change:title')`, so `fw.Modal` had to remain a Backbone-compatible event target
   no matter what else changed.
3. **Backbone would still load.** `wp_enqueue_media()` pulls it in wherever an upload option appears,
   and the page-builder items use it directly. Removing it from `fw.js` does not remove it from the
   page.

And the blast radius was wide: **33 files** reach into `modal.frame`, and every options modal in
wp-admin goes through this code.

## Options considered

- **Swap the two call sites only.** Cheapest. But the modal stays inside a Backbone media frame, so
  the framework's most-used UI still *depends* on Backbone in the way that matters. It buys the claim
  "we don't call `Backbone.*`" and little else.
- **Leave it alone.** Defensible: nothing is broken, and the practical benefit is invisible to users
  while Backbone loads regardless. The cost is that the options modal stays coupled to a WordPress
  internal that the framework does not control.
- **Reimplement the slice of the media frame that is actually used.** Removes the coupling for real
  and puts the modal's behaviour under the framework's own control — at the cost of reproducing a
  WordPress internal faithfully enough that 33 consumers do not notice.

## Decision

**Reimplement it**, under three constraints that made the risk acceptable:

- **The DOM contract is frozen.** The replacement emits the same structure and class names
  (`.media-modal`, `.media-modal-backdrop`, `.media-modal-content`, `.media-frame`,
  `.media-frame-title`, `.media-frame-content`, `.media-frame-toolbar`, `.media-modal-close`,
  `.media-toolbar-primary`). The framework's stylesheets carry 95 rules on `.media-modal` alone, and
  its own draggable / sizing / z-index-stacking code reads the same selectors.
- **The public API is frozen.** `$el`, `modal.$el`, `views.get()`, `content.set()`, `toolbar.set()`,
  `toolbar.selector`, `state()`, `open()`, `close()`, and the `ready` / `open` / `close` /
  `content:create:main` events all keep their shapes, so no consumer changes.
- **A kill switch ships with it.** `window.FW_LEGACY_MEDIA_MODAL = true`, or `?fw-legacy-modal=1` on
  any admin URL, restores the wp.media frame with no deploy.

The Backbone object subscribing to ours was resolved by **inverting the direction**: the modal now
pushes its title into the frame instead of the frame listening for it. That single change is what
freed `fw.Modal` from having to remain Backbone-compatible.

## What actually broke — the useful part

Every bug was the same species: **behaviour Backbone provided implicitly, which no call site mentions
and which fails silently.**

1. **The namespace was clobbered.** `fw.js` reassigns `fw` to a fresh object near the top. Loading the
   new primitives *before* it — as the dependency graph requires, since `fw.Modal = fw.Class.extend(…)`
   runs at load time — meant they were erased a moment before they were needed. Caught pre-release by
   loading the files in real order outside a browser.
2. **The `events` hash was never delegated.** Views declare `events: { 'submit': 'onSubmit' }` and
   never wire the handler; `Backbone.View` does it for them. Without that, the options modal's **Save**
   button did nothing — Save works by triggering a hidden submit input, so with no submit listener the
   click vanished.
3. **The event-map form was unsupported.** Eight call sites — every page-builder item among them —
   bind as `listenTo(this.modal, { 'open': fn, 'close': fn })`. Passing a map instead of
   `(name, callback)` meant `callback` was `undefined` and the emitter bailed, binding nothing. Every
   `options-modal:*` hook was dead, which surfaced as one missing toolbar button.

Bugs 2 and 3 were invisible in the UI because `fwEvents.trigger` wraps listeners in try/catch and only
`console.error`s.

The generalisable lesson: **when you replace a framework, the risk is not the API you can see being
called — it is the API the framework was calling on your behalf.** Grep for what your code *declares*
(`events`, object-form `listenTo`, `defaults`), not only for what it *invokes*.

## Why

- **It removes a coupling the framework does not control.** The options modal's behaviour was
  previously at the mercy of a WordPress internal that can change between releases.
- **The cost was bounded and reversible.** Frozen DOM, frozen API, kill switch. Nothing about saved
  content or option values is touched.
- **It is a prerequisite for the builder work.** The builder items are the larger Backbone share, and
  they will hit exactly the same three traps. Meeting them here, in a bounded change with an escape
  hatch, is much cheaper than meeting them in the canvas.
- **It makes the claim honest and checkable.** The framework core no longer depends on Backbone: no
  `Backbone.*` calls in `fw.js`, and the `fw` handle no longer declares it. Backbone still loads for
  the media library and the builder items — which is the next step, and worth saying plainly rather
  than rounding up.

Status: **Accepted**, shipped in 2.16.11 after end-to-end manual verification of the modal, stacked
modals, the toolbar, the page builder, Theme Settings and the Live Editor.
