window.React = require('react');
var ProductData = require('./ProductData');
var CartAPI = require('./utils/CartAPI');
var FluxCartApp = require('./components/FluxCartApp.react');

ProductData.init();

CartAPI.getProductData();

React.render(
  <FluxCartApp />,
  document.getElementById('content')
);
