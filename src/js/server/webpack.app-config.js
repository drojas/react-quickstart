'use strict';

var path = require('path');
var preprocessLoader = require('preprocess-loader');

module.exports = {
  entry: './src/js/server/application/index.js',
  output: {
    filename: 'bundle.js',
    path: '/assets'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'preprocess-loader' }
    ]
  }
};
