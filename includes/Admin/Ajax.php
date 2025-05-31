<?php

namespace FullPageSlider\Admin;

use FullPageSlider\Traits\Singleton;

/**
 * Admin class.
 */
class Ajax {
	use Singleton;

	/**
	 * Init method.
	 */
	public function init() {
		add_action('wp_ajax_disable_first_time_notice', array( $this, 'disable_first_time_notice_callback'));
	}

	public function disable_first_time_notice_callback() {
		update_option('fps_hide_first_time_notice', true);

		wp_die();
	}
}
