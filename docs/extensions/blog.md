---
title: "Free WordPress Blog Posts Extension"
sidebar_label: "Blog"
description: "Free UnysonPlus Blog extension — relabels the WordPress Posts section as \"Blog\" across the admin and front end, and can hide or fully disable the blog on sites that don't need one."
---

# Blog

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">A polished blog in minutes.</p>
  <p class="ext-hero__sub">Relabels the Posts section as "Blog" across the admin and front end, so your content structure reads the way visitors expect. Free, no setup.</p>
</div>

The **Blog** extension relabels WordPress's default **Posts** as **Blog** throughout the admin and
the front end. On a site where "Posts" really means the blog, this makes the dashboard read the way
content editors expect: *Blog → Add blog post*, *All blog posts*, *Search blog posts*, and so on
(the post type's labels and its category/tag taxonomy labels are all updated).

It's a labeling and UX convenience, it doesn't change how posts work or where they're stored, so it's
completely safe to turn on or off.

:::tip[💡 Web dev tip: the label is cosmetic, the markup is what matters]
Renaming "Posts" to "Blog" only changes what editors see in `wp-admin` — it doesn't touch the actual
HTML a post renders as. What search engines index and screen readers announce comes from the
underlying markup: one `<h1>` per post, a real `<article>` wrapper, and a machine-readable publish
date. Whatever theme renders your blog (the Unyson+ Theme included) should still get those basics
right, regardless of what the admin menu calls it. [MDN: The Article element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article)
:::

## Activate

Enable **Blog** from **Unyson+ → Extensions**. The *Posts* admin menu becomes *Blog Posts*
immediately, no other configuration.

## Blog settings

The extension adds a small **Blog** panel to **Settings → Writing** with two controls.

### Rename "Posts"

A checkbox, **on by default**. While it's checked, the core *Posts* section reads as **Blog Posts**
throughout the admin and front end (the relabel described above). Untick it to keep WordPress's plain
*Posts* wording instead — handy if "Posts" already means something other than a blog on your site.
Turning it off changes only the labels; nothing about your posts moves or breaks.

### Blog visibility

A dropdown for sites that don't run a blog. Hiding the blog cleans up the admin, and the full-disable
mode also hides it from visitors. **Pages, portfolios and other post types are never affected** — this
control only touches the core *Posts* type.

| Mode | What it does |
| --- | --- |
| **Enabled** (default) | The blog shows everywhere, exactly as before. |
| **Hide the menu** | Removes only the *Blog Posts* item from the admin menu. Posts still exist and the front-end blog still works; you just don't see the menu. |
| **Hide in admin** | Also removes the *+ New → Post* shortcut from the toolbar and the post-centric dashboard widgets (Quick Draft, Activity). The blog still works for visitors. |
| **Disable** | Everything above, **plus** the blog returns a 404 for visitors — single posts, the blog/posts page, category / tag / date / author archives, and the feed. Your real home page is never affected, even if it's set to show your latest posts. |

:::note[Nothing is deleted]
Every mode is reversible and non-destructive. Choosing *Disable* hides and 404s the blog but leaves
all of your posts in the database — switch back to *Enabled* and they return untouched.
:::

:::tip[For developers]
Both controls can be set in code. The visibility mode honours a `UPW_BLOG_MODE` constant
(`on` | `admin` | `full_live` | `off`) — when defined, it wins and the dropdown becomes read-only.
There are also matching `upw_blog_mode` and `upw_blog_rename` filters for overriding the stored
options at runtime.
:::

:::note[Display vs. labels]
The rename control only changes the *labels*. How your blog **looks** (list / grid / masonry layout,
columns, featured images, excerpts, meta, the single-post layout, archives and search) is configured
in **Theme Settings → Blog** in the Unyson+ Theme. See [The Theme](/theme).
:::
