'use strict';

var url         = require('url');
var ReactAsync  = require('react-async');
var Client      = require('../../client');

module.exports = function (req, res, next) {
  var path   = url.parse(req.url).pathname;
  var client = Client({path: path});
  var sendResponse = function(err, markup) {
    if (err) return next(err)
    res.send('<!doctype html>\n' + markup);
  };
  ReactAsync.renderComponentToStringWithAsyncState(client, sendResponse);
};
