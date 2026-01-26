const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout for Atlas
      socketTimeoutMS: 45000, // Keep connection alive
    });

    console.log('='.repeat(50));
    console.log('✅ SUCCESS: MongoDB Atlas Connected!');
    console.log(`📡 Host: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log('='.repeat(50));
    
    return conn;
  } catch (error) {
    console.error('='.repeat(50));
    console.error('❌ FAILED: MongoDB connection error!');
    console.error(`Error: ${error.message}`);
    console.log('');
    console.log('🔧 MongoDB Atlas Troubleshooting:');
    console.log('1. Check your connection string in .env file');
    console.log('2. Make sure your IP is whitelisted in MongoDB Atlas');
    console.log('3. Verify database user credentials');
    console.log('4. Check network connectivity');
    console.log('');
    console.log('📋 Your connection string should look like:');
    console.log('mongodb+srv://USERNAME:PASSWORD@cluster0.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority');
    console.log('='.repeat(50));
    
    process.exit(1);
  }
};

module.exports = connectDB;