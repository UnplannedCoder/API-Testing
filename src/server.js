const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/CRUD_DB")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Error:", err.message));

// Product Schema and Model
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  }
});

const Product = mongoose.model("Product", productSchema);

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Welcome to Node.js CRUD Application - Version A");
});

// CREATE - Add a Product
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product Added Successfully",
      product
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ - Get All Products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ - Get Product By ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: "Invalid Product ID" });
  }
});

// UPDATE - Update a Product
app.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }

    res.status(200).json({
      message: "Product Updated Successfully",
      product
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Delete a Product
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found now"
      });
    }

    res.status(200).json({
      message: "Product Deleted Successfully now",
      product
    });
  } catch (err) {
    res.status(400).json({ error: "Invalid Product ID" });
  }
});

// Start Server After MongoDB Connects
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});