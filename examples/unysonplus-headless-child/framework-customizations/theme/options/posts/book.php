<?php
/**
 * The "Book Details" box on the Book edit screen.
 *
 * Unyson+ loads options/posts/<post type>.php automatically. Each option id
 * (subtitle, book_author, …) is the key you read the value back with:
 * fw_get_db_post_option( $post_id, 'subtitle' ).
 */

if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

$options = array(
	'book_details' => array(
		'title'   => __( 'Book Details', 'headless-books' ),
		'type'    => 'box',
		'options' => array(
			'subtitle'    => array(
				'type'  => 'text',
				'label' => __( 'Subtitle', 'headless-books' ),
			),
			'book_author' => array(
				'type'  => 'text',
				'label' => __( 'Author', 'headless-books' ),
			),
			'pages'       => array(
				'type'  => 'number',
				'label' => __( 'Pages', 'headless-books' ),
			),
			'cover_image' => array(
				'type'        => 'upload',
				'label'       => __( 'Cover image', 'headless-books' ),
				'images_only' => true,
			),
			'buy_url'     => array(
				'type'  => 'text',
				'label' => __( 'Buy link', 'headless-books' ),
			),
		),
	),
);
