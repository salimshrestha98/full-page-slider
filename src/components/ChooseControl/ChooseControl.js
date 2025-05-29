import { BaseControl, Button, ButtonGroup, __experimentalToolsPanelItem as ToolsPanelItem, Tooltip } from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

const ChooseControl = ({
	label = '',
	value,
	onChange,
	options = [],
}) => {
	const handleSelect = (newVal) => {
		if (newVal === value) {
			onChange(undefined); // Deselect
		} else {
			onChange(newVal);
		}
	};

	return (
		<BaseControl label={__(label, 'full-page-slider')}>
			<ButtonGroup>
				{options.map((option) => (
					<Tooltip key={option.value} text={option.label}>
						<Button
							icon={option.icon}
							isPressed={value === option.value}
							onClick={() => handleSelect(option.value)}
							className={classnames('custom-align-button', {
								'is-active': value === option.value,
							})}
						/>
					</Tooltip>
				))}
			</ButtonGroup>
		</BaseControl>
	);
};

export default ChooseControl;
