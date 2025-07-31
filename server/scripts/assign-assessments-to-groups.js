/**
 * Script to retroactively assign existing assessments to groups
 * This script will create a default group and assign all existing assessments to it
 */

const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const mongoConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/continuous-delivery-assessment',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};

async function assignAssessmentsToGroups() {
  let client;
  
  try {
    console.log('Connecting to MongoDB...');
    client = await MongoClient.connect(mongoConfig.uri, mongoConfig.options);
    const db = client.db();
    
    const groupsCollection = db.collection('groups');
    const assessmentsCollection = db.collection('assessments');
    
    // Check if there are any existing groups
    const existingGroups = await groupsCollection.find({}).toArray();
    console.log(`Found ${existingGroups.length} existing groups`);
    
    // Get all existing assessments
    const assessments = await assessmentsCollection.find({}).toArray();
    console.log(`Found ${assessments.length} existing assessments`);
    
    if (assessments.length === 0) {
      console.log('No assessments found. Nothing to assign.');
      return;
    }
    
    let defaultGroup;
    
    // Check if there's already a default group
    defaultGroup = await groupsCollection.findOne({ name: 'Default Group' });
    
    if (!defaultGroup) {
      // Create a default group
      console.log('Creating default group...');
      const groupData = {
        name: 'Default Group',
        description: 'Default group for existing assessments',
        members: [], // Will be populated with users who have assessments
        assessments: [], // Will be populated with all existing assessments
        createdBy: 'system',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await groupsCollection.insertOne(groupData);
      defaultGroup = { ...groupData, _id: result.insertedId };
      console.log('Default group created with ID:', result.insertedId);
    } else {
      console.log('Default group already exists with ID:', defaultGroup._id);
    }
    
    // Get all unique user IDs from assessments (for users who have submitted assessments)
    const userIds = [...new Set(assessments
      .filter(assessment => assessment.userId) // Only include assessments with userId
      .map(assessment => assessment.userId))];
    
    console.log(`Found ${userIds.length} unique users with assessments`);
    
    // Get all assessment IDs
    const assessmentIds = assessments.map(assessment => assessment._id.toString());
    
    // Update the default group with all assessments and users
    const updateData = {
      assessments: assessmentIds,
      members: userIds,
      updatedAt: new Date()
    };
    
    await groupsCollection.updateOne(
      { _id: defaultGroup._id },
      { $set: updateData }
    );
    
    console.log(`Successfully assigned ${assessmentIds.length} assessments to default group`);
    console.log(`Successfully assigned ${userIds.length} users to default group`);
    
    // Display summary
    console.log('\\n=== ASSIGNMENT SUMMARY ===');
    console.log(`Default Group ID: ${defaultGroup._id}`);
    console.log(`Assessments assigned: ${assessmentIds.length}`);
    console.log(`Users assigned: ${userIds.length}`);
    console.log('\\nUsers can now access all existing assessments through the Default Group');
    
  } catch (error) {
    console.error('Error assigning assessments to groups:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
      console.log('\\nMongoDB connection closed');
    }
  }
}

// Run the script
if (require.main === module) {
  assignAssessmentsToGroups()
    .then(() => {
      console.log('\\nAssignment completed successfully!');
      process.exit(0);
    })
    .catch(err => {
      console.error('Failed to assign assessments to groups:', err);
      process.exit(1);
    });
}

module.exports = { assignAssessmentsToGroups };
