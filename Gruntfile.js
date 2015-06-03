module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "download-electron": {
      version: "0.27.2",
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
        timeout: 5000
      },
      browser: {
        src: ['spec/**/*.spec.coffee']
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('dev', ['stylus', 'watch']);
  grunt.registerTask('test', ['mochaTest']);
};

