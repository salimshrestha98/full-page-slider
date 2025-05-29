import './style.scss';

import {
	BaseControl,
	Flex,
	FlexItem,
	IconButton,
	__experimentalNumberControl as NumberControl,
	SelectControl,
	Tooltip,
} from '@wordpress/components';
import { link as linkIcon, linkOff as unlinkIcon } from '@wordpress/icons';

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

const UNIT_OPTIONS = [
	{ label: 'px', value: 'px' },
	{ label: '%', value: '%' },
	{ label: 'em', value: 'em' },
	{ label: 'rem', value: 'rem' },
	{ label: 'vh', value: 'vh' },
	{ label: 'vw', value: 'vw' },
];

const DimensionsControl = ({ label = 'Dimensions', value = {}, onChange }) => {
	const { top = '', right = '', bottom = '', left = '', unit = 'px' } = value;

	const [linked, setLinked] = useState(top === right && right === bottom && bottom === left);

	const setAllSides = (val) => {
		onChange({ top: val, right: val, bottom: val, left: val, unit });
	};

	const handleChange = (side, val) => {
		if (linked) {
			setAllSides(val);
		} else {
			onChange({ ...value, [side]: val });
		}
	};

	const handleUnitChange = (newUnit) => {
		onChange({ ...value, unit: newUnit });
	};

	const toggleLink = () => {
		if (!linked) {
			// Link sides using current top value
			setAllSides(top);
		}
		setLinked(!linked);
	};

	return (
		<BaseControl
			className="full-page-slider-dimensions-control"
			label={
				<Flex justify="space-between" align="center">
					<span>{label}</span>
					<Flex align="center" style={{ justifyContent: 'end'}}>
						<Tooltip text={linked ? 'Unlink sides' : 'Link sides'}>
							<IconButton
								icon={linked ? unlinkIcon : linkIcon}
								label={linked ? 'Unlink' : 'Link'}
								onClick={toggleLink}
								isSmall
								variant="tertiary"
								style={{ margin: 0 }}
							/>
						</Tooltip>
						<SelectControl
							className="unit-selector"
							label=""
							value={unit}
							options={UNIT_OPTIONS}
							onChange={handleUnitChange}
							style={{ maxWidth: '70px', margin: 0 }}
						/>
					</Flex>
				</Flex>
			}
			style={{marginBottom: 0}}
		>
			<Flex gap={2}>
				{['top', 'right', 'bottom', 'left'].map((side) => (
					<FlexItem key={side}>
						<NumberControl
							label={side[0].toUpperCase()}
							value={value[side]}
							onChange={(val) => handleChange(side, val)}
							isShiftStepEnabled
							shiftStep={10}
							step={1}
							min={0}
							max={100}
							disabled={linked && side !== 'top'}
						/>
					</FlexItem>
				))}
			</Flex>
		</BaseControl>
	);
};

export default DimensionsControl;
