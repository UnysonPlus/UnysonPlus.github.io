---
slug: a-blog-post-is-not-a-page
title: "Should the Site Converter tell a blog post from a page — and where do custom post types come from?"
authors: [jon]
tags: [site-converter, conversion, architecture, storage-model]
date: 2026-10-08
description: "Every converted URL used to land as a WordPress page, blog articles included. The decision: discovery classifies each URL as page, post or archive; archives are dropped because WordPress generates them; a post's body goes into post_content as editor HTML rather than a builder tree; no WordPress user is minted for a source byline. Custom post types are registered through the Post Types extension, not written into a child theme's functions.php."
---

**The question:** "Blog posts should be in posts, right? ... and for posts, we should probably just grab the content and check if it is just using the plain text editor." And then: "does that include custom post types as well? We can also make the site converter write custom post types in functions.php, right?"

<!-- truncate -->

## Context

The converter had one content shape. Every discovered URL was inserted with `post_type => 'page'` — two hardcoded
places, no notion of anything else — and every one of them got a page-builder tree mapped from its rendered
layout.

That is right for a designed page and wrong for an article, in a way that is invisible until someone looks for
the article. A post imported as a page is absent from the blog index, absent from the feed, absent from its
category and its tag, and it is unreachable from any archive the source had. It also arrives as a builder tree
nobody wants to edit a paragraph in: the source's article was prose written in an editor, and the conversion
turned it into forty nested nodes with measured padding on each one. On a real source that is a hundred-odd
articles filed in the wrong place, each one more expensive to edit than it was before the conversion.

The same discovery pass also surfaced URLs that are neither: `/category/leadership/`, `/tag/culture/`,
`/author/jane/`, `/blog/page/3/`. Those are listings a CMS generates from its content. Converting one produces a
frozen snapshot of whatever happened to be on it the day of the capture.

## Options considered

**Leave everything as pages, and let the user re-file them.** Cheapest to ship, and it is what the converter did.
But re-filing is not a tidy-up — moving a page to a post by hand means retyping the body out of a builder tree,
re-entering the date so the archive reads in the right order, and re-attaching the category. Multiply by a
hundred articles and the conversion has created more work than it saved. The information needed to do it
correctly is in the capture and is thrown away.

**Classify, and import each kind as what it is.** Discovery already walks the sitemap, which states what a URL is
more reliably than anything we could infer: a separate `post-sitemap.xml` / `page-sitemap.xml`, and failing that
the path shape. So classify there, carry a `kind` through to the importer, and give posts their own path — body
into `post_content`, the source's published date, its excerpt, its terms as real terms. Archives are detected and
dropped, because WordPress will regenerate them from the posts once the posts exist.

**Go further: synthesise custom post types into the child theme's `functions.php`.** The converter already writes
a child theme, so it could write a `register_post_type()` call into it. Tempting, and the reason to say no is not
effort.

## Decision

1. **Discovery classifies every URL as `page`, `post` or `archive`.** The sitemap's own kind first, then the path.
2. **Archives are excluded from the import** — not hidden, excluded. They are output, not content.
3. **A post's body becomes editor HTML in `post_content`**, not a builder tree: headings, paragraphs, lists,
   quotes, images and links survive; the source's classes, ids and `data-*` attributes do not, because they refer
   to a stylesheet the post will never be rendered under. The body is the **article**, not the page — the site
   header, nav, footer, share row, author box, related posts and comments are all chrome the converted site
   already renders once, and copying them into every article would duplicate them a hundred times and let them
   drift from the real thing.
4. **No WordPress user is minted for a byline.** The source gives a display name, not an account. The name is kept
   as post meta, so a template can print it and a human can map it to a real account later.
5. **Re-importing the same source URL updates that post**, which is how the page path already behaves.
6. **Custom post types are registered through the Post Types extension, not written into `functions.php`.**

## Why

**Because "post" is not a style of page, it is a different contract.** A page is addressed directly and styled
individually. A post is a row in a set: it has a date that orders it, terms that file it, an excerpt that
represents it in a list, and one template that styles every member. Import an article as a page and all four of
those are silently dropped. The fix is not cosmetic, which is why it is worth doing at the import layer rather
than leaving it to the user.

**Because an article's body belongs where an editor can reach it.** The builder is for layout. An article is
prose, and the person who will next touch it wants to fix a sentence, not navigate a node tree. This also sets up
the thing worth building next: with bodies in `post_content`, one `single.php` in the generated child theme can
match the source's article design, and every article picks it up at once. A hundred builder trees could never be
restyled that way.

**Because archives are a function of the content, not content.** WordPress builds a category page by querying
posts. Converting the source's rendered category page would freeze a listing that is correct for one day and wrong
after the first new post — and it would shadow the real archive at the same URL.

**On custom post types: the converter should ask the right component to do it.** Writing `register_post_type()`
into a child theme's `functions.php` works, and it puts the site's content model inside a presentation layer. Then
switching or regenerating the theme deregisters the post types, which orphans their content; the registration is
unreadable and uneditable for anyone who is not willing to edit PHP; and the framework already has a component
whose whole job is this, with a UI, stored settings and a taxonomy builder beside it. A conversion that detects a
`/projects/` section should hand that to the Post Types extension as data, the same way it hands colours to Theme
Settings instead of writing them into a stylesheet. The rule the converter already follows holds here: **write
data into the component that owns it, never code into the theme.**

A deliberate non-goal for now: nothing attempts to guess a custom post type from a URL pattern. `/projects/` is a
CPT on one source and a page with children on the next, and getting it wrong creates content in a type the user
did not ask for. Posts are safe to infer because the sitemap states them.
