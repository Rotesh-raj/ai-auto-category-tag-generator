const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Ollama API endpoint
const OLLAMA_URL = "http://localhost:11434/api/generate";

/* ---------------- CATEGORY DATA ---------------- */

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

/* ---------------- LOGGING ---------------- */

const logToFile = (prompt, response) => {
  try {
    const timestamp = new Date().toISOString();

    const logEntry = `
=== ${timestamp} ===
PROMPT:
${prompt}

RESPONSE:
${JSON.stringify(response, null, 2)}

`;

    const logPath = path.join(__dirname, "..", "logs", "promptLogs.txt");

    fs.appendFileSync(logPath, logEntry);
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
};

/* ---------------- AI CATEGORY GENERATION ---------------- */

const generateCategoryData = async (name, description) => {

  const prompt = `
You are an AI assistant for sustainable e-commerce product cataloging.

Analyze the product and return ONLY valid JSON.

Product Name: ${name}
Description: ${description}

Choose ONE category from:
Personal Care
Home & Kitchen
Food & Beverage
Fashion
Office Supplies

Return JSON exactly like this:

{
 "category": "",
 "sub_category": "",
 "seo_tags": [],
 "sustainability_filters": []
}

Rules:
- seo_tags must contain 5-10 SEO keywords
- sustainability_filters should include eco labels like:
plastic-free, compostable, vegan, recycled, biodegradable,
organic, cruelty-free, fair-trade, sustainable, zero-waste
`;

  try {

    const response = await axios.post(OLLAMA_URL, {
      model: "llama3",
      prompt: prompt,
      stream: false
    });

    const aiText = response.data.response;

    const jsonStart = aiText.indexOf("{");
    const jsonEnd = aiText.lastIndexOf("}") + 1;

    const jsonString = aiText.substring(jsonStart, jsonEnd);

    let parsed;

    try {
      parsed = JSON.parse(jsonString);
    } catch {
      throw new Error("Invalid JSON returned from Ollama");
    }

    // Ensure arrays exist
    parsed.seo_tags = parsed.seo_tags || [];
    parsed.sustainability_filters = parsed.sustainability_filters || [];

    // Ensure SEO tags between 5–10
    if (parsed.seo_tags.length < 5) {
      parsed.seo_tags.push(
        "eco friendly product",
        "sustainable product",
        "green product"
      );
    }

    parsed.seo_tags = parsed.seo_tags.slice(0, 10);

    // Ensure at least one sustainability filter
    if (parsed.sustainability_filters.length === 0) {
      parsed.sustainability_filters.push("sustainable");
    }

    logToFile(prompt, parsed);

    return parsed;

  } catch (error) {

    console.error("Ollama Error:", error.message);

    const fallback = {
      category: "Personal Care",
      sub_category: "General",
      seo_tags: [
        "eco friendly product",
        "sustainable product",
        "green product",
        "natural product",
        "eco item"
      ],
      sustainability_filters: ["sustainable"]
    };

    logToFile(prompt, fallback);

    return fallback;
  }
};

/* ---------------- HELPER FUNCTIONS ---------------- */

const getPrimaryCategories = () => {
  return PRIMARY_CATEGORIES;
};

const getSustainabilityFilters = () => {
  return SUSTAINABILITY_FILTERS;
};

/* ---------------- EXPORTS ---------------- */

module.exports = {
  generateCategoryData,
  getPrimaryCategories,
  getSustainabilityFilters
};