/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react');
var Model         = require('../../model');
var PopStateMixin = require('../mixins/pop-state');

var ReactRouter = require('react-router-component');
var NotFound    = ReactRouter.NotFound;
var Pages       = ReactRouter.Pages;
var Page        = ReactRouter.Page;

var MainPage     = require('../main-page');
var UserPage     = require('../user-page');
var AuthPages    = require('../auth');
var NotFoundPage = require('../not-found-page');
var inlineStyle  = require('./inline-style');


// @if NODE_ENV!='production'
var bundleAsset = '/assets/bundle.js'
// @endif
// @if NODE_ENV='production'
var bundleAsset = '/assets/bundle.min.js'
// @endif

// todo: serve minified in prod.
var mainStyle = '/assets/style.css';

var App = React.createClass({

  mixins: [
    Model.Mixin,
    PopStateMixin
  ],

  render: function() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href={mainStyle} />
          <script src={bundleAsset} />
        </head>
        <Pages className="App" path={this.props.path} style={inlineStyle}>
          <Page path="/" handler={MainPage} />
          <Page path="/sign-up" handler={AuthPages.SignUpPage} />
          <Page path="/sign-in" handler={AuthPages.SignInPage} />
          <Page path="/users/:username" handler={UserPage} />
          <NotFound handler={NotFoundPage} />
        </Pages>
      </html>
    )
  }
});

module.exports = App;
