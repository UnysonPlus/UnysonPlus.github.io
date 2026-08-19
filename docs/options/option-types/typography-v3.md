---
title: "Typography v3 (fluid)"
sidebar_position: 27.5
---

One self-contained **fluid typography** control. Instead of sizing each heading independently, it drives
**H1–H6 from a single modular type scale** — a base size multiplied by a ratio — and emits
**accessibility-safe `clamp()`** sizes that scale smoothly across every screen, with **no breakpoint
jumps**. It packages what the General → Typography tab assembles from separate controls into one reusable
option, so any tab or shortcode can drop it in.

Unlike [`typography`](./typography.md) / [`typography-v2`](./typography-v2.md) (which size one element), a
single `typography-v3` control configures the fonts **and** the whole heading scale at once.

```php
$options = [
	'demo_typography_v3' => [
		'label' => __( 'Typography V3 (fluid type scale)', 'unysonplus' ), // or false to hide the label column
		'type'  => 'typography-v3',
		'desc'  => __( 'Heading + body fonts, plus a fluid modular scale that drives H1–H6.', 'unysonplus' ),
		// 'value' is optional — the defaults below are built in.
		'value' => [
			'heading_family' => [ 'family' => '' ],           // '' → inherit the body font
			'body'           => [ 'family' => 'Open Sans', 'variation' => 'regular',
			                      'size' => 16, 'line-height' => 1.6, 'letter-spacing' => 0, 'color' => '' ],
			'ratio'          => '1.25',                         // desktop step ratio (Major Third)
			'ratio_mobile'   => '1.2',                          // gentler ratio on phones
		],
		// — Optional attributes you can add —
		// 'attr' => [ 'class' => 'my-class' ],
	],
];
```

## What it renders

The control is a **composite** — it stacks proven inner controls, so it inherits their behaviour:

| Row | Inner control | Purpose |
|---|---|---|
| **Heading Font** | [`typography`](./typography.md) (family only) | Family for all headings; empty inherits the body font |
| **Body Font & Text** | [`typography`](./typography.md) (full) | Family, size, line-height, letter-spacing, colour. **The Body size is the scale's base.** |
| **Scale Ratio — Desktop** | `select` | Step-to-step multiplier on large screens (Minor Third → Golden). Drives H1–H6 as fluid `clamp()` sizes. |
| **Scale Ratio — Mobile** | `select` | Gentler multiplier at the small end, so big headings shrink more than body text on phones |

The control is *always* fluid — there is no on/off switch. It is, by definition, a fluid type-scale
control; if you want a single fixed size for one element, use [`typography`](./typography.md) /
[`typography-v2`](./typography-v2.md) instead.

## How the fluid scale works

The Body size is the **base** (step 0). Each step multiplies by the ratio, so the scale is coherent
rather than a set of independently hand-tuned sizes. Two ratios are used — a stronger one at the desktop
end, a gentler one at the mobile end — and every step is emitted as a `clamp()` that interpolates between
them:

```css
/* base 16px, Major Third (1.25) desktop / Minor Third (1.2) mobile */
--fs-6: clamp(2.986rem, 2.6617rem + 1.4412vw, 3.8147rem); /* ~48→61px */
--fs-5: clamp(2.4883rem, 2.2678rem + 0.9799vw, 3.0518rem);
--fs-1: clamp(1.2rem, 1.1804rem + 0.087vw, 1.25rem);      /* ~19→20px */
--fs-0: 1rem;                                             /* body — fixed */
--fs-n1: 0.8rem;                                          /* caption — fixed small */
```

H1–H6 map to steps 6→1 (`--h1-font-size` = `--fs-6`, and so on); their line-height, letter-spacing and
colour still come from the per-heading settings. The theme also emits matching `--lh-*` line-heights and
**semantic aliases** (`--fs-display`, `--fs-lead`, `--fs-body`, `--fs-caption`) that shortcodes and custom
CSS can reference.

### Accessibility (why `rem + vw`, never `vw` alone)

Every generated `clamp()` uses a **`rem + vw` preferred value** and a **rem-anchored max**. A `vw`-only
fluid size does not respond to browser zoom (viewport units don't change when you zoom), which fails
**WCAG 2.1 SC 1.4.4** (resize text to 200%). Anchoring in `rem` means zoom and the user's font-size
preference still scale the text. A body floor keeps small sizes readable, and a guardrail flags a
ratio/range that would be too steep to reach 200%.

## Reading the value

`typography-v3` returns an **array** (shape under *Saved value* below). The most useful consumer is the
static helper, which turns a saved value into the arguments for the theme's scale engine:

```php
$value = fw_get_db_settings_option( 'demo_typography_v3' );

// → array( 'base_px' => 16, 'ratio' => 1.25, 'ratio_mobile' => 1.2 )
$opts  = Fw_Option_Type_Typography_V3::to_scale_opts( $value );

// The engine returns each step as { max_px, min_px, value (a clamp string), line_height, a11y }.
$scale = unysonplus_generate_type_scale( $opts );
echo '--h1-font-size:' . $scale['6']['value'] . ';';
```

### In Theme Settings — a global option

```php
$value = fw_get_db_settings_option( 'demo_typography_v3' );
printf( 'font-family:%s;', esc_attr( $value['body']['family'] ) );
```

### In a shortcode

```php
$value = $atts['demo_typography_v3'];
$opts  = Fw_Option_Type_Typography_V3::to_scale_opts( $value );
$scale = unysonplus_generate_type_scale( $opts );
printf( 'font-size:%s;', $scale['2']['value'] ); // a "lead" size, fluid
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_typography_v3' ) )` outputs:

```text
Array
(
    [heading_family] => Array ( [family] => Poppins )
    [body] => Array
        (
            [family] => Open Sans
            [variation] => regular
            [size] => 16
            [line-height] => 1.6
            [letter-spacing] => 0
            [color] =>
        )
    [ratio] => 1.25
    [ratio_mobile] => 1.2
)
```

## Tuning the scale globally

Two filters adjust the engine for the whole site:

```php
// The viewport range (px) over which sizes interpolate.
add_filter( 'unysonplus_fluid_type_viewport', fn() => [ 'min' => 360, 'max' => 1280 ] );

// The scale itself — steps up/down, floor, default ratios.
add_filter( 'unysonplus_type_scale_config', function ( $c ) {
	$c['steps_up']      = 6;
	$c['body_floor_px'] = 14; // a11y floor for the mobile endpoint
	return $c;
} );
```

## Relationship to `typography` / `typography-v2`

`typography` and `typography-v2` size **one element**; `typography-v3` configures the **fonts plus the
whole heading scale** in one control, and emits into the same `--hN-font-size` custom properties — so it
composes with, rather than replaces, existing token consumers.

:::note Staging name
"v3" is a **staging** name. Once verified it becomes the canonical `typography` control (its value is a
superset and it emits the same tokens, so promotion is non-destructive). See the design decision
[*Stage typography v3, then promote to canonical*](/decisions/stage-typography-v3-then-promote).
:::
