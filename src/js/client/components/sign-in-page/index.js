/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react');
var ReactRouter   = require('react-router-component');
var SignInActions = require('./actions');
var SignInStore   = require('./store');
var Link          = ReactRouter.Link;

var SignInPage = React.createClass({

  render: function() {
    return (
      <div className="SignInPage">
        <h1>Sign In</h1>
        <input type="text" placeholder="username" ref="username" />
        <input type="text" placeholder="password" ref="password" />
        <input type="checkbox" label="remember" ref="remember" />
        <input type="submit" onClick={this.handleSubmit} />
      </div>
    );
  },

  handleSubmit: function() {
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var remember = this.refs.remember.getDOMNode().checked;
    SignInActions.signIn(username, password, remember);
  }
});

module.exports = SignInPage;
