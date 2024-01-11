import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../theme/theme';


console.log( 'asdgasvasd' ); //eslint-disable-line

const { addFilter } = wp.hooks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody } = wp.components;

addFilter( 'editor.BlockEdit', 'super-blocks/blockedit', ( BlockEdit ) => {
	return ( props ) => {
		console.log( 'inside filter', props ); //eslint-disable-line
		return (
			<>
				<ChakraProvider theme={ theme }>
					<div>salimssssss</div>
					<BlockEdit { ...props } />
					<InspectorControls>
						<PanelBody>My custom control</PanelBody>
					</InspectorControls>
				</ChakraProvider>
			</>
		)
	}
} );

// withChakra();



registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
