<?php

namespace FullPageSlider;

use FullPageSlider\Admin\Admin;
use FullPageSlider\Blocks\Blocks;
use FullPageSlider\Traits\Singleton;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Loader Class.
 */
class Loader {
	use Singleton;

	/**
	 * Init method.
	 */
	public function init() {
		AssetsLoader::instance()->init();
		Blocks::instance()->init();

		if ( is_admin() ) {
			Admin::instance()->init();
		}
	}
}
