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
	const { fontSize, fontFamily, fontWeight, lineHeight, letterSpacing, textTransform, ...otherStyles } = typography || {};
	let styles = { ...otherStyles };

	if (fontSize && fontSize.size && (typeof fontSize.size == 'number') && fontSize.unit) {
		styles.fontSize = `${fontSize.size}${fontSize.unit}`;
	}

	if (fontFamily) {
		styles.fontFamily = fontFamily;
	}

	if (fontWeight) {
		styles.fontWeight = fontWeight;
	}

	if (lineHeight) {
		styles.lineHeight = lineHeight;
	}

	if (letterSpacing) {
		styles.letterSpacing = `${letterSpacing}px`;
	}

	if (textTransform) {
		styles.textTransform = textTransform;
	}

	return styles;
}

/**
 * Load a Google Font by adding a link tag to the document head.
 * @param {string} fontFamily - The font family name
 */
export function loadGoogleFont(fontFamily) {
	if (!fontFamily) return;
	
	// Import Google font families to check if font is available
	const GOOGLE_FONT_FAMILIES = [
		'Roboto', 'Open Sans', 'Lato', 'Source Sans Pro', 'Montserrat', 'Raleway',
		'Ubuntu', 'Nunito', 'PT Sans', 'Lora', 'Merriweather', 'Playfair Display',
		'Oswald', 'Source Serif Pro', 'Slabo 27px', 'Crimson Text', 'Indie Flower',
		'Dancing Script', 'Pacifico', 'Lobster', 'Righteous', 'Caveat', 'Amatic SC',
		'Fredoka One', 'Gloria Hallelujah', 'Kalam', 'Shadows Into Light',
		'Permanent Marker', 'Rock Salt', 'Satisfy', 'Courgette'
	];
	
	// Extract the first word (font name) before comma or quote
	const match = fontFamily.match(/^["']?([A-Za-z0-9\s]+)["']?/);
	const cleanFont = match ? match[1] : fontFamily;
	if (!GOOGLE_FONT_FAMILIES.includes(cleanFont)) return;
	const linkId = `google-font-${cleanFont.replace(/\s+/g, '-')}`;
	if (document.getElementById(linkId)) return;
	const link = document.createElement('link');
	link.id = linkId;
	link.rel = 'stylesheet';
	link.href = `https://fonts.googleapis.com/css?family=${cleanFont.replace(/\s+/g, '+')}:300,400,500,700&display=swap`;
	document.head.appendChild(link);
}