---
title: "Presets & design-token hooks"
sidebar_position: 4
---

# Presets & design-token hooks

Hooks for the **Component Presets** libraries and the **design-token / CSS-output pipeline**. These let you register your own color palette, font-size scale, spacing scale, button / border / table presets, and inject CSS into the generated stylesheet, all from PHP.

Two flavors:
- `unysonplus_<thing>_presets` / `unysonplus_<thing>_scale` filter the **live** list (what's in use).
- `unysonplus_default_<thing>_presets` filter only the **built-in defaults** (what ships before the user edits anything).

Register a custom color preset (it becomes available everywhere colors are picked, and emits a `text-{slug}` / `bg-{slug}` utility class):

```php
add_filter( 'unysonplus_color_presets', function ( $colors ) {
    $colors['brand'] = array( 'label' => 'Brand', 'color' => '#0d6efd' );
    return $colors;
} );
```

Inject global or per-page CSS into the single generated stylesheet:

```php
add_filter( 'unysonplus_global_css', function ( $css ) {
    return $css . ' .my-rule{ color: var(--color-brand); }';
} );
```

See [How settings become CSS](/theme/settings-to-css) for where this output lands.

### Actions (0)

_None._

### Filters (22)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `unysonplus_border_presets` | `$saved` | _unysonplus/framework/includes/presets/border-presets.php_ |
| `unysonplus_button_color_presets` | `$saved` | _unysonplus/framework/includes/presets/button-presets.php_ |
| `unysonplus_button_size_presets` | `$saved` | _unysonplus/framework/includes/presets/button-presets.php_ |
| `unysonplus_color_presets` | `$saved` | _unysonplus/framework/includes/presets/color-presets.php_ |
| `unysonplus_custom_hover_animations` | `$saved` | _unysonplus/framework/includes/presets/button-presets.php_ |
| `unysonplus_default_border_presets` | _see source_ | _unysonplus/framework/includes/presets/border-presets.php_ |
| `unysonplus_default_button_color_presets` | _see source_ | _unysonplus/framework/includes/presets/button-presets.php_ |
| `unysonplus_default_button_size_presets` | _see source_ | _unysonplus/framework/includes/presets/button-presets.php_ |
| `unysonplus_default_color_presets` | _see source_ | _unysonplus/framework/includes/presets/color-presets.php_ |
| `unysonplus_default_custom_hover_animations` | _see source_ | _unysonplus/framework/includes/presets/button-presets.php_ |
| `unysonplus_default_font_size_presets` | _see source_ | _unysonplus/framework/includes/presets/font-size-presets.php_ |
| `unysonplus_default_gap_scale` | _see source_ | _unysonplus/framework/includes/presets/spacing-presets.php_ |
| `unysonplus_default_spacing_scale` | _see source_ | _unysonplus/framework/includes/presets/spacing-presets.php_ |
| `unysonplus_default_table_presets` | _see source_ | _unysonplus/framework/includes/presets/table-presets.php_ |
| `unysonplus_font_size_presets` | `$saved` | _unysonplus/framework/includes/presets/font-size-presets.php_ |
| `unysonplus_gap_scale` | `$saved` | _unysonplus/framework/includes/presets/spacing-presets.php_ |
| `unysonplus_global_css` | `''` | Site-wide Custom CSS (the theme contributes its Theme Settings → Misc → Custom CSS through this filter). Folded into the presets file so it rides the same combiner-absorbed, cacheable handle and is no longer emitted as its own inline &lt;style&gt; block in wp_head. |
| `unysonplus_mobile_font_scale` | `$scale, $desktop_px, $context` | _unysonplus/framework/includes/presets/font-size-presets.php_ |
| `unysonplus_page_css` | `'', $post_id` | 2. Page-level CSS contributed by the theme (page bg + page_custom_css). |
| `unysonplus_preset_store_extension` | `'shortcodes'` | _unysonplus/framework/includes/presets/store.php_ |
| `unysonplus_spacing_scale` | `$migrated` | Phase 2.5 entry-array shape — return as-is |
| `unysonplus_table_presets` | `$saved` | _unysonplus/framework/includes/presets/table-presets.php_ |

