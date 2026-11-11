---
sidebar_position: 5
title: "Free WordPress Live Front-End Editor"
sidebar_label: "Live Page Editor"
description: "Free WordPress live editor — edit your page-builder pages visually on the live front end and see every change in real time. Front-end editing without a premium page-builder license."
---

# Live Page Editor

<div class="ext-hero">
  <span class="ext-hero__badge">FREE!</span>
  <p class="ext-hero__title">Premium front-end editing, in real time.</p>
  <p class="ext-hero__sub">Build and tweak your pages visually on the real front end, seeing every change in context and in real time — front-end editing without a premium page-builder license.</p>
</div>

The **Live Page Editor** lets you edit Page Builder pages directly on the live
front end — hover any section, column or element to select it and change its
options in place, layered on top of the existing Page Builder.

It edits the **same content** as the classic backend builder (it's the one
builder model under the hood), so anything you do in one editor shows up in the
other. You can switch between them at any time.

:::tip[💡 Web dev tip: what you see isn't all a visitor gets]
Editing live and watching the page update in real time is great for layout and color, but it can
tempt you to judge a page purely by how it looks. A screen reader visitor and a search-engine crawler
both work from the underlying HTML — heading order, alt text, link text — not the visual result. Use
the Live Editor for the visuals, but still glance at heading structure and image alt text the way a
non-sighted user or a crawler would. [W3C WAI: Introduction to Web Accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/)
:::

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
| **Edit / Preview / Play** | Switch between editing the page (it holds still) and playing it as a visitor sees it — animations, scroll effects and hover — with your unsaved changes; **Play** replays the selected element right where it is, without leaving Edit. See [Edit and Preview modes](#edit-and-preview-modes). |
| **Undo / Redo** | Step back and forth through your edits. |
| **Edit in Backend** | Switch to the classic builder for this page. |
| **Open saved page** (eye icon) | Open the live page in a new tab (shows the saved version). |
| **Exit** | Leave the editor (warns if you have unsaved changes). |
| **Save** | Save your changes. |

## Edit and Preview modes

The **Edit / Preview** switch in the middle of the toolbar changes what the canvas does.

- **Edit** (the default) is for building. The page **holds still** in its final state: entrance and exit animations, Scroll Motion, scroll reveals, text effects, galleries, marquees, physics, animated backgrounds, card stacks, scrollytelling and every other Animation Engine effect settle, so every section, column and element is visible and easy to select, drag and edit. Elements re-rendered after a change show straight away, never hidden waiting for an entrance.
- **Preview** plays the page **exactly as a visitor sees it**, with your **unsaved changes**: entrance and exit animations, Scroll Motion, scroll-linked effects, pinned sections, galleries, hover effects and smooth scrolling all run, and you can scroll and hover the page. The selection outlines, inline editing and the editing panels are switched off and dimmed while you preview.

### Play: replay one element in place

To watch **one element**, select it and click **Play**. You stay in Edit: the element is centred on the canvas and **its section plays right there**, as a visitor sees it and with your unsaved changes. Entrance animations, Motion Galleries, hover effects, loops and text effects all run, and the rest of the page stays still around it. It appears in a few seconds, because only that one section is rendered, not the whole page.

A bar at the bottom offers:

| Button | What it does |
| --- | --- |
| **Replay** | Play the section again from the start. |
| **Full preview** | Switch to Preview with the page scrolled to the element, gliding it in from just below the screen. Use this for motion that needs the page to scroll (see below). **Back to Edit** then returns to the element, still selected. |
| **Done** | Close the replay. **Esc**, scrolling the canvas or changing the device width closes it too. |

Play works at every device width: at tablet or phone width the replay is laid out at that width.

:::note[What Play in place does not show]
The replay holds the page still, because scrolling is what closes it. Motion that runs **as you scroll** therefore needs **Full preview**: Scroll Motion and other scroll-linked effects, pinned sections, card stacks, scrollytelling, and **exit animations**, which play when an element scrolls off the screen. The rest of the section replays with it, so a neighbouring element with its own entrance plays as well.
:::

While in Preview, a bar at the bottom of the canvas offers **Replay** (reload the preview from the top, to watch the entrances again) and **Back to Edit**. The **device toggle** still works in Preview, so you can watch the page play at tablet and phone widths. **Save** and **Exit** stay available.

Back in Edit, the editing canvas reloads and your unsaved changes are put back into it.

:::note[How Edit holds everything still]
The editing canvas tells the page's scripts that the visitor prefers **reduced motion**, so every effect uses the still, fully visible version it already shows to visitors who ask for less motion. If a site has switched off **Respect "reduce motion"** (Theme Settings → Animation Engine → Engine Settings), a few effects (animated backgrounds, physics, confetti and the custom cursor) keep moving in Edit too.
:::

:::tip[Why not just open the page in a new tab?]
The eye icon still opens the **saved** page in a new tab. Preview shows the page **with your unsaved changes**, inside the editor, at the device width you picked, so you can try an animation, watch it, and tweak it without saving.
:::

Preview is only for you: it is built for each preview from the editor, is never cached, and is kept out of search engines. Links you click while previewing navigate inside the canvas; **Back to Edit** returns to the page you are editing.

## Interaction timeline

When the selected element has [Interactions](/animation-engine/interactions), an **Interaction timeline** button appears at the top right of the canvas. It opens a timeline docked under the canvas:

- **One row per step**, drawn as a bar on a seconds ruler, exactly where it will play: in step order, after or with the previous step, with its delay and duration. When a step animates several elements, its bar covers the whole stagger, with a tick where each one starts. State changes (*Put it in a state*…) are diamonds.
- **Drag a bar** to change the step's **delay**. **Drag its right edge** to change its **duration**. Both snap to 0.05 s and are written to the page like any other change: **Undo** works, and **Save** keeps it.
- **Scrub:** click or drag on the ruler to pose the canvas at that moment. **Play** runs the sequence on the canvas, and **⏮** goes back to the start. The preview uses the element's real targets on the Edit canvas, and closing the timeline puts them back as they were.
- **Several Interactions:** an element with two (for example a hover and a click) shows a tab for each.

The timeline follows the selection: select another element with Interactions and it shows that one's. State changes aren't previewed on the canvas; use the state's **Show this state on the canvas** button, or **Play**, for those. A timeline change is visible in the element's options the next time you open them.

## Show a state on the canvas

The Animation Engine's [States](/animation-engine/states) card gives an element named looks (Open, Active, Hidden…). In the Live Editor, each state has a **Show this state on the canvas** button. The options window steps aside, the element is centred, and it animates into the state using the values you have typed, even before saving. **Play again** repeats it, and **Back to the options** (or Esc) puts the element back as it was and brings the options window back.

## Pick an Interaction's target on the page

An [Interactions](/animation-engine/interactions) step animates an element named by a CSS selector. In the Live Editor, every *That match* field has a **Pick on the page** button. Click it and the options window steps aside: elements highlight as you point at them, with their name. Click the one the step should animate.

- If it has a **CSS ID**, the step uses it (`#promo`).
- Otherwise a short class such as `ix-b03cd5` is added to its CSS classes and used (`.ix-b03cd5`). Undo removes it like any other change.
- The step's **Animate** setting switches to match: *This element*, *Elements inside it* (when you picked something inside the element you're editing) or *Elements on the page*.

**Esc** or **Cancel** stops picking without changing anything. Click **Apply** or **Save** in the options window to keep the new target.

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
