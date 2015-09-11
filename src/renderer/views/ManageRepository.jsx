var app = app || {};

(function() {
  'use strict';

  app.ManageRepository = React.createClass({
    render: function () {
      return (
        <div className="one-half column centered">
          <h1>Manage Repositories</h1>
          <div className="flash flash-with-icon">
            <span className="octicon octicon-alert"></span>
            Add repositories that you want to track.
            You can see their timeline in the timeline menu.
            <br/>
            If you want to track https://github.com/atom/electron, enter "atom/electron" in blow.
          </div>
          <form className="manage-form">
            <div className="input-group">
              <input type="text" placeholder="username/repository"/>
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
})();
