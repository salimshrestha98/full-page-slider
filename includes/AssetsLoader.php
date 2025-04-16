<?php

namespace SuperBlocks;

use SuperBlocks\Traits\Singleton;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * AssetsLoader Class.
 */
class AssetsLoader {
	use Singleton;

	/**
	 * Init method.
	 */
	public function init() {
		// add_action( 'enqueue_block_assets', array( $this, 'enqueue_editor_assets' ) );
	}

	/**
	 * Enqueue necessary editor scripts and styles.
	 */
	public function enqueue_editor_assets() {
		$assets_file   = SB_PLUGIN_DIR . '/build/index.asset.php';
		$assets_config = require_once $assets_file;

		wp_enqueue_script(
			'super-blocks',
			SB_PLUGIN_URL . '/build/index.js',
			array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n' ),
			time(),
			true
		);

		wp_register_style(
			'super-blocks',
			SB_PLUGIN_URL . '/src/style.css',
			array( 'wp-block-library-theme', 'wp-block-library' ),
			filemtime( SB_PLUGIN_DIR . '/src/editor.css' )
		);
	}
}
