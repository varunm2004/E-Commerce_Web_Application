const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// app initialized
const app = express();
const PORT = 3000;

// middleware
app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect('mongodb://localhost:E-Commerce_Web_Application/Laptop-Shop', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// MongoDB Schema and Model
const LaptopSchema = new mongoose.Schema({
    name: String,
    price: Number,
    inCart: { type: Boolean, default: false },
});

const Laptop = mongoose.model('Laptop', LaptopSchema);

// routes
app.get('/laptops', async (req, res) => {
    const laptops = await Laptop.find();
    res.json(laptops);
});

app.post('/laptops', async (req, res) => {
    const newLaptop = new Laptop(req.body);
    await newLaptop.save();
    res.status(201).json(newLaptop);
});

app.put('/laptops/:id', async (req, res) => {
    const { id } = req.params;
    const updatedLaptop = await Laptop.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedLaptop);
});

app.delete('/laptops/:id', async (req, res) => {
    const { id } = req.params;
    await Laptop.findByIdAndDelete(id);
    res.status(204).end();
});

// start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
