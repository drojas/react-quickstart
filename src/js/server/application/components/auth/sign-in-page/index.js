/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react');
var AuthActions = require('../actions');

var SignInPage = React.createClass({displayName: 'SignInPage',

  render: function() {
    return (
      React.DOM.div({className: "SignInPage"}, 
        React.DOM.h1(null, "Sign In"), 
        React.DOM.input({type: "text", placeholder: "username", ref: "username"}), 
        React.DOM.input({type: "text", placeholder: "password", ref: "password"}), 
        React.DOM.input({type: "checkbox", label: "remember", ref: "remember"}), 
        React.DOM.input({type: "submit", onClick: this.handleSubmit})
      )
    );
  },

  handleSubmit: function() {
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var remember = this.refs.remember.getDOMNode().checked;
    AuthActions.signIn(username, password, remember);
  }
});

module.exports = SignInPage;
