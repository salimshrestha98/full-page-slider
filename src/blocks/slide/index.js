import { InnerBlocks, InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { getBackgroundStyles, getTypographyStyles } from '../../utilities';
import { useDispatch, useSelect } from '@wordpress/data';

import { Button } from '@wordpress/components';
import { SwiperSlide } from 'swiper/react';
import {__} from '@wordpress/i18n';
import { store as blockEditorStore } from '@wordpress/block-editor';
import classNames from 'classnames';
import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';

registerBlockType( 'full-page-slider/slide', {
	edit: ( { clientId, context, attributes, setAttributes } ) => {
		const { 
			title, 
			background
		} = attributes;

		// Fetch Context Values.
		const {
			["full-page-slider/activeSlide"]: activeSlide,
			["full-page-slider/showTitle"]: showTitle,
			["full-page-slider/titleAlignment"]: titleAlignment,
			["full-page-slider/stickToBottom"]: stickToBottom,
			["full-page-slider/enableSlideSettings"]: enableSlideSettings,
			["full-page-slider/enableContentAnimation"]: enableContentAnimation,
			["full-page-slider/contentAnimation"]: contentAnimation,
			["full-page-slider/contentAnimationDuration"]: contentAnimationDuration,
			["full-page-slider/contentAnimationDelay"]: contentAnimationDelay,
			["full-page-slider/titleColor"]: titleColor,
			["full-page-slider/titleBackground"]: titleBackground,
			["full-page-slider/contentColor"]: contentColor,
			["full-page-slider/contentBackground"]: contentBackground,
			["full-page-slider/titleTypography"]: titleTypography,
			["full-page-slider/contentTypography"]: contentTypography,
			["full-page-slider/titlePadding"]: titlePadding,
			["full-page-slider/contentPadding"]: contentPadding,
		} = context;

		// Compose all context values in one object.
		const parentValues = {
			showTitle,
			titleAlignment,
			stickToBottom,
			enableContentAnimation,
			contentAnimation,
			contentAnimationDuration,
			contentAnimationDelay,
			titleColor,
			titleBackground,
			contentColor,
			contentBackground,
			titleTypography,
			contentTypography,
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

		// Block index.
		const index = useSelect( ( select ) => {
			const { getBlockIndex } = select( blockEditorStore );
			return getBlockIndex( clientId ); // `clientId` is passed to every block
		}, [ clientId ] );

		/**
		 * Select parent when button clicked.
		 */
		const { getBlockRootClientId } = useSelect((select) => select(blockEditorStore), []);
		const { selectBlock }          = useDispatch(blockEditorStore);
		const parentClientId           = getBlockRootClientId(clientId);

		function makeParentActive() {
			if (parentClientId) {
				selectBlock(parentClientId);
			}
		}

		return (
			<>
				<InspectorControls>
					<Button
						variant="secondary"
						onClick={makeParentActive}
						style={{marginLeft: '20px'}}
						icon='admin-settings'
					>
						All Settings
					</Button>
				</InspectorControls>

				<SwiperSlide className="slide-block swiper-slide">
					<div { ...innerBlockProps }>
						<div
							className={classNames(
								'slide-content',
								(enableContentAnimation && index === activeSlide) ? `animate animate--${contentAnimation}` : ''
							)}
							style={{
								animationDuration: contentAnimationDuration + 'ms',
								animationDelay: contentAnimationDelay + 'ms',
								background: contentBackground,
								}}
							>
							{ showTitle && (
								<RichText
									tagName="h2"
									className='slide-title'
									value={ title }
									onChange={ ( newTitle ) => setAttributes( { title: newTitle } ) }
									placeholder={__("Give me a title…", 'full-page-slider')}
									style={{
										...getTypographyStyles(titleTypography),
										textAlign: titleAlignment,
										color: titleColor,
										padding: `${titlePadding?.top}${titlePadding?.unit} ${titlePadding?.right}${titlePadding?.unit} ${titlePadding?.bottom}${titlePadding?.unit} ${titlePadding?.left}${titlePadding?.unit}`
									}}
								/> )}

							<div className="slide-main"
								style={{
									flexGrow: stickToBottom ? 'unset' : 1,
									color: contentColor,
									padding: `${contentPadding?.top}${contentPadding?.unit} ${contentPadding?.right}${contentPadding?.unit} ${contentPadding?.bottom}${contentPadding?.unit} ${contentPadding?.left}${contentPadding?.unit}`,
									...getTypographyStyles(contentTypography),
								}}>
								<InnerBlocks />
							</div>
						</div>
					</div>
				</SwiperSlide>
			</>
		);
	},

	save: ( { attributes } ) => {
		const { 
			title, 
			background,
			parentAttributes
		} = attributes;

		const {
			showTitle,
			titleAlignment,
			stickToBottom,
			contentAnimation,
			contentAnimationDuration,
			contentAnimationDelay,
			titleColor,
			contentColor,
			contentBackground,
			titleTypography,
			contentTypography,
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
					<div className={`slide-content animate animate--${contentAnimation}`} style={{
						animationDuration: contentAnimationDuration + 'ms',
						animationDelay: contentAnimationDelay + 'ms',
						background: contentBackground
					}}>
						{ showTitle && title && (
							<h2
								className="slide-title"
								style={{
									...getTypographyStyles(titleTypography),
									textAlign: titleAlignment,
									color: titleColor,
									padding: `${titlePadding?.top}${titlePadding?.unit} ${titlePadding?.right}${titlePadding?.unit} ${titlePadding?.bottom}${titlePadding?.unit} ${titlePadding?.left}${titlePadding?.unit}`
								}}
							>
								{ title }
							</h2>
						)}
						<div
							className="slide-main"
							style={{
								...getTypographyStyles(contentTypography),
								flexGrow: stickToBottom ? 'unset' : 1,
								color: contentColor,
								padding: `${contentPadding?.top}${contentPadding?.unit} ${contentPadding?.right}${contentPadding?.unit} ${contentPadding?.bottom}${contentPadding?.unit} ${contentPadding?.left}${contentPadding?.unit}`
							}}	
						>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		);
	},
	usesContext: metadata.usesContext,
} );
