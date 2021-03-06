const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  subtotal: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  },
  productId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Cart
