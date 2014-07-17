
var path = require('path');

module.exports = {
  entry: "./client.js",
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, loader: "jsx-loader?harmony" }
    ]
  }
};
