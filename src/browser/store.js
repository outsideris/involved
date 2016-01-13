'use strict';

var Datastore = require('nedb'),

    user = new Datastore({ filename: './user.db', autoload: true }),
    watch = new Datastore({ filename: './watch.db', autoload: true }),
    repos = new Datastore({ filename: './repos.db', autoload: true });

watch.ensureIndex({ fieldName: 'repo', unique: true }, function (err) {
  if (err) { console.error(err); }
});

repos.ensureIndex({ fieldName: 'id', unique: true }, function (err) {
  if (err) { console.error(err); }
});

module.exports = {
  user: user,
  watch: watch,
  repos: repos
};
