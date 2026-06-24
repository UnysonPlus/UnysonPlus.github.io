---
title: Body Templates
sidebar_position: 3
---

# Body Templates

A **Body Template** is a full-page body layout, built with the page builder, that **replaces the
content area** for the requests a [Template](./conditional-assignment.md) assigns it to (a custom
404, a landing body, an archive/blog layout). They live under **Theme Builder → Body Templates** and
get the **full** builder palette.

When a Template assigns a Body to the current request, Theme Builder takes over the page's
`template_include` and renders: the theme/Template **header**, the body builder content, then the
**footer**. The header and footer inside that wrapper still resolve through the normal cascade, so a
single Template can supply all three.

:::caution A built page is never replaced
If the queried post is itself a page-builder page (you explicitly built it), the Body Template does
**not** override it. Body Templates are for requests that don't have their own built content, 404,
landing, and archive/list pages.
:::

## Three render modes

The body wrapper decides how to render from the request:

| Mode | When | How it renders |
| --- | --- | --- |
| **Single** | `is_singular()` | The queried post is set up once; the body renders **once** and its dynamic elements (Post Title, Content, Featured Image, …) read that post. |
| **Archive / list** | a list request with posts (blog index, category/tag/term, post-type, author/date archive, search) | The WordPress loop runs and the body is rendered **once per post**, a real list of cards, like a Divi post-loop layout. Pagination follows the loop. |
| **Static** | `is_404()` or an empty archive | The body renders **once** with no post (for 404 / landing layouts). |

## Loop Layout (archive cards)

When a Body is used as an archive/blog (the per-post mode above), a **Loop Layout** box on the Body
edit screen controls how the repeated cards are laid out:

- **Columns** — `Auto (responsive)` or `1`–`6` (collapses on smaller screens; `1` = a single-column
  list).
- **Gap** — `None` / `Small` / `Medium` / `Large`.

These are ignored for single-post and 404/static bodies (which render the body once).

## Dynamic content in a body

Body Templates are normal builder content, so [Dynamic Content](/docs/dynamic-content) `{{token}}`s
work inside them, a `{{post_title}}` or `{{post_meta|key=…}}` resolves against whatever post the
request is showing.

The part editors also expose a **Dynamic Content** palette tab with dedicated elements (Post Title,
Post Content, Post Excerpt, Featured Image, Author, Date, Terms, Meta) and a **Structure** tab with a
semantic **Flexbox** container. These tabs appear only inside the Theme Builder part editors (they're
hidden on normal Pages/Posts, where there's no queried post to bind to).

:::note Still being finalized
The dynamic single-post elements are evolving. Static body layouts (404, landing, archive lists)
work today; the full set of dynamic single-post body elements is being finalized, expect this page
to gain detail as they land.
:::

## See also

- [Conditional assignment](./conditional-assignment.md) — assign a Body with a Template
- [Guide: Design a custom 404 page](/guides/custom-404-page)
- [Dynamic Content](/docs/dynamic-content)
