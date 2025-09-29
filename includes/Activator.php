<?php

namespace FullPageSlider;

use FullPageSlider\Traits\Singleton;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Activator class handles plugin activation and redirection logic.
 */
class Activator {
	use Singleton;

	/**
	 * Init method.
	 */
	public function init() {
		$this->add_hooks();
	}

	/**
	 * Add hooks.
	 */
	private function add_hooks() {
		add_action( 'admin_init', [ $this, 'activation_redirect' ] );
	}

	/**
	 * Plugin activation callback.
	 * Sets a transient to trigger redirect after activation.
	 */
	public static function activate() {
		// Set a transient to redirect after activation
		set_transient( 'fpslider_activation_redirect', true, 30 );
	}

	/**
	 * Redirect to settings page after plugin activation.
	 */
	public function activation_redirect() {
		// Check if we should redirect
		if ( get_transient( 'fpslider_activation_redirect' ) ) {
			// Delete the transient
			delete_transient( 'fpslider_activation_redirect' );
			
			// Don't redirect if activating multiple plugins or if we're already on the page
			if ( isset( $_GET['activate-multi'] ) || ( isset( $_GET['page'] ) && $_GET['page'] === 'full-page-slider' ) ) {
				return;
			}
			
			// Redirect to the plugin settings page
			wp_safe_redirect( admin_url( 'admin.php?page=full-page-slider' ) );
			exit;
		}
	}
}
