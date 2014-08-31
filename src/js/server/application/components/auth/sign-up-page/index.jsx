/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react');
var AuthActions = require('../actions');

var SignUpPage = React.createClass({

  render: function() {
    return (
      <div className="SignUpPage">
        <h1>Sign Up</h1>
        <input type="text" placeholder="username" ref="username" />
        <input type="text" placeholder="password" ref="password" />
        <input type="text" placeholder="password confirmation" ref="confirmation" />
        <input type="submit" onClick={this.handleSubmit} />
      </div>
    );
  },

  handleSubmit: function() {
    var username     = this.refs.username.getDOMNode().value;
    var password     = this.refs.password.getDOMNode().value;
    var confirmation = this.refs.confirmation.getDOMNode().checked;
    AuthActions.signUp(username, password, confirmation);
  }
});

module.exports = SignUpPage;
