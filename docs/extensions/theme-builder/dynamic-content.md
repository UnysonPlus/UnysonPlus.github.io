---
title: Dynamic Content
sidebar_position: 5
---

# Dynamic Content

Headers, footers, and body templates are **global** — one design shown across many URLs — so they
need a way to pull in **whatever post the request is showing**. That's Dynamic Content: a family of
elements (and a set of `{{token}}` tags) that resolve, at render time, against the current post.

The part editors expose a **Dynamic Content** tab in the element palette with these elements; they
appear **only** inside the Theme Builder part editors (Header / Body / Footer), because that's the only
place a "current post, decided per request" makes sense.

<img src="/img/theme-builder/dynamic-content-tab.png" alt="The Dynamic Content tab in the element palette — Post Content, Post Title, Featured Image and more" width="900" />

## The element family

| Element | Outputs |
| --- | --- |
| **Post Content** | The body content of the post/page being viewed (`the_content`). |
| **Post Title** | The post/page title. |
| **Post Excerpt** | The excerpt (or a trimmed content fallback). |
| **Featured Image** | The post's featured image. |
| **Author** | The post author (name / link / avatar, per options). |
| **Date** | The published / modified date. |
| **Terms** | The post's terms in a taxonomy (categories, tags, custom). |
| **Meta** | A custom field value by key. |

:::note Still being finalized
The full set of dynamic single‑post elements is evolving. **Post Content** is solid today and is the
keystone of the recommended workflow (below); the remaining elements are being finalized and this
page will gain per‑element option detail as they land.
:::

## Post Content — the keystone

The **Post Content** element outputs the content of the post or page being viewed — exactly what a
hand‑written WordPress template gets from `the_content()`. For a page built with the page builder,
that's the page's full builder design.

There's nothing to type into it; you design **where** it appears (with a [Flexbox](./flexbox.md) and
the surrounding header/footer) and style it with its own tabs:

- **Content → Alignment** — horizontal alignment of the content (output as a `text-*` class on the
  wrapper).
- **Styling** — Text Color, Font Size, Margin & Padding.
- **Animations / Advanced** — the standard element tabs (CSS class/ID, visibility, etc.).

### The Post Content pattern

This is the recommended way to give a designed page your global chrome **without duplicating the
design into a global body**:

1. Build the page in the page builder as a normal **Page**.
2. Create a **Body Template** that contains **only** a Post Content element.
3. In a **Template**, set that body + your header/footer, and **Use On** the page (or *Front page*).

At render time the body wraps the page: header → *(your page's own content via Post Content)* →
footer. The design stays in the page; the body is a thin, reusable layout shell. See
[Body Templates → the Post Content pattern](./body-templates.md#the-post-content-pattern).

:::tip Replace vs. wrap
A body that contains a **Post Content** element **wraps** the queried page (it renders the page's own
content inside the template), so it's safe to apply even to a fully built page. A body **without**
Post Content is a full **replacement** and deliberately never overrides a page you built yourself.
:::

## `{{token}}` tags

Because parts are normal builder content, **Dynamic Content tokens** also work inside any text field —
a `{{post_title}}`, `{{post_meta key="…"}}`, `{{author_name}}`, `{{date}}`, etc. resolve against the
post the request is showing. A token can carry a **fallback** for when the value is empty.

Tokens and elements draw from the **same registry**, so what you can insert as a `{{token}}` and what
exists as a dedicated element stay in lockstep.

:::note Scoped to where it has meaning
The Dynamic Content tab (and the structure **Flexbox**) appear only inside the Theme Builder part
editors. On a normal Page or Post there is no "queried post to bind to" that's different from the post
you're editing, so the framework hides them there to keep the page‑builder palette focused. The
**Template form** itself also has the dynamic‑content picker turned off on every field — a Template is
global assignment data (a name and where/where‑not rules), not post‑contextual, so `{{tokens}}` there
would be meaningless.
:::

## See also

- [Body Templates](./body-templates.md) — where Dynamic Content elements live
- [Flexbox](./flexbox.md) — laying the elements out
- [Dynamic Content (framework)](/docs/dynamic-content) — the `{{token}}` system in full
