<?php
/**
 * Books in GraphQL (WPGraphQL), for post types and fields made with the
 * Unyson+ Post Types and Custom Fields extensions.
 *
 * Needs the WPGraphQL plugin. Does nothing without it.
 */

if ( ! defined( 'FW' ) ) {
	die( 'Forbidden' );
}

// 1. Put the post type and the taxonomy in the GraphQL schema.
add_filter( 'fw_ext_post_types_args', 'headless_books_graphql_post_type', 10, 2 );
add_filter( 'fw_ext_post_types_taxonomy_args', 'headless_books_graphql_taxonomy', 10, 2 );

function headless_books_graphql_post_type( $args, $slug ) {
	if ( 'book' === $slug ) {
		$args['show_in_graphql']     = true;
		$args['graphql_single_name'] = 'book';
		$args['graphql_plural_name'] = 'books';
	}
	return $args;
}

function headless_books_graphql_taxonomy( $args, $slug ) {
	if ( 'genre' === $slug ) {
		$args['show_in_graphql']     = true;
		$args['graphql_single_name'] = 'genre';
		$args['graphql_plural_name'] = 'genres';
	}
	return $args;
}

// 2. Add the Book Details fields to the Book type.
add_action( 'graphql_register_types', 'headless_books_graphql_fields' );

function headless_books_graphql_fields() {
	register_graphql_object_type( 'BookCover', array(
		'description' => __( 'A book cover image.', 'headless-books' ),
		'fields'      => array(
			'url'    => array( 'type' => 'String' ),
			'alt'    => array( 'type' => 'String' ),
			'width'  => array( 'type' => 'Int' ),
			'height' => array( 'type' => 'Int' ),
		),
	) );

	// Each field reads its value with fw_get_db_post_option(), as a template would.
	$value = function ( $name ) {
		return function ( $post ) use ( $name ) {
			$v = fw_get_db_post_option( $post->databaseId, $name, '' );
			return '' === $v ? null : $v;
		};
	};

	register_graphql_fields( 'Book', array(
		'subtitle'   => array( 'type' => 'String', 'resolve' => $value( 'subtitle' ) ),
		'bookAuthor' => array( 'type' => 'String', 'resolve' => $value( 'book_author' ) ),
		'pages'      => array( 'type' => 'Int', 'resolve' => $value( 'pages' ) ),
		'buyUrl'     => array( 'type' => 'String', 'resolve' => $value( 'buy_url' ) ),
		'cover'      => array(
			'type'    => 'BookCover',
			'resolve' => function ( $post ) {
				$stored = fw_get_db_post_option( $post->databaseId, 'cover_image' );
				$id     = is_array( $stored ) && ! empty( $stored['attachment_id'] ) ? (int) $stored['attachment_id'] : 0;
				$src    = $id ? wp_get_attachment_image_src( $id, 'large' ) : false;
				if ( ! $src ) {
					return null;
				}
				return array(
					'url'    => $src[0],
					'alt'    => (string) get_post_meta( $id, '_wp_attachment_image_alt', true ),
					'width'  => (int) $src[1],
					'height' => (int) $src[2],
				);
			},
		),
	) );
}
