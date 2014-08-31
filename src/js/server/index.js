'use strict';

var path    = require('path');
var express = require('express');
var api     = require('./api');

var app = express();

var assetsPath = path.join(__dirname,
// @ifdef ASSETS_PATH
// @echo ASSETS_PATH
// @endif
// @ifndef ASSETS_PATH
'../../../build/assets'
// @endif
);

// @exclude
console.log(['',
            'WARNING:',
            'Installing node-jsx and serving client app using webpack-dev-middleware.',
            'You should only see this if you are running the source code directly.',
            ''].join('\n'));

// we need jsx syntax support when running source code directly
require('node-jsx').install();

// use webpack middleware to serve client-side app
var webpack           = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackAppConfig  = require('./webpack.app-config.js')
var appCompiler       = webpack(webpackAppConfig);
// Can this generate a conflict with express.static?
app.use(webpackMiddleware(appCompiler, {
  publicPath: '/assets/'
}));

// @endexclude

var renderApp = require('./middleware/render-app');

app
  .use('/assets', express.static(assetsPath))
  .use('/api', api)
  .use(renderApp)
  .listen(3000, function() {
    console.log('Point your browser at http://localhost:3000');
  });
