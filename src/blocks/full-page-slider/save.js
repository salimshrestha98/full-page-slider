import './style.scss';

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { InnerBlocks, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Swiper, SwiperSlide } from 'swiper/react';

import { __ } from '@wordpress/i18n';
import { store as blockEditorStore } from '@wordpress/block-editor';
import classNames from 'classnames';
import { getBackgroundStyles, stableStringify } from '../../utilities';
import { getColorObjectByAttributeValues } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

// import Swiper core and required modules
export default function Save ( { attributes } ) {
	const {
		device,
		navigation,
		padding,
		background,
	} = attributes;

	const styles = {
		...getBackgroundStyles(background),
		padding: `${padding.top}${padding.unit} ${padding.right}${padding.unit} ${padding.bottom}${padding.unit} ${padding.left}${padding.unit}`,
	}

	const wrapperClassNames = classNames(
		'full-page-slider',
		'frontend',
		`preview-${device}`,
		`navigation-${navigation ? 'enabled' : 'disabled'}`
	);


	return (
		<div
			className={wrapperClassNames}
			data-attrs={ stableStringify( attributes ) }
			style={styles}
		>
			<div className='swiper'>
				<div className="swiper-wrapper">
					<InnerBlocks.Content />
				</div>
				<div className="swiper-pagination"></div>
				<div className="swiper-button-next"></div>
				<div className="swiper-button-prev"></div>

				<div className="swiper-scrollbar"></div>
			</div>
		</div >
	);
}
