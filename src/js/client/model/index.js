'use strict';

var _ = require('underscore');
var Cortex = require('cortexjs');
var AppDispatcher = require('../dispatcher/app-dispatcher');

var model = new Cortex({});

// todo: refactor extending `Cortex.prototype`
model.addStore = function(eventsNamespace, store) {
  // Merge schema from store into model
  _.each(_.keys(store.schema), function (key) {
    model.add(key, store.schema[key]);
  });

  // Register to handle all updates to the store
  AppDispatcher.on(eventsNamespace, function(actionName, payload) {
    throwNoHandlerError(store, actionName)
    store.handlers[actionName](model, payload);
  });
};

model.closeStore = function(eventsNamespace) {
  AppDispatcher.off(eventsNamespace);
};

module.exports = model;


// private methods

function throwNoHandlerError(store, actionName) {
  if (!_.has(store.handlers, actionName)){
    var err = 'No handler function for `' + actionName + '` available in store.';
    throw new Error(err);
  }
}
