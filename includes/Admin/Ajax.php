<?php

namespace FullPageSlider\Admin;

use FullPageSlider\Traits\Singleton;

/**
 * Admin Ajax Handler class.
 *
 * Handles all AJAX requests for the Full Page Slider plugin.
 */
class Ajax {
	use Singleton;

	/**
	 * Nonce action for admin AJAX requests.
	 */
	const NONCE_ACTION = 'fpslider_admin_nonce';

	/**
	 * Init method.
	 */
	public function init() {
		add_action('wp_ajax_fpslider_disable_first_time_notice', array($this, 'disable_first_time_notice_callback'));
	}

	/**
	 * Verify nonce and capability for admin AJAX requests.
	 *
	 * @return bool True if verification passes, sends JSON error and dies otherwise.
	 */
	private function verify_admin_request() {
		// Verify nonce
		if (!isset($_REQUEST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_REQUEST['nonce'])), self::NONCE_ACTION)) {
			wp_send_json_error(array(
				'message' => __('Security check failed. Please refresh the page and try again.', 'full-page-slider')
			), 403);
			return false;
		}

		// Verify capability
		if (!current_user_can('manage_options')) {
			wp_send_json_error(array(
				'message' => __('You do not have permission to perform this action.', 'full-page-slider')
			), 403);
			return false;
		}

		return true;
	}

	/**
	 * Disable first time notice callback.
	 */
	public function disable_first_time_notice_callback() {
		if (!$this->verify_admin_request()) {
			return;
		}

		update_option('fpslider_hide_first_time_notice', true);

		wp_send_json_success(array(
			'message' => __('Notice dismissed successfully.', 'full-page-slider')
		));
	}
}
