import {Flex, FlexItem, RangeControl} from '@wordpress/components';

const UnitRangeControl = (
	{
		value = {},
		onChange,
		units=['px', 'em', 'rem', '%'],
		range = {},
		style = {},
		...rangeControlProps
	}
) => {
	
const handleChange = (key, newValue) => {
	const newValueObj = { ...value, [key]: newValue };

	// If unit is not yet set and we're changing something else (like size)
	if (!newValueObj.unit && key !== 'unit') {
		newValueObj.unit = 'px';
	}

	onChange(newValueObj);
}

	const unitRange = range[value?.unit] || {};

	return (
		<Flex style={{
			gap: 0,
			...style
		}}>
			<FlexItem style={{flexGrow: 1}}>
				<RangeControl {...rangeControlProps} value={value?.size} onChange={(newSize) => handleChange('size', newSize)} {...unitRange} />
			</FlexItem>
			<FlexItem>
				<select
					value={value.unit || 'px'}
					onChange={(e) => handleChange('unit', e.target.value)}
					style={{marginTop: '15px', lineHeight: 2.1}}
				>
					{units.map((unit) => (
						<option value={unit}>{unit}</option>
					))}
				</select>
			</FlexItem>
		</Flex>
	)
}

export default UnitRangeControl;