const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const messages = require('../utils/messages');
const { registerUser } = require('../api/userApi');
require('dotenv').config();

// User register controller
const registerUserController = async (req, res) => {
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
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: messages.USER_INVALID_CREDENTIALS });
    }
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: '1hr',
    });
    res.json({ message: messages.USER_LOGIN_SUCCESS, token });
  } catch (error) {
    res.status(500).json({ error: messages.USER_LOGIN_FAILED });
  }
};

module.exports = { registerUserController, loginUserController };
