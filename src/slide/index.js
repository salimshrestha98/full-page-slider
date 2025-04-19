import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

import { SwiperSlide } from 'swiper/react';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'super-blocks/slide', {
	edit: ( { attributes, setAttributes } ) => {
		const { title, showFooter } = attributes;

		return (
			<>
				<InspectorControls>
					<PanelBody title="Slide Settings">
						<TextControl
							label="Slide Title"
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
						<ToggleControl
							label="Show Footer"
							checked={ showFooter }
							onChange={ ( value ) => setAttributes( { showFooter: value } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<SwiperSlide className="slide-block swiper-slide">
					<div { ...useBlockProps() }>
						<h2>{ title }</h2>
						<div className="slide-main">
							<InnerBlocks />
						</div>
						{ showFooter && <div className="slide-footer">Footer content</div> }
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
