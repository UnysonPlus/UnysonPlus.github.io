<?php
/**
 * A custom REST endpoint: /wp-json/books/v1/books (and /books/<slug>).
 *
 * One request returns everything a book page needs, in the shape the front end
 * wants: genre names instead of IDs, the cover with its size and alt text, and
 * no WordPress-specific wrappers such as title.rendered.
 */

if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

add_action( 'rest_api_init', 'headless_books_register_endpoint' );

function headless_books_register_endpoint() {
	register_rest_route( 'books/v1', '/books', array(
		'methods'             => 'GET',
		'callback'            => 'headless_books_endpoint_list',
		'permission_callback' => '__return_true', // public, read-only
	) );

	register_rest_route( 'books/v1', '/books/(?P<slug>[a-z0-9-]+)', array(
		'methods'             => 'GET',
		'callback'            => 'headless_books_endpoint_single',
		'permission_callback' => '__return_true',
	) );
}

function headless_books_endpoint_list() {
	$posts = get_posts( array( 'post_type' => 'book', 'post_status' => 'publish', 'numberposts' => 100 ) );
	return rest_ensure_response( array_map( 'headless_books_endpoint_shape', $posts ) );
}

function headless_books_endpoint_single( WP_REST_Request $request ) {
	$posts = get_posts( array( 'post_type' => 'book', 'post_status' => 'publish', 'name' => $request['slug'], 'numberposts' => 1 ) );
	if ( ! $posts ) {
		return new WP_Error( 'book_not_found', __( 'No book with that slug.', 'headless-books' ), array( 'status' => 404 ) );
	}
	return rest_ensure_response( headless_books_endpoint_shape( $posts[0] ) );
}

/**
 * One book, the way the front end wants it.
 */
function headless_books_endpoint_shape( WP_Post $post ) {
	$id    = $post->ID;
	$cover = fw_get_db_post_option( $id, 'cover_image' );
	$image = is_array( $cover ) && ! empty( $cover['attachment_id'] ) ? (int) $cover['attachment_id'] : 0;
	$src   = $image ? wp_get_attachment_image_src( $image, 'large' ) : false;

	return array(
		'slug'     => $post->post_name,
		'title'    => get_the_title( $post ),
		'subtitle' => (string) fw_get_db_post_option( $id, 'subtitle', '' ),
		'author'   => (string) fw_get_db_post_option( $id, 'book_author', '' ),
		'pages'    => (int) fw_get_db_post_option( $id, 'pages', 0 ),
		'genres'   => wp_get_post_terms( $id, 'genre', array( 'fields' => 'names' ) ),
		'cover'    => $src ? array(
			'url'    => $src[0],
			'alt'    => (string) get_post_meta( $image, '_wp_attachment_image_alt', true ),
			'width'  => (int) $src[1],
			'height' => (int) $src[2],
		) : null,
		'buyUrl'   => esc_url_raw( (string) fw_get_db_post_option( $id, 'buy_url', '' ) ),
		'content'  => apply_filters( 'the_content', $post->post_content ),
	);
}
