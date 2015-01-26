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
      $scope.watch = {
        projects: [
          {owner: 'Automattic', repo: 'socket.io'},
          {owner: 'bower', repo: 'bower'}
        ]
      };
      console.log($scope.watch.projects[0].owner)
      github.repoEvent()
        .query({
          owner: $scope.watch.projects[0].owner,
          repo: $scope.watch.projects[0].repo
        }, function(events, getResponseHeaders) {
          console.log(events);
          $scope.timeline = events;
        });
    });

  // services
  angular.module('involved')
    .factory('github', function($resource) {
      var githubHost = 'https://api.github.com';
      var token = '';
      return {
        user: function() {
          return $resource(githubHost + '/user', {
            access_token: token
          });
        }
      };
    });
})();
