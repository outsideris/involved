var app = app || {};

(function() {
  'use strict';

  var Menus = React.createClass({
    ipc: require('ipc'),
    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      var self = this;
      this.ipc.send('github.me');
      this.ipc.on('github.me', function(profile) {
        self.setState({data:profile});
      });
    },
    render: function () {
      return (
        <div className="profile">
          <img src={this.state.data.avatar_url+'v=3&s=45'} className="avatar avatar-small me"/>
          <span>{this.state.data.login}</span>
        </div>
      );
    }
  });

  function render() {
    React.render(
      <Menus />,
      document.getElementById('menu')
    );
  }

  render();
})();
