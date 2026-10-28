<?php if ( ! defined( 'FW' ) ) die( 'Forbidden' );
/**
 * views/view.php — the front-end HTML template.
 *
 * In scope:
 * @var array  $atts     resolved option values (keys match options.php)
 * @var string $content  rendered inner content (only for container elements)
 *
 * Output lean, semantic markup and escape every value — see the clean-DOM guide.
 */
?>
<div class="my-element my-element--<?php echo esc_attr( $atts['align'] ); ?>">
	<?php if ( '' !== $atts['heading'] ) : ?>
		<h3 class="my-element__heading"><?php echo esc_html( $atts['heading'] ); ?></h3>
	<?php endif; ?>
	<?php if ( '' !== $atts['text'] ) : ?>
		<p class="my-element__text"><?php echo esc_html( $atts['text'] ); ?></p>
	<?php endif; ?>
</div>
