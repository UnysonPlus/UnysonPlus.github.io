---
title: "Theme hooks"
sidebar_position: 6
---

# Theme hooks

Template and design-layer hooks fired by the **Unyson+ Theme** (`unysonplus-theme`). These are the hooks a child theme uses to inject markup into the header, footer, blog loop, and entry templates, and to filter the settings → CSS pipeline.

The blog loop exposes a full set of action points — drop content around posts without overriding templates:

```php
add_action( 'unysonplus_entry_header', function () {
    // Runs in the post header area of the blog loop / single post.
} );
```

Common loop hooks include `unysonplus_before_loop` / `unysonplus_after_loop`, `unysonplus_entry_top`, `unysonplus_entry_header`, `unysonplus_after_entry_content`, and `unysonplus_after_entry`. See [The Theme](/docs/theme) for how the chrome and blog templates are assembled.

### Actions (25)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `unysonplus_after` | — | _unysonplus-theme/footer.php_ |
| `unysonplus_after_archive_title` | — | Fires after the archive page title (page-header) renders. |
| `unysonplus_after_entry` | — | _unysonplus-theme/single.php_ |
| `unysonplus_after_entry_content` | — | Fires after .entry-content closes. |
| `unysonplus_after_entry_title` | — | Fires after the entry &lt;h1&gt;/&lt;h2&gt; title prints. |
| `unysonplus_after_footer` | — | _unysonplus-theme/footer.php_ |
| `unysonplus_after_header` | — | _unysonplus-theme/header.php_ |
| `unysonplus_after_loop` | — | Fires after the post loop ends (before pagination). |
| `unysonplus_after_main` | — | Fires just after &lt;/main&gt; closes, before the sidebar renders. Use to inject post-navigation, related posts, social share, etc. |
| `unysonplus_after_sidebar` | — | Fires just after the left sidebar &lt;/aside&gt; closes. |
| `unysonplus_before_archive_title` | — | Fires before the archive page title (page-header) renders. |
| `unysonplus_before_entry` | — | _unysonplus-theme/single.php_ |
| `unysonplus_before_entry_content` | — | Fires before .entry-content opens. |
| `unysonplus_before_entry_title` | — | Fires before the entry &lt;h1&gt;/&lt;h2&gt; title prints. |
| `unysonplus_before_footer` | — | _unysonplus-theme/footer.php_ |
| `unysonplus_before_header` | — | _unysonplus-theme/header.php_ |
| `unysonplus_before_loop` | — | Fires before the post loop starts. |
| `unysonplus_before_main` | — | Fires just before &lt;main&gt; opens. Use to inject banners, breadcrumbs, or sticky bars inside the content container. |
| `unysonplus_before_sidebar` | — | Fires just before the left sidebar &lt;aside&gt; renders. |
| `unysonplus_entry_bottom` | — | Fires at the bottom of &lt;article&gt;. |
| `unysonplus_entry_header` | — | _unysonplus-theme/template-parts/content-page.php_ |
| `unysonplus_entry_top` | — | Fires at the top of &lt;article&gt;. |
| `unysonplus_header_bottom` | — | _unysonplus-theme/template-parts/header-builder.php_ |
| `unysonplus_header_top` | — | _unysonplus-theme/template-parts/header-builder.php_ |
| `unysonplus_page_hero_inner` | — | _unysonplus-theme/inc/includes/layout.php_ |

### Filters (7)

| Hook | Passes to your callback | What it does |
| --- | --- | --- |
| `fw_theme_get_featured_posts` | `array()` | @param array\|bool $posts Array of featured posts, otherwise false. |
| `unysonplus_settings_io_exclude_keys` | _see source_ | _unysonplus-theme/inc/includes/settings-export-import.php_ |
| `unysonplus_woocommerce_loop_columns` | `3` | _unysonplus-theme/inc/includes/woocommerce.php_ |
| `unysonplus_woocommerce_products_per_page` | `12` | _unysonplus-theme/inc/includes/woocommerce.php_ |
| `unysonplus_woocommerce_related_count` | `3` | _unysonplus-theme/inc/includes/woocommerce.php_ |
| `unysonplus_woocommerce_sidebar` | `'none'` | Sidebar position for WooCommerce pages. @param string $position 'none' \| 'left' \| 'right'. Default 'none'. |
| `unysonplus_woocommerce_thumbnail_columns` | `4` | _unysonplus-theme/inc/includes/woocommerce.php_ |

