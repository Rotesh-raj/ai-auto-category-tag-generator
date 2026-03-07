const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * Category Routes
 * Base path: /api/category
 */

/**
 * POST /api/category/generate
 * Generate category and tags for a product
 * Body: { name: string, description: string }
 */
router.post('/generate', categoryController.generateCategory);

/**
 * GET /api/category/products
 * Get all products with their categories
 */
router.get('/products', categoryController.getAllProducts);

/**
 * GET /api/category/products/:id
 * Get a specific product by ID
 */
router.get('/products/:id', categoryController.getProductById);

/**
 * GET /api/category/categories
 * Get available primary categories and sustainability filters
 */
router.get('/categories', categoryController.getCategories);

module.exports = router;

