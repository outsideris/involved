'use strict';

var ipcRenderer = require("electron").ipcRenderer,
    React = require('react');

var store = require('../store')

module.exports = React.createClass({
  componentWillMount: function () {
    var self = this;
    ipcRenderer.on('github.me', function(event, profile) {
      self.props.onLogin(profile);
    });
  },
  handleSubmit: function() {
    if (this.state.key.trim()) {
      store.token = ipcRenderer.sendSync('github.token', this.state.key);
      ipcRenderer.send('github.me');
    }
  },
  handleChange: function(event) {
    this.setState({
      key: event.target.value
    });
  },
  getInitialState: function () {
    return {key: ''};
  },
  render: function () {
    return (
        <div className="one-half column centered signin">
          <h1>Enter your github access Token</h1>
          <dl className="form">
            <dt><label>Access Token</label></dt>
            <dd>
              <input
                type="text"
                className="input-block"
                placeholder="Enter your access Token"
                value={this.state.key}
                onChange={this.handleChange}
              />
            </dd>
          </dl>
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >Save</button>
          </div>
          <div className="guide">
            You can generate the access token under
            "Settings" &gt; "Personal access tokens"
          </div>
        </div>
    );
  }
});
