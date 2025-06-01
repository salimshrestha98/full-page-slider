import {
	Button,
	Flex,
	FlexItem,
	Popover,
	RangeControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { FONT_FAMILIES, FONT_WEIGHTS, TEXT_TRANSFORMS } from './types';
import { useRef, useState } from '@wordpress/element';

import {UnitRangeControl} from'../../components';
import { __ } from '@wordpress/i18n';
import { __experimentalUseAnchor as useAnchor } from '@wordpress/components';

export default function TypographyControl({ label, value = {}, onChange }) {
	const [isOpen, setOpen] = useState(false);
	const buttonRef = useRef();

	const update = (key, val) => {
		onChange({ ...value, [key]: val });
	};

	return (
		<div className="typography-popover-control">
			<Flex>
				<FlexItem>{__(label, 'full-page-slider')}</FlexItem>
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
						
						<SelectControl
							label={__('Font Family', 'full-page-slider')}
							value={value.fontFamily}
							options={FONT_FAMILIES}
							onChange={(v) => update('fontFamily', v)}
						/>

						<SelectControl
							label={__('Font Weight', 'full-page-slider')}
							value={value.fontWeight}
							options={FONT_WEIGHTS}
							onChange={(v) => update('fontWeight', v)}
						/>

						<UnitRangeControl
							label={__('Font Size', 'full-page-slider')}
							value={value.fontSize}
							onChange={(v) => update('fontSize', v)}
							min={0}
							max={100}
							units={['px', 'em', 'rem']}
							range={{
								px: {
									min: 0,
									max: 100,
									step: 1
								},
								em: {
									min: 0,
									max: 5,
									step: 0.1
								},
								rem: {
									min: 0,
									max: 5,
									step: 0.1
								}

							}}
						/>

						<RangeControl
							label={__('Line Height', 'full-page-slider')}
							value={value.lineHeight}
							onChange={(v) => update('lineHeight', v)}
							min={0.5}
							max={5}
							step={0.1}
						/>

						<RangeControl
							label={__('Letter Spacing', 'full-page-slider')}
							value={value.letterSpacing}
							onChange={(v) => update('letterSpacing', v)}
							min={-2}
							max={10}
							step={0.1}
						/>

						<SelectControl
							label={__('Text Transform', 'full-page-slider')}
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
