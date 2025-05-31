import {BackgroundControl, ChooseControl, TypographyControl} from '../../components';
import {
	__experimentalBoxControl as BoxControl,
	Button,
	Flex,
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
import { desktop, justifyCenter, justifyLeft, justifyRight, mobile, tablet } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

import { BlockControls } from '@wordpress/block-editor';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import DimensionsControl from '../../components/DimensionsControl/DimensionsControl';
import { Swiper } from 'swiper';
import TEMPLATE from './template';
import { __ } from '@wordpress/i18n';
import { getBackgroundStyles } from '../../utilities';
import { useState } from 'react';
import { useThemeColorResolver } from '../../hooks/useThemeColorResolver';

export default function Edit ( { clientId, attributes, setAttributes } ) {

	const {
		activeSlide,
		device,
		showTitle,
		stickToBottom,
		forceFullScreen,
		titleAlignment,
		direction,
		effect,
		speed,
		navigation,
		pagination,
		loop,
		scrollbar,
		enableContentAnimation,
		contentAnimation,
		contentAnimationDuration,
		contentAnimationDelay,
		titleColor,
		titleBackground,
		contentColor,
		contentBackground,
		background,
		titleTypography,
		contentTypography,
		titlePadding,
		contentPadding,
		padding,
	} = attributes;

	const slideCount = useSelect(
		( select ) => {
			const { getBlock, getBlockOrder } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return block?.innerBlocks?.length || 0;
		},
		[ clientId ]
	);

	const backgroundStyles = getBackgroundStyles(background);

	const blockProps = useBlockProps( {
		style: {
			...backgroundStyles,
			padding: `${padding.top}${padding.unit} ${padding.right}${padding.unit} ${padding.bottom}${padding.unit} ${padding.left}${padding.unit}`,
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

		// Sync with activeSlide attribute.
		const updateIndex = () => {
			setAttributes({ activeSlide: swiperRef.current.activeIndex });
		};

		swiperRef.current.on('slideChange', updateIndex);

		// Cleanup
		return () => {
			swiperRef.current.off('slideChange', updateIndex);
		}

	}, [
		direction,
		loop,
		pagination,
		navigation,
		scrollbar,
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
		const slideBlock = wp.blocks.createBlock(
			'full-page-slider/slide',
			{title: 'New Slide'},
			[
				wp.blocks.createBlock('core/paragraph', { placeholder: 'Start your first sentence here or add any blocks you want...' }),
			],
		);
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

	/**
	 * Handler to close the first timer notice if user clicks on close button.
	 */
	const [hideFirstTimeNotice, setHideFirstTimeNotice] = useState(fullPageSliderL10n.hideFirstTimeNotice);

	function closeFirstTimeNotice() {
		setHideFirstTimeNotice(true);
		fetch(fullPageSliderL10n.ajaxURL + '?action=disable_first_time_notice').catch(() => {});
	}

	return (
		<>
			<InspectorControls>
				{!hideFirstTimeNotice && (
					<Flex style={{alignItems: 'flex-start'}}>
						<p style={{padding: '0 18px'}}><em>Using for the first time? Check out our guide <a href="#">here</a>.</em></p>
						<Button
							icon="no-alt"
							title={__('Close Forever', 'full-page-slider')}
							onClick={() => closeFirstTimeNotice()}
							isDestructive
						/>
					</Flex>
				)}
				<PanelBody title={ __( "General", 'full-page-slider' ) } initialOpen={false}>
					<ChooseControl
							label="Preview"
							value={device}
							onChange={(val) => setAttributes({ device: val })}
							options={ [
							{ label: 'Desktop', value: 'desktop', icon: desktop },
							{ label: 'Tablet', value: 'tablet', icon: tablet },
							{ label: 'Mobile', value: 'mobile', icon: mobile },
						] }
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

					<ToggleControl
						label={ __( "Enable Prev/Next Buttons", 'full-page-slider' )}
						checked={ navigation }
						onChange={ ( value ) => setAttributes( { navigation: value } ) }
					/>

					{ !navigation && (<p><i>Prev/Next Button will be disabled on frontend only.</i></p>)}

					<ToggleControl
						label={__( "Enable Pagination", 'full-page-slider' )}
						checked={ pagination }
						onChange={ ( value ) => setAttributes( { pagination: value } ) }
					/>

					<ToggleControl
						label={__( "Enable Scrollbar", 'full-page-slider' )}
						checked={ scrollbar }
						onChange={ ( value ) => setAttributes( { scrollbar: value } ) }
					/>

					<ToggleControl
						label={__( "Loop Slides", 'full-page-slider' )}
						checked={ loop }
						onChange={ ( value ) => setAttributes( { loop: value } ) }
					/>

				</PanelBody>

				<PanelBody title="Content Animation" initialOpen={ false }>
					<ToggleControl
						label={__( "Enable Content Animation", 'full-page-slider' )}
						checked={ enableContentAnimation }
						onChange={ ( value ) => setAttributes( { enableContentAnimation: value } ) }
					/>

					{ enableContentAnimation && (
						<>
							<SelectControl
								label="Animation Type"
								value={ contentAnimation }
								options={ [
									{ label: 'None', value: '' },
									{ label: 'Fade In Up', value: 'fade-in-up' },
									{ label: 'Fade In Down', value: 'fade-in-down' },
									{ label: 'Fade In Left', value: 'fade-in-left' },
									{ label: 'Fade In Right', value: 'fade-in-right' },
									{ label: 'Slide In Up', value: 'slide-in-up' },
									{ label: 'Slide In Down', value: 'slide-in-down' },
									{ label: 'Slide In Left', value: 'slide-in-left' },
									{ label: 'Slide In Right', value: 'slide-in-right' },
									{ label: 'Zoom In', value: 'zoom-in' },
									{ label: 'Zoom Out', value: 'zoom-out' },
									{ label: 'Rotate In', value: 'rotate-in' },
									{ label: 'Flip In X', value: 'flip-in-x' },
									{ label: 'Flip In Y', value: 'flip-in-y' },
									{ label: 'Bounce In', value: 'bounce-in' },
									{ label: 'Pop In', value: 'pop-in' },
								] }
								onChange={ ( value ) => setAttributes( { contentAnimation: value } ) }
							/>

							<RangeControl
								label="Animation Duration (ms)"
								value={ contentAnimationDuration }
								onChange={ ( value ) => setAttributes( { contentAnimationDuration: value } ) }
								min={ 500 }
								max={ 5000 }
								step={ 50 }
							/>

							<RangeControl
								label="Animation Delay (ms)"
								value={ contentAnimationDelay }
								onChange={ ( value ) => setAttributes( { contentAnimationDelay: value } ) }
								min={ 0 }
								max={ 2000 }
								step={ 50 }
							/>
						</>
					)}

				</PanelBody>

				<PanelBody title={ __( "Color", 'full-page-slider' ) } initialOpen={false}>
					<ColorPicker
						value={titleColor}
						onChange={( color ) => setAttributes( { titleColor: color } )}
						label='Title Color'
					/>

					<ColorPicker
						value={contentColor}
						onChange={( color ) => setAttributes( { contentColor: color } )}
						label='Content Color'
					/>

					<ColorPicker
						value={contentBackground}
						onChange={( color ) => setAttributes( { contentBackground: color } )}
						label='Content Background'
					/>

					<BackgroundControl
						value={background || {}}
						onChange={(newVal) => setAttributes({ background: newVal })}
					/>
				</PanelBody>

				<PanelBody title={ __( "Typography", 'full-page-slider' ) } initialOpen={false}>
					<TypographyControl
						label="Title Typography"
						value={titleTypography}
						onChange={(val) => setAttributes({ titleTypography: val })}
					/>
					
					<TypographyControl
						label="Content Typography"
						value={contentTypography}
						onChange={(val) => setAttributes({ contentTypography: val })}
					/>
				</PanelBody>

				<PanelBody title={ __( "Spacing", 'full-page-slider' ) } initialOpen={false}>
					<DimensionsControl
						label="Title Padding"
						value={titlePadding}
						onChange={(newVal) => setAttributes({ titlePadding: newVal })}
					/>
					<DimensionsControl
						label="Content Padding"
						value={contentPadding}
						onChange={(newVal) => setAttributes({ contentPadding: newVal })}
					/>
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
						onClick={ addSlide }
					/>
					<ToolbarButton
						icon={ <span className="dashicons dashicons-admin-page"></span> }
						label="Duplicate Slide"
						onClick={ duplicateSlide }
					/>
					<ToolbarButton
						icon={ <span className="dashicons dashicons-trash"></span> }
						label="Delete Slide"
						onClick={ deleteSlide }
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

				{/* <div className="floating-buttons-container">
					<div>
						<button title="Add New Slide" className='add-slide-btn' onClick={ addSlide }><span className="dashicons dashicons-plus-alt2"></span></button>
						<button title="Duplicate Slide" className='duplicate-slide-btn' onClick={ duplicateSlide }><span className="dashicons dashicons-admin-page"></span></button>
						<button title="Delete Slide" className='delete-slide-btn' onClick={ deleteSlide }><span className="dashicons dashicons-trash"></span></button>
					</div>
				</div> */}

			</div>
		</>
	);
}
