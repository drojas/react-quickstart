// todo: move to client/helpers/middleware
'use strict';

var url         = require('url');
var ReactAsync  = require('react-async');
var App         = require('../app');

module.exports = function (req, res, next) {
  var path = url.parse(req.url).pathname;
  var app  = App({path: path});
  var sendResponse = function(err, markup) {
    if (err) return next(err)
    res.send('<!doctype html>\n' + markup);
  };
  ReactAsync.renderComponentToStringWithAsyncState(app, sendResponse);
};
