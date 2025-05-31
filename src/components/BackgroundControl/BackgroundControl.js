import './style.scss';

import {
    AlignmentMatrixControl,
    BaseControl,
    Button,
    ColorPalette,
    Flex,
    FlexItem,
    GradientPicker,
    PanelBody,
    Popover,
    RangeControl,
    SelectControl,
    TextControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption
} from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';
import { __experimentalGradientPickerControl as GradientPickerControl, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { background, brush, color, edit as editIcon, image, image as imageIcon, styles } from '@wordpress/icons';

import ChooseControl from '../ChooseControl/ChooseControl';
import ColorPicker from '../ColorPicker/ColorPicker';
import { __ } from '@wordpress/i18n';

const BackgroundControl = ({
    label = 'Background',
    value = {},
    onChange,
    enableColor = true,
    enableGradient = true,
    enableImage = true,
    colors = [],
    gradients = [],
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const setBackgroundValue = (key, newValue) => {
        onChange({ ...value, [key]: newValue });
    };

    const removeImage = () => {
        const newValue = { ...value };
        delete newValue.image;
        onChange(newValue);
    };

	let BACKGROUND_TYPES = [];
	if (enableColor) BACKGROUND_TYPES.push({ value: 'color', label: 'Color', icon: color });
	if (enableGradient) BACKGROUND_TYPES.push({ value: 'gradient', label: 'Gradient', icon: styles });
	if (enableImage) BACKGROUND_TYPES.push({ value: 'image', label: 'Image', icon: image });

    return (
        <BaseControl className="fps-background-control">
            <ChooseControl
                label={label}
                value={value.backgroundType || 'color'}
                onChange={(val) => setBackgroundValue('backgroundType', val )}
                options={BACKGROUND_TYPES}
            />

            {('color' == value.backgroundType || !value.backgroundType) && (
                <Fragment>
                    <ColorPicker
						label='Background Color'
                        value={value.color}
						onChange={(newColor) => setBackgroundValue('color', newColor)}
                    />
                </Fragment>
            )}

            {'gradient' == value.backgroundType && (
                <Fragment>
                    <GradientPicker
                        value={value.gradient}
                        gradients={gradients}
                        onChange={(newGradient) => setBackgroundValue('gradient', newGradient)}
                    />
                </Fragment>
            )}

            {'image' == value.backgroundType && (
                <Fragment>
                    <MediaUploadCheck>
                        <MediaUpload
                            value={value.id}
                            onSelect={(media) => setBackgroundValue('image', media)}
                            allowedTypes={['image']}
                            render={({ open }) => (
                                <>
                                    <Flex direction='column' gap='8px'>
                                        <img
                                            src={value.image ? value.image.url : fullPageSliderL10n.pluginURL + '/assets/image/default-placeholder.jpg'}
                                            onClick={open}
                                            style={{
                                                maxHeight: '150px',
                                                borderRadius: '5px',
                                                maxWidth: '100%',
                                                padding: '0 20px',
                                                objectFit: 'contain',
                                            }}
                                        />

                                        {value.image && (
                                            <Button onClick={removeImage} isDestructive isLink>
                                                {__('Remove Image', 'full-page-slider')}
                                            </Button>
                                        )}
                                    </Flex>
                                </>
                            )}
                        />
                    </MediaUploadCheck>
                </Fragment>
            )}

            {'image' == value.backgroundType && (
                <div style={{marginTop: '15px'}}>
                    <Flex>
                        <label>Advanced Controls</label>
                        <Button
                            variant="secondary"
                            icon={brush}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                        </Button>
                    </Flex>
                    {isOpen && (
                        <Popover
                            onClose={() => setIsOpen(false)}
                            placement="bottom-start"
                            className="fps-background-control__popover"
                        >
                            <SelectControl
                                label={__('Background Size', 'full-page-slider')}
                                value={value?.backgroundSize}
                                options={[
                                    { label: __('Default', 'full-page-slider'), value: 'auto' },
                                    { label: __('Cover', 'full-page-slider'), value: 'cover' },
                                    { label: __('Contain', 'full-page-slider'), value: 'contain' },
                                ]}
                                onChange={(value) => setBackgroundValue('backgroundSize', value)}
                            />

                            <label className='fps-control-label'>Background Position</label>
                            <AlignmentMatrixControl
                                label={__('Background Position', 'full-page-slider')}
                                value={value?.backgroundPosition}
                                onChange={(value) => setBackgroundValue('backgroundPosition', value)}
                            />

                            <SelectControl
                                label={__('Background Repeat', 'full-page-slider')}
                                value={value?.backgroundRepeat}
                                options={[
                                    { label: __('Repeat', 'full-page-slider'), value: 'repeat' },
                                    { label: __('No Repeat', 'full-page-slider'), value: 'no-repeat' },
                                    { label: __('Repeat X', 'full-page-slider'), value: 'repeat-x' },
                                    { label: __('Repeat Y', 'full-page-slider'), value: 'repeat-y' },
                                ]}
                                onChange={(value) => setBackgroundValue('backgroundRepeat', value)}
                            />

                            <SelectControl
                                label={__('Background Attachment', 'full-page-slider')}
                                value={value?.backgroundAttachment}
                                options={[
                                    { label: __('Scroll', 'full-page-slider'), value: 'scroll' },
                                    { label: __('Fixed', 'full-page-slider'), value: 'fixed' },
                                    { label: __('Local', 'full-page-slider'), value: 'local' },
                                ]}
                                onChange={(value) => setBackgroundValue('backgroundAttachment', value)}
                            />
                        </Popover>
                    )}
                </div>
            )}
        </BaseControl>
    );
};

export default BackgroundControl;
