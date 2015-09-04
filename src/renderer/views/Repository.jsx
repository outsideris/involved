var app = app || {};

(function() {
  'use strict';

  var TimelineList  = app.TimelineList,
      TimelineDetail = app.TimelineDetail;

  app.Repository = React.createClass({
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
        <div className="main-contents flex-container">
          <div id="repository" className="flex-container">
            <TimelineList list={this.state.data} onClick={this.handleClick} />
            <TimelineDetail item={this.state.item} />
          </div>
        </div>
      );
    }
  });
})();
