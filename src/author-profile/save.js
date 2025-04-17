import './style.scss';

import { __ } from '@wordpress/i18n';

export default function Save ( { attributes } ) {
	const {
		author,
		showMore,
		moreText,
		backgroundColor,
		textAlign,
		padding
	} = attributes;

	return (
		<div
			className="super-block author-profile"
			style={ {
				backgroundColor,
				textAlign,
				padding
			} }>
			{ ( typeof author == 'object' && author != 'undefined' ) ? (
				<div style={ { display: 'flex', alignItems: 'start' } } align='start'>
					<div className="author-image-container">
						<img
							src={ author.thumbnail != '' ? author.thumbnail : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }
							className="author-thumbnail"
							alt="Profile Picture"
						/>
					</div>
					<div className="author-details-container">
						<>
							<h3 className="author-name">
								{ author.name }
							</h3>
							<p className="author-email">
								{ author.email }
							</p>
							<p className="author-description">
								{ author.description }
							</p>
						</>

						{ showMore && (
							<p className="author-more-text" dangerouslySetInnerHTML={ { __html: moreText } }></p>
						) }
					</div>
				</div>
			) : (
				<p>{ __( 'No author selected.', 'super- blocks' ) }</p>
			) }
		</div>
	);
}
