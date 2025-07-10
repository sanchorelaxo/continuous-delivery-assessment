/**
 * MongoDB Configuration
 * 
 * This file provides configuration settings for MongoDB connection.
 * Settings can be overridden using environment variables.
 * Feature can be toggled using ENABLE_MONGODB environment variable.
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  // Feature flag to enable/disable MongoDB integration
  enabled: process.env.ENABLE_MONGODB === 'true',
  // MongoDB connection URI
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/cd_assessment',
  
  // Database options
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  
  // Collection names
  collections: {
    assessments: 'assessments',
    users: 'users',
    groups: 'groups'
  },
  
  // Index configurations
  indexes: {
    assessments: [
      { key: { timestamp: -1 }, name: 'timestamp_desc' },
      { key: { 'results.overall.maturityLevel': 1 }, name: 'overall_maturity_level' }
    ]
  }
};
