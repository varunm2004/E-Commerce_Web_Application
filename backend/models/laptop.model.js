const mongoose = require('mongoose');

// Laptop schema
const laptopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    inCart: { type: Boolean, default: false },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export Laptop model
const Laptop = mongoose.model('Laptop', laptopSchema);

module.exports = Laptop;
