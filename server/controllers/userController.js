const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const messages = require('../utils/messages');
require('dotenv').config();

// User register controller
const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: messages.USER_REGISTERED_SUCCESS, user });
  } catch (error) {
    res.status(500).json({ error: messages.USER_REGISTER_FAILED });
  }
};

// User login controller
const loginUser = async (req, res) => {
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

module.exports = { registerUser, loginUser };
