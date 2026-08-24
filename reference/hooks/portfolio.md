---
title: Portfolio — hooks
sidebar_label: Portfolio
slug: /hooks/portfolio
description: Actions and filters exposed by the UnysonPlus Portfolio subsystem.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->

# Portfolio — hooks

**11 hooks** — 2 actions · 9 filters.

| Hook | Type | Summary |
| --- | --- | --- |
| [`fw_ext_portfolio_category_name`](#h-fw-ext-portfolio-category-name) | filter | Filters the singular and plural labels for the portfolio category taxonomy. |
| [`fw_ext_portfolio_jsonld`](#h-fw-ext-portfolio-jsonld) | filter | Filters the portfolio JSON-LD structured data before it is output in the page head. |
| [`fw_ext_portfolio_post_slug`](#h-fw-ext-portfolio-post-slug) | filter | Filters the portfolio post type permalink slug. |
| [`fw_ext_portfolio_tag_name`](#h-fw-ext-portfolio-tag-name) | filter | Filters the singular and plural labels for the portfolio tag taxonomy. |
| [`fw_ext_portfolio_taxonomy_slug`](#h-fw-ext-portfolio-taxonomy-slug) | filter | Filters the portfolio category taxonomy permalink slug. |
| [`fw_ext_projects_feature_supports`](#h-fw-ext-projects-feature-supports) | filter | Filters the supports array (title, editor, thumbnail, revisions, page-attributes) used when registering the portfolio project post type. |
| [`fw_ext_projects_post_type_name`](#h-fw-ext-projects-post-type-name) | filter | Filters the singular and plural labels used when registering the portfolio project post type. |
| [`fw:ext:portfolio:enable-tags`](#h-fw-ext-portfolio-enable-tags) | filter | Filters whether the portfolio Tag taxonomy is registered, defaulting to the settings toggle. |
| [`fw:ext:portfolio:setting`](#h-fw-ext-portfolio-setting) | filter | Filters a portfolio display setting value by key, letting the active theme override extension defaults. |
| [`unysonplus_after_archive_title`](#h-unysonplus-after-archive-title) | action | Fires in the portfolio archive after the archive header renders, letting code inject markup below the title. |
| [`unysonplus_before_archive_title`](#h-unysonplus-before-archive-title) | action | Fires in the portfolio archive before the archive header renders, letting code inject markup above the title. |

---

### `fw_ext_portfolio_category_name` {#h-fw-ext-portfolio-category-name}
*🧪 filter*

Filters the singular and plural labels for the portfolio category taxonomy.

```php
add_filter( 'fw_ext_portfolio_category_name', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:377`</small>

### `fw_ext_portfolio_jsonld` {#h-fw-ext-portfolio-jsonld}
*🧪 filter*

Filters the portfolio JSON-LD structured data before it is output in the page head.

```php
add_filter( 'fw_ext_portfolio_jsonld', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:773`</small>

### `fw_ext_portfolio_post_slug` {#h-fw-ext-portfolio-post-slug}
*🧪 filter · 2 call sites*

Filters the portfolio post type permalink slug.

```php
add_filter( 'fw_ext_portfolio_post_slug', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:126`</small>

### `fw_ext_portfolio_tag_name` {#h-fw-ext-portfolio-tag-name}
*🧪 filter*

Filters the singular and plural labels for the portfolio tag taxonomy.

```php
add_filter( 'fw_ext_portfolio_tag_name', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:411`</small>

### `fw_ext_portfolio_taxonomy_slug` {#h-fw-ext-portfolio-taxonomy-slug}
*🧪 filter · 2 call sites*

Filters the portfolio category taxonomy permalink slug.

```php
add_filter( 'fw_ext_portfolio_taxonomy_slug', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:132`</small>

### `fw_ext_projects_feature_supports` {#h-fw-ext-projects-feature-supports}
*🧪 filter*

Filters the supports array (title, editor, thumbnail, revisions, page-attributes) used when registering the portfolio project post type.

```php
add_filter( 'fw_ext_projects_feature_supports', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:300`</small>

### `fw_ext_projects_post_type_name` {#h-fw-ext-projects-post-type-name}
*🧪 filter*

Filters the singular and plural labels used when registering the portfolio project post type.

```php
add_filter( 'fw_ext_projects_post_type_name', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:293`</small>

### `fw:ext:portfolio:enable-tags` {#h-fw-ext-portfolio-enable-tags}
*🧪 filter*

Filters whether the portfolio Tag taxonomy is registered, defaulting to the settings toggle.

```php
add_filter( 'fw:ext:portfolio:enable-tags', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:121`</small>

### `fw:ext:portfolio:setting` {#h-fw-ext-portfolio-setting}
*🧪 filter*

Filters a portfolio display setting value by key, letting the active theme override extension defaults.

```php
add_filter( 'fw:ext:portfolio:setting', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:77`</small>

### `unysonplus_after_archive_title` {#h-unysonplus-after-archive-title}
*🎬 action*

Fires in the portfolio archive after the archive header renders, letting code inject markup below the title.

```php
add_action( 'unysonplus_after_archive_title', $callback );
```
<small>Fired in: `framework/extensions/portfolio/views/archive.php:40`</small>

### `unysonplus_before_archive_title` {#h-unysonplus-before-archive-title}
*🎬 action*

Fires in the portfolio archive before the archive header renders, letting code inject markup above the title.

```php
add_action( 'unysonplus_before_archive_title', $callback );
```
<small>Fired in: `framework/extensions/portfolio/views/archive.php:37`</small>

← Back to [Hooks overview](./index.md)
