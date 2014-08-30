'use strict';

var App = require('./components/app');

module.exports = App;

if (typeof window !== 'undefined') {
  var React = window.React = require('react');
  window.onload = function() {
    React.renderComponent(App(), document);
  }
}
