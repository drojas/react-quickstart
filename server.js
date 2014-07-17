'use strict';

var path        = require('path');
var url         = require('url');
var express     = require('express');
var ReactAsync  = require('react-async');
var nodejsx     = require('node-jsx').install();
var App         = require('./client');

var development = process.env.NODE_ENV !== 'production';

function renderApp(req, res, next) {
  var path = url.parse(req.url).pathname;
  var app = App({path: path});
  ReactAsync.renderComponentToStringWithAsyncState(app, function(err, markup) {
    if (err) {
      return next(err);
    }
    res.send('<!doctype html>\n' + markup);
  });
}

var api = express()
  .get('/users/:username', function(req, res) {
    var username = req.params.username;
    res.send({
      username: username,
      name: username.charAt(0).toUpperCase() + username.slice(1)
    });
  });

var app = express();

if (development) {
  var webpackMiddleware = require('webpack-dev-middleware');
  var webpack = require("webpack");
  var compiler = webpack(require('./webpack.config.js'));
  app.use(webpackMiddleware(compiler, {
    publicPath: '/assets/'
  }));
}

app
  .use('/assets', express.static(path.join(__dirname, 'assets')))
  .use('/api', api)
  .use(renderApp)
  .listen(3000, function() {
    console.log('Point your browser at http://localhost:3000');
  });
