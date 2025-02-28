const express = require('express');
const {
  registerUserController,
  loginUserController,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the E-Commerce API');
});
router.post('/register', registerUserController);
router.post('/login', loginUserController);

module.exports = router;
