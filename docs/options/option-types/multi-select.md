---
title: "Multi-Select"
sidebar_position: 8
---

Select multiple choices from different sources. The `population` key picks the source — `posts`, `taxonomy`, `users` or a custom `array` — and `source` narrows it (post type / taxonomy / role).

## Multi-Select: Posts

<img src="/img/options/opt-demo_multi_select_posts.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
			'demo_multi_select_posts' => [
				'type' => 'multi-select',
				'label' => __( 'Multi-Select: Posts', 'unysonplus' ),
				'population' => 'posts',
				'source' => 'page',
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				),
				// — Optional attributes you can add —
				// 'value' => [],
				// 'prepopulate' => 10,
				// 'limit' => 100,
				// 'show-type' => false,
			],
];
```

## Multi-Select: Taxonomies

<img src="/img/options/opt-demo_multi_select_taxonomies.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
			'demo_multi_select_taxonomies' => [
				'type' => 'multi-select',
				'label' => __( 'Multi-Select: Taxonomies', 'unysonplus' ),
				'population' => 'taxonomy',
				'source' => 'category',
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				),
			],
];
```

## Multi-Select: Users

<img src="/img/options/opt-demo_multi_select_users.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
			'demo_multi_select_users' => [
				'type' => 'multi-select',
				'label' => __( 'Multi-Select: Users', 'unysonplus' ),
				'population' => 'users',
				'source' => 'administrator',
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				),
			],
];
```

## Multi-Select: Custom Array

<img src="/img/options/opt-demo_multi_select_array.png" alt="Option type — Theme Settings example" width="1040" />

```php
$options = [
			'demo_multi_select_array' => [
				'type' => 'multi-select',
				'label' => __( 'Multi-Select: Custom Array', 'unysonplus' ),
				'population' => 'array',
				'choices' => [
					'hello' => __( 'Hello', 'unysonplus' ),
					'world' => __( 'World', 'unysonplus' ),
				],
				'desc' => __( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					'unysonplus' ),
				'help' => sprintf( "%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
					__( 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
						'unysonplus' ),
					__( 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
						'unysonplus' )
				),
			],
];
```

## Reading the value

`multi-select` returns an **array** — read a field by key (the full shape is in *Saved value* below).

### In a shortcode

The shortcode framework passes the option values into `view.php` as `$atts`:

```php
$value = $atts['demo_multi_select_posts'];
echo esc_html( implode( ', ', (array) $value ) );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_multi_select_posts' );
echo esc_html( implode( ', ', (array) $value ) );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_multi_select_posts'];
echo esc_html( implode( ', ', (array) $value ) );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_multi_select_posts' );
echo esc_html( implode( ', ', (array) $value ) );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_multi_select_posts' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
    [0] => 12
    [1] => 45
)
```

## In Gutenberg blocks (the React control)

`multi-select` is one of the option types that also has a **React version**, so it can appear inside a Gutenberg block's sidebar.

Everything above is rendered by **PHP** — `_render()` builds the HTML and jQuery makes it interactive. That works in the page builder and on Theme Settings, which are ordinary admin pages. A block's settings sidebar is a **React app**, which draws the whole panel itself and will not accept ready-made HTML from PHP.

So the option type gets a **second renderer**. Both read the same schema — the array you write in `options.php` — and both produce the **same saved value**. The PHP path stays authoritative; the React path is additive. See [`text`](./text.md#in-gutenberg-blocks-the-react-control) for the full explanation of how the two fit together.

### What the `multi-select` control does

It wraps WordPress's [`FormTokenField`](https://developer.wordpress.org/block-editor/reference-guides/components/form-token-field/), so selections appear as removable tokens with autocomplete.

:::caution[Only population 'array' works in a block sidebar]
The `posts`, `taxonomy` and `users` populations are built server-side from a query. The React control does not make that round trip — instead of rendering an empty picker that looks like "there is nothing to choose", it shows a short notice and points you at the page builder, where the option remains fully editable.
:::

:::note[Wire format vs stored value]
The stored value is an **array of keys**, but `_get_value_from_input()` calls `explode()` on the submitted value — so what is *submitted* is a delimited **string**. Passing a real array raises a TypeError on PHP 8 rather than degrading gracefully, which is why the control joins the keys before saving.
:::
