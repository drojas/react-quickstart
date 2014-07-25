'use strict';

var path        = require('path');
var express     = require('express');
var nodejsx     = require('node-jsx').install();
var api         = require('../api');
var renderApp   = require('./middleware/render-app');

var development = process.env.NODE_ENV !== 'production';

var app = express();

if (development) {
  var webpack             = require("webpack");
  var webpackMiddleware   = require('webpack-dev-middleware');
  var webpackClientConfig = require('../../../webpack.client-config.js')
  var clientCompiler      = webpack(webpackClientConfig);
  app.use(webpackMiddleware(clientCompiler, {
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
