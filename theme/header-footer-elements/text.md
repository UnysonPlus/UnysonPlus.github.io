---
title: Text
sidebar_position: 9
slug: /header-footer-elements/text
description: The Unyson+ header/footer Text element — a rich-text block that supports the current-year token; coding, generated HTML, and Hide On / CSS Class examples.
---

# Text

A **rich-text block** for a header bar or footer column (a tagline, a copyright line, a short note). It
runs through the WordPress editor, so it supports formatting, links, and shortcodes, and it resolves
the **`{{current_year}}`** token — ideal for a self-updating copyright. Available in Header and Footer.

## Where the code lives

| | |
| --- | --- |
| **Type key** | `text` |
| **Fields** | `text_content` ([wp-editor](/docs/options/option-types/wp-editor)) |
| **Rendered by** | `unysonplus_render_text_element()` (`inc/includes/footer-builder.php`) |

## How it works

The content is token-resolved (`{{current_year}}` becomes the current year), passed through
`wp_kses_post()`, `wpautop()`, and `do_shortcode()`, then wrapped:

```html
<div class="builder-text-element">…the editor content…</div>
```

## Example 1 — basic

**Settings:** Content set to a copyright line with the year token.

```php
array(
  'element_type'      => array( 'element' => 'text', 'text' => array( 'text_content' => '© {{current_year}} Acme Inc.' ) ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

```html
<div class="builder-text-element"><p>© 2026 Acme Inc.</p></div>
```

Text is a [self-wrapped](./index.md) element — a **single** `<div class="builder-text-element">` with no
extra wrapper `<div>` (clean DOM).

## Example 2 — with Hide On + CSS Class

**Hide On: phones**, **CSS Class: `copyright`**. The visibility + custom classes ride on that same div,
and `footer-element` is added so the `.footer-element.hide-xs` rule matches:

```php
array(
  'element_type'      => array( 'element' => 'text', 'text' => array( 'text_content' => '© {{current_year}} Acme Inc.' ) ),
  'visibility'        => array( 'hide-xs' ),
  'element_css_class' => 'copyright',
)
```

```html
<div class="builder-text-element footer-element hide-xs copyright"><p>© 2026 Acme Inc.</p></div>
```

## Related

- [Custom HTML](./custom-html.md) — a plain-HTML alternative (no editor). · [Overview](./index.md)
