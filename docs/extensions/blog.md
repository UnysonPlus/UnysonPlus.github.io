---
title: "Free WordPress Blog Posts Extension"
sidebar_label: "Blog"
description: "Free UnysonPlus Blog extension — relabels the WordPress Posts section as \"Blog\" across the admin and front end for a clearer content structure."
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

Enable **Blog** from **Unyson+ → Extensions**. The *Posts* admin menu becomes *Blog Post*
immediately, no other configuration.

:::note[Display vs. labels]
This extension only changes the *labels*. How your blog **looks** (list / grid / masonry layout,
columns, featured images, excerpts, meta, the single-post layout, archives and search) is configured
in **Theme Settings → Blog** in the Unyson+ Theme. See [The Theme](/theme).
:::
