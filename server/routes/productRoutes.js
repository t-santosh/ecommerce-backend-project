const express = require('express');
const {
  addProductController,
  getAllProductController,
} = require('../controllers/productController');

const router = express.Router();

router.post('/', addProductController);
router.get('/', getAllProductController);

module.exports = router;
