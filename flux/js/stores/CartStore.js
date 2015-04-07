var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxCartConstants = require('../constants/FluxCartConstants');
var _ = require('underscore');

var _products = {}, _cartVisible = false;

function add(sku, update) {
  update.quantity = sku in _products ? _products[sku].quantity + 1 : 1;
  _products[sku] = _.extend({}, _products[sku], update)
}

function setCartVisible(cartVisible) {
  _cartVisible = cartVisible;
}

function removeItem(sku) {
  delete _products[sku];
}

var CartStore = _.extend({}, EventEmitter.prototype, {
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
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case FluxCartConstants.CART_ADD:
      add(action.sku, action.update);
      break;

    case FluxCartConstants.CART_VISIBLE:
      setCartVisible(action.cartVisible);
      break;

    case FluxCartConstants.CART_REMOVE:
      removeItem(action.sku);
      break;

    default:
      return true;
  }

  CartStore.emitChange();

  return true;
});

module.exports = CartStore;
