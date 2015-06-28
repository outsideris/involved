var app = app || {};

(function() {
  'use strict';

  // timeline events
  var CreateEvent = React.createClass({
    render: function() {
      return (
        <div className="timeline-cell flex-container flex-container-row">
          <div className="cell-type">
            <span className="octicon octicon-git-branch"></span>
          </div>
          <div className="cell-body">
            <time>{moment(this.props.data.created_at).fromNow()}</time>
            <div className="repo">{this.props.data.repo.name}</div>
            <img src={this.props.data.actor.avatar_url+'v=3&s=40'} className="avatar avatar-small" />
            <a href={this.props.data.actor.url} className="username">{this.props.data.actor.login}</a>
            <span>
              created {this.props.data.payload.ref_type}
              <div className="title">"{this.props.data.payload.ref}"</div>
            </span>
          </div>
        </div>
      );
    }
  });
  var IssueCommentEvent = React.createClass({
    render: function() {
      return (
        <div className="timeline-cell flex-container flex-container-row">
          <div className="cell-type">
            <span className="octicon octicon-comment-discussion"></span>
          </div>
          <div className="cell-body">
            <time>{moment(this.props.data.created_at).fromNow()}</time>
            <div className="repo">{this.props.data.repo.name}</div>
            <img src={this.props.data.actor.avatar_url+'v=3&s=40'} className="avatar avatar-small" />
            <a href={this.props.data.actor.url} className="username">{this.props.data.actor.login}</a>
            <span>
              commented on issue #{this.props.data.payload.issue.number}
              <div className="title">"{this.props.data.payload.issue.title}"</div>
            </span>
          </div>
        </div>
      );
    }
  });
  var PushEvent = React.createClass({
    render: function() {
      var cmt = this.props.data.payload.size > 1 ? 'commits' : 'commit';
      return (
        <div className="timeline-cell flex-container flex-container-row">
          <div className="cell-type">
            <span className="octicon octicon-git-commit"></span>
          </div>
          <div className="cell-body">
            <time>{moment(this.props.data.created_at).fromNow()}</time>
            <div className="repo">{this.props.data.repo.name}</div>
            <img src={this.props.data.actor.avatar_url+'v=3&s=40'} className="avatar avatar-small" />
            <a href={this.props.data.actor.url} className="username">{this.props.data.actor.login}</a>
            <span>
              pushed {this.props.data.payload.size} <span>{cmt}</span>
              to {this.props.data.payload.ref.replace('refs/heads/', '')}
            </span>
          </div>
        </div>
      );
    }
  });
  var PullRequestEvent = React.createClass({
    render: function() {
      var action = this.props.data.payload.pull_request.merged ? 'merged' : this.props.data.payload.action;
      return (
        <div className="timeline-cell flex-container flex-container-row">
          <div className="cell-type">
            <span className="octicon octicon-git-pull-request"></span>
          </div>
          <div className="cell-body">
            <time>{moment(this.props.data.created_at).fromNow()}</time>
            <div className="repo">{this.props.data.repo.name}</div>
            <img src={this.props.data.actor.avatar_url+'v=3&s=40'} className="avatar avatar-small" />
            <a href={this.props.data.actor.url} className="username">{this.props.data.actor.login}</a>
            <span>
              <span>{action}</span>
              pull request #{this.props.data.payload.pull_request.number}
              <div className="title">"{this.props.data.payload.pull_request.title}"</div>
            </span>
          </div>
        </div>
      );
    }
  });
  var PullRequestReviewCommentEvent = React.createClass({
    render: function() {
      return (
        <div className="timeline-cell flex-container flex-container-row">
          <div className="cell-type">
            <span className="octicon octicon-comment-discussion"></span>
          </div>
          <div className="cell-body">
            <time>{moment(this.props.data.created_at).fromNow()}</time>
            <div className="repo">{this.props.data.repo.name}</div>
            <img src={this.props.data.actor.avatar_url+'v=3&s=40'} className="avatar avatar-small" />
            <a href={this.props.data.actor.url} className="username">{this.props.data.actor.login}</a>
            <span>
              commented on pull request
              #{this.props.data.payload.pull_request.number}
              <div className="title">"{this.props.data.payload.pull_request.title}"</div>
            </span>
          </div>
        </div>
      );
    }
  });
  var CommitCommentEvent = React.createClass({
    render: function() {
      return (
        <div className="timeline-cell flex-container flex-container-row">
          <div className="cell-type">
            <span className="octicon octicon-comment-discussion"></span>
          </div>
          <div className="cell-body">
            <time>{moment(this.props.data.created_at).fromNow()}</time>
            <div className="repo">{this.props.data.repo.name}</div>
            <img src={this.props.data.actor.avatar_url+'v=3&s=40'} className="avatar avatar-small" />
            <a href={this.props.data.actor.url} className="username">{this.props.data.actor.login}</a>
            <span>
              commented on commit
              @{this.props.data.payload.comment.commit_id.substr(0, 7)}
            </span>
          </div>
        </div>
      );
    }
  });
  var ReleaseEvent = React.createClass({
    render: function() {
      var rName = this.props.data.payload.release.name ?
                  <div className="title">{this.props.data.payload.release.name}</div> : '';
      return (
        <div className="timeline-cell flex-container flex-container-row">
          <div className="cell-type">
            <span className="octicon octicon-tag"></span>
          </div>
          <div className="cell-body">
            <time>{moment(this.props.data.created_at).fromNow()}</time>
            <div className="repo">{this.props.data.repo.name}</div>
            <img src={this.props.data.actor.avatar_url+'v=3&s=40'} className="avatar avatar-small" />
            <a href={this.props.data.actor.url} className="username">{this.props.data.actor.login}</a>
            <span>
              {this.props.data.payload.action} {this.props.data.payload.release.tag_name} {rName}
            </span>
          </div>
        </div>
      );
    }
  });
  var DeleteEvent = React.createClass({
    render: function() {
      return (
        <div className="timeline-cell flex-container flex-container-row">
          <div className="cell-type">
            <span className="octicon octicon-trashcan"></span>
          </div>
          <div className="cell-body">
            <time>{moment(this.props.data.created_at).fromNow()}</time>
            <div className="repo">{this.props.data.repo.name}</div>
            <img src={this.props.data.actor.avatar_url+'v=3&s=40'} className="avatar avatar-small" />
            <a href={this.props.data.actor.url} className="username">{this.props.data.actor.login}</a>
            <span>
              deleted {this.props.data.payload.ref_type} {this.props.data.payload.ref}
            </span>
          </div>
        </div>
      );
    }
  });
  var IssuesEvent = React.createClass({
    render: function() {
      return (
        <div className="timeline-cell flex-container flex-container-row">
          <div className="cell-type">
            <span className="octicon octicon-issue-opened"></span>
          </div>
          <div className="cell-body">
            <time>{moment(this.props.data.created_at).fromNow()}</time>
            <div className="repo">{this.props.data.repo.name}</div>
            <img src={this.props.data.actor.avatar_url+'v=3&s=40'} className="avatar avatar-small" />
            <a href={this.props.data.actor.url} className="username">{this.props.data.actor.login}</a>
            <span>
              {this.props.data.payload.action} issue #{this.props.data.payload.issue.number}
              <div className="title">"{this.props.data.payload.issue.title}"</div>
            </span>
          </div>
        </div>
      );
    }
  });

  var TimelineList = React.createClass({
    render: function() {
      var events = this.props.data.map(function(event) {
        var node;
        if (event.type === 'IssuesEvent') {
          node = <IssuesEvent data={event} />;
        } else if (event.type === 'CreateEvent') {
          node = <CreateEvent data={event} />;
        } else if (event.type === 'IssueCommentEvent') {
          node = <IssueCommentEvent data={event} />;
        } else if (event.type === 'PushEvent') {
          node = <PushEvent data={event} />;
        } else if (event.type === 'PullRequestEvent') {
          node = <PullRequestEvent data={event} />;
        } else if (event.type === 'PullRequestReviewCommentEvent') {
          node = <PullRequestReviewCommentEvent data={event} />;
        } else if (event.type === 'CommitCommentEvent') {
          node = <CommitCommentEvent data={event} />;
        } else if (event.type === 'ReleaseEvent') {
          node = <ReleaseEvent data={event} />;
        } else if (event.type === 'DeleteEvent') {
          node = <DeleteEvent data={event} />;
        } else if (event.type === 'IssuesEvent') {
          node = <IssuesEvent data={event} />;
        }

        return (
          {node}
        );
      });
      return (
        <div className="timeline">
          {events}
        </div>
      );
    }
  });

  var Repository = React.createClass({
    ipc: require('ipc'),
    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      var self = this;
      this.ipc.send('repo.timeline', this.props.since);
      this.ipc.on('repo.timeline', function(list) {
        self.setState({data: list});
      });
    },
    render: function () {
      return (
        <div id="repository">
          <TimelineList data={this.state.data} />
        </div>
      );
    }
  });

  function render() {
    React.render(
      <Repository since={0} />,
      document.getElementById('content')
    );
  }

  render();
})();
