const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

// Get the default entry function
const getDefaultEntry = () => {
	if ( typeof defaultConfig.entry === 'function' ) {
		return defaultConfig.entry();
	}
	return defaultConfig.entry || {};
};

module.exports = {
	...defaultConfig,
	entry: {
		...getDefaultEntry(),
		'admin/admin-page': path.resolve( process.cwd(), 'src', 'admin', 'admin-page.scss' ),
	},
};
