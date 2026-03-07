# Rayeva AI Auto-Category & Tag Generator

A production-ready Node.js backend API for AI-powered product categorization and tag generation.

## Project Overview

This project implements **Module 1: AI Auto-Category & Tag Generator** for an assignment. It provides an Express.js API that accepts product names and descriptions, automatically assigns categories, suggests sub-categories, generates SEO tags, and recommends sustainability filters.

### Features

- **Auto Category Detection**: Automatically assigns products to predefined primary categories
- **Sub-Category Suggestion**: Recommends appropriate sub-categories based on product details
- **SEO Tag Generation**: Generates 5-10 relevant SEO tags for each product
- **Sustainability Filters**: Suggests eco-friendly filters (plastic-free, vegan, compostable, etc.)
- **MongoDB Storage**: Persists all generated data to MongoDB
- **Logging**: Records all AI prompts and responses for debugging

## Architecture

```
rayeva-ai-assignment/
├── controllers/          # Request handling and response formatting
│   └── categoryController.js
├── services/            # Business logic and AI simulation
│   └── aiCategoryService.js
├── models/              # MongoDB schemas
│   └── productModel.js
├── routes/              # API route definitions
│   └── categoryRoutes.js
├── logs/                # Log files
│   └── promptLogs.txt
├── server.js            # Application entry point
├── .env                 # Environment variables
├── .gitignore           # Git ignore rules
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher) - Local or Atlas

## Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Edit the `.env` file and update the MongoDB connection string:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/rayeva_ai_assignment
   ```

4. **Start MongoDB**
   
   Ensure MongoDB is running. On Windows:
   ```bash
   net start MongoDB
   ```
   
   Or use MongoDB Compass/Atlas and update the connection string in `.env`.

5. **Start the server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`

## API Endpoints

### 1. Generate Category and Tags

**POST** `/api/category/generate`

Generate category, sub-category, SEO tags, and sustainability filters for a product.

**Request Body:**
```json
{
  "name": "Bamboo Toothbrush",
  "description": "Eco-friendly bamboo toothbrush with charcoal bristles. Plastic-free and biodegradable handle. Perfect for sustainable oral care."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Category and tags generated successfully",
  "data": {
    "product_id": "507f1f77bcf86cd799439011",
    "category": "Personal Care",
    "sub_category": "Oral Care",
    "seo_tags": [
      "bamboo",
      "toothbrush",
      "personal care",
      "oral care",
      "eco friendly bamboo toothbrush",
      "plastic-free toothbrush"
    ],
    "sustainability_filters": [
      "plastic-free",
      "biodegradable",
      "vegan"
    ]
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Please provide both name and description"
}
```

### 2. Get All Products

**GET** `/api/category/products`

Retrieve all products with their generated categories and tags.

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Bamboo Toothbrush",
      "description": "Eco-friendly bamboo toothbrush...",
      "category": "Personal Care",
      "sub_category": "Oral Care",
      "seo_tags": ["bamboo", "toothbrush"],
      "sustainability_filters": ["plastic-free", "biodegradable"],
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 3. Get Product by ID

**GET** `/api/category/products/:id`

Retrieve a specific product by its ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Bamboo Toothbrush",
    "description": "Eco-friendly bamboo toothbrush...",
    "category": "Personal Care",
    "sub_category": "Oral Care",
    "seo_tags": ["bamboo", "toothbrush"],
    "sustainability_filters": ["plastic-free", "biodegradable"]
  }
}
```

### 4. Get Available Categories

**GET** `/api/category/categories`

Get list of all available primary categories and sustainability filters.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "primary_categories": [
      "Personal Care",
      "Home & Kitchen",
      "Food & Beverage",
      "Fashion",
      "Office Supplies"
    ],
    "sustainability_filters": [
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
    ]
  }
}
```

### 5. Health Check

**GET** `/`

Check if the server is running.

**Response (200):**
```json
{
  "success": true,
  "message": "Rayeva AI Auto-Category & Tag Generator API",
  "version": "1.0.0",
  "status": "running"
}
```

## Primary Categories

The system supports the following primary categories:

1. **Personal Care** - Oral Care, Skincare, Hair Care, Body Care, etc.
2. **Home & Kitchen** - Cookware, Kitchen Appliances, Storage, Cleaning, etc.
3. **Food & Beverage** - Snacks, Beverages, Supplements, Organic Foods, etc.
4. **Fashion** - Clothing, Footwear, Accessories, Jewelry, Bags, etc.
5. **Office Supplies** - Writing Tools, Paper Products, Desk Accessories, etc.

## Sustainability Filters

Available sustainability filters:

- plastic-free
- compostable
- vegan
- recycled
- biodegradable
- organic
- cruelty-free
- fair-trade
- sustainable
- zero-waste

## Testing with cURL

```bash
# Generate category and tags
curl -X POST http://localhost:3000/api/category/generate \
  -H "Content-Type: application/json" \
  -d '{"name": "Bamboo Toothbrush", "description": "Eco-friendly bamboo toothbrush with charcoal bristles. Plastic-free and biodegradable handle."}'

# Get all products
curl http://localhost:3000/api/category/products

# Get available categories
curl http://localhost:3000/api/category/categories
```

## Testing with Postman

1. Open Postman
2. Create a new POST request
3. Enter URL: `http://localhost:3000/api/category/generate`
4. Go to **Body** tab, select **raw** and **JSON**
5. Enter the JSON payload:
   ```json
   {
     "name": "Bamboo Toothbrush",
     "description": "Eco-friendly bamboo toothbrush with charcoal bristles. Plastic-free and biodegradable handle."
   }
   ```
6. Click **Send**

## Logging

All AI prompts and responses are logged to:
```
logs/promptLogs.txt
```

Each log entry includes:
- Timestamp
- Input prompt (product name and description)
- Generated output (category, sub-category, SEO tags, sustainability filters)

## Error Handling

The API handles various error scenarios:

- **400 Bad Request**: Invalid input (missing name/description, invalid length)
- **404 Not Found**: Product not found
- **500 Internal Server Error**: Server or database errors

## Future Enhancements

For production use with real AI, you can integrate external AI APIs:

1. Update `aiCategoryService.js` to call an AI API (OpenAI, Claude, etc.)
2. Add your API key to `.env`
3. The current rule-based system can be replaced with actual AI calls

## License

ISC

## Author

Created as an assignment project for Rayeva AI Systems.

## AI Model

This project uses Ollama with the Llama3 model running locally
to generate product categories, SEO tags, and sustainability filters.

Because the model runs locally, Ollama must be installed and
the Llama3 model must be pulled before running the API.


1. Install Ollama
2. Run: ollama run llama3
3. Start the backend: node server.js