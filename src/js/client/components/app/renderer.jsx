/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react');
var ReactRouter = require('react-router-component');
var NotFound    = ReactRouter.NotFound;
var Pages       = ReactRouter.Pages;
var Page        = ReactRouter.Page;

module.exports = function(options) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href={options.mainStyle} />
        <script src={options.bundle} />
      </head>
      <Pages className="App" path={this.props.path} style={options.style}>
        <Page path="/" handler={options.handlers['/']} />
        <Page path="/sign-up" handler={options.handlers['/sign-up']} />
        <Page path="/sign-in" handler={options.handlers['/sign-in']} />
        <Page path="/users/:username" handler={options.handlers['/users/:username']} />
        <NotFound handler={options.notFound} />
      </Pages>
    </html>
  )
}
