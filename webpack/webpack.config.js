const path = require( 'path' );

module.exports = {
  entry: './src/blocks/index.js', // Adjust the entry point based on your project structure
  output: {
    filename: 'blocks.js',
    path: path.resolve( './', 'build' ),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ],
          },
        },
      },
    ],
  },
};