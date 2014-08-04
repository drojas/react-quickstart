'use strict';

var path = require('path');

module.exports = {
  entry: './src/js/server/application/index.js',
  output: {
    filename: 'bundle.js',
    path: '/assets'
  }
};
