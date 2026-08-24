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
| [`fw_model_allow_uploads`](#h-fw-model-allow-uploads) | filter | Filters whether 3D model (GLB/GLTF) MIME types are added to WordPress's allowed upload types; default true. |
| [`fw_shortcode_model_viewer_src`](#h-fw-shortcode-model-viewer-src) | filter | Filters the URL of the vendored &lt;model-viewer&gt; UMD bundle, letting a site swap in a CDN or different version. |
| [`fw_shortcode_webgl_three_src`](#h-fw-shortcode-webgl-three-src) | filter | Filters the URL of the vendored Three.js library script for the WebGL Object shortcode, letting a site swap in a CDN. |
| [`upw_anim_engine_module_tabs`](#h-upw-anim-engine-module-tabs) | filter | Filters the per-module tabs added to the Animation Engine Theme Settings section. |

---

### `fw_model_allow_uploads` {#h-fw-model-allow-uploads}
*🧪 filter · 3 call sites*

Filters whether 3D model (GLB/GLTF) MIME types are added to WordPress's allowed upload types; default true.

```php
add_filter( 'fw_model_allow_uploads', $callback );
```
<small>Fired in: `framework/extensions/animation-engine/includes/glb-upload.php:61`</small>

### `fw_shortcode_model_viewer_src` {#h-fw-shortcode-model-viewer-src}
*🧪 filter*

Filters the URL of the vendored &lt;model-viewer&gt; UMD bundle, letting a site swap in a CDN or different version.

```php
add_filter( 'fw_shortcode_model_viewer_src', $callback );
```
<small>Fired in: `framework/extensions/animation-engine/shortcodes/model-viewer/static.php:24`</small>

### `fw_shortcode_webgl_three_src` {#h-fw-shortcode-webgl-three-src}
*🧪 filter*

Filters the URL of the vendored Three.js library script for the WebGL Object shortcode, letting a site swap in a CDN.

```php
add_filter( 'fw_shortcode_webgl_three_src', $callback );
```
<small>Fired in: `framework/extensions/animation-engine/shortcodes/webgl-object/static.php:24`</small>

### `upw_anim_engine_module_tabs` {#h-upw-anim-engine-module-tabs}
*🧪 filter*

Filters the per-module tabs added to the Animation Engine Theme Settings section.

```php
add_filter( 'upw_anim_engine_module_tabs', $callback );
```
<small>Fired in: `framework/extensions/animation-engine/includes/theme-settings.php:88`</small>

← Back to [Hooks overview](./index.md)
