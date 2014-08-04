'use strict';

var AppDispatcher = require('../../../dispatcher/app-dispatcher');

var SignUpActions = {
  signUp: function(username, password, confirmation) {
    AppDispatcher.trigger('signup', 'signup', {
      username: username,
      password: password,
      confirmation: confirmation
    });
  }
};

module.exports = SignUpActions;
