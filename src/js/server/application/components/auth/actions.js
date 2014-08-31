'use strict';

var Dispatcher = require('../../dispatcher');

var AuthActions = {
  signUp: function(username, password, confirmation) {
    var payload = {
      store: 'auth',
      action: 'signup',
      data: {
        username: username,
        password: password,
        confirmation: confirmation
      }
    }
    Dispatcher.dispatch(payload);
  },

  signIn: function(username, password, remember) {
    var payload = {
      store: 'auth',
      action: 'signin',
      data: {
        username: username,
        password: password,
        remember: remember
      }
    }
    Dispatcher.dispatch(payload);
  }
};

module.exports = AuthActions;
