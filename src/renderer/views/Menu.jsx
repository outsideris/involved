'use strict';

var ipcRenderer = require("electron").ipcRenderer,
    React = require('react'),
    classNames = require('classnames'),

    eventer = require('../eventer'),
    store = require('../store');

module.exports = React.createClass({
  selectRepo: function() { this.props.onSelect('repo'); },
  selectIssue: function() { this.props.onSelect('issue'); },
  toggleManageModal: function() { this.setState({showModal: !this.state.showModal}); },
  manageRepo: function(){ eventer.contents.emit('mode', 'manage-repo'); this.toggleManageModal(); },
  manageIssue: function(){ eventer.contents.emit('mode', 'manage-issue'); this.toggleManageModal(); },
  getInitialState: function() {
    return {user: {}, showModal: this.props.showModal, data: []};
  },
  render: function () {
    var modalClasses = classNames({ 'menu': true, 'active': this.state.showModal });
    var repoClasses = classNames({ 'a-menu': true, 'active': this.props.mode === 'repo' });
    var issueClasses = classNames({ 'a-menu': true, 'active': this.props.mode === 'issue' });
    var signedMessage = 'Signed in as ' + store.user.login;

    return (
      <nav className="menus" id="menu">
        <div id="profile">
          <span className="tooltipped tooltipped-e" aria-label={signedMessage}>
            <img src={store.user.avatar_url+'&s=90'} className="avatar"/>
          </span>
        </div>
        <div className={repoClasses} onClick={this.selectRepo}>
          <span className="tooltipped tooltipped-e" aria-label="Repositories">
            <span className="mega-octicon octicon-repo"></span>
          </span>
        </div>
        <div className={issueClasses} onClick={this.selectIssue}>
          <span className="tooltipped tooltipped-e" aria-label="Issues">
            <span className="mega-octicon octicon-issue-opened"></span>
          </span>
        </div>
        <div className="footer">
          <span className="octicon octicon-gear footer-item" onClick={this.toggleManageModal}></span>
          <nav className={modalClasses} id="profile-menu">
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
      </nav>
    );
  }
});
