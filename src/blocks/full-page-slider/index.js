import './style.scss';
import './editor.scss';

import Edit from './edit';
import Save from './save';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'full-page-slider/full-page-slider', {
	edit: Edit,
	save: Save,
} );
