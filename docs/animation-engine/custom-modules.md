---
sidebar_position: 20
title: Add your own module / effect
---

# Add your own module or effect

The Animation Engine is an **open platform** — you can add your own effect (or a whole module) entirely from your **child theme's `functions.php`**, with no core edits. The built-in modules aren't special; they register through the exact same public hooks, and the **"Add Animation" inserter picks up anything you add automatically** — category tab, keyword search, and a fallback icon included.

There are three pieces to a per-element effect:

1. **Register the field** — it appears as a tile in the inserter.
2. **Emit it onto the element wrapper** — classes / `data-*` attributes on the front end.
3. **Enqueue your runtime** — your own CSS/JS, only where the effect is used.

---

## 1. Register the field

Hook **`sc_animation_fields`** and add a `multi-picker` keyed by your effect's slug. The `anim_meta` array is what the inserter reads.

```php
add_filter( 'sc_animation_fields', function ( $fields ) {
    $fields['my_glow'] = array(
        'type'         => 'multi-picker',
        'popover'      => true,
        'label'        => __( 'Neon Glow', 'my-theme' ),
        'desc'         => __( 'A pulsing neon glow around the element.', 'my-theme' ),
        'show_borders' => false,
        'value'        => array( 'mode' => 'off' ),

        // Inserter metadata:
        'anim_meta' => array(
            'category' => 'Custom',   // makes (or reuses) a "Custom" tab + groups the tile there
            // 'multi' => true,       // set true to let the user add this effect MORE THAN once
        ),

        // The picker choices double as SEARCH KEYWORDS — a user can find your module by an
        // effect name (e.g. searching "cyan" would surface this tile).
        'picker' => array(
            'mode' => array(
                'type'    => 'image-picker',
                'label'   => false,
                'value'   => 'off',
                'choices' => array(
                    'off'  => array( 'label' => __( 'Off', 'my-theme' ),  'small' => array( 'src' => get_stylesheet_directory_uri() . '/img/glow-off.svg',  'height' => 66 ) ),
                    'cyan' => array( 'label' => __( 'Cyan', 'my-theme' ), 'small' => array( 'src' => get_stylesheet_directory_uri() . '/img/glow-cyan.svg', 'height' => 66 ) ),
                    'pink' => array( 'label' => __( 'Pink', 'my-theme' ), 'small' => array( 'src' => get_stylesheet_directory_uri() . '/img/glow-pink.svg', 'height' => 66 ) ),
                ),
            ),
        ),

        // Options revealed once a colour is chosen (per choice key):
        'choices' => array(
            'cyan' => array( 'group' => array( 'type' => 'group', 'options' => array(
                'speed' => array( 'type' => 'slider', 'label' => __( 'Pulse speed (s)', 'my-theme' ), 'value' => 1.5, 'properties' => array( 'min' => 0.5, 'max' => 4, 'step' => 0.1 ) ),
            ) ) ),
            'pink' => array( 'group' => array( 'type' => 'group', 'options' => array(
                'speed' => array( 'type' => 'slider', 'label' => __( 'Pulse speed (s)', 'my-theme' ), 'value' => 1.5, 'properties' => array( 'min' => 0.5, 'max' => 4, 'step' => 0.1 ) ),
            ) ) ),
        ),
    );
    return $fields;
} );
```

The saved value shape is `my_glow = array( 'mode' => 'cyan', 'cyan' => array( 'speed' => 1.5 ) )`.

:::tip Swatch convention
Match the built-in tiles so yours look native: an SVG at **`viewBox="0 0 132 96"`** (landscape), **no background rect** (transparent), the motif on top, and a **baked label** near the bottom (`<text x="66" y="86" font-size="15" font-weight="600" fill="#475569">`). Set the tile `'height' => 66` (small) / `132` (large). Don't add a per-module tile-size CSS override.
:::

---

## 2. Emit it onto the wrapper

Hook **`sc_build_wrapper_attr`** to add your class / attributes, and **`sc_needs_wrapper`** so leaf elements (a heading, a text block) actually get a wrapper to hold them.

```php
add_filter( 'sc_build_wrapper_attr', function ( $attr, $atts ) {
    $g    = ( isset( $atts['my_glow'] ) && is_array( $atts['my_glow'] ) ) ? $atts['my_glow'] : array();
    $mode = isset( $g['mode'] ) ? (string) $g['mode'] : 'off';
    if ( ! in_array( $mode, array( 'cyan', 'pink' ), true ) ) {
        return $attr;
    }
    $o     = ( isset( $g[ $mode ] ) && is_array( $g[ $mode ] ) ) ? $g[ $mode ] : array();
    $speed = isset( $o['speed'] ) ? (float) $o['speed'] : 1.5;

    $cls           = isset( $attr['class'] ) ? trim( (string) $attr['class'] ) : '';
    $attr['class'] = esc_attr( trim( $cls . ' my-glow my-glow--' . $mode ) );
    $attr['style'] = esc_attr( ( isset( $attr['style'] ) ? rtrim( $attr['style'], '; ' ) . '; ' : '' ) . '--glow-speed:' . $speed . 's;' );
    return $attr;
}, 20, 2 );

add_filter( 'sc_needs_wrapper', function ( $needs, $atts ) {
    if ( $needs ) { return $needs; }
    $mode = isset( $atts['my_glow']['mode'] ) ? $atts['my_glow']['mode'] : 'off';
    return in_array( $mode, array( 'cyan', 'pink' ), true );
}, 10, 2 );
```

---

## 3. Enqueue your runtime

Load your own assets — ideally only when the effect is used. Pure CSS needs no JS:

```php
add_action( 'wp_enqueue_scripts', function () {
    wp_enqueue_style( 'my-glow', get_stylesheet_directory_uri() . '/css/my-glow.css', array(), '1.0.0' );
} );
```

```css
/* my-glow.css */
.my-glow--cyan { animation: my-glow-cyan var(--glow-speed, 1.5s) ease-in-out infinite; }
.my-glow--pink { animation: my-glow-pink var(--glow-speed, 1.5s) ease-in-out infinite; }
@keyframes my-glow-cyan { 50% { box-shadow: 0 0 18px 2px #22d3ee; } }
@keyframes my-glow-pink { 50% { box-shadow: 0 0 18px 2px #ec4899; } }
@media (prefers-reduced-motion: reduce) { .my-glow--cyan, .my-glow--pink { animation: none; } }
```

That's it — your effect now shows in **Add Animation**, is searchable by name, and works on any element.

---

## A Section-only module

If your effect only makes sense on a **Section** (like a pinned scroll effect), don't use `sc_animation_fields` (which hits every element). Instead hook **`fw_shortcode_get_options`** for the `section` tag and inject your field **inside the inserter container** (`animation_stack`), exactly like the built-in Infinite Scroll Loop:

```php
add_filter( 'fw_shortcode_get_options', function ( $options, $tag = '' ) {
    if ( $tag !== 'section' || ! isset( $options['tab_animation']['options'] ) ) {
        return $options;
    }
    $tab = &$options['tab_animation']['options'];
    $my  = array( 'my_section_fx' => array( /* same multi-picker field shape as above */ ) );

    if ( isset( $tab['animation_stack']['options'] ) ) {
        $tab['animation_stack']['options'] = array_merge( $tab['animation_stack']['options'], $my );
    } else {
        $tab = array_merge( $tab, $my ); // fallback if the organizer isn't present
    }
    unset( $tab );
    return $options;
}, 10, 2 );
```

---

## Combinable effects (multi-instance)

Set **`anim_meta['multi'] => true`** on your field and the inserter lets the user add your effect to an element **more than once** — its tile stays in the grid and each click drops a new configurable card (the built-in Hover module works this way, e.g. *Lift + Ripple* together). Your `sc_build_wrapper_attr` handler should then read every instance — the base key plus any `<key>__2`, `<key>__3`, … — and apply them all.

```php
// Collect all instances the user added (base + __N slots):
foreach ( $atts as $k => $v ) {
    if ( $k !== 'my_glow' && ! preg_match( '/^my_glow__\d+$/', $k ) ) { continue; }
    // …apply each active instance…
}
```

---

## Summary of the hooks

| Hook | Purpose |
| --- | --- |
| `sc_animation_fields` | Register a **per-element** effect (adds a tile to Add Animation) |
| `fw_shortcode_get_options` (`section`) | Register a **Section-only** effect (inject into `animation_stack`) |
| `sc_build_wrapper_attr` | Emit classes / `data-*` / CSS vars onto the element wrapper |
| `sc_needs_wrapper` | Force a wrapper on leaf elements so your attrs have somewhere to land |
| `wp_enqueue_scripts` / `wp_footer` | Load your CSS/JS runtime |
| `anim_meta['category']` | Which inserter tab your tile groups under |
| `anim_meta['multi']` | Allow the effect to be added more than once and combined |
