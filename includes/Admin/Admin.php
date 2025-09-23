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
}
