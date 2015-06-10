var ipc = require('ipc');

var github = require('./github');
    repo = require('./repository');

ipc.on('github.me', function(event, id) {
  github.me().then(function(d) {
    event.sender.send('github.me', d.body);
  });
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
  });
});

