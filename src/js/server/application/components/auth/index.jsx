/**
 * @jsx React.DOM
 */
'use strict';

var Model      = require('../../model');
var AuthStore  = require('./store');
var SignInPage = require('./sign-in-page');
var SignUpPage = require('./sign-up-page');

Model.registerStore(AuthStore);

var AuthPages = {
  SignInPage: SignInPage,
  SignUpPage: SignUpPage
};

module.exports = AuthPages;
