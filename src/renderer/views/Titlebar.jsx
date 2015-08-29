var app = app || {};

(function() {
  'use strict';

  var Titlebar = React.createClass({
    remote: require('remote'),
    close: function () {
      this.remote.getCurrentWindow().close();
    },
    minimize: function () {
      this.remote.getCurrentWindow().minimize();
    },
    fullscreen: function() {
      if (this.remote.getCurrentWindow().isMaximized()) {
        this.remote.getCurrentWindow().unmaximize();
      } else {
        this.remote.getCurrentWindow().maximize();
      }
    },
    render: function () {
      return (
        <div>
          <div className="window-buttons">
            <div className="window-btn window-button-close" onClick={this.close}><span>x</span></div>
            <div className="window-btn window-button-hide" onClick={this.minimize}><span>-</span></div>
            <div className="window-btn window-button-fullscreen" onClick={this.fullscreen}><span>+</span></div>
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
