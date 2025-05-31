export function getBackgroundStyles(background) {
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

export function getTypographyStyles({
		fontSize,
		...styles
	}){
	if ( fontSize ) {
		styles.fontSize = fontSize.size + fontSize.unit;
	}

	return styles;
}