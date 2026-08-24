---
title: Option Types — functions
sidebar_label: Option Types
slug: /functions/option-types
description: Public PHP helper functions in the UnysonPlus Option Types subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Option Types — functions

**53 public functions.** 53 are 🔌 pluggable (`function_exists()`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
| [`fw_fa4_to_fa6`](#fw_fa4_to_fa6) | — |
| [`fw_icon_animated_enabled`](#fw_icon_animated_enabled) | Whether the "Animated" tab shows at all — i.e. at least one player-based technology (Lottie or Rive) is enabled. Derived from the per-technology gates, so the tab appears when either is on and hides when both are off. Core ships the tab, JS handlers and bundled players but keeps them OFF by default; the opt-in Animated Icons extension flips the per-technology gates. The FRONTEND render of already-saved animated values is intentionally NOT gated, so toggling the extension never breaks pages that already use one. |
| [`fw_icon_lottie_dir`](#fw_icon_lottie_dir) | &#123; path, url &#125; of the Lottie upload dir (uploads/unysonplus/lottie). |
| [`fw_icon_lottie_enabled`](#fw_icon_lottie_enabled) | Whether the Lottie technology is enabled (its Animated-tab panel, admin player runtime and .json upload endpoint). Default OFF; the Animated Icons extension flips it on from its "Lottie" toggle. |
| [`fw_icon_lucide_all`](#fw_icon_lucide_all) | All Lucide icon names (sorted), for the picker grid. |
| [`fw_icon_lucide_data`](#fw_icon_lucide_data) | Load + cache the name → inner-markup map. |
| [`fw_icon_lucide_markup`](#fw_icon_lucide_markup) | Resolve a Lucide icon name to complete inline &lt;svg&gt; markup (currentColor, so it inherits the surrounding text colour). Returns '' for an unknown name. The markup still passes through sc_icon_sanitize_svg() at render. |
| [`fw_icon_lucide_search`](#fw_icon_lucide_search) | Names matching a query against name + keywords. Empty query → all names. |
| [`fw_icon_lucide_search_data`](#fw_icon_lucide_search_data) | Load + cache the name → keyword-string map (for picker search). |
| [`fw_icon_pack__fetch_json`](#fw_icon_pack__fetch_json) | GET a URL and json_decode it. Returns array\|WP_Error. |
| [`fw_icon_pack__from_icomoon`](#fw_icon_pack__from_icomoon) | If $decoded is an IcoMoon selection.json export, convert it to our self-describing &#123; title, svg_open, icons:&#123; name =&gt; inner-markup &#125; &#125; shape; otherwise return null (so the caller treats it as one of our native formats). |
| [`fw_icon_pack__keywords`](#fw_icon_pack__keywords) | Search keywords for an icon name: the name plus its tokens, deduped. |
| [`fw_icon_pack__normalize_open`](#fw_icon_pack__normalize_open) | Clean an &lt;svg …&gt; opening tag: drop noise attrs, force colours to currentColor. |
| [`fw_icon_pack__rrmdir`](#fw_icon_pack__rrmdir) | Recursively delete a directory (used for temp + uninstall). |
| [`fw_icon_pack__unique_slug`](#fw_icon_pack__unique_slug) | A slug not already used by a bundled/installed/font/catalog pack. |
| [`fw_icon_pack__write_pack`](#fw_icon_pack__write_pack) | Atomically write a pack's three JSON files into the install dir. |
| [`fw_icon_pack_ajax_nonce`](#fw_icon_pack_ajax_nonce) | — |
| [`fw_icon_pack_catalog`](#fw_icon_pack_catalog) | Fetch + decode the remote catalog, cached in a transient (12h) so the installer UI is snappy and we don't hammer the CDN. Returns the decoded catalog array, or an empty shape on failure. |
| [`fw_icon_pack_catalog_url`](#fw_icon_pack_catalog_url) | URL of the catalog.json describing installable packs. Filterable so the host can point at a mirror/CDN. Default: the raw GitHub content of the icon-packs repo. |
| [`fw_icon_pack_counts`](#fw_icon_pack_counts) | Glyph counts for the ALWAYS-PRESENT libraries: the webfont packs and the bundled SVG sets (Lucide/Tabler). Both are static (they don't change between plugin versions), and computing them is costly — font counts parse each pack's CSS, bundled-SVG counts decode a multi-MB JSON — so the result is cached in a per-version transient and a per-request static. Installed packs are excluded (their count is read cheaply from meta.json in the payload). |
| [`fw_icon_pack_enabled_map`](#fw_icon_pack_enabled_map) | &#123; pack_id =&gt; bool &#125; saved map. Empty array = never curated (all enabled). |
| [`fw_icon_pack_enabled_option_key`](#fw_icon_pack_enabled_option_key) | — |
| [`fw_icon_pack_install`](#fw_icon_pack_install) | Download one pack from the catalog into the uploads install dir. Fetches the two data JSONs (icons + search) from the catalog base_url and writes them plus a meta.json. Atomic-ish: writes into a temp dir, then renames into place, so a half-downloaded pack never registers as installed. |
| [`fw_icon_pack_install_from_json`](#fw_icon_pack_install_from_json) | Install a user-uploaded icon pack from a JSON string. Accepts either a flat map &#123; name =&gt; markup &#125; or a self-describing &#123; title, svg_open, icons:&#123;…&#125; &#125;. Each icon's markup may be a full &lt;svg&gt;…&lt;/svg&gt; or just the inner paths; both are sanitised (wp_kses SVG allowlist — strips &lt;script&gt;, on* handlers, etc.), reduced to inner markup, and stripped of hardcoded colours so they inherit currentColor. Writes the same three-file pack shape as a catalog install, tagged origin:"custom". |
| [`fw_icon_pack_installed_meta`](#fw_icon_pack_installed_meta) | Decoded meta.json for one installed pack, or null. |
| [`fw_icon_pack_installed_slugs`](#fw_icon_pack_installed_slugs) | Slugs of packs installed under uploads (each a dir with a valid meta.json + icons.json). |
| [`fw_icon_pack_installer_packs`](#fw_icon_pack_installer_packs) | Data the unified installer panel needs. One flat `packs` list, each entry: &#123; slug, title, type:'font'\|'svg', state:'bundled'\|'installed'\|'available', enabled:bool, count:int &#125; covering the bundled webfonts (toggle only), bundled + installed SVG libraries (toggle + Remove for installed), and catalog packs available to install. Bundled icon counts are omitted (counting them would decode the multi-MB bundles on a settings-page load); installed/available counts are cheap. |
| [`fw_icon_pack_installer_payload`](#fw_icon_pack_installer_payload) | — |
| [`fw_icon_pack_set_enabled`](#fw_icon_pack_set_enabled) | Flip one pack on/off and persist. Seeds an all-enabled map on first write. |
| [`fw_icon_pack_uninstall`](#fw_icon_pack_uninstall) | Remove an installed pack. Bundled packs (lucide/tabler) can't be uninstalled — they have no dir under uploads, so this is a no-op error for them. |
| [`fw_icon_raster_enabled`](#fw_icon_raster_enabled) | Whether animated raster icons (GIF / APNG / WebP) are surfaced as a supported technology. These already upload + render through the normal image path (an &lt;img&gt; the browser animates natively), so this flag does NOT gate functionality — it only controls the picker hint that points authors at the capability. Default OFF; the Animated Icons extension turns it on from its "Animated raster" toggle. |
| [`fw_icon_rive_dir`](#fw_icon_rive_dir) | &#123; path, url &#125; of the Rive upload dir (uploads/unysonplus/rive). |
| [`fw_icon_rive_enabled`](#fw_icon_rive_enabled) | Whether the Rive technology is enabled (its Animated-tab panel, admin canvas runtime and .riv upload endpoint). Default OFF; the Animated Icons extension flips it on from its "Rive" toggle. |
| [`fw_icon_svg_animation_enabled`](#fw_icon_svg_animation_enabled) | Whether SVG icons may keep their SMIL animation (`&lt;animate&gt;`, `&lt;animateTransform&gt;`, …). Default OFF — the SVG sanitizer strips animation tags, so an animated SVG still renders but static. The Animated Icons extension flips this on from its "Animated SVG" toggle. SMIL is declarative (it cannot run JavaScript), and the XSS surface — scripts, event handlers, &lt;foreignObject&gt;, external refs — stays excluded either way. |
| [`fw_icon_svg_pack_all`](#fw_icon_svg_pack_all) | All icon names in a pack (sorted). |
| [`fw_icon_svg_pack_available`](#fw_icon_svg_pack_available) | True when a pack has bundled data (used to gate the settings + picker). Checks the data file's presence + non-emptiness on disk rather than json-decoding it — availability is queried on every builder page load, so decoding a multi-megabyte set (e.g. Tabler ~1.2 MB) here would be wasteful. |
| [`fw_icon_svg_pack_data`](#fw_icon_svg_pack_data) | name =&gt; inner-markup map for a pack (cached; empty if the file is absent). |
| [`fw_icon_svg_pack_file`](#fw_icon_svg_pack_file) | Resolve a pack data file to a readable path, checking the BUNDLED data/ dir first, then the INSTALLED uploads dir. This is what lets a pack be shipped in the plugin OR downloaded on demand and still resolve transparently. |
| [`fw_icon_svg_pack_install_dir`](#fw_icon_svg_pack_install_dir) | Absolute path of the on-demand icon-pack install root, where the installer writes packs fetched from the remote catalog (one sub-dir per pack: unysonplus-icon-packs/&lt;slug&gt;/&lt;slug&gt;-icons.json + -search.json). Lives under wp-content/uploads so it survives plugin updates and never bloats the plugin. |
| [`fw_icon_svg_pack_markup`](#fw_icon_svg_pack_markup) | Resolve a 'pack/name' id (e.g. 'lucide/star', 'tabler/home') to full inline &lt;svg&gt; markup with currentColor. Returns '' for an unknown pack/name. The markup still passes through sc_icon_sanitize_svg() at render. |
| [`fw_icon_svg_pack_registry`](#fw_icon_svg_pack_registry) | id =&gt; &#123; title, slug, svg_open &#125;. Filterable so more packs can be added. |
| [`fw_icon_svg_pack_search`](#fw_icon_svg_pack_search) | Names in a pack matching a query (name + keywords). Empty query → first slice. |
| [`fw_icon_svg_pack_search_data`](#fw_icon_svg_pack_search_data) | — |
| [`fw_option_type_background_pro_force_admin_enqueue`](#fw_option_type_background_pro_force_admin_enqueue) | Force-load the background-pro assets on post-edit screens. |
| [`fw_option_type_responsive_force_admin_enqueue`](#fw_option_type_responsive_force_admin_enqueue) | Force-load the device-tabs + responsive assets on post-edit screens. |
| [`fw_option_type_spacing_force_admin_enqueue`](#fw_option_type_spacing_force_admin_enqueue) | Force-load the spacing assets on post-edit screens. |
| [`unysonplus_all_icon_pack_ids`](#unysonplus_all_icon_pack_ids) | — |
| [`unysonplus_any_font_pack_enabled`](#unysonplus_any_font_pack_enabled) | True if at least one webfont pack is enabled (gates the Icon Fonts tab). |
| [`unysonplus_enabled_icon_packs`](#unysonplus_enabled_icon_packs) | Ids of the enabled packs. Defaults to ALL when the setting was never saved (existing sites are unchanged) and never returns empty (falls back to all), so a stray "uncheck everything" can't blank the picker entirely. |
| [`unysonplus_font_icon_pack_ids`](#unysonplus_font_icon_pack_ids) | Ids of the webfont packs (Dashicons, Font Awesome, Entypo, …). |
| [`unysonplus_icon_pack_choices`](#unysonplus_icon_pack_choices) | Every selectable pack: id =&gt; label (font packs first, then SVG libraries). |
| [`unysonplus_icon_pack_enabled`](#unysonplus_icon_pack_enabled) | — |
| [`unysonplus_svg_icon_pack_ids`](#unysonplus_svg_icon_pack_ids) | Ids of the bundled inline-SVG libraries that actually have data present. Derived from the multi-pack registry so a new pack (Tabler, …) appears everywhere just by dropping in its JSON + a registry entry. |

---

### `fw_fa4_to_fa6` {#fw_fa4_to_fa6}
*🔌 pluggable*

```php
fw_fa4_to_fa6( $class )
```

<small>Source: `framework/includes/option-types/icon/includes/fa-migrate.php:19`</small>

### `fw_icon_animated_enabled` {#fw_icon_animated_enabled}
*🔌 pluggable*

```php
fw_icon_animated_enabled()
```

Whether the "Animated" tab shows at all — i.e. at least one player-based technology (Lottie or Rive) is enabled. Derived from the per-technology gates, so the tab appears when either is on and hides when both are off. Core ships the tab, JS handlers and bundled players but keeps them OFF by default; the opt-in Animated Icons extension flips the per-technology gates. The FRONTEND render of already-saved animated values is intentionally NOT gated, so toggling the extension never breaks pages that already use one.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:911`</small>

### `fw_icon_lottie_dir` {#fw_icon_lottie_dir}
*🔌 pluggable*

```php
fw_icon_lottie_dir()
```

&#123; path, url &#125; of the Lottie upload dir (uploads/unysonplus/lottie).

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:946`</small>

### `fw_icon_lottie_enabled` {#fw_icon_lottie_enabled}
*🔌 pluggable*

```php
fw_icon_lottie_enabled()
```

Whether the Lottie technology is enabled (its Animated-tab panel, admin player runtime and .json upload endpoint). Default OFF; the Animated Icons extension flips it on from its "Lottie" toggle.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:885`</small>

### `fw_icon_lucide_all` {#fw_icon_lucide_all}
*🔌 pluggable*

```php
fw_icon_lucide_all()
```

All Lucide icon names (sorted), for the picker grid.

<small>Source: `framework/includes/option-types/icon/includes/lucide.php:74`</small>

### `fw_icon_lucide_data` {#fw_icon_lucide_data}
*🔌 pluggable*

```php
fw_icon_lucide_data()
```

Load + cache the name → inner-markup map.

<small>Source: `framework/includes/option-types/icon/includes/lucide.php:21`</small>

### `fw_icon_lucide_markup` {#fw_icon_lucide_markup}
*🔌 pluggable*

```php
fw_icon_lucide_markup( $name )
```

Resolve a Lucide icon name to complete inline &lt;svg&gt; markup (currentColor, so it inherits the surrounding text colour). Returns '' for an unknown name. The markup still passes through sc_icon_sanitize_svg() at render.

<small>Source: `framework/includes/option-types/icon/includes/lucide.php:57`</small>

### `fw_icon_lucide_search` {#fw_icon_lucide_search}
*🔌 pluggable*

```php
fw_icon_lucide_search( $query, $limit = 120 )
```

Names matching a query against name + keywords. Empty query → all names.

| Parameter | Type | Description |
| --- | --- | --- |
| `$query` | `string` | — |
| `$limit` | `int` | Max results (0 = no limit). |

<small>Source: `framework/includes/option-types/icon/includes/lucide.php:87`</small>

### `fw_icon_lucide_search_data` {#fw_icon_lucide_search_data}
*🔌 pluggable*

```php
fw_icon_lucide_search_data()
```

Load + cache the name → keyword-string map (for picker search).

<small>Source: `framework/includes/option-types/icon/includes/lucide.php:37`</small>

### `fw_icon_pack__fetch_json` {#fw_icon_pack__fetch_json}
*🔌 pluggable*

```php
fw_icon_pack__fetch_json( $url )
```

GET a URL and json_decode it. Returns array|WP_Error.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:581`</small>

### `fw_icon_pack__from_icomoon` {#fw_icon_pack__from_icomoon}
*🔌 pluggable*

```php
fw_icon_pack__from_icomoon( $decoded )
```

If $decoded is an IcoMoon selection.json export, convert it to our self-describing &#123; title, svg_open, icons:&#123; name =&gt; inner-markup &#125; &#125; shape; otherwise return null (so the caller treats it as one of our native formats).

IcoMoon signature: an `icons` LIST (numeric keys) whose entries carry
`icon.paths`, optionally alongside an `IcoMoonType` marker. Paths live in the
project's coordinate space (`height`, default 1024), standard SVG top-left
origin. Per-icon `width` may differ (non-square glyphs) — those get a centring
translate so they sit correctly inside the square viewBox the pack declares.

| Parameter | Type | Description |
| --- | --- | --- |
| `$decoded` | `array` | — |

**Returns** `array\|null`

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:428`</small>

### `fw_icon_pack__keywords` {#fw_icon_pack__keywords}
*🔌 pluggable*

```php
fw_icon_pack__keywords( $name )
```

Search keywords for an icon name: the name plus its tokens, deduped.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:486`</small>

### `fw_icon_pack__normalize_open` {#fw_icon_pack__normalize_open}
*🔌 pluggable*

```php
fw_icon_pack__normalize_open( $open )
```

Clean an &lt;svg …&gt; opening tag: drop noise attrs, force colours to currentColor.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:498`</small>

### `fw_icon_pack__rrmdir` {#fw_icon_pack__rrmdir}
*🔌 pluggable*

```php
fw_icon_pack__rrmdir( $dir )
```

Recursively delete a directory (used for temp + uninstall).

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:596`</small>

### `fw_icon_pack__unique_slug` {#fw_icon_pack__unique_slug}
*🔌 pluggable*

```php
fw_icon_pack__unique_slug( $base )
```

A slug not already used by a bundled/installed/font/catalog pack.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:534`</small>

### `fw_icon_pack__write_pack` {#fw_icon_pack__write_pack}
*🔌 pluggable*

```php
fw_icon_pack__write_pack( $slug, $icons, $search, $meta )
```

Atomically write a pack's three JSON files into the install dir.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:553`</small>

### `fw_icon_pack_ajax_nonce` {#fw_icon_pack_ajax_nonce}
*🔌 pluggable*

```php
fw_icon_pack_ajax_nonce()
```

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:610`</small>

### `fw_icon_pack_catalog` {#fw_icon_pack_catalog}
*🔌 pluggable*

```php
fw_icon_pack_catalog( $force = false )
```

Fetch + decode the remote catalog, cached in a transient (12h) so the installer UI is snappy and we don't hammer the CDN. Returns the decoded catalog array, or an empty shape on failure.

| Parameter | Type | Description |
| --- | --- | --- |
| `$force` | `bool` | Bypass the transient (used by an explicit "refresh"). |

**Returns** `array` &#123; version:int, base_url:string, packs:&#123; slug =&gt; &#123;title,slug,svg_open,count&#125; &#125; &#125;

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:49`</small>

### `fw_icon_pack_catalog_url` {#fw_icon_pack_catalog_url}
*🔌 pluggable*

```php
fw_icon_pack_catalog_url()
```

URL of the catalog.json describing installable packs. Filterable so the host can point at a mirror/CDN. Default: the raw GitHub content of the icon-packs repo.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:32`</small>

### `fw_icon_pack_counts` {#fw_icon_pack_counts}
*🔌 pluggable*

```php
fw_icon_pack_counts()
```

Glyph counts for the ALWAYS-PRESENT libraries: the webfont packs and the bundled SVG sets (Lucide/Tabler). Both are static (they don't change between plugin versions), and computing them is costly — font counts parse each pack's CSS, bundled-SVG counts decode a multi-MB JSON — so the result is cached in a per-version transient and a per-request static. Installed packs are excluded (their count is read cheaply from meta.json in the payload).

**Returns** `array` pack_id =&gt; int

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:148`</small>

### `fw_icon_pack_enabled_map` {#fw_icon_pack_enabled_map}
*🔌 pluggable*

```php
fw_icon_pack_enabled_map()
```

&#123; pack_id =&gt; bool &#125; saved map. Empty array = never curated (all enabled).

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:634`</small>

### `fw_icon_pack_enabled_option_key` {#fw_icon_pack_enabled_option_key}
*🔌 pluggable*

```php
fw_icon_pack_enabled_option_key()
```

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:625`</small>

### `fw_icon_pack_install` {#fw_icon_pack_install}
*🔌 pluggable*

```php
fw_icon_pack_install( $slug )
```

Download one pack from the catalog into the uploads install dir. Fetches the two data JSONs (icons + search) from the catalog base_url and writes them plus a meta.json. Atomic-ish: writes into a temp dir, then renames into place, so a half-downloaded pack never registers as installed.

| Parameter | Type | Description |
| --- | --- | --- |
| `$slug` | `string` | — |

**Returns** `true\|WP_Error`

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:222`</small>

### `fw_icon_pack_install_from_json` {#fw_icon_pack_install_from_json}
*🔌 pluggable*

```php
fw_icon_pack_install_from_json( $title, $json_raw )
```

Install a user-uploaded icon pack from a JSON string. Accepts either a flat map &#123; name =&gt; markup &#125; or a self-describing &#123; title, svg_open, icons:&#123;…&#125; &#125;. Each icon's markup may be a full &lt;svg&gt;…&lt;/svg&gt; or just the inner paths; both are sanitised (wp_kses SVG allowlist — strips &lt;script&gt;, on* handlers, etc.), reduced to inner markup, and stripped of hardcoded colours so they inherit currentColor. Writes the same three-file pack shape as a catalog install, tagged origin:"custom".

| Parameter | Type | Description |
| --- | --- | --- |
| `$title` | `string` | Pack name (falls back to the JSON's own title). |
| `$json_raw` | `string` | Raw uploaded file contents. |

**Returns** `array\|WP_Error` &#123; slug, count &#125; on success.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:325`</small>

### `fw_icon_pack_installed_meta` {#fw_icon_pack_installed_meta}
*🔌 pluggable*

```php
fw_icon_pack_installed_meta( $slug )
```

Decoded meta.json for one installed pack, or null.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:128`</small>

### `fw_icon_pack_installed_slugs` {#fw_icon_pack_installed_slugs}
*🔌 pluggable*

```php
fw_icon_pack_installed_slugs()
```

Slugs of packs installed under uploads (each a dir with a valid meta.json + icons.json).

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:109`</small>

### `fw_icon_pack_installer_packs` {#fw_icon_pack_installer_packs}
*🔌 pluggable*

```php
fw_icon_pack_installer_packs()
```

Data the unified installer panel needs. One flat `packs` list, each entry: &#123; slug, title, type:'font'|'svg', state:'bundled'|'installed'|'available', enabled:bool, count:int &#125; covering the bundled webfonts (toggle only), bundled + installed SVG libraries (toggle + Remove for installed), and catalog packs available to install. Bundled icon counts are omitted (counting them would decode the multi-MB bundles on a settings-page load); installed/available counts are cheap.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:727`</small>

### `fw_icon_pack_installer_payload` {#fw_icon_pack_installer_payload}
*🔌 pluggable*

```php
fw_icon_pack_installer_payload()
```

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:800`</small>

### `fw_icon_pack_set_enabled` {#fw_icon_pack_set_enabled}
*🔌 pluggable*

```php
fw_icon_pack_set_enabled( $slug, $on )
```

Flip one pack on/off and persist. Seeds an all-enabled map on first write.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:652`</small>

### `fw_icon_pack_uninstall` {#fw_icon_pack_uninstall}
*🔌 pluggable*

```php
fw_icon_pack_uninstall( $slug )
```

Remove an installed pack. Bundled packs (lucide/tabler) can't be uninstalled — they have no dir under uploads, so this is a no-op error for them.

| Parameter | Type | Description |
| --- | --- | --- |
| `$slug` | `string` | — |

**Returns** `true\|WP_Error`

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:296`</small>

### `fw_icon_raster_enabled` {#fw_icon_raster_enabled}
*🔌 pluggable*

```php
fw_icon_raster_enabled()
```

Whether animated raster icons (GIF / APNG / WebP) are surfaced as a supported technology. These already upload + render through the normal image path (an &lt;img&gt; the browser animates natively), so this flag does NOT gate functionality — it only controls the picker hint that points authors at the capability. Default OFF; the Animated Icons extension turns it on from its "Animated raster" toggle.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:939`</small>

### `fw_icon_rive_dir` {#fw_icon_rive_dir}
*🔌 pluggable*

```php
fw_icon_rive_dir()
```

&#123; path, url &#125; of the Rive upload dir (uploads/unysonplus/rive).

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:998`</small>

### `fw_icon_rive_enabled` {#fw_icon_rive_enabled}
*🔌 pluggable*

```php
fw_icon_rive_enabled()
```

Whether the Rive technology is enabled (its Animated-tab panel, admin canvas runtime and .riv upload endpoint). Default OFF; the Animated Icons extension flips it on from its "Rive" toggle.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:896`</small>

### `fw_icon_svg_animation_enabled` {#fw_icon_svg_animation_enabled}
*🔌 pluggable*

```php
fw_icon_svg_animation_enabled()
```

Whether SVG icons may keep their SMIL animation (`&lt;animate&gt;`, `&lt;animateTransform&gt;`, …). Default OFF — the SVG sanitizer strips animation tags, so an animated SVG still renders but static. The Animated Icons extension flips this on from its "Animated SVG" toggle. SMIL is declarative (it cannot run JavaScript), and the XSS surface — scripts, event handlers, &lt;foreignObject&gt;, external refs — stays excluded either way.

<small>Source: `framework/includes/option-types/icon/includes/pack-installer.php:925`</small>

### `fw_icon_svg_pack_all` {#fw_icon_svg_pack_all}
*🔌 pluggable*

```php
fw_icon_svg_pack_all( $pack, $limit = 0 )
```

All icon names in a pack (sorted).

<small>Source: `framework/includes/option-types/icon/includes/svg-packs.php:167`</small>

### `fw_icon_svg_pack_available` {#fw_icon_svg_pack_available}
*🔌 pluggable*

```php
fw_icon_svg_pack_available( $pack )
```

True when a pack has bundled data (used to gate the settings + picker). Checks the data file's presence + non-emptiness on disk rather than json-decoding it — availability is queried on every builder page load, so decoding a multi-megabyte set (e.g. Tabler ~1.2 MB) here would be wasteful.

<small>Source: `framework/includes/option-types/icon/includes/svg-packs.php:123`</small>

### `fw_icon_svg_pack_data` {#fw_icon_svg_pack_data}
*🔌 pluggable*

```php
fw_icon_svg_pack_data( $pack )
```

name =&gt; inner-markup map for a pack (cached; empty if the file is absent).

<small>Source: `framework/includes/option-types/icon/includes/svg-packs.php:79`</small>

### `fw_icon_svg_pack_file` {#fw_icon_svg_pack_file}
*🔌 pluggable*

```php
fw_icon_svg_pack_file( $slug, $kind )
```

Resolve a pack data file to a readable path, checking the BUNDLED data/ dir first, then the INSTALLED uploads dir. This is what lets a pack be shipped in the plugin OR downloaded on demand and still resolve transparently.

| Parameter | Type | Description |
| --- | --- | --- |
| `$slug` | `string` | e.g. 'lucide' |
| `$kind` | `string` | 'icons' \| 'search' |

**Returns** `string` Readable absolute path, or '' if the pack isn't present anywhere.

<small>Source: `framework/includes/option-types/icon/includes/svg-packs.php:64`</small>

### `fw_icon_svg_pack_install_dir` {#fw_icon_svg_pack_install_dir}
*🔌 pluggable*

```php
fw_icon_svg_pack_install_dir()
```

Absolute path of the on-demand icon-pack install root, where the installer writes packs fetched from the remote catalog (one sub-dir per pack: unysonplus-icon-packs/&lt;slug&gt;/&lt;slug&gt;-icons.json + -search.json). Lives under wp-content/uploads so it survives plugin updates and never bloats the plugin.

<small>Source: `framework/includes/option-types/icon/includes/svg-packs.php:48`</small>

### `fw_icon_svg_pack_markup` {#fw_icon_svg_pack_markup}
*🔌 pluggable*

```php
fw_icon_svg_pack_markup( $id )
```

Resolve a 'pack/name' id (e.g. 'lucide/star', 'tabler/home') to full inline &lt;svg&gt; markup with currentColor. Returns '' for an unknown pack/name. The markup still passes through sc_icon_sanitize_svg() at render.

<small>Source: `framework/includes/option-types/icon/includes/svg-packs.php:143`</small>

### `fw_icon_svg_pack_registry` {#fw_icon_svg_pack_registry}
*🔌 pluggable*

```php
fw_icon_svg_pack_registry()
```

id =&gt; &#123; title, slug, svg_open &#125;. Filterable so more packs can be added.

<small>Source: `framework/includes/option-types/icon/includes/svg-packs.php:22`</small>

### `fw_icon_svg_pack_search` {#fw_icon_svg_pack_search}
*🔌 pluggable*

```php
fw_icon_svg_pack_search( $pack, $query, $limit = 120 )
```

Names in a pack matching a query (name + keywords). Empty query → first slice.

| Parameter | Type | Description |
| --- | --- | --- |
| `$pack` | `string` | — |
| `$query` | `string` | — |
| `$limit` | `int` | Max results (0 = no limit). |

<small>Source: `framework/includes/option-types/icon/includes/svg-packs.php:181`</small>

### `fw_icon_svg_pack_search_data` {#fw_icon_svg_pack_search_data}
*🔌 pluggable*

```php
fw_icon_svg_pack_search_data( $pack )
```

<small>Source: `framework/includes/option-types/icon/includes/svg-packs.php:98`</small>

### `fw_option_type_background_pro_force_admin_enqueue` {#fw_option_type_background_pro_force_admin_enqueue}
*🔌 pluggable*

```php
fw_option_type_background_pro_force_admin_enqueue()
```

Force-load the background-pro assets on post-edit screens.

background-pro ships its own stylesheet/script plus a stack of child controls
(predefined-colors, color-picker, gradient-v2, upload, oembed, fw-multi-inline).
When it's used in a shortcode (e.g. the Section's Background control), the
page-builder modal loads options via an AJAX walk that does not reliably reach
nested custom option types — so the control could render unstyled / inert.
Enqueuing here on every post-edit screen (where the builder + shortcode modals
live) guarantees the assets are present before any modal opens. enqueue_static
dedupes by handle, so this is a safe no-op when something already loaded them.

<small>Source: `framework/includes/option-types/background-pro/class-fw-option-type-background-pro.php:713`</small>

### `fw_option_type_responsive_force_admin_enqueue` {#fw_option_type_responsive_force_admin_enqueue}
*🔌 pluggable*

```php
fw_option_type_responsive_force_admin_enqueue()
```

Force-load the device-tabs + responsive assets on post-edit screens.

Same reasoning as the spacing type: generic shortcodes load their option HTML
into the page-builder modal via AJAX, and the page-load enqueue walk that is
supposed to cover them does not reliably reach a nested custom option type —
so the device switcher could be unstyled/inert in those modals. Enqueuing on
every post-edit screen guarantees the assets are present before any modal
opens; wp_enqueue_* dedupes by handle, so this is a no-op when already loaded.

<small>Source: `framework/includes/option-types/responsive/class-fw-option-type-responsive.php:247`</small>

### `fw_option_type_spacing_force_admin_enqueue` {#fw_option_type_spacing_force_admin_enqueue}
*🔌 pluggable*

```php
fw_option_type_spacing_force_admin_enqueue()
```

Force-load the spacing assets on post-edit screens.

Unlike base option types — whose styles live in the always-loaded
option-types.css — the spacing control ships its OWN stylesheet/script (link
toggle, device switcher, …). Generic shortcodes (text-block, button, …) load
their option HTML into the page-builder modal via AJAX, and the page-load
enqueue walk that is supposed to cover them does not reliably reach this
nested custom option type — so its CSS/JS could be missing in those modals
(symptom: both link-toggle icons showing, an unstyled grid). Enqueuing here on
every post-edit screen (where the builder and shortcode modals live) guarantees
the assets are on the page before any modal opens. The option type's own
`static_enqueued` guard makes this a no-op when something already enqueued it.

<small>Source: `framework/includes/option-types/spacing/class-fw-option-type-spacing.php:471`</small>

### `unysonplus_all_icon_pack_ids` {#unysonplus_all_icon_pack_ids}
*🔌 pluggable*

```php
unysonplus_all_icon_pack_ids()
```

<small>Source: `framework/includes/option-types/icon/includes/pack-settings.php:73`</small>

### `unysonplus_any_font_pack_enabled` {#unysonplus_any_font_pack_enabled}
*🔌 pluggable*

```php
unysonplus_any_font_pack_enabled()
```

True if at least one webfont pack is enabled (gates the Icon Fonts tab).

<small>Source: `framework/includes/option-types/icon/includes/pack-settings.php:119`</small>

### `unysonplus_enabled_icon_packs` {#unysonplus_enabled_icon_packs}
*🔌 pluggable*

```php
unysonplus_enabled_icon_packs()
```

Ids of the enabled packs. Defaults to ALL when the setting was never saved (existing sites are unchanged) and never returns empty (falls back to all), so a stray "uncheck everything" can't blank the picker entirely.

Iterates the CURRENT pack list, so a pack bundled AFTER the checklist was
last saved (e.g. Tabler, added in a later release) is absent from the saved
value and defaults ON — a new library is opt-out, not silently hidden.
Only a pack explicitly present-and-false in the saved value is disabled.

<small>Source: `framework/includes/option-types/icon/includes/pack-settings.php:89`</small>

### `unysonplus_font_icon_pack_ids` {#unysonplus_font_icon_pack_ids}
*🔌 pluggable*

```php
unysonplus_font_icon_pack_ids()
```

Ids of the webfont packs (Dashicons, Font Awesome, Entypo, …).

<small>Source: `framework/includes/option-types/icon/includes/pack-settings.php:20`</small>

### `unysonplus_icon_pack_choices` {#unysonplus_icon_pack_choices}
*🔌 pluggable*

```php
unysonplus_icon_pack_choices()
```

Every selectable pack: id =&gt; label (font packs first, then SVG libraries).

<small>Source: `framework/includes/option-types/icon/includes/pack-settings.php:52`</small>

### `unysonplus_icon_pack_enabled` {#unysonplus_icon_pack_enabled}
*🔌 pluggable*

```php
unysonplus_icon_pack_enabled( $id )
```

<small>Source: `framework/includes/option-types/icon/includes/pack-settings.php:112`</small>

### `unysonplus_svg_icon_pack_ids` {#unysonplus_svg_icon_pack_ids}
*🔌 pluggable*

```php
unysonplus_svg_icon_pack_ids()
```

Ids of the bundled inline-SVG libraries that actually have data present. Derived from the multi-pack registry so a new pack (Tabler, …) appears everywhere just by dropping in its JSON + a registry entry.

<small>Source: `framework/includes/option-types/icon/includes/pack-settings.php:38`</small>

← Back to [Functions overview](./index.md)
