---
title: Section backgrounds (custom effects)
sidebar_position: 3
---

# Section backgrounds & custom effects

UnysonPlus has a small, shared runtime that turns **any element into a full-bleed background of its Section**, with the Section's own content automatically lifted on top. Several elements expose it as a **Use as Section Background** toggle (e.g. [Before / After](../shortcodes/media-elements/before-after.md), WebGL Object). This page shows how to:

1. add the same toggle to **your own shortcode**, and
2. register a **custom animated background effect** (canvas / SVG / DOM) from a child theme's `functions.php` — no plugin edits.

Everything loads **on demand**: a page ships the runtime (and any effect's CSS/JS) only when a section background actually renders on it.

## How the runtime works

When an element carries the class **`.sc-bg-fill`**, the shared script `window.scBgFill(el)`:

- finds the nearest **`<section>`** (breaking out of the boxed, centered `.fw-container`),
- marks it `.sc-bg-host` (`position: relative`) and moves the element in as the **first child** (`position: absolute; inset: 0`),
- **lifts the Section's other children** above it (`position: relative; z-index: 1`).

Elements without `data-sc-bg-managed` are lifted automatically on DOM ready. An element that needs the host for its own interaction adds `data-sc-bg-managed` and calls `window.scBgFill(el)` itself (it returns the host).

:::info Give the Section a height
The backdrop is absolutely positioned (`inset: 0`), so the Section needs a **min-height** (or other content) to fill.
:::

## Add the toggle to your own shortcode

Three lines wire it up. In your shortcode's `options.php`:

```php
'as_background' => sc_section_background_field(),
// or override the copy:
'as_background' => sc_section_background_field( array(
    'desc' => __( 'Fill the Section behind your content.', 'fw' ),
) ),
```

In your `view.php`, when the toggle is on, add the `.sc-bg-fill` class and flag the page so the runtime enqueues:

```php
if ( sc_section_background_is_on( fw_akg( 'as_background', $atts, 'no' ) ) ) {
    $classes[] = 'sc-bg-fill';   // shared: fill + behind
    sc_section_background_use();  // enqueue the runtime on demand
}
```

Then, in your element's own CSS, make the inner media cover the backdrop (the shared `.sc-bg-fill img` already does `object-fit: cover`, so a plain `<img>` needs nothing extra).

## Register a custom effect (from `functions.php`)

For a *generative* background — a starfield, particles, a shader — register a named effect through the **`sc_section_background_effects`** filter. Each effect can carry a CSS file, a JS file, and a `render` callback for its markup:

```php
add_filter( 'sc_section_background_effects', function ( $effects ) {
    $effects['starfield'] = array(
        'label'  => 'Starfield',
        'css'    => get_stylesheet_directory_uri() . '/bg-effects/starfield.css',
        'js'     => get_stylesheet_directory_uri() . '/bg-effects/starfield.js',
        'ver'    => '1.0.0',                    // optional, for cache-busting
        'deps'   => array(),                    // optional extra script deps
        'class'  => '',                         // optional extra wrapper class
        'render' => function ( $args ) {        // optional inner markup
            $density = isset( $args['density'] ) ? (int) $args['density'] : 120;
            return '<canvas class="starfield-canvas" data-density="' . esc_attr( $density ) . '"></canvas>';
        },
    );
    return $effects;
} );
```

| Key | Purpose |
| --- | --- |
| `label` | Human name (for listings / future UI). |
| `css` / `js` | Asset URIs, loaded **on demand** when the effect is used. The JS depends on `sc-bg-fill`, so `window.scBgFill` is available. |
| `ver` | Optional version string (cache-bust). Defaults to the extension version. |
| `deps` | Optional extra script handles the JS depends on. |
| `class` | Optional extra class added to the backdrop wrapper. |
| `render($args)` | Optional callback returning the backdrop's inner HTML (a `<canvas>`, `<svg>`, etc.). |

### Output it inside a Section

Call **`sc_section_background_render()`** wherever you emit a `<section>` — a PHP template, a Theme Builder block, or a custom shortcode's view. It returns the backdrop markup and flags the page so the effect's assets enqueue:

```php
// e.g. a tiny shortcode a user can drop into a Section
add_shortcode( 'starfield_bg', function ( $atts ) {
    $atts = shortcode_atts( array( 'density' => 120 ), $atts );
    return sc_section_background_render( 'starfield', array( 'density' => (int) $atts['density'] ) );
} );
```

That outputs:

```html
<div class="sc-bg-fill sc-bg-effect sc-bg-effect--starfield" data-sc-bg-effect="starfield">
  <canvas class="starfield-canvas" data-density="120"></canvas>
</div>
```

The runtime lifts it to fill the enclosing `<section>` and puts the Section's content on top. Unknown effect ids return an empty string.

### The effect's assets

Your `starfield.css` styles the canvas (the shared runtime already sizes a direct-child `<canvas>`/`<svg>` to `100%`), and `starfield.js` animates it:

```js
// starfield.js — depends on sc-bg-fill, so it runs after the element is lifted
document.querySelectorAll('.sc-bg-effect--starfield .starfield-canvas').forEach((cv) => {
  const ctx = cv.getContext('2d');
  const density = +cv.dataset.density || 120;
  // …size to cv.clientWidth/Height, spawn `density` stars, animate on rAF…
});
```

:::tip Pause off-screen / in background tabs
For continuous animations, drive them from the Animation Engine's shared frame loop when it's present — `window.upwAnimRaf?.add(fn)` — so they pause automatically in background tabs. Fall back to `requestAnimationFrame` when it isn't.
:::

## Helper reference

| Function | Description |
| --- | --- |
| `sc_section_background_field( $args )` | Returns a drop-in **Use as Section Background** Yes/No option. Override `label` / `desc` / `help` / `value` via `$args`. |
| `sc_section_background_is_on( $value )` | Tolerant truthiness for a switch value (`yes` / `true` / `1`). |
| `sc_section_background_use( $effect = '' )` | Flags the page so the runtime enqueues; pass an effect id to also load that effect's assets. |
| `sc_section_background_effects()` | The registered-effects array (applies the `sc_section_background_effects` filter). |
| `sc_section_background_render( $id, $args )` | Renders a registered effect's backdrop markup (empty string if unknown). |

## CSS / JS contract

| Token | Meaning |
| --- | --- |
| `.sc-bg-fill` | Marks an element as a Section backdrop (fills `inset: 0`, `pointer-events: none`, layout props are `!important` so they win regardless of stylesheet order). |
| `.sc-bg-host` | Added by the runtime to the host `<section>`. |
| `data-sc-bg-managed` | On an element = "I lift myself" — the auto-init skips it; call `window.scBgFill(el)` yourself. |
| `window.scBgFill(el)` | Lifts `el` into its Section and **returns the host** element. |
