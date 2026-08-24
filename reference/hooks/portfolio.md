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
| [`fw_ext_portfolio_category_name`](#h-fw-ext-portfolio-category-name) | filter | — |
| [`fw_ext_portfolio_jsonld`](#h-fw-ext-portfolio-jsonld) | filter | — |
| [`fw_ext_portfolio_post_slug`](#h-fw-ext-portfolio-post-slug) | filter | — |
| [`fw_ext_portfolio_tag_name`](#h-fw-ext-portfolio-tag-name) | filter | — |
| [`fw_ext_portfolio_taxonomy_slug`](#h-fw-ext-portfolio-taxonomy-slug) | filter | — |
| [`fw_ext_projects_feature_supports`](#h-fw-ext-projects-feature-supports) | filter | — |
| [`fw_ext_projects_post_type_name`](#h-fw-ext-projects-post-type-name) | filter | — |
| [`fw:ext:portfolio:enable-tags`](#h-fw-ext-portfolio-enable-tags) | filter | — |
| [`fw:ext:portfolio:setting`](#h-fw-ext-portfolio-setting) | filter | — |
| [`unysonplus_after_archive_title`](#h-unysonplus-after-archive-title) | action | — |
| [`unysonplus_before_archive_title`](#h-unysonplus-before-archive-title) | action | — |

---

### `fw_ext_portfolio_category_name` {#h-fw-ext-portfolio-category-name}
*🧪 filter*

```php
add_filter( 'fw_ext_portfolio_category_name', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:369`</small>

### `fw_ext_portfolio_jsonld` {#h-fw-ext-portfolio-jsonld}
*🧪 filter*

```php
add_filter( 'fw_ext_portfolio_jsonld', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:763`</small>

### `fw_ext_portfolio_post_slug` {#h-fw-ext-portfolio-post-slug}
*🧪 filter · 2 call sites*

```php
add_filter( 'fw_ext_portfolio_post_slug', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:122`</small>

### `fw_ext_portfolio_tag_name` {#h-fw-ext-portfolio-tag-name}
*🧪 filter*

```php
add_filter( 'fw_ext_portfolio_tag_name', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:402`</small>

### `fw_ext_portfolio_taxonomy_slug` {#h-fw-ext-portfolio-taxonomy-slug}
*🧪 filter · 2 call sites*

```php
add_filter( 'fw_ext_portfolio_taxonomy_slug', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:127`</small>

### `fw_ext_projects_feature_supports` {#h-fw-ext-projects-feature-supports}
*🧪 filter*

```php
add_filter( 'fw_ext_projects_feature_supports', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:293`</small>

### `fw_ext_projects_post_type_name` {#h-fw-ext-projects-post-type-name}
*🧪 filter*

```php
add_filter( 'fw_ext_projects_post_type_name', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:287`</small>

### `fw:ext:portfolio:enable-tags` {#h-fw-ext-portfolio-enable-tags}
*🧪 filter*

```php
add_filter( 'fw:ext:portfolio:enable-tags', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:118`</small>

### `fw:ext:portfolio:setting` {#h-fw-ext-portfolio-setting}
*🧪 filter*

```php
add_filter( 'fw:ext:portfolio:setting', $callback );
```
<small>Fired in: `framework/extensions/portfolio/class-fw-extension-portfolio.php:75`</small>

### `unysonplus_after_archive_title` {#h-unysonplus-after-archive-title}
*🎬 action*

```php
add_action( 'unysonplus_after_archive_title', $callback );
```
<small>Fired in: `framework/extensions/portfolio/views/archive.php:38`</small>

### `unysonplus_before_archive_title` {#h-unysonplus-before-archive-title}
*🎬 action*

```php
add_action( 'unysonplus_before_archive_title', $callback );
```
<small>Fired in: `framework/extensions/portfolio/views/archive.php:36`</small>

← Back to [Hooks overview](./index.md)
