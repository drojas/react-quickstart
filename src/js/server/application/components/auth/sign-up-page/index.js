/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react');
var AuthActions = require('../actions');

var SignUpPage = React.createClass({displayName: 'SignUpPage',

  render: function() {
    return (
      React.DOM.div({className: "SignUpPage"}, 
        React.DOM.h1(null, "Sign Up"), 
        React.DOM.input({type: "text", placeholder: "username", ref: "username"}), 
        React.DOM.input({type: "text", placeholder: "password", ref: "password"}), 
        React.DOM.input({type: "text", placeholder: "password confirmation", ref: "confirmation"}), 
        React.DOM.input({type: "submit", onClick: this.handleSubmit})
      )
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
