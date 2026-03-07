const Product = require('../models/productModel');
const aiCategoryService = require('../services/aiCategoryService');

/**
 * Generate category and tags for a product
 * POST /api/category/generate
 */
const generateCategory = async (req, res) => {
  try {
    // Extract name and description from request body
    const { name, description } = req.body;

    // Validation: Check if name and description are provided
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both name and description'
      });
    }

    // Validation: Check if name and description are strings
    if (typeof name !== 'string' || typeof description !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Name and description must be strings'
      });
    }

    // Validation: Check minimum length
    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters long'
      });
    }

    if (description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Description must be at least 10 characters long'
      });
    }

    // Call AI service to generate category data
    const categoryData = await aiCategoryService.generateCategoryData(
      name.trim(),
      description.trim()
    );

    // Create new product with generated data
    const product = new Product({
      name: name.trim(),
      description: description.trim(),
      category: categoryData.category,
      sub_category: categoryData.sub_category,
      seo_tags: categoryData.seo_tags,
      sustainability_filters: categoryData.sustainability_filters
    });

    // Save to MongoDB
    const savedProduct = await product.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Category and tags generated successfully',
      data: {
        product_id: savedProduct._id,
        category: savedProduct.category,
        sub_category: savedProduct.sub_category,
        seo_tags: savedProduct.seo_tags,
        sustainability_filters: savedProduct.sustainability_filters
      }
    });

  } catch (error) {
    console.error('Error generating category:', error);

    // Return error response
    return res.status(500).json({
      success: false,
      message: 'Failed to generate category and tags',
      error: error.message
    });
  }
};

/**
 * Get all products with their categories
 * GET /api/category/products
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    console.error('Error fetching products:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

/**
 * Get product by ID
 * GET /api/category/products/:id
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Error fetching product:', error);

    // Check if error is due to invalid ID format
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

/**
 * Get available categories
 * GET /api/category/categories
 */
const getCategories = async (req, res) => {
  try {
    const categories = aiCategoryService.getPrimaryCategories();
    const sustainabilityFilters = aiCategoryService.getSustainabilityFilters();

    return res.status(200).json({
      success: true,
      data: {
        primary_categories: categories,
        sustainability_filters: sustainabilityFilters
      }
    });

  } catch (error) {
    console.error('Error fetching categories:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
};

module.exports = {
  generateCategory,
  getAllProducts,
  getProductById,
  getCategories
};

const PRIMARY_CATEGORIES = [
  "Personal Care",
  "Home & Kitchen",
  "Food & Beverage",
  "Fashion",
  "Office Supplies"
];

const SUSTAINABILITY_FILTERS = [
  "plastic-free",
  "compostable",
  "vegan",
  "recycled",
  "biodegradable",
  "organic",
  "cruelty-free",
  "fair-trade",
  "sustainable",
  "zero-waste"
];

const getPrimaryCategories = () => {
  return PRIMARY_CATEGORIES;
};

const getSustainabilityFilters = () => {
  return SUSTAINABILITY_FILTERS;
};