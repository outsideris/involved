'use strict';

var ipcRenderer = require("electron").ipcRenderer,
    React = require('react');

var Spinner = require('./views/Spinner'),
    Signin = require('./views/Signin'),
    Menus = require('./views/Menu'),
    Repository = require('./views/Repository'),
    ManageRepository = require('./views/ManageRepository'),
    ManageIssue = require('./views/ManageIssue'),
    eventer = require('./eventer'),
    store = require('./store');

module.exports = React.createClass({
  processLogin: function() {
    this.setState({loading:true});
  },
  handleSelect: function(mode) {
    this.setState({mode: mode});
  },
  componentWillMount: function () {
    var self = this;
    ipcRenderer.send('github.me');
    ipcRenderer.on('github.me', function(event, profile) {
      if (profile === 'Token Required') {
        self.setState({loading: false});
      } else if (profile) {
        store.user = profile;
        self.setState({user: profile, loading: false});
      }
    });
    eventer.contents.on('mode', function(mode) {
      self.setState({mode: mode});
    });
  },
  getInitialState: function() {
    store.token = ipcRenderer.sendSync('github.token');
    return {user: {}, loading: true};
  },
  render: function () {
    if (this.state.loading) {
      return (
        <Spinner/>
      );
    } else if (!this.state.user.login) {
      return (
        <Signin processLogin={this.processLogin} showModal={false} />
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
        <div className="full-height">
          <Menus onSelect={this.handleSelect} mode={this.state.mode} />
          {mode}
        </div>
      );
    }
  }
});


