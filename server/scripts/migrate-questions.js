/**
 * Migration Script: Transfer questions from translations.js to MongoDB
 * 
 * This script reads the questions from the translations.js file and
 * inserts them into the MongoDB database with proper multilingual support.
 */

const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Path to translations.js file
const translationsPath = path.resolve(__dirname, '../../js/translations.js');

// MongoDB configuration
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cd_assessment';
// Extract database name from URI or use default
const dbName = mongoUri.split('/').pop() || 'cd_assessment';

// Function to extract questions from translations.js
async function extractQuestions() {
  try {
    // Read the translations.js file
    const fileContent = fs.readFileSync(translationsPath, 'utf8');
    
    // Use a more direct approach - create a temporary file with the full translations object
    const tempFilePath = path.resolve(__dirname, 'temp-questions.js');
    
    // Create a proper module that exports the translations object
    fs.writeFileSync(tempFilePath, `
      ${fileContent}
      module.exports = window.translations;
    `);
    
    // Temporarily define window for Node.js environment
    global.window = {};
    
    // Load the questions
    const translations = require(tempFilePath);
    
    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);
    
    return translations.questionDatabase;
  } catch (error) {
    console.error('Error extracting questions:', error);
    throw error;
  }
}

// Function to extract translations for questions
async function extractTranslations() {
  try {
    // We can reuse the same approach as extractQuestions
    // since we already have access to the full translations object
    const tempFilePath = path.resolve(__dirname, 'temp-translations.js');
    
    // Read the translations.js file
    const fileContent = fs.readFileSync(translationsPath, 'utf8');
    
    // Create a proper module that exports the translations object
    fs.writeFileSync(tempFilePath, `
      ${fileContent}
      module.exports = window.translations;
    `);
    
    // Temporarily define window for Node.js environment if not already defined
    if (!global.window) {
      global.window = {};
    }
    
    // Load the translations
    const translations = require(tempFilePath);
    
    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);
    
    return {
      en_CA: translations.ui.en_CA,
      fr_CA: translations.ui.fr_CA
    };
  } catch (error) {
    console.error('Error extracting translations:', error);
    throw error;
  }
}

// Function to transform questions into the new format with multilingual support
async function transformQuestions(questionDb, translations) {
  const transformedQuestions = [];
  
  // Process each practice area
  for (const [practiceArea, questions] of Object.entries(questionDb)) {
    // Process each question in the practice area
    for (const question of questions) {
      // Get English text from the question object
      const questionTextEn = question.text;
      
      // Try to find French translation for the question
      // First check if there are translations for this practice area and question
      const areaKey = practiceArea.replace('-', '');
      const questionId = question.id;
      
      console.log(`Processing question ${questionId} in practice area ${practiceArea}`);
      
      // Default to English text if French translation not found
      let questionTextFr = questionTextEn;
      
      // Create transformed options with multilingual support
      const transformedOptions = question.options.map((option, index) => {
        // Get English option text
        const optionTextEn = option.text;
        
        // Default French option text to English
        let optionTextFr = optionTextEn;
        
        return {
          text: {
            en_CA: optionTextEn,
            fr_CA: optionTextFr
          },
          value: option.value
        };
      });
      
      // Create the transformed question
      transformedQuestions.push({
        id: question.id,
        practiceArea,
        text: {
          en_CA: questionTextEn,
          fr_CA: questionTextFr
        },
        weight: question.weight || 1,
        options: transformedOptions,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }
  
  return transformedQuestions;
}

// Helper function to prompt for user input
function promptUser(question) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise(resolve => {
    readline.question(question, answer => {
      readline.close();
      resolve(answer);
    });
  });
}

// Main migration function
async function migrateQuestions() {
  let client;
  
  try {
    console.log('Starting question migration...');
    
    console.log(`Using MongoDB URI: ${mongoUri}`);
    console.log(`Using database: ${dbName}`);
    
    // Extract questions and translations
    const questionDb = await extractQuestions();
    console.log('Successfully extracted questions from translations.js');
    
    // Transform questions into the new format
    const transformedQuestions = await transformQuestions(questionDb, {});
    console.log(`Transformed ${transformedQuestions.length} questions with multilingual support`);
    
    // Connect to MongoDB
    client = new MongoClient(mongoUri);
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const questionsCollection = db.collection('questions');
    
    // Check if questions already exist
    const existingCount = await questionsCollection.countDocuments();
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing questions in the database.`);
      const overwrite = await promptUser('Do you want to overwrite existing questions? (yes/no): ');
      
      if (overwrite.toLowerCase() !== 'yes') {
        console.log('Migration cancelled by user.');
        return;
      }
      
      // Delete existing questions
      await questionsCollection.deleteMany({});
      console.log('Existing questions deleted.');
    }
    
    // Insert the transformed questions
    const result = await questionsCollection.insertMany(transformedQuestions);
    console.log(`Successfully migrated ${result.insertedCount} questions to MongoDB.`);
    
    // Create indexes
    await questionsCollection.createIndex({ id: 1 }, { unique: true });
    await questionsCollection.createIndex({ practiceArea: 1 });
    console.log('Created indexes on questions collection.');
    
  } catch (error) {
    console.error('Error migrating questions:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('MongoDB connection closed.');
    }
  }
}

// Run the migration
migrateQuestions().catch(console.error);
