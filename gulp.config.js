'use strict';

var projectName = 'js-30';

module.exports = {
  projectName: projectName,

  paths: {

    views: {
      base: './*.html',
      app: './app/**/*.html'
    },

    styles: {
      src: './src/styles/',
      dest: './dist/styles/'
    },

    scripts: {
      src: './src/scripts/**/*.js',
      dest: './dist/scripts/'
    },

    sounds: {
      src: './src/sounds/**/*.*',
      dest: './dist/sounds/'
    }
  }

};
