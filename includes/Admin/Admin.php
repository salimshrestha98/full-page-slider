<?php

namespace FullPageSlider\Admin;

use FullPageSlider\PostTypes\AuthorProfile;
use FullPageSlider\Traits\Singleton;

/**
 * Admin class.
 */
class Admin {
	use Singleton;

	/**
	 * Init method.
	 */
	public function init() {
		$this->register_custom_post_types();
	}

	/**
	 * Register custom post types.
	 */
	public function register_custom_post_types() {
		AuthorProfile::instance()->init();
	}
}
