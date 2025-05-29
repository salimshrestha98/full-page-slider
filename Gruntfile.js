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
					'**',
					'!node_modules/**',
					'!src/**',
					'!full-page-slider.zip',
					'!.git/**',
					'!.gitignore',
					'!Gruntfile.js',
					'!package-lock.json',
					'!package.json'
				],
				dest: 'full-page-slider/'
			}
		}
	} );

	grunt.registerTask( 'default', [ 'compress' ] );
};
