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
	const sliderWrapper = document.querySelector( '.full-page-slider.frontend' );
	const swiperEl      = sliderWrapper.querySelector( '.swiper' );
	const attributes    = JSON.parse( sliderWrapper.dataset.attrs || '{}' );
	const {
		enableContentAnimation,
		contentAnimation,
		direction,
		navigation,
		pagination,
		scrollbar,
		effect,
		speed,
		loop,
		padding,
		bgColor,
		forceFullScreen,
	} = attributes;

	// Remove padding added by wp on block wrapper.
	sliderWrapper.parentElement.style.padding = 0;

	if ( forceFullScreen) {
		console.log( 'force fullscreen activated.' );
		Object.assign(sliderWrapper.style, {
			position: 'fixed',
			top: '0',
			left: '0',
			width: '100%',
			height: '100vh',
			zIndex: 999999,
		});
		document.getElementsByTagName( 'body' )[ 0 ].classList.remove('hide-until-ready');
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
		},
		on: {
			slideChangeTransitionStart: (swiper) => {
				const activeSlide = swiper.slides[swiper.activeIndex];
				const content = activeSlide.querySelector('.slide-content');

				if (content && enableContentAnimation) {
					content.classList.remove('animate', `animate--${contentAnimation}`);
					void content.offsetWidth;
					content.classList.add('animate', `animate--${contentAnimation}`);
				}
			}
		}
	};

	new Swiper( swiperEl, swiperArgs );
} );