const express = require('express');
const {
  addProductController,
  getAllProductController,
  getProductByIdController,
} = require('../controllers/productController');

const router = express.Router();

router.post('/', addProductController);
router.get('/', getAllProductController);
router.get('/:id', getProductByIdController);

module.exports = router;
