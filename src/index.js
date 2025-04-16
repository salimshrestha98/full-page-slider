const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'super-blocks/author_profile', {
	title: __( 'Author Profile', 'super-blocks' ),
	icon: 'megaphone',
	category: 'common',
	edit: () => ( <div>Author Profile</div> ),
	save: () => ( <div>Author Profile</div> )
} );