var app = app || {};

(function() {
  'use strict';

  var MarkdownParser = function() {
    var markdown = window.markdownit(),
        ipc = require('ipc');
    ipc.send('github.emojis');
    ipc.on('github.emojis', function(emojis) {
      if (!markdown.renderer.rules.emoji) { markdown.use(window.markdownitEmoji);  }
      markdown.renderer.rules.emoji = function(token, idx) {
        var code = token[idx].markup;
        return '<img title=":'+code+':" alt=":'+code+':" src="'+emojis[code]+'" class="emoji">';
      };
    });

    this.render = function(text) {
      if (text && text.trim() !== '') {
        return markdown.render(text);
      } else {
        return '<p className="text-muted">No description provided.</p>';
      }
    };
  };

  var eventTypes = {};

  eventTypes.IssuesEventDetail = React.createClass({
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
  eventTypes.IssueCommentEventDetail = React.createClass({
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
  eventTypes.PullRequestEventDetail = React.createClass({
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
          </div>
        </div>
      );
    }
  });
  eventTypes.PullRequestReviewCommentEventDetail = React.createClass({
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

  eventTypes.PushEventDetail = React.createClass({
    componentWillMount: function() {
      this.md = new MarkdownParser();
    },
    render: function() {
      var data = this.props.data;
      // TODO: fetch commit info via api
      var commits = this.props.data.payload.commits.map(function(c) {
        return (
          <div className="commit-header">
            <h2>{c.message}</h2>
            <span className="octicon octicon-git-branch"></span> {data.payload.ref.replace('refs/heads/', '')}
            <div className="commit-body">
              <img src={data.actor.avatar_url+'v=3&s=45'} className="avatar avatar-small" />
              {data.actor.login}
              <span className="meta"> authored {moment(data.created_at).fromNow()}</span>
            </div>
          </div>
        );
      }).reverse();

      return (
        <div>
          <div className="d-head">
            <h2 className="d-repo"><span className="mega-octicon octicon-repo"></span>{this.props.data.repo.name}</h2>
          </div>
          {commits}
        </div>
      );
    }
  });

  app.TimelineDetail = React.createClass({
    render: function() {
      var node;
      if (this.props.item) {
        var T = eventTypes[this.props.item.type + 'Detail'];
        node = <T data={this.props.item} />;
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
})();
