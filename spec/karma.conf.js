// Karma configuration
// Generated on Sat Jan 04 2014 16:46:43 GMT+0900 (KST)

var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
  'use strict';
  sharedConfig(config, {testName: 'angular-summernote: angular-1.3.x'});

  config.set({
    // list of files / patterns to load in the browser
    files: [
      // dependencies
      '../app/js/init.js',
      '../app/components/angular/angular.js',
      '../app/components/angular-resource/angular-resource.js',
      '../app/components/moment/moment.js',
      '../app/components/lodash/lodash.js',

      // application code
      '../app/js/app.js',

      // test dependencies
      '../app/components/angular-mocks/angular-mocks.js',
      '../app/components/chai/chai.js',
      'mocha.conf.js',
      'chai.conf.js',

      // test code
      'unit/*.spec.js'
    ]
  });
};
