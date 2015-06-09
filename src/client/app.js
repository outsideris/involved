(function() {
  'use strict';

  angular.module('involved', ['ngResource'])
    .run(function($rootScope, repo) {
      //github.user().get(function(user, getResponseHeaders) {
      //  $rootScope.me = user;
      //});

      // temporary
      repo.watch({owner: 'strongloop', repo: 'express'});
      repo.watch({owner: 'summernote', repo: 'summernote'});
      repo.watch({owner: 'Automattic', repo: 'socket.io'});
      repo.watch({owner: 'nodejs', repo: 'io.js'});
      repo.watch({owner: 'angular', repo: 'angular.js'});
      repo.watch({owner: 'facebook', repo: 'react'});
      repo.watch({owner: 'rails', repo: 'rails'});
      repo.watch({owner: 'antirez', repo: 'redis'});
      repo.watch({owner: 'bower', repo: 'bower'});
    });

  // controllers
  angular.module('involved')
    .controller('TimelineCtrl', function($scope, $timeout, repo) {
      var loadingMore = false;
      $scope.timeline = [];
      repo.timeline();

      $scope.$on('timelineReceived', function(event, list) {
        loadingMore = false;
        $timeout(function() {
          $scope.timeline = $scope.timeline.concat(list);
        }, 0);
      });

      $scope.loadMore = function() {
        loadingMore = true;
        var lastId = $scope.timeline[$scope.timeline.length - 1].id;
        repo.timeline(lastId);
      };
    });

  // directives
  angular.module('involved')
    .directive('whenScrolled', function() {
      return function(scope, elem, attr) {
        var raw = elem[0];
        elem.on('scroll', function() {
          if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
            scope.$apply(attr.whenScrolled);
          }
        });
      };
    });

  // services
  angular.module('involved')
    .factory('repo', function($rootScope) {
      var ipc = require('ipc');

      ipc.on('timeline', function(list) {
        $rootScope.$broadcast('timelineReceived', list);
      });

      return {
        watch: function(p) {
          return ipc.sendSync('watch', p);
        },
        unwatch: function(p, cb) {
          return ipc.sendSync('unwatch', p);
        },
        timeline: function(since) {
          ipc.send('timeline', since);
        }
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
