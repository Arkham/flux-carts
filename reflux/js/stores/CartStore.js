var Reflux = require('reflux');
var FluxCartActions = require('../actions/FluxCartActions');
var _ = require('underscore');

var _products = {}, _cartVisible = false;

var CartStore = {
  getCartItems: function() {
    return _products;
  },

  getCartCount: function() {
    return _.keys(_products).length;
  },

  getCartTotal: function() {
    return _.reduce(_products, function(result, product) {
      return result + (product.price * product.quantity);
    }, 0).toFixed(2);
  },

  getCartVisible: function() {
    return _cartVisible;
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
};

CartStore = _.extend(CartStore, Reflux.createStore({
  listenables: FluxCartActions,

  onAddToCart(sku, update) {
    update.quantity = sku in _products ? _products[sku].quantity + 1 : 1;
    _products[sku] = _.extend({}, _products[sku], update);
    this.trigger();
  },

  onUpdateCartVisible(cartVisible) {
    _cartVisible = cartVisible;
    this.trigger();
  },

  onRemoveFromCart(sku) {
    delete _products[sku];
    this.trigger();
  }
}));

module.exports = CartStore;
