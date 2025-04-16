const path = require( 'path' );

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: 'index.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
		],
	},
	resolve: {
		extensions: [ '.js' ],
	},
	devtool: 'source-map',
	mode: 'development',
};
