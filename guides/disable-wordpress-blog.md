---
title: Disable or hide the blog on a WordPress site
description: Turn off WordPress Posts on a site that doesn't need a blog — clean up the dashboard, or fully disable the blog so visitors can't reach it, with the free Unyson+ Blog extension. Nothing is deleted.
---

# Disable or hide the blog on a WordPress site

Not every site has a blog. On a brochure site, a shop, or a landing page, WordPress's **Posts**
section is just clutter — a menu item, a *+ New → Post* shortcut, and a couple of post-centric
dashboard widgets for a feature nobody uses. The free [Blog extension](/extensions/blog) lets you
hide it, or disable it entirely so visitors can't reach it either — without touching a template or
deleting anything.

## Steps

1. Go to **wp-admin → Settings → Writing**.
2. Find the **Blog** panel near the top. It has two controls.
3. Set **Blog visibility** to how far you want to go (see the table below), then **Save Changes**.

That's it — there's nothing to install. The Blog extension ships inside Unyson+ and is always
present, so the panel is simply there.

## Choose how far to go

**Blog visibility** is a ladder. Pick the step that matches what you need:

| Mode | What it does |
| --- | --- |
| **Enabled** (default) | The blog shows everywhere, exactly as before. |
| **Hide the menu** | Removes only the *Blog Posts* item from the admin menu. Posts still exist and the front-end blog still works — you just don't see the menu. |
| **Hide in admin** | Also removes the *+ New → Post* toolbar shortcut and the post-centric dashboard widgets (Quick Draft, Activity). The blog still works for visitors. |
| **Disable** | Everything above, **plus** the blog returns a 404 for visitors — single posts, the blog/posts page, category / tag / date / author archives, and the feed. |

- **Just tidying the dashboard?** *Hide the menu* or *Hide in admin* is enough — your blog stays live
  for visitors.
- **Site has no blog at all?** *Disable* makes sure no blog URL resolves.

:::note[Nothing is deleted]
Every mode is reversible. *Disable* hides and 404s the blog but leaves all of your posts in the
database — switch back to **Enabled** and they return untouched. Your **home page** is never 404'd
(even if it shows your latest posts), and **Pages, portfolios and other post types are never
affected** — only the core *Posts* type.
:::

## Keep (or drop) the "Blog Posts" label

The same **Blog** panel has a **Rename "Posts"** checkbox, **on by default**. While it's ticked, the
*Posts* section reads as **Blog Posts** throughout the admin and front end (the classic Unyson
behaviour). Untick it to keep WordPress's plain *Posts* wording — useful when "Posts" already means
something other than a blog on your site. It only changes labels; nothing about your posts moves.

:::tip[For developers]
Both controls can be set in code. Define the `UPW_BLOG_MODE` constant
(`on` | `admin` | `full_live` | `off`) to force the visibility mode across a fleet of sites — it wins
over the stored option and makes the dropdown read-only. The `upw_blog_mode` and `upw_blog_rename`
filters override the stored options at runtime.
:::

## See also

- [Blog extension](/extensions/blog)
- [Design a custom 404 page](./custom-404-page.md)
- [Create a custom post type without code](./custom-post-type.md)
