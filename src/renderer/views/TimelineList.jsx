var app = app || {};

(function() {
  'use strict';

  var eventTypes = {};

  eventTypes.CreateEvent = React.createClass({
    handleClick: function() { this.props.onClick(this); },
    render: function() {
      return (
        <div className="timeline-cell flex-container flex-container-row" onClick={this.handleClick}>
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
  eventTypes.IssueCommentEvent = React.createClass({
    handleClick: function() { this.props.onClick(this); },
    render: function() {
      return (
        <div className="timeline-cell flex-container flex-container-row" onClick={this.handleClick}>
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
  eventTypes.PushEvent = React.createClass({
    handleClick: function() { this.props.onClick(this); },
    render: function() {
      var cmt = this.props.data.payload.size > 1 ? 'commits' : 'commit';
      return (
        <div className="timeline-cell flex-container flex-container-row" onClick={this.handleClick}>
          <div className="cell-type">
            <span className="octicon octicon-git-commit"></span>
          </div>
          <div className="cell-body">
            <time>{moment(this.props.data.created_at).fromNow()}</time>
            <div className="repo">{this.props.data.repo.name}</div>
            <img src={this.props.data.actor.avatar_url+'v=3&s=40'} className="avatar avatar-small" />
            <a href={this.props.data.actor.url} className="username">{this.props.data.actor.login}</a>
            <span>
              pushed {this.props.data.payload.size} <span>{cmt}</span> to
              {this.props.data.payload.ref.replace('refs/heads/', '')}
            </span>
          </div>
        </div>
      );
    }
  });
  eventTypes.PullRequestEvent = React.createClass({
    handleClick: function() { this.props.onClick(this); },
    render: function() {
      var action = this.props.data.payload.pull_request.merged ? 'merged' : this.props.data.payload.action;
      return (
        <div className="timeline-cell flex-container flex-container-row" onClick={this.handleClick}>
          <div className="cell-type">
            <span className="octicon octicon-git-pull-request"></span>
          </div>
          <div className="cell-body">
            <time>{moment(this.props.data.created_at).fromNow()}</time>
            <div className="repo">{this.props.data.repo.name}</div>
            <img src={this.props.data.actor.avatar_url+'v=3&s=40'} className="avatar avatar-small" />
            <a href={this.props.data.actor.url} className="username">{this.props.data.actor.login}</a>
            <span>
              <span>{action}</span> pull request #{this.props.data.payload.pull_request.number}
              <div className="title">"{this.props.data.payload.pull_request.title}"</div>
            </span>
          </div>
        </div>
      );
    }
  });
  eventTypes.PullRequestReviewCommentEvent = React.createClass({
    handleClick: function() { this.props.onClick(this); },
    render: function() {
      return (
        <div className="timeline-cell flex-container flex-container-row" onClick={this.handleClick}>
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
  eventTypes.CommitCommentEvent = React.createClass({
    handleClick: function() { this.props.onClick(this); },
    render: function() {
      return (
        <div className="timeline-cell flex-container flex-container-row" onClick={this.handleClick}>
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
  eventTypes.ReleaseEvent = React.createClass({
    handleClick: function() { this.props.onClick(this); },
    render: function() {
      var rName = this.props.data.payload.release.name ?
                  <div className="title">{this.props.data.payload.release.name}</div> : '';
      return (
        <div className="timeline-cell flex-container flex-container-row" onClick={this.handleClick}>
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
  eventTypes.DeleteEvent = React.createClass({
    handleClick: function() { this.props.onClick(this); },
    render: function() {
      return (
        <div className="timeline-cell flex-container flex-container-row" onClick={this.handleClick}>
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
  eventTypes.IssuesEvent = React.createClass({
    handleClick: function() { this.props.onClick(this); },
    render: function() {
      return (
        <div className="timeline-cell flex-container flex-container-row" onClick={this.handleClick}>
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

  app.TimelineList = React.createClass({
    handleClick: function(comp) { this.props.onClick(comp); },
    render: function() {
      var self = this;
      var events = this.props.list.map(function(event) {
        var T = eventTypes[event.type];
        return (
          <T data={event} onClick={self.handleClick} />
        );
      });
      return (
        <div className="timeline">
          {events}
        </div>
      );
    }
  });
})();
