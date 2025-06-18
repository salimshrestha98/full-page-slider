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
		fetch(fullPageSliderL10n.ajaxURL + '?action=fpslider_disable_first_time_notice').catch(() => {});
	}

	return (
		<>
			<InspectorControls>
				{!hideFirstTimeNotice && (
					<Flex style={{alignItems: 'flex-start'}}>
						<p style={{padding: '0 18px'}}><em>Using for the first time? Check out our guide <a href="https://salim.com.np/full-page-slider/guide">here</a>.</em></p>
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
							label={__("Preview", 'full-page-slider')}
							value={device}
							onChange={(val) => setAttributes({ device: val })}
							options={ [
							{ label: __('Desktop', 'full-page-slider'), value: 'desktop', icon: desktop },
							{ label: __('Tablet', 'full-page-slider'), value: 'tablet', icon: tablet },
							{ label: __('Mobile', 'full-page-slider'), value: 'mobile', icon: mobile },
						] }
						/>

					<ToggleControl
						label={__("Show Title", 'full-page-slider')}
						checked={ showTitle }
						onChange={ ( value ) => setAttributes( { showTitle: value } ) }
					/>

					{ showTitle && (
						<ChooseControl
							label={__("Title Alignment", 'full-page-slider')}
							value={titleAlignment}
							onChange={(val) => setAttributes({ titleAlignment: val })}
							options={[
								{ value: 'left', label: __('Align Left', 'full-page-slider'), icon: justifyLeft },
								{ value: 'center', label: __('Align Center', 'full-page-slider'), icon: justifyCenter },
								{ value: 'right', label: __('Align Right', 'full-page-slider'), icon: justifyRight },
							]}
						/>
					)}

					<ToggleControl
						label={__("Stick Content to Bottom", 'full-page-slider')}
						checked={ stickToBottom }
						onChange={ ( value ) => setAttributes( { stickToBottom: value } ) }
					/>

					<ToggleControl
						label={__("Force Fullscreen", 'full-page-slider')}
						checked={ forceFullScreen }
						onChange={ ( value ) => setAttributes( { forceFullScreen: value } ) }
					/>
				</PanelBody>

				<PanelBody title={__("Slider", 'full-page-slider')} initialOpen={ false }>
					<SelectControl
						label={__("Direction", 'full-page-slider')}
						value={ direction }
						options={ [
							{ label: __('Horizontal', 'full-page-slider'), value: 'horizontal' },
							{ label: __('Vertical', 'full-page-slider'), value: 'vertical' },
						] }
						onChange={ ( value ) => setAttributes( { direction: value } ) }
					/>

					<SelectControl
						label={__("Slide Effect", 'full-page-slider')}
						value={ effect }
						options={ [
							{ label: __('Slide', 'full-page-slider'), value: 'slide' },
							{ label: __('Cube', 'full-page-slider'), value: 'cube' },
							{ label: __('Coverflow', 'full-page-slider'), value: 'coverflow' },
							{ label: __('Flip', 'full-page-slider'), value: 'flip' },
						] }
						onChange={ ( value ) => setAttributes( { effect: value } ) }
					/>

					<RangeControl
						label={__("Slide Speed (ms)", 'full-page-slider')}
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

					{ !navigation && (<p><i>{__('Prev/Next Button will be disabled on frontend only.', 'full-page-slider')}</i></p>)}

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

				<PanelBody title={__("Content Animation", 'full-page-slider')} initialOpen={ false }>
					<ToggleControl
						label={__( "Enable Content Animation", 'full-page-slider' )}
						checked={ enableContentAnimation }
						onChange={ ( value ) => setAttributes( { enableContentAnimation: value } ) }
					/>

					{ enableContentAnimation && (
						<>
							<SelectControl
								label={__("Animation Type", 'full-page-slider')}
								value={ contentAnimation }
								options={ [
									{ label: __('None', 'full-page-slider'), value: '' },
									{ label: __('Fade In Up', 'full-page-slider'), value: 'fade-in-up' },
									{ label: __('Fade In Down', 'full-page-slider'), value: 'fade-in-down' },
									{ label: __('Fade In Left', 'full-page-slider'), value: 'fade-in-left' },
									{ label: __('Fade In Right', 'full-page-slider'), value: 'fade-in-right' },
									{ label: __('Slide In Up', 'full-page-slider'), value: 'slide-in-up' },
									{ label: __('Slide In Down', 'full-page-slider'), value: 'slide-in-down' },
									{ label: __('Slide In Left', 'full-page-slider'), value: 'slide-in-left' },
									{ label: __('Slide In Right', 'full-page-slider'), value: 'slide-in-right' },
									{ label: __('Zoom In', 'full-page-slider'), value: 'zoom-in' },
									{ label: __('Zoom Out', 'full-page-slider'), value: 'zoom-out' },
									{ label: __('Rotate In', 'full-page-slider'), value: 'rotate-in' },
									{ label: __('Flip In X', 'full-page-slider'), value: 'flip-in-x' },
									{ label: __('Flip In Y', 'full-page-slider'), value: 'flip-in-y' },
									{ label: __('Bounce In', 'full-page-slider'), value: 'bounce-in' },
									{ label: __('Pop In', 'full-page-slider'), value: 'pop-in' },
								] }
								onChange={ ( value ) => setAttributes( { contentAnimation: value } ) }
							/>

							<RangeControl
								label={__("Animation Duration (ms)", 'full-page-slider')}
								value={ contentAnimationDuration }
								onChange={ ( value ) => setAttributes( { contentAnimationDuration: value } ) }
								min={ 500 }
								max={ 5000 }
								step={ 50 }
							/>

							<RangeControl
								label={__("Animation Delay (ms)", 'full-page-slider')}
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
						label={__('Title Color', 'full-page-slider')}
					/>

					<ColorPicker
						value={contentColor}
						onChange={( color ) => setAttributes( { contentColor: color } )}
						label={__('Content Color', 'full-page-slider')}
					/>

					<ColorPicker
						value={contentBackground}
						onChange={( color ) => setAttributes( { contentBackground: color } )}
						label={__('Content Background', 'full-page-slider')}
					/>

					<BackgroundControl
						value={background || {}}
						onChange={(newVal) => setAttributes({ background: newVal })}
					/>
				</PanelBody>

				<PanelBody title={ __( "Typography", 'full-page-slider' ) } initialOpen={false}>
					<TypographyControl
						label={__("Title Typography", 'full-page-slider')}
						value={titleTypography}
						onChange={(val) => setAttributes({ titleTypography: val })}
					/>
					
					<TypographyControl
						label={__("Content Typography", 'full-page-slider')}
						value={contentTypography}
						onChange={(val) => setAttributes({ contentTypography: val })}
					/>
				</PanelBody>

				<PanelBody title={ __( "Spacing", 'full-page-slider' ) } initialOpen={false}>
					<DimensionsControl
						label={__("Title Padding", 'full-page-slider')}
						value={titlePadding}
						onChange={(newVal) => setAttributes({ titlePadding: newVal })}
					/>
					<DimensionsControl
						label={__("Content Padding", 'full-page-slider')}
						value={contentPadding}
						onChange={(newVal) => setAttributes({ contentPadding: newVal })}
					/>
					<DimensionsControl
						label={__("Padding", 'full-page-slider')}
						value={padding}
						onChange={(newVal) => setAttributes({ padding: newVal })}
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ <span className="dashicons dashicons-plus-alt2"></span> }
						label={__("Add New Slide", 'full-page-slider')}
						onClick={ addSlide }
					/>
					<ToolbarButton
						icon={ <span className="dashicons dashicons-admin-page"></span> }
						label={__("Duplicate Slide", 'full-page-slider')}
						onClick={ duplicateSlide }
					/>
					<ToolbarButton
						icon={ <span className="dashicons dashicons-trash"></span> }
						label={__("Delete Slide", 'full-page-slider')}
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
			</div>
		</>
	);
}
