import {
    BackgroundControl,
    ChooseControl,
    ColorPicker,
    DimensionsControl,
    TypographyControl
} from '../../components';
import {
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
    __experimentalVStack as VStack,
    __experimentalHStack as HStack,
    __experimentalText as Text,
    __experimentalHeading as Heading,
    BaseControl,
    Button,
    Card,
    CardBody,
    CardHeader,
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    ToggleControl,
    TextControl,
    TabPanel,
    Icon,
    Flex,
    FlexItem,
    __experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { justifyCenter, justifyLeft, justifyRight, video, image, overlayText, shadow, chevronDown, chevronUp } from '@wordpress/icons';
import { MediaUpload, MediaUploadCheck, InspectorControls as WPInspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Collapsible Section Component for better UX
 */
const CollapsibleSection = ({ title, children, defaultOpen = false, icon }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="fps-collapsible-section" style={{
            borderBottom: '1px solid #e0e0e0',
            marginBottom: '0',
        }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '12px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#1e1e1e',
                }}
            >
                <HStack spacing={2}>
                    {icon && <Icon icon={icon} size={18} />}
                    <span>{title}</span>
                </HStack>
                <Icon icon={isOpen ? chevronUp : chevronDown} size={20} />
            </button>
            {isOpen && (
                <div style={{ paddingBottom: '16px' }}>
                    {children}
                </div>
            )}
        </div>
    );
};

/**
 * Video Background Control Component
 */
const VideoBackgroundControl = ({ value = {}, onChange }) => {
    const updateValue = (key, newValue) => {
        onChange({ ...value, [key]: newValue });
    };

    return (
        <VStack spacing={3}>
            <MediaUploadCheck>
                <MediaUpload
                    value={value.id}
                    onSelect={(media) => {
                        onChange({
                            ...value,
                            url: media.url,
                            id: media.id,
                        });
                    }}
                    allowedTypes={['video']}
                    render={({ open }) => (
                        <VStack spacing={2}>
                            {value.url ? (
                                <div style={{
                                    position: 'relative',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    backgroundColor: '#000',
                                }}>
                                    <video
                                        src={value.url}
                                        style={{
                                            width: '100%',
                                            maxHeight: '120px',
                                            objectFit: 'cover',
                                        }}
                                        muted
                                    />
                                    <HStack spacing={2} style={{ marginTop: '8px' }}>
                                        <Button variant="secondary" onClick={open} size="small">
                                            {__('Replace', 'full-page-slider')}
                                        </Button>
                                        <Button
                                            variant="tertiary"
                                            isDestructive
                                            onClick={() => onChange({ ...value, url: '', id: null })}
                                            size="small"
                                        >
                                            {__('Remove', 'full-page-slider')}
                                        </Button>
                                    </HStack>
                                </div>
                            ) : (
                                <Button variant="secondary" onClick={open} style={{ width: '100%' }}>
                                    {__('Select Video', 'full-page-slider')}
                                </Button>
                            )}
                        </VStack>
                    )}
                />
            </MediaUploadCheck>

            {value.url && (
                <>
                    <MediaUploadCheck>
                        <MediaUpload
                            value={value.posterId}
                            onSelect={(media) => updateValue('poster', media.url)}
                            allowedTypes={['image']}
                            render={({ open }) => (
                                <BaseControl label={__('Poster Image (Fallback)', 'full-page-slider')} __nextHasNoMarginBottom>
                                    {value.poster ? (
                                        <VStack spacing={2}>
                                            <img
                                                src={value.poster}
                                                alt=""
                                                style={{
                                                    width: '100%',
                                                    maxHeight: '80px',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px',
                                                }}
                                            />
                                            <HStack>
                                                <Button variant="link" onClick={open} size="small">
                                                    {__('Replace', 'full-page-slider')}
                                                </Button>
                                                <Button
                                                    variant="link"
                                                    isDestructive
                                                    onClick={() => updateValue('poster', '')}
                                                    size="small"
                                                >
                                                    {__('Remove', 'full-page-slider')}
                                                </Button>
                                            </HStack>
                                        </VStack>
                                    ) : (
                                        <Button variant="link" onClick={open}>
                                            {__('Set poster image', 'full-page-slider')}
                                        </Button>
                                    )}
                                </BaseControl>
                            )}
                        />
                    </MediaUploadCheck>

                    <HStack spacing={4}>
                        <ToggleControl
                            label={__('Loop', 'full-page-slider')}
                            checked={value.loop !== false}
                            onChange={(val) => updateValue('loop', val)}
                            __nextHasNoMarginBottom
                        />
                        <ToggleControl
                            label={__('Muted', 'full-page-slider')}
                            checked={value.muted !== false}
                            onChange={(val) => updateValue('muted', val)}
                            __nextHasNoMarginBottom
                        />
                    </HStack>
                </>
            )}
        </VStack>
    );
};

/**
 * Overlay Control Component
 */
const OverlayControl = ({ value = {}, onChange }) => {
    const updateValue = (key, newValue) => {
        onChange({ ...value, [key]: newValue });
    };

    const blendModes = [
        { label: __('Normal', 'full-page-slider'), value: 'normal' },
        { label: __('Multiply', 'full-page-slider'), value: 'multiply' },
        { label: __('Screen', 'full-page-slider'), value: 'screen' },
        { label: __('Overlay', 'full-page-slider'), value: 'overlay' },
        { label: __('Darken', 'full-page-slider'), value: 'darken' },
        { label: __('Lighten', 'full-page-slider'), value: 'lighten' },
        { label: __('Color Dodge', 'full-page-slider'), value: 'color-dodge' },
        { label: __('Color Burn', 'full-page-slider'), value: 'color-burn' },
        { label: __('Hard Light', 'full-page-slider'), value: 'hard-light' },
        { label: __('Soft Light', 'full-page-slider'), value: 'soft-light' },
        { label: __('Difference', 'full-page-slider'), value: 'difference' },
        { label: __('Exclusion', 'full-page-slider'), value: 'exclusion' },
        { label: __('Hue', 'full-page-slider'), value: 'hue' },
        { label: __('Saturation', 'full-page-slider'), value: 'saturation' },
        { label: __('Color', 'full-page-slider'), value: 'color' },
        { label: __('Luminosity', 'full-page-slider'), value: 'luminosity' },
    ];

    return (
        <VStack spacing={3}>
            <ToggleControl
                label={__('Enable Overlay', 'full-page-slider')}
                checked={value.enabled}
                onChange={(val) => updateValue('enabled', val)}
                __nextHasNoMarginBottom
            />

            {value.enabled && (
                <>
                    <ColorPicker
                        label={__('Overlay Color', 'full-page-slider')}
                        value={value.color || 'rgba(0,0,0,0.5)'}
                        onChange={(color) => updateValue('color', color)}
                        enableAlpha={true}
                    />

                    <SelectControl
                        label={__('Blend Mode', 'full-page-slider')}
                        value={value.blendMode || 'normal'}
                        options={blendModes}
                        onChange={(val) => updateValue('blendMode', val)}
                        __nextHasNoMarginBottom
                    />
                </>
            )}
        </VStack>
    );
};

/**
 * Parallax Control Component
 */
const ParallaxControl = ({ value = {}, onChange }) => {
    const updateValue = (key, newValue) => {
        onChange({ ...value, [key]: newValue });
    };

    const updateNestedValue = (parent, key, newValue) => {
        onChange({
            ...value,
            [parent]: { ...value[parent], [key]: newValue }
        });
    };

    return (
        <VStack spacing={3}>
            <ToggleControl
                label={__('Enable Parallax', 'full-page-slider')}
                checked={value.enabled}
                onChange={(val) => updateValue('enabled', val)}
                __nextHasNoMarginBottom
            />

            {value.enabled && (
                <>
                    <TextControl
                        label={__('Background Parallax', 'full-page-slider')}
                        help={__('e.g., -23% (negative moves slower)', 'full-page-slider')}
                        value={value.background || '-23%'}
                        onChange={(val) => updateValue('background', val)}
                        __nextHasNoMarginBottom
                    />

                    <CollapsibleSection title={__('Title Parallax', 'full-page-slider')}>
                        <VStack spacing={2}>
                            <HStack spacing={2}>
                                <NumberControl
                                    label="X"
                                    value={value.title?.x || 0}
                                    onChange={(val) => updateNestedValue('title', 'x', parseInt(val) || 0)}
                                    min={-500}
                                    max={500}
                                />
                                <NumberControl
                                    label="Y"
                                    value={value.title?.y || 0}
                                    onChange={(val) => updateNestedValue('title', 'y', parseInt(val) || 0)}
                                    min={-500}
                                    max={500}
                                />
                            </HStack>
                            <HStack spacing={2}>
                                <RangeControl
                                    label={__('Scale', 'full-page-slider')}
                                    value={value.title?.scale || 1}
                                    onChange={(val) => updateNestedValue('title', 'scale', val)}
                                    min={0}
                                    max={2}
                                    step={0.1}
                                />
                                <RangeControl
                                    label={__('Opacity', 'full-page-slider')}
                                    value={value.title?.opacity ?? 1}
                                    onChange={(val) => updateNestedValue('title', 'opacity', val)}
                                    min={0}
                                    max={1}
                                    step={0.1}
                                />
                            </HStack>
                        </VStack>
                    </CollapsibleSection>

                    <CollapsibleSection title={__('Content Parallax', 'full-page-slider')}>
                        <VStack spacing={2}>
                            <HStack spacing={2}>
                                <NumberControl
                                    label="X"
                                    value={value.content?.x || 0}
                                    onChange={(val) => updateNestedValue('content', 'x', parseInt(val) || 0)}
                                    min={-500}
                                    max={500}
                                />
                                <NumberControl
                                    label="Y"
                                    value={value.content?.y || 100}
                                    onChange={(val) => updateNestedValue('content', 'y', parseInt(val) || 0)}
                                    min={-500}
                                    max={500}
                                />
                            </HStack>
                            <RangeControl
                                label={__('Opacity', 'full-page-slider')}
                                value={value.content?.opacity ?? 0.5}
                                onChange={(val) => updateNestedValue('content', 'opacity', val)}
                                min={0}
                                max={1}
                                step={0.1}
                            />
                        </VStack>
                    </CollapsibleSection>
                </>
            )}
        </VStack>
    );
};

/**
 * Text Shadow Control Component
 */
const TextShadowControl = ({ value = {}, onChange }) => {
    const updateValue = (key, newValue) => {
        onChange({ ...value, [key]: newValue });
    };

    return (
        <VStack spacing={3}>
            <ToggleControl
                label={__('Enable Text Shadow', 'full-page-slider')}
                checked={value.enabled}
                onChange={(val) => updateValue('enabled', val)}
                __nextHasNoMarginBottom
            />

            {value.enabled && (
                <>
                    <HStack spacing={2}>
                        <NumberControl
                            label={__('X Offset', 'full-page-slider')}
                            value={value.x || 0}
                            onChange={(val) => updateValue('x', parseInt(val) || 0)}
                            min={-50}
                            max={50}
                        />
                        <NumberControl
                            label={__('Y Offset', 'full-page-slider')}
                            value={value.y || 4}
                            onChange={(val) => updateValue('y', parseInt(val) || 0)}
                            min={-50}
                            max={50}
                        />
                    </HStack>
                    <RangeControl
                        label={__('Blur', 'full-page-slider')}
                        value={value.blur || 8}
                        onChange={(val) => updateValue('blur', val)}
                        min={0}
                        max={100}
                    />
                    <ColorPicker
                        label={__('Shadow Color', 'full-page-slider')}
                        value={value.color || 'rgba(0,0,0,0.3)'}
                        onChange={(color) => updateValue('color', color)}
                        enableAlpha={true}
                    />
                </>
            )}
        </VStack>
    );
};

/**
 * Text Stroke Control Component
 */
const TextStrokeControl = ({ value = {}, onChange }) => {
    const updateValue = (key, newValue) => {
        onChange({ ...value, [key]: newValue });
    };

    return (
        <VStack spacing={3}>
            <ToggleControl
                label={__('Enable Text Stroke', 'full-page-slider')}
                checked={value.enabled}
                onChange={(val) => updateValue('enabled', val)}
                __nextHasNoMarginBottom
            />

            {value.enabled && (
                <>
                    <RangeControl
                        label={__('Stroke Width', 'full-page-slider')}
                        value={value.width || 1}
                        onChange={(val) => updateValue('width', val)}
                        min={0}
                        max={10}
                        step={0.5}
                    />
                    <ColorPicker
                        label={__('Stroke Color', 'full-page-slider')}
                        value={value.color || '#ffffff'}
                        onChange={(color) => updateValue('color', color)}
                    />
                </>
            )}
        </VStack>
    );
};

/**
 * Text Gradient Control Component
 */
const TextGradientControl = ({ value = {}, onChange }) => {
    const updateValue = (key, newValue) => {
        onChange({ ...value, [key]: newValue });
    };

    const presetGradients = [
        { label: __('Purple Dream', 'full-page-slider'), value: 'linear-gradient(90deg, #667eea, #764ba2)' },
        { label: __('Ocean Blue', 'full-page-slider'), value: 'linear-gradient(90deg, #2193b0, #6dd5ed)' },
        { label: __('Sunset', 'full-page-slider'), value: 'linear-gradient(90deg, #f093fb, #f5576c)' },
        { label: __('Forest', 'full-page-slider'), value: 'linear-gradient(90deg, #11998e, #38ef7d)' },
        { label: __('Fire', 'full-page-slider'), value: 'linear-gradient(90deg, #f12711, #f5af19)' },
        { label: __('Royal', 'full-page-slider'), value: 'linear-gradient(90deg, #141e30, #243b55)' },
        { label: __('Custom', 'full-page-slider'), value: 'custom' },
    ];

    return (
        <VStack spacing={3}>
            <ToggleControl
                label={__('Enable Gradient Text', 'full-page-slider')}
                checked={value.enabled}
                onChange={(val) => updateValue('enabled', val)}
                __nextHasNoMarginBottom
            />

            {value.enabled && (
                <>
                    <SelectControl
                        label={__('Preset', 'full-page-slider')}
                        value={presetGradients.find(g => g.value === value.gradient)?.value || 'custom'}
                        options={presetGradients}
                        onChange={(val) => {
                            if (val !== 'custom') {
                                updateValue('gradient', val);
                            }
                        }}
                        __nextHasNoMarginBottom
                    />
                    <TextControl
                        label={__('Custom Gradient', 'full-page-slider')}
                        value={value.gradient || 'linear-gradient(90deg, #667eea, #764ba2)'}
                        onChange={(val) => updateValue('gradient', val)}
                        help={__('CSS gradient syntax', 'full-page-slider')}
                        __nextHasNoMarginBottom
                    />
                </>
            )}
        </VStack>
    );
};

/**
 * Shape Divider Control Component
 */
const ShapeDividerControl = ({ value = {}, onChange, position }) => {
    const divider = value[position] || { enabled: false, shape: 'wave', color: '#ffffff', height: 100, flip: false };

    const updateValue = (key, newValue) => {
        onChange({
            ...value,
            [position]: { ...divider, [key]: newValue }
        });
    };

    const shapes = [
        { label: __('Wave', 'full-page-slider'), value: 'wave' },
        { label: __('Curve', 'full-page-slider'), value: 'curve' },
        { label: __('Triangle', 'full-page-slider'), value: 'triangle' },
        { label: __('Tilt', 'full-page-slider'), value: 'tilt' },
        { label: __('Arrow', 'full-page-slider'), value: 'arrow' },
        { label: __('Split', 'full-page-slider'), value: 'split' },
        { label: __('Book', 'full-page-slider'), value: 'book' },
        { label: __('Zigzag', 'full-page-slider'), value: 'zigzag' },
    ];

    return (
        <VStack spacing={3}>
            <ToggleControl
                label={position === 'top' ? __('Top Divider', 'full-page-slider') : __('Bottom Divider', 'full-page-slider')}
                checked={divider.enabled}
                onChange={(val) => updateValue('enabled', val)}
                __nextHasNoMarginBottom
            />

            {divider.enabled && (
                <>
                    <SelectControl
                        label={__('Shape', 'full-page-slider')}
                        value={divider.shape || 'wave'}
                        options={shapes}
                        onChange={(val) => updateValue('shape', val)}
                        __nextHasNoMarginBottom
                    />
                    <ColorPicker
                        label={__('Color', 'full-page-slider')}
                        value={divider.color || '#ffffff'}
                        onChange={(color) => updateValue('color', color)}
                    />
                    <RangeControl
                        label={__('Height', 'full-page-slider')}
                        value={divider.height || 100}
                        onChange={(val) => updateValue('height', val)}
                        min={20}
                        max={500}
                    />
                    <ToggleControl
                        label={__('Flip', 'full-page-slider')}
                        checked={divider.flip}
                        onChange={(val) => updateValue('flip', val)}
                        __nextHasNoMarginBottom
                    />
                </>
            )}
        </VStack>
    );
};

const InspectorControls = (props) => {
    const { attributes, setAttributes } = props;

    const {
        showTitle,
        titleAlignment,
        alignContent,
        enableContentAnimation,
        contentAnimation,
        contentAnimationDuration,
        contentAnimationDelay,
        titleColor,
        contentColor,
        background,
        backgroundVideo,
        overlay,
        parallax,
        textShadow,
        textStroke,
        textGradient,
        shapeDivider,
        titleTypography,
        contentTypography,
        titlePadding,
        contentPadding,
        padding,
    } = attributes;

    return (
        <WPInspectorControls>
            <PanelBody title={__("Layout", 'full-page-slider')} initialOpen={true}>
                <VStack spacing={3}>
                    <ToggleControl
                        label={__("Show Title", 'full-page-slider')}
                        checked={showTitle}
                        onChange={(value) => setAttributes({ showTitle: value })}
                        __nextHasNoMarginBottom
                    />

                    {showTitle && (
                        <ChooseControl
                            label={__("Title Alignment", 'full-page-slider')}
                            value={titleAlignment}
                            onChange={(val) => setAttributes({ titleAlignment: val })}
                            options={[
                                { value: 'left', label: __('Align Left', 'full-page-slider'), icon: justifyLeft },
                                { value: 'center', label: __('Align Center', 'full-page-slider'), icon: justifyCenter },
                                { value: 'right', label: __('Align Right', 'full-page-slider'), icon: justifyRight },
                            ]}
                        />
                    )}

                    <SelectControl
                        label={__("Content Alignment", 'full-page-slider')}
                        value={alignContent || 'top'}
                        onChange={value => setAttributes({ alignContent: value })}
                        options={[
                            { label: __('Top', 'full-page-slider'), value: 'top' },
                            { label: __('Center', 'full-page-slider'), value: 'center' },
                            { label: __('Bottom', 'full-page-slider'), value: 'bottom' },
                            { label: __('Cover (Full Height)', 'full-page-slider'), value: 'cover' },
                        ]}
                        __nextHasNoMarginBottom
                    />
                </VStack>
            </PanelBody>

            <PanelBody title={__("Background", 'full-page-slider')} initialOpen={false}>
                <TabPanel
                    className="fps-background-tabs"
                    activeClass="is-active"
                    tabs={[
                        { name: 'image', title: __('Image/Color', 'full-page-slider') },
                        { name: 'video', title: __('Video', 'full-page-slider') },
                    ]}
                >
                    {(tab) => (
                        <div style={{ paddingTop: '16px' }}>
                            {tab.name === 'image' && (
                                <BackgroundControl
                                    value={background || {}}
                                    onChange={(newVal) => setAttributes({ background: newVal })}
                                />
                            )}
                            {tab.name === 'video' && (
                                <VideoBackgroundControl
                                    value={backgroundVideo || {}}
                                    onChange={(newVal) => setAttributes({ backgroundVideo: newVal })}
                                />
                            )}
                        </div>
                    )}
                </TabPanel>
            </PanelBody>

            <PanelBody title={__("Overlay", 'full-page-slider')} initialOpen={false}>
                <OverlayControl
                    value={overlay || {}}
                    onChange={(newVal) => setAttributes({ overlay: newVal })}
                />
            </PanelBody>

            <PanelBody title={__("Content Animation", 'full-page-slider')} initialOpen={false}>
                <VStack spacing={3}>
                    <ToggleControl
                        label={__("Enable Animation", 'full-page-slider')}
                        checked={enableContentAnimation}
                        onChange={(value) => setAttributes({ enableContentAnimation: value })}
                        __nextHasNoMarginBottom
                    />

                    {enableContentAnimation && (
                        <>
                            <SelectControl
                                label={__("Animation Type", 'full-page-slider')}
                                value={contentAnimation}
                                options={[
                                    { label: __('— Select —', 'full-page-slider'), value: '' },
                                    { label: '── ' + __('Fade', 'full-page-slider') + ' ──', value: '', disabled: true },
                                    { label: __('Fade In Up', 'full-page-slider'), value: 'fade-in-up' },
                                    { label: __('Fade In Down', 'full-page-slider'), value: 'fade-in-down' },
                                    { label: __('Fade In Left', 'full-page-slider'), value: 'fade-in-left' },
                                    { label: __('Fade In Right', 'full-page-slider'), value: 'fade-in-right' },
                                    { label: '── ' + __('Slide', 'full-page-slider') + ' ──', value: '', disabled: true },
                                    { label: __('Slide In Up', 'full-page-slider'), value: 'slide-in-up' },
                                    { label: __('Slide In Down', 'full-page-slider'), value: 'slide-in-down' },
                                    { label: __('Slide In Left', 'full-page-slider'), value: 'slide-in-left' },
                                    { label: __('Slide In Right', 'full-page-slider'), value: 'slide-in-right' },
                                    { label: '── ' + __('Zoom', 'full-page-slider') + ' ──', value: '', disabled: true },
                                    { label: __('Zoom In', 'full-page-slider'), value: 'zoom-in' },
                                    { label: __('Zoom Out', 'full-page-slider'), value: 'zoom-out' },
                                    { label: '── ' + __('Special', 'full-page-slider') + ' ──', value: '', disabled: true },
                                    { label: __('Rotate In', 'full-page-slider'), value: 'rotate-in' },
                                    { label: __('Flip In X', 'full-page-slider'), value: 'flip-in-x' },
                                    { label: __('Flip In Y', 'full-page-slider'), value: 'flip-in-y' },
                                    { label: __('Bounce In', 'full-page-slider'), value: 'bounce-in' },
                                    { label: __('Pop In', 'full-page-slider'), value: 'pop-in' },
                                ]}
                                onChange={(value) => setAttributes({ contentAnimation: value })}
                                __nextHasNoMarginBottom
                            />

                            <RangeControl
                                label={__("Duration (ms)", 'full-page-slider')}
                                value={contentAnimationDuration}
                                onChange={(value) => setAttributes({ contentAnimationDuration: value })}
                                min={100}
                                max={5000}
                                step={50}
                            />

                            <RangeControl
                                label={__("Delay (ms)", 'full-page-slider')}
                                value={contentAnimationDelay}
                                onChange={(value) => setAttributes({ contentAnimationDelay: value })}
                                min={0}
                                max={2000}
                                step={50}
                            />
                        </>
                    )}
                </VStack>
            </PanelBody>

            <PanelBody title={__("Parallax Effect", 'full-page-slider')} initialOpen={false}>
                <ParallaxControl
                    value={parallax || {}}
                    onChange={(newVal) => setAttributes({ parallax: newVal })}
                />
            </PanelBody>

            <PanelBody title={__("Text Effects", 'full-page-slider')} initialOpen={false}>
                <CollapsibleSection title={__('Text Shadow', 'full-page-slider')} icon={shadow}>
                    <TextShadowControl
                        value={textShadow || {}}
                        onChange={(newVal) => setAttributes({ textShadow: newVal })}
                    />
                </CollapsibleSection>

                <CollapsibleSection title={__('Text Stroke', 'full-page-slider')}>
                    <TextStrokeControl
                        value={textStroke || {}}
                        onChange={(newVal) => setAttributes({ textStroke: newVal })}
                    />
                </CollapsibleSection>

                <CollapsibleSection title={__('Gradient Text', 'full-page-slider')}>
                    <TextGradientControl
                        value={textGradient || {}}
                        onChange={(newVal) => setAttributes({ textGradient: newVal })}
                    />
                </CollapsibleSection>
            </PanelBody>

            <PanelBody title={__("Shape Dividers", 'full-page-slider')} initialOpen={false}>
                <VStack spacing={4}>
                    <ShapeDividerControl
                        value={shapeDivider || {}}
                        onChange={(newVal) => setAttributes({ shapeDivider: newVal })}
                        position="top"
                    />
                    <ShapeDividerControl
                        value={shapeDivider || {}}
                        onChange={(newVal) => setAttributes({ shapeDivider: newVal })}
                        position="bottom"
                    />
                </VStack>
            </PanelBody>

            <PanelBody title={__("Colors", 'full-page-slider')} initialOpen={false}>
                <VStack spacing={3}>
                    {showTitle && (
                        <ColorPicker
                            value={titleColor}
                            onChange={(color) => setAttributes({ titleColor: color })}
                            label={__('Title Color', 'full-page-slider')}
                        />
                    )}
                </VStack>
            </PanelBody>

            <PanelBody title={__("Typography", 'full-page-slider')} initialOpen={false}>
                <VStack spacing={4}>
                    {showTitle && (
                        <TypographyControl
                            label={__("Title Typography", 'full-page-slider')}
                            value={titleTypography}
                            onChange={(val) => setAttributes({ titleTypography: val })}
                        />
                    )}
                    <TypographyControl
                        label={__("Content Typography", 'full-page-slider')}
                        value={contentTypography}
                        onChange={(val) => setAttributes({ contentTypography: val })}
                    />
                </VStack>
            </PanelBody>

            <PanelBody title={__("Spacing", 'full-page-slider')} initialOpen={false}>
                <VStack spacing={4}>
                    {showTitle && (
                        <DimensionsControl
                            label={__("Title Padding", 'full-page-slider')}
                            value={titlePadding}
                            onChange={(newVal) => setAttributes({ titlePadding: newVal })}
                        />
                    )}
                    <DimensionsControl
                        label={__("Content Padding", 'full-page-slider')}
                        value={contentPadding}
                        onChange={(newVal) => setAttributes({ contentPadding: newVal })}
                    />
                    <DimensionsControl
                        label={__("Slide Padding", 'full-page-slider')}
                        value={padding}
                        onChange={(newVal) => setAttributes({ padding: newVal })}
                    />
                </VStack>
            </PanelBody>
        </WPInspectorControls>
    );
}

export default InspectorControls;
