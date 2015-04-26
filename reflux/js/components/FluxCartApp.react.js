var React = require('react');
var CartStore = require('../stores/CartStore');
var ProductStore = require('../stores/ProductStore');
var FluxProduct = require('./FluxProduct.react');
var FluxCart = require('./FluxCart.react');

function getCartState() {
  return {
    product: ProductStore.getProduct(),
    selectedProduct: ProductStore.getSelected(),
    cartItems: CartStore.getCartItems(),
    cartCount: CartStore.getCartCount(),
    cartTotal: CartStore.getCartTotal(),
    cartVisible: CartStore.getCartVisible()
  };
}

var FluxCartApp = React.createClass({
  getInitialState: function() {
    return getCartState();
  },

  componentDidMount: function() {
    this._productStoreUnsubscribe = ProductStore.listen(this._onChange);
    this._cartStoreUnsubscribe = CartStore.listen(this._onChange);
  },

  componentWillUnmount: function() {
    this._productStoreUnsubscribe();
    this._cartStoreUnsubscribe();
  },

  render: function() {
    return (
      <div className="flux-cart-app">
        <FluxCart
          products={this.state.cartItems}
          count={this.state.cartCount}
          total={this.state.cartTotal}
          visible={this.state.cartVisible} />

        <FluxProduct
          product={this.state.product}
          cartitems={this.state.cartItems}
          selected={this.state.selectedProduct} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getCartState());
  }
});

module.exports = FluxCartApp;
