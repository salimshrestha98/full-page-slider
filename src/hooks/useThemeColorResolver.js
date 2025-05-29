// useThemeColorResolver.js

import { getColorObjectByAttributeValues } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export function useThemeColorResolver () {
	// Load theme color palette once
	const themeColors = useSelect(
		( select ) => select( 'core/block-editor' ).getSettings()?.colors,
		[]
	);

	// Function to resolve color hex from slug
	const resolveColor = ( slug ) => {
		const colorObj = getColorObjectByAttributeValues( themeColors, slug );
		return colorObj?.color || undefined;
	};

	return resolveColor;
}
