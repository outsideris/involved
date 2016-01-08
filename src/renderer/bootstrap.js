'use strict';

require('babel-register');

window.$ = window.jQuery = require('jquery');
window.moment = require('moment');

var React = require('react');
var App = require('./renderer/app');

React.render(React.createElement(App), document.getElementById('content'));
