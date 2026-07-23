---
slug: gallery-card-links-live-on-the-attachment
title: "Why gallery card links live ON the image (attachment meta), and post-driven galleries came free"
authors: [jon]
tags: [option-types, architecture]
date: 2026-07-23
description: The 3D Gallery needed an "Open Link" card click, but its multi-upload Images option stores bare attachment IDs with no per-item fields. The URL became a "Link URL" field on the Media Library attachment itself (meta _upw_link_url, added via attachment_fields_to_edit) rather than an order-matched URL list — and a new Post Type source makes cards from featured images that link to their posts automatically.
---

**The question:** cards needed to link somewhere on click — a per-image URL, and ideally "each
portfolio card links to its portfolio page." Where does a per-image URL live when the Images option
is a `multi-upload` that stores only attachment IDs?

<!-- truncate -->

**Context:** `multi-upload` has no per-item fields, and the gallery's whole content model reads
per-image data (alt, caption, title, description) from the Media Library. The click action had only
Lightbox / Do Nothing.

**Options considered:**

- **An order-matched URL list** (addable rows beside the images) — breaks silently the moment images
  are reordered or removed; two lists pretending to be one.
- **Abusing the attachment Description field as a URL** — collides with Caption Source, which already
  offers Description as caption text.
- **Restructuring Images into an addable-box of {image, link}** — per-item fields, but a breaking
  value-shape change to the images option and a worse multi-image picking UX.
- **A "Link URL" field on the attachment itself** — `attachment_fields_to_edit`/`_save` puts a field
  in the media modal under Alt/Caption, stored as `_upw_link_url` meta.
- **For the portfolio case specifically: a Post Type source** — cards built from a post type's
  featured images, link = permalink, no per-image config at all.

**Decision:** both ends. The link lives **on the attachment** (`_upw_link_url` via the media-modal
field), read when On Card Click = Open Link, with external hosts auto-opening a new tab (the
`tag_list` convention) and alt falling back caption → title so linked cards always have an
accessible name. And the Content tab gained a **Source picker** (Media Library | Post Type — a NEW
key, so old saves are untouched and `images` keeps its original path): the Post Type choice lists
public types with featured-image support dynamically, so Portfolio appears when that extension is
active with no hard dependency, and each card links to its post automatically.

**Why:** the URL belongs to the *image*, in the same place its caption and alt already live — it
follows the image wherever it is reused, survives reordering, and is edited through the builder's
normal "Edit image" flow (the media-replaceability rule). And the strongest use case for per-card
links — "my portfolio, linked" — is better served by not entering URLs at all: the Post Type source
derives cards *and* links from content that already exists, and stays fresh as posts are published.
