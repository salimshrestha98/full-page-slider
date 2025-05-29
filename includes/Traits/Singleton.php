<?php

namespace FullPageSlider\Traits;

/**
 * Trait to implement Singleton Pattern.
 */
trait Singleton {
	private static $instance;

	/**
	 * Returns a single instance everytime.
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {}
	private function __clone() {}
	public function __wakeup() {}
}
