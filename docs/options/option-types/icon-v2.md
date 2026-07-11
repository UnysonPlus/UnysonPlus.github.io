---
title: "Icon v2"
sidebar_position: 18
---

<img src="/img/options/opt-icon-v2.png" alt="icon-v2 option type — Theme Settings example" width="1040" />

```php
$options = [
	'demo_icon_v2' => [
		'type' => 'icon-v2',

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
	],
];
```

Default value is not really supported, because of the complexity of the data that this option type holds.

The second version of the first Icon option type. It was improved a lot in terms of both UI and extensibility. The user will be able to filter through a list of icon packs and also upload his own icon. The result value will contain `type` field and it will contain the type of the selected content. It can be `icon-font` or `custom-upload`. You'll also get favorite icon functionallity which will work out of the box.

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
By default, none of this packs will be enqueued in the frontend of your theme.

You should call this in order to enqueue them: `fw()->backend->option_type('icon-v2')->packs_loader->enqueue_frontend_css();`
:::

**Configure Icon Packs**

**Icon V2** is easily extensible with a couple of filters you can hook into. First, you may want to configure which of the *already* registered packs we should display into the picker.

```php
function _custom_packs_list($current_packs) {
    /**
     * $current_packs is an array of pack names.
     * You should return which one you would like to show in the picker.
     */
    return array('font-awesome', 'unycon');
}

add_filter('fw:option_type:icon-v2:filter_packs', '_custom_packs_list');
```

:::note
That's a global hook which changes behavior for **all** pickers. Configuring packs per picker is not available and will **not** be implemented later. If you have some particular use case for this, please fill an issue.
:::

**Add Icon Pack**

Long story short, you can add more packs by filtering on `fw:option_type:icon-v2:packs` filter. Simplest example, all of the keys are required:

```php
add_filter('fw:option_type:icon-v2:packs', '_add_my_pack');

function _add_my_pack($default_packs) {
    /**
     * No fear. Defaults packs will be merged in back. You can't remove them.
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

And this will just work for most of the cases. You don't need to specify which icons specifically to show inside the picker. All of them will be showed, by default. In fact, there's some magick going on that will extract all of your icons and show them up. I'll try to make it clear below.

**Computing icons list**

By default, when you register an icon pack it's icons will be extracted from the css file automatically, so that you don't have to maintain a long array of icons for each pack. Instead we do some trick instead. We look into the css file for each pack and look for patterns that look like this:

```php
.`css_class_prefix`-some-icon:before {
    content: '\266a';
}
```

`css_class_prefix` there refers to the `css_class_prefix` option you specified for your icon pack.

```css
// Those will be considered an icon
.my-pack-some-icon:before { content: '\266a'; }
.my-pack.my-pack-some-icon:before { content: '\266a'; }
.my-pack.my-pack-some-icon:after { content: '\266a'; }

// This one won't
.my-pack.my-pack-some-icon:after { color: red; }
```

Generally speaking, that's what an icon pack CSS file consist of:

- `@font-face` rules
- icon generations -- we try hard to get just them
- some other general purpose helpers -- they're encountered not that often

You can also completely stop this mechanism for one pack by specifying an array of icons for the `icons` option. A more complete pack definition can be found here.

## Saved value

The `fw_print()` output of what `fw_get_db_settings_option( 'demo_icon_v2' )` returns — so you can see the shape of this option type's stored value:

```text
Array
(
    [type] => 'icon-font'
    [icon-class] => 'fa fa-star'
    [icon-class-without-root] => 'fa-star'
    [pack-name] => 'font-awesome'
    [pack-css-uri] => 'http://localhost/testsite/wp-content/plugins/unysonplus/framework/static/libs/font-awesome/css/font-awesome.min.css'
)
```
