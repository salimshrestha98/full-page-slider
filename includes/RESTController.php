<?php


namespace FullPageSlider;

use FullPageSlider\Traits\Singleton;
use WP_Error;
use WP_REST_Controller;
use WP_REST_Response;
use WP_REST_Server;

/**
 * RESTController to handle manual setting up of author_profile REST route.
 */
class RESTController extends WP_REST_Controller {
	use Singleton;

	/**
	 * Init function.
	 */
	public function init() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		$version   = '2';
		$namespace = 'wp/v' . $version;
		$base      = 'author_profile';

		register_rest_route(
			$namespace,
			'/' . $base,
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'get_items_permissions_check' ),
					'args'                => array(),
				),
			)
		);
	}

	/**
	 * Get a collection of items.
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_items( $request ) {
		$authors = array();

		$posts = get_posts(
			array(
				'post_type' => 'author_profile',
			)
		);

		if ( ! empty( $posts ) ) {

			foreach ( $posts as $post ) {
				$author = array(
					'id'          => $post->ID,
					'name'        => $post->post_title,
					'email'       => get_post_meta( $post->ID, 'email', true ),
					'description' => get_post_meta( $post->ID, 'description', true ),
					'thumbnail'   => get_the_post_thumbnail_url( $post->ID ),
				);

				$authors[] = $author;
			}

			return new WP_REST_Response( $authors, 200 );
		}
	}

	/**
	 * Check if a given request has access to get items
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	 */
	public function get_items_permissions_check( $request ) {
		return current_user_can( 'edit_posts' );
	}
}
