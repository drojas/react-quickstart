'use strict';

var Dispatcher = require('../../../dispatcher');

var SignUpActions = {
  signUp: function(username, password, confirmation) {
    var payload = {
      store: 'signup',
      action: 'signup',
      data: {
        username: username,
        password: password,
        confirmation: confirmation
      }
    }

    Dispatcher.dispatch(payload);
  }
};

module.exports = SignUpActions;
