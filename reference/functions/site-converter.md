---
title: Site Converter — functions
sidebar_label: Site Converter
slug: /functions/site-converter
description: Public PHP helper functions in the UnysonPlus Site Converter subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Site Converter — functions

**8 public functions.** 0 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`sc_clean_screenshot_b64`](#sc_clean_screenshot_b64) | Sanitize a posted screenshot data string into a clean, verified base64 PNG payload (no data: prefix), or '' when it isn't a real PNG. Strips any `data:image/...;base64,` prefix + whitespace, then validates strict base64 that decodes to PNG-magic bytes. Used by the URL-conversion flow to carry the capture service's screenshot.png into the generated theme. Returns the RAW base64 string (the theme generator decodes it when writing screenshot.png). |
| [`sc_cs_bg`](#sc_cs_bg) | A non-transparent `background-color` value from a data-sc-cs string, or '' (transparent / absent). |
| [`sc_css`](#sc_css) | Read a single CSS property value from an element's captured `data-sc-cs` computed-style attribute. '' if absent. |
| [`sc_hifi_opt`](#sc_hifi_opt) | Read the "High-fidelity CSS" convert option from the posted request. The Convert panel's checkbox posts `fw_sc_hifi` (=1 when checked, absent when unchecked) alongside a hidden `fw_sc_hifi_present` that always posts, so an ABSENT `fw_sc_hifi` with the present-flag = the user unchecked it (→ false); a request with NEITHER field (a programmatic / back-compat caller) defaults ON. The service/URL flow posts `fw_sc_hifi` explicitly as '1'/'0'. DEFAULT ON — parity with build_bundle's own default. |
| [`sc_int_list`](#sc_int_list) | Parse a comma/space list of non-negative ints ("0, 2 3" → [0,2,3]). Empty → []. |
| [`sc_menu_css`](#sc_menu_css) | CSS for the dynamic header menu (`wp_nav_menu` with class `.sc-menu`), derived from the source nav's CAPTURED computed look (color, size, weight, spacing, dropdown) so the live WordPress menu matches the source. Hover/active uses the brand accent (computed hover isn't readable at capture). Framework-agnostic — no Bootstrap/Tailwind classes involved. |
| [`sc_pad`](#sc_pad) | Read a padding side ('top'\|'bottom') from an element's computed style, handling BOTH the `padding-top` longhand AND the `padding` shorthand (`padding:T R B L` / `T V` / `T RL B` — the capture often emits the shorthand, e.g. the golden fixture footer `padding:64px 0px 32px`). Returns the length string or ''. |
| [`sc_wc_opt`](#sc_wc_opt) | Read the Convert panel's "Map to WooCommerce" option. The mapper only emits WooCommerce shortcodes (a live [wc_products] feed for a detected product grid) when this returns true — which requires BOTH WooCommerce to be ACTIVE on this site (there is nothing to map to otherwise) AND the checkbox ticked (posted as opt_woocommerce '1'/'0'). Default OFF, so a non-store conversion is never altered. |

---

### `sc_clean_screenshot_b64` {#sc_clean_screenshot_b64}

```php
sc_clean_screenshot_b64( $raw )
```

Sanitize a posted screenshot data string into a clean, verified base64 PNG payload (no data: prefix), or '' when it isn't a real PNG. Strips any `data:image/...;base64,` prefix + whitespace, then validates strict base64 that decodes to PNG-magic bytes. Used by the URL-conversion flow to carry the capture service's screenshot.png into the generated theme. Returns the RAW base64 string (the theme generator decodes it when writing screenshot.png).

| Parameter | Type | Description |
| --- | --- | --- |
| `$raw` | `mixed` | posted value ($_POST['fw_sc_screenshot_b64']) |

**Returns** `string` clean base64, or ''

<small>Source: `framework/extensions/site-converter/class-fw-extension-site-converter.php:1962`</small>

### `sc_cs_bg` {#sc_cs_bg}

```php
sc_cs_bg( $cs )
```

A non-transparent `background-color` value from a data-sc-cs string, or '' (transparent / absent).

<small>Source: `framework/extensions/site-converter/includes/class-fw-site-converter-stitch.php:5512`</small>

### `sc_css` {#sc_css}

```php
sc_css( $el, $prop )
```

Read a single CSS property value from an element's captured `data-sc-cs` computed-style attribute. '' if absent.

<small>Source: `framework/extensions/site-converter/includes/class-fw-site-converter-stitch.php:4156`</small>

### `sc_hifi_opt` {#sc_hifi_opt}

```php
sc_hifi_opt()
```

Read the "High-fidelity CSS" convert option from the posted request. The Convert panel's checkbox posts `fw_sc_hifi` (=1 when checked, absent when unchecked) alongside a hidden `fw_sc_hifi_present` that always posts, so an ABSENT `fw_sc_hifi` with the present-flag = the user unchecked it (→ false); a request with NEITHER field (a programmatic / back-compat caller) defaults ON. The service/URL flow posts `fw_sc_hifi` explicitly as '1'/'0'. DEFAULT ON — parity with build_bundle's own default.

**Returns** `bool` whether the hi-fi faithful base is requested.

<small>Source: `framework/extensions/site-converter/class-fw-extension-site-converter.php:1932`</small>

### `sc_int_list` {#sc_int_list}

```php
sc_int_list( $raw )
```

Parse a comma/space list of non-negative ints ("0, 2 3" → [0,2,3]). Empty → [].

<small>Source: `framework/extensions/site-converter/class-fw-extension-site-converter.php:1915`</small>

### `sc_menu_css` {#sc_menu_css}

```php
sc_menu_css( array $cfg )
```

CSS for the dynamic header menu (`wp_nav_menu` with class `.sc-menu`), derived from the source nav's CAPTURED computed look (color, size, weight, spacing, dropdown) so the live WordPress menu matches the source. Hover/active uses the brand accent (computed hover isn't readable at capture). Framework-agnostic — no Bootstrap/Tailwind classes involved.

<small>Source: `framework/extensions/site-converter/includes/class-fw-site-converter-theme-generator.php:2201`</small>

### `sc_pad` {#sc_pad}

```php
sc_pad( $el, $side )
```

Read a padding side ('top'|'bottom') from an element's computed style, handling BOTH the `padding-top` longhand AND the `padding` shorthand (`padding:T R B L` / `T V` / `T RL B` — the capture often emits the shorthand, e.g. the golden fixture footer `padding:64px 0px 32px`). Returns the length string or ''.

<small>Source: `framework/extensions/site-converter/includes/class-fw-site-converter-stitch.php:5667`</small>

### `sc_wc_opt` {#sc_wc_opt}

```php
sc_wc_opt()
```

Read the Convert panel's "Map to WooCommerce" option. The mapper only emits WooCommerce shortcodes (a live [wc_products] feed for a detected product grid) when this returns true — which requires BOTH WooCommerce to be ACTIVE on this site (there is nothing to map to otherwise) AND the checkbox ticked (posted as opt_woocommerce '1'/'0'). Default OFF, so a non-store conversion is never altered.

**Returns** `bool`

<small>Source: `framework/extensions/site-converter/class-fw-extension-site-converter.php:1947`</small>

← Back to [Functions overview](./index.md)
