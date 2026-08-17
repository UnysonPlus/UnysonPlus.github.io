---
slug: when-to-stop-optimising
title: "Front-end memory was halved. Why did we stop instead of finishing the job?"
authors: [jon]
tags: [performance, architecture, page-builder]
date: 2026-08-17
description: After memoizing one function took the plugin's front-end footprint from 38.2 MB to 23.6 MB, an obvious next step remained — and was rejected. Decision — stop, because the only remaining lever trades correctness for memory. Also records how the original diagnosis was wrong twice, and what caught it.
---

**The question:** memoizing a single function halved the plugin's front-end memory. The
remaining +15.2 MB has an identifiable cause and a plausible fix. Why not take it?

<!-- truncate -->

## Context

An audit measured the plugin adding 48 MB to a front-end page and blamed option-type
loading. Both halves of that were wrong, which is worth recording before the actual
decision:

- **The 48 MB was measured with OPcache disabled.** The local XAMPP turns it off, so every
  compiled file consumed per-request memory. With OPcache on — how production runs — the
  overhead was **+29.8 MB**, not +48. Roughly 56% of the headline figure was measuring a
  local configuration artefact.
- **Option-type loading cost 1.92 MB**, about 4% of what was attributed to it.
  Instantiating all 87 registered option types cost ~0 MB and 20 ms. The proposed
  lazy-loading refactor would have changed a public extension contract for nearly nothing.

The real cause was `sc_get_animation_fields()`, which builds the Animations tab for ~26
engine modules and is called by 84 `options.php` files. On a plain front-end render,
eleven of those loaded and **each rebuilt the whole schema**: the filter ran eleven times
and allocated 15.91 MB, with `is_admin()` false and no options UI on screen. Memoizing it
took the front-end peak from 38.2 MB to 23.6 MB.

## The remaining lever

After that fix, no single contributor dominates. The rest is the page-builder stack doing
this on every page view:

```
the_posts filter
  → storage_load walks the entire builder item tree
    → each item type's options.php is loaded
      → storage_load() transforms stored values
```

The obvious optimisation is to cache the processed result per post, invalidated on save,
and skip the walk entirely.

## Options considered

**Cache processed builder output per post.** Removes the walk, the `options.php` loads and
the transformation. Easily the largest remaining win.

**Skip `storage_load` for shortcodes whose options declare no transforming type.** Needs
the options to know — the thing being avoided — unless a per-shortcode flag is cached,
which is the same invalidation problem in a smaller box.

**Stop.**

## Decision

Stop.

`storage_load()` is how an `upload` option resolves a stored attachment ID into a URL for
rendering. Caching its output means caching resolved URLs — which go stale when an
attachment is replaced, a site moves domain, or a CDN rewrite changes. The failure mode is
a page rendering a broken image, and it fails *silently* and *later*, on content nobody
touched.

Two facts also removed the easy version of the win: `FW_Shortcode::get_options()` already
caches in `$this->options`, so the eleven `options.php` loads are one each, not repeated
work. And the walk is not gratuitous — it is the mechanism that makes stored values
renderable.

## Why

Every step of this modernization has been held to three questions: does it change the
option schema, does it change rendered output, can it ship on its own. Per-post caching of
processed builder output fails the second one — not always, but in a way that surfaces as
a broken page weeks later on a site nobody was working on.

**15 MB is not worth a class of silent rendering bug.** Memory is recoverable; a customer
discovering broken images on a page they never edited is not.

Stopping was a decision, not a failure to finish. Recording it here so the idea is not
"discovered" fresh in six months and shipped without the same scrutiny.

## The part worth remembering

**Measure in the environment you are optimising for.** The single biggest error in this
work was taking a number from a machine with OPcache off and treating it as production.
Everything downstream of that number was aimed slightly wrong.

**File count is not cost.** The Animation Engine loads 80 files for 0.18 MB. One function
call allocated 15.9 MB. Ranking findings by file count produced exactly the wrong
ordering, twice.

**Bisect, then instrument.** Deactivating extensions one at a time narrowed a 230k-line
codebase to two extensions in minutes. Only then was it worth instrumenting a single
filter — which is what found the eleven rebuilds. Reading code first would not have found
it; the duplication is invisible at every individual call site.

## Status

Accepted. Shipped in shortcodes 1.13.45 with core 2.16.20 — front-end peak 38.2 MB →
23.6 MB, overhead +29.8 MB → +15.2 MB.
