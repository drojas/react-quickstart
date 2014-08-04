'use strict';

var AppDispatcher = require('../../../dispatcher/app-dispatcher');

var SigInActions = {
  signIn: function(username, password, remember) {
    AppDispatcher.trigger('signin', 'signin', {
      username: username,
      password: password,
      remember: remember
    });
  }
};

module.exports = SigInActions;
