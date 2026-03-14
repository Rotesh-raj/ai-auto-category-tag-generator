require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Import routes
const categoryRoutes = require('./routes/categoryRoutes');

console.log("Category routes loaded");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Rayeva AI Auto-Category & Tag Generator API',
    version: '1.0.0',
    status: 'running'
  });
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/category', categoryRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Get port from environment or use default
const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rayeva_ai_assignment';
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✓ MongoDB connected successfully');

    // Start the server
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ API available at http://localhost:${PORT}/api/category`);
      console.log('\nAvailable endpoints:');
      console.log('  POST   /api/category/generate  - Generate category and tags');
      console.log('  GET    /api/category/products  - Get all products');
      console.log('  GET    /api/category/products/:id - Get product by ID');
      console.log('  GET    /api/category/categories - Get available categories');
    });

  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    console.log('\nPlease make sure:');
    console.log('  1. MongoDB is running locally');
    console.log('  2. The connection string in .env is correct');
    console.log('\nYou can start MongoDB with:');
    console.log('  - Windows: net start MongoDB');
    console.log('  - Or use MongoDB Compass/Atlas');
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  mongoose.connection.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  mongoose.connection.close(() => {
    process.exit(1);
  });
});

// Start the server
startServer();

module.exports = app;

