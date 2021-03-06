const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.STRING,
    values: ["COMPLETED"],
    allowNull: false
  },
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false
  },
  paymentInformation: {
      type: Sequelize.JSON
      // get: function() {
      //   if (this.items && this.items.length)
      //   // unsure of how to define quantity of products in the cart
      //     return this.items.map(item => item.itemsInStock * item.price).reduce((a,b) => a + b, 0)
      //   else {
      //     return 0;
      //   }
      // }
  }
  // billing information?
  // purchaser information?
});

module.exports = Order;
