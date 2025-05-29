import {
	AlignmentMatrixControl,
	PanelBody,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { InnerBlocks, InspectorControls, RichText, useBlockContext, useBlockProps } from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';

import ImageControl from '../../components/ImageControl/ImageControl';
import { SwiperSlide } from 'swiper/react';
import {__} from '@wordpress/i18n';
import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'full-page-slider/slide', {
	edit: ( { clientId, context, attributes, setAttributes } ) => {
		const { 
			title, 
			padding, 
			backgroundImage,
			backgroundSize,
			backgroundPosition,
			backgroundRepeat,
			backgroundAttachment,
			backgroundOverlay,
		} = attributes;

		const {
			["full-page-slider/showTitle"]: showTitle,
			["full-page-slider/titleAlignment"]: titleAlignment,
			["full-page-slider/stickToBottom"]: stickToBottom,
			["full-page-slider/padding"]: sliderPadding,
		} = context;


		/**
		 * SYNC PARENT PADDING VALUE WITH BLOCK PADDING VALUE.
		 * 
		 * SINCE CONTEXT IS NOT AVAILABLE IN SAVE FUNCTION, WE NEED TO STORE
		 * IN A LOCAL VARIABLE.
		 */
		useEffect(() => {
			if ( sliderPadding ) {
				setAttributes({padding: sliderPadding});
			}
		}, [sliderPadding]);

		const backgroundStyles = backgroundImage?.url ? {
			background: `url(${backgroundImage?.url})`,
			backgroundSize,
			backgroundPosition,
			backgroundRepeat,
			backgroundAttachment,
		} : {};

		
		/**
		 * APPLY STYLES TO BLOCK.
		 */
		const innerBlockProps = useBlockProps({
			style: {
				padding: `${padding.top}${padding.unit} ${padding.right}${padding.unit} ${padding.bottom}${padding.unit} ${padding.left}${padding.unit}`,
				justifyContent: stickToBottom ? 'flex-end' : 'flex-start',
				...backgroundStyles
			}
		});

		return (
			<>
			<InspectorControls>
				<PanelBody title="Background" initialOpen={ true }>
					<ImageControl
						label={__('Slide Background', 'full-page-slider')}
						value={backgroundImage}
						onSelect={(media) => {
							setAttributes({ backgroundImage: media});
						}}
						previewSize="medium"
					/>

					<SelectControl
						label={__('Background Size', 'full-page-slider')}
						value={backgroundSize}
						options={[
							{ label: __('Default', 'full-page-slider'), value: 'auto' },
							{ label: __('Cover', 'full-page-slider'), value: 'cover' },
							{ label: __('Contain', 'full-page-slider'), value: 'contain' },
						]}
						onChange={(value) => setAttributes({ backgroundSize: value })}
					/>

					<AlignmentMatrixControl
						label={__('Background Position', 'full-page-slider')}
						value={backgroundPosition}
						onChange={(value) => setAttributes({ backgroundPosition: value })}
					/>

					<SelectControl
						label={__('Background Repeat', 'full-page-slider')}
						value={backgroundRepeat}
						options={[
							{ label: __('No Repeat', 'full-page-slider'), value: 'no-repeat' },
							{ label: __('Repeat', 'full-page-slider'), value: 'repeat' },
							{ label: __('Repeat X', 'full-page-slider'), value: 'repeat-x' },
							{ label: __('Repeat Y', 'full-page-slider'), value: 'repeat-y' },
						]}
						onChange={(value) => setAttributes({ backgroundRepeat: value })}
					/>

					<SelectControl
						label={__('Background Attachment', 'full-page-slider')}
						value={backgroundAttachment}
						options={[
							{ label: __('Scroll', 'full-page-slider'), value: 'scroll' },
							{ label: __('Fixed', 'full-page-slider'), value: 'fixed' },
							{ label: __('Local', 'full-page-slider'), value: 'local' },
						]}
						onChange={(value) => setAttributes({ backgroundAttachment: value })}
					/>

					<TextControl
						label={__('Custom Background Color Overlay (e.g., rgba(0,0,0,0.5))', 'full-page-slider')}
						value={backgroundOverlay}
						onChange={(value) => setAttributes({ backgroundOverlay: value })}
					/>
				</PanelBody>
			</InspectorControls>
				<SwiperSlide className="slide-block swiper-slide">
					<div { ...innerBlockProps }>
						{ showTitle &&
							<RichText
								tagName="h2"
								className='slide-header'
								value={ title }
								onChange={ ( newTitle ) => setAttributes( { title: newTitle } ) }
								placeholder="Give me a title…"
								style={{textAlign: titleAlignment}}
							/> }

						<div className="slide-main" style={{flexGrow: stickToBottom ? 'unset' : 1}}>
							<InnerBlocks />
						</div>
					</div>
				</SwiperSlide>
			</>
		);
	},

	save: ( { attributes } ) => {
		const { 
			title, 
			showFooter, 
			padding,
			backgroundImage,
			backgroundSize,
			backgroundPosition,
			backgroundRepeat,
			backgroundAttachment,
			backgroundOverlay,
		} = attributes;

		const backgroundStyles = backgroundImage?.url ? {
			background: `url(${backgroundImage?.url})`,
			backgroundSize,
			backgroundPosition,
			backgroundRepeat,
			backgroundAttachment,
		} : {};

		return (
			<div className="slide-block swiper-slide">
				<div style={{
					padding: `${padding.top}${padding.unit} ${padding.right}${padding.unit} ${padding.bottom}${padding.unit} ${padding.left}${padding.unit}`,
					...backgroundStyles
				}}>
					<h2 className="slide-header">{ title }</h2>
					<div className="slide-main">
						<InnerBlocks.Content />
					</div>
					{ showFooter && <div className="slide-footer">Footer content</div> }
				</div>
			</div>
		);
	},
	usesContext: metadata.usesContext,
} );
