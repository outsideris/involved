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
    .controller('TimelineCtrl', function($scope, repo) {
      repo.timeline().then(function(events) {
        $scope.timeline = events
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
    })
    .factory('repo', function(github) {
      var watched = {
        projects: [
          {owner: 'summernote', repo: 'summernote'},
          {owner: 'Automattic', repo: 'socket.io'},
          {owner: 'bower', repo: 'bower'}
        ]
      };

      var getTimeline = function() {
        return github.repoEvent()
                .query({
                  owner: watched.projects[0].owner,
                  repo: watched.projects[0].repo
                }).$promise.then(function(events, getResponseHeaders) {
                  events = _.filter(events, function(e) {
                    return e.type !== 'ForkEvent' && e.type !== 'WatchEvent';
                  });
                  return events;
                });
      };

      return {
        timeline: function() { return getTimeline(); }
      };
    });

  // filters
  angular.module('involved')
    .filter('fromNow', function() {
      return function(date) { return moment(date).fromNow(); }
    })
    .filter('removeRef', function() {
      return function(ref) { return ref.replace('refs/heads/', ''); }
    })
    .filter('shortSha', function() {
      return function(sha, length) {
        length = length || 7;
        return sha ? sha.substr(0, length) : sha;
      };
    });
})();
