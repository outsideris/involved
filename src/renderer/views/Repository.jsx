var app = app || {};

(function() {
  'use strict';

  var MarkdownParser = function() {
    var markdown = window.markdownit();
    this.render = function(text) {
      if (text && text.trim() !== '') {
        return markdown.render(text);
      } else {
        return '<p className="text-muted">No description provided.</p>';
      }
    };
  };

  // timeline events
  var CreateEvent = React.createClass({
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
  var IssueCommentEvent = React.createClass({
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
  var PushEvent = React.createClass({
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
              pushed {this.props.data.payload.size} <span>{cmt}</span>
              to {this.props.data.payload.ref.replace('refs/heads/', '')}
            </span>
          </div>
        </div>
      );
    }
  });
  var PullRequestEvent = React.createClass({
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
  var CommitCommentEvent = React.createClass({
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
  var ReleaseEvent = React.createClass({
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
  var DeleteEvent = React.createClass({
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
  var IssuesEvent = React.createClass({
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

  var TimelineList = React.createClass({
    handleClick: function(comp) { this.props.onClick(comp); },
    //events: {
    //  IssuesEvent: <IssuesEvent data={event} onClick={self.handleClick} />,
    //  CreateEvent: <CreateEvent data={event} onClick={self.handleClick} />,
    //  IssueCommentEvent: <IssueCommentEvent data={event} onClick={self.handleClick} />,
    //  PushEvent: <PushEvent data={event} onClick={self.handleClick} />,
    //  PullRequestEvent: <PullRequestEvent data={event} onClick={self.handleClick} />,
    //  PullRequestReviewCommentEvent: <PullRequestReviewCommentEvent data={event} onClick={self.handleClick} />,
    //  CommitCommentEvent: <CommitCommentEvent data={event} onClick={self.handleClick} />,
    //  ReleaseEvent: <ReleaseEvent data={event} onClick={self.handleClick} />,
    //  DeleteEvent: <DeleteEvent data={event} onClick={self.handleClick} />,
    //},
    render: function() {
      var self = this;
      var events = this.props.list.map(function(event) {
        //var node = self.events[event.type];
        var node;
        if (event.type === 'IssuesEvent') {
          node = <IssuesEvent data={event} onClick={self.handleClick} />;
        } else if (event.type === 'CreateEvent') {
          node = <CreateEvent data={event} onClick={self.handleClick} />;
        } else if (event.type === 'IssueCommentEvent') {
          node = <IssueCommentEvent data={event} onClick={self.handleClick} />;
        } else if (event.type === 'PushEvent') {
          node = <PushEvent data={event} onClick={self.handleClick} />;
        } else if (event.type === 'PullRequestEvent') {
          node = <PullRequestEvent data={event} onClick={self.handleClick} />;
        } else if (event.type === 'PullRequestReviewCommentEvent') {
          node = <PullRequestReviewCommentEvent data={event} onClick={self.handleClick} />;
        } else if (event.type === 'CommitCommentEvent') {
          node = <CommitCommentEvent data={event} onClick={self.handleClick} />;
        } else if (event.type === 'ReleaseEvent') {
          node = <ReleaseEvent data={event} onClick={self.handleClick} />;
        } else if (event.type === 'DeleteEvent') {
          node = <DeleteEvent data={event} onClick={self.handleClick} />;
        } else if (event.type === 'IssuesEvent') {
          node = <IssuesEvent data={event} onClick={self.handleClick} />;
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

  // event detail
  var IssueEventDetail = React.createClass({
    componentWillMount: function () {
      this.md = new MarkdownParser();
    },
    render: function() {
      return (
        <div>
          <div className="d-head">
            <h2 className="d-repo"><span className="mega-octicon octicon-repo"></span>{this.props.data.repo.name}</h2>
            <h1>{this.props.data.payload.issue.title} <span className="issue-num">#{this.props.data.payload.issue.number}</span></h1>
            <div>
              <span className={'state state-' + this.props.data.payload.issue.state}>{this.props.data.payload.issue.state} </span>
              <span className="author">{this.props.data.payload.issue.user.login}</span>
              <span className="meta">
                opened this issue {moment(this.props.data.payload.issue.created_at).fromNow()} - {this.props.data.payload.issue.comments} comments
              </span>
            </div>
          </div>
          <div className="d-body">
            <div className="comment">
              <img src={this.props.data.payload.issue.user.avatar_url+'v=3&s=45'} className="avatar avatar-small" />
              <div className="comment-head">
                <span className="author">{this.props.data.payload.issue.user.login}</span>
                <span className="meta"> commented {moment(this.props.data.payload.issue.created_at).fromNow()}</span>
              </div>
              <div className="comment-body markdown-body" dangerouslySetInnerHTML={{__html: this.md.render(this.props.data.payload.issue.body)}}></div>
            </div>
          </div>
        </div>
      );
    }
  });
  var IssueCommentEventDetail = React.createClass({
    componentWillMount: function () {
      this.md = new MarkdownParser();
    },
    render: function() {
      return (
        <div>
          <div className="d-head">
            <h2 className="d-repo"><span className="mega-octicon octicon-repo"></span>{this.props.data.repo.name}</h2>
            <h1>{this.props.data.payload.issue.title} <span className="issue-num">#{this.props.data.payload.issue.number}</span></h1>
            <div>
              <span className={'state state-'+this.props.data.payload.issue.state}>{this.props.data.payload.issue.state}</span>
              <span className="author">{this.props.data.payload.issue.user.login}</span>
              <span className="meta">
                opened this issue {moment(this.props.data.payload.issue.created_at).fromNow()} - {this.props.data.payload.issue.comments} comments
              </span>
            </div>
          </div>
          <div className="d-body">
            <div className="comment">
              <img src={this.props.data.payload.issue.user.avatar_url+'v=3&s=45'} className="avatar avatar-small" />
              <div className="comment-head">
                <span className="author">{this.props.data.payload.issue.user.login}</span>
                <span className="meta"> commented {moment(this.props.data.payload.issue.created_at).fromNow()}</span>
              </div>
              <div className="comment-body markdown-body" dangerouslySetInnerHTML={{__html: this.md.render(this.props.data.payload.issue.body)}}></div>
            </div>

            <span className="hidden-text-expander expander"><a href="#">&hellip;</a></span>

            <div className="comment">
              <img src={this.props.data.payload.comment.user.avatar_url+'v=3&s=45'} className="avatar avatar-small" />
              <div className="comment-head">
                <span className="author">{this.props.data.payload.comment.user.login}</span>
                <span className="meta"> commented {moment(this.props.data.payload.comment.created_at).fromNow()}</span>
              </div>
              <div className="comment-body markdown-body" dangerouslySetInnerHTML={{__html: this.md.render(this.props.data.payload.comment.body)}}></div>
            </div>
          </div>
        </div>
      );
    }
  });
  var PullRequestEventDetail = React.createClass({
    componentWillMount: function () {
      this.md = new MarkdownParser();
    },
    render: function() {
      var mergedTime = this.props.data.payload.pull_request.state === 'merged' ?
                       <span>moment(this.props.data.payload.pull_request.created_at).fromNow()</span> : '';
      return (
        <div>
          <div className="d-head">
            <h2 className="d-repo"><span className="mega-octicon octicon-repo"></span>{this.props.data.repo.name}</h2>
            <h1>{this.props.data.payload.pull_request.title} <span className="issue-num">#{this.props.data.payload.pull_request.number}</span></h1>
            <div>
              <span className={'state state-'+this.props.data.payload.pull_request.state}>{this.props.data.payload.pull_request.state}</span>
              <span className="author">{this.props.data.payload.pull_request.user.login}</span>
              <span className="meta">
                wants to merge commits into
                <span className="commit-ref">{this.props.data.payload.pull_request.base.label}</span>
                from
                <span className="commit-ref">{this.props.data.payload.pull_request.head.label}</span>
                {mergedTime}
              </span>
            </div>
          </div>
          <div className="d-body">
            <div className="comment">
              <img src={this.props.data.payload.pull_request.user.avatar_url+'v=3&s=45'} className="avatar avatar-small" />
              <div className="comment-head">
                <span className="author">{this.props.data.payload.pull_request.user.login}</span>
                <span className="meta"> commented {moment(this.props.data.payload.pull_request.created_at).fromNow()}</span>
              </div>
              <div className="comment-body markdown-body" dangerouslySetInnerHTML={{__html: this.md.render(this.props.data.payload.comment.body)}}></div>
            </div>
          </div>
        </div>
      );
    }
  });
  var PullRequestReviewCommentEventDetail = React.createClass({
    componentWillMount: function () {
      this.md = new MarkdownParser();
    },
    render: function() {
      var mergedTime = this.props.data.payload.pull_request.state === 'merged' ?
                       <span>moment(this.props.data.payload.pull_request.created_at).fromNow()</span> : '';
      return (
        <div>
          <div className="d-head">
            <h2 className="d-repo"><span className="mega-octicon octicon-repo"></span>{this.props.data.repo.name}</h2>
            <h1>{this.props.data.payload.pull_request.title} <span className="issue-num">#{this.props.data.payload.pull_request.number}</span></h1>
            <div>
              <span className={'state state-'+this.props.data.payload.pull_request.state}>{this.props.data.payload.pull_request.state}</span>
              <span className="author">{this.props.data.payload.pull_request.user.login}</span>
              <span className="meta">
                wants to merge commits into
                <span className="commit-ref">{this.props.data.payload.pull_request.base.label}</span>
                from
                <span className="commit-ref">{this.props.data.payload.pull_request.head.label}</span>
                {mergedTime}
              </span>
            </div>
          </div>
          <div className="d-body">
            <div className="comment">
              <img src={this.props.data.payload.pull_request.user.avatar_url+'v=3&s=45'} className="avatar avatar-small" />
              <div className="comment-head">
                <span className="author">{this.props.data.payload.pull_request.user.login}</span>
                <span className="meta"> commented {moment(this.props.data.payload.pull_request.created_at).fromNow()}</span>
              </div>
              <div className="comment-body markdown-body" dangerouslySetInnerHTML={{__html: this.md.render(this.props.data.payload.pull_request.body)}}></div>
            </div>
            <span className="hidden-text-expander expander"><a href="#">&hellip;</a></span>
            <div className="comment">
              <img src={this.props.data.payload.comment.user.avatar_url+'v=3&s=45'} className="avatar avatar-small" />
              <div className="comment-head">
                <span className="author">{this.props.data.payload.comment.user.login}</span>
                <span className="meta"> commented {moment(this.props.data.payload.comment.created_at).fromNow()}</span>
              </div>
              <div className="comment-body markdown-body" dangerouslySetInnerHTML={{__html: this.md.render(this.props.data.payload.comment.body)}}></div>
            </div>
          </div>
        </div>
      );
    }
  });

  var TimelineDetail = React.createClass({
    render: function() {
      console.log(this.props)
      var node;
      if (this.props.item && this.props.item.type === 'IssuesEvent') {
        node = <IssueEventDetail data={this.props.item} onClick={self.handleClick} />;
      } else if (this.props.item && this.props.item.type === 'IssueCommentEvent') {
        node = <IssueCommentEventDetail data={this.props.item} onClick={self.handleClick} />;
      } else if (this.props.item && this.props.item.type === 'PullRequestEvent') {
        node = <PullRequestEventDetail data={this.props.item} onClick={self.handleClick} />;
      } else if (this.props.item && this.props.item.type === 'PullRequestReviewCommentEvent') {
        node = <PullRequestReviewCommentEventDetail data={this.props.item} onClick={self.handleClick} />;
      } else {
        node = <div className="detail"></div>;
      }

      return (
        <div className="detail">
          {node}
        </div>
      )
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
    handleClick: function(comp) {
      this.setState({item: comp.props.data});
    },
    render: function () {
      return (
        <div id="repository" className="flex-container">
          <TimelineList list={this.state.data} onClick={this.handleClick} />
          <TimelineDetail item={this.state.item} />
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
