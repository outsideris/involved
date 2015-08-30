var app = app || {};

(function() {
  'use strict';

  app.Signin = React.createClass({
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
              >Save</button>
            </div>
            <div className="signin-guide">
              You can generate the access token under
              "Settings" &gt; "Personal access tokens"
            </div>
          </div>
      );
    }
  });
})();
