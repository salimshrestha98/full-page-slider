<?php

namespace FullPageSlider\Admin;

use FullPageSlider\Traits\Singleton;
use FullPageSlider\Admin\Ajax;

/**
 * Admin class.
 */
class Admin {
	use Singleton;

	/**
	 * Init method.
	 */
	public function init() {
		Ajax::instance()->init();
		$this->add_hooks();
	}

	/**
	 * Add hooks.
	 */
	private function add_hooks() {
		add_action( 'admin_menu', [ $this, 'add_admin_menu' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_assets' ] );
		add_filter( 'plugin_action_links_' . FPSLIDER_PLUGIN_BASENAME, [ $this, 'add_plugin_action_links' ] );
	}

	/**
	 * Add admin menu page.
	 */
	public function add_admin_menu() {
		add_menu_page(
			__( 'Full Page Slider', 'full-page-slider' ),
			__( 'Full Page Slider', 'full-page-slider' ),
			'manage_options',
			'full-page-slider',
			[ $this, 'admin_page_content' ],
			'dashicons-slides',
			30
		);
	}

	/**
	 * Enqueue admin assets.
	 */
	public function enqueue_admin_assets( $hook ) {
		if ( 'toplevel_page_full-page-slider' !== $hook ) {
			return;
		}

		wp_enqueue_style(
			'full-page-slider-admin',
			FPSLIDER_PLUGIN_URL . '/build/admin/admin-page.css',
			[],
			FPSLIDER_VERSION
		);
	}

	/**
	 * Admin page content.
	 */
	public function admin_page_content() {
		include FPSLIDER_PLUGIN_DIR . '/templates/admin/admin-page.php';
	}

	/**
	 * Add plugin action links.
	 *
	 * @param array $links Existing action links.
	 * @return array Modified action links.
	 */
	public function add_plugin_action_links( $links ) {
		$settings_link = '<a href="' . esc_url( admin_url( 'admin.php?page=full-page-slider' ) ) . '">' . __( 'Settings', 'full-page-slider' ) . '</a>';
		$support_link = '<a href="https://salim.com.np/support" target="_blank">' . __( 'Support', 'full-page-slider' ) . '</a>';
		
		array_unshift( $links, $settings_link, $support_link );
		
		return $links;
	}
}
