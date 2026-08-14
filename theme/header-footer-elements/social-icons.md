---
title: Social Icons
sidebar_position: 8
slug: /header-footer-elements/social-icons
description: The Unyson+ header/footer Social Icons element — a row of social links pulled from the Social tab; coding, generated HTML, and Hide On / CSS Class examples.
---

# Social Icons

A row of **social-profile links**, pulled live from **Theme Settings → Social** (`social_profiles`).
It has **no fields of its own** — the profiles and the global icon style are configured on the Social
tab, so every Social Icons instance stays in sync. Available in Header and Footer.

## Where the code lives

| | |
| --- | --- |
| **Type key** | `social_icons` |
| **Fields** | none (pulls `social_profiles` + `social_style` from Theme Settings → Social) |
| **Rendered by** | `unysonplus_render_social_icons()` in `inc/includes/header-builder.php` |

## How it works

For each profile it emits an `<a class="header-social-icon">` (opening in a new tab unless disabled),
with the profile's picked icon or a **name-matched Font Awesome brand glyph** fallback (so a profile
named "Facebook" / "Instagram" / "X" shows the right icon out of the box). The wrapping `<div>` carries
the global style classes from the Social tab — shape (`social-style-{shape}`), hover FX
(`social-fx-{fx}`), and optional brand colors (`social-brand`):

```html
<div class="header-social-icons social-icons social-style-{shape}">
  <a href="{url}" class="header-social-icon" target="_blank" rel="noopener noreferrer" aria-label="{name}" title="{name}">
    <i class="fab fa-{brand}" aria-hidden="true"></i>
  </a>
</div>
```

## Example 1 — basic

Two profiles configured on the Social tab (Facebook, Instagram), default style.

```php
array(
  'element_type'      => array( 'element' => 'social_icons', 'social_icons' => array() ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

```html
<div class="header-element header-element--social_icons">
  <div class="header-social-icons social-icons social-style-bare">
    <a href="https://facebook.com/acme" class="header-social-icon" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
    <a href="https://instagram.com/acme" class="header-social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
  </div>
</div>
```

## Example 2 — with Hide On + CSS Class

**Hide On: phones**, **CSS Class: `top-social`**.

```php
array(
  'element_type'      => array( 'element' => 'social_icons', 'social_icons' => array() ),
  'visibility'        => array( 'hide-xs' ),
  'element_css_class' => 'top-social',
)
```

```html
<div class="header-element header-element--social_icons hide-xs top-social">
  <div class="header-social-icons social-icons social-style-bare">…</div>
</div>
```

## Related

- Theme Settings → **Social** — where the profiles + icon style live.
- [Overview](./index.md) — the shared wrapper, Hide On, CSS Class.
