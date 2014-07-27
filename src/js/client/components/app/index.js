'use strict';

var React           = require('react');
var AppRenderer     = require('./renderer')
var PopStateMixin   = require('../mixins/pop-state');
var RendererMixin   = require('../mixins/renderer');
var MainPage        = require('../main-page');
var UserPage        = require('../user-page');
var SignInPage      = require('../sign-in-page');
var SignUpPage      = require('../sign-up-page');
var NotFoundHandler = require('../not-found');
var model           = require('../../model');

var App = React.createClass({
  mixins: [
    model.getMixin(),
    PopStateMixin,
    RendererMixin
  ],

  getRenderOptions: function(){
    return {
      renderer: AppRenderer,
      style:    '/assets/style.css',
      bundle:   '/assets/bundle.js',
      handlers: {
        '/':                MainPage,
        '/sign-up':         SignUpPage,
        '/sign-in':         SignInPage,
        '/users/:username': UserPage,
      },
      notFound: NotFoundHandler
    };
  }
});

module.exports = App;
