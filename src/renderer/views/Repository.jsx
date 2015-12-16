'use strict';

var ipcRenderer = require("electron").ipcRenderer,
    React = require('react');

var TimelineList  =  require('./TimelineList'),
    TimelineDetail = require('./TimelineDetail');

module.exports = React.createClass({
  lastId: null,
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function() {
    var self = this;
    ipcRenderer.send('repo.timeline', this.props.since);
    ipcRenderer.on('repo.timeline', function(event, list) {
      this.lastId = list[list.length-1].id;
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
