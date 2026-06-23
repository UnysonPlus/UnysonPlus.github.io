---
title: "Hooks & Filters"
slug: /hooks
sidebar_position: 1
---

# Hooks & Filters

Unyson+ fires WordPress **actions** and **filters** throughout the framework, the theme, and every
extension, so you can extend behavior without editing core files. This section is a complete,
source-derived reference: **258 hooks** across the plugin and theme, grouped by subsystem.

- **Actions** let you *run code* at a point in time (`add_action`).
- **Filters** let you *change a value* and return it (`add_filter`).

:::tip This reference is generated from the source
Every hook below is extracted directly from the plugin and theme PHP (`do_action()` /
`apply_filters()` call sites), so it stays exhaustive and accurate. The **Passes to your callback**
column is the real argument list from the call site; **What it does** is taken from the hook's
docblock where one exists, otherwise the defining file is shown so you can read its context.
:::

## Naming conventions

The prefix tells you where a hook comes from and how stable it is:

| Prefix | Origin | Notes |
| --- | --- | --- |
| `fw_…` | Framework core (Unyson heritage) | The stable, long-standing public API. |
| `fw:…` | Framework / extensions (namespaced) | Newer, often subsystem-internal (e.g. `fw:ext:page-builder:…`). Powerful, but more advanced. |
| `fw-…` | A few legacy hyphenated hooks | Equivalent to the above, kept for back-compat. |
| `unysonplus_…` | The Unyson+ **theme** | Template / blog-loop / design-layer hooks for child themes. |
| `sc_…` | Shortcodes & Site Converter helpers | Render-time helpers and converter hooks. |
| `upwc_…` | The WooCommerce extension | Storefront element hooks. |

:::note WordPress core and the bundled update library are excluded
Hooks Unyson+ merely *calls* (WordPress core actions like `init`, `wp_enqueue_scripts`) and the
bundled `plugin-update-checker` library's `puc_…` hooks are **not** listed here. This reference is
only the hooks Unyson+ itself defines.
:::

## How to use a hook

```php
// Action: run code when the framework finishes loading.
add_action( 'fw_init', 'my_fw_ready' );
function my_fw_ready() {
    // fw() and all components are available here.
}

// Filter: change a value and RETURN it. The 4th arg is how many
// values the hook passes (match the "Passes to your callback" column).
add_filter( 'fw_post_options', 'my_post_options', 10, 2 );
function my_post_options( $options, $post_type ) {
    if ( $post_type === 'page' ) {
        $options['subtitle'] = array( 'type' => 'text', 'label' => 'Subtitle' );
    }
    return $options; // filters MUST return
}
```

The number in `add_filter( …, 10, 2 )` is the **accepted-args** count. If a hook's *Passes to your
callback* column lists two values, pass `2`, declare two parameters, and (for filters) return the
first one modified.

## The reference, by subsystem

| Subsystem | Hooks | What lives here |
| --- | --- | --- |
| **[Framework core](./framework-core.md)** | 41 | Boot lifecycle (`fw_init`, `fw_before_init`), forms, flash messages, dynamic content. |
| **[Options & backend](./options-and-backend.md)** | 29 | Registering Theme Settings / Customizer / post / taxonomy options, option-type rendering, storage, admin enqueue. |
| **[Presets & design tokens](./presets-and-tokens.md)** | 22 | Register color / typography / spacing / button / border / table presets and inject CSS into the generated stylesheet. |
| **[Page Builder & builder](./page-builder.md)** | 21 | The builder JSON correction pipeline, column-width fitting, item types, editor enqueue/render. |
| **[Shortcodes & elements](./shortcodes.md)** | 34 | Altering element options and atts, render-time HTML filters, dynamic-content tokens. |
| **[Theme](./theme.md)** | 32 | Header / footer / blog-loop / entry template action points and the settings → CSS filters. |
| **[Extension system & updates](./extensions-and-updates.md)** | 31 | Extension discovery/activation, the available-extensions registry, the GitHub auto-updater. |
| **[Per-extension hooks](./extension-hooks.md)** | 48 | Breadcrumbs, Forms, Mega Menu, Portfolio, Sidebars, Asset Optimizer, Post Types, Mailer, and more. |

## Start here: the hooks you'll use most

A few high-value hooks, with full examples, to get you going. Each links to its subsystem page for
the rest.

### `fw_settings_options` — add a Theme Settings tab

```php
add_filter( 'fw_settings_options', function ( $options ) {
    $options['my_tab'] = array(
        'type'    => 'tab',
        'title'   => __( 'My Tab', 'my-domain' ),
        'options' => array(
            'my_field' => array( 'type' => 'text', 'label' => 'My field' ),
        ),
    );
    return $options;
} );
```

The siblings `fw_customizer_options`, `fw_post_options` (passed `$post_type`) and
`fw_taxonomy_options` (passed `$taxonomy`) work the same way. See
[Options & backend](./options-and-backend.md).

### `fw_shortcode_get_options` — extend an element's options

```php
add_filter( 'fw_shortcode_get_options', function ( $options, $shortcode ) {
    if ( $shortcode === 'button' ) {
        $options['my_extra'] = array( 'type' => 'text', 'label' => 'Extra' );
    }
    return $options;
}, 10, 2 );
```

More in [Shortcodes & elements](./shortcodes.md).

### `unysonplus_entry_header` — inject into the blog loop (theme)

```php
add_action( 'unysonplus_entry_header', function () {
    if ( is_single() ) {
        echo '<p class="reading-time">' . esc_html( my_reading_time() ) . '</p>';
    }
} );
```

The theme exposes the whole loop as hooks (`unysonplus_before_loop`, `unysonplus_entry_top`,
`unysonplus_after_entry_content`, `unysonplus_after_entry`, …). See [Theme](./theme.md).

### `fw_ext_mngr_github_branch` — change the auto-update branch

```php
add_filter( 'fw_ext_mngr_github_branch', function ( $branch, $user_repo ) {
    return 'main';
}, 10, 2 );
```

More in [Extension system & updates](./extensions-and-updates.md).
