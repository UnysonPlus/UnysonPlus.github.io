---
slug: rewrite-flush-belongs-on-wp-loaded
title: "The deferred rewrite flush belongs on wp_loaded, not inside our own init callback"
authors: [jon]
tags: [architecture, performance]
date: 2026-07-29
description: "Post Types deferred its flush_rewrite_rules() to the next request — the correct pattern — but ran it inside its own init/20 callback. Flushing part-way through init regenerates the rules from whatever has registered so far, silently discarding the rewrite rules of any plugin that registers later."
---

**The question:** the Post Types extension already deferred `flush_rewrite_rules()` to the request
*after* a save, which is the pattern most no-code CPT plugins get wrong. So why were third-party
permalinks occasionally 404-ing after someone saved the screen?

<!-- truncate -->

## Context

The extension registers its post types on `init` at priority 20, and the same callback ended with:

```php
if ( get_option( self::FLUSH_FLAG ) ) {
    delete_option( self::FLUSH_FLAG );
    flush_rewrite_rules( false );
}
```

Deferring to the next request is right: you cannot flush during the request that *changed* the
definitions, because `init` has already registered the old set. The bug is subtler — it is about
*where in that next request* the flush happens.

`flush_rewrite_rules()` regenerates the entire `rewrite_rules` option from the rules currently
registered on `$wp_rewrite`. Those rules are contributed by `register_post_type()` and
`register_taxonomy()` calls, which plugins make throughout `init` at whatever priority they like.

At `init` priority 20, a plugin registering its post types at priority 30 — or the very common
default of 10 running after us in load order, or WooCommerce-style late registration — has not
contributed its rules yet. Regenerating there writes a `rewrite_rules` option that simply does not
contain them.

## Options considered

- **Raise our own priority to `PHP_INT_MAX`.** Works, but it is a guess dressed as a fix: it says
  "later than everyone" without any guarantee, and it drags our *registration* later too, which
  other code may depend on being early.
- **Flush on `shutdown`.** Late enough, but wrong in the other direction — the rules are regenerated
  after the request that needed them has already 404-ed.
- **Split the callback: register at `init`/20, flush on `wp_loaded` (chosen).** `wp_loaded` fires
  once `init` has completed in full, so every plugin's rules are present.

## Decision

Registration stays on `init` at priority 20 — early enough that taxonomies can attach to our post
types and that other code sees them during `init`. The flush moved to its own `wp_loaded` callback,
reading and clearing the same deferred flag.

Two smaller changes came with it: the flag is only written when the definitions actually changed (a
no-op Save no longer costs the next request a full rewrite regeneration), and it is stored
non-autoloaded, since it is read once and deleted.

## Why

- **A flush is global, so its timing is a shared concern.** We are not regenerating *our* rules; we
  are regenerating everyone's. Doing that before everyone has spoken is the whole bug.
- **`wp_loaded` is the guarantee that priority juggling only approximates.** "After `init` finishes"
  is a real contract; "priority 99999" is a bet on nobody choosing a larger number.
- **The failure mode was maximally unfair.** The symptom appeared in *another* plugin's permalinks,
  after an action in ours, with no error anywhere — and it healed as soon as anything else triggered
  a flush, so it looked intermittent. Cheap to fix, extremely expensive to diagnose from a bug report.
