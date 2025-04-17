<?php

namespace SuperBlocks\PostTypes;

use SuperBlocks\Traits\Singleton;

/**
 * Author Profile class.
 */
class AuthorProfile {
	use Singleton;

	/**
	 * Init function.
	 */
	public function init() {
		add_action( 'init', array( $this, 'register' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_author_details_meta_boxes' ) );
		add_action( 'save_post', array( $this, 'save_author_meta_box' ) );
	}

	/**
	 * Register author_profile post type.
	 */
	public function register() {
		$labels = array(
			'name'              => _x( 'Author Profiles', 'Post type general name', 'super-blocks' ),
			'singular_name'     => _x( 'Author Profile', 'Post type singular name', 'super-blocks' ),
			'menu_name'         => _x( 'Author Profiles', 'Admin Menu text', 'super-blocks' ),
			'name_admin_bar'    => _x( 'Author Profile', 'Add New on Toolbar', 'super-blocks' ),
			'add_new'           => __( 'Add New', 'super-blocks' ),
			'add_new_item'      => __( 'Add New Author', 'super-blocks' ),
			'new_item'          => __( 'New Author', 'super-blocks' ),
			'edit_item'         => __( 'Edit Author', 'super-blocks' ),
			'view_item'         => __( 'View Author', 'super-blocks' ),
			'all_items'         => __( 'All Authors', 'super-blocks' ),
			'search_items'      => __( 'Search Authors', 'super-blocks' ),
			'parent_item_colon' => __( 'Parent Authors:', 'super-blocks' ),
			'not_found'         => __( 'No author found.', 'super-blocks' ),
		);

		$args = array(
			'labels'             => $labels,
			'public'             => true,
			'publicly_queryable' => true,
			'show_in_rest'       => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => array( 'slug' => 'author_profile' ),
			'capability_type'    => 'post',
			'has_archive'        => false,
			'hierarchical'       => false,
			'menu_position'      => null,
			'supports'           => array( 'title', 'thumbnail', 'email', 'description' ),
		);

		register_post_type( 'author_profile', $args );

		register_post_meta(
			'author_profile',
			'email',
			array(
				'type'          => 'string',
				'show_in_rest'  => true,
				'single'        => true,
				'auth_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		register_post_meta(
			'author_profile',
			'description',
			array(
				'type'          => 'string',
				'show_in_rest'  => true,
				'single'        => true,
				'auth_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	/**
	 * Add Author Details Metabox.
	 */
	public function add_author_details_meta_boxes() {
		add_meta_box(
			'author_details_meta_box',
			'Author Details',
			array( $this, 'render_author_details_meta_box' ),
			'author_profile',
			'normal',
			'default'
		);
	}

	/**
	 * Render meta box to input or edit extra author details.
	 */
	public function render_author_details_meta_box( $post ) {
		$email       = get_post_meta( $post->ID, 'email', true );
		$description = get_post_meta( $post->ID, 'description', true );

		wp_nonce_field( 'save_author_meta_box', 'author_meta_box_nonce' );
		?>
		<p>
			<label for="sb_email">Email:</label><br>
			<input type="email" id="sb_email" name="sb_email" value="<?php echo esc_attr( $email ); ?>" style="width:100%;">
		</p>
		<p>
			<label for="sb_description">Description:</label><br>
			<textarea id="sb_description" name="sb_description" rows="5" style="width:100%;"><?php echo esc_textarea( $description ); ?></textarea>
		</p>
		<?php
	}

	/**
	 * Save extra author details when edited or new author added.
	 */
	public function save_author_meta_box( $post_id ) {
		if ( ! isset( $_POST['author_meta_box_nonce'] ) || ! wp_verify_nonce( $_POST['author_meta_box_nonce'], 'save_author_meta_box' ) ) {
			return;
		}

		if ( isset( $_POST['sb_email'] ) ) {
			update_post_meta( $post_id, 'email', sanitize_email( $_POST['sb_email'] ) );
		}
		if ( isset( $_POST['sb_description'] ) ) {
			update_post_meta( $post_id, 'description', sanitize_textarea_field( $_POST['sb_description'] ) );
		}
	}
}
