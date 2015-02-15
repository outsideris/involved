module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "download-atom-shell": {
      version: "0.21.2",
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
    },
    karma: {
      options: { configFile: '../spec/karma.conf.js' },
      test: { }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('dev', ['stylus', 'watch']);
  grunt.registerTask('test', ['karma:test']);
};
