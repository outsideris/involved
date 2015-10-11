var app = app || {};

(function() {
  'use strict';

  var React = require('react');

  var Signin = app.Signin,
      Menus = app.Menus,
      Repository = app.Repository,
      ManageRepository = app.ManageRepository,
      ManageIssue = app.ManageIssue;

  var App = React.createClass({
    ipc: require('ipc'),
    handleLogin: function(profile) {
      this.setState({user: profile});
    },
    handleSelect: function(mode) {
      this.setState({mode: mode});
    },
    componentDidMount: function() {
      var self = this;
      app.changeContentsMode = function(mode) {
        self.setState({mode: mode})
      };
    },
    componentWillMount: function () {
      var self = this;
      this.ipc.send('github.me');
      this.ipc.on('github.me', function(profile) {
        self.setState({user: profile});
      });
    },
    getInitialState: function() {
      app.token = this.ipc.sendSync('github.token');
      return {user: {}};
    },
    render: function () {
      if (!this.state.user.login) {
        return (
          <Signin onLogin={this.handleLogin} showModal={false} />
        );
      } else {
        var mode;
        if (this.state.mode === 'repo') {
          mode = <Repository />
        } else if (this.state.mode === 'issue') {
          mode = <div className="main-contents flex-container"></div>
        } else if (this.state.mode === 'manage-repo') {
          mode = <ManageRepository />
        } else if (this.state.mode === 'manage-issue') {
          mode = <ManageIssue />
        }
        return (
          <div className="flex-container flex-container-row">
            <Menus onSelect={this.handleSelect} mode={this.state.mode} />
            {mode}
          </div>
        );
      }
    }
  });

  function render() {
    React.render(
      <App />,
      document.getElementById('content')
    );
  }

  render();
})();

