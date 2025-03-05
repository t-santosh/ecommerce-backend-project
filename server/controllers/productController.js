const { addProduct } = require('../api/userApi/productApi');
const { Product } = require('../models');
const {
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  PRODUCTS_NOT_FOUND,
} = require('../utils/messages');

// Add product controller
const addProductController = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Call the handler to add new product
    const product = await addProduct({ name, description, price });
    //Send response
    res.status(201).json({ message: ADD_PRODUCT_SUCCESS, product });
  } catch (error) {
    console.error('Error fetching products: ', error);
    // Check the error message
    res.status(500).json({ message: ADD_PRODUCT_ERROR, error });
  }
};

// Fetch all products controller
const getAllProductController = async (req, res) => {
  try {
    // if (!req.user) {
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }
    // Fetch all products from the Product model
    const products = await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (products.length === 0) {
      return res.status(404).json({ message: PRODUCTS_NOT_FOUND });
    }
    res.json({ products });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};
module.exports = { addProductController, getAllProductController };
