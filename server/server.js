require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('E-commerce API is running...');
});

app.use('/api', userRoutes);
app.use('/api/products', productRoutes);

// Connect to MySQL database
db.authenticate()
  .then(() => console.log('MySQL database connected...'))
  .catch((err) => console.log('Error: ' + err));

// Handling errors for routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
