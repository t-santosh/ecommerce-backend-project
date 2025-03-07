const express = require('express');
const {
  userRegisterController,
  userLoginController,
  getUserProfileController,
} = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the E-Commerce API');
});
router.post('/register', userRegisterController);
router.post('/login', userLoginController);
router.get('/profile', verifyToken, verifyAdmin, getUserProfileController);

// Protected route to verify the token
router.get('/verify-token', verifyToken, (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});

module.exports = router;
