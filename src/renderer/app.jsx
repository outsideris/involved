var app = app || {};

(function() {
  'use strict';

  var Signin = app.Signin,
      Menus = app.Menus;

  var App = React.createClass({
    handleLogin: function(profile) {
      this.setState({user: profile});
    },
    getInitialState: function() {
      return {user: {}};
    },
    render: function () {
      var content;
      if (!this.state.user.login) {
        content = (
          <Signin onLogin={this.handleLogin} />
        );
      } else {
        content = (
          <div className="body flex-container flex-container-row">
            <Menus />
            <div className="main-contents flex-container"></div>
          </div>
        );
      }
      return (
        <div>
          {content}
        </div>
      );
    }
  });

  function render() {
    React.render(
      <App />,
      document.getElementById('content')
    );
  }

  render();
})();

