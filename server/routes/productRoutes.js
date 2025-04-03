const express = require('express');
const {
  addProductController,
  getAllProductController,
  getProductByIdController,
} = require('../controllers/productController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', verifyToken, upload.single('image'), addProductController);
router.get('/', getAllProductController);
router.get('/:id', getProductByIdController);

module.exports = router;
