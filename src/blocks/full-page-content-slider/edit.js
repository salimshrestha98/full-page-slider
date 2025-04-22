import {
	__experimentalBoxControl as BoxControl,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';
import {
	ColorPalette,
	InspectorControls,
	PanelColorSettings,
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
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

import { BlockControls } from '@wordpress/block-editor';
import { Swiper } from 'swiper';
import { __ } from '@wordpress/i18n';
import { useThemeColorResolver } from '../../hooks/useThemeColorResolver';

export default function Edit ( { clientId, attributes, setAttributes } ) {

	const {
		backgroundColor,
		textColor,
		colors,
		previewMode,
		direction,
		effect,
		speed,
		padding,
		navigation,
		pagination,
		loop,
		scrollbar,
		showHeader,
		showFooter
	} = attributes;


	const TEMPLATE = [
		[ 'super-blocks/slide', { title: 'Slide 1' } ],
		[ 'super-blocks/slide', { title: 'Slide 2' } ],
		[ 'super-blocks/slide', { title: 'Slide 3' } ],
		[ 'super-blocks/slide', { title: 'Slide 4' } ],
	];

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
			backgroundColor,
			padding: padding + 'px'
		}
	} );
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
	const setInitialSlide = useRef( null );

	useEffect( () => {
		let swiperModules = [];

		if ( navigation ) swiperModules.push( Navigation );
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
		slideCount
	] );

	const { insertBlock, removeBlock } = useDispatch( blockEditorStore );
	const { getBlockOrder } = useSelect(
		( select ) => select( blockEditorStore ),
		[]
	);

	function addSlide () {
		const activeSlideIndex = swiperRef.current.activeIndex || 0;
		const slideBlock = wp.blocks.createBlock( 'super-blocks/slide' );
		insertBlock( slideBlock, activeSlideIndex + 1, clientId, false );
		setInitialSlide.current = activeSlideIndex + 1;
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

					<ToggleControl
						label="Show Header"
						checked={ showHeader }
						onChange={ ( value ) => setAttributes( { showHeader: value } ) }
					/>

					<ToggleControl
						label="Show Footer"
						checked={ showFooter }
						onChange={ ( value ) => setAttributes( { showFooter: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( "Styles", 'super-blocks' ) }>
					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label="Spacing"
						value={ padding }
						onChange={ ( newPadding ) => setAttributes( { padding: newPadding } ) }
						min={ 0 }
						max={ 50 }
					/>

					<PanelColorSettings
						title="Color Settings"
						initialOpen={ true }
						colorSettings={ [
							{
								value: backgroundColor,
								onChange: ( background ) => setAttributes( { backgroundColor: background } ),
								label: 'Background Color'
							}
						] }
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

				<div className="floating-buttons-container">
					<div>
						<button title="Add New Slide" className='add-slide-btn' onClick={ addSlide }><span className="dashicons dashicons-plus-alt2"></span></button>
						<button title="Delete Slide" className='delete-slide-btn' onClick={ deleteSlide }><span className="dashicons dashicons-trash"></span></button>
					</div>
				</div>

			</div>
		</>
	);
}
