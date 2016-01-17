'use strict';

var _ = require('lodash'),
    Q = require('q');

var github = require('./github'),
    db = require('./store');

var Repo = module.exports = (function() {
  return {
    timelineSize: github.pageSize / 4,
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
        db.watch.remove({repo:p.repo, type:'repo'}, function(err, numRemoved) {
          if (err) { return cb(err); }
          db.repos.remove({'repo.name': p.repo}, {multi:true}, function(err, numRemoved) {
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
    fetchEventsAndSave: function(repo, isNew, cb) {
      db.watch.findOne({repo:repo, type:'repo'}, function(err, doc) {
        var page = ++doc.page || 1;
        if (isNew) { page = 1 }
        github.repoEvents(repo, page).then(function(data) {
          data.body = _.filter(data.body, function(d) {
            return d.type !== 'ForkEvent' && d.type !== 'WatchEvent' && d.type !== 'GollumEvent'
          })
          db.repos.insert(data.body, function(err, docs) {
            db.watch.update({repo: repo, type:'repo'}, {$set: {page: page}}, function(err, numReplaced) {
              cb(err, docs);
            });
          });
        }).catch(cb);
      });
    },
    makeTimeline: function(sinceId, cb) {
      db.watch.find({type:'repo'}, function(err, watchedRepos) {
        if (err) { return cb(err); }
        var doneCount = 0;
        var done = function(err, docs) {
          ++doneCount;
          if (doneCount > watchedRepos.length-1) {
            cb();
          }
        };

        sinceId = sinceId || '99999999999';
        _.each(watchedRepos, function(r) {
          db.repos.find({id: {$lt: sinceId+''}, 'repo.name': r.repo}, function(err, docs) {
            if (docs.length <= Repo.timelineSize) {
              Repo.fetchEventsAndSave(r.repo, false, done);
            } else {done()}
          });
        });
      });
    },
    getTimeline: function(sinceId, isNew, cb) {
      var self = this;
      sinceId = sinceId || '99999999999';
      db.repos.count({id: {$lt: sinceId+''}}, function(err, count) {
        if (err) { return cb(err); }

        if (count >= self.timelineSize) {
          db.repos.find({id: {$lt: sinceId+''}}).sort({ id: -1 }).limit(self.timelineSize).exec(function(err, docs) {
            cb(err, docs);
            var lastId = docs[docs.length-1].id;
            Repo.makeTimeline(lastId, function() {});
          });
        } else {
          Repo.makeTimeline(sinceId, function() {
            db.repos.find({id: {$lt: sinceId+''}}).sort({ id: -1 }).limit(self.timelineSize).exec(function(err, docs) {
              cb(err, docs);
              var lastId = docs[docs.length-1].id;
              Repo.makeTimeline(lastId, function() {});
            });
          });
        }
      });
    }
  };
})();
