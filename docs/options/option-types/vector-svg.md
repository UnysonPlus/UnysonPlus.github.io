---
title: "Vector SVG"
sidebar_position: 44.6
description: The Unyson+ vector-svg option type, a field with a drawing editor (pen, shapes, boolean operations) whose value is clean, sanitised inline SVG.
---

A drawing field. It shows a preview of the shape, a **Draw / edit shape** button that opens a full-screen vector
editor, and an **SVG code** box for pasting or fine-tuning the markup. The stored value is the SVG markup string,
**sanitised on save**.

The editor has a pen with points and curve handles, rectangles, ellipses, polygons and stars, Union / Subtract /
Intersect / Exclude, fill and outline colours, stacking order, undo and redo, and keyboard shortcuts. The
[Vector Shape](/shortcodes/media-elements/vector-shape#the-drawing-editor) page explains every tool.

<img src="/img/shortcodes/vector-shape-editor.png" alt="The vector-svg drawing editor" width="1300" />

```php
$options = [
	'badge_shape' => [
		'type'  => 'vector-svg',
		'label' => __( 'Badge shape', 'my-theme' ),
		'desc'  => __( 'Draw it with Draw / edit shape, or paste SVG code.', 'my-theme' ),
		'value' => '', // or a starting <svg>…</svg>
	],
];
```

## Options

| Key | Type | Default | What it does |
| --- | --- | --- | --- |
| `value` | string | `''` | The starting SVG markup (sanitised the same way as a saved value) |
| `label` | string / bool | `false` | The label column; `false` hides it |
| `desc` | string / bool | `false` | Help text under the field |

## Behaviour

- **Draw or paste.** The editor writes SVG into the code box when you choose **Save shape**; you can also paste markup
  straight into the code box. Reopening the editor loads the saved SVG back as editable shapes.
- **Clean output.** Each shape is written as its own `<path>`, `<rect>`, `<ellipse>`… with its own `fill`, `stroke`
  and (when needed) `fill-rule`, and the `viewBox` fits the drawing (outlines included). No editor-only groups or styles are left in.
- **Only kept if it is SVG.** A value without `<svg` is stored as `''`. Everything else goes through
  `fw_upw_sanitize_svg()`: scripts, event handlers and outside references are removed.
- **Loaded only when used.** The drawing library (paper.js 0.12.18, MIT, bundled in
  `framework/includes/option-types/vector-svg/static/vendor/paper/`) loads the first time the editor opens, not with
  every options screen.

## Reading the value

The value is a string of sanitised SVG markup, ready to print:

```php
// In a shortcode view
echo $atts['badge_shape'];

// A per-page option
echo fw_get_db_post_option( get_the_ID(), 'badge_shape' );

// A Theme Settings option
echo fw_get_db_settings_option( 'badge_shape' );
```

To recolour it like an icon, wrap it and set its fills to `currentColor` with CSS, as the Vector Shape element's
**One colour** mode does:

```css
.my-badge [fill]:not([fill="none"]) { fill: currentColor; }
.my-badge [stroke]:not([stroke="none"]) { stroke: currentColor; }
```

## Saved value

```text
<svg xmlns="http://www.w3.org/2000/svg" viewBox="300 149.63 500 270"><path d="M300,329.63v-180h200v72c6.46,-1.31 …z" fill="#00b295"/><path d="M700,149.63l100,180h-150z" fill="#00b295"/></svg>
```

## Opening the editor from your own script

The editor is also available on any admin screen that has the option type's scripts:

```js
window.fwVectorSvg.open( '<svg …>…</svg>', function ( svg ) {
	// called with the new markup when the user chooses Save shape
} );
```

## Compared with `svg-code`

[`svg-code`](./svg-code.md) is a paste-or-upload box for SVG made elsewhere. `vector-svg` adds the drawing editor. Both
store a sanitised SVG string, so switching an option from one to the other needs no migration.

## Where it is used

The [Vector Shape](/shortcodes/media-elements/vector-shape) element.
