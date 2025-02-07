require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

// Import routes
const laptopRoutes = require('./routes/laptop.routes'); // Ensure your routes are in a separate file

// Initialize app
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://varunmenon2004:India2025@e-commercewebsitecluste.f7h7s.mongodb.net/?retryWrites=true&w=majority&appName=E-CommerceWebsiteCluster";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Use laptop routes for handling CRUD operations
app.use('/api/laptops', laptopRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Laptop E-Commerce Backend API is running');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

