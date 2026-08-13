---
slug: name-the-tooltip-for-its-job-not-its-vendor
title: "Why the tooltip is called fw-tooltip and not floating-ui"
authors: [jon]
tags: [naming, architecture, option-types]
date: 2026-08-13
description: Replacing the abandoned qTip2 tooltip left a choice about what to call the replacement. Naming it after Floating UI would have repeated the exact mistake that made the old one look dated — a dead vendor's name spread across class names, script handles and a jQuery plugin method. The public surface is now named for what it does, so the engine underneath can be swapped again without anyone noticing.
---

**The question:** qTip2 has been unmaintained since 2016, and we replaced it with Floating UI. The old
implementation put its vendor everywhere — `.qtip-fw` class names, a `'qtip'` script handle, `$.fn.qtip()`.
Do we carry that naming over to the new library and call things `floating-ui`, or name them something else?

<!-- truncate -->

## Context

An audit of the plugin went looking for outdated technology. Most of what it found was already modern — the
front end is entirely jQuery-free, every PHP file lints clean on 8.2, and the vendored front-end libraries are
current. The genuine legacy was narrow and concentrated in the wp-admin option UI, where two abandoned jQuery
plugins were load-bearing: qTip2 (2013) and Selectize (2015).

qTip2 went first. The replacement was written as a drop-in — same DOM shape, same option surface, same class
names — specifically so that the seventeen call sites and the fifty-odd enqueue dependencies wouldn't have to
change. That worked: the swap landed with the tooltips looking and behaving identically.

Which surfaced the actual problem. The tooltips were now powered by a maintained, modern, vanilla-JS
positioning library — and the source still said `qtip` in 44 files. Anyone reading the code, or viewing the
page source, would draw exactly the wrong conclusion about how current the codebase is. The perception problem
the work was meant to fix was still fully intact, because the *naming* was what had been advertising staleness,
not the implementation.

The obvious fix was to rename everything to match the new library. That is the option worth thinking about
carefully, because it is a trap.

## Options considered

- **Keep the qTip naming.** Zero risk, no work. But it leaves the codebase describing itself in terms of a
  library that hasn't shipped since 2016 and is no longer present in the tree at all — actively misleading,
  and the thing we set out to fix.

- **Rename to the new vendor: `.floating-ui-tip`, `'floating-ui'`, `$.fn.floatingUi()`.** Accurate today, and
  it advertises a modern dependency. But it re-creates the original mistake with a fresher vendor. The reason
  `.qtip-fw` reads badly in 2026 isn't that qTip was a bad library — it was a good one — it's that the *public
  API was named after a third party*, so when that third party stopped being maintained, our class names
  announced it. Floating UI is healthy now. On a long enough timeline it will be superseded, and then every
  class name, every handle, and every one of those seventeen call sites is lying again, and we do this whole
  exercise a third time.

- **Rename to the function: `.fw-tooltip`, `'fw-tooltip'`, `$.fn.fwTooltip()`.** The public surface describes
  what the thing *is* — a tooltip — and says nothing about how it's built. Swapping the engine later touches
  one file and nothing downstream notices.

There was a secondary question of whether to keep deprecated aliases (`$.fn.qtip` forwarding to the new method,
legacy classes emitted alongside the new ones) for the benefit of any third-party theme styling `.qtip-fw`.
A check settled it: the parent theme, the child themes, and every demo theme across fourteen local installs
contained zero references. The only consumers were inside the plugin.

## Decision

**Name the public surface for its job.** `$.fn.fwTooltip()`, `.fw-tooltip` / `.fw-tooltip-content` /
`.fw-tooltip-arrow`, skin classes `.fw-tooltip-default` and `.fw-tooltip-builder`, the `data-fw-tooltip` init
guard, script and style handles both `'fw-tooltip'`, implemented in `static/js/fw-tooltip.js` with
`static/css/fw-tooltip.css`.

Floating UI is vendored as an unexported implementation detail. No aliases and no legacy class names were kept
— the vendored library, its stylesheet, and every reference to it are gone, including a mislabelled bundle in
the image-picker whose banner claimed to be qTip2 but actually contained imagesLoaded.

## Why

The lesson from the migration wasn't "qTip2 was old." It was that we had let a dependency's name leak into our
own vocabulary, and vocabulary is expensive to change — it lives in class names other people style against, in
handles other code declares dependencies on, and in a jQuery method called from every corner of the option
system. Implementation is cheap to change; naming is not. So the naming should be the part that doesn't have
to change.

Naming for the function also makes the abstraction honest. `$.fn.fwTooltip()` promises a tooltip and nothing
about positioning strategy, which is exactly the contract the rest of the framework wants. The one file that
knows about Floating UI is the one file whose job is knowing about it.

The same reasoning applies to the Selectize replacement still ahead of it: the target is `fw-select`, not
`tom-select`.

## Status

Accepted. Shipped in core 2.16.1, verified against a full builder page — 93 tooltips, computed styles identical
to the previous implementation, no console errors.
