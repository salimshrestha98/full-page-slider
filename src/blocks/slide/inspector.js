import {
    BackgroundControl,
    ChooseControl,
    ColorPicker,
    DimensionsControl,
    TypographyControl
} from '../../components';
import {
    PanelBody,
    RangeControl,
    SelectControl,
    ToggleControl,
} from '@wordpress/components';
import { justifyCenter, justifyLeft, justifyRight } from '@wordpress/icons';

import {InspectorControls as WPInspectorControls} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

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
        contentBackground,
        background,
        titleTypography,
        contentTypography,
        titlePadding,
        contentPadding,
        padding,
    } = attributes;

  return (
    <WPInspectorControls>
        <PanelBody title={ __( "General", 'full-page-slider' ) } initialOpen={false}>
            <ToggleControl
                label={__("Show Title", 'full-page-slider')}
                checked={ showTitle }
                onChange={ ( value ) => setAttributes( { showTitle: value } ) }
            />

            { showTitle && (
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
                label={__("Align Content", 'full-page-slider')}
                value={alignContent || 'top'}
                onChange={ value => setAttributes({ alignContent: value }) }
                options={[
                    { label: __('Top', 'full-page-slider'), value: 'top' },
                    { label: __('Center', 'full-page-slider'), value: 'center' },
                    { label: __('Bottom', 'full-page-slider'), value: 'bottom' },
                    { label: __('Cover', 'full-page-slider'), value: 'cover' },
                ]}
            />
        </PanelBody>

        <PanelBody title={__("Content Animation", 'full-page-slider')} initialOpen={ false }>
            <ToggleControl
                label={__( "Enable Content Animation", 'full-page-slider' )}
                checked={ enableContentAnimation }
                onChange={ ( value ) => setAttributes( { enableContentAnimation: value } ) }
            />

            { enableContentAnimation && (
                <>
                    <SelectControl
                        label={__("Animation Type", 'full-page-slider')}
                        value={ contentAnimation }
                        options={ [
                            { label: __('None', 'full-page-slider'), value: '' },
                            { label: __('Fade In Up', 'full-page-slider'), value: 'fade-in-up' },
                            { label: __('Fade In Down', 'full-page-slider'), value: 'fade-in-down' },
                            { label: __('Fade In Left', 'full-page-slider'), value: 'fade-in-left' },
                            { label: __('Fade In Right', 'full-page-slider'), value: 'fade-in-right' },
                            { label: __('Slide In Up', 'full-page-slider'), value: 'slide-in-up' },
                            { label: __('Slide In Down', 'full-page-slider'), value: 'slide-in-down' },
                            { label: __('Slide In Left', 'full-page-slider'), value: 'slide-in-left' },
                            { label: __('Slide In Right', 'full-page-slider'), value: 'slide-in-right' },
                            { label: __('Zoom In', 'full-page-slider'), value: 'zoom-in' },
                            { label: __('Zoom Out', 'full-page-slider'), value: 'zoom-out' },
                            { label: __('Rotate In', 'full-page-slider'), value: 'rotate-in' },
                            { label: __('Flip In X', 'full-page-slider'), value: 'flip-in-x' },
                            { label: __('Flip In Y', 'full-page-slider'), value: 'flip-in-y' },
                            { label: __('Bounce In', 'full-page-slider'), value: 'bounce-in' },
                            { label: __('Pop In', 'full-page-slider'), value: 'pop-in' },
                        ] }
                        onChange={ ( value ) => setAttributes( { contentAnimation: value } ) }
                    />

                    <RangeControl
                        label={__("Animation Duration (ms)", 'full-page-slider')}
                        value={ contentAnimationDuration }
                        onChange={ ( value ) => setAttributes( { contentAnimationDuration: value } ) }
                        min={ 500 }
                        max={ 5000 }
                        step={ 50 }
                    />

                    <RangeControl
                        label={__("Animation Delay (ms)", 'full-page-slider')}
                        value={ contentAnimationDelay }
                        onChange={ ( value ) => setAttributes( { contentAnimationDelay: value } ) }
                        min={ 0 }
                        max={ 2000 }
                        step={ 50 }
                    />
                </>
            )}

        </PanelBody>

        <PanelBody title={ __( "Color", 'full-page-slider' ) } initialOpen={false}>
            {showTitle && (
                <ColorPicker
                    value={titleColor}
                    onChange={( color ) => setAttributes( { titleColor: color } )}
                    label={__('Title Color', 'full-page-slider')}
                />
            )}
            <ColorPicker
                value={contentColor}
                onChange={( color ) => setAttributes( { contentColor: color } )}
                label={__('Content Color', 'full-page-slider')}
            />

            <ColorPicker
                value={contentBackground}
                onChange={( color ) => setAttributes( { contentBackground: color } )}
                label={__('Content Background', 'full-page-slider')}
            />

            <BackgroundControl
                value={background || {}}
                onChange={(newVal) => setAttributes({ background: newVal })}
            />
        </PanelBody>

        <PanelBody title={ __( "Typography", 'full-page-slider' ) } initialOpen={false}>
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
        </PanelBody>

        <PanelBody title={ __( "Spacing", 'full-page-slider' ) } initialOpen={false}>
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
                label={__("Padding", 'full-page-slider')}
                value={padding}
                onChange={(newVal) => setAttributes({ padding: newVal })}
            />
        </PanelBody>
    </WPInspectorControls>
  )
}

export default InspectorControls 