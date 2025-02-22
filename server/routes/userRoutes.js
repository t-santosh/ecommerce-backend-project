const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', (rew, res) => {
  res.send('Welcome to the E-Commerce API');
});
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
