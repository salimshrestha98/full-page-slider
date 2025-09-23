import './hooks.js';
import { InnerBlocks, InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { getBackgroundStyles, getTypographyStyles, loadGoogleFont } from '../../utilities';
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
import SlideInspectorControls from './inspector';

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

        let localAttributes = applyFilters('fpslider.slide.localAttributes', attributes.parentAttributes, attributes);

        const {
            showTitle,
            alignContent,
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

		// Map alignContent to flexbox values
		const justifyContentMap = {
			top: 'flex-start',
			center: 'center',
			bottom: 'flex-end',
			cover: 'stretch',
		};
		const justifyContent = justifyContentMap[alignContent] || 'flex-start';
		const flexGrow = alignContent === 'cover' ? 1 : 'unset';

		/**
		 * APPLY STYLES TO BLOCK.
		 */
		const innerBlockProps = useBlockProps({
			style: applyFilters('fpslider.slide.blockStyles', {
				justifyContent,
				...getBackgroundStyles(background)
			})
		});

		// Block index.
		const index = useSelect( ( select ) => {
			const { getBlockIndex } = select( blockEditorStore );
			return getBlockIndex( clientId ); // `clientId` is passed to every block
		}, [ clientId ] );

        // Load Google fonts when typography settings are available
        useEffect(() => {
            if (titleTypography?.fontFamily) {
                loadGoogleFont(titleTypography.fontFamily);
            }
            if (contentTypography?.fontFamily) {
                loadGoogleFont(contentTypography.fontFamily);
            }
        }, [titleTypography?.fontFamily, contentTypography?.fontFamily]);

		return (
			<>
				<SlideInspectorControls
					attributes={localAttributes}
					setAttributes={setAttributes}
				/>

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
									flexGrow,
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
			alignContent,
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

		// Map alignContent to flexbox values
		const justifyContentMap = {
			top: 'flex-start',
			center: 'center',
			bottom: 'flex-end',
			cover: 'stretch',
		};
		const justifyContent = justifyContentMap[alignContent] || 'flex-start';
		const flexGrow = alignContent === 'cover' ? 1 : 'unset';

		return (
			<div className="slide-block swiper-slide">
				<div style={{
					...backgroundStyles,
					justifyContent,
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
								flexGrow,
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
