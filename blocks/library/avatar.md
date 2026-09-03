---
title: Avatar
description: The Unyson+ Avatar block — a single avatar or an overlapping group, with ring/border designs and a status dot, authored in the block editor and rendered by the avatar element.
---

# Avatar

A person's **avatar** — a single circular (or squared) image with an optional ring, status dot and link, or an **overlapping group** with a "+N" counter for a team. Falls back to initials when there's no image. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Avatar element](/shortcodes/components/avatar) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/avatar/front.png" alt="The Avatar block — a ringed circular avatar with a status dot" width="160" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Mode (`mode_settings`) | A **single** avatar, or a **group** of overlapping avatars with a "+N" overflow counter. |
| Image + Name (`image`, `name`) | The photo; the name provides the initials fallback and the accessible label. |
| Status (`status`) | An online/away/busy status dot. |
| Design + Shape (`design`, `shape`, `size`) | Plain, bordered or ring treatment; circle or square; and the size. |
| Link (`link`, `target`) | Wrap the avatar in a link. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is a single ringed avatar with a status dot:

```html
<!-- wp:unysonplus/avatar {"upOptions":{"mode_settings":{"mode":"single","single":{"image":{...},"name":"Jordan Avery","status":"online"}},"design":"ring","size":"120"}} /-->
```

The `image` value is a media reference (`{"attachment_id":123,"url":"…"}`), so use the block's image picker rather than typing it by hand.

## The avatar element

The block and the page builder's [Avatar element](/shortcodes/components/avatar) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
