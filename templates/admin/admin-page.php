<?php
/**
 * Admin page template for Full Page Slider plugin.
 *
 * @package FullPageSlider
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<div class="wrap fps-admin-page">
	<div class="fps-header">
		<h1><?php esc_html_e( 'Full Page Slider', 'full-page-slider' ); ?></h1>
		<p><?php esc_html_e( 'Create beautiful full-page sliders using the WordPress Block Editor', 'full-page-slider' ); ?></p>
	</div>

	<div class="fps-content">
		<div class="fps-main">
			<h2><?php esc_html_e( 'How to Use Full Page Slider', 'full-page-slider' ); ?></h2>
			
			<div class="fps-step">
				<h3>
					<span class="fps-step-number">1</span>
					<?php esc_html_e( 'Create or Edit a Page', 'full-page-slider' ); ?>
				</h3>
				<p><?php esc_html_e( 'Go to your WordPress admin dashboard and either create a new page or edit an existing one where you want to add the full-page slider.', 'full-page-slider' ); ?></p>
				<div class="fps-highlight">
					<strong><?php esc_html_e( 'Tip:', 'full-page-slider' ); ?></strong> <?php esc_html_e( 'For best results, use a full-width page template or remove sidebars from your page.', 'full-page-slider' ); ?>
				</div>
			</div>

			<div class="fps-step">
				<h3>
					<span class="fps-step-number">2</span>
					<?php esc_html_e( 'Add the Full Page Slider Block', 'full-page-slider' ); ?>
				</h3>
				<p><?php esc_html_e( 'In the Block Editor (Gutenberg), click the "+" button to add a new block and search for "Full Page Slider".', 'full-page-slider' ); ?></p>
				<ul>
					<li><?php esc_html_e( 'Click the "+" button in the editor', 'full-page-slider' ); ?></li>
					<li><?php esc_html_e( 'Type "Full Page Slider" in the search box', 'full-page-slider' ); ?></li>
					<li><?php esc_html_e( 'Click on the "Full Page Slider" block to add it', 'full-page-slider' ); ?></li>
				</ul>
                <img src="https://salim.com.np/wp-content/uploads/2025/06/image-1.png">
			</div>

			<div class="fps-step">
				<h3>
					<span class="fps-step-number">3</span>
					<?php esc_html_e( 'Add Slide Content', 'full-page-slider' ); ?>
				</h3>
				<p><?php esc_html_e( 'Once you\'ve added the Full Page Slider block, you can start adding individual slides. Each slide can contain any WordPress blocks like headings, paragraphs, images, buttons, and more.', 'full-page-slider' ); ?></p>
				<ul>
					<li><?php esc_html_e( 'Click inside the slider area to add your first slide', 'full-page-slider' ); ?></li>
					<li><?php esc_html_e( 'Add any blocks you want (text, images, buttons, etc.)', 'full-page-slider' ); ?></li>
					<li><?php esc_html_e( 'Use the "+" button to add more slides', 'full-page-slider' ); ?></li>
					<li><?php esc_html_e( 'Each slide will take up the full viewport height', 'full-page-slider' ); ?></li>
				</ul>
                <img src="https://salim.com.np/wp-content/uploads/2025/06/image-2.png">
			</div>

			<div class="fps-step">
				<h3>
					<span class="fps-step-number">4</span>
					<?php esc_html_e( 'Customize Slider Settings', 'full-page-slider' ); ?>
				</h3>
				<p><?php esc_html_e( 'Use the block settings panel on the right side to customize your slider:', 'full-page-slider' ); ?></p>
				<ul>
					<li><?php esc_html_e( 'Choose slide direction (vertical or horizontal)', 'full-page-slider' ); ?></li>
					<li><?php esc_html_e( 'Adjust animation speed and effects', 'full-page-slider' ); ?></li>
					<li><?php esc_html_e( 'Set background colors or images for individual slides', 'full-page-slider' ); ?></li>
					<li><?php esc_html_e( 'Configure responsive behavior', 'full-page-slider' ); ?></li>
				</ul>
                <img src="https://salim.com.np/wp-content/uploads/2025/06/image-8-1024x420.png">
			</div>

			<div class="fps-step">
				<h3>
					<span class="fps-step-number">5</span>
					<?php esc_html_e( 'Preview and Publish', 'full-page-slider' ); ?>
				</h3>
				<p><?php esc_html_e( 'Once you\'re happy with your slider, preview your page to see how it looks, then publish it for your visitors to enjoy!', 'full-page-slider' ); ?></p>
				<div class="fps-highlight">
					<strong><?php esc_html_e( 'Pro Tip:', 'full-page-slider' ); ?></strong> <?php esc_html_e( 'Test your slider on different devices to ensure it works well on mobile, tablet, and desktop.', 'full-page-slider' ); ?>
				</div>
			</div>

			<h2><?php esc_html_e( 'Need Help?', 'full-page-slider' ); ?></h2>
			<p><?php esc_html_e( 'If you run into any issues or have questions, feel free to reach out for support. We\'re here to help you create amazing full-page experiences!', 'full-page-slider' ); ?></p>
			
			<a href="<?php echo esc_url( admin_url( 'post-new.php?post_type=page' ) ); ?>" class="fps-button">
				<?php esc_html_e( 'Create Your First Slider', 'full-page-slider' ); ?>
			</a>
		</div>

		<div class="fps-sidebar">
            <div class="fps-sidebar-item">
                <h3><?php esc_html_e( 'Plugin Features', 'full-page-slider' ); ?></h3>
                <ul class="fps-feature-list">
                    <li><?php esc_html_e( 'Fullscreen slide sections', 'full-page-slider' ); ?></li>
                    <li><?php esc_html_e( 'Gutenberg-native blocks', 'full-page-slider' ); ?></li>
                    <li><?php esc_html_e( 'Vertical & horizontal layouts', 'full-page-slider' ); ?></li>
                    <li><?php esc_html_e( 'Smooth animations', 'full-page-slider' ); ?></li>
                    <li><?php esc_html_e( 'Mobile responsive', 'full-page-slider' ); ?></li>
                    <li><?php esc_html_e( 'Easy to customize', 'full-page-slider' ); ?></li>
                    <li><?php esc_html_e( 'Works with any theme', 'full-page-slider' ); ?></li>
                </ul>
            </div>

            <div class="fps-sidebar-item">
                <h3><?php esc_html_e( 'Quick Links', 'full-page-slider' ); ?></h3>
                <p>
                    <a href="<?php echo esc_url( admin_url( 'post-new.php?post_type=page' ) ); ?>">
                        <?php esc_html_e( 'Create New Page', 'full-page-slider' ); ?>
                    </a>
                </p>
                <p>
                    <a href="<?php echo esc_url( admin_url( 'edit.php?post_type=page' ) ); ?>">
                        <?php esc_html_e( 'View All Pages', 'full-page-slider' ); ?>
                    </a>
                </p>
                <p>
                    <a href="https://salim.com.np/full-page-slider/guide/" target="_blank">
                        <?php esc_html_e( 'How to Use Full Page Slider - Step by Step Guide', 'full-page-slider' ); ?>
                    </a>
                </p>
            </div>
        </div>
	</div>
</div>
