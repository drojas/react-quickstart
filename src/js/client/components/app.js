/**
 * @jsx React.DOM
 */
'use strict';

var React           = require('react');
var ReactRouter     = require('react-router-component');
var MainPage        = require('./main-page');
var UserPage        = require('./user-page');
var SignInPage      = require('./sign-in-page');
var NotFoundHandler = require('./not-found');
var model           = require('../model');
var NotFound        = ReactRouter.NotFound;
var Pages           = ReactRouter.Pages;
var Page            = ReactRouter.Page;

var App = React.createClass({

  getInitialState: function() {
    return model.val();
  },

  componentDidMount: function() {
    model.on('update', function(updatedModel) {
      debugger;
      this.setState(updatedModel);
    });
  },

  componentWillUnmount: function() {
    model.off('update');
  },

  render: function() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/assets/style.css" />
          <script src="/assets/bundle.js" />
        </head>
        <Pages className="App" path={this.props.path}>
          <Page path="/" handler={MainPage} />
          <Page path="/sign-in" handler={SignInPage} />
          <Page path="/users/:username" handler={UserPage} />
          <NotFound handler={NotFoundHandler} />
        </Pages>
      </html>
    );
  }
});

module.exports = App;
