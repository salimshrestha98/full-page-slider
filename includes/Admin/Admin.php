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
	}
}
