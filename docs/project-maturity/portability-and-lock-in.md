---
title: "Portability & lock-in"
sidebar_label: "Portability & lock-in"
sidebar_position: 5
slug: /project-maturity/portability-and-lock-in
description: "How much does Unyson+ lock you in? Your content lives in standard WordPress posts and post meta, the page builder stores exportable JSON, it degrades gracefully, and it's GPL — so you can migrate or leave."
keywords:
  - unyson+ vendor lock-in
  - unysonplus migrate away
  - unyson+ page builder export
  - unyson+ gpl license
  - wordpress page builder lock in
---

# Portability & lock-in

The honest worry with any framework or page builder is: **if I build on it, am I trapped?** Here's
exactly how much Unyson+ holds onto your content — and how to leave if you ever want to.

## Your content lives in standard WordPress

Unyson+ does not invent a parallel content store. Pages, posts and custom post types are **ordinary
WordPress posts**; their field values are **ordinary post meta**. That means:

- Your content is readable by **WP-CLI, the REST API, standard exporters, and every migration plugin**
  — nothing is hidden in a proprietary table only the framework understands.
- The page builder stores its layout as **JSON in post meta**, which is plain, inspectable data you can
  export and move, not an opaque blob.
- Files the framework generates (CSS caches, icon packs, templates) live under a **single
  `wp-content/uploads/unysonplus/` folder** — easy to find, and mostly regenerable caches you can
  simply delete.

## It degrades instead of breaking

Because the builder output is shortcode- and meta-based, a page doesn't become unreadable if the
plugin is gone — it falls back to its stored content, and the dynamic-content tags are designed to
**pass through as plain text rather than fatal** when unresolved. Deactivating Unyson+ leaves you with
your words, not a wall of error messages.

## It's GPL — genuinely open

The plugin, the parent theme, and every extension are **GPL-licensed and open source**, with no
license keys and no per-site activation. You can read the code, fork it, keep an old version running
indefinitely, or hand the whole stack to another developer. There is no vendor who can switch you off.

## If you want to migrate away

A realistic exit path, in order of effort:

1. **Keep the content as-is.** It's already standard WordPress — export with the native exporter or
   WP-CLI and import elsewhere; posts, taxonomies and meta come across.
2. **Export the builder layouts.** The per-page builder JSON is post meta you can read and transform;
   sections map to shortcodes/elements you can rebuild or convert.
3. **Rebuild the chrome if needed.** Header/footer/template designs are Theme Builder data; a
   destination theme reimplements them like any theme migration.

None of these require the original developer or any paid tool — which is the whole point of keeping
content in the platform rather than in the framework.

:::tip[💡 Web dev tip: portability comes from storing data in standard places]
The strongest guard against lock-in isn't a promise — it's an architecture that keeps your data in the
platform's own formats (here, WordPress posts and post meta) so any standard tool can read it. Prefer
tools that store content where the platform already looks for it.
[web.dev: think about data portability](https://web.dev/articles/tags/data)
:::
