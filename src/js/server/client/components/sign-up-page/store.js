'use strict';

var superagent = require('superagent');
var navigate   = require('../../helpers/navigate');

var SignUpStore = {
  schema: { signup: { status: null } },
  handlers: {
    signup: function(model, userData) {
      superagent
        .post('http://localhost:3000/api/sign-up/')
        .send(userData)
        .end(makeSignUpDigestFun(model));
    }
  }
};

module.exports = SignUpStore;

// private methods

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
  // remove the token from system if you are not authenticated
  if (status !== 'AUTH.AUTHENTICATED') {
      localStorage.removeItem('TOKEN_STORAGE_KEY');
      sessionStorage.removeItem('TOKEN_STORAGE_KEY');
      model.auth.token.set(null);
  }
  // push the auth change to the view, so it can be rendered
  model.signup.status.set(status);
}
