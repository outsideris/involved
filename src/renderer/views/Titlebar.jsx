var app = app || {};

(function() {
  'use strict';

  var Titlebar = React.createClass({
    ipc: require('ipc'),
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
    getInitialState: function() {
      return {user: {}};
    },
    render: function () {
      var profile;
      if (!!this.state.user.login) {
        profile = (
          <div id="profile">
            <img src={this.state.user.avatar_url+'v=3&s=25'} className="avatar avatar-small"/>
            <span>{this.state.user.login}</span>
          </div>
        );
      } else {
        profile = (
          <div id="profile">
          </div>
        );
      }

      var self = this;
      this.ipc.on('github.me', function(profile) {
        self.setState({user:profile});
      });

      return (
        <div>
          <div className="window-buttons">
            <div className="window-btn window-button-close" onClick={this.close}><span>x</span></div>
            <div className="window-btn window-button-hide" onClick={this.minimize}><span>-</span></div>
            <div className="window-btn window-button-fullscreen" onClick={this.fullscreen}><span>+</span></div>
          </div>
          {profile}
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
