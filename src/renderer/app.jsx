'use strict';

var ipcRenderer = require("electron").ipcRenderer,
    React = require('react');

var Signin = require('./views/Signin'),
    Menus = require('./views/Menu'),
    Repository = require('./views/Repository'),
    ManageRepository = require('./views/ManageRepository'),
    ManageIssue = require('./views/ManageIssue'),
    eventer = require('./eventer'),
    store = require('./store');

module.exports = React.createClass({
  handleLogin: function(profile) {
    this.setState({user: profile});
  },
  handleSelect: function(mode) {
    this.setState({mode: mode});
  },
  componentWillMount: function () {
    var self = this;
    ipcRenderer.send('github.me');
    ipcRenderer.on('github.me', function(event, profile) {
      store.user = profile;
      self.setState({user: profile});
    });
    eventer.contents.on('mode', function(mode) {
      self.setState({mode: mode});
    });
  },
  getInitialState: function() {
    store.token = ipcRenderer.sendSync('github.token');
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
        <div className="flex-container">
          <Menus onSelect={this.handleSelect} mode={this.state.mode} />
          {mode}
        </div>
      );
    }
  }
});


