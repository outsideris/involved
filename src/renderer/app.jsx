var app = app || {};

(function() {
  'use strict';

  var Signin = app.Signin,
      Menus = app.Menus,
      Repository = app.Repository;

  var App = React.createClass({
    ipc: require('ipc'),
    handleLogin: function(profile) {
      this.setState({user: profile});
    },
    handleSelect: function(mode) {
      this.setState({mode: mode});
    },
    componentWillMount: function () {
      var self = this;
      this.ipc.send('github.me');
      this.ipc.on('github.me', function(profile) {
        self.setState({user: profile});
      });
    },
    getInitialState: function() {
      app.token = this.ipc.sendSync('github.token');
      console.log(app.token)
      return {user: {}};
    },
    render: function () {
      if (!this.state.user.login) {
        return (
          <Signin onLogin={this.handleLogin} />
        );
      } else {
        var mode;
        if (this.state.mode === 'repo') {
          mode = <Repository />
        } else if (this.state.mode === 'issue') {
          mode = <div className="main-contents flex-container"></div>
        }
        return (
          <div className="flex-container flex-container-row">
            <Menus onSelect={this.handleSelect} mode={this.state.mode} />
            {mode}
          </div>
        );
      }
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

