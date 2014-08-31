'use strict';

var path             = require('path');
var preprocessLoader = require('preprocess-loader');
var jsxLoader        = require('jsx-loader');

module.exports = {
  entry: './src/js/server/application/index.js',
  output: {
    filename: 'bundle.js',
    path: '/assets'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['preprocess-loader', 'jsx-loader'] }
    ]
  }
};
