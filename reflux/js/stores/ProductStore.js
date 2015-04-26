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
};

ProductStore = _.extend(ProductStore, Reflux.createStore({
  listenables: FluxCartActions,

  onReceiveProduct(data) {
    _product = data[0];
    _selected = data[0].variants[0];
    this.trigger();
  },

  onSelectProduct(index) {
    _selected = _product.variants[index];
    this.trigger();
  }
}));

module.exports = ProductStore;
