---
title: Animation Engine — hooks
sidebar_label: Animation Engine
slug: /hooks/animation-engine
description: Actions and filters exposed by the UnysonPlus Animation Engine subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Animation Engine — hooks

**4 hooks** — 0 actions · 4 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_model_allow_uploads`](#h-fw-model-allow-uploads) | filter | — |
| [`fw_shortcode_model_viewer_src`](#h-fw-shortcode-model-viewer-src) | filter | — |
| [`fw_shortcode_webgl_three_src`](#h-fw-shortcode-webgl-three-src) | filter | — |
| [`upw_anim_engine_module_tabs`](#h-upw-anim-engine-module-tabs) | filter | — |

---

### `fw_model_allow_uploads` {#h-fw-model-allow-uploads}
*🧪 filter · 3 call sites*

```php
add_filter( 'fw_model_allow_uploads', $callback );
```
<small>Fired in: `framework/extensions/animation-engine/includes/glb-upload.php:59`</small>

### `fw_shortcode_model_viewer_src` {#h-fw-shortcode-model-viewer-src}
*🧪 filter*

```php
add_filter( 'fw_shortcode_model_viewer_src', $callback );
```
<small>Fired in: `framework/extensions/animation-engine/shortcodes/model-viewer/static.php:23`</small>

### `fw_shortcode_webgl_three_src` {#h-fw-shortcode-webgl-three-src}
*🧪 filter*

```php
add_filter( 'fw_shortcode_webgl_three_src', $callback );
```
<small>Fired in: `framework/extensions/animation-engine/shortcodes/webgl-object/static.php:23`</small>

### `upw_anim_engine_module_tabs` {#h-upw-anim-engine-module-tabs}
*🧪 filter*

```php
add_filter( 'upw_anim_engine_module_tabs', $callback );
```
<small>Fired in: `framework/extensions/animation-engine/includes/theme-settings.php:87`</small>

← Back to [Hooks overview](./index.md)
