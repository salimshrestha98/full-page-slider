import './style.scss';
import './editor.scss';

import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import { Swiper } from 'swiper/react';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { useThemeColorResolver } from '../hooks/useThemeColorResolver';

export default function Edit ( { attributes, setAttributes } ) {

	const {
		backgroundColor,
		textColor,
		colors
	} = attributes;


	const TEMPLATE = [
		[ 'super-blocks/slide', { title: 'Slide 1' } ],
		[ 'super-blocks/slide', { title: 'Slide 2' } ],
		[ 'super-blocks/slide', { title: 'Slide 3' } ],
		[ 'super-blocks/slide', { title: 'Slide 4' } ],
	];

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			renderAppender: false,
			allowedBlocks: [ 'super-blocks/slide' ],
			template: TEMPLATE,
			templateLock: false
		}
	);

	useEffect( () => {
		document.querySelectorAll( '.swiper' ).forEach( ( swiper ) => {
			const wrapper = swiper.querySelector( '.swiper-wrapper' );

			if ( !wrapper ) return;

			const slides = swiper.querySelectorAll( ':scope > .swiper-slide' );

			slides.forEach( ( slide ) => {
				if ( slide.parentElement !== wrapper )
				{
					wrapper.appendChild( slide );
				}
			} );
		} );
	}, [] );


	const getColorFromSlug = useThemeColorResolver();

	useEffect( () => {
		if ( backgroundColor && backgroundColor.startsWith( 'accent' ) && ( getColorFromSlug( backgroundColor ) != colors?.backgroundColor ) )
		{
			setAttributes( {
				colors:
				{
					...colors,
					backgroundColor: getColorFromSlug( backgroundColor )
				}
			} );
		}

		if ( textColor && textColor.startsWith( 'accent' ) && ( getColorFromSlug( textColor ) != colors?.textColor ) )
		{
			setAttributes( {
				colors: {
					...colors,
					textColor: getColorFromSlug( textColor )
				}
			} );
		}
	}, [ backgroundColor, textColor ] );

	return (
		<div { ...blockProps } className={ `${ blockProps.className } full-page-slider` }>
			<Swiper
				modules={ [ Navigation, Pagination, Scrollbar, A11y ] }
				direction='horizontal'
				allowTouchMove={ true }
				simulateTouch={ true }
				touchStartPreventDefault={ false }
				touchStartForcePreventDefault={ false }
				initialSlide={ 0 }
				centeredSlides
				spaceBetween={ 50 }
				slidesPerView="auto"
				navigation
				pagination={ { clickable: true } }
				scrollbar={ { draggable: true } }
				onSwiper={ ( swiper ) => console.log( swiper ) }
				onSlideChange={ () => console.log( 'slide change' ) }
				{ ...innerBlocksProps }
			>
			</Swiper>
		</div>
	);
}
