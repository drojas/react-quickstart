'use strict';

var React           = require('react');
var model           = require('../../model');
var PopStateMixin   = require('../mixins/pop-state');
var RendererMixin   = require('../mixins/renderer');
var MainPage        = require('../main-page');
var UserPage        = require('../user-page');
var SignInPage      = require('../auth/sign-in-page');
var SignUpPage      = require('../auth/sign-up-page');
var NotFoundPage    = require('../not-found-page');
var AppRenderer     = require('./renderer')
var style           = require('./style');

// @if NODE_ENV!='production'
var bundleAsset = '/assets/bundle.js'
// @endif
// @if NODE_ENV='production'
var bundleAsset = '/assets/bundle.min.js'
// @endif

var App = React.createClass({

  mixins: [
    model.getMixin(),
    PopStateMixin,
    RendererMixin
  ],

  getRenderOptions: function(){
    return {
      renderer:    AppRenderer,
      notFound:    NotFoundPage,
      inlineStyle: style,
      bundle:      bundleAsset,
      mainStyle:   '/assets/style.css',
      routes: {
        '/':                MainPage,
        '/sign-up':         SignUpPage,
        '/sign-in':         SignInPage,
        '/users/:username': UserPage,
      },
    };
  }
});

module.exports = App;
