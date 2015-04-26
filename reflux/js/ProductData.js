module.exports = {
  init: function() {
    localStorage.clear();

    localStorage.setItem('product', JSON.stringify([
      {
        id: '0011001',
        name: 'Brand New Shoes',
        image: 'shoes.png',
        description: 'Shoes are the important foundation of the lower limb orthosis. Shoes are used to protect and warm the feet, transfer body weight while walking, and reduce pressure or pain through redistributing weight. Shoes should be comfortable and properly fitted. They should be at least 1 cm longer than the longest toe and correspond to the shape of the feet.',
        variants: [
          {
            sku: '123123',
            type: 'Red Sneakers',
            price: 46.99,
            inventory: 4
          },
          {
            sku: '123124',
            type: 'Black Slippers',
            price: 18.99,
            inventory: 2
          },
          {
            sku: '123125',
            type: 'Blue Runners',
            price: 34.79,
            inventory: 3
          }
        ]
      }
    ]));
  }
};
