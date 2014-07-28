/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react');
var ReactAsync  = require('react-async');
var superagent  = require('superagent');
var ReactRouter = require('react-router-component');
var Link        = ReactRouter.Link;

var UserPage = React.createClass({displayName: 'UserPage',
  mixins: [ReactAsync.Mixin],

  statics: {
    getUserInfo: function(username, cb) {
      superagent.get(
        'http://localhost:3000/api/users/' + username,
        function(err, res) {
          cb(err, res ? res.body : null);
        });
    }
  },

  getInitialStateAsync: function(cb) {
    this.type.getUserInfo(this.props.username, cb);
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.username !== nextProps.username) {
      this.type.getUserInfo(nextProps.username, function(err, info) {
        if (err) {
          throw err;
        }
        this.setState(info);
      }.bind(this));
    }
  },

  render: function() {
    var otherUser = this.props.username === 'doe' ? 'ivan' : 'doe';
    return (
      React.DOM.div({className: "UserPage"}, 
        React.DOM.h1(null, "Hello, ", this.state.name, "!"), 
        React.DOM.p(null, 
          "Go to ", Link({href: "/users/" + otherUser}, "/users/", otherUser)
        ), 
        React.DOM.p(null, Link({href: "/"}, "Logout"))
      )
    );
  }
});

module.exports = UserPage;
