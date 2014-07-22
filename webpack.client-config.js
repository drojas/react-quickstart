'use strict';

var path = require('path');

module.exports = {
  entry: './src/js/client/index.js',
  output: {
    filename: 'bundle.js',
    path: '/assets'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, loader: "jsx-loader" }
    ]
  }
};
