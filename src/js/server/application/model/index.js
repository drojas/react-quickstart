// todo: rename to "factory"?
'use strict';

var _          = require('underscore');
var Cortex     = require('cortexjs');
var Dispatcher = require('../dispatcher');
var invariant  = require('flux/lib/invariant');

var _state  = new Cortex({});
var _stores = {};

var Model = {
  state: _state
}

Model.addStore = function(eventsNamespace, store) {
  // Merge schema from store into Model
  _.each(_.keys(store.schema), function (key) {
    _state.add(key, store.schema[key]);
  });
  // keep a reference to the store
  _stores[eventsNamespace] = store;
};

Model.getMixin = function() {
  return {

    getInitialState: function() {
      return _state.val();
    },

    listenToModelAndSetState: function() {
      _state.on('update', function(updatedModel) {
        this.setState(updatedModel.val());
      }.bind(this));
    },

    stopListeningToModel: function() {
      _state.off('update');
    },

    componentDidMount: function() {
      this.listenToModelAndSetState();
    },

    componentWillUnmount: function() {
      this.stopListeningToModel();
    }
  }
};

Dispatcher.register(routeActionsToStores);

module.exports = Model;

// private methods

function routeActionsToStores(payload) {
  var action =  payload.action;
  var store = _stores[payload.store];
  invariant(
    store && store.handlers && store.handlers[action],
    'routeActionsToStores(...): cannot find a store `%s` with a handler `%s`.',
    store,
    action
  );
  store.handlers[action](_state[payload.store], payload.data);
}
