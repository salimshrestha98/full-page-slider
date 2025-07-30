// FONTS.js

import { __ } from '@wordpress/i18n'; // Required for localization

/**
 * Comprehensive list of commonly used web-safe and popular font families.
 * These can be used with SelectControl or any custom typography picker.
 */

export const FONT_FAMILIES = [
	{ label: 'Default', value: '' },
	// Web-safe fonts
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
	
	// Google Fonts - Sans Serif
	{ label: 'Roboto (Google)', value: 'Roboto, sans-serif' },
	{ label: 'Open Sans (Google)', value: '"Open Sans", sans-serif' },
	{ label: 'Lato (Google)', value: 'Lato, sans-serif' },
	{ label: 'Montserrat (Google)', value: 'Montserrat, sans-serif' },
	{ label: 'Poppins (Google)', value: 'Poppins, sans-serif' },
	{ label: 'Raleway (Google)', value: 'Raleway, sans-serif' },
	{ label: 'Ubuntu (Google)', value: 'Ubuntu, sans-serif' },
	{ label: 'Inter (Google)', value: 'Inter, sans-serif' },
	{ label: 'Source Sans Pro (Google)', value: '"Source Sans Pro", sans-serif' },
	{ label: 'Nunito (Google)', value: 'Nunito, sans-serif' },
	{ label: 'Work Sans (Google)', value: '"Work Sans", sans-serif' },
	{ label: 'Fira Sans (Google)', value: '"Fira Sans", sans-serif' },
	{ label: 'Rubik (Google)', value: 'Rubik, sans-serif' },
	{ label: 'Barlow (Google)', value: 'Barlow, sans-serif' },
	{ label: 'DM Sans (Google)', value: '"DM Sans", sans-serif' },
	
	// Google Fonts - Serif
	{ label: 'Merriweather (Google)', value: 'Merriweather, serif' },
	{ label: 'Playfair Display (Google)', value: '"Playfair Display", serif' },
	{ label: 'Crimson Text (Google)', value: '"Crimson Text", serif' },
	{ label: 'Libre Baskerville (Google)', value: '"Libre Baskerville", serif' },
	{ label: 'Lora (Google)', value: 'Lora, serif' },
	{ label: 'PT Serif (Google)', value: '"PT Serif", serif' },
	{ label: 'Cormorant Garamond (Google)', value: '"Cormorant Garamond", serif' },
	{ label: 'Crimson Pro (Google)', value: '"Crimson Pro", serif' },
	
	// Google Fonts - Display
	{ label: 'Oswald (Google)', value: 'Oswald, sans-serif' },
	{ label: 'Dancing Script (Google)', value: '"Dancing Script", cursive' },
	{ label: 'Pacifico (Google)', value: 'Pacifico, cursive' },
	{ label: 'Lobster (Google)', value: 'Lobster, cursive' },
	{ label: 'Righteous (Google)', value: 'Righteous, cursive' },
	{ label: 'Fredoka One (Google)', value: '"Fredoka One", cursive' },
];

// List of Google Fonts for dynamic loading
export const GOOGLE_FONT_FAMILIES = [
	'Roboto',
	'Open Sans',
	'Lato',
	'Montserrat',
	'Poppins',
	'Raleway',
	'Ubuntu',
	'Inter',
	'Source Sans Pro',
	'Nunito',
	'Work Sans',
	'Fira Sans',
	'Rubik',
	'Barlow',
	'DM Sans',
	'Merriweather',
	'Playfair Display',
	'Crimson Text',
	'Libre Baskerville',
	'Lora',
	'PT Serif',
	'Cormorant Garamond',
	'Crimson Pro',
	'Oswald',
	'Dancing Script',
	'Pacifico',
	'Lobster',
	'Righteous',
	'Fredoka One',
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