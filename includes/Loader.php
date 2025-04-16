<?php

namespace SuperBlocks;

use SuperBlocks\Admin\Admin;
use SuperBlocks\Blocks\Blocks;
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
		Blocks::instance()->init();

		if ( is_admin() ) {
			Admin::instance()->init();
		}
	}
}
