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
    .factory('repo', function($q, github) {
      var watchedProjects = [];

      var watch = function(p) {
        if (p && p.owner && p.repo) { watchedProjects.push(p); }
        return watchedProjects;
      };

      var unwatch = function(p) {
        if (p && p.owner && p.repo) {
          var index = _.findIndex(watchedProjects, function(w) {
            return w.owner === p.owner && w.repo === p.repo;
          });
          if (~index) { watchedProjects.splice(index, 1); }
        }
        return watchedProjects;
      };

      var unwatchAll = function() {
        watchedProjects = [];
        return watchedProjects;
      };

      var fetchEventsOfRepo = function(project) {
        var defer = $q.defer();
        github.repoEvent()
          .query({
            owner: project.owner,
            repo: project.repo
          }, function(events, headers) {
            events = _.filter(events, function(e) {
              return e.type !== 'ForkEvent' && e.type !== 'WatchEvent';
            });

            if (!project.events) { project.events = []; }
            project.events = project.events.concat(events);

            defer.resolve(project.events);
          });
        return defer.promise;
      };

      var makeTimeline = function() {
        var defer = $q.defer();
        var promises = _.map(watchedProjects, function(p) { return fetchEventsOfRepo(p) });
        $q.all(promises)
          .then(function(events) {
            events = _.sortByAll(_.flatten(events), ['created_at']).reverse();
            defer.resolve(events);
          });
        return defer.promise;
      };

      return {
        watch: watch,
        unwatch: unwatch,
        unwatchAll: unwatchAll,
        timeline: makeTimeline
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
