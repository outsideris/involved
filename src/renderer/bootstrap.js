'use strict';

require("babel-register");

window.$ = window.jQuery = require('jquery');
window.moment = require('moment');

var React = require('react');
var App = require('./renderer/app'),
    Titlebar = require('./renderer/views/Titlebar');

React.render(React.createElement(App), document.getElementById('content'));
React.render(React.createElement(Titlebar), document.getElementById('titlebar'));
