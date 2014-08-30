// todo: rename to "factory"?
'use strict';

var _          = require('underscore');
var Cortex     = require('cortexjs');
var Dispatcher = require('../dispatcher');
var invariant  = require('flux/lib/invariant');

var model = new Cortex({});

// todo: refactor extending `Cortex.prototype`

var _stores = {};

model.addStore = function(eventsNamespace, store) {
  // Merge schema from store into model
  _.each(_.keys(store.schema), function (key) {
    model.add(key, store.schema[key]);
  });
  // keep a reference to the store
  _stores[eventsNamespace] = store;
};

model.getMixin = function() {
  return {

    getInitialState: function() {
      return model.val();
    },

    listenToModelAndSetState: function() {
      model.on('update', function(updatedModel) {
        this.setState(updatedModel.val());
      }.bind(this));
    },

    stopListeningToModel: function() {
      model.off('update');
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

module.exports = model;

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
  _stores[store].handlers[action](model, payload.data);
}
