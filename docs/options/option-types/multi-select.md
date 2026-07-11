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
$value = $atts['demo_multi_select_posts_2'];
echo esc_html( implode( ', ', (array) $value ) );
```

### In a page template — a per-page option

Options defined on a post/page (a metabox) are read with `fw_get_db_post_option()`:

```php
$value = fw_get_db_post_option( get_the_ID(), 'demo_multi_select_posts_2' );
echo esc_html( implode( ', ', (array) $value ) );
```

When the field is one of several inside a **box/group**, read the whole group once and pick fields by key — the common CPT pattern (e.g. a `review` or `book` box):

```php
$book  = fw_get_db_post_option( get_the_ID(), 'book' );
$value = $book['demo_multi_select_posts_2'];
echo esc_html( implode( ', ', (array) $value ) );
```

### In Theme Settings — a global option

Global options are read with `fw_get_db_settings_option()`:

```php
$value = fw_get_db_settings_option( 'demo_multi_select_posts_2' );
echo esc_html( implode( ', ', (array) $value ) );
```

## Saved value

`fw_print( fw_get_db_settings_option( 'demo_multi_select_posts_2' ) )` outputs — the shape of this option type's stored value:

```text
Array
(
)
```
