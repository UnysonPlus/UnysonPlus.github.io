---
title: Text Expander
sidebar_position: 7
---

# Text Expander

Show a short excerpt with a **Read more** toggle that reveals the rest — for long copy, FAQs,
disclosures and specification lists. Core has no equivalent block.

The block renders through the [`text_expander`](/shortcodes/content-elements/text-expander)
element — the same PHP that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `visible_content` | The excerpt shown before expanding — edits markup, see below |
| `hidden_content` | The rest, revealed on toggle — edits markup, see below |
| `btn_show` | Label for the expand button |
| `btn_hide` | Label for the collapse button |
| `toggle_icon` | Icon shown on the toggle |
| `show_btn_position` | Where the expand button sits |
| `hide_btn_position` | Where the collapse button sits |
| `count_mode` | How the truncation length is measured |
| `show_ellipsis` | Print an ellipsis at the cut |
| `merge_boundary` | Join the two halves cleanly mid-sentence |
| `click_anywhere` | Let a click anywhere in the block toggle it |
| `initially_open` | Start expanded |
| `visible_color` | Excerpt text colour |
| `hidden_color` | Revealed text colour |
| `btn_color` | Toggle button colour |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change.

:::note[The preview shows both halves, expanded]
The collapse is applied by the element's front-end script, which the block deliberately does not
replay. So the canvas shows the excerpt **and** the hidden content, with both button labels — not
the collapsed state a visitor first sees.

That is the better preview while editing: you are writing both halves and want to see both.
Replaying the runtime would hide the text you just typed, and a click meant to select the block
would silently expand it instead. Visitors get the real toggle.
:::

:::note[Both content fields edit markup, not rich text]
`visible_content` and `hidden_content` are [`wp-editor`](/options/option-types/wp-editor)
options, so in a block sidebar they edit **HTML directly** rather than showing a WYSIWYG — the
reasoning is on that option type's page.
:::

:::note[`native_details` is page-builder only]
The element can render as a native `<details>` / `<summary>` pair instead. That swaps the markup,
the styling hooks and the keyboard behaviour all at once — a structural choice worth making in the
page builder where the result sits next to everything else, rather than a switch to flip in a narrow
sidebar.
:::
