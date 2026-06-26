---
title: Body Templates
sidebar_position: 3
---

# Body Templates

A **Body Template** is a full‑page body layout, built with the page builder, that **replaces or
wraps the content area** for the requests a [Template](./conditional-assignment.md) assigns it to (a
custom 404, a landing body, an archive/blog layout, or a thin shell around a designed page). They
live under **Theme Builder → Body Presets** and get the **full** builder palette.

When a Template assigns a Body to the current request, Theme Builder takes over the page render and
produces: the **header**, the body content, then the **footer** — see [How it renders](./rendering.md)
for the exact mechanism (it differs slightly on native vs. foreign themes).

## Replace vs. wrap

A Body behaves one of two ways depending on whether it contains a **[Post Content](./dynamic-content.md#post-content--the-keystone)**
element:

| The body… | …does this |
| --- | --- |
| **contains Post Content** | **Wraps** the queried page — it renders the page's own content inside the template layout. Safe to apply even to a fully built page. |
| **has no Post Content** | **Replaces** the content area — a full body layout (404, landing, archive cards). It deliberately never overrides a page you built yourself. |

:::caution A built page is never replaced
If the queried post is itself a page‑builder page (you explicitly built it), a **replacement** Body
does **not** override it. Use a **Post Content** body to wrap a built page; use a replacement Body for
requests that don't have their own built content — 404, landing, and archive/list pages.
:::

## The Post Content pattern

The cleanest way to give a designed page your global chrome is **not** to rebuild the design inside a
global body. Instead:

1. **Build the page** in the page builder as a normal **Page** — sections, columns, content.
2. **Make a Body Template that contains only a Post Content element** (the body is a thin shell).
3. **Bundle + place** with a [Template](./conditional-assignment.md): set that body + your
   header/footer, and **Use On** the page (or *Front page*).

At render time: header → *(the page's own builder content, via Post Content)* → footer. The design
lives in the page; the body is a reusable layout shell you can share across many pages. This is the
recommended workflow for a custom home page.

```text
   Page (page builder)            Body Template              Template
   ┌───────────────────┐          ┌──────────────┐          ┌────────────────────────┐
   │  Hero              │          │ Post Content │   ◄───   │ Header: My Header      │
   │  Features  ────────┼───────►  │  (wraps the  │          │ Body:   Post-Content   │
   │  Pricing           │          │   page)      │          │ Footer: My Footer      │
   │  CTA               │          └──────────────┘          │ Use On: Front page     │
   └───────────────────┘                                     └────────────────────────┘
```

## Three render modes

When a Body is a **replacement** (no Post Content), the wrapper decides how to render from the
request:

| Mode | When | How it renders |
| --- | --- | --- |
| **Single** | `is_singular()` | The queried post is set up once; the body renders **once** and its dynamic elements (Post Title, Content, Featured Image, …) read that post. |
| **Archive / list** | a list request with posts (blog index, category/tag/term, post‑type, author/date archive, search) | The WordPress loop runs and the body is rendered **once per post** — a real list of cards. Pagination follows the loop. |
| **Static** | `is_404()` or an empty archive | The body renders **once** with no post (for 404 / landing layouts). |

## Loop Layout (archive cards)

When a Body is used as an archive/blog (the per‑post mode above), a **Loop Layout** box on the Body
edit screen controls how the repeated cards are laid out:

- **Columns** — `Auto (responsive)` or `1`–`6` (collapses on smaller screens; `1` = a single‑column
  list).
- **Gap** — `None` / `Small` / `Medium` / `Large`.

These are ignored for single‑post and 404/static bodies (which render the body once).

## Dynamic content in a body

Body Templates are normal builder content, so [Dynamic Content](./dynamic-content.md) elements and
`{{token}}`s work inside them — a `{{post_title}}` or `{{post_meta key="…"}}` resolves against
whatever post the request is showing. The part editors expose a **Dynamic Content** palette tab (Post
Content, Post Title, Post Excerpt, Featured Image, Author, Date, Terms, Meta) and a **Structure** tab
with the semantic **[Flexbox](./flexbox.md)** container. These tabs appear only inside the Theme
Builder part editors (they're hidden on normal Pages/Posts, where there's no queried post to bind to).

:::tip Preview before you publish
Use the [live preview](./conditional-assignment.md#previewing) to see a Body Template rendered against
a real post — single, archive‑loop, or 404 — before you assign it.
:::

## See also

- [Conditional assignment](./conditional-assignment.md) — assign a Body with a Template
- [Dynamic Content](./dynamic-content.md) — Post Content and the dynamic element family
- [Flexbox](./flexbox.md) — laying out a full‑page body
- [How it renders](./rendering.md) — replace/wrap, the render modes, and theme‑independent rendering
- [Guide: Design a custom 404 page](/guides/custom-404-page)
