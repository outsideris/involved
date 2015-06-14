module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "download-electron": {
      version: "0.27.3",
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
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        timeout: 10000
      },
      browser: {
        src: ['spec/**/*.spec.coffee']
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      browser: { src: 'src/browser/**/*.js' },
      renderer: { src: 'src/renderer/**/*.js' }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('dev', ['stylus', 'watch']);
  grunt.registerTask('test', ['mochaTest']);
};

