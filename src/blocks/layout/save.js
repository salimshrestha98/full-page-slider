import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

	const blockProps = useBlockProps.save({
		style: containerStyles,
		className: `fps-layout fps-layout--${layoutType}`,
	});

	const innerBlocksProps = useInnerBlocksProps.save({
		className: 'fps-layout__inner',
	});

	return (
		<div {...blockProps}>
			<div {...innerBlocksProps} />
		</div>
	);
}
