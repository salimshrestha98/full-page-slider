<?php

namespace SuperBlocks\Blocks;

use SuperBlocks\Traits\Singleton;

/**
 * Blocks class.
 */
class Blocks {
	use Singleton;

	/**
	 * Init method.
	 */
	public function init() {
		add_action( 'init', array( $this, 'register_blocks' ) );
	}

	/**
	 * Register the blocks in server side.
	 */
	public function register_blocks() {
		if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
			wp_register_block_metadata_collection( SB_PLUGIN_DIR . '/build', SB_PLUGIN_DIR . '/build/blocks-manifest.php' );
		}

		$manifest_data = include SB_PLUGIN_DIR . '/build/blocks-manifest.php';
		foreach ( array_keys( $manifest_data ) as $block_type ) {
			register_block_type( SB_PLUGIN_DIR . "/build/{$block_type}" );
		}
	}
}
