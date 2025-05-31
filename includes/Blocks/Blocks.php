<?php

namespace FullPageSlider\Blocks;

use FullPageSlider\Traits\Singleton;

/**
 * Blocks class.
 */
class Blocks
{
    use Singleton;

    /**
     * Init method.
     */
    public function init()
    {
        add_action('init', array( $this, 'register_blocks' ));
        add_action('enqueue_block_editor_assets', array( $this, 'register_blocks_assets' ));
        add_action('wp_enqueue_scripts', array( $this, 'enqueue_styles' ));
        add_filter('body_class', array( $this, 'add_class_to_body_tag' ));
    }

    /**
     * Register the blocks in server side.
     */
    public function register_blocks()
    {

        if (function_exists('wp_register_block_metadata_collection') ) {
            wp_register_block_metadata_collection(FPS_PLUGIN_DIR . '/build', FPS_PLUGIN_DIR . '/build/blocks-manifest.php');
        }

        $manifest_data = include FPS_PLUGIN_DIR . '/build/blocks-manifest.php';
        foreach ( array_keys($manifest_data) as $block_type ) {
            register_block_type(FPS_PLUGIN_DIR . "/build/blocks/{$block_type}");
        }
    }

    public function register_blocks_assets()
    {
        $manifest_data = include FPS_PLUGIN_DIR . '/build/blocks-manifest.php';
        foreach ( array_keys($manifest_data) as $block_type ) {
            wp_localize_script(
                "full-page-slider-$block_type-editor-script",
                'fullPageSliderL10n',
                array(
                'pluginURL' => FPS_PLUGIN_URL,
                'ajaxURL'   => admin_url('admin-ajax.php'),
                'hideFirstTimeNotice' => get_option( 'fps_hide_first_time_notice', false),
                )
            );
        }
    }

    public function enqueue_styles()
    {
        // Add your inline CSS
        $custom_css = '
			body.hide-until-ready {
				opacity: 0;
			}
		';
        wp_add_inline_style('wp-block-library', $custom_css);
    }

    public function add_class_to_body_tag( $classes )
    {
        // Only run on frontend, not in the admin or editor iframe
        if ( is_admin() || is_feed() || is_preview() || is_embed() || wp_doing_ajax() ) {
            return $classes;
        }

        if ( is_singular() ) {
            global $post;
            if ( ! isset( $post->post_content ) ) {
                return $classes;
            }

            $blocks = parse_blocks( $post->post_content );

            foreach ( $blocks as $block ) {
                if (
                    $block['blockName'] === 'full-page-slider/full-page-slider' &&
                    ! empty( $block['attrs']['forceFullScreen'] ) &&
                    $block['attrs']['forceFullScreen'] == true
                ) {
                    $classes[] = 'hide-until-ready';
                    break;
                }
            }
        }

        return $classes;
    }
}
