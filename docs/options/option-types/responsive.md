---
title: "Responsive (per-device)"
sidebar_position: 53
---

# `responsive` — per-device option wrapper

`responsive` is a **generic wrapper** that turns any single control into a
**per-device** control. It renders the inner control once for each breakpoint —
**Phone / Tablet / Desktop** — behind a shared device-tab switcher, and stores one
value per layer:

```php
array( 'base' => <value>, 'md' => <value|''>, 'lg' => <value|''> )
```

It is **mobile-first / Bootstrap-native**, exactly like the [`spacing`](./spacing.md)
option type it is modelled on: `base` applies at **every** width; an empty `md`/`lg`
means *"inherit the smaller layer"*, so nothing is emitted for it. The wrapper is
**token-agnostic** — it never bakes a CSS class name. It just holds three raw values;
the consumer (a shortcode `view.php`) decides which breakpoint-infixed utility class
each value maps to.

Source: `framework/includes/option-types/responsive/class-fw-option-type-responsive.php`.

:::tip When to reach for it
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

- **Mobile-first cascade.** `base` is the foundation. `md` overrides it from 768px up;
  `lg` overrides from 992px up. A blank device **inherits** the next smaller one — so
  `Phone Auto + Desktop 1/2` renders full-width on phones and half-width on desktop, with
  nothing emitted for tablet (it inherits phone).
- **Tab display order is Desktop → Tablet → Phone** (the familiar Elementor order) — this
  is *display* order only; the cascade is still mobile-first. The **Phone** tab is the
  default-active one.
- The switcher is **synced to the builder's global device toggle** (`window.fwPbDevice`):
  flipping the canvas device preview re-activates the matching tab, and vice-versa, via the
  `fw:builder:device-preview` event.

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
[`popover`](./popover.md) so each device tab stays compact. A single-inner popover
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
[Migrating an option's value shape](/docs/page-builder/value-shape-migrations).

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
- [`multi-picker`](./multi-picker.md) · [`popover`](./popover.md) — common inner controls.
- [Migrating an option's value shape](/docs/page-builder/value-shape-migrations) — the
  two-sided migration pattern.
- [Column widths](/docs/page-builder/column-widths) — the grid fractions the width controls emit.

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_responsive' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
    [base] => 20px
    [md] => 32px
    [lg] => 48px
)
```
