/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react');

var NotFoundHandler = React.createClass({displayName: 'NotFoundHandler',

  render: function() {
    return (
      React.DOM.p(null, "Page not found")
    );
  }
});

module.exports = NotFoundHandler;
