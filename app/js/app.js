(function() {
  'use strict';

  angular.module('involved', ['ngResource'])
    .run(function($rootScope, github, repo) {
      github.user().get(function(user, getResponseHeaders) {
        $rootScope.me = user;
      });

      // temporary
      repo.watch({owner: 'strongloop', repo: 'express'});
      repo.watch({owner: 'summernote', repo: 'summernote'});
      repo.watch({owner: 'Automattic', repo: 'socket.io'});
      repo.watch({owner: 'iojs', repo: 'io.js'});
      repo.watch({owner: 'angular', repo: 'angular.js'});
      repo.watch({owner: 'facebook', repo: 'react'});
      repo.watch({owner: 'rails', repo: 'rails'});
      repo.watch({owner: 'antirez', repo: 'redis'});
      repo.watch({owner: 'bower', repo: 'bower'});
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
    .factory('repo', function($q, github, db) {
      var watchedProjects = [];

      var watch = function(p, cb) {
        if(typeof cb !== 'function') { cb = function() {};}
        if (p && p.owner && p.repo) {
          db.registerProject(p, function(err, doc) {
            if (err) { return cb(err); }
            watchedProjects.push(p);
            cb(null, watchedProjects);
          });
        } else { cb(new Error()); }
      };

      var unwatch = function(p, cb) {
        if (p && p.owner && p.repo) {
          var index = _.findIndex(watchedProjects, function(w) {
            return w.owner === p.owner && w.repo === p.repo;
          });
          if (~index) {
            db.unregisterProject(watchedProjects[index], function(err, doc) {
              if (err) { return cb(err); }
              watchedProjects.splice(index, 1);
              cb(null, watchedProjects);
            });
          }
        } else { cb(new Error()); }
      };

      var unwatchAll = function(cb) {
        db.unregisterAllProjects(function(err) {
          if (!err) {
            watchedProjects = [];
            cb(watchedProjects);
          } else { cb(err); }
        });
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
    })
    .factory('db', function() {
      var projects = new PouchDB('projects');

      return {
        registerProject: function(p, cb) {
          p._id = Date.now() + "";
          projects.put(p, cb);
        },
        unregisterProject: function(p, cb) {
          projects.get(p._id, function(err, doc) {
            if (err) { return cb(err); }
            projects.remove(doc, cb);
          });
        },
        unregisterAllProjects: function(cb) {
          projects.destroy(function(err, info) {
            if (err) { cb(err); }
            if (info.ok) {
              projects = new PouchDB('projects');
            }
            cb();
          });
        },
        getProjects: function(cb) {
          projects.allDocs(cb);
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
