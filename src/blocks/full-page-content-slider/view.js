import 'swiper/swiper-bundle.css';

import {
	EffectCoverflow,
	EffectCreative,
	EffectCube,
	EffectFlip,
	Navigation,
	Pagination,
	Scrollbar
} from 'swiper/modules';

import { Swiper } from "swiper";

// Wait for DOM to be ready
document.addEventListener( 'DOMContentLoaded', () => {
	const sliderWrappers = document.querySelectorAll( '.full-page-slider.frontend' );

	sliderWrappers.forEach( ( sliderWrapper ) => {
		const swiperEl = sliderWrapper.querySelector( '.swiper' );

		const attributes = JSON.parse( sliderWrapper.dataset.attrs || '{}' );
		const { direction,
			navigation,
			pagination,
			scrollbar,
			effect,
			speed,
			loop,
			padding,
			backgroundColor
		} = attributes;

		// Remove padding added by wp on block wrapper.
		sliderWrapper.parentElement.style.padding = 0;

		if ( backgroundColor )
		{
			document.getElementsByTagName( 'body' )[ 0 ].style.backgroundColor = backgroundColor;
		}

		const topOffset = swiperEl.getBoundingClientRect().top;
		const remainingHeight = window.innerHeight - topOffset;

		swiperEl.style.height = `${ remainingHeight }px`;
		swiperEl.querySelector( '.slide-main' ).style.maxHeight = `${ remainingHeight - 120 }px`

		let swiperModules = [];

		if ( navigation ) swiperModules.push( Navigation );
		if ( pagination ) swiperModules.push( Pagination );
		if ( scrollbar ) swiperModules.push( Scrollbar );
		if ( 'cube' === effect ) swiperModules.push( EffectCube );
		if ( 'coverflow' === effect ) swiperModules.push( EffectCoverflow );
		if ( 'flip' === effect ) swiperModules.push( EffectFlip );
		if ( 'creative' === effect ) swiperModules.push( EffectCreative );

		const swiperArgs = {
			modules: swiperModules,
			direction: direction,
			allowTouchMove: true,
			simulateTouch: true,
			touchStartPreventDefault: false,
			touchStartForcePreventDefault: false,
			initialSlide: 0,
			centeredSlides: true,
			spaceBetween: 50,
			slidesPerView: "auto",
			direction: direction || 'horizontal',
			loop: !!loop,
			slidesPerView: 1,
			effect: effect || 'slide',
			speed: speed,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true
			}
		};

		new Swiper( swiperEl, swiperArgs );
	} );
} );