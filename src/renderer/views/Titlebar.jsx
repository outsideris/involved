'use strict';

var React = require('react');

module.exports = React.createClass({
  ipc: require('ipc'),
  remote: require('remote'),
  classNames: require('classnames'),
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
  handleClick: function() {
    this.setState({showModal: !this.state.showModal});
  },
  manageRepo: function(){
    app.changeContentsMode('manage-repo');
  },
  manageIssue: function(){
    app.changeContentsMode('manage-issue');
  },
  getInitialState: function() {
    return {user: {}, showModal: this.props.showModal};
  },
  render: function () {
    var profile;
    if (!!this.state.user.login) {
      var classes = this.classNames({ 'menu': true, 'active': this.state.showModal });
      profile = (
        <div id="profile" onClick={this.handleClick}>
          <img src={this.state.user.avatar_url+'v=3&s=25'} className="avatar avatar-small"/>
          <span className="octicon octicon-triangle-down"></span>
          <nav className={classes} id="profile-menu">
            <span className="menu-heading">Signed in as {this.state.user.login}</span>
            <a className="menu-item" href="#" onClick={this.manageRepo}>
              <span className="octicon octicon-tools"></span>
              Repositories
            </a>
            <a className="menu-item" href="#" onClick={this.manageIssue}>
              <span className="octicon octicon-tools"></span>
              Issues
            </a>
          </nav>
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
