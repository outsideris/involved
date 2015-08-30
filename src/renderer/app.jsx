var app = app || {};

(function() {
  'use strict';

  var Signin = app.Signin,
      Menus = app.Menus;

  var App = React.createClass({
    getInitialState: function() {
      return {user: {}};
    },
    render: function () {
      var content;
      if (!this.state.user.login) {
        content = (
          <Signin/>
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

