var Reflux = require('reflux');
var FluxCartActions = require('../actions/FluxCartActions');
var _ = require('underscore');

var _product = {}, _selected = null;

var ProductStore = {
  getProduct: function() {
    return _product;
  },

  getSelected: function() {
    return _selected;
  },

  payload: function() {
    return {
      product: this.getProduct(),
      selectedProduct: this.getSelected(),
    }
  }
};

ProductStore = _.extend(ProductStore, Reflux.createStore({
  listenables: FluxCartActions,

  onReceiveProduct(data) {
    _product = data[0];
    _selected = data[0].variants[0];
    this.trigger(ProductStore.payload());
  },

  onSelectProduct(index) {
    _selected = _product.variants[index];
    this.trigger(ProductStore.payload());
  }
}));

module.exports = ProductStore;
