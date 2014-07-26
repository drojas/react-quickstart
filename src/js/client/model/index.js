// todo: rename to "factory"?
'use strict';

var _ = require('underscore');
var Cortex = require('cortexjs');
var AppDispatcher = require('../dispatcher/app-dispatcher');

var model = new Cortex({});

// todo: refactor extending `Cortex.prototype`

model.stores = {};

model.addStore = function(eventsNamespace, store) {
  // Merge schema from store into model
  _.each(_.keys(store.schema), function (key) {
    model.add(key, store.schema[key]);
  });
  // keep a reference to the store
  model.stores[eventsNamespace] = store;
};

model.getMixin = function() {
  return {

    getInitialState: function() {
      return model.val();
    },

    listenToActionsAndCallStores: function() {
      _.each(model.stores, function(store, eventsNamespace) {
        AppDispatcher.on(eventsNamespace, function(actionName, payload) {
          throwNoHandlerError(store, actionName)
          store.handlers[actionName](model, payload);
        });
      });
    },

    listenToModelAndSetState: function() {
      model.on('update', function(updatedModel) {
        this.setState(updatedModel.val());
      }.bind(this));
    },

    stopListeningToActions: function() {
      _.each(model.stores, function(store, eventsNamespace) {
        AppDispatcher.off(eventsNamespace);
      });
    },

    stopListeningToModel: function() {
      model.off('update');
    },

    componentDidMount: function() {
      this.listenToModelAndSetState();
      this.listenToActionsAndCallStores();
    },

    componentWillUnmount: function() {
      this.stopListeningToActions();
      this.stopListeningToModel();
    }
  }
};

module.exports = model;

// private methods

function throwNoHandlerError(store, actionName) {
  if (!_.has(store.handlers, actionName)){
    var err = 'No handler function for `' + actionName + '` available in store.';
    throw new Error(err);
  }
}
