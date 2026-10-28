<?php if ( ! defined( 'FW' ) ) die( 'Forbidden' );
/**
 * config.php — where this element appears in the page builder.
 * The tag is the folder name: [my_element].
 */

$cfg = array();

$cfg['page_builder'] = array(
	'title'       => __( 'Highlight Box', 'fw' ),
	'description' => __( 'A titled callout box with a short message.', 'fw' ),
	'tab'         => __( 'Content Elements', 'fw' ), // which palette tab it lands in
	'popup_size'  => 'small',                        // edit-modal width: small | medium | large
);
