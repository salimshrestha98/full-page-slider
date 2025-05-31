import { InnerBlocks, InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { getBackgroundStyles, getTypographyStyles } from '../../utilities';

import {BackgroundControl} from '../../components';
import {
	PanelBody,
} from '@wordpress/components';
import { SwiperSlide } from 'swiper/react';
import {__} from '@wordpress/i18n';
import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';

registerBlockType( 'full-page-slider/slide', {
	edit: ( { context, attributes, setAttributes } ) => {
		const { 
			title, 
			background
		} = attributes;

		// Fetch Context Values.
		const {
			["full-page-slider/showTitle"]: showTitle,
			["full-page-slider/titleAlignment"]: titleAlignment,
			["full-page-slider/stickToBottom"]: stickToBottom,
			["full-page-slider/titleColor"]: titleColor,
			["full-page-slider/titleBackground"]: titleBackground,
			["full-page-slider/contentColor"]: contentColor,
			["full-page-slider/contentBackground"]: contentBackground,
			["full-page-slider/titleTypography"]: titleTypography,
			["full-page-slider/titlePadding"]: titlePadding,
			["full-page-slider/contentPadding"]: contentPadding,
		} = context;

		// Compose all context values in one object.
		const parentValues = {
			showTitle,
			titleAlignment,
			stickToBottom,
			titleColor,
			titleBackground,
			contentColor,
			contentBackground,
			titleTypography,
			titlePadding,
			contentPadding,
		};

		// Mirror context values to 'parentsAttribute'.
		useEffect(() => {
			setAttributes({ parentAttributes: parentValues });
		}, [JSON.stringify(parentValues)]);

		/**
		 * APPLY STYLES TO BLOCK.
		 */
		const innerBlockProps = useBlockProps({
			style: {
				justifyContent: stickToBottom ? 'flex-end' : 'flex-start',
				...getBackgroundStyles(background)
			}
		});

		return (
			<>
			<InspectorControls>
				<PanelBody title="Color" initialOpen={ false }>
					<BackgroundControl
						value={background || {}}
						onChange={(newVal) => setAttributes({ background: newVal })}
					/>
				</PanelBody>
			</InspectorControls>
				<SwiperSlide className="slide-block swiper-slide">
					<div { ...innerBlockProps }>
						{ showTitle &&
							<RichText
								tagName="h2"
								className='slide-title'
								value={ title }
								onChange={ ( newTitle ) => setAttributes( { title: newTitle } ) }
								placeholder="Give me a title…"
								style={{
									...getTypographyStyles(titleTypography),
									textAlign: titleAlignment,
									color: titleColor,
									background: titleBackground,
									padding: `${titlePadding?.top}${titlePadding?.unit} ${titlePadding?.right}${titlePadding?.unit} ${titlePadding?.bottom}${titlePadding?.unit} ${titlePadding?.left}${titlePadding?.unit}`
								}}
							/> }

						<div className="slide-main"
							style={{
								flexGrow: stickToBottom ? 'unset' : 1,
								color: contentColor,
								background: contentBackground,
								padding: `${contentPadding?.top}${contentPadding?.unit} ${contentPadding?.right}${contentPadding?.unit} ${contentPadding?.bottom}${contentPadding?.unit} ${contentPadding?.left}${contentPadding?.unit}`
							}}>
							<InnerBlocks />
						</div>
					</div>
				</SwiperSlide>
			</>
		);
	},

	save: ( { context, attributes } ) => {
		const { 
			title, 
			background,
			parentAttributes
		} = attributes;

		const {
			showTitle,
			titleAlignment,
			stickToBottom,
			titleColor,
			titleBackground,
			contentColor,
			contentBackground,
			titleTypography,
			titlePadding,
			contentPadding,
		} = parentAttributes;

		const backgroundStyles = getBackgroundStyles(background);

		return (
			<div className="slide-block swiper-slide">
				<div style={{
					...backgroundStyles,
					justifyContent: stickToBottom ? 'flex-end' : 'flex-start',
				}}>
					{ showTitle && (
						<h2
							className="slide-title"
							style={{
								...getTypographyStyles(titleTypography),
								textAlign: titleAlignment,
								color: titleColor,
								background: titleBackground,
								padding: `${titlePadding?.top}${titlePadding?.unit} ${titlePadding?.right}${titlePadding?.unit} ${titlePadding?.bottom}${titlePadding?.unit} ${titlePadding?.left}${titlePadding?.unit}`
							}}
						>
							{ title }
						</h2>
					)}
					<div
						className="slide-main"
						style={{
							flexGrow: stickToBottom ? 'unset' : 1,
							color: contentColor,
							background: contentBackground,
							padding: `${contentPadding?.top}${contentPadding?.unit} ${contentPadding?.right}${contentPadding?.unit} ${contentPadding?.bottom}${contentPadding?.unit} ${contentPadding?.left}${contentPadding?.unit}`
						}}	
					>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
	usesContext: metadata.usesContext,
} );
