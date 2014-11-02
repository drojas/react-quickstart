/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react');
var ReactAsync  = require('react-async');
var superagent  = require('superagent');
var ReactRouter = require('react-router-component');
var Link        = ReactRouter.Link;

var UserPage = React.createClass({
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
    UserPage.getUserInfo(this.props.username, cb);
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.username !== nextProps.username) {
      UserPage.getUserInfo(nextProps.username, function(err, info) {
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
      <div className="UserPage">
        <h1>Hello, {this.state.name}!</h1>
        <p>
          Go to <Link href={"/users/" + otherUser}>/users/{otherUser}</Link>
        </p>
        <p><Link href="/">Logout</Link></p>
      </div>
    );
  }
});

module.exports = UserPage;
