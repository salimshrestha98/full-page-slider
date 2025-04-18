<?php
	$block_style = '';
if ( ! empty( $attributes['backgroundColor'] ) ) {
	$block_style .= ';background:' . esc_attr( $attributes['backgroundColor'] );
}
if ( ! empty( $attributes['textAlign'] ) ) {
	$block_style .= ';text-align:' . esc_attr( $attributes['textAlign'] );
}
if ( ! empty( $attributes['padding'] ) ) {
	$block_style .= ';padding:' . esc_attr( $attributes['padding'] );
}
?>

<div class="super-block author-profile" style="<?php echo esc_attr( $block_style ); ?>">

	<?php
	$author_id = $attributes['selectedAuthorId'];
	$author    = get_post( $author_id );

	if ( $author ) {
		$author_name        = $author->post_title;
		$author_email       = get_post_meta( $author->ID, 'email', true );
		$author_description = get_post_meta( $author->ID, 'description', true );
		$author_thumbnail   = get_the_post_thumbnail_url( $author->ID );

		?>
		<div>
			<div class="author-image-container">
				<img
					src="<?php echo $author_thumbnail !== '' ? esc_url_raw( $author_thumbnail ) : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'; ?>"
					class="author-thumbnail"
					alt="Profile Picture"
				/>
			</div>
			<div class="author-details-container">
					<h3 class="author-name">
						<?php echo esc_html( $author_name ); ?>
					</h3>
					<p class="author-email">
						<?php echo esc_html( $author_email ); ?>
					</p>
					<p class="author-description">
						<?php echo esc_html( $author_description ); ?>
					</p>

					<?php
					if ( ! empty( $attributes['moreText'] ) ) {
						echo "<p class='author-more-text'>{$attributes['moreText']}</p>";
					}
					?>
			</div>
		</div>
		<?php
	} else {
		?>
		<p><?php echo __( 'No author selected.', 'super-blocks' ); ?></p>
		<?php
	}
	?>
</div>
