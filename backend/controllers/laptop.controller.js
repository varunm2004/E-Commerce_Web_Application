const Laptop = require('../models/laptop.model'); // Import the Laptop model

// Get all laptops
const getAllLaptops = async (req, res) => {
  try {
    const laptops = await Laptop.find(); // Fetch all laptops from MongoDB
    res.json(laptops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching laptops' });
  }
};

// Get a single laptop by ID
const getLaptopById = async (req, res) => {
  const { id } = req.params;
  try {
    const laptop = await Laptop.findById(id); // Fetch laptop by ID
    if (!laptop) {
      return res.status(404).json({ message: 'Laptop not found' });
    }
    res.json(laptop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching laptop' });
  }
};

// Add a new laptop
const addLaptop = async (req, res) => {
  const { name, description, price, brand } = req.body;
  try {
    const newLaptop = new Laptop({
      name,
      description,
      price,
      brand
    });
    await newLaptop.save(); // Save the new laptop to MongoDB
    res.status(201).json(newLaptop); // Return the newly created laptop
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding laptop' });
  }
};

// Update a laptop by ID
const updateLaptop = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, brand } = req.body;
  try {
    const updatedLaptop = await Laptop.findByIdAndUpdate(
      id,
      { name, description, price, brand },
      { new: true } // Return the updated laptop
    );
    if (!updatedLaptop) {
      return res.status(404).json({ message: 'Laptop not found' });
    }
    res.json(updatedLaptop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating laptop' });
  }
};

// Delete a laptop by ID
const deleteLaptop = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLaptop = await Laptop.findByIdAndDelete(id); // Delete laptop by ID
    if (!deletedLaptop) {
      return res.status(404).json({ message: 'Laptop not found' });
    }
    res.json({ message: 'Laptop deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting laptop' });
  }
};

module.exports = {
  getAllLaptops,
  getLaptopById,
  addLaptop,
  updateLaptop,
  deleteLaptop
};
