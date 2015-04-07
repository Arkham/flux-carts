var React = require('react');
var FluxCartActions = require('../actions/FluxCartActions');

var FluxCart = React.createClass({
  closeCart: function() {
    FluxCartActions.updateCartVisible(false);
  },

  openCart: function() {
    FluxCartActions.updateCartVisible(true);
  },

  removeFromCart: function(sku) {
    FluxCartActions.removeFromCart(sku);
    FluxCartActions.updateCartVisible(false);
  },

  render: function() {
    var self = this, products = this.props.products;

    return (
      <div className={"flux-cart" + (this.props.visible ? ' active' : '')}>
        <div className="mini-cart">
          <button type="button" className="close-cart" onClick={this.closeCart}>x</button>
          <ul>
            {Object.keys(products).map(function(key) {
              return (
                <li key={key}>
                  <h1 className="name">{products[key].name}</h1>
                  <p className="type">{products[key].type}</p>
                  <p className="price">${(products[key].price * products[key].quantity).toFixed(2)}</p>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={self.removeFromCart.bind(self, key)}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          <span className="total">Total: ${this.props.total}</span>
        </div>
        <button
          type="button"
          className="view-cart"
          onClick={this.openCart}
          disabled={Object.keys(this.props.products).length ? '' : 'disabled'}>
          View Cart ({this.props.count})
        </button>
      </div>
    );
  }
});

module.exports = FluxCart;
