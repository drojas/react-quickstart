'use strict';

var path = require('path');

module.exports = {
  entry: './src/js/client/index.js',
  output: {
    filename: 'bundle.js',
    path: '/assets'
  }
};
