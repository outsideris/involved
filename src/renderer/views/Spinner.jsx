'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
        <div className="spinner-wrap">
          <div className="spinner">
            <div className="dot1"></div>
            <div className="dot2"></div>
          </div>
        </div>
    );
  }
});
