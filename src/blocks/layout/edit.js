import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	RangeControl,
	TextControl,
	ColorPicker,
	__experimentalUnitControl as UnitControl,
	__experimentalBoxControl as BoxControl,
	Button,
	ButtonGroup,
	Flex,
	FlexItem,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import DimensionsControl from '../../components/DimensionsControl/DimensionsControl';
import ColorPickerComponent from '../../components/ColorPicker/ColorPicker';

export default function Edit({ attributes, setAttributes }) {
	const {
		layoutType,
		flexDirection,
		flexWrap,
		justifyContent,
		alignItems,
		alignContent,
		gap,
		gridTemplateColumns,
		gridTemplateRows,
		gridGap,
		gridAutoFlow,
		width,
		height,
		maxWidth,
		maxHeight,
		minWidth,
		minHeight,
		padding,
		margin,
		position,
		top,
		right,
		bottom,
		left,
		zIndex,
		backgroundColor,
		backgroundImage,
		borderRadius,
		border,
		boxShadow,
		overflow,
	} = attributes;

	const [activeTab, setActiveTab] = useState('layout');

	// Generate inline styles
	const containerStyles = {
		display: layoutType,
		...(layoutType === 'flex' && {
			flexDirection,
			flexWrap,
			justifyContent,
			alignItems,
			alignContent,
			gap: `${gap.value}${gap.unit}`,
		}),
		...(layoutType === 'grid' && {
			gridTemplateColumns,
			gridTemplateRows,
			gap: `${gridGap.value}${gridGap.unit}`,
			gridAutoFlow,
		}),
		width: width.value ? `${width.value}${width.unit}` : 'auto',
		height: height.value ? `${height.value}${height.unit}` : 'auto',
		...(maxWidth.value && { maxWidth: `${maxWidth.value}${maxWidth.unit}` }),
		...(maxHeight.value && { maxHeight: `${maxHeight.value}${maxHeight.unit}` }),
		...(minWidth.value && { minWidth: `${minWidth.value}${minWidth.unit}` }),
		...(minHeight.value && { minHeight: `${minHeight.value}${minHeight.unit}` }),
		padding: `${padding.top}${padding.unit} ${padding.right}${padding.unit} ${padding.bottom}${padding.unit} ${padding.left}${padding.unit}`,
		margin: `${margin.top}${margin.unit} ${margin.right}${margin.unit} ${margin.bottom}${margin.unit} ${margin.left}${margin.unit}`,
		position,
		...(position !== 'static' && {
			...(top.value && { top: `${top.value}${top.unit}` }),
			...(right.value && { right: `${right.value}${right.unit}` }),
			...(bottom.value && { bottom: `${bottom.value}${bottom.unit}` }),
			...(left.value && { left: `${left.value}${left.unit}` }),
		}),
		...(zIndex && { zIndex }),
		...(backgroundColor && { backgroundColor }),
		...(backgroundImage && { backgroundImage: `url(${backgroundImage})` }),
		...(borderRadius.value && { borderRadius: `${borderRadius.value}${borderRadius.unit}` }),
		...(border.width && {
			border: `${border.width}${border.unit} ${border.style} ${border.color}`,
		}),
		...(boxShadow && { boxShadow }),
		overflow,
	};

	const blockProps = useBlockProps({
		style: containerStyles,
		className: `fps-layout fps-layout--${layoutType}`,
	});

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'fps-layout__inner',
		},
		{
			templateLock: false,
		}
	);

	return (
		<>
			<InspectorControls>
				{/* Tab Navigation */}
				<div style={{ padding: '16px', borderBottom: '1px solid #ddd' }}>
					<ButtonGroup>
						<Button
							variant={activeTab === 'layout' ? 'primary' : 'secondary'}
							onClick={() => setActiveTab('layout')}
						>
							{__('Layout', 'full-page-slider')}
						</Button>
						<Button
							variant={activeTab === 'sizing' ? 'primary' : 'secondary'}
							onClick={() => setActiveTab('sizing')}
						>
							{__('Sizing', 'full-page-slider')}
						</Button>
						<Button
							variant={activeTab === 'position' ? 'primary' : 'secondary'}
							onClick={() => setActiveTab('position')}
						>
							{__('Position', 'full-page-slider')}
						</Button>
						<Button
							variant={activeTab === 'style' ? 'primary' : 'secondary'}
							onClick={() => setActiveTab('style')}
						>
							{__('Style', 'full-page-slider')}
						</Button>
					</ButtonGroup>
				</div>

				{/* Layout Tab */}
				{activeTab === 'layout' && (
					<PanelBody title={__('Layout Type', 'full-page-slider')} initialOpen={true}>
						<SelectControl
							label={__('Display Type', 'full-page-slider')}
							value={layoutType}
							options={[
								{ label: __('Flexbox', 'full-page-slider'), value: 'flex' },
								{ label: __('Grid', 'full-page-slider'), value: 'grid' },
							]}
							onChange={(value) => setAttributes({ layoutType: value })}
						/>

						{layoutType === 'flex' && (
							<>
								<SelectControl
									label={__('Flex Direction', 'full-page-slider')}
									value={flexDirection}
									options={[
										{ label: __('Row', 'full-page-slider'), value: 'row' },
										{ label: __('Row Reverse', 'full-page-slider'), value: 'row-reverse' },
										{ label: __('Column', 'full-page-slider'), value: 'column' },
										{ label: __('Column Reverse', 'full-page-slider'), value: 'column-reverse' },
									]}
									onChange={(value) => setAttributes({ flexDirection: value })}
								/>

								<SelectControl
									label={__('Flex Wrap', 'full-page-slider')}
									value={flexWrap}
									options={[
										{ label: __('No Wrap', 'full-page-slider'), value: 'nowrap' },
										{ label: __('Wrap', 'full-page-slider'), value: 'wrap' },
										{ label: __('Wrap Reverse', 'full-page-slider'), value: 'wrap-reverse' },
									]}
									onChange={(value) => setAttributes({ flexWrap: value })}
								/>

								<SelectControl
									label={__('Justify Content', 'full-page-slider')}
									value={justifyContent}
									options={[
										{ label: __('Flex Start', 'full-page-slider'), value: 'flex-start' },
										{ label: __('Flex End', 'full-page-slider'), value: 'flex-end' },
										{ label: __('Center', 'full-page-slider'), value: 'center' },
										{ label: __('Space Between', 'full-page-slider'), value: 'space-between' },
										{ label: __('Space Around', 'full-page-slider'), value: 'space-around' },
										{ label: __('Space Evenly', 'full-page-slider'), value: 'space-evenly' },
									]}
									onChange={(value) => setAttributes({ justifyContent: value })}
								/>

								<SelectControl
									label={__('Align Items', 'full-page-slider')}
									value={alignItems}
									options={[
										{ label: __('Stretch', 'full-page-slider'), value: 'stretch' },
										{ label: __('Flex Start', 'full-page-slider'), value: 'flex-start' },
										{ label: __('Flex End', 'full-page-slider'), value: 'flex-end' },
										{ label: __('Center', 'full-page-slider'), value: 'center' },
										{ label: __('Baseline', 'full-page-slider'), value: 'baseline' },
									]}
									onChange={(value) => setAttributes({ alignItems: value })}
								/>

								{flexWrap !== 'nowrap' && (
									<SelectControl
										label={__('Align Content', 'full-page-slider')}
										value={alignContent}
										options={[
											{ label: __('Stretch', 'full-page-slider'), value: 'stretch' },
											{ label: __('Flex Start', 'full-page-slider'), value: 'flex-start' },
											{ label: __('Flex End', 'full-page-slider'), value: 'flex-end' },
											{ label: __('Center', 'full-page-slider'), value: 'center' },
											{ label: __('Space Between', 'full-page-slider'), value: 'space-between' },
											{ label: __('Space Around', 'full-page-slider'), value: 'space-around' },
										]}
										onChange={(value) => setAttributes({ alignContent: value })}
									/>
								)}

								<UnitControl
									label={__('Gap', 'full-page-slider')}
									value={`${gap.value}${gap.unit}`}
									onChange={(value) => {
										const numValue = parseFloat(value) || 0;
										const unit = value.replace(/[0-9.-]/g, '') || 'px';
										setAttributes({ gap: { value: numValue, unit } });
									}}
								/>
							</>
						)}

						{layoutType === 'grid' && (
							<>
								<TextControl
									label={__('Grid Template Columns', 'full-page-slider')}
									value={gridTemplateColumns}
									onChange={(value) => setAttributes({ gridTemplateColumns: value })}
									help={__('e.g., 1fr 1fr 1fr or repeat(3, 1fr) or 200px auto 1fr', 'full-page-slider')}
								/>

								<TextControl
									label={__('Grid Template Rows', 'full-page-slider')}
									value={gridTemplateRows}
									onChange={(value) => setAttributes({ gridTemplateRows: value })}
									help={__('e.g., auto or 100px 200px or repeat(2, 1fr)', 'full-page-slider')}
								/>

								<SelectControl
									label={__('Grid Auto Flow', 'full-page-slider')}
									value={gridAutoFlow}
									options={[
										{ label: __('Row', 'full-page-slider'), value: 'row' },
										{ label: __('Column', 'full-page-slider'), value: 'column' },
										{ label: __('Row Dense', 'full-page-slider'), value: 'row dense' },
										{ label: __('Column Dense', 'full-page-slider'), value: 'column dense' },
									]}
									onChange={(value) => setAttributes({ gridAutoFlow: value })}
								/>

								<UnitControl
									label={__('Grid Gap', 'full-page-slider')}
									value={`${gridGap.value}${gridGap.unit}`}
									onChange={(value) => {
										const numValue = parseFloat(value) || 0;
										const unit = value.replace(/[0-9.-]/g, '') || 'px';
										setAttributes({ gridGap: { value: numValue, unit } });
									}}
								/>
							</>
						)}
					</PanelBody>
				)}

				{/* Sizing Tab */}
				{activeTab === 'sizing' && (
					<>
						<PanelBody title={__('Dimensions', 'full-page-slider')} initialOpen={true}>
							<Flex>
								<FlexItem>
									<UnitControl
										label={__('Width', 'full-page-slider')}
										value={width.value ? `${width.value}${width.unit}` : ''}
										onChange={(value) => {
											const numValue = parseFloat(value) || '';
											const unit = value.replace(/[0-9.-]/g, '') || '%';
											setAttributes({ width: { value: numValue, unit } });
										}}
									/>
								</FlexItem>
								<FlexItem>
									<UnitControl
										label={__('Height', 'full-page-slider')}
										value={height.value ? `${height.value}${height.unit}` : ''}
										onChange={(value) => {
											const numValue = parseFloat(value) || '';
											const unit = value.replace(/[0-9.-]/g, '') || '%';
											setAttributes({ height: { value: numValue, unit } });
										}}
									/>
								</FlexItem>
							</Flex>

							<Flex>
								<FlexItem>
									<UnitControl
										label={__('Min Width', 'full-page-slider')}
										value={minWidth.value ? `${minWidth.value}${minWidth.unit}` : ''}
										onChange={(value) => {
											const numValue = parseFloat(value) || '';
											const unit = value.replace(/[0-9.-]/g, '') || 'px';
											setAttributes({ minWidth: { value: numValue, unit } });
										}}
									/>
								</FlexItem>
								<FlexItem>
									<UnitControl
										label={__('Min Height', 'full-page-slider')}
										value={minHeight.value ? `${minHeight.value}${minHeight.unit}` : ''}
										onChange={(value) => {
											const numValue = parseFloat(value) || '';
											const unit = value.replace(/[0-9.-]/g, '') || 'px';
											setAttributes({ minHeight: { value: numValue, unit } });
										}}
									/>
								</FlexItem>
							</Flex>

							<Flex>
								<FlexItem>
									<UnitControl
										label={__('Max Width', 'full-page-slider')}
										value={maxWidth.value ? `${maxWidth.value}${maxWidth.unit}` : ''}
										onChange={(value) => {
											const numValue = parseFloat(value) || '';
											const unit = value.replace(/[0-9.-]/g, '') || 'px';
											setAttributes({ maxWidth: { value: numValue, unit } });
										}}
									/>
								</FlexItem>
								<FlexItem>
									<UnitControl
										label={__('Max Height', 'full-page-slider')}
										value={maxHeight.value ? `${maxHeight.value}${maxHeight.unit}` : ''}
										onChange={(value) => {
											const numValue = parseFloat(value) || '';
											const unit = value.replace(/[0-9.-]/g, '') || 'px';
											setAttributes({ maxHeight: { value: numValue, unit } });
										}}
									/>
								</FlexItem>
							</Flex>

							<Button
								variant="secondary"
								onClick={() => setAttributes({
									width: { value: 100, unit: '%' },
									height: { value: 100, unit: '%' }
								})}
								style={{ marginTop: '8px' }}
							>
								{__('Fill Slider Dimensions', 'full-page-slider')}
							</Button>
						</PanelBody>

						<PanelBody title={__('Spacing', 'full-page-slider')} initialOpen={false}>
							<DimensionsControl
								label={__('Padding', 'full-page-slider')}
								value={padding}
								onChange={(newVal) => setAttributes({ padding: newVal })}
							/>

							<DimensionsControl
								label={__('Margin', 'full-page-slider')}
								value={margin}
								onChange={(newVal) => setAttributes({ margin: newVal })}
							/>
						</PanelBody>
					</>
				)}

				{/* Position Tab */}
				{activeTab === 'position' && (
					<PanelBody title={__('Positioning', 'full-page-slider')} initialOpen={true}>
						<SelectControl
							label={__('Position', 'full-page-slider')}
							value={position}
							options={[
								{ label: __('Static', 'full-page-slider'), value: 'static' },
								{ label: __('Relative', 'full-page-slider'), value: 'relative' },
								{ label: __('Absolute', 'full-page-slider'), value: 'absolute' },
								{ label: __('Fixed', 'full-page-slider'), value: 'fixed' },
								{ label: __('Sticky', 'full-page-slider'), value: 'sticky' },
							]}
							onChange={(value) => setAttributes({ position: value })}
						/>

						{position !== 'static' && (
							<>
								<Flex>
									<FlexItem>
										<UnitControl
											label={__('Top', 'full-page-slider')}
											value={top.value ? `${top.value}${top.unit}` : ''}
											onChange={(value) => {
												const numValue = parseFloat(value) || '';
												const unit = value.replace(/[0-9.-]/g, '') || 'px';
												setAttributes({ top: { value: numValue, unit } });
											}}
										/>
									</FlexItem>
									<FlexItem>
										<UnitControl
											label={__('Right', 'full-page-slider')}
											value={right.value ? `${right.value}${right.unit}` : ''}
											onChange={(value) => {
												const numValue = parseFloat(value) || '';
												const unit = value.replace(/[0-9.-]/g, '') || 'px';
												setAttributes({ right: { value: numValue, unit } });
											}}
										/>
									</FlexItem>
								</Flex>

								<Flex>
									<FlexItem>
										<UnitControl
											label={__('Bottom', 'full-page-slider')}
											value={bottom.value ? `${bottom.value}${bottom.unit}` : ''}
											onChange={(value) => {
												const numValue = parseFloat(value) || '';
												const unit = value.replace(/[0-9.-]/g, '') || 'px';
												setAttributes({ bottom: { value: numValue, unit } });
											}}
										/>
									</FlexItem>
									<FlexItem>
										<UnitControl
											label={__('Left', 'full-page-slider')}
											value={left.value ? `${left.value}${left.unit}` : ''}
											onChange={(value) => {
												const numValue = parseFloat(value) || '';
												const unit = value.replace(/[0-9.-]/g, '') || 'px';
												setAttributes({ left: { value: numValue, unit } });
											}}
										/>
									</FlexItem>
								</Flex>

								<RangeControl
									label={__('Z-Index', 'full-page-slider')}
									value={zIndex}
									onChange={(value) => setAttributes({ zIndex: value })}
									min={-10}
									max={100}
									allowReset={true}
								/>
							</>
						)}

						<SelectControl
							label={__('Overflow', 'full-page-slider')}
							value={overflow}
							options={[
								{ label: __('Visible', 'full-page-slider'), value: 'visible' },
								{ label: __('Hidden', 'full-page-slider'), value: 'hidden' },
								{ label: __('Scroll', 'full-page-slider'), value: 'scroll' },
								{ label: __('Auto', 'full-page-slider'), value: 'auto' },
							]}
							onChange={(value) => setAttributes({ overflow: value })}
						/>
					</PanelBody>
				)}

				{/* Style Tab */}
				{activeTab === 'style' && (
					<>
						<PanelBody title={__('Background', 'full-page-slider')} initialOpen={true}>
							<ColorPickerComponent
								value={backgroundColor}
								onChange={(color) => setAttributes({ backgroundColor: color })}
								label={__('Background Color', 'full-page-slider')}
							/>

							<TextControl
								label={__('Background Image URL', 'full-page-slider')}
								value={backgroundImage}
								onChange={(value) => setAttributes({ backgroundImage: value })}
							/>
						</PanelBody>

						<PanelBody title={__('Border & Effects', 'full-page-slider')} initialOpen={false}>
							<UnitControl
								label={__('Border Radius', 'full-page-slider')}
								value={borderRadius.value ? `${borderRadius.value}${borderRadius.unit}` : ''}
								onChange={(value) => {
									const numValue = parseFloat(value) || 0;
									const unit = value.replace(/[0-9.-]/g, '') || 'px';
									setAttributes({ borderRadius: { value: numValue, unit } });
								}}
							/>

							<Flex>
								<FlexItem>
									<UnitControl
										label={__('Border Width', 'full-page-slider')}
										value={border.width ? `${border.width}${border.unit}` : ''}
										onChange={(value) => {
											const numValue = parseFloat(value) || 0;
											const unit = value.replace(/[0-9.-]/g, '') || 'px';
											setAttributes({ 
												border: { 
													...border, 
													width: numValue, 
													unit 
												} 
											});
										}}
									/>
								</FlexItem>
								<FlexItem>
									<SelectControl
										label={__('Border Style', 'full-page-slider')}
										value={border.style}
										options={[
											{ label: __('Solid', 'full-page-slider'), value: 'solid' },
											{ label: __('Dashed', 'full-page-slider'), value: 'dashed' },
											{ label: __('Dotted', 'full-page-slider'), value: 'dotted' },
											{ label: __('Double', 'full-page-slider'), value: 'double' },
										]}
										onChange={(value) => setAttributes({ border: { ...border, style: value } })}
									/>
								</FlexItem>
							</Flex>

							<ColorPickerComponent
								value={border.color}
								onChange={(color) => setAttributes({ border: { ...border, color } })}
								label={__('Border Color', 'full-page-slider')}
							/>

							<TextControl
								label={__('Box Shadow', 'full-page-slider')}
								value={boxShadow}
								onChange={(value) => setAttributes({ boxShadow: value })}
								help={__('e.g., 0 4px 8px rgba(0,0,0,0.1)', 'full-page-slider')}
							/>
						</PanelBody>
					</>
				)}
			</InspectorControls>

			<div {...blockProps}>
				<div {...innerBlocksProps} />
			</div>
		</>
	);
}
