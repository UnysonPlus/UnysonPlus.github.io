<?php
/**
 * The Book post type and the Genre taxonomy.
 *
 * `show_in_rest` is what makes them appear in the REST API at
 * /wp-json/wp/v2/book and /wp-json/wp/v2/genre.
 */

if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

add_action( 'init', 'headless_books_register_types' );

function headless_books_register_types() {
	register_post_type( 'book', array(
		'labels'       => array(
			'name'          => __( 'Books', 'headless-books' ),
			'singular_name' => __( 'Book', 'headless-books' ),
		),
		'public'       => true,
		'has_archive'  => true,
		'rewrite'      => array( 'slug' => 'books' ),
		'menu_icon'    => 'dashicons-book',
		'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail' ),
		'show_in_rest' => true,
	) );

	register_taxonomy( 'genre', 'book', array(
		'labels'       => array(
			'name'          => __( 'Genres', 'headless-books' ),
			'singular_name' => __( 'Genre', 'headless-books' ),
		),
		'hierarchical' => true,
		'show_in_rest' => true,
	) );
}
