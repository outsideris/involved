var app = app || {};

(function() {
  'use strict';

  var React = require('react');

  var TimelineList  = app.TimelineList,
      TimelineDetail = app.TimelineDetail;

  app.Repository = React.createClass({
    ipc: require('ipc'),
    getInitialState: function() {
      return {data: []};
    },
    componentWillMount: function() {
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
      if (this.state.data.length) {
        return (
          <div className="main-contents flex-container">
            <div id="repository" className="flex-container">
              <TimelineList list={this.state.data} onClick={this.handleClick} />
              <TimelineDetail item={this.state.item} />
            </div>
          </div>
        );
      } else {
        return (
          <div className="main-contents flex-container">
            <div className="one-half column centered">
              <div className="blankslate body-blank">
                <h3>There is no repository that is tracked.</h3>
                <p>You can add repositories you want to track in a "manage repository" menu in top right.</p>
              </div>
            </div>
          </div>
        );
      }
    }
  });
})();
