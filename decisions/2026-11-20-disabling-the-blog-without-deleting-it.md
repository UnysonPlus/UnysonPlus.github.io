---
slug: disabling-the-blog-without-deleting-it
title: "How should a site turn off the blog it doesn't use?"
authors: [jon]
tags: [extensions, architecture]
date: 2026-11-20
description: "Many Unyson+ sites never run a blog, and WordPress's Posts section clutters their dashboard. We added a Blog panel to Settings → Writing: a four-step visibility ladder (show / hide the menu / hide in admin / fully disable with a front-end 404) plus a separate on-by-default toggle for the Posts → Blog Posts relabel. The code lives in the hidden blog extension; nothing is ever deleted."
---

## The question

"Do you think we can have a setting where you can disable the Blog Posts? There would be times where a
site doesn't need a blog. It would clean up the dashboard as well. Where shall you code it — in the
blog extension?" Then: "Perhaps we provide these options in the settings? Full disable, admin-only, and
full-but-keep-front-end-live." And: "The original Unyson changes Posts to Blog Posts in the menu — can
we make that an option too, checked by default?"

<!-- truncate -->

## Context

A lot of Unyson+ sites are brochure sites, shops, or landing pages that never publish a blog post. On
those, WordPress's **Posts** section is dead weight: a menu item, a *+ New → Post* shortcut, and two
post-centric dashboard widgets, all for a feature nobody uses. The `blog` extension already owned the
one piece of blog behaviour we ship in the core zip — it relabels the core `post` type to "Blog Posts"
— so it was the natural home for a control over the blog's presence.

Two sub-questions fell out of it: **how far** should "off" go (just tidy the admin, or hide the blog
from visitors too?), and should the long-standing **relabel** stay mandatory?

## Options considered

**Where the code lives.** The `blog` extension is `display => false`, so it has no Extensions-manager
card and therefore no automatic settings page. The options were (a) make it a visible extension just to
get a settings tab, (b) invent a bespoke admin page, or (c) register the controls on an existing core
screen via the WordPress Settings API. We chose (c) — **Settings → Writing** — because the blog is
writing, the screen already exists, and it keeps the extension hidden and lean.

**How far "off" goes.** A single on/off switch couldn't express what the user actually wanted
("admin-only, and full-but-keep-front-end-live"). A site cleaning up its dashboard is a different need
from a site that must expose no blog URLs at all. So instead of one boolean we modelled a **ladder** of
increasing scope.

**The relabel.** The *Posts → Blog Posts* rename has been automatic since the original Unyson. Removing
it would surprise existing sites; keeping it mandatory ignores sites where "Posts" means something else.
A toggle **defaulted to on** keeps every existing site identical while letting anyone opt out.

## Decision

A **Blog** panel on **Settings → Writing**, built with the standard Settings API from inside the hidden
`blog` extension, with two controls:

- **Rename "Posts"** — a checkbox, **on by default**, gating the existing relabel. Off → WordPress's
  plain "Posts".
- **Blog visibility** — a four-step ladder, default *Enabled*:
  1. **Enabled** — unchanged.
  2. **Hide the menu** — remove only the *Blog Posts* admin menu.
  3. **Hide in admin** — also drop the *+ New → Post* toolbar shortcut and the Quick Draft / Activity
     dashboard widgets; the front-end blog still works.
  4. **Disable** — all of the above, plus a `template_redirect` that 404s every blog front-end request
     (single posts, the posts page, category / tag / date / author archives, and the feed).

Stored as plain options `upw_blog_rename` and `upw_blog_mode`, each with a matching filter; the
visibility mode also honours a `UPW_BLOG_MODE` constant that wins over the option and makes the dropdown
read-only.

## Why

- **A ladder, not a boolean**, because "clean up the dashboard" and "this site has no blog at all" are
  genuinely different asks, and the middle rungs cover the common case (tidy the admin, keep the blog
  live) that a single switch would force a site to give up.
- **Nothing is ever deleted.** Every mode only hides or 404s; the posts stay in the database and come
  back untouched when you switch to *Enabled*. Disabling a feature should never be a data-loss decision.
- **The front-end 404 guards `is_front_page()`**, so a site that uses its latest posts as the home page
  is never broken, and it never touches pages or custom post types — only the core `post` type.
- **Defaults preserve today's behaviour exactly** (visibility *Enabled*, rename *on*), so the feature is
  invisible until someone goes looking for it.
- **Settings → Writing over a new extension card** keeps the `blog` extension hidden and tiny, and puts
  the control where WordPress already keeps writing settings rather than inventing a place for it.
