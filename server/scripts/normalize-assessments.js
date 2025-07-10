/**
 * Normalize Assessment Data Structure
 * 
 * This script normalizes all existing assessments in MongoDB to ensure they follow
 * a consistent data structure, regardless of whether they were submitted by
 * authenticated users or not.
 */

const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config({ path: '../../.env' });

// MongoDB connection settings
const mongoConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  dbName: process.env.MONGODB_DB_NAME || 'cd_assessment',
  enabled: process.env.ENABLE_MONGODB !== 'false'
};

// Standard assessment structure
const standardizeAssessment = (assessment) => {
  // Ensure basic structure exists
  if (!assessment.results) assessment.results = {};
  if (!assessment.responses) assessment.responses = {};
  
  // Ensure results has the expected structure with practice areas
  const practiceAreas = [
    'buildManagement', 'environments', 'releaseManagement', 'testing',
    'dataManagement', 'configurationManagement', 'applicationArchitecture', 'observability'
  ];
  
  // Initialize overall if it doesn't exist
  if (!assessment.results.overall) {
    assessment.results.overall = { maturityLevel: 0, rawScore: 0, maxPossibleScore: 0, normalizedScore: 0 };
  }
  
  // Initialize each practice area if it doesn't exist
  practiceAreas.forEach(area => {
    if (!assessment.results[area]) {
      assessment.results[area] = { maturityLevel: 0, rawScore: 0, maxPossibleScore: 0, normalizedScore: 0 };
    }
  });
  
  // Ensure user information is standardized
  if (!assessment.userId) assessment.userId = 'anonymous';
  if (!assessment.username) assessment.username = 'Anonymous User';
  
  // Ensure timestamps are present
  if (!assessment.timestamp) assessment.timestamp = new Date();
  if (!assessment.createdAt) assessment.createdAt = assessment.timestamp;
  
  // Ensure metadata exists
  if (!assessment.metadata) assessment.metadata = {};
  
  return assessment;
};

// Connect to MongoDB and normalize assessments
async function normalizeAssessments() {
  if (!mongoConfig.enabled) {
    console.log('MongoDB integration is disabled via feature flag');
    return;
  }
  
  let client;
  
  try {
    // Connect to MongoDB
    client = new MongoClient(mongoConfig.uri, { useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(mongoConfig.dbName);
    const collection = db.collection('assessments');
    
    // Get all assessments
    const assessments = await collection.find({}).toArray();
    console.log(`Found ${assessments.length} assessments to normalize`);
    
    // Process each assessment
    let updatedCount = 0;
    for (const assessment of assessments) {
      const normalizedAssessment = standardizeAssessment(assessment);
      
      // Update the assessment in the database
      const result = await collection.updateOne(
        { _id: assessment._id },
        { $set: normalizedAssessment }
      );
      
      if (result.modifiedCount > 0) {
        updatedCount++;
      }
    }
    
    console.log(`Successfully normalized ${updatedCount} assessments`);
    
  } catch (error) {
    console.error('Error normalizing assessments:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Run the normalization
normalizeAssessments()
  .then(() => console.log('Assessment normalization complete'))
  .catch(err => console.error('Failed to normalize assessments:', err));
