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
          {owner: 'summernote', repo: 'summernote'},
          {owner: 'Automattic', repo: 'socket.io'},
          {owner: 'bower', repo: 'bower'}
        ]
      };

      github.repoEvent()
        .query({
          owner: $scope.watch.projects[0].owner,
          repo: $scope.watch.projects[0].repo
        }, function(events, getResponseHeaders) {
          events = _.filter(events, function(e) {
            return e.type !== 'ForkEvent' && e.type !== 'WatchEvent';
          });
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
        },
        repoEvent: function() {
          return $resource(githubHost + '/repos/:owner/:repo/events', {
            access_token: token
          });
        }
      };
    });

  // filters
  angular.module('involved')
    .filter('fromNow', function() {
      return function(date) { return moment(date).fromNow(); }
    });
})();
