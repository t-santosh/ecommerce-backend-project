const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const messages = require('../utils/messages');
const { registerUser } = require('../api/userApi/userRegisterApi');
require('dotenv').config();

// User register controller
const userRegisterController = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Call the handler to register the user
    const user = await registerUser({ first_name, last_name, email, password });

    // Send response
    res.status(201).json({ message: messages.USER_REGISTERED_SUCCESS, user });
  } catch (error) {
    // Check the error message
    if (error.message === 'User already exists!') {
      return res
        .status(400)
        .json({ message: messages.USER_ALREADY_REGISTERED });
    }
    res.status(500).json({ message: messages.USER_REGISTER_FAILED });
  }
};

// User login controller
const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: messages.USER_INVALID_CREDENTIALS });
    }
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, jwtSecret, {
      expiresIn: '1hr',
    });
    res.json({
      message: messages.USER_LOGIN_SUCCESS,
      token,
      // Including the user data in response
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ message: messages.USER_LOGIN_FAILED });
  }
};

// User profile controller
const getUserProfileController = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'first_name', 'last_name', 'email', 'isAdmin'],
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      user: user,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  userRegisterController,
  userLoginController,
  getUserProfileController,
};
