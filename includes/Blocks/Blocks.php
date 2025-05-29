<?php

namespace FullPageSlider\Blocks;

use FullPageSlider\Traits\Singleton;

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
		add_action( 'enqueue_block_editor_assets', array($this, 'register_blocks_assets' ) );
	}

	/**
	 * Register the blocks in server side.
	 */
	public function register_blocks() {

		if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
			wp_register_block_metadata_collection( SB_PLUGIN_DIR . '/build', SB_PLUGIN_DIR . '/build/blocks-manifest.php' );
		}

		$manifest_data = require SB_PLUGIN_DIR . '/build/blocks-manifest.php';
		foreach ( array_keys( $manifest_data ) as $block_type ) {
			register_block_type( SB_PLUGIN_DIR . "/build/blocks/{$block_type}" );
		}
	}

	public function register_blocks_assets() {
		
		$manifest_data = require SB_PLUGIN_DIR . '/build/blocks-manifest.php';
		foreach ( array_keys( $manifest_data ) as $block_type ) {
			wp_localize_script( "full-page-slider-$block_type-editor-script", 'fullPageSliderL10n', [
			   'pluginURL' => SB_PLUGIN_URL,
		   ]);
		}
	}
}
