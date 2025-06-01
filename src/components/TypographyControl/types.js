// FONTS.js

import { __ } from '@wordpress/i18n'; // Required for localization

/**
 * Comprehensive list of commonly used web-safe and popular font families.
 * These can be used with SelectControl or any custom typography picker.
 */

export const FONT_FAMILIES = [
	{ label: 'Default', value: '' },
	{ label: 'Arial', value: 'Arial, sans-serif' },
	{ label: 'Helvetica', value: 'Helvetica, sans-serif' },
	{ label: 'Georgia', value: 'Georgia, serif' },
	{ label: 'Times New Roman', value: '"Times New Roman", serif' },
	{ label: 'Courier New', value: '"Courier New", monospace' },
	{ label: 'Verdana', value: 'Verdana, sans-serif' },
	{ label: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
	{ label: 'Tahoma', value: 'Tahoma, sans-serif' },
	{ label: 'Lucida Console', value: '"Lucida Console", monospace' },
	{ label: 'Impact', value: 'Impact, sans-serif' },
	{ label: 'Palatino', value: '"Palatino Linotype", "Book Antiqua", Palatino, serif' },
	{ label: 'Segoe UI', value: '"Segoe UI", sans-serif' },
	{ label: 'System UI', value: 'system-ui, sans-serif' },
	{ label: 'Gill Sans', value: '"Gill Sans", sans-serif' },
	{ label: 'Franklin Gothic Medium', value: '"Franklin Gothic Medium", sans-serif' },
	{ label: 'Optima', value: 'Optima, sans-serif' },
	{ label: 'Candara', value: 'Candara, sans-serif' },
	{ label: 'Garamond', value: 'Garamond, serif' },
	{ label: 'Bookman', value: '"Bookman Old Style", serif' },
	{ label: 'Rockwell', value: 'Rockwell, serif' },
	{ label: 'Monaco', value: 'Monaco, monospace' },
	{ label: 'Consolas', value: 'Consolas, monospace' },
	{ label: 'Menlo', value: 'Menlo, monospace' },
	{ label: 'Fira Code', value: '"Fira Code", monospace' },
	{ label: 'Roboto', value: 'Roboto, sans-serif' },
	{ label: 'Open Sans', value: '"Open Sans", sans-serif' },
	{ label: 'Lato', value: 'Lato, sans-serif' },
	{ label: 'Montserrat', value: 'Montserrat, sans-serif' },
	{ label: 'Poppins', value: 'Poppins, sans-serif' },
	{ label: 'Merriweather', value: 'Merriweather, serif' },
	{ label: 'Playfair Display', value: '"Playfair Display", serif' },
	{ label: 'Raleway', value: 'Raleway, sans-serif' },
	{ label: 'Ubuntu', value: 'Ubuntu, sans-serif' },
	{ label: 'Inter', value: 'Inter, sans-serif' },
	{ label: 'Source Sans Pro', value: '"Source Sans Pro", sans-serif' },
];

export const FONT_WEIGHTS = [
	{ label: __('Default', 'full-page-slider'), value: '' },
	{ label: __('Light', 'full-page-slider'), value: '300' },
	{ label: __('Regular', 'full-page-slider'), value: '400' },
	{ label: __('Medium', 'full-page-slider'), value: '500' },
	{ label: __('Bold', 'full-page-slider'), value: '700' },
	{ label: __('Black', 'full-page-slider'), value: '900' },
];

export const TEXT_TRANSFORMS = [
	{ label: __('Default', 'full-page-slider'), value: '' },
	{ label: __('Uppercase', 'full-page-slider'), value: 'uppercase' },
	{ label: __('Lowercase', 'full-page-slider'), value: 'lowercase' },
	{ label: __('Capitalize', 'full-page-slider'), value: 'capitalize' },
];