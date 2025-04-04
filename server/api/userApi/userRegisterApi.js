const bcrypt = require('bcryptjs');
const { User } = require('../../models');

// Register new user
const registerUser = async (userData) => {
  const { first_name, last_name, email, password } = userData;

  // Check if all required fields are provided
  if (!first_name || !last_name || !email || !password) {
    throw new Error('All fields are required!');
  }

  // Checkk if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists!');
  }

  // Check if this is the first user
  const userCount = await User.count();
  const isAdmin = userCount === 0;

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user in the database
  const newUser = await User.create({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    isAdmin,
  });

  return {
    id: newUser.id,
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
  };
};

module.exports = { registerUser };
