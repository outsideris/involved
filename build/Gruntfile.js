module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "download-atom-shell": {
      version: "0.22.2",
      outputDir: "./atom-shell",
      rebuild: true
    },
    stylus: {
      compile: {
        files: {
          '../src/static/css/style.css': ['../src/stylus/style.styl']
        }
      }
    },
    watch: {
      stylus: {
        files: ['../src/stylus/**/*.styl'],
        tasks: ['stylus:compile']
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('dev', ['stylus', 'watch']);
  grunt.registerTask('test', ['karma:test']);
};

