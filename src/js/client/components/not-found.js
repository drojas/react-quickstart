/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react');

var NotFoundHandler = React.createClass({

  render: function() {
    return (
      <p>Page not found</p>
    );
  }
});

module.exports = NotFoundHandler;
