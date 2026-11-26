---
title: "Responsive (per-device)"
sidebar_position: 53
---

# `responsive` — per-device option wrapper

`responsive` is a **generic wrapper** that turns any single control into a
**per-device** control. It renders the inner control once for each breakpoint —
**Phone / Tablet / Desktop / Large desktop** — behind a shared device-tab switcher, and stores one
value per layer:

```php
array( 'base' => <value>, 'md' => <value|''>, 'lg' => <value|''>, 'xl' => <value|''> )
```

It is **mobile-first / Bootstrap-native**, exactly like the [`spacing`](./spacing.md)
option type it is modelled on: `base` applies at **every** width; an empty `md`/`lg`
means *"inherit the smaller layer"*, so nothing is emitted for it. The wrapper is
**token-agnostic** — it never bakes a CSS class name. It just holds three raw values;
the consumer (a shortcode `view.php`) decides which breakpoint-infixed utility class
each value maps to.

Source: `framework/includes/option-types/responsive/class-fw-option-type-responsive.php`.

:::tip[When to reach for it]
Any option whose value should be settable differently on phone, tablet, and desktop.
The page-builder **Section**, **Column**, and **Flexbox** layout options are all built
on it. If your option is a single `image-picker` / `select` / `switch` / `popover` /
`unit-input` and you want per-device control, wrap it — you do **not** write a new
option type.
:::

---

## The device model

| Layer key | Device tab | Applies at | Bootstrap infix |
| --- | --- | --- | --- |
| `base` | Phone | all widths (min-width 0) | *(none)* |
| `md` | Tablet | ≥ 768px | `-md` |
| `lg` | Desktop | ≥ 992px | `-lg` |
| `xl` | Large desktop | ≥ 1200px | `-xl` |

- **Mobile-first cascade.** `base` is the foundation. `md` overrides it from 768px up;
  `lg` from 992px up, `xl` from 1200px up. A blank device **inherits** the next smaller one — so
  `Phone Auto + Desktop 1/2` renders full-width on phones and half-width on desktop, with
  nothing emitted for tablet (it inherits phone).
- **Tab display order is Desktop → Tablet → Phone** (the familiar Elementor order) — this
  is *display* order only; the cascade is still mobile-first. The **Phone** tab is the
  default-active one.
- The switcher is **synced to the builder's global device toggle** (`window.fwPbDevice`):
  flipping the canvas device preview re-activates the matching tab, and vice-versa, via the
  `fw:builder:device-preview` event.

### The breakpoint map {#breakpoint-map}

The widths above come from **one shared map**, `framework/includes/breakpoints.php` (loaded early by the
framework). Read it instead of writing `768` / `992` / `1200` into your own code:

| Function | Returns |
| --- | --- |
| `fw_breakpoints()` | every tier in order: `key => [ 'min' => px, 'label', 'short', 'icon' ]` |
| `fw_breakpoint_keys()` | `[ 'base', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl' ]` |
| `fw_breakpoint_min( 'lg' )` | `992` (`0` for `base`) |
| `fw_breakpoint_media( 'xl' )` | `@media (min-width:1200px)` (`''` for `base`) |
| `fw_breakpoint_upper( 'lg' )` | `1199.98`, the top of that tier (for a "this tier only" range); `''` for the last |
| `fw_breakpoints_js()` | the same list for a script: `[ { key, min, label, short } ]` |

The map holds seven tiers, reusing the grid CSS's own names so every saved class stays valid:

| Key | Tier | From |
| --- | --- | --- |
| `base` | Phone | 0 |
| `sm` | Phone landscape | 576px |
| `md` | Tablet | 768px |
| `lg` | Desktop | 992px |
| `xl` | Large desktop | 1200px |
| `xxl` | Wide | 1400px |
| `xxxl` | Full HD | 1920px |

Every site edits `base`, `md`, `lg` and `xl`. The other three are opt-in, per site (next section).

### More screen sizes (Phone landscape, Wide, Full HD) {#more-screen-sizes}

**Theme Settings → General → Layout → More Screen Sizes** (off by default) adds three tabs to every per-device option,
this one and [`spacing`](./spacing.md) alike:

| Tab | Key | From | Icon |
| --- | --- | --- | --- |
| Phone landscape | `sm` | 576px | the phone, turned |
| Wide | `xxl` | 1400px | the desktop with a **W** |
| Full HD | `xxxl` | 1920px | the desktop with **HD** |

What it is for: a layout that should change on a turned phone (two cards side by side instead of stacked), and pages
that should use the room on big monitors (a wider container, three columns instead of two, a taller hero).

- **Same cascade.** A blank tab takes the next smaller one, so turning the switch on changes nothing until you set a
  value on a new tab.
- **Off keeps your values.** Turning the switch off hides the three tabs and stops using their values, but does not
  delete them: they ride along, hidden, each time the element is saved, and come back when you turn it on again.
- **Stored only when set.** A value keeps its four keys (`base`, `md`, `lg`, `xl`); `sm` / `xxl` / `xxxl` are added
  only when they hold something, so pages saved on a site without the switch are unchanged.
- **The CSS comes with the switch.** The layout classes the new tabs write (`fw-span-xxl-4`, `fw-flex-sm-row`,
  `section--cols-xxl-center`, `pt-sm-3`, `fw-gap-xxxl-5` …) are added only on a site that turns it on: the spacing and
  gap classes join the generated Theme Settings CSS, and the grid / Section classes are generated from their
  Large desktop rules into one cached file, `uploads/unysonplus/css/breakpoints-more-<hash>.css` (about 40 KB), loaded
  after the other styles.
- **Phone landscape beats Stack on phones.** A flex Div's *Responsive Collapse* stacks its children full width below
  768px. A width you set on the Phone landscape tab wins over it between 576 and 767px.
- **Container Width** (Theme Settings → General → Layout) gets the Wide and Full HD tabs too; the header bar follows
  them unless Header → Layout sets its own width.

Elsewhere: the Live Editor previews every size ([Screen sizes](/extensions/live-editor#screen-sizes)); **Hide on**
keeps its three ranges (Phone landscape falls under Mobile, the big screens under Desktop); the Animation Engine's
**Runs on** gains a **Wide** box (1400px and up). Exact pixel spacing (`pt-xxxl-[90px]`) works at every tier.

#### Reading the tiers in your own element

```php
// The tiers this site edits, smallest first, with their class infix:
foreach ( fw_breakpoint_layers() as $tier => $infix ) {      // 'base' => '', 'sm' => '-sm', 'md' => '-md' …
    $v = $value[ $tier ] ?? '';
    if ( $v !== '' ) { $classes[] = 'my-thing' . $infix . '-' . $v; }
}
// A per-element rule for one tier:
$css .= fw_breakpoint_wrap( $tier, '.my-el{min-height:' . $h . '}' );  // base: as is; others: in their @media
```

`fw_breakpoints_active()` gives the keys, `fw_breakpoints_more_enabled()` says whether the switch is on (filter
`fw:breakpoints:more` to force it). A class family of your own gets its extra tiers from the generator when its
stylesheet is added with the `fw:breakpoints:css_sources` filter and its Large desktop rules sit in an
`@media (min-width:1200px)` block.

**Theme Settings → General → Layout → Container Width** has the Large desktop tab too: set it when the content
should widen on big screens (for example 1170px from 992px and 1320px from 1200px). Left blank, large screens keep
the Desktop width.

To change the widths for a site, filter the map (keep the keys and their order):

```php
add_filter( 'fw:breakpoints', function ( $bps ) {
    $bps['xl']['min'] = 1280; // Large desktop from 1280px
    return $bps;
} );
```

The filter moves the device tab labels and the exact-pixel spacing rules. The grid's own utility classes
(`col-xl-6`, `pt-xl-3`) are compiled at 1200px and do not move with it.

### Editing only some devices (`devices`, `off_note`)

```php
'img_images' => array(
    'type'     => 'responsive',
    'label'    => __( 'Tablet & Phone Image', 'fw' ),
    'devices'  => array( 'md', 'base' ),                 // only Tablet + Phone get a control
    'off_note' => __( 'Desktop uses the main image above.', 'fw' ),
    'inner'    => array( 'type' => 'upload', 'images_only' => true ),
),
```

- **`devices`**: a subset of `base`, `md`, `lg`, `xl`. The option edits only those devices. Leave it out for all four.
- The other devices keep their tab, so the switcher still follows the builder's device toggle, but show **`off_note`** instead of a control and always save `''`.
- Use it when another field owns those devices. The [per-device image fields](../../developers/responsive-images.md#your-element) are the first user: the main Image owns desktop, so the override image edits Tablet and Phone only.
- **Cascade is up to the consumer.** The stored shape is the same `{ base, md, lg, xl }`. The image fields read it **desktop-first** (an empty phone inherits the tablet, which inherits the desktop picture), the opposite of the mobile-first CSS output described below. Say which one your field uses in its description.

---

## Authoring: wrapping a control

Put the user-facing `label` / `desc` / `help` on the **`responsive` wrapper**. The inner
control's own label/desc are force-disabled (the wrapper supplies them; the inner is just
the control repeated three times). Set the default under the wrapper's `value` as a
`{base, md, lg}` array.

### Inline control (image-picker / select / switch)

```php
'content_h' => array(
    'type' => 'responsive',
    'label' => __( 'Content Alignment', 'fw' ),
    'desc' => __( 'Use the Phone / Tablet / Desktop tabs to set it per device.', 'fw' ),
    'value' => array( 'base' => 'default', 'md' => '', 'lg' => '' ),
    'inner' => array(
        'type' => 'image-picker',
        'choices' => $halign_choices,
    ),
),
```

### A switch (yes / no per device)

```php
'reverse' => array(
    'type' => 'responsive',
    'label' => __( 'Reverse Order', 'fw' ),
    'value' => array( 'base' => 'no', 'md' => '', 'lg' => '' ),
    'inner' => array(
        'type' => 'switch',
        'left-choice' => array( 'value' => 'no',  'label' => __( 'Default', 'fw' ) ),
        'right-choice' => array( 'value' => 'yes', 'label' => __( 'Reverse', 'fw' ) ),
    ),
),
```

### A unit-input (per-device size)

```php
'min_height' => array(
    'type' => 'responsive',
    'label' => __( 'Min Height', 'fw' ),
    'value' => array(
        'base' => array( 'value' => '', 'unit' => 'vh' ),
        'md' => array( 'value' => '', 'unit' => 'vh' ),
        'lg' => array( 'value' => '', 'unit' => 'vh' ),
    ),
    'inner' => array(
        'type' => 'unit-input',
        'units' => array( 'vh', 'px', 'rem', '%' ),
        'value' => array( 'value' => '', 'unit' => 'vh' ),
    ),
),
```

### A popover (compact tiles + a Custom reveal)

For a control with many/large tiles (e.g. width fractions), wrap a
[`popover`](./popover/index.md) so each device tab stays compact. A single-inner popover
**passes through** to the inner value, and `summary_key` + `autoclose: false` let it
host a [`multi-picker`](./multi-picker.md) with a Custom reveal (see the Flexbox Width
Override):

```php
'width' => array(
    'type' => 'responsive',
    'label' => __( 'Width Override', 'fw' ),
    'value' => array(
        'base' => array( 'preset' => 'none' ),
        'md' => array( 'preset' => 'none' ),
        'lg' => array( 'preset' => 'none' ),
    ),
    'inner' => array(
        'type' => 'popover',
        'summary' => $width_summary,   // choice => trigger label
        'summary_key' => 'preset',         // which nested key drives the trigger
        'autoclose' => false,            // keep panel open while editing Custom
        'inner-options' => array(
            'wpick' => array(
                'type' => 'multi-picker',
                'picker' => array( 'preset' => array( 'type' => 'image-picker', 'choices' => $width_choices ) ),
                'choices' => array( 'custom' => array( 'width_custom' => array( 'type' => 'unit-input', /* … */ ) ) ),
            ),
        ),
    ),
),
```

---

## How the value is stored

The stored value is always `{ base, md, lg }`. **Each layer holds whatever the inner
control stores** — the wrapper does not flatten or reshape it:

| Inner control | One layer looks like | Full stored value (example) |
| --- | --- | --- |
| `image-picker` / `select` / `switch` | a scalar string | `{ "base": "center", "md": "", "lg": "start" }` |
| `unit-input` | `{ value, unit }` | `{ "base": { "value": "40", "unit": "vh" }, "md": { "value": "", "unit": "vh" }, "lg": { "value": "60", "unit": "vh" } }` |
| `popover` → `multi-picker` | the multi-picker value | `{ "base": { "preset": "6" }, "md": { "preset": "custom", "custom": { "width_custom": { "value": "320", "unit": "px" } } }, "lg": { "preset": "none" } }` |

An **empty** `md`/`lg` (`''`, or an empty inner value) means *inherit* — the frontend
emits nothing for that layer.

---

## What it outputs on the frontend

The `responsive` type outputs **nothing itself**. Each shortcode `view.php` reads the
three layers and emits the mobile-first utility classes (or scoped CSS) that fit its
context. Representative mappings:

| Control (view) | Per-layer output | Notes |
| --- | --- | --- |
| Flexbox Direction (+ Reverse) | `flex-{bp}-{row\|column}{-reverse}` | direction and reverse are combined into one class per layer |
| Flexbox Wrap | `flex-{bp}-wrap` / `flex-{bp}-nowrap` | |
| Flexbox / Column Gap | `sc-cgap-{bp}-{slug}` | generated from the Theme Gap presets in `css-tokens.php` |
| Flexbox Justify | `justify-content-{bp}-{start\|center\|end\|between\|around\|evenly}` | |
| Flexbox Align items | `align-items-{bp}-{start\|center\|end\|stretch\|baseline}` | |
| Flexbox Align content | `align-content-{bp}-{start\|center\|end\|between\|around\|stretch}` | |
| Flexbox / Column Width | `fw-col-{bp}-{1..12}` (fractions) | Custom widths → a scoped `@media` rule (below) |
| Flexbox Align self | `align-self-{bp}-{start\|center\|end\|stretch\|baseline}` | |
| Flexbox / Column Order | `fw-order-{bp}-{first\|0..12\|last}` | |
| Flexbox Grow to Fill | `flex-grow-{bp}-{0\|1}` | |
| Flexbox Min height | scoped `@media` `min-height` rule | can't be a utility class |
| Column Offset | `fw-offset-{bp}-{1..11}` | |
| Section Columns alignment / order / gap | `section--cols-{bp}-*` / `section--rev-{bp}-*` / `section--gap-{bp}-{slug}` | |

Where `{bp}` is the empty string for `base`, `md`, or `lg`. All of these utilities live
**self-contained under the plugin's own `fw-*` grid** (`frontend-grid.css` in the Builder
extension) plus the per-device gap utilities generated in `css-tokens.php` — **no theme
Bootstrap dependency**.

### Values that can't be a class → scoped `@media`

A **Custom width** (`320px`, `38%`) or a **per-device min-height** can't be expressed as a
utility class, so the view emits a small scoped `<style>` keyed to the element's unique
`fx-*` class. Custom width is **mobile-first-bounded** so a smaller custom value doesn't
bleed past a larger override:

```css
/* base Custom 320px, with a larger fraction/custom override present → bounded */
@media (max-width:991.98px){ .fx-abcd1234{ flex:0 0 320px !important; max-width:320px !important; } }
/* per-device min-height cascades by source order (no !important needed) */
.fx-mh55{ min-height:40vh; }
@media (min-width:992px){ .fx-mh55{ min-height:60vh; } }
```

---

## The code pipeline

### 1. Backend render (`_render`)

1. `normalize_value()` coerces the saved value into a clean `{ base, md, lg }` (folding a
   legacy scalar into `base`).
2. It emits the shared device-tab switcher via `fw_render_device_tabs()` inside a
   `.fw-device-head`, then **one panel per device** (`data-fw-device-panel="base|md|lg"`),
   each rendering the inner control with that layer's value.
3. The wrapper carries the classes `fw-option-type-responsive fw-device-host`; the Phone
   panel is `is-active` by default.

### 2. Save (`_get_value_from_input`)

Each of the three submitted layers is run **through the inner control's own
`get_value_from_input()`**, so a `unit-input` layer is validated as a unit-input, a
`popover` layer passes through to its inner value, etc. The result is re-assembled into
`{ base, md, lg }`.

If FW passes a **non-array** input (the page-builder "re-save existing atts" path, where the
option key is absent from the submitted form), it falls back to `$option['value']` — which
FW has already merged the saved value into — so a re-save **preserves** the pick instead of
resetting to defaults. (Same null-input guard the `spacing` type uses.)

### 3. Editor-load migration (why a JS migrator is also needed)

The page-builder options **modal opens with the raw saved `atts`** — PHP
`get_value_from_attributes()` does **not** run on modal open. So when you convert an existing
scalar option to `responsive`, an element saved *before* the change reaches the wrapper's
`_render` as a scalar. `normalize_value()` tolerates that (folds it into `base`), so it never
errors or shows a blank modal.

But if the old option had *flat per-device companions* (e.g. a legacy `direction_mobile` /
`direction_tablet`, or a separate `width_phone`), those must be folded into `{ base, md, lg }`
**before the modal reads them** — otherwise the user re-saves and loses them. Do that in the
element item's `scripts.js`, mirroring the frontend fallback, and `model.set('atts', migrated)`
so the first save persists the new shape. See
[Migrating an option's value shape](/page-builder/value-shape-migrations).

### 4. Frontend render (`view.php`)

The shortcode view reads the `{ base, md, lg }` value (falling back to any legacy flat atts
for un-migrated elements), then emits the mobile-first utility classes / scoped CSS from the
table above. A blank layer emits nothing (inherits). This is where the token-agnostic value
becomes concrete `flex-md-row`, `justify-content-lg-center`, `sc-cgap-md-3`, etc.

---

## Legacy migration (value-shape change)

Converting an existing single-value option to `responsive` is a **value-shape change**
(scalar → array). It is handled on **both** sides so no data is lost:

- **PHP** — `normalize_value()` folds a legacy scalar into `base`; `view.php` also reads any
  legacy flat per-device atts as a fallback.
- **JS** — the item's editor-load migrator folds legacy atts into `{ base, md, lg }` before the
  modal opens (and drops retired flat keys).

Newly-added elements have no saved data, so they simply start on the new shape.

---

## The device-tabs UI

The switcher is the shared `framework/includes/device-tabs.php` +
`framework/static/js/fw-device-tabs.js` + `framework/static/css/fw-device-tabs.css`. Its
behaviour is generic (not specific to the `responsive` type):

- On init the JS relocates the `.fw-device-head` into the option's **label column**, sitting
  just below the label — so the icons don't add height or push the description around.
- It is **hidden at rest** and **fades in on hover** over the option row (fast, with a
  reduced-motion guard).
- The active tab mirrors `window.fwPbDevice` and updates on every
  `fw:builder:device-preview` event, keeping the switcher in lock-step with the canvas device
  preview.

---

## Assets & enqueue

`_enqueue_static()` pulls the device-tabs CSS/JS, the **inner control's own assets** (so an
`image-picker` inside gets its styles), and the type's tiny layout CSS. Because generic
shortcodes load their option HTML into the modal via AJAX — where the normal enqueue walk
doesn't reliably reach a nested option type — the type also **force-enqueues on every
post-edit screen** (`admin_enqueue_scripts`); `wp_enqueue_*` dedupes by handle, so it's a
no-op when already loaded.

---

## Gotchas

- **Label goes on the wrapper**, not the inner control (the inner's label/desc are forced
  off). The one exception is the popover pattern, where the popover's own `summary` /
  `summary_key` drive the collapsed trigger.
- **Empty ≠ a value.** A blank `md`/`lg` inherits the smaller layer; it does **not** reset to
  the CSS initial value. To force a different value on a larger device, pick it explicitly
  (e.g. `1/1` for full width, or `Stretch` for align).
- **The wrapper never emits a class.** If a per-device value isn't showing up on the
  frontend, the bug is almost always in the consuming `view.php` (missing/renamed utility
  class), not in the `responsive` type.
- **Utilities must exist.** When you add a new per-device value, make sure the matching
  `*-md-*` / `*-lg-*` utility exists in the Builder extension's `frontend-grid.css` (and its
  `.min`), or generate it in `css-tokens.php` — otherwise the class resolves to nothing.

## See also

- [`spacing`](./spacing.md) — the per-side Margin/Padding control this type is modelled on
  (also per-device).
- [`multi-picker`](./multi-picker.md) · [`popover`](./popover/index.md) — common inner controls.
- [Migrating an option's value shape](/page-builder/value-shape-migrations) — the
  two-sided migration pattern.
- [Column widths](/page-builder/column-widths) — the grid fractions the width controls emit.

## Reading the value

`responsive` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_responsive'];
echo esc_html( $value['base'] ); // + $value['md'], $value['lg']
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_responsive' );
echo esc_html( $value['base'] ); // + $value['md'], $value['lg']
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_responsive'];
echo esc_html( $value['base'] ); // + $value['md'], $value['lg']
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_responsive' );
echo esc_html( $value['base'] ); // + $value['md'], $value['lg']
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_responsive' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [base] => show
    [md] => 
    [lg] => hide
)
```

## In Gutenberg blocks (the React control)

``responsive`` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP**. A block's settings sidebar is a **React app** and will not accept ready-made HTML from PHP, so the option type gets a **second renderer**. Both read the same schema and both produce the **same saved value**. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation.

### What the `responsive` control does

Three device buttons — Mobile, Tablet, Desktop — above the inner control. Switching a tab changes **which device you are editing**, not the value. A device carrying its own value is marked, so the inherited ones are visible at a glance.

:::note[The full `{ base, md, lg }` shape is always stored]
An empty string means "inherit the smaller width" — it is not the same as unset, which is why `_get_value_from_input()` starts from all three keys and fills in what was submitted. A control that omitted untouched devices would drop keys the element reads.
:::

:::caution[Whether blank SURVIVES depends on the inner type]
Each device's value is validated by the inner option type. A `select` with no blank entry in its `choices` does not accept `''` — it falls through to the **first choice**. So on the page-builder path, a blank Tablet on such an option comes back as the first choice rather than as "inherit".

Schemas that want an inheriting device declare a blank or `default` choice, and then blank round-trips intact. The control only promises "leave blank to inherit" when the inner type can actually represent blank — promising it otherwise would be describing behaviour the save undoes.
:::

:::note[Per-device values may be scalars or objects]
The inner control can be anything — a `short-select` storing `'left'`, a `unit-input` storing `{ value, unit }`. Nothing inspects the shape; each device's value is handed to the inner control and taken back unexamined.
:::
