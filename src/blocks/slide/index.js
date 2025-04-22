import { InnerBlocks, InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

import { SwiperSlide } from 'swiper/react';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

registerBlockType( 'super-blocks/slide', {
	edit: ( { clientId, attributes, setAttributes } ) => {
		const { title, footer } = attributes;

		const parentAttributes = useSelect( ( select ) => {
			const { getBlockHierarchyRootClientId, getBlockAttributes } = select( 'core/block-editor' );

			const parentClientId = getBlockHierarchyRootClientId( clientId );
			if ( !parentClientId ) return {};

			return getBlockAttributes( parentClientId );
		}, [ clientId ] );

		const { showHeader, showFooter } = parentAttributes;

		return (
			<>
				<InspectorControls>
					No settings.
				</InspectorControls>

				<SwiperSlide className="slide-block swiper-slide">
					<div { ...useBlockProps() }>
						{ showHeader &&
							<RichText
								tagName="h2"
								className='slide-header'
								value={ title }
								onChange={ ( newTitle ) => setAttributes( { title: newTitle } ) }
								placeholder="Give me a title…"
							/> }

						<div className="slide-main">
							<InnerBlocks />
						</div>

						{ showFooter &&
							<RichText
								tagName="h2"
								className='slide-footer'
								value={ footer }
								onChange={ ( newFooter ) => setAttributes( { footer: newFooter } ) }
								placeholder="Give me a footnote..."
							/> }
					</div>
				</SwiperSlide>
			</>
		);
	},

	save: ( { attributes } ) => {
		const { title, showFooter } = attributes;

		return (
			<div className="slide-block swiper-slide">
				<div>
					<h2>{ title }</h2>
					<div className="slide-main">
						<InnerBlocks.Content />
					</div>
					{ showFooter && <div className="slide-footer">Footer content</div> }
				</div>
			</div>
		);
	},
} );
