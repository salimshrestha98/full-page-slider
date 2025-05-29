module.exports = function ( grunt ) {
	grunt.loadNpmTasks( 'grunt-contrib-compress' );

	grunt.initConfig( {
		compress: {
			main: {
				options: {
					archive: './super-blocks.zip',
					mode: 'zip'
				},
				expand: true,
				cwd: './',
				src: [
					'**',
					'!node_modules/**',
					'!src/**',
					'!super-blocks.zip',
					'!.git/**',
					'!.gitignore',
					'!Gruntfile.js',
					'!package-lock.json',
					'!package.json'
				],
				dest: 'super-blocks/'
			}
		}
	} );

	grunt.registerTask( 'default', [ 'compress' ] );
};
