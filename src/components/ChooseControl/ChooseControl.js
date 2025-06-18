import './style.scss';

import { BaseControl, Button, ButtonGroup, Flex, FlexItem, __experimentalToolsPanelItem as ToolsPanelItem, Tooltip } from '@wordpress/components';

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
		if (newVal === value) {
			if ( toggle ) {
				onChange(undefined);
			}
		} else {
			onChange(newVal);
		}
	};

	return (
		<BaseControl className="fpslider-choose-control">
			<Flex>
				<FlexItem>
					<label>{__(label, 'full-page-slider')}</label>
				</FlexItem>
				<FlexItem>
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
				</FlexItem>
			</Flex>
		</BaseControl>
	);
};

export default ChooseControl;
