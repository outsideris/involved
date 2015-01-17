module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "download-atom-shell": {
      version: "0.15.9",
      outputDir: "./atom-shell",
      rebuild: true
    },
    stylus: {
      compile: {
        files: {
          '../app/css/style.css': ['../app/css/style.styl']
        }
      }
    },
    watch: {
      stylus: {
        files: ['../app/css/**/*.styl'],
        tasks: ['stylus:compile']
      }
    }
  });

};
