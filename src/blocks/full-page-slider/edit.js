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
	EffectCards,
	EffectCoverflow,
	EffectCreative,
	EffectCube,
	EffectFade,
	EffectFlip,
	Navigation,
	Pagination,
	Scrollbar
} from 'swiper/modules';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { justifyCenter, justifyLeft, justifyRight } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';
import { BlockControls } from '@wordpress/block-editor';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import DimensionsControl from '../../components/DimensionsControl/DimensionsControl';
import { Swiper } from 'swiper';
import TEMPLATE from './template';
import TemplateSelector from './TemplateSelector';
import { __ } from '@wordpress/i18n';
import { getBackgroundStyles, loadGoogleFont } from '../../utilities';
import { useState } from 'react';

export default function Edit ( { clientId, attributes, setAttributes } ) {

	// Use Gutenberg's built-in responsive preview detection
	const isLargeViewport = useViewportMatch( 'large' );
	const isMediumViewport = useViewportMatch( 'medium' );
	const isSmallViewport = useViewportMatch( 'small' );
	
	// Determine current device based on Gutenberg's viewport
	const currentDevice = isLargeViewport ? 'desktop' : isMediumViewport ? 'tablet' : 'mobile';

	const {
		activeSlide,
		showTitle,
		alignContent,
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

	// Load Google fonts when typography settings are available
	useEffect(() => {
		if (titleTypography?.fontFamily) {
			loadGoogleFont(titleTypography.fontFamily);
		}
		if (contentTypography?.fontFamily) {
			loadGoogleFont(contentTypography.fontFamily);
		}
	}, [titleTypography?.fontFamily, contentTypography?.fontFamily]);

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
	 * Handler to close the first timer notice if user clicks on close button.
	 */
	const [hideFirstTimeNotice, setHideFirstTimeNotice] = useState(fullPageSliderL10n.hideFirstTimeNotice);

	/**
	 * Template selector state
	 */
	const [showTemplateSelector, setShowTemplateSelector] = useState(false);
	const [swiperKey, setSwiperKey] = useState(0);

	/**
	 * Swiper refs - declared early so reinitSwiper can use setInitialSlide
	 */
	const swiperRef = useRef( null );
	const containerRef = useRef( null );
	const setInitialSlide = useRef( null );

	// Force Swiper re-initialization and optionally navigate to a specific slide
	const reinitSwiper = (targetSlideIndex) => {
		if (typeof targetSlideIndex === 'number') {
			setInitialSlide.current = targetSlideIndex;
		}
		setSwiperKey(prev => prev + 1);
	};

	function closeFirstTimeNotice() {
		setHideFirstTimeNotice(true);
		fetch(fullPageSliderL10n.ajaxURL + '?action=fpslider_disable_first_time_notice&nonce=' + fullPageSliderL10n.nonce).catch(() => {});
	}

	// Initialize Swiper only once when settings that require re-initialization change
	useEffect( () => {
		let swiperModules = [];

		swiperModules.push( Navigation );
		if ( pagination ) swiperModules.push( Pagination );
		if ( scrollbar ) swiperModules.push( Scrollbar );
		if ( 'cube' === effect ) swiperModules.push( EffectCube );
		if ( 'coverflow' === effect ) swiperModules.push( EffectCoverflow );
		if ( 'flip' === effect ) swiperModules.push( EffectFlip );
		if ( 'creative' === effect ) swiperModules.push( EffectCreative );
		if ( 'fade' === effect ) swiperModules.push( EffectFade );
		if ( 'cards' === effect ) swiperModules.push( EffectCards );

		if ( swiperRef.current )
		{
			swiperRef.current.destroy( true, true );
			swiperRef.current = null;
		}

		// Function to initialize swiper
		const initSwiper = () => {
			// Get the navigation/pagination elements scoped to this container
			const container = containerRef.current;
			if (!container) return;

			const nextEl = container.querySelector('.swiper-button-next');
			const prevEl = container.querySelector('.swiper-button-prev');
			const paginationEl = container.querySelector('.swiper-pagination');
			const scrollbarEl = container.querySelector('.swiper-scrollbar');

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
				direction: direction || 'horizontal',
				loop: !!loop,
				slidesPerView: 1,
				effect: effect || 'slide',
				speed: speed,
				observer: true,
				observeParents: true,
				observeSlideChildren: true,
				watchSlidesProgress: true,
				navigation: {
					nextEl: nextEl,
					prevEl: prevEl,
					enabled: true
				},
				pagination: {
					el: paginationEl,
					clickable: true,
					dynamicBullets: false,
					enabled: !!pagination
				},
				scrollbar: {
					el: scrollbarEl,
					draggable: true,
					enabled: !!scrollbar
				}
			};

			swiperRef.current = new Swiper( container, swiperArgs );
			setInitialSlide.current = null;

			// Sync with activeSlide attribute.
			const updateIndex = () => {
				setAttributes({ activeSlide: swiperRef.current.activeIndex });
			};

			swiperRef.current.on('slideChange', updateIndex);
		};

		// Delay initialization slightly to ensure DOM is ready after replaceInnerBlocks
		const timeoutId = setTimeout(initSwiper, 50);

		// Cleanup
		return () => {
			clearTimeout(timeoutId);
			if (swiperRef.current) {
				swiperRef.current.destroy( true, true );
				swiperRef.current = null;
			}
		}

	}, [
		direction,
		loop,
		pagination,
		navigation,
		scrollbar,
		effect,
		speed,
		padding,
		swiperKey
	] );

	// Update Swiper when slide count changes (e.g., from template insertion)
	useEffect( () => {
		if ( swiperRef.current ) {
			// Small delay to allow DOM to update
			setTimeout(() => {
				if (swiperRef.current) {
					swiperRef.current.update();
					// Re-initialize navigation and pagination
					if (swiperRef.current.navigation) {
						swiperRef.current.navigation.update();
					}
					if (swiperRef.current.pagination) {
						swiperRef.current.pagination.update();
					}
				}
			}, 100);
		}
	}, [ slideCount ] );

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

	return (
		<>
			<InspectorControls>
				{!hideFirstTimeNotice && (
					<Flex style={{alignItems: 'flex-start', background: '#f8fafc', borderRadius: '6px', marginTop: '8px', padding: '10px 10px 10px 20px'}}>
						<p style={{padding: '0 12px 0 0', margin: 0}}>
							<em>
								<strong>Welcome!</strong> If this is your first time using Full Page Slider, our <a href="https://salim.com.np/full-page-slider/guide" target="_blank" rel="noopener noreferrer">quick start guide</a> will help you get the most out of it.
							</em>
						</p>
						<Button
							icon="no-alt"
							title={__('Close Forever', 'full-page-slider')}
							onClick={() => closeFirstTimeNotice()}
							isDestructive
							style={{marginLeft: 'auto'}}
						/>
					</Flex>
				)}
				<PanelBody title={ __( "General", 'full-page-slider' ) } initialOpen={false}>

					<ToggleControl
						label={__("Show Title", 'full-page-slider')}
						checked={ showTitle }
						onChange={ ( value ) => setAttributes( { showTitle: value } ) }
						__nextHasNoMarginBottom
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

					<SelectControl
						label={__("Align Content", 'full-page-slider')}
						value={alignContent || 'top'}
						onChange={ value => setAttributes({ alignContent: value }) }
						options={[
							{ label: __('Top', 'full-page-slider'), value: 'top' },
							{ label: __('Center', 'full-page-slider'), value: 'center' },
							{ label: __('Bottom', 'full-page-slider'), value: 'bottom' },
							{ label: __('Cover', 'full-page-slider'), value: 'cover' },
						]}
						__nextHasNoMarginBottom
					/>

					<ToggleControl
						label={__("Force Fullscreen", 'full-page-slider')}
						checked={ forceFullScreen }
						onChange={ ( value ) => setAttributes( { forceFullScreen: value } ) }
						__nextHasNoMarginBottom
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
						__nextHasNoMarginBottom
					/>

					<SelectControl
						label={__("Slide Effect", 'full-page-slider')}
						value={ effect }
						options={ [
							{ label: __('Slide', 'full-page-slider'), value: 'slide' },
							{ label: __('Fade', 'full-page-slider'), value: 'fade' },
							{ label: __('Cube', 'full-page-slider'), value: 'cube' },
							{ label: __('Coverflow', 'full-page-slider'), value: 'coverflow' },
							{ label: __('Flip', 'full-page-slider'), value: 'flip' },
							{ label: __('Cards', 'full-page-slider'), value: 'cards' },
							{ label: __('Creative', 'full-page-slider'), value: 'creative' },
						] }
						onChange={ ( value ) => setAttributes( { effect: value } ) }
						__nextHasNoMarginBottom
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
						__nextHasNoMarginBottom
					/>

					{ !navigation && (<p><i>{__('Prev/Next Button will be disabled on frontend only.', 'full-page-slider')}</i></p>)}

					<ToggleControl
						label={__( "Enable Pagination", 'full-page-slider' )}
						checked={ pagination }
						onChange={ ( value ) => setAttributes( { pagination: value } ) }
						__nextHasNoMarginBottom
					/>

					<ToggleControl
						label={__( "Enable Scrollbar", 'full-page-slider' )}
						checked={ scrollbar }
						onChange={ ( value ) => setAttributes( { scrollbar: value } ) }
						__nextHasNoMarginBottom
					/>

					<ToggleControl
						label={__( "Loop Slides", 'full-page-slider' )}
						checked={ loop }
						onChange={ ( value ) => setAttributes( { loop: value } ) }
						__nextHasNoMarginBottom
					/>

				</PanelBody>

				<PanelBody title={__("Content Animation", 'full-page-slider')} initialOpen={ false }>
					<ToggleControl
						label={__( "Enable Content Animation", 'full-page-slider' )}
						checked={ enableContentAnimation }
						onChange={ ( value ) => setAttributes( { enableContentAnimation: value } ) }
						__nextHasNoMarginBottom
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
								__nextHasNoMarginBottom
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
					{showTitle && (
						<ColorPicker
							value={titleColor}
							onChange={( color ) => setAttributes( { titleColor: color } )}
							label={__('Title Color', 'full-page-slider')}
						/>
					)}
					{/* <ColorPicker
						value={contentColor}
						onChange={( color ) => setAttributes( { contentColor: color } )}
						label={__('Content Color', 'full-page-slider')}
					/> */}


					<BackgroundControl
						value={background || {}}
						onChange={(newVal) => setAttributes({ background: newVal })}
					/>
				</PanelBody>

				<PanelBody title={ __( "Typography", 'full-page-slider' ) } initialOpen={false}>
					{showTitle && (
						<TypographyControl
							label={__("Title Typography", 'full-page-slider')}
							value={titleTypography}
							onChange={(val) => setAttributes({ titleTypography: val })}
						/>
					)}
					<TypographyControl
						label={__("Content Typography", 'full-page-slider')}
						value={contentTypography}
						onChange={(val) => setAttributes({ contentTypography: val })}
					/>
				</PanelBody>

				<PanelBody title={ __( "Spacing", 'full-page-slider' ) } initialOpen={false}>
					{showTitle && (
						<DimensionsControl
							label={__("Title Padding", 'full-page-slider')}
							value={titlePadding}
							onChange={(newVal) => setAttributes({ titlePadding: newVal })}
						/>
					)}
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
				<ToolbarGroup>
					<ToolbarButton
						icon={ <span className="dashicons dashicons-layout"></span> }
						label={__("Choose Template", 'full-page-slider')}
						onClick={ () => setShowTemplateSelector(true) }
					/>
				</ToolbarGroup>
			</BlockControls>

			<div { ...blockProps } className={ `${ blockProps.className } full-page-slider preview-${ currentDevice }` }>
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

			{showTemplateSelector && (
				<TemplateSelector
					clientId={clientId}
					activeSlideIndex={swiperRef.current?.activeIndex || 0}
					onClose={() => setShowTemplateSelector(false)}
					onInsert={reinitSwiper}
				/>
			)}
		</>
	);
}
