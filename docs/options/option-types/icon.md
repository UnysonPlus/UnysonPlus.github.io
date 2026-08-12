---
title: "Icon"
sidebar_position: 18
slug: /options/option-types/icon
description: The Unyson+ icon option type — a picker for a Font-Awesome / pack glyph, an uploaded image, an emoji, or an SVG. Stores a typed array value.
---

<img src="/img/options/opt-icon-v2.png" alt="icon option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_icon' => [
		'type' => 'icon',

		/**
		 * small | medium | large | sauron
		 * Yes, sauron. Definitely try it. Great one.
		 */
		'preview_size' => 'medium',

		/**
		 * small | medium | large
		 */
		'modal_size' => 'medium',

		/**
		 * There's no point in configuring value from code here.
		 *
		 * I'll document the result you get in the frontend here:
		 * 'value' => [
		 *   'type' => 'icon-font', // icon-font | custom-upload
		 *
		 *   // ONLY IF icon-font
		 *   'icon-class' => '',
		 *   'icon-class-without-root' => false,
		 *   'pack-name' => false,
		 *   'pack-css-uri' => false
		 *
		 *   // ONLY IF custom-upload
		 *   // 'attachment-id' => false,
		 *   // 'url' => false
		 * ],
		 */

		'attr' => [ 'class' => 'custom-class', 'data-foo' => 'bar' ],
		'label' => __('Label', 'unysonplus'),  // or false to hide the label column
		'desc' => __('Description', 'unysonplus'),
		'help' => __('Help tip', 'unysonplus'),  // string, or [ 'icon' => 'video', 'html' => '…' ]
		// — Optional attributes you can add —
		// 'popup_size' => 'medium',
	],
];
```

The **icon picker**: the modal chooses a **Font-Awesome / pack glyph**, an **uploaded image**, an
**emoji**, or an **SVG**. The user can filter through a list of icon packs, upload their own icon, and
mark favorites (which works out of the box). The result value contains a `type` field naming the
selected content — `icon-font` or `custom-upload`.

Default value is not really supported, because of the complexity of the data that this option type
holds.

:::note[Formerly `icon-v2` / `icon-v3`]
This is the one, consolidated icon option type. The old `icon-v2` and `icon-v3` type ids are
**retired** — declare `'type' => 'icon'`. (Using `icon-v2` / `icon-v3` now resolves to an undefined
type: graceful, not fatal.) A **legacy bare Font-Awesome string** value (e.g. `fa fa-star`) is still
accepted and bridged, so old saved values keep rendering.
:::

:::note
You'll have to enable <span class="title-ref">SVG</span> uploads by yourself, with a hook in your theme.
:::

By default, we have just 6 icon packs enabled and served with Unyson+ itself.

- [Font Awesome](https://github.com/FortAwesome/Font-Awesome)
- [Entypo](http://www.entypo.com)
- [Linecons](http://designmodo.com/linecons-free/)
- [Linearicons](https://linearicons.com/)
- [Typicons](http://typicons.com/)
- Unycons

:::note
By default, none of these packs will be enqueued in the frontend of your theme.

Enqueue them with: `fw()->backend->option_type('icon')->packs_loader->enqueue_frontend_css();`
:::

**Configure Icon Packs**

The icon picker is easily extensible with a couple of filters you can hook into. First, you may want
to configure which of the *already* registered packs the picker should display:

```php
function _custom_packs_list($current_packs) {
    /**
     * $current_packs is an array of pack names.
     * You should return which one you would like to show in the picker.
     */
    return array('font-awesome', 'unycon');
}

add_filter('fw:option_type:icon-v3:filter_packs', '_custom_packs_list');
```

:::note
That's a global hook which changes behavior for **all** pickers. Configuring packs per picker is not
available and will **not** be implemented later. If you have some particular use case for this, please
file an issue.
:::

**Add Icon Pack**

Long story short, you can add more packs by filtering on the `fw:option_type:icon-v3:packs` filter.
Simplest example, all of the keys are required:

```php
add_filter('fw:option_type:icon-v3:packs', '_add_my_pack');

function _add_my_pack($default_packs) {
    /**
     * No fear. Default packs will be merged in back. You can't remove them.
     * Changing some flags for them is allowed.
     */
    return array(
      'my_pack' => array(
        'name' => 'my_pack', // same as key
        'title' => 'My Cool Pack',
        'css_class_prefix' => 'my-pack',
        'css_file' => 'path_to_css_file',
        'css_file_uri' => 'network_accessible_url'
      )
    )
}
```

:::note[Pack hooks keep the `icon-v3` tag]
The type id is `icon`, but the pack-extension filters retain the internal `icon-v3` lineage name (the
packs loader is shared, unchanged). Use `fw:option_type:icon-v3:packs` / `:filter_packs` for pack
customization.
:::

And this will just work for most cases. You don't need to specify which icons specifically to show
inside the picker — all of them are shown by default. When you register an icon pack, its icons are
extracted from the CSS file automatically, so you don't have to maintain a long list per pack. The
extractor scans the pack's CSS for `content:` rules under the pack's `css_class_prefix`:

```css
// Those will be considered an icon
.my-pack-some-icon:before { content: '\266a'; }
.my-pack.my-pack-some-icon:before { content: '\266a'; }

// This one won't
.my-pack.my-pack-some-icon:after { color: red; }
```

You can stop this automatic extraction for one pack by specifying an array of icons for the `icons`
option in the pack definition.

## Reading the value

`icon` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_icon'];
echo '<i class="' . esc_attr( $value['icon-class'] ) . '"></i>';
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_icon' );
echo '<i class="' . esc_attr( $value['icon-class'] ) . '"></i>';
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by
key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_icon'];
echo '<i class="' . esc_attr( $value['icon-class'] ) . '"></i>';
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_icon' );
echo '<i class="' . esc_attr( $value['icon-class'] ) . '"></i>';
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_icon' ) )` outputs — the shape of this option type's
stored value:

```text
Array
(
    [type] => icon-font
    [icon-class] => fas fa-star
    [icon-class-without-root] => fa-star
    [pack-name] => font-awesome
    [pack-css-uri] => 
)
```
