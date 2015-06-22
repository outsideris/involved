(function() {
  'use strict';

  angular.module('involved', ['ngResource'])
    .run(function($rootScope, $timeout, github, repo) {
      github.me();

      $rootScope.$on('myProfileReceived', function(event, profile) {
        $timeout(function() {
          $rootScope.me = profile;
        }, 0);
      });

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

      $scope.showEvent = function(evt) {
        $scope.detail = evt;
      };

      $scope.state= function(status) {
        return 'state-' + status;
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
  var ipc = require('ipc');
  angular.module('involved')
    .factory('github', function($rootScope) {
      ipc.on('github.me', function(profile) {
        $rootScope.$broadcast('myProfileReceived', profile);
      });

      ipc.on('github.emojis', function(emojis) {
        $rootScope.$broadcast('emojisReceived', emojis);
      });

      return {
        me: function() {
          ipc.send('github.me');
        },
        emojis: function() {
          ipc.send('github.emojis');
        }
      };
    })
    .factory('repo', function($rootScope) {
      ipc.on('repo.timeline', function(list) {
        $rootScope.$broadcast('timelineReceived', list);
      });

      return {
        watch: function(p) {
          return ipc.sendSync('repo.watch', p);
        },
        unwatch: function(p) {
          return ipc.sendSync('repo.unwatch', p);
        },
        timeline: function(since) {
          ipc.send('repo.timeline', since);
        }
      };
    })
    .factory('markdown', function($rootScope, github) {
      var md = window.markdownit(),
          list;

      github.emojis();
      $rootScope.$on('emojisReceived', function(event, emojis) {
        list = emojis

        if (!md.renderer.rules.emoji) { md.use(window.markdownitEmoji);  }
        md.renderer.rules.emoji = function(token, idx) {
          var code = token[idx].markup;
          return '<img title=":'+code+':" alt=":'+code+':" src="'+list[code]+'" class="emoji">';
        };
      });

      return md;
    });

  // filters
  angular.module('involved')
    .filter('fromNow', function() {
      return function(date) { return moment(date).fromNow(); };
    })
    .filter('removeRef', function() {
      return function(ref) { return ref.replace('refs/heads/', ''); };
    })
    .filter('shortSha', function() {
      return function(sha, length) {
        length = length || 7;
        return sha ? sha.substr(0, length) : sha;
      };
    })
    .filter('md', function($sce, markdown) {
      return function(text) { return $sce.trustAsHtml(markdown.render(text)); };
    });
})();
