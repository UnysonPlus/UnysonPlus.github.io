<?php
/**
 * Adds the Book Details values to the REST API as `book_fields`.
 *
 * Doing this in code lets you shape the output for the front end: here the
 * cover comes back with its size and alt text instead of the stored
 * { attachment_id, url } pair.
 */

if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

add_action( 'rest_api_init', 'headless_books_register_rest_fields' );

function headless_books_register_rest_fields() {
	register_rest_field( 'book', 'book_fields', array(
		'get_callback' => 'headless_books_rest_fields',
		'schema'       => array(
			'description' => __( 'Book Details values.', 'headless-books' ),
			'type'        => 'object',
			'context'     => array( 'view', 'edit' ),
			'readonly'    => true,
		),
	) );
}

/**
 * @param array $post The post as prepared for the response.
 *
 * @return array
 */
function headless_books_rest_fields( $post ) {
	$id = (int) $post['id'];

	return array(
		'subtitle'    => (string) fw_get_db_post_option( $id, 'subtitle', '' ),
		'book_author' => (string) fw_get_db_post_option( $id, 'book_author', '' ),
		'pages'       => (int) fw_get_db_post_option( $id, 'pages', 0 ),
		'cover_image' => headless_books_rest_image( fw_get_db_post_option( $id, 'cover_image' ) ),
		'buy_url'     => esc_url_raw( (string) fw_get_db_post_option( $id, 'buy_url', '' ) ),
	);
}

/**
 * Turn a stored upload value into what a front end needs for an <img>.
 *
 * @param mixed $value { attachment_id, url } as saved by the upload option.
 *
 * @return array|null
 */
function headless_books_rest_image( $value ) {
	$attachment_id = is_array( $value ) && ! empty( $value['attachment_id'] ) ? (int) $value['attachment_id'] : 0;
	$src           = $attachment_id ? wp_get_attachment_image_src( $attachment_id, 'large' ) : false;

	if ( ! $src ) {
		return null;
	}

	return array(
		'id'     => $attachment_id,
		'url'    => $src[0],
		'width'  => (int) $src[1],
		'height' => (int) $src[2],
		'alt'    => (string) get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ),
	);
}
