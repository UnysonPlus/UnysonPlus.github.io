---
title: Rating stars — swap the symbol or shape
sidebar_position: 4
---

# Rating stars — swap the symbol or shape

Star ratings across UnysonPlus (Products, Testimonials, …) render through **one shared
helper**, `sc_rating_stars()`. Every star-showing element also exposes a **Rating** option
group — **Symbol** (Star / Heart / Dot), **Filled Color**, **Empty Color**, and **Size** — so
a site builder customizes the rating without code.

This page is for **developers** who want to go further: add a new rating **shape**, or replace
the symbol's SVG entirely.

## How it renders

A rating is a two-tone track: a **base row** of empty symbols plus a **fill row** of colored
symbols overlaid and clipped to the value, so a `4.3★` shows a partial last symbol. The symbol
is defined once per request as an SVG `<symbol>` and `<use>`d; the base CSS is self-injected.
Colors come from CSS `color` (base = empty color, fill = filled color).

Render one yourself:

```php
echo sc_rating_stars( 4.3, array(
    'symbol' => 'heart',        // star | heart | circle | <your key>
    'fill'   => '#ff5fa2',      // a CSS color, or a compact-color value
    'empty'  => '#f3d9e6',
    'size'   => 'md',           // sm | md | lg | any CSS length (e.g. '20px')
    'max'    => 5,
) );
```

## Add a new shape — `sc_rating_star_paths`

The symbol choices map to a **filled** SVG path. Register more by filtering
`sc_rating_star_paths` (key → `{ vb: viewBox, d: path }`):

```php
add_filter( 'sc_rating_star_paths', function ( $paths ) {
    $paths['sparkle'] = array(
        'vb' => '0 0 24 24',
        'd'  => 'M12 2l2.2 6.6H21l-5.4 4 2 6.6L12 15.6 6.4 19.2l2-6.6L3 8.6h6.8z',
    );
    return $paths;
} );
```

Now `sc_rating_stars( 4, array( 'symbol' => 'sparkle' ) )` uses it. To also offer it in the
**Symbol** dropdown, add the choice to a shortcode's `rating_symbol` option (filter
`sc_rating_style_field`'s output where you consume it, or extend the element's options).

:::tip Use a *filled* shape
The two-tone fill works by coloring a solid shape and clipping it by width. Outline/stroked
icons and emoji don't fill cleanly — supply a closed, filled `path` (like the built-in star).
:::

## Replace the SVG entirely — `sc_rating_star_svg`

To return your own markup for a symbol's inner SVG (multiple paths, a `<g>`, gradients, …),
filter `sc_rating_star_svg`. Return non-empty to override; the string is placed inside the
`<symbol viewBox="…">`:

```php
add_filter( 'sc_rating_star_svg', function ( $markup, $symbol, $args ) {
    if ( $symbol !== 'star' ) { return $markup; }
    // Two-path star (outline + fill), both currentColor so the base/fill colors apply.
    return '<path fill="currentColor" d="M12 2l3 6.3 6.9.8-5 4.8 1.3 6.8L12 17.3 5.8 20.7 7 13.9 2 9.1l6.9-.8z"/>';
}, 10, 3 );
```

Keep fills as `currentColor` so the element's Filled/Empty colors still drive the two tones.

## Use it in your own element

1. Merge the option group into your shortcode's options:

   ```php
   'group_rating' => array(
       'type'    => 'group',
       'options' => function_exists( 'sc_rating_style_field' ) ? sc_rating_style_field() : array(),
   ),
   ```

2. Render, reading the saved values back with `sc_rating_style_from_atts()`:

   ```php
   $args = sc_rating_style_from_atts( $atts );        // symbol / fill / empty / size
   echo sc_rating_stars( $rating, $args );
   ```

That's it — your element gets the same Rating controls and shape hooks as everything else.
