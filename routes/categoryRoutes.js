// controllers/categoryController.js

/**
 * Generate AI Category and Tags
 * POST /api/category/generate
 */
const generateCategory = (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate input
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Product name and description are required"
      });
    }

    // Simulated AI response
    const category = "Eco Products";
    const tags = ["eco-friendly", "sustainable", "green"];

    res.status(200).json({
      success: true,
      product: name,
      description: description,
      category,
      tags
    });

  } catch (error) {
    console.error("Generate Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate category"
    });
  }
};


/**
 * Get all products
 * GET /api/category/products
 */
const getAllProducts = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      products: []
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
};


/**
 * Get product by ID
 * GET /api/category/products/:id
 */
const getProductById = (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({
      success: true,
      id
    });
  } catch (error) {
    console.error("Get Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product"
    });
  }
};


/**
 * Get available categories
 * GET /api/category/categories
 */
const getCategories = (req, res) => {
  try {
    const categories = [
      "Clothing",
      "Oral Care",
      "Kitchen",
      "Lifestyle",
      "Eco Products"
    ];

    res.status(200).json({
      success: true,
      categories
    });

  } catch (error) {
    console.error("Get Categories Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch categories"
    });
  }
};


module.exports = {
  generateCategory,
  getAllProducts,
  getProductById,
  getCategories
};