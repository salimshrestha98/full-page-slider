import './hooks.js';
import { InnerBlocks, InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { getTypographyStyles, loadGoogleFont } from '../../utilities';
import { useDispatch, useSelect } from '@wordpress/data';

import { Button } from '@wordpress/components';
import { SwiperSlide } from 'swiper/react';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { store as blockEditorStore } from '@wordpress/block-editor';
import classNames from 'classnames';
import metadata from './block.json';
import { registerBlockType } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import SlideInspectorControls from './inspector';

/**
 * Generate shape divider SVG paths
 */
const getShapeDividerPath = (shape, flip = false) => {
	const shapes = {
		wave: 'M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,149.3C672,149,768,171,864,181.3C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
		curve: 'M0,224L1440,96L1440,320L0,320Z',
		triangle: 'M0,320L720,64L1440,320L0,320Z',
		tilt: 'M0,320L1440,160L1440,320L0,320Z',
		arrow: 'M0,320L720,224L1440,320L0,320Z',
		split: 'M0,320L720,160L720,320L0,320ZM720,320L720,160L1440,320L720,320Z',
		book: 'M0,320L720,224L1440,320L1440,320L720,256L0,320Z',
		zigzag: 'M0,224L80,192L160,224L240,192L320,224L400,192L480,224L560,192L640,224L720,192L800,224L880,192L960,224L1040,192L1120,224L1200,192L1280,224L1360,192L1440,224L1440,320L0,320Z',
	};
	return shapes[shape] || shapes.wave;
};

/**
 * Shape Divider Component
 */
const ShapeDivider = ({ position, dividerSettings }) => {
	if (!dividerSettings?.enabled) return null;

	const { shape = 'wave', color = '#ffffff', height = 100, flip = false } = dividerSettings;

	return (
		<div
			className={`fps-shape-divider fps-shape-divider--${position}`}
			style={{
				position: 'absolute',
				left: 0,
				right: 0,
				width: '100%',
				height: `${height}px`,
				overflow: 'hidden',
				lineHeight: 0,
				...(position === 'top' ? { top: 0 } : { bottom: 0 }),
				transform: position === 'top' ? (flip ? 'rotateX(180deg)' : '') : (flip ? 'rotateX(180deg) rotateY(180deg)' : 'rotateY(180deg)'),
				zIndex: 1,
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 320"
				preserveAspectRatio="none"
				style={{
					width: '100%',
					height: '100%',
					display: 'block',
				}}
			>
				<path fill={color} d={getShapeDividerPath(shape)} />
			</svg>
		</div>
	);
};

/**
 * Video Background Component
 */
const VideoBackground = ({ video, isEditor = false }) => {
	if (!video?.url) return null;

	return (
		<div
			className="fps-video-background"
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				zIndex: 0,
			}}
		>
			<video
				autoPlay={!isEditor}
				muted={video.muted !== false}
				loop={video.loop !== false}
				playsInline
				poster={video.poster || ''}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
				}}
			>
				<source src={video.url} type="video/mp4" />
			</video>
		</div>
	);
};

/**
 * Overlay Component
 */
const Overlay = ({ overlay }) => {
	if (!overlay?.enabled) return null;

	return (
		<div
			className="fps-overlay"
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				backgroundColor: overlay.color || 'rgba(0,0,0,0.5)',
				mixBlendMode: overlay.blendMode || 'normal',
				zIndex: 1,
				pointerEvents: 'none',
			}}
		/>
	);
};

/**
 * Get text effect styles
 */
const getTextEffectStyles = (textShadow, textStroke, textGradient) => {
	const styles = {};

	if (textShadow?.enabled) {
		styles.textShadow = `${textShadow.x || 0}px ${textShadow.y || 4}px ${textShadow.blur || 8}px ${textShadow.color || 'rgba(0,0,0,0.3)'}`;
	}

	if (textStroke?.enabled) {
		styles.WebkitTextStroke = `${textStroke.width || 1}px ${textStroke.color || '#ffffff'}`;
	}

	if (textGradient?.enabled) {
		styles.background = textGradient.gradient || 'linear-gradient(90deg, #667eea, #764ba2)';
		styles.WebkitBackgroundClip = 'text';
		styles.WebkitTextFillColor = 'transparent';
		styles.backgroundClip = 'text';
	}

	return styles;
};

/**
 * Get background styles
 */
const getBackgroundStyles = (background) => {
	if (!background) return {};

	const styles = {};

	if (background.backgroundType === 'color' || !background.backgroundType) {
		if (background.color) {
			styles.backgroundColor = background.color;
		}
	} else if (background.backgroundType === 'gradient') {
		if (background.gradient) {
			styles.background = background.gradient;
		}
	} else if (background.backgroundType === 'image' && background.image?.url) {
		styles.backgroundImage = `url(${background.image.url})`;
		styles.backgroundSize = background.backgroundSize || 'cover';
		styles.backgroundPosition = background.backgroundPosition || 'center center';
		styles.backgroundRepeat = background.backgroundRepeat || 'no-repeat';
		if (background.backgroundAttachment) {
			styles.backgroundAttachment = background.backgroundAttachment;
		}
	}

	return styles;
};

registerBlockType('full-page-slider/slide', {
	edit: ({ clientId, context, attributes, setAttributes }) => {
		// Dynamically extract all full-page-slider/* context values
		const parentValues = Object.fromEntries(
			Object.entries(context)
				.filter(([key]) => key.startsWith('full-page-slider/'))
				.map(([key, value]) => [key.replace('full-page-slider/', ''), value])
		);

		// Mirror context values to 'parentsAttribute'.
		useEffect(() => {
			setAttributes({ parentAttributes: parentValues });
		}, [JSON.stringify(parentValues)]); // dependency to avoid infinite loop

		let localAttributes = applyFilters('fpslider.slide.localAttributes', attributes.parentAttributes, attributes);

		const {
			showTitle,
			alignContent,
			background,
			enableContentAnimation,
			contentAnimation,
			contentAnimationDuration,
			contentAnimationDelay,
			titleTypography,
			titleAlignment,
			titlePadding,
			titleColor,
			contentPadding,
			contentTypography,
			contentColor,
		} = localAttributes;

		// Get slide-specific attributes
		const {
			backgroundVideo,
			overlay,
			parallax,
			textShadow,
			textStroke,
			textGradient,
			shapeDivider,
		} = attributes;

		// Map alignContent to flexbox values
		const justifyContentMap = {
			top: 'flex-start',
			center: 'center',
			bottom: 'flex-end',
			cover: 'stretch',
		};
		const justifyContent = justifyContentMap[alignContent] || 'flex-start';
		const flexGrow = alignContent === 'cover' ? 1 : 'unset';

		/**
		 * APPLY STYLES TO BLOCK.
		 */
		const backgroundStyles = getBackgroundStyles(background);
		const textEffectStyles = getTextEffectStyles(textShadow, textStroke, textGradient);

		const innerBlockProps = useBlockProps({
			style: applyFilters('fpslider.slide.blockStyles', {
				justifyContent,
				position: 'relative',
				...backgroundStyles,
			})
		});

		// Block index.
		const index = useSelect((select) => {
			const { getBlockIndex } = select(blockEditorStore);
			return getBlockIndex(clientId); // `clientId` is passed to every block
		}, [clientId]);

		// Load Google fonts when typography settings are available
		useEffect(() => {
			if (titleTypography?.fontFamily) {
				loadGoogleFont(titleTypography.fontFamily);
			}
			if (contentTypography?.fontFamily) {
				loadGoogleFont(contentTypography.fontFamily);
			}
		}, [titleTypography?.fontFamily, contentTypography?.fontFamily]);

		// Generate parallax data attributes
		const getParallaxDataAttrs = () => {
			if (!parallax?.enabled) return {};
			return {
				'data-swiper-parallax': parallax.background || '-23%',
			};
		};

		const getTitleParallaxAttrs = () => {
			if (!parallax?.enabled || !parallax.title) return {};
			const { x = 0, y = 0, scale = 1, opacity = 1 } = parallax.title;
			return {
				'data-swiper-parallax-x': x,
				'data-swiper-parallax-y': y,
				'data-swiper-parallax-scale': scale,
				'data-swiper-parallax-opacity': opacity,
			};
		};

		const getContentParallaxAttrs = () => {
			if (!parallax?.enabled || !parallax.content) return {};
			const { x = 0, y = 100, opacity = 0.5 } = parallax.content;
			return {
				'data-swiper-parallax-x': x,
				'data-swiper-parallax-y': y,
				'data-swiper-parallax-opacity': opacity,
			};
		};

		return (
			<>
				<SlideInspectorControls
					attributes={{ ...localAttributes, ...attributes }}
					setAttributes={setAttributes}
				/>

				<SwiperSlide className="slide-block swiper-slide">
					<div {...innerBlockProps}>
						{/* Video Background */}
						<VideoBackground video={backgroundVideo} isEditor={true} />

						{/* Overlay */}
						<Overlay overlay={overlay} />

						{/* Shape Dividers */}
						<ShapeDivider position="top" dividerSettings={shapeDivider?.top} />
						<ShapeDivider position="bottom" dividerSettings={shapeDivider?.bottom} />

						<div
							className={classNames(
								'slide-content',
								(enableContentAnimation && index === parentValues.activeSlide) ? `animate animate--${contentAnimation}` : ''
							)}
							style={{
								animationDuration: contentAnimationDuration + 'ms',
								animationDelay: contentAnimationDelay + 'ms',
								position: 'relative',
								zIndex: 2,
							}}
							{...getContentParallaxAttrs()}
						>
							{showTitle && (
								<RichText
									tagName="h2"
									className='slide-title'
									value={attributes.title}
									onChange={(newTitle) => setAttributes({ title: newTitle })}
									placeholder={__("Give me a title…", 'full-page-slider')}
									style={{
										...getTypographyStyles(titleTypography),
										...textEffectStyles,
										textAlign: titleAlignment,
										color: textGradient?.enabled ? undefined : titleColor,
										padding: `${titlePadding?.top}${titlePadding?.unit} ${titlePadding?.right}${titlePadding?.unit} ${titlePadding?.bottom}${titlePadding?.unit} ${titlePadding?.left}${titlePadding?.unit}`
									}}
									{...getTitleParallaxAttrs()}
								/>)}

							<div className="slide-main"
								style={{
									flexGrow,
									color: contentColor,
									padding: `${contentPadding?.top}${contentPadding?.unit} ${contentPadding?.right}${contentPadding?.unit} ${contentPadding?.bottom}${contentPadding?.unit} ${contentPadding?.left}${contentPadding?.unit}`,
									...getTypographyStyles(contentTypography),
								}}>
								<InnerBlocks />
							</div>
						</div>
					</div>
				</SwiperSlide>
			</>
		);
	},

	save: ({ attributes }) => {
		const {
			title,
			background,
			backgroundVideo,
			overlay,
			parallax,
			textShadow,
			textStroke,
			textGradient,
			shapeDivider,
			parentAttributes
		} = attributes;

		const {
			showTitle,
			titleAlignment,
			alignContent,
			contentAnimation,
			contentAnimationDuration,
			contentAnimationDelay,
			titleColor,
			contentColor,
			titleTypography,
			contentTypography,
			titlePadding,
			contentPadding,
		} = parentAttributes;

		// Map alignContent to flexbox values
		const justifyContentMap = {
			top: 'flex-start',
			center: 'center',
			bottom: 'flex-end',
			cover: 'stretch',
		};
		const justifyContent = justifyContentMap[alignContent] || 'flex-start';
		const flexGrow = alignContent === 'cover' ? 1 : 'unset';

		// Get styles
		const backgroundStyles = getBackgroundStyles(background);
		const textEffectStyles = getTextEffectStyles(textShadow, textStroke, textGradient);

		// Generate parallax data attributes
		const parallaxDataAttrs = {};
		if (parallax?.enabled) {
			parallaxDataAttrs['data-swiper-parallax'] = parallax.background || '-23%';
		}

		const titleParallaxAttrs = {};
		if (parallax?.enabled && parallax.title) {
			const { x = 0, y = 0, scale = 1, opacity = 1 } = parallax.title;
			titleParallaxAttrs['data-swiper-parallax-x'] = x;
			titleParallaxAttrs['data-swiper-parallax-y'] = y;
			titleParallaxAttrs['data-swiper-parallax-scale'] = scale;
			titleParallaxAttrs['data-swiper-parallax-opacity'] = opacity;
		}

		const contentParallaxAttrs = {};
		if (parallax?.enabled && parallax.content) {
			const { x = 0, y = 100, opacity = 0.5 } = parallax.content;
			contentParallaxAttrs['data-swiper-parallax-x'] = x;
			contentParallaxAttrs['data-swiper-parallax-y'] = y;
			contentParallaxAttrs['data-swiper-parallax-opacity'] = opacity;
		}

		return (
			<div
				className="slide-block swiper-slide"
				{...parallaxDataAttrs}
			>
				{/* Video Background */}
				{backgroundVideo?.url && (
					<div
						className="fps-video-background"
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							overflow: 'hidden',
							zIndex: 0,
						}}
					>
						<video
							autoPlay
							muted={backgroundVideo.muted !== false}
							loop={backgroundVideo.loop !== false}
							playsInline
							poster={backgroundVideo.poster || ''}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
							}}
						>
							<source src={backgroundVideo.url} type="video/mp4" />
						</video>
					</div>
				)}

				{/* Overlay */}
				{overlay?.enabled && (
					<div
						className="fps-overlay"
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							backgroundColor: overlay.color || 'rgba(0,0,0,0.5)',
							mixBlendMode: overlay.blendMode || 'normal',
							zIndex: 1,
							pointerEvents: 'none',
						}}
					/>
				)}

				{/* Top Shape Divider */}
				{shapeDivider?.top?.enabled && (
					<div
						className="fps-shape-divider fps-shape-divider--top"
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							top: 0,
							width: '100%',
							height: `${shapeDivider.top.height || 100}px`,
							overflow: 'hidden',
							lineHeight: 0,
							transform: shapeDivider.top.flip ? 'rotateX(180deg)' : '',
							zIndex: 1,
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 1440 320"
							preserveAspectRatio="none"
							style={{
								width: '100%',
								height: '100%',
								display: 'block',
							}}
						>
							<path fill={shapeDivider.top.color || '#ffffff'} d={getShapeDividerPath(shapeDivider.top.shape)} />
						</svg>
					</div>
				)}

				{/* Bottom Shape Divider */}
				{shapeDivider?.bottom?.enabled && (
					<div
						className="fps-shape-divider fps-shape-divider--bottom"
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							bottom: 0,
							width: '100%',
							height: `${shapeDivider.bottom.height || 100}px`,
							overflow: 'hidden',
							lineHeight: 0,
							transform: shapeDivider.bottom.flip ? 'rotateX(180deg) rotateY(180deg)' : 'rotateY(180deg)',
							zIndex: 1,
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 1440 320"
							preserveAspectRatio="none"
							style={{
								width: '100%',
								height: '100%',
								display: 'block',
							}}
						>
							<path fill={shapeDivider.bottom.color || '#ffffff'} d={getShapeDividerPath(shapeDivider.bottom.shape)} />
						</svg>
					</div>
				)}

				<div style={{
					justifyContent,
					position: 'relative',
					...backgroundStyles,
				}}>
					<div
						className={`slide-content animate animate--${contentAnimation}`}
						style={{
							animationDuration: contentAnimationDuration + 'ms',
							animationDelay: contentAnimationDelay + 'ms',
							position: 'relative',
							zIndex: 2,
						}}
						{...contentParallaxAttrs}
					>
						{showTitle && title && (
							<h2
								className="slide-title"
								style={{
									...getTypographyStyles(titleTypography),
									...textEffectStyles,
									textAlign: titleAlignment,
									color: textGradient?.enabled ? undefined : titleColor,
									padding: `${titlePadding?.top}${titlePadding?.unit} ${titlePadding?.right}${titlePadding?.unit} ${titlePadding?.bottom}${titlePadding?.unit} ${titlePadding?.left}${titlePadding?.unit}`
								}}
								{...titleParallaxAttrs}
							>
								{title}
							</h2>
						)}
						<div
							className="slide-main"
							style={{
								...getTypographyStyles(contentTypography),
								flexGrow,
								color: contentColor,
								padding: `${contentPadding?.top}${contentPadding?.unit} ${contentPadding?.right}${contentPadding?.unit} ${contentPadding?.bottom}${contentPadding?.unit} ${contentPadding?.left}${contentPadding?.unit}`
							}}
						>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		);
	},
	usesContext: metadata.usesContext,
});
