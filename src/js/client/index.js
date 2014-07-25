'use strict';

// backbone <- jquery
require('backbone').$ = require('jquery');

var App = require('./components/app');

module.exports = App;

if (typeof window !== 'undefined') {
  var React = require('react');
  window.onload = function() {
    React.renderComponent(App(), document);
  }
}
