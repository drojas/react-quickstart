'use strict';

var superagent = require('superagent');
var navigate   = require('../../helpers/navigate');

var AuthStore = {
  schema: {
    auth: {
      signup: { status: null },
      signin: { token: null, status: null }
    }
  },

  handlers: {
    signup: function(model, userData) {
      superagent
        .post('http://localhost:3000/api/sign-up/')
        .send(userData)
        .end(makeSignUpDigestFun(model));
    },

    signin: function(model, userData) {
      superagent
        .post('http://localhost:3000/api/auth-token/')
        .auth(userData.username, userData.password)
        .end(makeLoginDigestFun(model, userData.remember));
    }
  }
};

module.exports = AuthStore;

// private methods

// signup stuff

function makeSignUpDigestFun(model) {
  return function (err, res) {
    if (!res.ok) {
      setSignUpStatus(model, 'SIGNUP.FAILED');
    } else {
      setSignUpStatus(model, 'SIGNUP.OK');
      navigate('/sign-in');
    }
  };
}

function setSignUpStatus(model, status) {
  // push the auth change to the view, so it can be rendered
  model.auth.signup.status.set(status);
}

// signin stuff

function makeLoginDigestFun(model, remember) {
  return function (err, res) {
    if (!res.ok) {
      setAuthStatus(model, 'AUTH.FAILED');
    } else {
      setToken(model, res.body.token, remember);
      setAuthStatus(model, 'AUTH.AUTHENTICATED');
      navigate('/')
    }
  };
}

function setToken(model, token, remember) {
  model.auth.signin.token.set(token);
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
  model.auth.signin.status.set(status);
}
