import { __ } from '@wordpress/i18n'
import './editor.scss';

import { InspectorControls } from '@wordpress/block-editor';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow } from '@wordpress/components';
import {
	Box,
	Select as SimpleSelect,
	Button as ChakraButton,
	useDisclosure,
	Modal,
	Lorem,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	ChakraProvider,
} from '@chakra-ui/react';
import { useState } from 'react';
import Select from 'react-select'
import {
	BlockControls,
} from '@wordpress/block-editor';
import { Button, Toolbar } from '@wordpress/components';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
const Edit = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody title="Logic" initialOpen={ true }>

						The logic to hide/show the inner blocks.
						<PanelRow>
							<SimpleSelect>
								<option>Hide</option>
								<option>Show</option>
							</SimpleSelect>
							<Box as="span">
								the blocks if :
							</Box>
						</PanelRow>
						<Box>
							<Select
								options={ [
									{ value: '', label: 'Select a User', disabled: true },
									{ value: 'a', label: 'User A' },
									{ value: 'b', label: 'User B' },
									{ value: 'c', label: 'User c' },
								] }
								isMulti={ true }
							/>
						</Box>
					</PanelBody>
					<PanelBody title="salim" initialOpen={ false }>
						<Button size="xs" colorScheme="teal">salim</Button>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<BlockControls group="block">
				<Toolbar label={ __( 'Edit Conditional Logic', 'blockart' ) }>
					<Button
						label={ __( 'Edit Conditional Logic', 'blockart' ) }
						onClick={ () => {
							console.log( 'clicked' )
						} }
						icon="networking"
					/>
				</Toolbar>
			</BlockControls>
			<ChakraProvider>

				<Button onClick={ onOpen }>Open Modal</Button>

				<Modal isOpen={ isOpen } onClose={ onClose }>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Modal Title</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Box style={ {
								background: 'grey',
								border: '1px solid'
							} }>
								This is the modal.
							</Box>
						</ModalBody>

						<ModalFooter>
							<ChakraButton colorScheme='blue' mr={ 3 } onClick={ onClose }>
								Close
							</ChakraButton>
							<ChakraButton variant='ghost'>Secondary Action</ChakraButton>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</ChakraProvider>


			<div { ...useBlockProps() }>
				<InnerBlocks />
			</div>

		</>
	);
}

export default Edit;
