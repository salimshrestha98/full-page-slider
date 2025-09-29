module.exports = function ( grunt ) {
	grunt.loadNpmTasks( 'grunt-contrib-compress' );

	grunt.initConfig( {
		compress: {
			main: {
				options: {
					archive: './full-page-slider.zip',
					mode: 'zip'
				},
				expand: true,
				cwd: './',
				src: [
					// Include essential plugin files
					'full-page-slider.php',
					'readme.txt',
					'build/**',
					'includes/**',
					'templates/**',
					'assets/**',
					'vendor/autoload.php',
					'vendor/composer/**',
					// Exclude development files and folders
					'!node_modules/**',
					'!src/**',
					'!bin/**',
					'!.git/**',
					'!.github/**',
					// Exclude config and development files
					'!.gitignore',
					'!Gruntfile.js',
					'!webpack.config.js',
					'!package-lock.json',
					'!package.json',
					'!composer.json',
					'!composer.lock',
					'!phpstan.neon',
					// Exclude zip files
					'!full-page-slider.zip',
					'!*.zip',
					// Exclude README.md (keep readme.txt for WordPress)
					'!README.md',
					// Exclude source maps from build
					'!build/**/*.map',
					// Exclude unnecessary vendor files
					'!vendor/composer/installed.json',
					'!vendor/composer/installed.php',
					'!vendor/composer/InstalledVersions.php',
					'!vendor/composer/LICENSE'
				],
				dest: 'full-page-slider/'
			}
		}
	} );

	grunt.registerTask( 'default', [ 'compress' ] );
};
