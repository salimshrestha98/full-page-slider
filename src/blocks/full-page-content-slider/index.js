import './style.scss';
import './editor.scss';

import Edit from './edit';
import Save from './save';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'super-blocks/full-page-content-slider', {
	edit: Edit,
	save: Save,
} );
