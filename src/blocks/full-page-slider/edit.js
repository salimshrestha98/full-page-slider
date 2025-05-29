import {
	__experimentalBoxControl as BoxControl,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';
import {ChooseControl, TypographyControl} from '../../components';
import {
	ColorPalette,
	InspectorControls,
	PanelColorSettings,
	TextAlignmentControl,
	store as blockEditorStore,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	EffectCoverflow,
	EffectCreative,
	EffectCube,
	EffectFlip,
	Navigation,
	Pagination,
	Scrollbar
} from 'swiper/modules';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { justifyCenter, justifyLeft, justifyRight } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

import { BlockControls } from '@wordpress/block-editor';
import DimensionsControl from '../../components/DimensionsControl/DimensionsControl';
import { Swiper } from 'swiper';
import TEMPLATE from './template';
import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { useThemeColorResolver } from '../../hooks/useThemeColorResolver';

export default function Edit ( { clientId, attributes, setAttributes } ) {

	const {
		colors,
		device,
		direction,
		effect,
		speed,
		padding,
		navigation,
		pagination,
		loop,
		scrollbar,
		showTitle,
		stickToBottom,
		forceFullScreen,
		titleAlignment,
		titleColor,
		bgColor,
		contentColor,
		typography
	} = attributes;

	const slideCount = useSelect(
		( select ) => {
			const { getBlock, getBlockOrder } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return block?.innerBlocks?.length || 0;
		},
		[ clientId ]
	);

	const blockProps = useBlockProps( {
		style: {
			background: bgColor,
		}
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'swiper-wrapper',
		},
		{
			allowedBlocks: [ 'full-page-slider/slide' ],
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
			bgColor &&
			bgColor.startsWith( 'accent' ) &&
			( getColorFromSlug( bgColor ) != colors?.bgColor )
		)
		{
			setAttributes( {
				colors:
				{
					...colors,
					bgColor: getColorFromSlug( bgColor )
				}
			} );
		}

		if (
			contentColor &&
			contentColor.startsWith( 'accent' ) &&
			( getColorFromSlug( contentColor ) != colors?.contentColor )
		)
		{
			setAttributes( {
				colors: {
					...colors,
					contentColor: getColorFromSlug( contentColor )
				}
			} );
		}
	}, [ bgColor, contentColor ] );



	/**
	 * Handle Swiper initialization and loading.
	 */
	const swiperRef = useRef( null );
	const containerRef = useRef( null );
	const setInitialSlide = useRef( null );

	useEffect( () => {
		let swiperModules = [];

		swiperModules.push( Navigation );
		if ( pagination ) swiperModules.push( Pagination );
		if ( scrollbar ) swiperModules.push( Scrollbar );
		if ( 'cube' === effect ) swiperModules.push( EffectCube );
		if ( 'coverflow' === effect ) swiperModules.push( EffectCoverflow );
		if ( 'flip' === effect ) swiperModules.push( EffectFlip );
		if ( 'creative' === effect ) swiperModules.push( EffectCreative );

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
			initialSlide: setInitialSlide.current || 0,
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
		setInitialSlide.current = null;

	}, [
		direction,
		loop,
		pagination,
		navigation, scrollbar,
		effect,
		speed,
		slideCount,
		padding
	] );

	const { insertBlock, removeBlock } = useDispatch( blockEditorStore );
	const { getBlockOrder, getBlock } = useSelect(
		( select ) => select( blockEditorStore ),
		[]
	);

	function addSlide () {
		const activeSlideIndex = swiperRef.current.activeIndex || 0;
		const slideBlock = wp.blocks.createBlock( 'full-page-slider/slide' );
		insertBlock( slideBlock, activeSlideIndex + 1, clientId, false );
		setInitialSlide.current = activeSlideIndex + 1;
	}

	function duplicateSlide () {
		const activeSlideIndex = swiperRef.current.activeIndex || 0;
		const slideBlockOrder = getBlockOrder( clientId );
		const slideClientId = slideBlockOrder[ activeSlideIndex ];
		const activeSlideBlock = getBlock( slideClientId );

		if ( activeSlideBlock )
		{
			const duplicateSlideBlock = wp.blocks.createBlock( activeSlideBlock.name, {
				...activeSlideBlock.attributes,
				title: activeSlideBlock.attributes.title + ' Copy'
			}, activeSlideBlock.innerBlocks );

			insertBlock( duplicateSlideBlock, activeSlideIndex + 1, clientId, false );
			setInitialSlide.current = activeSlideIndex + 1;
		}
	}

	function deleteSlide () {
		const activeSlideIndex = swiperRef.current.activeIndex;
		const slideBlockOrder = getBlockOrder( clientId );
		const slideClientId = slideBlockOrder[ activeSlideIndex ];

		if ( slideClientId )
		{
			removeBlock( slideClientId );
		}
	}

	function handleAdd () {
		console.log( 'add' );
	}

	function handleDelete () {
		console.log( 'delete' );
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( "General", 'full-page-slider' ) }>
					<SelectControl
						label="Preview"
						value={ device }
						options={ [
							{ label: 'Desktop', value: 'desktop' },
							{ label: 'Tablet', value: 'tablet' },
							{ label: 'Mobile', value: 'mobile' },
						] }
						onChange={ ( value ) => setAttributes( { device: value } ) }
					/>

					<ToggleControl
						label="Show Title"
						checked={ showTitle }
						onChange={ ( value ) => setAttributes( { showTitle: value } ) }
					/>

					{ showTitle && (
						<ChooseControl
							label="Title Alignment"
							value={titleAlignment}
							onChange={(val) => setAttributes({ titleAlignment: val })}
							options={[
								{ value: 'left', label: 'Align Left', icon: justifyLeft },
								{ value: 'center', label: 'Align Center', icon: justifyCenter },
								{ value: 'right', label: 'Align Right', icon: justifyRight },
							]}
						/>
					)}

					<ToggleControl
						label="Stick Content to Bottom"
						checked={ stickToBottom }
						onChange={ ( value ) => setAttributes( { stickToBottom: value } ) }
					/>

					<ToggleControl
						label="Force Fullscreen"
						checked={ forceFullScreen }
						onChange={ ( value ) => setAttributes( { forceFullScreen: value } ) }
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

					<label className="sb-setting-label">{ __( "Enable Prev/Next Buttons", 'full-page-slider' ) }</label>
					<ToggleControl
						checked={ navigation }
						onChange={ ( value ) => setAttributes( { navigation: value } ) }
					/>

					{ !navigation && (<p><i>Prev/Next Button will be disabled on frontend only.</i></p>)}

					<label className="sb-setting-label">{ __( "Enable Pagination", 'full-page-slider' ) }</label>
					<ToggleControl
						checked={ pagination }
						onChange={ ( value ) => setAttributes( { pagination: value } ) }
					/>

					<label className="sb-setting-label">{ __( "Enable Scrollbar", 'full-page-slider' ) }</label>
					<ToggleControl
						checked={ scrollbar }
						onChange={ ( value ) => setAttributes( { scrollbar: value } ) }
					/>

					<label className="sb-setting-label">{ __( "Loop Slides", 'full-page-slider' ) }</label>
					<ToggleControl
						checked={ loop }
						onChange={ ( value ) => setAttributes( { loop: value } ) }
					/>

				</PanelBody>

				<PanelBody title={ __( "Color", 'full-page-slider' ) } initialOpen={false}>
				<PanelColorSettings
					title={__('Choose Colors', 'full-page-slider')}
					colorSettings={ [
						{
							value: titleColor,
							onChange: ( color ) => setAttributes( { titleColor: color } ),
							label: 'Title Color'
						},
						{
							value: bgColor,
							onChange: ( color ) => setAttributes( { bgColor: color } ),
							label: 'Background Color'
						},
						{
							value: contentColor,
							onChange: ( color ) => setAttributes( { contentColor: color } ),
							label: 'Content Color'
						},
					] }
				/>
				</PanelBody>

				<PanelBody title={ __( "Typography", 'full-page-slider' ) } initialOpen={false}>
					<TypographyControl
						label="Some Typography"
						value={typography}
						onChange={(val) => setAttributes({ typography: val })}
					/>
				</PanelBody>

				<PanelBody title={ __( "Spacing", 'full-page-slider' ) } initialOpen={false}>
					<DimensionsControl
						label="Padding"
						value={padding}
						onChange={(newVal) => setAttributes({ padding: newVal })}
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ <span className="dashicons dashicons-plus-alt2"></span> }
						label="Add New Slide"
						onClick={ handleAdd }
					/>
					<ToolbarButton
						icon={ <span className="dashicons dashicons-trash"></span> }
						label="Delete Slide"
						onClick={ handleDelete }
						isDestructive
					/>
				</ToolbarGroup>
			</BlockControls>

			<div { ...blockProps } className={ `${ blockProps.className } full-page-slider preview-${ device }` }>
				<div className="swiper" ref={ containerRef }>
					<div { ...innerBlocksProps }>
					</div>

					{/* Always  provide navigation buttons in editor for ease. */}
					<div className="swiper-button-next"></div>
					<div className="swiper-button-prev"></div>

					{ pagination && (
						<div className="swiper-pagination"></div>
					) }

					{ scrollbar && (
						<div className="swiper-scrollbar"></div>
					) }
				</div>

				<div className="floating-buttons-container">
					<div>
						<button title="Add New Slide" className='add-slide-btn' onClick={ addSlide }><span className="dashicons dashicons-plus-alt2"></span></button>
						<button title="Duplicate Slide" className='duplicate-slide-btn' onClick={ duplicateSlide }><span className="dashicons dashicons-admin-page"></span></button>
						<button title="Delete Slide" className='delete-slide-btn' onClick={ deleteSlide }><span className="dashicons dashicons-trash"></span></button>
					</div>
				</div>

			</div>
		</>
	);
}
