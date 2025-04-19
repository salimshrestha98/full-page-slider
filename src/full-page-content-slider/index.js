import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import Edit from './edit';
import Save from './save';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'super-blocks/full-page-content-slider', {
	edit: Edit,
	save: Save,
} );
