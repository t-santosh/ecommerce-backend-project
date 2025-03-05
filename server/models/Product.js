const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Product = db.define(
  'Product',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'products', // Explicitly specifying the table name in lowercase
  }
);

module.exports = Product;
