---
title: Header & Footer Elements
sidebar_position: 1
slug: /header-footer-elements
description: The Unyson+ Theme Settings header/footer element types — logo, menu, CTA button, text, search, social icons, spacer and more — how they're stored, rendered, and the shared Hide On / CSS Class controls.
---

# Header & Footer Elements

When you build a header bar or a footer column in **Theme Settings → Header / Footer**, you fill it
with **elements** — a logo, a menu, a CTA button, a line of text, a search box, social icons, and so
on. This section documents each element type in full: what it is, **where its code lives**, how it
works, its fields, and the **exact HTML it generates**.

:::note[Not the page-builder header/footer shortcodes]
These are the theme's **Theme Settings** header/footer builder elements, rendered by the theme.
They're different from the page-builder [Header / Footer Elements](/docs/shortcodes/header-footer-elements)
(shortcodes you drop on the canvas). This section is the Theme Settings set.
:::

## Where the code lives

| Concern | File |
| --- | --- |
| **Option definitions** (the fields per element type) | `unysonplus-theme/inc/includes/header-footer-option-helpers.php` |
| **Header render** | `unysonplus-theme/inc/includes/header-builder.php` |
| **Footer render** | `unysonplus-theme/inc/includes/footer-builder.php` |

Header elements are dispatched by `unysonplus_render_header_element()` (a `switch` on the element
type) and wrapped by `unysonplus_render_header_column()`; the footer mirrors this with
`unysonplus_render_footer_element()` / `unysonplus_render_footer_column()`.

## How an element is stored

Every element row has the same envelope, regardless of type:

```php
array(
  'element_type'      => array(
     'element' => 'cta_button',          // the chosen type
     'cta_button' => array( /* the type's own fields */ ),
  ),
  'visibility'        => array( 'hide-sm', 'hide-md' ), // the "Hide On" checkboxes
  'element_css_class' => 'my-utility',                  // the "CSS Class" field
)
```

- `element_type.element` picks the type; `element_type[<type>]` holds that type's fields.
- **`visibility`** is the **Hide On** control (per-device checkboxes).
- **`element_css_class`** is the **CSS Class** field.

## The wrapper elements share {#the-wrapper-every-element-shares}

Most elements are wrapped in a `<div>` that applies the two shared controls:

```html
<div class="header-element header-element--{type} {hide classes} {your css classes}">
  … the element's own output …
</div>
```

(Footer elements use `footer-element footer-element--{type}` instead.)

:::note Clean DOM — self-wrapped elements
To keep the markup lean, **Heading**, **Text**, and **List Item** elements skip the extra wrapper `<div>`
altogether — their own tag (the `<h4>`, the text `<div>`, or the list `<li>`) carries the shared classes
directly. Those classes are added **only when a control is actually used**: with no *Hide On* and no *CSS
Class*, the tag stays clean, e.g.

```html
<h4 class="footer-links-title hf-heading">Quick Links</h4>
<ul class="footer-links footer-links-list">
  <li><a class="footer-link hf-link list-item" href="/services"><span class="list-item__text">Services</span></a></li>
</ul>
```

When you *do* set a control, the base `footer-element`/`header-element` class is added alongside the
`hide-*` class — because visibility is applied via `.footer-element.hide-xs { display: none }` — e.g.
`<h4 class="footer-links-title hf-heading footer-element hide-xs">`.
:::

### Hide On → responsive `hide-*` classes

The **Hide On** checkboxes map through `unysonplus_element_visibility_classes()` to the theme's
responsive utilities, added to the element (its wrapper, or its own tag for the self-wrapped elements
above):

| Checkbox | Class | Hides on |
| --- | --- | --- |
| Hide on phones | `hide-xs` | small screens |
| Hide on tablets | `hide-sm` | medium screens |
| Hide on desktop | `hide-md` | large screens |

### CSS Class → sanitized wrapper classes

The **CSS Class** field (`element_css_class`) is split on whitespace, each token run through
`sanitize_html_class()`, and appended to the element (the wrapper, or its own tag for self-wrapped
elements) — so you can safely target one element instance from Custom CSS (e.g. `.my-utility { … }`).

## The elements

**Header:** [Logo](./logo.md) · [Menu](./menu.md) · [Menu Area](./menu-area.md) ·
[CTA Button](./cta-button.md) · [List Item](./list-item.md) · [Search](./search.md) ·
[Social Icons](./social-icons.md) · [Text](./text.md) · [Custom HTML](./custom-html.md) ·
[Widget Area](./widget-area.md) · [Builder Section](./builder-section.md) · [Spacer](./spacer.md) ·
[Divider](./divider.md)

**Footer:** the same set, plus [Footer Logo](./footer-logo.md) and [Back to Top](./back-to-top.md)
(and without Menu Area / Spacer / Divider).
