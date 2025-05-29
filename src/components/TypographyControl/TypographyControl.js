import {
	Button,
	Flex,
	FlexItem,
	Popover,
	RangeControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { useRef, useState } from '@wordpress/element';

import { __ } from '@wordpress/i18n';
import { __experimentalUseAnchor as useAnchor } from '@wordpress/components';

const FONT_WEIGHTS = [
	{ label: __('Default'), value: '' },
	{ label: __('Light'), value: '300' },
	{ label: __('Regular'), value: '400' },
	{ label: __('Medium'), value: '500' },
	{ label: __('Bold'), value: '700' },
	{ label: __('Black'), value: '900' },
];

const TEXT_TRANSFORMS = [
	{ label: __('Default'), value: '' },
	{ label: __('Uppercase'), value: 'uppercase' },
	{ label: __('Lowercase'), value: 'lowercase' },
	{ label: __('Capitalize'), value: 'capitalize' },
];

export default function TypographyControl({ label, value = {}, onChange }) {
	const [isOpen, setOpen] = useState(false);
	const buttonRef = useRef();

	const update = (key, val) => {
		onChange({ ...value, [key]: val });
	};

	return (
		<div className="typography-popover-control">
			<Flex>
				<FlexItem>{label}</FlexItem>
				<FlexItem>
					<Button
						ref={buttonRef}
						variant="secondary"
						icon="edit"
						onClick={() => setOpen(!isOpen)}
					></Button>
				</FlexItem>
			</Flex>

			{isOpen && (
				<Popover
					anchorRef={buttonRef}
					onClose={() => setOpen(false)}
					placement="right-start"
					className="typography-popover"
				>
					<div style={{ padding: '16px', width: '250px', maxWidth: '250px' }}>
						
						<TextControl
							label={__('Font Family')}
							value={value.fontFamily}
							onChange={(v) => update('fontFamily', v)}
						/>

						<SelectControl
							label={__('Font Weight')}
							value={value.fontWeight}
							options={FONT_WEIGHTS}
							onChange={(v) => update('fontWeight', v)}
						/>

						<RangeControl
							label={__('Font Size')}
							value={value.fontSize}
							onChange={(v) => update('fontSize', v)}
							min={8}
							max={100}
						/>

						<RangeControl
							label={__('Line Height')}
							value={value.lineHeight}
							onChange={(v) => update('lineHeight', v)}
							min={0.5}
							max={5}
							step={0.1}
						/>

						<RangeControl
							label={__('Letter Spacing')}
							value={value.letterSpacing}
							onChange={(v) => update('letterSpacing', v)}
							min={-2}
							max={10}
							step={0.1}
						/>

						<SelectControl
							label={__('Text Transform')}
							value={value.textTransform}
							options={TEXT_TRANSFORMS}
							onChange={(v) => update('textTransform', v)}
						/>
					</div>
				</Popover>
			)}
		</div>
	);
}
