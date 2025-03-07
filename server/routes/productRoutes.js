const express = require('express');
const {
  addProductController,
  getAllProductController,
  getProductByIdController,
} = require('../controllers/productController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, verifyAdmin, addProductController);
router.get('/', verifyToken, verifyAdmin, getAllProductController);
router.get('/:id', verifyToken, verifyAdmin, getProductByIdController);

module.exports = router;
