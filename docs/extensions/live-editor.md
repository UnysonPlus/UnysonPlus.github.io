---
sidebar_position: 5
title: "Free WordPress Live Front-End Editor"
sidebar_label: "Live Page Editor"
description: "Free WordPress live editor — edit your page-builder pages visually on the live front end and see every change in real time. Front-end editing without a premium page-builder license."
---

# Live Page Editor

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">Edit pages live on the front end — FREE!</p>
  <p class="ext-hero__sub">Build and tweak your pages visually on the real front end, seeing every change in context and in real time — front-end editing without a premium page-builder license.</p>
</div>

The **Live Page Editor** lets you edit Page Builder pages directly on the live
front end — hover any section, column or element to select it and change its
options in place, Avada-style, layered on top of the existing Page Builder.

It edits the **same content** as the classic backend builder (it's the one
builder model under the hood), so anything you do in one editor shows up in the
other. You can switch between them at any time.

## Opening the Live Editor

There are several entry points, all of which appear only for **Page Builder
pages you can edit**:

- **Admin bar** — while viewing a page on the front end, or on its edit screen,
  click **Edit Live**.
- **Publish box** — on the post-edit screen, click **Edit on Live Editor**.
- **Pages list** — hover a page row and click **Edit with Unyson+ Live Editor**.

To go the other way, the Live Editor toolbar has an **Edit in Backend** button
(the page icon) that returns you to the classic builder.

## The toolbar

From left to right:

| Control | What it does |
| --- | --- |
| **Logo** | Brand mark. |
| **+ Add** | Opens the element panel — drag an element onto the canvas. |
| **Sections** | Section navigator — jump to, reorder, and rename sections. |
| **Templates** | Insert / save / import / export builder templates. |
| **Device toggle** | Preview Desktop / Tablet / Mobile widths. |
| **Undo / Redo** | Step back and forth through your edits. |
| **Edit in Backend** | Switch to the classic builder for this page. |
| **Preview** | Open the live page in a new tab (shows the saved version). |
| **Exit** | Leave the editor (warns if you have unsaved changes). |
| **Save** | Save your changes. |

## Editing content

- **Select** — click any element, column or section. A breadcrumb
  (Section ▸ Column ▸ Element) appears so you can step up to a parent.
- **Edit options** — click the pencil on the hover toolbar, or use the
  right-click menu → **Edit**, to open that element's full options.
- **Inline text** — double-click a text block to edit it in place.
- **Inline images** — double-click an image to swap it from the Media Library.
- **Reorder** — drag the handle on the hover toolbar to move an element within
  or across columns and sections.
- **Resize columns** — drag a column's right edge to change its width on the
  12-column grid.

## Adding content

- **Elements** — open **+ Add**, then drag an element onto the canvas.
- **Sections** — use the **+ Add Section** zone at the bottom of the page (or the
  empty-state prompt) to pick a column structure.
- **Columns** — select a section and use **Add Column** (or the in-canvas
  **+ Add Column** zone) to add a column of a chosen width.

## Sections navigator

Click **Sections** to open the navigator:

- **Click** a row to jump to that section.
- **Drag** the grip to reorder sections.
- **Double-click** a section's name to rename it (this sets its CSS ID / anchor).

## Templates

Click **Templates** for a panel with three groups — **Full**, **Section** and
**Column**:

- **Insert** a saved template onto the page (full templates replace the page;
  sections and columns are added).
- **Save** the current page, the selected section, or the selected column as a
  reusable template.
- **Export** a template to a `.json` file and **Import** it back — handy for
  moving designs between sites.

Templates are shared with the backend builder, so anything saved in one editor
is available in the other.

## Hide / Show (responsive)

Every item has a device-aware **Hide / Show** control (in the right-click menu).
It hides the item on whichever device you're currently previewing — Desktop,
Tablet or Mobile — using the same **"Hide on"** option found on the element's
**Advanced** tab. Hidden items are dimmed in the canvas and disappear at the
matching breakpoint on the published page.

## Copy & Paste

- **Copy / Paste** — copy any item and paste a fresh copy elsewhere. The
  clipboard is shared with the backend builder and across pages, so you can copy
  in one editor and paste in the other.
- **Copy Settings / Paste Settings** — copy an element's **styling** (all of its
  options **except** its text content) and apply it to another element. Best
  between elements of the same type (e.g. button → button); across types only the
  shared settings are applied.

## Right-click menu

Right-click any item (or use the **⋮ More** button on its hover toolbar) for the
full action list:

> Edit · Duplicate · Copy · Paste · Copy Settings · Paste Settings ·
> Hide / Show · Save as Template · Delete

## Keyboard shortcuts

Shortcuts act on the selected item and are ignored while you're typing.

| Shortcut | Action |
| --- | --- |
| `Ctrl/⌘ + S` | Save |
| `Ctrl/⌘ + Z` / `Ctrl/⌘ + Y` | Undo / Redo |
| `Ctrl/⌘ + C` / `Ctrl/⌘ + V` | Copy / Paste |
| `Ctrl/⌘ + D` | Duplicate |
| `Delete` / `Backspace` | Delete (asks to confirm) |
| `Esc` | Close the menu, or deselect |

The backend builder shares most of these too — there, `Ctrl/⌘ + C` / `V` / `D`
act on the item **under your cursor** (the backend has no persistent selection),
and `Ctrl/⌘ + S` saves the post.

## Saving

**Save** writes your changes back to the page — the same place the backend
builder stores them. Page-chrome options that aren't part of the builder content
(header/footer, sidebar, page background, and so on) are still edited from the
backend Page Settings and apply when the page reloads.

## Revision history

Every save snapshots the page's builder content, so you can step back to an earlier
version. History is bounded on two axes, because each revision holds the *full* builder
model — around 1 MB on a rich page:

- **Count** — at most 20 revisions per page.
- **Size** — at most 3 MB of stored history per page, with a floor of 2 revisions so a
  heavy page always keeps something to step back to.

Revisions are stored compressed (real builder JSON deflates around 27x), and older
uncompressed revisions from before 2.16.20 still read back unchanged.

:::info[Why the size cap matters more than the count]
WordPress caches post meta **per post**, not per key — the first `get_post_meta()` call
for any key loads every row that post owns. Before the byte cap, one measured page held
11.5 MB of revisions, and a single unrelated meta read pulled 42 MB into memory on any
request that touched it. A count-only cap of 20 permitted roughly 20 MB per page.
:::

Raise or lower the budget with the `fw_le_revisions_max_bytes` filter:

```php
// 8 MB of revision history per page instead of 3.
add_filter( 'fw_le_revisions_max_bytes', function ( $bytes, $post_id ) {
    return 8 * 1024 * 1024;
}, 10, 2 );
```

Sites upgrading from an earlier version are pruned and compressed once, automatically, on
the next admin page load.

## See also

- [Page Builder](../page-builder/index.md)
- [Shortcodes](./shortcodes/index.md)
