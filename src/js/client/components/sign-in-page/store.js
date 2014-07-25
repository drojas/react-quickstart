
var superagent    = require('superagent');
var AppDispatcher = require('../../dispatcher/app-dispatcher');

var _token = null;
var _status = null;

var SignInStore = {
  signin: function(username, password, remember) {
    superagent
      .post('http://localhost:3000/api/auth-token/')
      .auth(username, password)
      .end(makeLoginDigestFun(remember));
  }
};

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
  _token = token;
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
      _token = null;
  }
  // push the auth change to the view, so it can be rendered
  _status = status;
}