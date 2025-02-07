const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/laptop-shop';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected...');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
