module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "download-electron": {
      version: "0.25.2",
      outputDir: "./build/electron",
      rebuild: true
    },
    stylus: {
      compile: {
        files: {
          'src/static/css/style.css': ['src/stylus/style.styl']
        }
      }
    },
    watch: {
      stylus: {
        files: ['src/stylus/**/*.styl'],
        tasks: ['stylus:compile']
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('dev', ['stylus', 'watch']);
};

