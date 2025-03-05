const { Product } = require('../../models/');

// Add new product api
const addProduct = async (productData) => {
  const { name, description, price } = productData;

  // Check if all required fields are provided
  if (!name || !price) {
    throw new Error('Name and price are required');
  }

  // Create a new product in the database
  const newProduct = await Product.create({
    name,
    description,
    price,
  });

  return {
    id: newProduct.id,
    name: newProduct.name,
    description: newProduct.description,
    price: newProduct.price,
  };
};

module.exports = { addProduct };
