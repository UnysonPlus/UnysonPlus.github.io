---
title: Logo
sidebar_position: 2
slug: /header-footer-elements/logo
description: The Unyson+ header/footer Logo element — renders the Site Identity logo lockup; how it's coded, generated HTML, and Hide On / CSS Class examples.
---

# Logo

The **Logo** element renders the site's logo lockup from **Theme Settings → Header → Identity** (image
or text wordmark). It has **no fields of its own** — it reuses the Identity logo — so a single source
of truth drives every logo instance. Available in both Header and Footer.

## Where the code lives

| | |
| --- | --- |
| **Type key** | `logo` |
| **Fields** | none (`element_type[logo]` = `{}`) |
| **Rendered by** | `unysonplus_logo()` (`inc/helpers.php`), dispatched in `inc/includes/header-builder.php` |

## How it works

The renderer simply calls `unysonplus_logo()`, which outputs the Identity lockup — an anchor to the
home URL wrapping the image logo (or the text wordmark + optional icon), per your
[Header → Identity](/theme/theme-settings/header) settings. The column renderer wraps it in the
shared [`.header-element` wrapper](./index.md#the-wrapper-every-element-shares).

## Example 1 — basic

```php
array(
  'element_type'      => array( 'element' => 'logo', 'logo' => array() ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

**Generated HTML** (the inner lockup comes from Identity):

```html
<div class="header-element header-element--logo">
  <!-- unysonplus_logo() — the Site Identity logo lockup (image or wordmark) -->
  <a href="https://example.com/" class="site-logo-link">…logo…</a>
</div>
```

## Example 2 — with Hide On + CSS Class

**Hide On: tablets**, **CSS Class: `brand`**.

```php
array(
  'element_type'      => array( 'element' => 'logo', 'logo' => array() ),
  'visibility'        => array( 'hide-sm' ),
  'element_css_class' => 'brand',
)
```

```html
<div class="header-element header-element--logo hide-sm brand">
  <a href="https://example.com/" class="site-logo-link">…logo…</a>
</div>
```

## Related

- [Header → Identity](/theme/theme-settings/header) — where the logo itself is configured.
- [Footer Logo](./footer-logo.md) — a separate footer-only logo with its own image + width.
- [Overview](./index.md) — the shared wrapper, Hide On, CSS Class.
