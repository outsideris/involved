var app = app || {};

(function() {
  'use strict';

  var Repository = app.Repository,
      ipc = require('ipc');

  app.token = ipc.sendSync('github.token');

  function render() {
    React.render(
      <Repository since={0} />,
      document.getElementById('content')
    );
  }

  render();
})();

