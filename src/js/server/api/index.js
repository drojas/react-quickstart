'use strict';

var express = require('express');

var api = express()
  .post('/sign-up', function(req, res) {
    res.send(200);
  })
  .post('/auth-token', function(req, res) {
    res.send({token: 'fake-token'});
  })
  .get('/users/:username', function(req, res) {
    var username = req.params.username;
    res.send({
      username: username,
      name: username.charAt(0).toUpperCase() + username.slice(1)
    });
  })
  .use(function(req, res, next) {
    res.send(404);
  });

module.exports = api;
