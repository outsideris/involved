var app = app || {};

(function() {
  'use strict';

  app.Menus = React.createClass({
    ipc: require('ipc'),
    selectRepo: function() { this.props.onSelect('repo'); },
    selectIssue: function() { this.props.onSelect('issue'); },
    getInitialState: function() {
      return {data: []};
    },
    render: function () {
      var cx = React.addons.classSet;
      var repoClasses = cx({ 'a-menu': true, 'active': this.props.mode === 'repo' });
      var issueClasses = cx({ 'a-menu': true, 'active': this.props.mode === 'issue' });

      return (
        <nav className="menus" id="menu">
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
        </nav>
      );
    }
  });
})();
