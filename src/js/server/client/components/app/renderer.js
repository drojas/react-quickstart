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
    React.DOM.html(null, 
      React.DOM.head(null, 
        React.DOM.link({rel: "stylesheet", href: options.mainStyle}), 
        React.DOM.script({src: options.bundle})
      ), 
      Pages({className: "App", path: this.props.path, style: options.inlineStyle}, 
        Page({path: "/", handler: options.routes['/']}), 
        Page({path: "/sign-up", handler: options.routes['/sign-up']}), 
        Page({path: "/sign-in", handler: options.routes['/sign-in']}), 
        Page({path: "/users/:username", handler: options.routes['/users/:username']}), 
        NotFound({handler: options.notFound})
      )
    )
  )
}
