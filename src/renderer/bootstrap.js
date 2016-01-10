'use strict';

require('babel-register');

window.$ = window.jQuery = require('jquery');
window.moment = require('moment');

var React = require('react'),
    ReactDOM = require('react-dom');
var App = require('./renderer/app');

ReactDOM.render(React.createElement(App), document.getElementById('content'));
