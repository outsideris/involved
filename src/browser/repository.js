'use strict';

var _ = require('lodash'),
  Q = require('q'),
  lowdb = require('lowdb');

var github = require('./github');

var db = lowdb('db.json'),
    repoDB = db('repos'),
    repoEventDB = db('timeline');

module.exports = (function() {
  return {
    repoEventDB: repoEventDB,
    watch: function(p) {
      if (p && p.owner && p.repo && !repoDB.find({owner: p.owner, repo:p.repo})) {
        repoDB.push(p);
      }
      return repoDB.chain().where({}).value();
    },
    unwatch: function(p) {
      if (p && p.owner && p.repo) {
        repoDB.remove(p);
        repoEventDB.remove({repo: {name: p.owner+'/'+p.repo}});
      }
      return repoDB.chain().where({}).value();
    },
    unwatchAll: function() {
      repoDB.remove();
      repoEventDB.remove();
    },
    timeline: function(sinceId) {
      var projects = repoDB.chain().where({}).value();

      var promises;
      if (!sinceId) {
        repoEventDB.remove();
        promises = _.chain(projects).map(function(p) {
          p.nextPage = 1;
          return github.repoEvents(p.owner, p.repo, p.nextPage);
        }).value();
      } else {
        promises = _.chain(projects).filter(function(p) {
          return repoEventDB.chain().where({repo: {name: p.owner+'/'+p.repo}})
              .filter(function(o) { return o.id<sinceId; }).value().length < github.pageSize/4;
        }).map(function(p) {
          return github.repoEvents(p.owner, p.repo, p.nextPage);
        }).value();
      }

      return Q.all(promises)
        .then(function(result) {
          result.forEach(function(data) {
            data.body.forEach(function(evt) {
              if (evt.type !== 'ForkEvent' && evt.type !== 'WatchEvent' && evt.type !== 'GollumEvent') {
                repoEventDB.push(evt);
              }
            });
          });
          projects.forEach(function(p) {
            p.nextPage = (p.nextPage || 1) + 1;
          });
        }).then(function() {
          return repoEventDB.chain().filter(function(o) { return o.id<(sinceId || Infinity); })
            .sortBy('created_at').reverse().take(github.pageSize/4).value();
        });
    }
  };
})();
