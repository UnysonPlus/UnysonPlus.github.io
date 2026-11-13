---
slug: why-wp-admin-is-not-cached
title: "Why don't we cache wp-admin when the dashboard is slow?"
authors: [jon]
tags: [performance, architecture, admin-ui]
date: 2026-11-13
description: "An editor reported the admin taking ages to open a page. Caching wp-admin looks like the obvious fix, and is both unsafe and ineffective — here is what the slowness actually is."
---

An editor reported that the site "loads extremely slowly when signed into WordPress admin",
and that opening a page to edit it takes ages. Caching the admin looks like the obvious
answer. It is the wrong one, twice over.

<!-- truncate -->

## Context

Page caches — WP Engine's, Cloudflare's, LiteSpeed's, anything — deliberately **bypass
logged-in requests**. That is not an oversight to work around; it is the only safe default,
and it has a consequence worth stating plainly:

> A logged-in editor always pays the **full origin cost**, on every single click. An
> anonymous visitor usually gets a cached page and never feels it.

So an editor is not reporting a separate "admin is slow" problem. They are the first person
to notice how long the site actually takes to build a page, because they are the only one
who never gets a cached copy.

## Options considered

**1. Cache wp-admin.** Unsafe, for reasons that are not subtle:

- **Nonces.** Almost every admin screen embeds one-time tokens tied to a user and a session.
  Serve a cached copy to a second editor and their saves fail the nonce check — or, worse,
  succeed against the wrong object.
- **Per-user state.** Screen options, capabilities, the admin colour scheme, "last edited
  by", draft autosaves, the lock that stops two people editing the same post. A cached admin
  page shows one editor another's view.
- **It is nearly all unique anyway.** The cacheable fraction of wp-admin is close to zero:
  each request is a different post, a different screen, a different user. A cache with no
  hits is pure overhead plus a correctness hazard.

**2. Cache the *front end* harder.** Already correct and already what happens; it does
nothing for a logged-in editor, by design.

**3. Make the origin faster.** The only option that helps the person complaining — and it
helps every anonymous visitor on a cache miss too.

## Decision

**Do not cache wp-admin.** Treat an editor's "the admin is slow" as a direct measurement of
origin cost and fix that instead.

## Why

Because the fix list is real and already known, where "add a cache" would have been a
plausible-sounding way to not look at any of it:

- **Repeated option reads.** `FW_WP_Option::get()` now memoizes per request. WordPress primes
  the object cache with an option's *raw* string and runs `maybe_unserialize()` inside every
  `get_option()` call, so reading one 94 KB settings option 413 times in a request cost
  **113 ms of pure repeated unserialization**. Measured on a real page: 1.383 s to 1.272 s.
- **Sessions defeating the page cache.** A front-end `session_start()` emits `Set-Cookie` and
  `Cache-Control: no-store`, which every page cache refuses to store — so even anonymous
  visitors were running PHP from scratch. Fixed in core; a site still on an older build has
  it.
- **Object-cache round trips.** Several thousand cache gets per request is worth looking at
  on a host where the object cache is over a network, because an admin request has no page
  cache in front of it to hide them.

The general principle, worth keeping: **caching hides cost, it does not remove it.** Anywhere
the cache cannot apply — a logged-in editor, a first visit, a cache miss, a purge — the real
cost is what people experience. An editor complaining is the cheapest performance monitoring
available, and reaching for a cache in front of them throws that signal away along with the
correctness of the admin.
