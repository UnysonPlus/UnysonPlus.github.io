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

	// The live label drawn on the builder canvas (an Underscore.js micro-template).
	// `o` holds this element's option values, so the card shows its own heading.
	//   {{- expr }}  prints HTML-ESCAPED — use it for ANY user text.
	//   {{= expr }}  prints RAW — a typed <script> would run in wp-admin. Avoid for user input.
	// Always render an explicit empty state so an unconfigured card never looks broken.
	'title_template' => '
		{{ if ( o && o["heading"] && ( \'\' + o["heading"] ).trim() ) { }}
			<strong>{{- o["heading"] }}</strong>
		{{ } else { }}
			<em>Highlight Box</em>
		{{ } }}
	',
);
