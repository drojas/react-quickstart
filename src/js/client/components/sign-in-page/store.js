
var Cortex        = require('cortexjs');
var superagent    = require('superagent');
var model         = require('../../model');
var AppDispatcher = require('../../dispatcher/app-dispatcher');

/* Initialize model data for this store
 *
 * This needs some thinking about how to integrate well with other
 * components/domains
 *
 * Also, I want to set backend synchronization and local storage
 * for this domain in this file only.
 */
model.add('auth', {
  token: null,
  status: null
});

// Register to handle all updates
AppDispatcher.on('all', function(eventName, payload) {
  var test = /^signin\:(\w+)$/;
  var validEventName = eventName.match(test);
  if (!validEventName) return;
  var actionName = validEventName[1];
  if (!(SignInStore.hasOwnProperty(actionName))) {
    var err = 'No handler function for `' + actionName + '` available in store.';
    throw new Error(err);
  }
  SignInStore[actionName](payload);
});

var SignInStore = {
  signin: function(username, password, remember) {
    superagent
      .post('http://localhost:3000/api/auth-token/')
      .auth(username, password)
      .end(makeLoginDigestFun(remember));
  }
};

module.exports = SignInStore;

function makeLoginDigestFun(remember) {
  return function (err, res) {
    if (!res.ok) {
      setAuthStatus('AUTH.FAILED');
    } else {
      setToken(res.body.token, remember);
      setAuthStatus('AUTH.AUTHENTICATED');
    }
  };
}

function setToken(token, remember) {
  model.auth.token.set(token);
  // store the token in Storage
  if (remember) {
      localStorage.setItem('TOKEN_STORAGE_KEY', token);
  } else {
      sessionStorage.setItem('TOKEN_STORAGE_KEY', token);
  }
}

function setAuthStatus(status) {
  // remove the token from system if you are not authenticated
  if (status !== 'AUTH.AUTHENTICATED') {
      localStorage.removeItem('TOKEN_STORAGE_KEY');
      sessionStorage.removeItem('TOKEN_STORAGE_KEY');
      model.auth.token.set(null);
  }
  // push the auth change to the view, so it can be rendered
  model.auth.status.set(status);
}