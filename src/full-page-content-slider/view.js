import 'swiper/swiper-bundle.css';

import { Swiper } from "swiper";

// Wait for DOM to be ready
document.addEventListener( 'DOMContentLoaded', () => {
	const swiperContainers = document.querySelectorAll( '.swiper' );

	swiperContainers.forEach( ( swiperEl ) => {
		const attributes = JSON.parse( swiperEl.parentElement.dataset.attrs || '{}' );

		console.log( attributes );

		new Swiper( swiperEl, {
			direction: 'horizontal',
			loop: false,
			pagination: {
				el: swiperEl.querySelector( '.swiper-pagination' ),
				clickable: true,
			},
			navigation: {
				nextEl: swiperEl.querySelector( '.swiper-button-next' ),
				prevEl: swiperEl.querySelector( '.swiper-button-prev' ),
			},
		} );
	} );
} );