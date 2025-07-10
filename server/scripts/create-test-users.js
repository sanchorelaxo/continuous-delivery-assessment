/**
 * Script to create test users in MongoDB
 * Creates two users:
 * 1. adminOne - with sysAdmin role
 * 2. testTwo - with regular assessment_user role
 * Both with password: rogmod123
 */

const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: '../../.env' });

// MongoDB connection string
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cd_assessment';

async function createTestUsers() {
  let client;
  
  try {
    // Connect to MongoDB
    client = new MongoClient(mongoUri);
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const usersCollection = db.collection('users');
    
    // Check if users already exist
    const existingAdmin = await usersCollection.findOne({ username: 'adminOne' });
    const existingUser = await usersCollection.findOne({ username: 'testTwo' });
    
    if (existingAdmin) {
      console.log('Admin user "adminOne" already exists');
    } else {
      // Create admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('rogmod123', salt);
      
      const adminUser = {
        username: 'adminOne',
        email: 'admin.one@example.com',
        password: hashedPassword,
        role: 'sysAdmin',
        createdAt: new Date(),
        lastLogin: null,
        groups: []
      };
      
      const result = await usersCollection.insertOne(adminUser);
      console.log(`Admin user created with ID: ${result.insertedId}`);
    }
    
    if (existingUser) {
      console.log('Regular user "testTwo" already exists');
    } else {
      // Create regular user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('rogmod123', salt);
      
      const regularUser = {
        username: 'testTwo',
        email: 'test.two@example.com',
        password: hashedPassword,
        role: 'assessment_user',
        createdAt: new Date(),
        lastLogin: null,
        groups: []
      };
      
      const result = await usersCollection.insertOne(regularUser);
      console.log(`Regular user created with ID: ${result.insertedId}`);
    }
    
    console.log('Test users creation completed');
  } catch (error) {
    console.error('Error creating test users:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Run the function
createTestUsers();
