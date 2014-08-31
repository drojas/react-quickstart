// todo: rename to "factory"?
'use strict';

var _          = require('underscore');
var Cortex     = require('cortexjs');
var invariant  = require('flux/lib/invariant');
var Dispatcher = require('../dispatcher');

var _state  = new Cortex({});
var _stores = {};

var Model = {
  state: _state,
  registerStore: registerStore
}

Model.Mixin = {
  listenToModelState: function() {
    _state.on('update', function() {
      this.forceUpdate();
    }.bind(this));
  },

  stopListeningToModelState: function() {
    _state.off('update');
  },

  componentDidMount: function() {
    this.listenToModelState();
  },

  componentWillUnmount: function() {
    this.stopListeningToModelState();
  }
};

Dispatcher.register(routeActionsToStores);

module.exports = Model;

// private methods

function registerStore(store) {
  invariant(
    typeof store        === 'object' &&
    typeof store.key    === 'string' &&
    typeof store.schema === 'object',
    'registerStore(...): invalid store `%s`.',
    store
  );

  // Merge schema from store into Model
  _state.add([store.key], store.schema)

  // save a reference to the store
  _stores[store.key] = store;
};

function routeActionsToStores(payload) {
  var action =  payload.action;
  var store  = _stores[payload.store];
  invariant(
    typeof store.handlers         === 'object' &&
    typeof store.handlers[action] === 'function',
    'routeActionsToStores(...): cannot find a store `%s` with a handler `%s`.',
    store,
    action
  );
  store.handlers[action](_state[payload.store], payload.data);
}
