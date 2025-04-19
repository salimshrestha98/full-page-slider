import './style.scss';
import './editor.scss';

import {
	EffectCards,
	EffectCoverflow,
	EffectCreative,
	EffectCube,
	EffectFlip,
	Navigation,
	Pagination,
	Scrollbar
} from 'swiper/modules';
import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';

import { Swiper } from 'swiper';
import { __ } from '@wordpress/i18n';
import { useThemeColorResolver } from '../hooks/useThemeColorResolver';

export default function Edit ( { attributes, setAttributes } ) {

	const {
		backgroundColor,
		textColor,
		colors,
		previewMode,
		direction,
		effect,
		speed,
		navigation,
		pagination,
		loop,
		scrollbar
	} = attributes;


	const TEMPLATE = [
		[ 'super-blocks/slide', { title: 'Slide 1' } ],
		[ 'super-blocks/slide', { title: 'Slide 2' } ],
		[ 'super-blocks/slide', { title: 'Slide 3' } ],
		[ 'super-blocks/slide', { title: 'Slide 4' } ],
	];

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'swiper-wrapper' },
		{
			allowedBlocks: [ 'super-blocks/slide' ],
			template: TEMPLATE,
			templateLock: false
		}
	);



	/**
	 * Convert theme palette color into proper hex format to use later in frontend.
	 */
	const getColorFromSlug = useThemeColorResolver();

	useEffect( () => {
		if (
			backgroundColor &&
			backgroundColor.startsWith( 'accent' ) &&
			( getColorFromSlug( backgroundColor ) != colors?.backgroundColor )
		)
		{
			setAttributes( {
				colors:
				{
					...colors,
					backgroundColor: getColorFromSlug( backgroundColor )
				}
			} );
		}

		if (
			textColor &&
			textColor.startsWith( 'accent' ) &&
			( getColorFromSlug( textColor ) != colors?.textColor )
		)
		{
			setAttributes( {
				colors: {
					...colors,
					textColor: getColorFromSlug( textColor )
				}
			} );
		}
	}, [ backgroundColor, textColor ] );



	/**
	 * Handle Swiper initialization and loading.
	 */

	const swiperRef = useRef( null );
	const containerRef = useRef( null );

	useEffect( () => {
		let swiperModules = [];

		if ( navigation ) swiperModules.push( Navigation );
		if ( pagination ) swiperModules.push( Pagination );
		if ( scrollbar ) swiperModules.push( Scrollbar );
		if ( 'cube' === effect ) swiperModules.push( EffectCube );
		if ( 'coverflow' === effect ) swiperModules.push( EffectCoverflow );
		if ( 'flip' === effect ) swiperModules.push( EffectFlip );
		if ( 'creative' === effect ) swiperModules.push( EffectCreative );
		if ( 'cards' === effect ) swiperModules.push( EffectCards );

		if ( swiperRef.current )
		{
			swiperRef.current.destroy( true, true );
		}

		const swiperArgs = {
			modules: swiperModules,
			direction: direction,
			allowTouchMove: false,
			simulateTouch: false,
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

		swiperRef.current = new Swiper( containerRef.current, swiperArgs );

	}, [ direction, loop, pagination, navigation, scrollbar, effect, speed ] );


	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( "General", 'super-blocks' ) }>
					<SelectControl
						label="Preview Mode"
						value={ previewMode }
						options={ [
							{ label: 'Smartphone', value: 'smartphone' },
							{ label: 'Tablet', value: 'tablet' },
							{ label: 'Desktop', value: 'desktop' }
						] }
						onChange={ ( value ) => setAttributes( { previewMode: value } ) }
					/>
				</PanelBody>

				<PanelBody title="Slider" initialOpen={ false }>
					<SelectControl
						label="Direction"
						value={ direction }
						options={ [
							{ label: 'Horizontal', value: 'horizontal' },
							{ label: 'Vertical', value: 'vertical' },
						] }
						onChange={ ( value ) => setAttributes( { direction: value } ) }
					/>

					<SelectControl
						label="Slide Effect"
						value={ effect }
						options={ [
							{ label: 'Slide', value: 'slide' },
							{ label: 'Cube', value: 'cube' },
							{ label: 'Coverflow', value: 'coverflow' },
							{ label: 'Flip', value: 'flip' },
							{ label: 'Cards', value: 'cards' },
						] }
						onChange={ ( value ) => setAttributes( { effect: value } ) }
					/>

					<RangeControl
						label="Slide Speed (ms)"
						value={ speed }
						onChange={ ( newSpeed ) => setAttributes( { speed: newSpeed } ) }
						min={ 100 }
						max={ 1000 }
						step={ 100 }
					/>

					<label className="sb-setting-label">{ __( "Enable Prev/Next Buttons", 'super-blocks' ) }</label>
					<ToggleControl
						checked={ navigation }
						onChange={ ( value ) => setAttributes( { navigation: value } ) }
					/>

					<label className="sb-setting-label">{ __( "Enable Pagination", 'super-blocks' ) }</label>
					<ToggleControl
						checked={ pagination }
						onChange={ ( value ) => setAttributes( { pagination: value } ) }
					/>

					<label className="sb-setting-label">{ __( "Enable Scrollbar", 'super-blocks' ) }</label>
					<ToggleControl
						checked={ scrollbar }
						onChange={ ( value ) => setAttributes( { scrollbar: value } ) }
					/>

					<label className="sb-setting-label">{ __( "Loop Slides", 'super-blocks' ) }</label>
					<ToggleControl
						checked={ loop }
						onChange={ ( value ) => setAttributes( { loop: value } ) }
					/>

				</PanelBody>
			</InspectorControls>

			<div { ...blockProps } className={ `${ blockProps.className } full-page-slider` }>
				<div className="swiper" ref={ containerRef }>
					<div { ...innerBlocksProps }>
					</div>

					{ navigation && (
						<>
							<div className="swiper-button-next"></div>
							<div className="swiper-button-prev"></div>
						</>
					) }

					{ pagination && (
						<div className="swiper-pagination"></div>
					) }

					{ scrollbar && (
						<div className="swiper-scrollbar"></div>
					) }
				</div>
			</div>
		</>
	);
}
