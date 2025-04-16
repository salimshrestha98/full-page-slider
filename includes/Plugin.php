<?php

namespace SuperBlocks;

use SuperBlocks\Traits\Singleton;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Plugin Class.
 */
class Plugin {
	use Singleton;

	/**
	 * Init method.
	 */
	public function init() {
		Loader::instance()->init();
	}
}
