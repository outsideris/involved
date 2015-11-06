'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="one-half column centered">
        <h1>Manage Issues</h1>
        <div className="flash flash-with-icon">
          <span className="octicon octicon-alert"></span>
          Add issues that you want to track.
          You can see the issues in the issues menu.
          <br/>
          If you want to track https://github.com/atom/electron/issues/102, enter "atom/electron#102" in blow.
        </div>
        <form className="manage-form">
          <div className="input-group">
            <input type="text" placeholder="username/repository#issue-number"/>
            <span className="input-group-button">
              <button className="btn">
                <span className="octicon octicon-plus"></span>
              </button>
            </span>
          </div>
        </form>

        <ul className="table-list">
          <li className="table-list-item">
            <div className="table-list-cell"><strong>atom/electron</strong></div>
            <div className="table-list-cell">
              <button className="btn btn-sm btn-danger" type="button">
                <span className="octicon octicon-x"></span>
              </button>
            </div>
          </li>
          <li className="table-list-item">
            <div className="table-list-cell"><strong>atom/electron</strong></div>
            <div className="table-list-cell">
              <button className="btn btn-sm btn-danger" type="button">
                <span className="octicon octicon-x"></span>
              </button>
            </div>
          </li>
          <li className="table-list-item">
            <div className="table-list-cell"><strong>atom/electron</strong></div>
            <div className="table-list-cell">
              <button className="btn btn-sm btn-danger" type="button">
                <span className="octicon octicon-x"></span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    );
  }
});
