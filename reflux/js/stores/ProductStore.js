var Reflux = require('reflux');
var EventEmitter = require('events').EventEmitter;
var FluxCartActions = require('../actions/FluxCartActions');
var _ = require('underscore');

var _product = {}, _selected = null;

var ProductStore = _.extend({}, EventEmitter.prototype, {
  getProduct: function() {
    return _product;
  },

  getSelected: function() {
    return _selected;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

ProductStore = _.extend(ProductStore, Reflux.createStore({
  listenables: FluxCartActions,

  onReceiveProduct(data) {
    _product = data[0];
    _selected = data[0].variants[0];
    ProductStore.emitChange();
  },

  onSelectProduct(index) {
    _selected = _product.variants[index];
    ProductStore.emitChange();
  }
}));

module.exports = ProductStore;
