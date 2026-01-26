const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  console.log('🧪 Testing MongoDB Atlas Connection...');
  console.log('Connection string:', process.env.MONGODB_URI.replace(/\/\/(.*):(.*)@/, '//USERNAME:PASSWORD@'));
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    
    // List databases
    const adminDb = mongoose.connection.db.admin();
    const databases = await adminDb.listDatabases();
    console.log('📦 Available databases:');
    databases.databases.forEach(db => {
      console.log(`   - ${db.name} (${db.sizeOnDisk} bytes)`);
    });
    
    // Create test collection
    const testCollection = mongoose.connection.db.collection('test_connection');
    await testCollection.insertOne({
      test: 'MongoDB Atlas connection successful',
      timestamp: new Date(),
      project: 'Career Portal'
    });
    
    console.log('✅ Test document inserted successfully');
    
    // Count documents
    const count = await testCollection.countDocuments();
    console.log(`📊 Documents in test_connection: ${count}`);
    
    // Clean up
    await testCollection.drop();
    console.log('🧹 Test collection cleaned up');
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.log('\n🔧 Common solutions:');
    console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
    console.log('2. Verify username/password in connection string');
    console.log('3. Make sure database user has correct privileges');
    console.log('4. Check internet connection');
  }
}

testConnection();