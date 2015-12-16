'use strict';

var ipcMain = require("electron").ipcMain;

var github = require('./github'),
    repo = require('./repository');

ipcMain.on('github.token', function(event, token) {
  event.returnValue = github.token(token);
});

ipcMain.on('github.me', function(event) {
  github.me().then(function(d) {
    event.sender.send('github.me', d.body);
  }).catch(function(e) { console.log(e);});
});

ipcMain.on('github.emojis', function(event) {
  github.emojis().then(function(d) {
    event.sender.send('github.emojis', d.body);
  }).catch(function(e) { console.log(e);});
});

ipcMain.on('repo.watch', function(event, project) {
  event.returnValue = repo.watch(project);
});

ipcMain.on('repo.unwatch', function(event, project) {
  event.returnValue = repo.unwatch(project);
});

ipcMain.on('repo.timeline', function(event, id) {
  repo.timeline(id).then(function(list) {
    event.sender.send('repo.timeline', list);
  }).catch(function(e) { console.log(e);});
});

