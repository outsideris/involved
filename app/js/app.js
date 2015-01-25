(function() {
  'use strict';

  angular.module('involved', ['ngResource'])
    .run(function($rootScope, github) {
      github.user().get(function(user, getResponseHeaders) {
        $rootScope.me = user;
      });
    });

  // controllers
  angular.module('involved')
    .controller('TimelineCtrl', function($scope, github) {

    });

  // services
  angular.module('involved')
    .factory('github', function($resource) {
      var githubHost = 'https://api.github.com';
      var token = 'b4e796e89482217563b3f85b687039c6d7b78c08';
      return {
        user: function() {
          return $resource(githubHost + '/user', {
            access_token: token
          });
        }
      };
    });
})();
