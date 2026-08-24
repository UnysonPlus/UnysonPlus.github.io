---
title: Theme Settings (Components) — functions
sidebar_label: Theme Settings (Components)
slug: /functions/theme-settings-components
description: Public PHP helper functions in the UnysonPlus Theme Settings (Components) subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Theme Settings (Components) — functions

**25 public functions.** 25 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_admin_safe_custom_css`](#fw_admin_safe_custom_css) | Make site Custom CSS wp-admin-safe. misc_custom_css is folded into the shared presets stylesheet, which the page builder ALSO loads in wp-admin (canvas WYSIWYG) — so an unscoped top-level `body` / `html` rule (background, overflow, …) would repaint the EDITOR chrome ("the front end leaked into the backend"). This rewrites those global selectors to front-end-only variants (`body:not(.wp-admin)`, `html:not(:has(.wp-admin))`) so a global rule can never leak into the admin, while class/id/descendant rules (`.pb-*`, `.upwc-*`, `#x`) are left untouched so they still skin the builder canvas. Applies to ALL Custom CSS — hand-written OR emitted by the Site Converter — so this cannot recur regardless of who wrote the CSS. Already-scoped selectors are left alone (idempotent). |
| [`unysonplus_collect_preset_leaf_keys`](#unysonplus_collect_preset_leaf_keys) | Walk an options schema and collect the LEAF option ids (the keys that actually store a value). Containers (tab / box / group) hold no value of their own, so we recurse through them. Used by the preset migration to copy exactly the preset keys — and nothing else — out of the legacy extension store. |
| [`unysonplus_icons_settings_options`](#unysonplus_icons_settings_options) | — |
| [`unysonplus_migrate_presets_to_theme_store`](#unysonplus_migrate_presets_to_theme_store) | One-time move of saved presets from the legacy theme-INDEPENDENT store (fw_ext_settings_options:shortcodes) into the CURRENT theme's theme-scoped settings (fw_theme_settings_options:&#123;theme-id&#125;). Runs once; the legacy store is left intact as a backup. Only seeds keys not already present in the theme store, and only the preset leaf keys (the Smooth Scroll toggle stays put). |
| [`unysonplus_presets_in_theme_settings_enabled`](#unysonplus_presets_in_theme_settings_enabled) | Presets are surfaced unless the page builder's "bare" mode (Styling Presets off) is active — matching the old dedicated page's gate. |
| [`unysonplus_settings_io_can`](#unysonplus_settings_io_can) | — |
| [`unysonplus_settings_io_exclude_keys`](#unysonplus_settings_io_exclude_keys) | — |
| [`unysonplus_settings_io_export`](#unysonplus_settings_io_export) | — |
| [`unysonplus_settings_io_import`](#unysonplus_settings_io_import) | — |
| [`unysonplus_settings_io_misc_field_html`](#unysonplus_settings_io_misc_field_html) | — |
| [`unysonplus_settings_io_page_slug`](#unysonplus_settings_io_page_slug) | — |
| [`unysonplus_settings_io_page_url`](#unysonplus_settings_io_page_url) | — |
| [`unysonplus_settings_io_redirect`](#unysonplus_settings_io_redirect) | — |
| [`unysonplus_settings_io_result_notice`](#unysonplus_settings_io_result_notice) | — |
| [`unysonplus_settings_io_strip_media`](#unysonplus_settings_io_strip_media) | — |
| [`unysonplus_settings_io_theme_meta`](#unysonplus_settings_io_theme_meta) | — |
| [`upw_ts_custom_css`](#upw_ts_custom_css) | — |
| [`upw_ts_get_options`](#upw_ts_get_options) | Load a built-in Theme Settings section file and return its `$options` array. |
| [`upw_ts_image_size_crop_map`](#upw_ts_image_size_crop_map) | Saved crop value → add_image_size() $crop argument. |
| [`upw_ts_maintenance_user_is_allowed`](#upw_ts_maintenance_user_is_allowed) | — |
| [`upw_ts_merge_into_misc`](#upw_ts_merge_into_misc) | Merge built-in sub-tabs into the Miscellaneous section of the Theme Settings options (the section keyed `misc_container`, whose sub-tabs live inside its `box` container). If the active theme provides no Miscellaneous section (e.g. a non-Unyson theme), a Miscellaneous section is created to host them. |
| [`upw_ts_misc_subtabs`](#upw_ts_misc_subtabs) | Built-in Miscellaneous sub-tabs (ported from the theme so they work under any theme). Each is a tab -&gt; box wrapping the feature's schema file. Merged into the theme's Miscellaneous section by the fw_settings_options filter below. |
| [`upw_ts_register_image_sizes`](#upw_ts_register_image_sizes) | — |
| [`upw_ts_selectable_image_sizes`](#upw_ts_selectable_image_sizes) | Expose custom sizes (with "Show in editor" on) in the media / block-editor size dropdown. Without this a registered size is usable only from template code. |
| [`upw_ts_setting`](#upw_ts_setting) | Read a leaf value out of a `multi` container saved in the Theme Settings store (fw_theme_settings_options:&#123;theme-id&#125;). Mirrors the theme's unysonplus_misc_get() read path so the plugin's built-in Miscellaneous features reuse the SAME storage keys (zero migration) and work under any theme. |

---

### `fw_admin_safe_custom_css` {#fw_admin_safe_custom_css}
*🔌 pluggable*

```php
fw_admin_safe_custom_css( $css )
```

Make site Custom CSS wp-admin-safe. misc_custom_css is folded into the shared presets stylesheet, which the page builder ALSO loads in wp-admin (canvas WYSIWYG) — so an unscoped top-level `body` / `html` rule (background, overflow, …) would repaint the EDITOR chrome ("the front end leaked into the backend"). This rewrites those global selectors to front-end-only variants (`body:not(.wp-admin)`, `html:not(:has(.wp-admin))`) so a global rule can never leak into the admin, while class/id/descendant rules (`.pb-*`, `.upwc-*`, `#x`) are left untouched so they still skin the builder canvas. Applies to ALL Custom CSS — hand-written OR emitted by the Site Converter — so this cannot recur regardless of who wrote the CSS. Already-scoped selectors are left alone (idempotent).

| Parameter | Type | Description |
| --- | --- | --- |
| `$css` | `string` | — |

**Returns** `string`

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/miscellaneous-handlers.php:30`</small>

### `unysonplus_collect_preset_leaf_keys` {#unysonplus_collect_preset_leaf_keys}
*🔌 pluggable*

```php
unysonplus_collect_preset_leaf_keys( array $options, array &$keys )
```

Walk an options schema and collect the LEAF option ids (the keys that actually store a value). Containers (tab / box / group) hold no value of their own, so we recurse through them. Used by the preset migration to copy exactly the preset keys — and nothing else — out of the legacy extension store.

| Parameter | Type | Description |
| --- | --- | --- |
| `$options` | `array` | Options array. |
| `$keys` | `array` | Accumulator (id =&gt; true), passed by reference. |

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/helpers.php:120`</small>

### `unysonplus_icons_settings_options` {#unysonplus_icons_settings_options}
*🔌 pluggable*

```php
unysonplus_icons_settings_options()
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/icons.php:16`</small>

### `unysonplus_migrate_presets_to_theme_store` {#unysonplus_migrate_presets_to_theme_store}
*🔌 pluggable*

```php
unysonplus_migrate_presets_to_theme_store()
```

One-time move of saved presets from the legacy theme-INDEPENDENT store (fw_ext_settings_options:shortcodes) into the CURRENT theme's theme-scoped settings (fw_theme_settings_options:&#123;theme-id&#125;). Runs once; the legacy store is left intact as a backup. Only seeds keys not already present in the theme store, and only the preset leaf keys (the Smooth Scroll toggle stays put).

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/loader.php:324`</small>

### `unysonplus_presets_in_theme_settings_enabled` {#unysonplus_presets_in_theme_settings_enabled}
*🔌 pluggable*

```php
unysonplus_presets_in_theme_settings_enabled()
```

Presets are surfaced unless the page builder's "bare" mode (Styling Presets off) is active — matching the old dedicated page's gate.

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/loader.php:82`</small>

### `unysonplus_settings_io_can` {#unysonplus_settings_io_can}
*🔌 pluggable*

```php
unysonplus_settings_io_can()
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:49`</small>

### `unysonplus_settings_io_exclude_keys` {#unysonplus_settings_io_exclude_keys}
*🔌 pluggable*

```php
unysonplus_settings_io_exclude_keys()
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:23`</small>

### `unysonplus_settings_io_export` {#unysonplus_settings_io_export}
*🔌 pluggable*

```php
unysonplus_settings_io_export()
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:87`</small>

### `unysonplus_settings_io_import` {#unysonplus_settings_io_import}
*🔌 pluggable*

```php
unysonplus_settings_io_import()
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:134`</small>

### `unysonplus_settings_io_misc_field_html` {#unysonplus_settings_io_misc_field_html}
*🔌 pluggable*

```php
unysonplus_settings_io_misc_field_html()
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:239`</small>

### `unysonplus_settings_io_page_slug` {#unysonplus_settings_io_page_slug}
*🔌 pluggable*

```php
unysonplus_settings_io_page_slug()
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:55`</small>

### `unysonplus_settings_io_page_url` {#unysonplus_settings_io_page_url}
*🔌 pluggable*

```php
unysonplus_settings_io_page_url()
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:64`</small>

### `unysonplus_settings_io_redirect` {#unysonplus_settings_io_redirect}
*🔌 pluggable*

```php
unysonplus_settings_io_redirect( $code )
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:79`</small>

### `unysonplus_settings_io_result_notice` {#unysonplus_settings_io_result_notice}
*🔌 pluggable*

```php
unysonplus_settings_io_result_notice()
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:205`</small>

### `unysonplus_settings_io_strip_media` {#unysonplus_settings_io_strip_media}
*🔌 pluggable*

```php
unysonplus_settings_io_strip_media( $value )
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:35`</small>

### `unysonplus_settings_io_theme_meta` {#unysonplus_settings_io_theme_meta}
*🔌 pluggable*

```php
unysonplus_settings_io_theme_meta()
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/settings-export-import.php:70`</small>

### `upw_ts_custom_css` {#upw_ts_custom_css}
*🔌 pluggable*

```php
upw_ts_custom_css()
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/miscellaneous-handlers.php:68`</small>

### `upw_ts_get_options` {#upw_ts_get_options}
*🔌 pluggable*

```php
upw_ts_get_options( $name, array $variables = array() )
```

Load a built-in Theme Settings section file and return its `$options` array.

(e.g. 'components-color', 'miscellaneous-performance').
                         'color_choices', 'gap_choices'). Mirrors the $variables
                         arg of fw()-&gt;theme-&gt;get_options().

| Parameter | Type | Description |
| --- | --- | --- |
| `$name` | `string` | File name without extension, relative to this folder |
| `$variables` | `array` | Extra variables made available inside the file (e.g. |

**Returns** `array`

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/helpers.php:26`</small>

### `upw_ts_image_size_crop_map` {#upw_ts_image_size_crop_map}
*🔌 pluggable*

```php
upw_ts_image_size_crop_map()
```

Saved crop value → add_image_size() $crop argument.

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/miscellaneous-handlers.php:335`</small>

### `upw_ts_maintenance_user_is_allowed` {#upw_ts_maintenance_user_is_allowed}
*🔌 pluggable*

```php
upw_ts_maintenance_user_is_allowed()
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/miscellaneous-handlers.php:227`</small>

### `upw_ts_merge_into_misc` {#upw_ts_merge_into_misc}
*🔌 pluggable*

```php
upw_ts_merge_into_misc( array $options, array $subtabs )
```

Merge built-in sub-tabs into the Miscellaneous section of the Theme Settings options (the section keyed `misc_container`, whose sub-tabs live inside its `box` container). If the active theme provides no Miscellaneous section (e.g. a non-Unyson theme), a Miscellaneous section is created to host them.

| Parameter | Type | Description |
| --- | --- | --- |
| `$options` | `array` | The full Theme Settings options (list of nav sections). |
| `$subtabs` | `array` | tab_id =&gt; tab-definition entries to append. |

**Returns** `array`

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/helpers.php:81`</small>

### `upw_ts_misc_subtabs` {#upw_ts_misc_subtabs}
*🔌 pluggable*

```php
upw_ts_misc_subtabs()
```

Built-in Miscellaneous sub-tabs (ported from the theme so they work under any theme). Each is a tab -&gt; box wrapping the feature's schema file. Merged into the theme's Miscellaneous section by the fw_settings_options filter below.

**Returns** `array` tab_id =&gt; tab-definition.

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/loader.php:42`</small>

### `upw_ts_register_image_sizes` {#upw_ts_register_image_sizes}
*🔌 pluggable*

```php
upw_ts_register_image_sizes()
```

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/miscellaneous-handlers.php:353`</small>

### `upw_ts_selectable_image_sizes` {#upw_ts_selectable_image_sizes}
*🔌 pluggable*

```php
upw_ts_selectable_image_sizes( $sizes )
```

Expose custom sizes (with "Show in editor" on) in the media / block-editor size dropdown. Without this a registered size is usable only from template code.

| Parameter | Type | Description |
| --- | --- | --- |
| `$sizes` | `array` | slug =&gt; label map WordPress offers in the picker. |

**Returns** `array`

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/miscellaneous-handlers.php:383`</small>

### `upw_ts_setting` {#upw_ts_setting}
*🔌 pluggable*

```php
upw_ts_setting( $bucket, $key, $default = '' )
```

Read a leaf value out of a `multi` container saved in the Theme Settings store (fw_theme_settings_options:&#123;theme-id&#125;). Mirrors the theme's unysonplus_misc_get() read path so the plugin's built-in Miscellaneous features reuse the SAME storage keys (zero migration) and work under any theme.

| Parameter | Type | Description |
| --- | --- | --- |
| `$bucket` | `string` | The `multi` container id (e.g. 'misc_custom_css'). |
| `$key` | `string` | The leaf id inside it (e.g. 'custom_css'). |
| `$default` | `mixed` | Returned when unset/empty. |

**Returns** `mixed`

<small>Source: `framework/extensions/shortcodes/includes/theme-settings/helpers.php:51`</small>

← Back to [Functions overview](./index.md)
