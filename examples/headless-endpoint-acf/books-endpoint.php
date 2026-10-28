<?php
/**
 * Plugin Name: Books Endpoint
 * Description: A custom REST endpoint for the Book post type (CPT UI) and its ACF fields: /wp-json/books/v1/books.
 * Version:     1.0.0
 * Requires Plugins: advanced-custom-fields
 *
 * One request returns everything a book page needs, in the shape the front end
 * wants: genre names instead of IDs, the cover with its size and alt text, and
 * no WordPress-specific wrappers such as title.rendered.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'rest_api_init', 'books_endpoint_register' );

function books_endpoint_register() {
	register_rest_route( 'books/v1', '/books', array(
		'methods'             => 'GET',
		'callback'            => 'books_endpoint_list',
		'permission_callback' => '__return_true', // public, read-only
	) );

	register_rest_route( 'books/v1', '/books/(?P<slug>[a-z0-9-]+)', array(
		'methods'             => 'GET',
		'callback'            => 'books_endpoint_single',
		'permission_callback' => '__return_true',
	) );
}

function books_endpoint_list() {
	$posts = get_posts( array( 'post_type' => 'book', 'post_status' => 'publish', 'numberposts' => 100 ) );
	return rest_ensure_response( array_map( 'books_endpoint_shape', $posts ) );
}

function books_endpoint_single( WP_REST_Request $request ) {
	$posts = get_posts( array( 'post_type' => 'book', 'post_status' => 'publish', 'name' => $request['slug'], 'numberposts' => 1 ) );
	if ( ! $posts ) {
		return new WP_Error( 'book_not_found', 'No book with that slug.', array( 'status' => 404 ) );
	}
	return rest_ensure_response( books_endpoint_shape( $posts[0] ) );
}

/**
 * One book, the way the front end wants it.
 */
function books_endpoint_shape( WP_Post $post ) {
	$id    = $post->ID;
	$cover = get_field( 'cover_image', $id ); // Return Format: Image Array

	return array(
		'slug'     => $post->post_name,
		'title'    => get_the_title( $post ),
		'subtitle' => (string) get_field( 'subtitle', $id ),
		'author'   => (string) get_field( 'book_author', $id ),
		'pages'    => (int) get_field( 'pages', $id ),
		'genres'   => wp_get_post_terms( $id, 'genre', array( 'fields' => 'names' ) ),
		'cover'    => $cover ? array(
			'url'    => $cover['sizes']['large'] ?? $cover['url'],
			'alt'    => (string) $cover['alt'],
			'width'  => (int) ( $cover['sizes']['large-width'] ?? $cover['width'] ),
			'height' => (int) ( $cover['sizes']['large-height'] ?? $cover['height'] ),
		) : null,
		'buyUrl'   => esc_url_raw( (string) get_field( 'buy_url', $id ) ),
		'content'  => apply_filters( 'the_content', $post->post_content ),
	);
}
