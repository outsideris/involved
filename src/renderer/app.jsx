var app = app || {};

(function() {
  'use strict';

  var Repository = app.Repository;

  function render() {
    React.render(
      <Repository since={0} />,
      document.getElementById('content')
    );
  }

  render();
})();

