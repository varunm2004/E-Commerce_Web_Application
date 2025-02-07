const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Ensure that MongoDB client is connected
const mongoURI = process.env.MONGO_URI;
let db;
MongoClient.connect(mongoURI, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db();
  })
  .catch((error) => console.error('Error connecting to MongoDB', error));

// CRUD Routes

// Get all laptops
router.get('/', async (req, res) => {
  try {
    const laptops = await db.collection('laptops').find().toArray();
    res.json(laptops);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching laptops', error: err });
  }
});

// Add new laptop
router.post('/', async (req, res) => {
  try {
    const newLaptop = req.body;
    const result = await db.collection('laptops').insertOne(newLaptop);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error adding laptop', error: err });
  }
});

// Update laptop details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLaptop = req.body;
    const result = await db.collection('laptops').updateOne(
      { _id: new require('mongodb').ObjectId(id) },
      { $set: updatedLaptop }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error updating laptop', error: err });
  }
});

// Delete laptop
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection('laptops').deleteOne({ _id: new require('mongodb').ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Laptop not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting laptop', error: err });
  }
});

module.exports = router;
