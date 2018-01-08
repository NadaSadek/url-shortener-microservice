'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  return {
      styles: {
          files: [
              'public/*/**',
              'tasks/*.js',
              '**'
          ],
          tasks: ['jshint','less']
      }
  };
};
