'use strict';

var Dispatcher = require('../../../dispatcher');

var SigInActions = {
  signIn: function(username, password, remember) {
    var payload = {
      store: 'signin',
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

module.exports = SigInActions;
