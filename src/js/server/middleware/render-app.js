'use strict';

module.exports = function renderApp(req, res, next) {
  var path   = url.parse(req.url).pathname;
  var client = Client({path: path});
  var sendResponse = function(err, markup) {
    if (err) return next(err)
    res.send('<!doctype html>\n' + markup);
  };
  ReactAsync.renderComponentToStringWithAsyncState(client, sendResponse);
};
