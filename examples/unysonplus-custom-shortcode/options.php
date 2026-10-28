<?php if ( ! defined( 'FW' ) ) die( 'Forbidden' );
/**
 * options.php — the fields shown in the element's edit modal.
 *
 * Each option id becomes a key in $atts (see views/view.php). The SHAPE of this
 * array IS the schema that template export/import and generators must match, so
 * keep it documented alongside the element.
 */

$options = array(
	'heading' => array(
		'type'  => 'text',
		'label' => __( 'Heading', 'fw' ),
		'value' => __( 'Good to know', 'fw' ),
	),
	'text' => array(
		'type'  => 'textarea',
		'label' => __( 'Message', 'fw' ),
		'value' => __( 'Drop this element anywhere in the page builder.', 'fw' ),
	),
	'align' => array(
		'type'    => 'select',
		'label'   => __( 'Alignment', 'fw' ),
		'choices' => array(
			'left'   => __( 'Left', 'fw' ),
			'center' => __( 'Center', 'fw' ),
			'right'  => __( 'Right', 'fw' ),
		),
		'value'   => 'left',
	),
);
