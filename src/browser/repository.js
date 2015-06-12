'use strict';

var _ = require('lodash'),
  Q = require('q'),
  lowdb = require('lowdb');

var github = require('./github');

var db = lowdb('db.json')('repos');

module.exports = (function() {
  var projects = [];
  return {
    db: db,
    watch: function(p) {
      if (p && p.owner && p.repo) {
        projects.push(p);
      }
      return projects;
    },
    unwatch: function(p) {
      if (p && p.owner && p.repo) {
        var index = _.findIndex(projects, function(o) {
          return o.owner === p.owner && o.repo === p.repo;
        });
        if (~index) { projects.splice(index, 1); }
      }
      return projects;
    },
    unwatchAll: function() {
      projects = [];
    },
    events: function(sinceId) {
      var deferred = Q.defer();
      sinceId = sinceId || Infinity;

      Q.all(
        _.chain(projects).filter(function(p) {
          return db.chain().where({repo: {name: p.owner+'/'+p.repo}})
              .filter(function(o) { return o.id<sinceId; }).value().length < github.pageSize/4;
        }).map(function(p) {
          return github.repoEvents(p.owner, p.repo, p.nextPage);
        }).value()
      ).then(function(result) {
          result.forEach(function(data) {
            data.body.forEach(function(evt) {
              if (evt.type !== 'ForkEvent' && evt.type !== 'WatchEvent') {
                db.push(evt);
              }

            });
          });
          projects.forEach(function(p) {
            p.nextPage = (p.nextPage || 1) + 1;
          });
          deferred.resolve();
        }).catch(function(e) { deferred.reject(e); });
      return deferred.promise;
    },
    timeline: function(sinceId) {
      var deferred = Q.defer();
      sinceId = sinceId || Infinity;

      this.events(sinceId).then(function() {
        var list = db.chain().filter(function(o) { return o.id<sinceId; })
          .sortBy('created_at').reverse().take(github.pageSize/4).value();
        deferred.resolve(list);
      }).catch(function(e) { deferred.reject(e); });
      return deferred.promise;
    }
  };
})();
