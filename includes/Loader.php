<?php

namespace SuperBlocks;

use SuperBlocks\Admin\Admin;
use SuperBlocks\Traits\Singleton;

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

		if ( is_admin() ) {
			Admin::instance()->init();
		}
	}
}
