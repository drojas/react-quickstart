/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react');
var ReactRouter = require('react-router-component');
var NotFound    = ReactRouter.NotFound;
var Pages       = ReactRouter.Pages;
var Page        = ReactRouter.Page;

// todo: refactor iterating options.routes
module.exports = function(options) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href={options.mainStyle} />
        <script src={options.bundle} />
      </head>
      <Pages className="App" path={this.props.path} style={options.inlineStyle}>
        <Page path="/" handler={options.routes['/']} />
        <Page path="/sign-up" handler={options.routes['/sign-up']} />
        <Page path="/sign-in" handler={options.routes['/sign-in']} />
        <Page path="/users/:username" handler={options.routes['/users/:username']} />
        <NotFound handler={options.notFound} />
      </Pages>
    </html>
  )
}
