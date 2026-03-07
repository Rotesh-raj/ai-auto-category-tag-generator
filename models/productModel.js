const mongoose = require('mongoose');

/**
 * Product Schema for storing AI-generated category and tag data
 * Stores product information along with AI-generated classifications
 */
const productSchema = new mongoose.Schema({
  // Original product input
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },

  // AI-generated category data
  category: {
    type: String,
    required: true,
    enum: [
      'Personal Care',
      'Home & Kitchen',
      'Food & Beverage',
      'Fashion',
      'Office Supplies'
    ]
  },
  sub_category: {
    type: String,
    required: true,
    trim: true
  },
  seo_tags: [{
    type: String,
    trim: true
  }],
  sustainability_filters: [{
    type: String,
    trim: true
  }],

  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
productSchema.index({ category: 1 });
productSchema.index({ createdAt: -1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

