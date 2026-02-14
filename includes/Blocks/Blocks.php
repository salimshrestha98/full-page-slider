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
        add_action('wp_enqueue_scripts', array( $this, 'enqueue_google_fonts' ));
        add_filter('body_class', array( $this, 'add_class_to_body_tag' ));
    }

    /**
     * Register the blocks in server side.
     */
    public function register_blocks()
    {

        if (function_exists('wp_register_block_metadata_collection') ) {
            wp_register_block_metadata_collection(FPSLIDER_PLUGIN_DIR . '/build', FPSLIDER_PLUGIN_DIR . '/build/blocks-manifest.php');
        }

        $manifest_data = include FPSLIDER_PLUGIN_DIR . '/build/blocks-manifest.php';
        foreach ( array_keys($manifest_data) as $block_type ) {
            register_block_type(FPSLIDER_PLUGIN_DIR . "/build/blocks/{$block_type}");
        }
    }

    /**
     * Register block assets.
     * @return void
     */
    public function register_blocks_assets()
    {
        $manifest_data = include FPSLIDER_PLUGIN_DIR . '/build/blocks-manifest.php';
        foreach ( array_keys($manifest_data) as $block_type ) {
            wp_localize_script(
                "full-page-slider-$block_type-editor-script",
                'fullPageSliderL10n',
                array(
                    'pluginURL' => FPSLIDER_PLUGIN_URL,
                    'ajaxURL'   => admin_url('admin-ajax.php'),
                    'nonce'     => wp_create_nonce(\FullPageSlider\Admin\Ajax::NONCE_ACTION),
                    'hideFirstTimeNotice' => get_option('fpslider_hide_first_time_notice', false),
                )
            );
        }
    }

    public function enqueue_styles()
    {
        // Add inline CSS to hide body until ready.
        $custom_css = '
			body.hide-until-ready {
				opacity: 0;
			}
		';
        wp_add_inline_style('wp-block-library', $custom_css);
    }

    /**
     * Enqueue Google Fonts used in blocks on the current page.
     */
    public function enqueue_google_fonts()
    {
        if (is_admin() || is_feed() || is_preview() || is_embed() || wp_doing_ajax()) {
            return;
        }

        if (!is_singular()) {
            return;
        }

        global $post;
        if (!isset($post->post_content)) {
            return;
        }

        $google_fonts = $this->extract_google_fonts_from_content($post->post_content);
        
        if (!empty($google_fonts)) {
            $font_families = array();
            foreach ($google_fonts as $font) {
                $font_families[] = str_replace(' ', '+', $font) . ':300,400,500,700';
            }
            
            $fonts_url = 'https://fonts.googleapis.com/css?family=' . implode('|', $font_families) . '&display=swap';
            wp_enqueue_style('full-page-slider-google-fonts', $fonts_url, array(), null);
        }
    }

    /**
     * Extract Google Fonts from post content blocks.
     */
    private function extract_google_fonts_from_content($content)
    {
        $google_fonts = array();
        $google_font_families = array(
            'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Raleway', 'Ubuntu', 'Inter',
            'Source Sans Pro', 'Nunito', 'Work Sans', 'Fira Sans', 'Rubik', 'Barlow', 'DM Sans',
            'Merriweather', 'Playfair Display', 'Crimson Text', 'Libre Baskerville', 'Lora',
            'PT Serif', 'Cormorant Garamond', 'Crimson Pro', 'Oswald', 'Dancing Script',
            'Pacifico', 'Lobster', 'Righteous', 'Fredoka One'
        );

        $blocks = parse_blocks($content);
        
        foreach ($blocks as $block) {
            if ($block['blockName'] === 'full-page-slider/full-page-slider') {
                // Check title typography
                if (isset($block['attrs']['titleTypography']['fontFamily'])) {
                    $font = $this->extract_font_name($block['attrs']['titleTypography']['fontFamily']);
                    if (in_array($font, $google_font_families)) {
                        $google_fonts[] = $font;
                    }
                }
                
                // Check content typography
                if (isset($block['attrs']['contentTypography']['fontFamily'])) {
                    $font = $this->extract_font_name($block['attrs']['contentTypography']['fontFamily']);
                    if (in_array($font, $google_font_families)) {
                        $google_fonts[] = $font;
                    }
                }
            }
        }
        
        return array_unique($google_fonts);
    }

    /**
     * Extract clean font name from font family string.
     */
    private function extract_font_name($font_family)
    {
        if (preg_match('/^["\']*([A-Za-z0-9\s]+)["\']*/', $font_family, $matches)) {
            return $matches[1];
        }
        return $font_family;
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
