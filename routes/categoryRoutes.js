// controllers/categoryController.js

const generateCategory = (req, res) => {
  const { name, description } = req.body;

  res.json({
    success: true,
    product: name,
    category: "Eco Products",
    tags: ["eco-friendly", "sustainable", "green"]
  });
};

const getAllProducts = (req, res) => {
  res.json({
    success: true,
    products: []
  });
};

const getProductById = (req, res) => {
  res.json({
    success: true,
    id: req.params.id
  });
};

const getCategories = (req, res) => {
  res.json({
    categories: ["Clothing", "Oral Care", "Kitchen", "Lifestyle"]
  });
};

module.exports = {
  generateCategory,
  getAllProducts,
  getProductById,
  getCategories
};