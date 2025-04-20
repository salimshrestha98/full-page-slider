<?php

/*
 * Plugin Name:       Super Blocks
 * Description:       Super Blocks Plugin.
 * Version:           1.0.0
 * Requires at least: 6.6.2
 * Requires PHP:      7.4
 * Author:            Salim Shrestha
 * Author URI:        https://github.com/salimshrestha98/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       super-blocks
 * Domain Path:       /languages
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use SuperBlocks\Plugin;

require_once 'vendor/autoload.php';

/**
 * Define plugin constants.
 */


define( 'SB_VERSION', '1.0.0' );
define( 'SB_PLUGIN_FILE', __FILE__ );
define( 'SB_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'SB_PLUGIN_URL', plugins_url( '', __FILE__ ) );
define( 'SB_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
define( 'SB_TEXT_DOMAIN', 'super-blocks' );

Plugin::instance()->init();
