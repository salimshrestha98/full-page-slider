<?php

/*
 * Plugin Name:       Full Page Slider
 * Plugin URI:        https://salim.com.np/full-page-slider
 * Description:       Full Page Slider Plugin for WordPress.
 * Version:           1.0.0
 * Requires at least: 6.6.2
 * Requires PHP:      7.4
 * Author:            Salim Shrestha
 * Author URI:        https://salim.com.np/
 * License:           GPL2
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       full-page-slider
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use FullPageSlider\Plugin;

require_once 'vendor/autoload.php';

/**
 * Define plugin constants.
 */

define( 'FPS_VERSION', '1.0.0' );
define( 'FPS_PLUGIN_FILE', __FILE__ );
define( 'FPS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'FPS_PLUGIN_URL', plugins_url( '', __FILE__ ) );
define( 'FPS_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
define( 'FPS_TEXT_DOMAIN', 'full-page-slider' );

Plugin::instance()->init();
