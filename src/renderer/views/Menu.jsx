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
          <div className="a-menu" title="Repositories">
            <span className="mega-octicon octicon-repo"></span>
          </div>
          <div className="a-menu" title="Issues">
            <span className="mega-octicon octicon-issue-opened"></span>
          </div>
        </nav>
      );
    }
  });
})();
