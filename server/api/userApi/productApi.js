const { Product } = require('../../models/');

// Add new product api
const addProduct = async (productData) => {
  const { name, description, price, UserId } = productData;

  // Check if all required fields are provided
  if (!name || !price) {
    throw new Error('Name and price are required');
  }

  // Create a new product in the database
  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      UserId,
    });

    return {
      id: newProduct.id,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      UserId: newProduct.UserId,
    };
  } catch (error) {
    throw new Error('Failed to create product. Please try again.');
  }
};

module.exports = { addProduct };
