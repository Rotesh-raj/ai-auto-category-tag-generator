const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

// POST /api/category/generate
router.post("/generate", categoryController.generateCategory);

// GET /api/category/products
router.get("/products", categoryController.getAllProducts);

// GET /api/category/products/:id
router.get("/products/:id", categoryController.getProductById);

// GET /api/category/categories
router.get("/categories", categoryController.getCategories);

module.exports = router;