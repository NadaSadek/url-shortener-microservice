module.exports = function(grunt) {
  'use strict';
  
  require('grunt-config-dir')(grunt, {
    configDir: require('path').resolve('tasks')
  });

  grunt.registerTask('default', ['jshint', 'less', 'nodemon', 'watch']);

};
