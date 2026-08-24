---
title: Other Extensions — functions
sidebar_label: Other Extensions
slug: /functions/other-extensions
description: Public PHP helper functions in the UnysonPlus Other Extensions subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Other Extensions — functions

**22 public functions.** 22 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_tpl_lib__fetch_json`](#fw_tpl_lib__fetch_json) | GET a URL and json_decode it. Returns array\|WP_Error. |
| [`fw_tpl_lib__read_envelope_json`](#fw_tpl_lib__read_envelope_json) | Read an export-envelope file and return its inner `json` string if valid for the given kind, else ''. Used for both bundled and installed templates. |
| [`fw_tpl_lib__rrmdir`](#fw_tpl_lib__rrmdir) | Recursively delete a directory (temp + uninstall). |
| [`fw_tpl_lib__validate_envelope`](#fw_tpl_lib__validate_envelope) | Validate a downloaded/bundled export envelope: it must be an _fw_template_export for the page-builder of the expected kind, whose inner `json` decodes to a non-empty builder tree. |
| [`fw_tpl_lib_allowed_kinds`](#fw_tpl_lib_allowed_kinds) | The template kinds the builder's predefined lists accept. |
| [`fw_tpl_lib_builder_payload`](#fw_tpl_lib_builder_payload) | The full data the in-builder panel renders: library items (with the builder tree attached for insertable ones), the user's saved templates, categories, and catalog availability. |
| [`fw_tpl_lib_bundled_catalog`](#fw_tpl_lib_bundled_catalog) | The bundled catalog: reads templates/catalog.json shipped in the extension (same shape as the remote catalog's `templates` map, minus base_url — the thumb path is resolved against the bundled folder URI). Cached per request. |
| [`fw_tpl_lib_bundled_dir`](#fw_tpl_lib_bundled_dir) | Absolute path of the bundled-templates folder shipped in the extension. |
| [`fw_tpl_lib_bundled_uri`](#fw_tpl_lib_bundled_uri) | Public URI of the bundled-templates folder (for thumbnails). |
| [`fw_tpl_lib_catalog`](#fw_tpl_lib_catalog) | Fetch + decode the remote catalog, cached in a transient (12h). Returns a normalized array, or an empty shape on failure (cached briefly so a flaky network doesn't retry on every page load). |
| [`fw_tpl_lib_catalog_url`](#fw_tpl_lib_catalog_url) | URL of the catalog.json describing installable templates. Filterable. |
| [`fw_tpl_lib_feed_predefined`](#fw_tpl_lib_feed_predefined) | Filter callback: append this library's templates of $kind to the builder's predefined list. |
| [`fw_tpl_lib_install`](#fw_tpl_lib_install) | Download one template envelope from the catalog into the uploads install dir. Atomic: writes into a temp dir, then renames into place. |
| [`fw_tpl_lib_install_dir`](#fw_tpl_lib_install_dir) | Absolute path of the uploads install dir (no trailing slash). Filterable. |
| [`fw_tpl_lib_installed_meta`](#fw_tpl_lib_installed_meta) | Decoded meta.json for one installed template, or null. |
| [`fw_tpl_lib_installed_slugs`](#fw_tpl_lib_installed_slugs) | Slugs of templates installed under uploads (a dir with template.json + meta.json). |
| [`fw_tpl_lib_installer_categories`](#fw_tpl_lib_installer_categories) | Distinct category names across the current item list (sorted). |
| [`fw_tpl_lib_installer_items`](#fw_tpl_lib_installer_items) | Flat list the admin grid renders, one entry per template: &#123; slug, title, category, kind, description, thumb, state: 'bundled'\|'installed'\|'available' &#125; |
| [`fw_tpl_lib_installer_payload`](#fw_tpl_lib_installer_payload) | Everything the admin grid JS needs, localized as `upwTemplateLibrary`. |
| [`fw_tpl_lib_registered_templates`](#fw_tpl_lib_registered_templates) | All templates to register, keyed slug =&gt; &#123; title, kind, json &#125;. Bundled first, then installed (installed wins on a slug clash). Cached per request. |
| [`fw_tpl_lib_uninstall`](#fw_tpl_lib_uninstall) | Remove an installed template. Bundled templates have no uploads dir, so this is a no-op error for them. |
| [`fw_tpl_lib_user_templates`](#fw_tpl_lib_user_templates) | The current user's own saved page-builder templates, scanned straight from the wp_options rows the builder writes (one per saved template, keyed by a documented prefix per kind). Predefined/library templates are NOT stored as options, so this returns only user-saved ones — exactly the "My Templates" set. The heavy `json` body is fetched lazily on insert via the builder's own load endpoint, so this stays light. |

---

### `fw_tpl_lib__fetch_json` {#fw_tpl_lib__fetch_json}
*🔌 pluggable*

```php
fw_tpl_lib__fetch_json( $url )
```

GET a URL and json_decode it. Returns array|WP_Error.

<small>Source: `framework/extensions/template-library/includes/installer.php:300`</small>

### `fw_tpl_lib__read_envelope_json` {#fw_tpl_lib__read_envelope_json}
*🔌 pluggable*

```php
fw_tpl_lib__read_envelope_json( $file, $kind )
```

Read an export-envelope file and return its inner `json` string if valid for the given kind, else ''. Used for both bundled and installed templates.

<small>Source: `framework/extensions/template-library/includes/predefined-templates.php:74`</small>

### `fw_tpl_lib__rrmdir` {#fw_tpl_lib__rrmdir}
*🔌 pluggable*

```php
fw_tpl_lib__rrmdir( $dir )
```

Recursively delete a directory (temp + uninstall).

<small>Source: `framework/extensions/template-library/includes/installer.php:317`</small>

### `fw_tpl_lib__validate_envelope` {#fw_tpl_lib__validate_envelope}
*🔌 pluggable*

```php
fw_tpl_lib__validate_envelope( $envelope, $kind )
```

Validate a downloaded/bundled export envelope: it must be an _fw_template_export for the page-builder of the expected kind, whose inner `json` decodes to a non-empty builder tree.

| Parameter | Type | Description |
| --- | --- | --- |
| `$envelope` | `array` | Decoded envelope. |
| `$kind` | `string` | Expected kind (section\|column\|full). |

**Returns** `true\|WP_Error`

<small>Source: `framework/extensions/template-library/includes/installer.php:275`</small>

### `fw_tpl_lib_allowed_kinds` {#fw_tpl_lib_allowed_kinds}
*🔌 pluggable*

```php
fw_tpl_lib_allowed_kinds()
```

The template kinds the builder's predefined lists accept.

<small>Source: `framework/extensions/template-library/includes/installer.php:51`</small>

### `fw_tpl_lib_builder_payload` {#fw_tpl_lib_builder_payload}
*🔌 pluggable*

```php
fw_tpl_lib_builder_payload()
```

The full data the in-builder panel renders: library items (with the builder tree attached for insertable ones), the user's saved templates, categories, and catalog availability.

<small>Source: `framework/extensions/template-library/includes/builder-panel.php:75`</small>

### `fw_tpl_lib_bundled_catalog` {#fw_tpl_lib_bundled_catalog}
*🔌 pluggable*

```php
fw_tpl_lib_bundled_catalog()
```

The bundled catalog: reads templates/catalog.json shipped in the extension (same shape as the remote catalog's `templates` map, minus base_url — the thumb path is resolved against the bundled folder URI). Cached per request.

**Returns** `array` slug =&gt; &#123; slug, title, category, kind, description, thumb &#125;

<small>Source: `framework/extensions/template-library/includes/predefined-templates.php:30`</small>

### `fw_tpl_lib_bundled_dir` {#fw_tpl_lib_bundled_dir}
*🔌 pluggable*

```php
fw_tpl_lib_bundled_dir()
```

Absolute path of the bundled-templates folder shipped in the extension.

<small>Source: `framework/extensions/template-library/includes/installer.php:35`</small>

### `fw_tpl_lib_bundled_uri` {#fw_tpl_lib_bundled_uri}
*🔌 pluggable*

```php
fw_tpl_lib_bundled_uri()
```

Public URI of the bundled-templates folder (for thumbnails).

<small>Source: `framework/extensions/template-library/includes/installer.php:43`</small>

### `fw_tpl_lib_catalog` {#fw_tpl_lib_catalog}
*🔌 pluggable*

```php
fw_tpl_lib_catalog( $force = false )
```

Fetch + decode the remote catalog, cached in a transient (12h). Returns a normalized array, or an empty shape on failure (cached briefly so a flaky network doesn't retry on every page load).

| Parameter | Type | Description |
| --- | --- | --- |
| `$force` | `bool` | Bypass the transient (explicit "refresh"). |

**Returns** `array` &#123; version:int, base_url:string, templates:&#123; slug =&gt; &#123;...&#125; &#125; &#125;

<small>Source: `framework/extensions/template-library/includes/installer.php:80`</small>

### `fw_tpl_lib_catalog_url` {#fw_tpl_lib_catalog_url}
*🔌 pluggable*

```php
fw_tpl_lib_catalog_url()
```

URL of the catalog.json describing installable templates. Filterable.

<small>Source: `framework/extensions/template-library/includes/installer.php:62`</small>

### `fw_tpl_lib_feed_predefined` {#fw_tpl_lib_feed_predefined}
*🔌 pluggable*

```php
fw_tpl_lib_feed_predefined( $templates, $kind )
```

Filter callback: append this library's templates of $kind to the builder's predefined list.

| Parameter | Type | Description |
| --- | --- | --- |
| `$templates` | `array` | Existing predefined templates (id =&gt; &#123;title, json&#125;). |
| `$kind` | `string` | section\|column\|full |

**Returns** `array`

<small>Source: `framework/extensions/template-library/includes/predefined-templates.php:128`</small>

### `fw_tpl_lib_install` {#fw_tpl_lib_install}
*🔌 pluggable*

```php
fw_tpl_lib_install( $slug )
```

Download one template envelope from the catalog into the uploads install dir. Atomic: writes into a temp dir, then renames into place.

| Parameter | Type | Description |
| --- | --- | --- |
| `$slug` | `string` | — |

**Returns** `true\|WP_Error`

<small>Source: `framework/extensions/template-library/includes/installer.php:180`</small>

### `fw_tpl_lib_install_dir` {#fw_tpl_lib_install_dir}
*🔌 pluggable*

```php
fw_tpl_lib_install_dir()
```

Absolute path of the uploads install dir (no trailing slash). Filterable.

<small>Source: `framework/extensions/template-library/includes/installer.php:27`</small>

### `fw_tpl_lib_installed_meta` {#fw_tpl_lib_installed_meta}
*🔌 pluggable*

```php
fw_tpl_lib_installed_meta( $slug )
```

Decoded meta.json for one installed template, or null.

<small>Source: `framework/extensions/template-library/includes/installer.php:159`</small>

### `fw_tpl_lib_installed_slugs` {#fw_tpl_lib_installed_slugs}
*🔌 pluggable*

```php
fw_tpl_lib_installed_slugs()
```

Slugs of templates installed under uploads (a dir with template.json + meta.json).

<small>Source: `framework/extensions/template-library/includes/installer.php:141`</small>

### `fw_tpl_lib_installer_categories` {#fw_tpl_lib_installer_categories}
*🔌 pluggable*

```php
fw_tpl_lib_installer_categories( $items = null )
```

Distinct category names across the current item list (sorted).

<small>Source: `framework/extensions/template-library/includes/installer.php:400`</small>

### `fw_tpl_lib_installer_items` {#fw_tpl_lib_installer_items}
*🔌 pluggable*

```php
fw_tpl_lib_installer_items()
```

Flat list the admin grid renders, one entry per template: &#123; slug, title, category, kind, description, thumb, state: 'bundled'|'installed'|'available' &#125;

Bundled templates (shipped in the extension) are always present and can't be
removed. Installed templates were downloaded and can be removed. Catalog
entries not present locally are available to install.

<small>Source: `framework/extensions/template-library/includes/installer.php:340`</small>

### `fw_tpl_lib_installer_payload` {#fw_tpl_lib_installer_payload}
*🔌 pluggable*

```php
fw_tpl_lib_installer_payload()
```

Everything the admin grid JS needs, localized as `upwTemplateLibrary`.

<small>Source: `framework/extensions/template-library/includes/installer.php:414`</small>

### `fw_tpl_lib_registered_templates` {#fw_tpl_lib_registered_templates}
*🔌 pluggable*

```php
fw_tpl_lib_registered_templates()
```

All templates to register, keyed slug =&gt; &#123; title, kind, json &#125;. Bundled first, then installed (installed wins on a slug clash). Cached per request.

<small>Source: `framework/extensions/template-library/includes/predefined-templates.php:87`</small>

### `fw_tpl_lib_uninstall` {#fw_tpl_lib_uninstall}
*🔌 pluggable*

```php
fw_tpl_lib_uninstall( $slug )
```

Remove an installed template. Bundled templates have no uploads dir, so this is a no-op error for them.

| Parameter | Type | Description |
| --- | --- | --- |
| `$slug` | `string` | — |

**Returns** `true\|WP_Error`

<small>Source: `framework/extensions/template-library/includes/installer.php:250`</small>

### `fw_tpl_lib_user_templates` {#fw_tpl_lib_user_templates}
*🔌 pluggable*

```php
fw_tpl_lib_user_templates()
```

The current user's own saved page-builder templates, scanned straight from the wp_options rows the builder writes (one per saved template, keyed by a documented prefix per kind). Predefined/library templates are NOT stored as options, so this returns only user-saved ones — exactly the "My Templates" set. The heavy `json` body is fetched lazily on insert via the builder's own load endpoint, so this stays light.

**Returns** `array` list of &#123; id, title, kind, created &#125;

<small>Source: `framework/extensions/template-library/includes/builder-panel.php:29`</small>

← Back to [Functions overview](./index.md)
