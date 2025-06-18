import './style.scss';

import { BaseControl, Button, Flex, Popover, ColorPicker as WPColorPicker } from '@wordpress/components';
import { useRef, useState } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

const ColorPicker = ({ label, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <BaseControl className="fpslider-color-picker-control">
			<Flex>
				<span className="fpslider-control-label">{__(label, 'full-page-slider')}</span>
				<Button
					style={{
						background: value ?? '#ffffff',
						width: '20px',
						height: '20px',
						borderRadius: '50%',
						padding: 0,
						border: '1px solid #aaaaaa'
					}}
					onClick={() => setIsOpen(!isOpen)}
					aria-label={__('Select color', 'full-page-slider')}
					title={value ?? __('Not Set', 'full-page-slider')}
				></Button>
			</Flex>
            {isOpen && (
                <Popover
					className="fpslider-color-picker__popover"
					onClose={() => setIsOpen(false)}
                >
                    <WPColorPicker
                        color={value}
                        onChangeComplete={(newColor) => onChange(newColor?.hex)}
                        enableAlpha
                        defaultValue={value}
                    />

					<Button
					className='fpslider-color-picker__popover__reset_btn'
						onClick={() => onChange(undefined)}
						size='small'
						variant='secondary'
						isDestructive
					>
						{__('Reset', 'full-page-slider')}
					</Button>
                </Popover>
            )}
        </BaseControl>
    );
};

export default ColorPicker;
