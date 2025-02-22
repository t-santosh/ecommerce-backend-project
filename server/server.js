require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('E-commerce API is running...');
});

// Connect to MySQL database
db.authenticate()
  .then(() => console.log('MySQL database connected...'))
  .catch((err) => console.log('Error: ' + err));

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
