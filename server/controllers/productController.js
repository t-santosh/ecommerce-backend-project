const { addProduct } = require('../api/userApi/productApi');
const { ADD_PRODUCT_SUCCESS, ADD_PRODUCT_ERROR } = require('../utils/messages');

// Add product controller
const addProductController = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Call the handler to add new product
    const product = await addProduct({ name, description, price });
    //Send response
    res.status(201).json({ message: ADD_PRODUCT_SUCCESS, product });
  } catch (error) {
    // Check the error message
    res.status(500).json({ message: ADD_PRODUCT_ERROR, error });
  }
};

module.exports = { addProductController };
