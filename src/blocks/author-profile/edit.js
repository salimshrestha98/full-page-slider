import './editor.scss';
import './style.scss';

import {
	ColorPicker,
	Flex,
	FlexBlock,
	FlexItem,
	PanelBody,
	SelectControl,
	ToggleControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';
import { InspectorControls, RichText } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function Edit ( { attributes, setAttributes } ) {
	const {
		selectedAuthorId,
		author,
		showMore,
		moreText,
		backgroundColor,
		textAlign,
		padding
	} = attributes;


	const authors = useSelect(
		( select ) => select( 'core' ).getEntityRecords( 'postType', 'author_profile', { per_page: 10 } ),
		[]
	);

	const selectedAuthor = authors?.find( ( author ) => author.id === selectedAuthorId );

	/**
	 * Set values for currently selected author.
	 * @param {int} value 
	 */
	function selectAuthor ( value ) {
		setAttributes( {
			selectedAuthorId: parseInt( value ),
			author: authors?.find( ( author ) => author.id == value )
		} );
	}


	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title={ __( "General", 'super-blocks' ) }>

					<SelectControl
						label={ __( "Select Author", 'super-blocks' ) }
						value={ selectedAuthorId }
						options={ [
							{ label: 'Select', value: 0 },
							...( authors?.map( ( author ) => ( {
								label: author.name,
								value: author.id
							} ) ) || [] )
						] }
						onChange={ ( value ) => selectAuthor( value ) }
					/>

					<label className="sb-setting-label">{ __( "Show More Section", 'super-blocks' ) }</label>
					<ToggleControl
						checked={ showMore }
						onChange={ ( value ) => setAttributes( { showMore: value } ) }
					/>
				</PanelBody>

				<PanelBody title="Styles">

					<label className="sb-setting-label">{ __( "Background Color", 'super-blocks' ) }</label>
					<ColorPicker
						color={ backgroundColor }
						onChangeComplete={ ( value ) => setAttributes( { backgroundColor: value.hex } ) }
					/>

					<SelectControl
						label="Text Alignment"
						value={ textAlign }
						options={ [
							{ label: 'Left', value: 'left' },
							{ label: 'Center', value: 'center' },
							{ label: 'Right', value: 'right' }
						] }
						onChange={ ( value ) => setAttributes( { textAlign: value } ) }
					/>

					<UnitControl
						label="Padding"
						value={ padding }
						onChange={ ( value ) => setAttributes( { padding: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div
				className="super-block author-profile"
				style={ {
					backgroundColor,
					textAlign,
					padding
				} }>

				{ selectedAuthor ? (
					<Flex align='start'>
						<FlexItem className="author-image-container">
							<img
								src={ selectedAuthor.thumbnail != '' ? selectedAuthor.thumbnail : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }
								className='author-thumbnail'
								alt={ __( 'Profile Picture', 'super-blocks' ) }
							/>
						</FlexItem>
						<FlexBlock className="author-details-container">
							<h3 className="author-name">{ selectedAuthor.name }</h3>
							<p className="author-email">{ selectedAuthor.email }</p>
							<p className="author-description">{ selectedAuthor.description }</p>


							{ showMore && (
								<RichText
									tagName="p"
									className="author-more-text"
									value={ moreText }
									onChange={ ( value ) => setAttributes( { moreText: value } ) }
									placeholder={ __( "Add more info about the author here.", 'super-blocks' ) }
								/>
							) }
						</FlexBlock>
					</Flex>
				) : (
					<p>{ __( 'Select an author', 'super-blocks' ) }</p>
				) }

			</div>
		</div >
	);
}
