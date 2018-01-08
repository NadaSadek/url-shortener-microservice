'use strict';

module.exports = function jshint(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	return {
		files: [
            'public/*/*.js',
						'tests/*.js',
            '*.js'
        ],
        options: {
            'esversion': 6,
        }
	};
};
