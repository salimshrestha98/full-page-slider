import './style.scss';

import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( metadata.name, {
	edit: Edit,
	save: Save
} );
