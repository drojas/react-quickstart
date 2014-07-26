'use strict';

var superagent = require('superagent');

var SignInStore = {
  schema: { auth: { token: null, status: null } },
  handlers: {
    signin: function(model, userData) {
      superagent
        .post('http://localhost:3000/api/auth-token/')
        .auth(userData.username, userData.password)
        .end(makeLoginDigestFun(model, userData.remember));
    }
  }
};

module.exports = SignInStore;

// private methods

function makeLoginDigestFun(model, remember) {
  return function (err, res) {
    if (!res.ok) {
      setAuthStatus(model, 'AUTH.FAILED');
    } else {
      setToken(model, res.body.token, remember);
      setAuthStatus(model, 'AUTH.AUTHENTICATED');
    }
  };
}

function setToken(model, token, remember) {
  model.auth.token.set(token);
  // store the token in Storage
  if (remember) {
      localStorage.setItem('TOKEN_STORAGE_KEY', token);
  } else {
      sessionStorage.setItem('TOKEN_STORAGE_KEY', token);
  }
}

function setAuthStatus(model, status) {
  // remove the token from system if you are not authenticated
  if (status !== 'AUTH.AUTHENTICATED') {
      localStorage.removeItem('TOKEN_STORAGE_KEY');
      sessionStorage.removeItem('TOKEN_STORAGE_KEY');
      model.auth.token.set(null);
  }
  // push the auth change to the view, so it can be rendered
  model.auth.status.set(status);
}