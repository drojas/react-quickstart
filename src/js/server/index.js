'use strict';

var path        = require('path');
var url         = require('url');
var express     = require('express');
var ReactAsync  = require('react-async');
var nodejsx     = require('node-jsx').install();
var Client      = require('../client');
var api         = require('../api');

var development = process.env.NODE_ENV !== 'production';

function renderApp(req, res, next) {
  var path   = url.parse(req.url).pathname;
  var client = Client({path: path});
  var sendResponse = function(err, markup) {
    if (err) return next(err)
    res.send('<!doctype html>\n' + markup);
  };
  ReactAsync.renderComponentToStringWithAsyncState(client, sendResponse);
}


var app = express();

if (development) {
  var webpackMiddleware = require('webpack-dev-middleware');
  var webpack = require("webpack");
  var compiler = webpack(require('../client/webpack.config.js'));
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
