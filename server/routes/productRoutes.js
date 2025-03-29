const express = require('express');
const {
  addProductController,
  getAllProductController,
  getProductByIdController,
} = require('../controllers/productController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, addProductController);
router.get('/', getAllProductController);
router.get('/:id', getProductByIdController);

module.exports = router;
