import { InnerBlocks, InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { getBackgroundStyles, getTypographyStyles } from '../../utilities';
import { useDispatch, useSelect } from '@wordpress/data';

import { Button } from '@wordpress/components';
import { SwiperSlide } from 'swiper/react';
import {__} from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { store as blockEditorStore } from '@wordpress/block-editor';
import classNames from 'classnames';
import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';

registerBlockType( 'full-page-slider/slide', {
	edit: ( { clientId, context, attributes, setAttributes } ) => {
		// Dynamically extract all full-page-slider/* context values
        const parentValues = Object.fromEntries(
            Object.entries(context)
                .filter(([key]) => key.startsWith('full-page-slider/'))
                .map(([key, value]) => [key.replace('full-page-slider/', ''), value])
        );

		// Mirror context values to 'parentsAttribute'.
		useEffect(() => {
			setAttributes({ parentAttributes: parentValues });
		}, [JSON.stringify(parentValues)]); // dependency to avoid infinite loop

        let localAttributes = applyFilters('fps.slide.localAttributes', attributes.parentAttributes, attributes);

        const {
            showTitle,
            stickToBottom,
            background,
            enableContentAnimation,
            contentAnimation,
            contentAnimationDuration,
            contentAnimationDelay,
            titleTypography,
            titleAlignment,
            titlePadding,
            titleColor,
            contentPadding,
            contentTypography,
            contentColor,
            contentBackground
        } = localAttributes;

		/**
		 * APPLY STYLES TO BLOCK.
		 */
		const innerBlockProps = useBlockProps({
			style: applyFilters('fps.slide.blockStyles', {
				justifyContent: stickToBottom ? 'flex-end' : 'flex-start',
				...getBackgroundStyles(background)
			})
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
                        size="compact"
						variant="secondary"
						onClick={makeParentActive}
						style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            marginTop: '12px',
                            marginRight: '15px'
                        }}
						icon='admin-settings'
					>
						{__('Slider Settings', 'full-page-slider')}
					</Button>
				</InspectorControls>

				<SwiperSlide className="slide-block swiper-slide">
					<div { ...innerBlockProps }>
						<div
							className={classNames(
								'slide-content',
								(enableContentAnimation && index === parentValues.activeSlide) ? `animate animate--${contentAnimation}` : ''
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
									value={ attributes.title }
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
									flexGrow: parentValues.stickToBottom ? 'unset' : 1,
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
					justifyContent: parentAttributes.stickToBottom ? 'flex-end' : 'flex-start',
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
								flexGrow: parentAttributes.stickToBottom ? 'unset' : 1,
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
