'use strict';

var _ = require('lodash'),
    Q = require('q');

var github = require('./github'),
    db = require('./store');

module.exports = (function() {
  return {
    watch: function(p, cb) {
      if (p && p.repo) {
        p.type = 'repo';
        db.watch.insert(p, function(err, newDoc) {
          if (err) { return cb(err); }
          db.watch.find({type: 'repo'}, function(err, docs) {
            cb(err, docs);
          });
        });
      } else {
        db.watch.find({type: 'repo'}, function(err, docs) {
          cb(err, docs);
        });
      }
    },
    unwatch: function(p, cb) {
      if (p && p.repo) {
        db.watch.remove(p, function(err, numRemoved) {
          if (err) { return cb(err); }
          db.repos.remove({repo: {name: p.repo}}, function(err, numRemoved) {
            if (err) { return cb(err); }
            db.watch.find({type: 'repo'}, function(err, docs) {
              cb(err, docs);
            });
          });
        });
      }
    },
    unwatchAll: function(cb) {
      db.watch.remove({}, {multi: true}, function(err, num) {
        db.repos.remove({}, {multi: true}, function(err, num) {
          cb(err)
        });
      });
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
