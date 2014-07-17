/**
 * @jsx React.DOM
 */
'use strict';

var React           = require('react');
var ReactRouter     = require('react-router-component');
var MainPage        = require('./main-page');
var UserPage        = require('./user-page');
var NotFoundHandler = require('./not-found');
var NotFound        = ReactRouter.NotFound;
var Pages           = ReactRouter.Pages;
var Page            = ReactRouter.Page;

var App = React.createClass({

  render: function() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/assets/style.css" />
          <script src="/assets/bundle.js" />
        </head>
        <Pages className="App" path={this.props.path}>
          <Page path="/" handler={MainPage} />
          <Page path="/users/:username" handler={UserPage} />
          <NotFound handler={NotFoundHandler} />
        </Pages>
      </html>
    );
  }
});

module.exports = App;
