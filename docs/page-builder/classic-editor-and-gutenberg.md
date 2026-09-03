---
title: "Is the classic editor in WordPress core?"
slug: /page-builder/classic-editor-and-gutenberg
sidebar_position: 8
sidebar_label: "Classic editor vs Gutenberg"
description: "The classic editor was never removed from WordPress core — the Classic Editor plugin is little more than one filter that flips it back on. Here's how WordPress decides which editor to load, and how the UnysonPlus Page Editor uses that same core switch so the Page Builder needs no Classic Editor plugin."
keywords:
  - wordpress classic editor in core
  - use_block_editor_for_post_type
  - classic editor plugin
  - gutenberg block editor
  - disable gutenberg page builder
  - unysonplus page editor
---

# Is the classic editor in WordPress core?

> **The question:** Does the actual classic-editor code live in WordPress core, or does the
> Classic Editor plugin ship its own editor? And if UnysonPlus shows the classic screen without
> that plugin — where does it come from?

Short answer: **yes, the classic editor is part of WordPress core, and the Classic Editor plugin
barely contains any editor code at all.** Understanding why is genuinely useful — it's the
mechanism the UnysonPlus **Page Editor** uses to drop the plugin dependency entirely.

## The classic editor never left core

When the block editor (Gutenberg) shipped in **WordPress 5.0 (December 2018)**, the old editor
was **not deleted**. The classic editing screen — the TinyMCE rich-text box plus the full-width
`post.php` screen with meta boxes down the side — is still sitting in WordPress core today. It was
demoted from *the default* to *an alternative*, but every line of it still ships in every copy of
WordPress.

So "the classic editor" isn't a thing you install. It's already on your site. The only question
is whether WordPress decides to *show* it for a given post.

## What the Classic Editor plugin actually does

Because the code is already in core, the official **Classic Editor** plugin has almost nothing to
ship. Strip it down and it is essentially **one filter**:

```php
add_filter( 'use_block_editor_for_post_type', '__return_false' );
```

That's the whole trick. WordPress asks, for each post type, "should I use the block editor here?"
— and the plugin answers "no", so core falls back to the classic screen it already has. The
plugin adds a bit more (a settings page, optional per-post *switch* links), but it contains **no
editor of its own**. It's a light switch, not a light bulb.

## How WordPress picks the editor

Two core filters decide it, and they're the entire API:

| Filter | Scope | Returns |
| --- | --- | --- |
| `use_block_editor_for_post_type` | a whole post type (`page`, `post`, a CPT…) | `true` = block editor, `false` = classic |
| `use_block_editor_for_post` | one specific post | same — and it calls the post-type filter first |

Return `false` from either and WordPress serves its **built-in classic editor**. No plugin, no
copied code, no custom editor — just core doing what it already knows how to do.

You can see the current decision for any post type yourself:

```php
use_block_editor_for_post_type( 'page' ); // true (block) or false (classic)
```

## How the UnysonPlus Page Editor uses it

The UnysonPlus Page Builder mounts on the classic `post.php` screen (via `edit_form_after_editor`).
Historically that meant asking users to install the Classic Editor plugin so the builder had a
full-width home. The **Page Editor** — a small, hidden extension that rides with the Page
Builder — removes that dependency by doing exactly what the Classic Editor plugin does: it flips
`use_block_editor_for_post_type` to `false`. That's roughly *fifteen lines*, and there is **no
Classic-Editor-plugin code in it** — the classic screen you get is WordPress's own, straight from
core.

What that buys you:

- **No Classic Editor plugin needed.** UnysonPlus is self-sufficient.
- **You stay inside WordPress.** The classic screen keeps the normal dashboard, the left admin
  menu, the Publish box, and **every other plugin's meta boxes** (All in One SEO, Yoast, …) —
  unlike full-screen builders that take you out of WordPress entirely.
- **It applies to all post types**, so a plain text page or a blog post opens in the familiar
  classic editor too — not just Page Builder pages.
- **You can opt out per post type.** In **Unyson+ → Extensions → Page Builder → Settings**, the
  *"Keep the block editor for"* list lets you send, say, blog **Posts** back to Gutenberg while
  pages stay classic.
- **Block-editor-only internals are never touched** — reusable blocks (`wp_block`) and Full Site
  Editing templates (`wp_template`, `wp_template_part`, …) keep the block editor, so a block theme
  or the Site Editor keeps working.

:::tip[The takeaway]
"Switching to the classic editor" isn't loading a different program — it's telling WordPress to
use the editor it already has. That's why UnysonPlus can offer the classic experience with a
tiny filter instead of a dependency.
:::
