var ipc = require('ipc');

var repo = require('./repository');

ipc.on('watch', function(event, project) {
  event.returnValue = repo.watch(project);
});

ipc.on('unwatch', function(event, project) {
  event.returnValue = repo.unwatch(project);
});

ipc.on('timeline', function(event, id) {
  repo.timeline(id).then(function(list) {
    event.sender.send('timeline', list);
  });
});

