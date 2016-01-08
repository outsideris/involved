'use strict';

var ipcRenderer = require("electron").ipcRenderer,
    React = require('react');

var store = require('../store')

module.exports = React.createClass({
  handleSubmit: function() {
    if (this.state.key.trim()) {
      this.setState({disable: true});
      store.token = ipcRenderer.sendSync('github.token', this.state.key);
      ipcRenderer.send('github.me');
      this.props.processLogin();
    }
  },
  handleChange: function(event) {
    this.setState({
      key: event.target.value
    });
  },
  getInitialState: function () {
    return {key: '', disable: false};
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
              disabled={this.state.disable}
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
