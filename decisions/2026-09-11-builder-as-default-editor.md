---
slug: builder-as-default-editor
title: "Why new Pages open in the builder while Blog Posts stay on the Classic editor"
authors: [jon]
tags: [page-builder, gutenberg, architecture]
date: 2026-09-11
description: "Opening a new page dropped you into the Classic editor with the builder one click away — fine, but backwards for a builder-first product. The question was whether the Unyson+ Builder should be the default editor, and for which post types. The decision: new Pages and custom post types open in the builder by default; Blog Posts stay on the Classic editor by default but keep the builder toggle; and the post types that are force-built with the builder (Snippets, Header/Footer/Body presets) are shown locked-on so the settings stop implying they're optional."
---

**The question:** Creating a new Page opened the Classic editor, with the *Unyson+ Builder* button sitting there to switch. For a builder-first product that's backwards — the common case (build a page) costs an extra click every time, and a new user doesn't necessarily know the button is the point. Should the builder be the **default** editor on a new post, and if so, for which post types? Blog posts felt different — those are usually written prose, not built layouts.

<!-- truncate -->

## Context

The page builder isn't a separate editor; it's a builder *mode* layered over the post editor, toggled by two buttons (*Unyson+ Builder* to switch on, *Default Editor* to switch back). Which mode a post opens in is decided by a stored `builder_active` flag, defaulting to `false` — so every new post opened in Classic.

Three things turned out to be true and shaped the answer:

- **An old filter existed for exactly this but was dead.** `fw_page_builder_set_as_default` was only consulted when a value had *no* stored `builder_active` — but the option hard-codes its default value to `builder_active => false`, so the flag is always "set" and the filter never fires. The theme-builder had already hit this and worked around it by overriding the option's default *value* through `fw_post_options`. That's the proven path.
- **Activating a post type does not touch its editor.** The Page Editor already forces the Classic editor for *every* post type globally (opt-out per type), independent of the page-builder "Activate for" list. So adding a type to that list only surfaces the builder button — it doesn't swap Gutenberg for anything. That reframed the whole "is this invasive?" question.
- **Some post types are always built with the builder anyway.** Snippets and the theme-builder Header/Footer/Body presets get builder support force-added in code; their "Activate for" checkboxes did nothing, yet rendered as if they were optional.

## Options considered

- **Leave it (Classic-default everywhere, builder one click away).** *Pro:* zero change, no surprise. *Con:* backwards for a builder-first product; the primary action is the non-default one.
- **Builder-default for everything, including blog posts.** *Pro:* maximally consistent. *Con:* blog posts are usually written, not built; forcing the builder there fights the actual writing workflow.
- **Builder-default for Pages + custom post types; Blog Posts stay Classic but keep the toggle (chosen).** *Pro:* the common build case opens ready to build, while prose posts open ready to write — and the builder is still one click away on posts. *Con:* one post type (`post`) is a special case in the rule.
- **On the settings side: check more "Activate for" boxes by default vs. keep it minimal.** Since activating a type is non-invasive (editor is already Classic globally) and Blog Posts needs to be activated to show its toggle, the default grew from *Pages only* to *Pages + Blog Posts* — but no further, so Products / LMS types stay opt-in.

## Decision

**The builder is the default editor for new Pages and custom post types; Blog Posts stay on the Classic editor by default but carry the builder toggle.** Concretely:

- A new `fw_post_options` filter flips the page-builder option's default `builder_active` to `true` for every builder-supported type **except `post`** — so new Pages/CPTs open in the builder, new posts open in Classic. Only the *default* changes: existing content loads its saved mode, and both toggle buttons stay, so anything can still be switched either way. A per-type filter (`fw_page_builder_default_active_for_post_type`) lets a site opt a specific CPT out.
- The default "Activate for" set becomes **Pages + Blog Posts**, so a post ships with the *Unyson+ Builder* toggle out of the box (Classic-default via the exclusion above).
- The always-built-with-the-builder types (Snippets, Header/Footer/Body presets) are shown **checked and disabled with an "always on" tag** in Page Builder Settings, declared through a new `fw_ext_page_builder_always_on_post_types` filter that the forcing extensions opt into.

## Why

The default should be the thing you do most. On a Page or a custom content type that thing is *build a layout*, so those open in the builder; on a blog post it's *write*, so that opens in Classic — with the builder still a click away for the occasional built post. Making `post` the single exception is worth it because it matches how the two kinds of content are actually authored, and it's expressed as one readable rule with a filter for adjustment.

Two realizations kept the change small and safe rather than sweeping. First, the editor swap is already global and separate from activation, so turning on Blog Posts only *adds a button* — it doesn't take Gutenberg away from anyone, which is what made "Pages + Blog Posts" a comfortable default instead of an aggressive one. Second, leaning on the same `fw_post_options` override the theme-builder already uses means the behavior rides a path that's known to work, touches only the default value, and never forces existing pages. The locked "always on" checkboxes are the honest tail of the same thought: if a type is built with the builder no matter what, the settings screen should say so, not pretend it's a choice.
