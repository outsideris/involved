var app = app || {};

(function() {
  'use strict';

  var Titlebar = React.createClass({
    render: function () {
      return (
        <div>
          <div className="window-buttons">
            <div className="window-btn window-button-close"><span>x</span></div>
            <div className="window-btn window-button-hide"><span>-</span></div>
            <div className="window-btn window-button-fullscreen"><span>+</span></div>
          </div>
        </div>
      );
    }
  });

  function render() {
    React.render(
      <Titlebar />,
      document.getElementById('titlebar')
    );
  }

  render();
})();
