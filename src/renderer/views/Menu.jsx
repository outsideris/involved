var app = app || {};

(function() {
  'use strict';

  app.Menus = React.createClass({
    ipc: require('ipc'),
    getInitialState: function() {
      return {data: []};
    },
    render: function () {
      return (
        <nav className="menus" id="menu">
        </nav>
      );
    }
  });
})();
