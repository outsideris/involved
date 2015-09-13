var app = app || {};

(function() {
  'use strict';

  var RepositoryItem = React.createClass({
    handleClick: function() { this.props.onDestroy(this.props.item); },
    render: function() {
      return (
        <li className="table-list-item">
          <div className="table-list-cell"><strong>{this.props.item.owner}/{this.props.item.repo}</strong></div>
          <div className="table-list-cell">
            <button className="btn btn-sm btn-danger btn-delete" type="button" onClick={this.handleClick}>
              <span className="octicon octicon-x"></span>
            </button>
          </div>
        </li>
      );
    }
  });

  app.ManageRepository = React.createClass({
    ipc: require('ipc'),
    classNames: require('classnames'),
    handleSubmit: function(event) {
      event.preventDefault();
      var r = this.state.input.trim();

      if (r !== '' && r.match(/[0-9a-zA-Z-]+\/[0-9a-zA-Z-]+/)) {
        var splitedRepo = r.split('/');
        var repo = this.ipc.sendSync('repo.watch', {owner: splitedRepo[0], repo: splitedRepo[1]});
        this.setState({ input: '', error: false, watchedRepositories: repo });
      } else {
        this.setState({ input: r, error: true });
      }
    },
    handleChange: function(event) {
      this.setState({ input: event.target.value });
    },
    handleDestroy: function(item) {
      this.ipc.sendSync('repo.unwatch', item);

      var toRemoveIndex;
      var watchedRepo = this.state.watchedRepositories;
      for (var index in watchedRepo) {
        if (watchedRepo[index].owner === item.owner && watchedRepo[index].repo === item.repo) {
          toRemoveIndex = index;
        }
      }
      watchedRepo.splice(toRemoveIndex, 1);
      this.setState({watchedRepositories: watchedRepo});
    },
    getInitialState: function () {
      return {input: '', error: false, watchedRepositories: this.ipc.sendSync('repo.watch') };
    },
    render: function () {
      var formClasses = this.classNames({ 'form': true, 'errored': this.state.error });

      var repositories = ''
      if (this.state.watchedRepositories.length) {
        var self = this;
        var r = this.state.watchedRepositories.map(function(r) {
          return (
            <RepositoryItem item={r} onDestroy={self.handleDestroy} />
          );
        });
        repositories =  <ul className="table-list">
                          {r}
                        </ul>
      } else {
        repositories = <div className="blankslate">
                         <h3>There is no repository that is tracked.</h3>
                         <p>Add repositories you want to track in above form.</p>
                       </div>
      }

      return (
        <div className="one-half column centered">
          <h1>Manage Repositories</h1>
          <div className="flash flash-with-icon">
            <span className="octicon octicon-alert"></span>
            Add repositories that you want to track.
            You can see their timeline in the timeline menu.
            <br/>
            If you want to track https://github.com/atom/electron, enter "atom/electron" in blow.
          </div>
          <form className="manage-form" onSubmit={this.handleSubmit}>
            <dl className={formClasses}>
              <div className="input-group">
                <input type="text" placeholder="username/repository" ref="repo" value={this.state.input} onChange={this.handleChange}/>
                <span className="input-group-button">
                  <button className="btn">
                    <span className="octicon octicon-plus"></span>
                  </button>
                </span>
              </div>
              <dd className="error">Enter valid "username/repository" form</dd>
            </dl>
          </form>

          {repositories}
        </div>
      );
    }
  });
})();
