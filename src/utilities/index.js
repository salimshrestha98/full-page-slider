/**
 * Extract Background Styles from background attribute.
 * @param {*} background 
 * @returns 
 */
export function getBackgroundStyles(background) {
    if ( !background ) {
        return {};
    }

	const {
		backgroundRepeat,
		backgroundPosition,
		backgroundAttachment,
		backgroundSize,
		backgroundType,
		color,
		gradient,
		image
	} = background;
	let styles = {};

	switch (backgroundType) {
		case 'gradient':
			if(gradient) {
				styles.backgroundImage = gradient;
			} else {
				styles.backgroundImage = "linear-gradient(90deg,rgba(6,147,227,1) 0%,rgb(155,81,224) 100%)";
			}
			break;
			
		case 'image':
			if(image && image?.url) {
				styles.background = `url(${image?.url})`;
				Object.entries({backgroundRepeat, backgroundPosition, backgroundAttachment, backgroundSize}).forEach(([key, value]) => {
					if ( value != null ) {
						styles[key] = value;
					}
				});
			}
			break;

		default:
			if(color) {
				styles.backgroundColor = color;
			}
	}
	
	return styles;
}

/**
 * Extract Typography styles from typography attribute.
 * @param {*} typography 
 * @returns 
 */
export function getTypographyStyles(typography = {}) {
	const { fontSize, ...styles } = typography || {};

	if (fontSize && fontSize.size && (typeof fontSize.size == 'number') && fontSize.unit) {
		styles.fontSize = `${fontSize.size}${fontSize.unit}`;
	}

	return styles;
}