---
title: "Mega Menu"
---


The Mega Menu extension gives the end-user the ability to construct advanced navigation menus.

:::info
Mega Menu is listed in the Unyson+ **Extensions** manager by default — just activate it there
(*Unyson+ → Extensions → Mega Menu → Activate*). No theme-manifest opt-in or `WP_DEBUG` is needed.
:::

## Overview

When it is turned on, it enriches menu with the following:

1.  Ability to set an icon for any menu item
2.  Ability to group several menu items into columns placed in rows

## HTML/CSS

The extension adds the following css classes:

- `.menu-item-has-icon`
- `.menu-item-has-mega-menu`
- `.sub-menu-has-icons`
- `.mega-menu`
- `.mega-menu-row`
- `.mega-menu-col`

The markup will be the following:

```text
li.menu-item-has-mega-menu
    div.mega-menu
        ul.mega-menu-row
            li.mega-menu-col
            li.mega-menu-col
            li.mega-menu-col
        ul.mega-menu-row
            li.mega-menu-col
            li.mega-menu-col
            li.mega-menu-col
```

:::note
All other standard WordPress classes and HTML remains the same.
:::

It also emits accessibility attributes that link a trigger to its panel (the WAI-ARIA
disclosure pattern):

- the trigger `<a>` gets `aria-haspopup="true"`, `aria-expanded` (kept in sync as the
  panel opens and closes), and `aria-controls` pointing at its panel;
- the panel `<div class="mega-menu">` gets a matching `id="mega-menu-panel-{item-id}"`,
  `role="region"`, and an `aria-label` derived from the trigger's text.

## Markup Example

```html
<ul>
    <li class="menu-item-has-mega-menu menu-item-has-icon">
        <a class="fa fa-exclamation" href="#" aria-haspopup="true" aria-expanded="false" aria-controls="mega-menu-panel-42">Mega Menu 1</a>
        <div id="mega-menu-panel-42" class="mega-menu" role="region" aria-label="Mega Menu 1">
            <ul class="sub-menu mega-menu-row">
                <li class="mega-menu-col">
                    <a href="#">Just Links</a>
                    <ul class="sub-menu">
                        <li>
                            <a href="#">Menu Item 1</a>
                        </li>
                        ...
                    </ul>
                </li>
                <li class="mega-menu-col">
                    <a href="#">Links with Icons</a>
                    <ul class="sub-menu sub-menu-has-icons">
                        <li class="menu-item-has-icon">
                            <a class="fa fa-inbox" href="#">Menu Item 1</a>
                            <p>Praesent quis enim euismod, fringilla quam vitae, consectetur quam.</p>
                        </li>
                        <li class="menu-item-has-icon">
                            <a class="fa fa-wrench" href="#">Menu Item 2</a>
                        </li>
                        ...
                    </ul>
                </li>
            </ul>
        </div>
    </li>
    <li class="menu-item-has-icon">
        <a class="fa fa-info-circle" href="#">Home</a>
        <ul class="sub-menu sub-menu-has-icons">
            <li class="menu-item-has-icon">
                <a class="fa fa-info-circle" href="#">Page 2</a>
            </li>
            <li class="menu-item-has-icon">
                <a class="fa fa-info-circle" href="#">Page 3</a>
                <ul class="sub-menu sub-menu-has-icons">
                    <li class="menu-item-has-icon">
                        <a class="fa fa-key" href="#">Page 4</a>
                    </li>
                    <li class="menu-item-has-icon">
                        <a class="fa fa-briefcase" href="#">Page 5</a>
                    </li>
                    <li class="menu-item-has-icon">
                        <a class="fa fa-gavel" href="#">Page 6</a>
                        <ul class="sub-menu sub-menu-has-icons">
                            <li class="menu-item-has-icon">
                                <a class="fa fa-globe" href="#">Page 7</a>
                            </li>
                            <li>
                                <a href="#">Page 8</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</ul>
```

## Accessibility

The extension follows the WAI-ARIA **disclosure** pattern for a top-level trigger and its panel:

- The trigger link is given `aria-haspopup="true"`, `aria-expanded` (kept in sync as the panel
  opens/closes), and `aria-controls` referencing its panel.
- The panel container is given a matching `id="mega-menu-panel-{item-id}"`, `role="region"`, and an
  `aria-label` derived from the trigger's text, so screen readers announce what the trigger expands.
- <kbd>Escape</kbd> closes an open panel and returns focus to its trigger.
- Motion respects the visitor's `prefers-reduced-motion` setting.

Each menu item that uses the **Item Image** thumbnail also has an **Image Alt Text** field. Leave it
empty for a purely decorative image (the link text already conveys the destination); fill it in when
the image carries information a screen-reader user needs.

## Content columns

A column can hold more than sub-menu links. Set **Settings → Column Content** on a column (add it
with no child menu items) to one of:

- **Image** — an image, optionally linked.
- **Rich content** — HTML + shortcodes.
- **Call to action** — an eyebrow, heading, text, an optional image, and a button (external links open
  in a new tab). Renders as `.mega-menu-content--cta` with `.mm-cta-eyebrow` / `.mm-cta-heading` /
  `.mm-cta-text` / `.mm-cta-img` / `.mm-cta-btn`.
- **Recent posts (dynamic)** — a live list of the most recent entries of any public post type, with a
  count, an order (newest / title / random / menu order) and an optional thumbnail. Renders as
  `.mega-menu-content--posts` → `ul.mm-posts > li.mm-post`. (Set the post type to *Products* for a
  live WooCommerce product list.)
- **WooCommerce cart** — the WooCommerce mini-cart. Renders nothing when WooCommerce is inactive.
  Wrapper `.mega-menu-content--woocart`.
- **Widget area** — output a registered sidebar.
- **Raw HTML** — output exactly as entered (trusted markup only).

## Tabbed panels

Set **Settings → Panel Layout = Tabs** on a mega item to turn its columns into tabs: each column's
**title becomes the tab label** and its content becomes the tab panel (one shown at a time, switched on
hover / focus / click). The panel gets the `.mega-menu--tabs` class and a `ul.mm-tab-rail` is built from
the column titles. Tabs are a desktop layout — inside a host theme's mobile drawer the columns stack
normally.

All content-column wrappers share the `.mega-menu-content` base class, so a theme can restyle them via
its `--mm-*` tokens.

## Per-device visibility

Every item type — a whole mega item, a column, or a single link — has a **Settings → Hide On** control.
Selecting *Desktop*, *Tablet*, or *Mobile* adds a class to the menu item that the baseline CSS hides at
the matching screen size:

| Class | Hidden at |
| --- | --- |
| `mm-hide-mobile` | `< 768px` |
| `mm-hide-tablet` | `768 – 991px` |
| `mm-hide-desktop` | `>= 992px` |

## Import / export a layout

On an **enabled top-level mega item** in the menu editor (Appearance → Menus), two controls appear next
to its **Settings** button:

- **Export layout** — downloads a JSON file containing the item's row options plus the full tree of its
  columns and items (titles, links, and every mega option).
- **Import layout** — uploads a previously exported JSON and **re-creates** those columns and items
  beneath the current item, applying all their options. Use it to duplicate a configured panel onto
  another menu item, or to move a layout between sites.

Programmatic equivalents are available for scripts / migrations:

```php
$json = wp_json_encode( fw_ext_mega_menu_export_layout( $top_item_id ) );
$created = fw_ext_mega_menu_import_layout( json_decode( $json, true ), $target_item_id );
```

## Performance — conditional loading

The front-end CSS/JS load **only when a mega menu is actually present on the page**. The extension
scans the menus assigned to your theme's nav-menu **locations** for an enabled mega item; if none is
found, the assets are skipped. Menus rendered another way — a raw `wp_nav_menu()` call with an explicit
`menu` argument, or a nav-menu **widget** — are caught by a late fallback so their assets still load.

Force the behavior with the `fw:ext:megamenu:force-enqueue` filter:

```php
// Always load the mega-menu assets (e.g. a menu placed in a way the location scan can't see):
add_filter('fw:ext:megamenu:force-enqueue', '__return_true');

// Never load them:
add_filter('fw:ext:megamenu:force-enqueue', '__return_false');
```

## Filters

| Filter | Purpose |
| --- | --- |
| `fw:ext:megamenu:force-enqueue` | `true` / `false` to force the front-end assets on or off. Default: auto-detect (see above). |
| `fw:ext:megamenu:enqueue-frontend-css` | Opt out of the baseline front-end CSS/JS + behavior config. |
| `fw:ext:megamenu:enqueue-icon-css` | Opt out of the icon-font CSS. |
| `fw:ext:megamenu:frontend-config` | The behavior config localized to the script — `openOn` (`hover` / `click`), `drawerId`, `hoverIntent` / `openDelay` / `closeDelay`, and `i18n`. |
| `fw:ext:megamenu:drawer-id` | Element id of the host theme's off-canvas nav drawer. Default `primary-navigation-drawer`. When that element is present the theme owns the mobile submenu behavior and the extension does not add its own toggle. |
| `fw:ext:megamenu:label:item-options-btn` | Label of the admin **Settings** button. |
| `fw_ext_mega_menu_container` | The panel container tag + attributes, before it is rendered. |

### Open on hover or click

```php
add_filter('fw:ext:megamenu:frontend-config', function ($cfg) {
    $cfg['openOn'] = 'click'; // default: 'hover'
    return $cfg;
});
```

### Hover intent

In hover mode the panel opens only after a brief, deliberate hover and stays open through a short exit
grace — so a quick pass across the menu bar doesn't flash panels open, and briefly leaving the panel
doesn't snap it shut. It's **on by default**; tune or disable it:

```php
add_filter('fw:ext:megamenu:frontend-config', function ($cfg) {
    $cfg['hoverIntent'] = false; // restore instant-hover open
    // or tune the timing (ms):
    // $cfg['openDelay']  = 100;
    // $cfg['closeDelay'] = 250;
    return $cfg;
});
```

### Point the extension at a custom mobile drawer

If your theme's off-canvas drawer uses a different element id, tell the extension so it doesn't add a
duplicate mobile toggle:

```php
add_filter('fw:ext:megamenu:drawer-id', function () {
    return 'my-theme-mobile-drawer';
});
```

## Change Item/Icon Markup

By default the icon is added to

```php
<a href="..." class="fa fa-...">Menu item</a>
```

If you want to change it to

```php
<a href="..."><i class="fa fa-..."></i> Menu item</a>
```

overwrite [this view](https://github.com/UnysonPlus/UnysonPlus-MegaMenu-Extension/blob/master/views/item-link.php) in your theme

```php
<?php if (!defined('FW')) die('Forbidden');

// file: {theme}/framework-customizations/extensions/megamenu/views/item-link.php

/**
 * @var WP_Post $item
 * @var string $title
 * @var array $attributes
 * @var object $args
 * @var int $depth
 */

{
    $icon_html = '';

    if (
        fw()->extensions->get('megamenu')->show_icon()
        &&
        ($icon = fw_ext_mega_menu_get_meta($item, 'icon'))
    ) {
        $icon_html = '<i class="'. $icon .'"></i> ';
    }
}

// Make a menu WordPress way
echo $args->before;
echo fw_html_tag('a', $attributes, $args->link_before . $icon_html . $title . $args->link_after);
echo $args->after;
```

## Overwrite the Walker

1.  Create the walker class

```php
// file:: {theme}/framework-customizations/extensions/megamenu/includes/class-fw-ext-mega-menu-custom-walker.php

class FW_Ext_Mega_Menu_Custom_Walker extends FW_Ext_Mega_Menu_Walker
 {
     function start_lvl( &$output, $depth = 0, $args = array(), $class = 'sub-menu' ) {
         fw_print('Hello');

         return parent::start_lvl($output, $depth, $args, $class);
     }

     // other customizations ...
 }
```

2.  Overwrite the default walker via filter

```php
// file: {theme}/framework-customizations/extensions/megamenu/hooks.php

// replace default walker
{
    remove_filter('wp_nav_menu_args', '_filter_fw_ext_mega_menu_wp_nav_menu_args');

    /** @internal */
    function _filter_theme_ext_mega_menu_wp_nav_menu_args($args) {
        $args['walker'] = new FW_Ext_Mega_Menu_Custom_Walker();

        return $args;
    }
    add_filter('wp_nav_menu_args', '_filter_theme_ext_mega_menu_wp_nav_menu_args');
}
```

## Item Custom Options

1.  Overwrite these [options](https://github.com/UnysonPlus/UnysonPlus-MegaMenu-Extension/tree/master/options) in your theme.

2.  Get the saved db value (it has the same structure as `multi-picker` option-type value)

    > ``` php
    > if ($item_type = fw_ext_mega_menu_get_db_item_option($item_id, 'type')) {
    >     $values    = fw_ext_mega_menu_get_db_item_option($item_id, $item_type);
    > }
    > ```

3.  Adapt options popup sizes by overwriting these config keys.
