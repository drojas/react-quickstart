'use strict';

var path        = require('path');
var express     = require('express');
var api         = require('./api');
var renderApp   = require('./middleware/render-app');

var app = express();

var assetsPath = path.join(__dirname,
// @ifdef ASSETS_PATH
// @echo ASSETS_PATH
// @endif
// @ifndef ASSETS_PATH
'../../../build/assets'
// @endif
);

// @if NODE_ENV!='production'
// webpack middleware
var webpack             = require("webpack");
var webpackMiddleware   = require('webpack-dev-middleware');
var webpackClientConfig = require('./webpack.app-config.js')
var appCompiler      = webpack(webpackClientConfig);
app.use(webpackMiddleware(appCompiler, {
  publicPath: '/assets/'
}));
// @endif

app
  .use('/assets', express.static(assetsPath))
  .use('/api', api)
  .use(renderApp)
  .listen(3000, function() {
    console.log('Point your browser at http://localhost:3000');
  });
