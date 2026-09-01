---
sidebar_position: 3
title: Architecture
description: How an Unyson+ block is built — one element, two authoring surfaces, one render path — and why the block library can never fork from the page builder.
---

# Block architecture

A block in the Unyson+ [blocks extension](./roadmap)
is not a second copy of an element. It is a second *front door* onto the element
that already exists. Everything below follows from one rule:

> A block is a second **authoring** surface, never a second **rendering** path.

The page builder and the block editor are two ways to *configure* the same element.
The HTML that reaches the browser is produced by the same server-side code either
way. That single decision is what keeps a 100-plus element library from quietly
becoming two libraries that drift apart.

## Anatomy of a block

Every block is an ordinary folder a WordPress developer would recognise — a
`block.json` manifest, a `src/` React entry, and a compiled `build/`:

```
blocks/<name>/
├── block.json        # the manifest — read by BOTH PHP and JS
├── src/index.jsx     # the editor: inspector + preview
└── build/            # compiled bundle (index.js / index.min.js)
```

The manifest is deliberately thin (`apiVersion: 3`):

```json
{
  "apiVersion": 3,
  "name": "unysonplus/button",
  "category": "unysonplus",
  "textdomain": "fw",
  "attributes": { "upOptions": { "type": "object" } },
  "supports": { "align": true, "spacing": { "margin": true, "padding": true } },
  "editorScript": "fw-block-button"
}
```

Two things stand out:

- **A single `upOptions` attribute.** A block does not enumerate one attribute per
  control. It stores the element's option *values* as one object, keyed by the same
  `/`-delimited paths the page builder uses. `block.json` is read by both PHP and
  JavaScript, so the stored shape cannot drift between the two.
- **No `render`, `script` or `viewScript`.** The manifest describes the editor only.
  The front end is wired in PHP (below), not through `block.json`'s file-render.

## One render path

`save()` returns `null` in every block. Nothing but the attributes is serialised
into post content — the block is **fully dynamic**. At render time PHP takes over:

```php
register_block_type( $block_path, array(
    'render_callback' => make_render_callback( $shortcode ),
) );
```

`make_render_callback()` hands the block's sparse `upOptions` to the matching Unyson
shortcode, back-filling every default the author left untouched
(`fw_get_options_values_from_input()`), and returns the shortcode's own view. Container
blocks pass their inner blocks through `do_shortcode()` so nesting works exactly as it
does in the builder.

The consequence is worth stating plainly: **front-end HTML, enqueued CSS/JS and
animation hooks are identical** whether an element was placed in the page builder or
the block editor. There is nothing to keep in sync because there is only one renderer.

## The editor preview

Because the true render lives in PHP, the editor doesn't reimplement it. Each block
previews itself with core's `ServerSideRender`, wrapped in `<Disabled>` so the real
shortcode output shows in the canvas without becoming interactive:

```jsx
<Disabled>
  <ServerSideRender block="unysonplus/button" attributes={{ upOptions }} />
</Disabled>
```

What you see while editing is the actual front-end output — the same single source of
truth, one step early.

## Inspectors from the option schema

The sidebar controls are **not hand-written per block**. That is the piece that makes
100-plus blocks maintainable, and it rests on a dedicated React renderer for the
Unyson option schema, published as `window.fw.controls`.

At registration each block ships its option schema to the editor:

```php
wp_add_inline_script( 'fw-block-button',
  'window.fwBlocks["unysonplus/button"] = ' . wp_json_encode( array(
      'options'        => $option_schema,
      'no_options_note'=> $note,
  ) ) . ';'
);
```

The block's `src/index.jsx` then iterates that schema and renders each option through
the control layer:

```jsx
Object.entries( window.fwBlocks[ name ].options ).map( ( [ id, option ] ) =>
  <fw.controls.Option
    id={ id }
    option={ option }
    value={ getPath( upOptions, id ) }
    onChange={ v => setUpOptions( setPath( upOptions, id, v ) ) }
  />
);
```

`getPath` / `setPath` mirror PHP's `fw_akg()`, so the inspector and the renderer read
and write the *same* paths. The option schema is the single source of truth for both.

`fw.controls` is a real, purpose-built library — roughly **44 React control components**
covering **~60 option-type strings** (text, select, switch, slider, typography, spacing,
colour and RGBA pickers, gradients, background-pro, icon and image pickers, multi-picker,
addable box/popup, box-shadow, responsive, code and WP editors, and more). It is enqueued
by `UnysonPlus\Admin\Controls\Registry` under the handle `fw-controls`, and it consumes
`wp.element` rather than bundling its own React.

Coverage is deliberately partial. An option type the control layer does not yet render
degrades to a clear notice — *edit this option in the page builder* — rather than a broken
control. Inspector coverage grows over time; it never blocks a block from shipping.

## Inheriting the design system

Wherever a native control will do, blocks lean on core `supports` — `align`, `spacing`,
and (per block) colour and typography — instead of bespoke UI. Those core controls read
the palette, font sizes and spacing scale that the theme publishes to `theme.json`
([Roadmap, Phase 1](./roadmap)). So an
Unyson+ block picks up the site's design system for free, from the same source Global
Styles and every core block use.

## Build

The bundles are compiled with an **esbuild** pipeline (not `@wordpress/scripts`), and
JSX is transformed to `wp.element.createElement` — no React is bundled. `SCRIPT_DEBUG`
selects the readable `.js` build over the minified `.min.js`.

## Why it holds together

| Concern | How the architecture answers it |
|---|---|
| Front end drifting between builder and blocks | One render path — `render_callback` delegates to the shortcode |
| Attributes drifting between PHP and JS | One `block.json`, read by both; `upOptions` keyed by shared paths |
| A separate control UI to maintain per block | Inspectors generated from the option schema via `fw.controls` |
| A second design system to keep in step | Core `supports` inherit the theme's `theme.json` |

The block library adds an authoring surface without adding a second copy of anything
that matters — which is exactly what the [Overview](./intro) means by *join, don't
convert*.
