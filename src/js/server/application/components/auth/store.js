'use strict';

var superagent = require('superagent');
var navigate   = require('../../helpers/navigate');

var AuthStore = {
  key: 'auth',

  schema: {
    signup: { status: null },
    signin: { token: null, status: null }
  },

  handlers: {
    signup: function(authState, userData) {
      superagent
        .post('http://localhost:3000/api/sign-up/')
        .send(userData)
        .end(makeSignUpDigestFun(authState));
    },

    signin: function(authState, userData) {
      superagent
        .post('http://localhost:3000/api/auth-token/')
        .auth(userData.username, userData.password)
        .end(makeLoginDigestFun(authState, userData.remember));
    }
  }
};

module.exports = AuthStore;

// private methods

// signup stuff

function makeSignUpDigestFun(authState) {
  return function (err, res) {
    if (!res.ok) {
      setSignUpStatus(authState, 'SIGNUP.FAILED');
    } else {
      setSignUpStatus(authState, 'SIGNUP.OK');
      navigate('/sign-in');
    }
  };
}

function setSignUpStatus(authState, status) {
  // push the auth change to the view, so it can be rendered
  authState.signup.status.set(status);
}

// signin stuff

function makeLoginDigestFun(authState, remember) {
  return function (err, res) {
    if (!res.ok) {
      setAuthStatus(authState, 'AUTH.FAILED');
    } else {
      setToken(authState, res.body.token, remember);
      setAuthStatus(authState, 'AUTH.AUTHENTICATED');
      navigate('/')
    }
  };
}

function setToken(authState, token, remember) {
  authState.signin.token.set(token);
  // store the token in Storage
  if (remember) {
      localStorage.setItem('TOKEN_STORAGE_KEY', token);
  } else {
      sessionStorage.setItem('TOKEN_STORAGE_KEY', token);
  }
}

function setAuthStatus(authState, status) {
  // remove the token from system if you are not authenticated
  if (status !== 'AUTH.AUTHENTICATED') {
      localStorage.removeItem('TOKEN_STORAGE_KEY');
      sessionStorage.removeItem('TOKEN_STORAGE_KEY');
      authState.token.set(null);
  }
  // push the auth change to the view, so it can be rendered
  authState.signin.status.set(status);
}
