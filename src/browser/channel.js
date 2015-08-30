'use strict';

var ipc = require('ipc');

var github = require('./github'),
    repo = require('./repository');

ipc.on('github.token', function(event, token) {
  event.returnValue = github.token(token);
});

ipc.on('github.me', function(event) {
  github.me().then(function(d) {
    event.sender.send('github.me', d.body);
  }).catch(function(e) { console.log(e);});
});

ipc.on('github.emojis', function(event) {
  github.emojis().then(function(d) {
    event.sender.send('github.emojis', d.body);
  }).catch(function(e) { console.log(e);});
});

ipc.on('repo.watch', function(event, project) {
  event.returnValue = repo.watch(project);
});

ipc.on('repo.unwatch', function(event, project) {
  event.returnValue = repo.unwatch(project);
});

ipc.on('repo.timeline', function(event, id) {
  repo.timeline(id).then(function(list) {
    event.sender.send('repo.timeline', list);
  }).catch(function(e) { console.log(e);});
});

