import { addFilter, applyFilters } from '@wordpress/hooks';

import { Fragment } from '@wordpress/element';
import InspectorControls from './inspector';
import { __ } from '@wordpress/i18n';
import sliderBlockJson from '../../../../full-page-slider/src/blocks/full-page-slider/block.json';

(($) => {
    const FPSLIDER_SLIDE_HANDLER = {
        init() {
            addFilter( 'blocks.registerBlockType', 'fpslider-pro/slide-add-attributes', FPSLIDER_SLIDE_HANDLER.addAttributes );
            addFilter( 'fpslider.slide.blockStyles', 'fpslider-pro/slide/block-styles', FPSLIDER_SLIDE_HANDLER.addStyles );
            addFilter( 'fpslider.slide.localAttributes', 'fpslider-pro/slide/local-attributes', FPSLIDER_SLIDE_HANDLER.handleLocalAttributes );
        },

        // Extend block attributes
        addAttributes(settings, name) {
            if (name !== 'full-page-slider/slide') return settings;

            return{
                ...settings,
                attributes: {
                    ...settings.attributes,
                    ...sliderBlockJson.attributes,
                },
            };
        },
        
        /**
         * Add Pro Styles if necessary.
         * @param {*} styles 
         * @returns 
         */
        addStyles(styles) {
            return styles;
        },

        /**
         * Inject own attributes with parent attributes to form local attributes.
         * 
         * Only adds own attributes that are changed in slide settings.
         * 
         * @param {*} parentAttributes 
         * @param {*} attributes 
         * @returns 
         */
        handleLocalAttributes(parentAttributes, attributes) {
            let localAttributes = { ...parentAttributes };

            // Get default values from the slider block's attributes
            const defaultAttributes = sliderBlockJson.attributes;

            Object.entries(attributes).forEach(([key, value]) => {
                if ( 'parentAttributes' !== key && key !== 'title' ) {
                    // Only override parent attributes if the value has been changed from default
                    const defaultValue = defaultAttributes[key]?.default;
                    
                    // Check if the value is different from default
                    if (FPSLIDER_SLIDE_HANDLER.hasValueChanged(value, defaultValue)) {
                        localAttributes[key] = value;
                    }
                }
            });

            return localAttributes;
        },

        /**
         * Check if a value has been changed from its default.
         * 
         * @param {*} currentValue 
         * @param {*} defaultValue 
         * @returns {boolean}
         */
        hasValueChanged(currentValue, defaultValue) {
            // Handle undefined/null cases
            if (currentValue === undefined || currentValue === null) {
                return false;
            }

            // Handle objects (like typography, padding, etc.)
            if (typeof currentValue === 'object' && typeof defaultValue === 'object') {
                if (!defaultValue) return true;
                
                // For objects, check if any property has been changed from default
                return Object.keys(currentValue).some(key => {
                    const currentProp = currentValue[key];
                    const defaultProp = defaultValue[key];
                    
                    // Recursively check nested objects
                    if (typeof currentProp === 'object' && typeof defaultProp === 'object') {
                        return FPSLIDER_SLIDE_HANDLER.hasValueChanged(currentProp, defaultProp);
                    }
                    
                    // For non-empty strings, numbers, booleans that differ from default
                    if (currentProp !== defaultProp) {
                        // Don't consider empty strings as changes
                        if (typeof currentProp === 'string' && currentProp === '' && defaultProp === '') {
                            return false;
                        }
                        return true;
                    }
                    
                    return false;
                });
            }

            // Handle primitive values
            if (currentValue !== defaultValue) {
                // Don't consider empty strings as changes if default is also empty
                if (typeof currentValue === 'string' && currentValue === '' && defaultValue === '') {
                    return false;
                }
                return true;
            }

            return false;
        }
    }

    FPSLIDER_SLIDE_HANDLER.init();
})(jQuery);
