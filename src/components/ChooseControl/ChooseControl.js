import './style.scss';

import { 
    BaseControl, 
    Button, 
    __experimentalToggleGroupControl as ToggleGroupControl, 
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon, 
    Flex, 
    FlexItem, 
    __experimentalToolsPanelItem as ToolsPanelItem, 
    Tooltip 
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

const ChooseControl = ({
	label = '',
	value,
	onChange,
	options = [],
	toggle=false
}) => {
	const handleSelect = (newVal) => {
		if (newVal === value && toggle) {
			onChange(undefined);
		} else {
			onChange(newVal);
		}
	};

	return (
		<BaseControl className="fpslider-choose-control" __nextHasNoMarginBottom>
			<Flex>
				<FlexItem>
					<label>{__(label, 'full-page-slider')}</label>
				</FlexItem>
				<FlexItem>
					<ToggleGroupControl
						value={value}
						onChange={handleSelect}
						isBlock
					>
						{options.map((option) => (
							<ToggleGroupControlOptionIcon
								key={option.value}
								value={option.value}
								label={option.label}
								icon={option.icon}
							/>
						))}
					</ToggleGroupControl>
				</FlexItem>
			</Flex>
		</BaseControl>
	);
};

export default ChooseControl;
