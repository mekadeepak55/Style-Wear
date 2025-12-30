// server.js - Backend Code
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow Frontend to connect
app.use(express.json()); // Allow JSON data

// 1. CONNECT TO MONGODB (Database)
// "myntraDB" is the name of your database
mongoose.connect('mongodb://127.0.0.1:27017/myntraDB')
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.log("❌ Connection Error:", err));

// 2. CREATE A SCHEMA (Table Structure)
const ProductSchema = new mongoose.Schema({
    id: Number,
    name: String,
    brand: String,
    price: Number,
    image: String,
    category: String
});

const Product = mongoose.model('Product', ProductSchema);

// 3. API ROUTES (Endpoints)

// Route A: Get All Products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find(); // Find all items in DB
        res.json(products);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Route B: Add a Dummy Product (Test)
app.post('/api/add-product', async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// 4. START SERVER
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});