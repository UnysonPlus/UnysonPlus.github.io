---
title: CTA Button
sidebar_position: 5
slug: /header-footer-elements/cta-button
description: The Unyson+ header/footer CTA Button element — how it's coded, the button-preset HTML it generates, with a basic example and one using Hide On + CSS Class.
---

# CTA Button

A call-to-action **button** for a header bar or footer column — text + link, styled with your Theme
Settings button presets. Available in both the **Header** and **Footer** builders.

## Where the code lives

| | |
| --- | --- |
| **Type key** | `cta_button` |
| **Fields defined in** | `inc/includes/header-footer-option-helpers.php` |
| **Rendered by** | `unysonplus_render_cta_button()` in `inc/includes/header-builder.php` |

## Fields (`element_type[cta_button]`)

| Field | Type | Default | What it does |
| --- | --- | --- | --- |
| `cta_text` | text | `Get Started` | The button label |
| `cta_link` | text | `#` | The href |
| `cta_style` | [button-style-picker](/options/option-types/button-style-picker) | `primary` | A [Button preset](/theme/components/buttons) → `btn-{preset}` |
| `cta_size` | select | — | A button size → `btn-{size}` |

## How it works

The renderer reads the label and link, then builds the class list from your button presets via
`unysonplus_cta_button_classes()` — **no inline styles**, so the button inherits the exact skin from
**Theme Settings → Components → [Buttons](/theme/components/buttons)**:

```php
$classes = unysonplus_cta_button_classes( $settings ); // "btn btn-{preset} btn-{size}"
echo '<a href="' . esc_url( $link ) . '" class="' . esc_attr( $classes ) . '">' . esc_html( $text ) . '</a>';
```

So the element's own output is a single anchor:

```html
<a href="{link}" class="btn btn-{preset} btn-{size}">{text}</a>
```

…which the column renderer wraps in the shared
[`.header-element` wrapper](./index.md#the-wrapper-every-element-shares).

## Example 1 — basic

**Settings:** Text `Get Started`, Link `/contact`, Style `Primary`, Size `Large`.

```php
array(
  'element_type' => array(
    'element'    => 'cta_button',
    'cta_button' => array(
      'cta_text'  => 'Get Started',
      'cta_link'  => '/contact',
      'cta_style' => 'primary',
      'cta_size'  => 'lg',
    ),
  ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

**Generated HTML:**

```html
<div class="header-element header-element--cta_button">
  <a href="/contact" class="btn btn-primary btn-lg">Get Started</a>
</div>
```

## Example 2 — with Hide On + CSS Class

Same button, but **Hide On: phones** and **CSS Class: `nav-cta`**.

```php
array(
  'element_type' => array(
    'element'    => 'cta_button',
    'cta_button' => array(
      'cta_text'  => 'Get Started',
      'cta_link'  => '/contact',
      'cta_style' => 'primary',
      'cta_size'  => 'lg',
    ),
  ),
  'visibility'        => array( 'hide-xs' ), // Hide on phones
  'element_css_class' => 'nav-cta',          // CSS Class
)
```

**Generated HTML** — the two controls land on the wrapper (`hide-xs` from Hide On, `nav-cta` from CSS
Class); the inner anchor is unchanged:

```html
<div class="header-element header-element--cta_button hide-xs nav-cta">
  <a href="/contact" class="btn btn-primary btn-lg">Get Started</a>
</div>
```

Now `.nav-cta { … }` in Custom CSS targets exactly this button, and it's hidden on phones.

## Related

- [Buttons (Components)](/theme/components/buttons) — the presets that skin it.
- [Header & Footer Elements overview](./index.md) — the shared wrapper, Hide On, and CSS Class.
