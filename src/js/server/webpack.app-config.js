'use strict';

var path = require('path');

module.exports = {
  entry: './src/js/server/app/index.js',
  output: {
    filename: 'bundle.js',
    path: '/assets'
  }
};
