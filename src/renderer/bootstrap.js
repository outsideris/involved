'use strict';

window.$ = window.jQuery = require('jquery');
window.moment = require('moment');

var React = require('react');
var App = require('./static/js/app'),
    Titlebar = require('./static/js/views/Titlebar');

React.render(React.createElement(App), document.getElementById('content'));
React.render(React.createElement(Titlebar), document.getElementById('titlebar'));
