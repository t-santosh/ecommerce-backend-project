const db = require('../config/db');
const User = require('./User');
const Product = require('./Product');

// Define associations (if any)
// For example, if a User can have many Products:
User.hasMany(Product);
Product.belongsTo(User);

// Export models for use in other parts of the application
module.exports = { db, User, Product };
