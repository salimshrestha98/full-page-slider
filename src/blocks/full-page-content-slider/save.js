import './style.scss';

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Swiper, SwiperSlide } from 'swiper/react';

import { __ } from '@wordpress/i18n';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { getColorObjectByAttributeValues } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

// import Swiper core and required modules
export default function Save ( { attributes } ) {
	const {
		backgroundColor,
		textColor,
		align,
		style,
		colors,
	} = attributes;


	return (
		<div
			className="full-page-slider frontend"
			data-attrs={ JSON.stringify( attributes ) }
			style={
				{
					color: colors?.textColor || textColor
				}
			}
		>
			<div className='swiper'>
				<div className="swiper-wrapper">
					<InnerBlocks.Content />
				</div>
				<div class="swiper-pagination"></div>
				<div class="swiper-button-next"></div>
				<div class="swiper-button-prev"></div>

				<div class="swiper-scrollbar"></div>
			</div>
		</div >
	);
}
