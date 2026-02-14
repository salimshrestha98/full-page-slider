import 'swiper/swiper-bundle.css';

import {
	EffectCards,
	EffectCoverflow,
	EffectCreative,
	EffectCube,
	EffectFade,
	EffectFlip,
	Navigation,
	Pagination,
	Parallax,
	Scrollbar
} from 'swiper/modules';

import { Swiper } from "swiper";

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
	const sliderWrapper = document.querySelector('.full-page-slider.frontend');
	if (!sliderWrapper) return;

	const swiperEl = sliderWrapper.querySelector('.swiper');
	if (!swiperEl) return;

	const attributes = JSON.parse(sliderWrapper.dataset.attrs || '{}');
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
		parallaxEnabled,
	} = attributes;

	// Remove padding added by wp on block wrapper.
	if (sliderWrapper.parentElement) {
		sliderWrapper.parentElement.style.padding = 0;
	}

	if (forceFullScreen) {
		Object.assign(sliderWrapper.style, {
			position: 'fixed',
			top: '0',
			left: '0',
			width: '100%',
			height: '100vh',
			zIndex: 999999,
		});
		document.getElementsByTagName('body')[0].classList.remove('hide-until-ready');
	}

	const topOffset = swiperEl.getBoundingClientRect().top;
	const remainingHeight = window.innerHeight - topOffset;

	swiperEl.style.height = `${remainingHeight}px`;

	let swiperModules = [];

	// Add navigation/pagination/scrollbar modules
	if (navigation) swiperModules.push(Navigation);
	if (pagination) swiperModules.push(Pagination);
	if (scrollbar) swiperModules.push(Scrollbar);

	// Add effect modules
	if ('cube' === effect) swiperModules.push(EffectCube);
	if ('coverflow' === effect) swiperModules.push(EffectCoverflow);
	if ('flip' === effect) swiperModules.push(EffectFlip);
	if ('creative' === effect) swiperModules.push(EffectCreative);
	if ('fade' === effect) swiperModules.push(EffectFade);
	if ('cards' === effect) swiperModules.push(EffectCards);

	// Add Parallax module if any slide has parallax enabled
	const hasParallax = sliderWrapper.querySelector('[data-swiper-parallax]') ||
		sliderWrapper.querySelector('[data-swiper-parallax-x]') ||
		sliderWrapper.querySelector('[data-swiper-parallax-y]') ||
		parallaxEnabled;

	if (hasParallax) {
		swiperModules.push(Parallax);
	}

	// Build effect-specific config
	const getEffectConfig = (effectName) => {
		const configs = {
			creative: {
				creativeEffect: {
					prev: {
						shadow: true,
						translate: ['-120%', 0, -500],
					},
					next: {
						shadow: true,
						translate: ['120%', 0, -500],
					},
				},
			},
			cube: {
				cubeEffect: {
					shadow: true,
					slideShadows: true,
					shadowOffset: 20,
					shadowScale: 0.94,
				},
			},
			coverflow: {
				coverflowEffect: {
					rotate: 30,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: true,
				},
			},
			flip: {
				flipEffect: {
					slideShadows: true,
					limitRotation: true,
				},
			},
			fade: {
				fadeEffect: {
					crossFade: true,
				},
			},
			cards: {
				cardsEffect: {
					slideShadows: true,
					perSlideOffset: 8,
					perSlideRotate: 2,
				},
			},
		};
		return configs[effectName] || {};
	};

	const swiperArgs = {
		modules: swiperModules,
		direction: direction || 'horizontal',
		allowTouchMove: true,
		simulateTouch: true,
		touchStartPreventDefault: false,
		touchStartForcePreventDefault: false,
		initialSlide: 0,
		centeredSlides: true,
		loop: !!loop,
		slidesPerView: 1,
		effect: effect || 'slide',
		speed: speed || 300,
		parallax: hasParallax,
		navigation: navigation ? {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		} : false,
		pagination: pagination ? {
			el: '.swiper-pagination',
			clickable: true
		} : false,
		scrollbar: scrollbar ? {
			el: '.swiper-scrollbar',
			draggable: true
		} : false,
		...getEffectConfig(effect),
		on: {
			init: (swiper) => {
				// Handle video backgrounds - pause all, play active
				handleVideoBackgrounds(swiper);
			},
			slideChangeTransitionStart: (swiper) => {
				const activeSlide = swiper.slides[swiper.activeIndex];
				const content = activeSlide.querySelector('.slide-content');

				if (content && enableContentAnimation) {
					content.classList.remove('animate', `animate--${contentAnimation}`);
					void content.offsetWidth;
					content.classList.add('animate', `animate--${contentAnimation}`);
				}

				// Handle video backgrounds
				handleVideoBackgrounds(swiper);
			}
		}
	};

	new Swiper(swiperEl, swiperArgs);

	/**
	 * Handle video backgrounds - pause inactive, play active
	 */
	function handleVideoBackgrounds(swiper) {
		// Pause all videos first
		const allVideos = swiperEl.querySelectorAll('.fps-video-background video');
		allVideos.forEach(video => {
			video.pause();
		});

		// Play video in active slide
		const activeSlide = swiper.slides[swiper.activeIndex];
		if (activeSlide) {
			const activeVideo = activeSlide.querySelector('.fps-video-background video');
			if (activeVideo) {
				activeVideo.play().catch(() => {
					// Autoplay was prevented, likely due to browser policies
					// Video will show poster image instead
				});
			}
		}
	}
});
