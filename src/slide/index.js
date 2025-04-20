import { InnerBlocks, InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

import { SwiperSlide } from 'swiper/react';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'super-blocks/slide', {
	edit: ( { attributes, setAttributes } ) => {
		const { title, footer, showHeader, showFooter } = attributes;

		return (
			<>
				<InspectorControls>
					<PanelBody title="General">
						<ToggleControl
							label="Show Header"
							checked={ showHeader }
							onChange={ ( value ) => setAttributes( { showHeader: value } ) }
						/>
						<ToggleControl
							label="Show Footer"
							checked={ showFooter }
							onChange={ ( value ) => setAttributes( { showFooter: value } ) }
						/>
					</PanelBody>

					{ showHeader && (
						<PanelBody title="Header" initialOpen={ false }>
						</PanelBody>
					) }

					{ showFooter && (
						<PanelBody title="Footer" initialOpen={ false }>
						</PanelBody>
					) }

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
							// allowedFormats={ [ 'core/bold', 'core/italic' ] }
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
							// allowedFormats={ [ 'core/bold', 'core/italic' ] }
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
