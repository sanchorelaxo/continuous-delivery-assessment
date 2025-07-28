/**
 * Question Model
 * Defines the schema and methods for assessment questions
 */

const { ObjectId } = require('mongodb');

/**
 * Question schema definition
 * @typedef {Object} Question
 * @property {ObjectId} _id - MongoDB ObjectId
 * @property {string} id - Question identifier (e.g., "BM1")
 * @property {string} practiceArea - Practice area this question belongs to (e.g., "buildManagement")
 * @property {Object} text - Question text in different languages
 * @property {string} text.en_CA - English question text
 * @property {string} text.fr_CA - French question text (optional)
 * @property {number} weight - Question weight (1-3)
 * @property {Array<Option>} options - Answer options
 * @property {boolean} active - Whether the question is active
 * @property {Date} createdAt - When the question was created
 * @property {Date} updatedAt - When the question was last updated
 */

/**
 * Option schema definition
 * @typedef {Object} Option
 * @property {Object} text - Option text in different languages
 * @property {string} text.en_CA - English option text
 * @property {string} text.fr_CA - French option text (optional)
 * @property {number} value - Option value/maturity level (-1 to 3)
 */

/**
 * Create a new question
 * @param {import('mongodb').Db} db - MongoDB database instance
 * @param {Question} questionData - Question data
 * @returns {Promise<Object>} - Created question
 */
async function createQuestion(db, questionData) {
  // Ensure required fields
  if (!questionData.id || !questionData.practiceArea || !questionData.text || !questionData.options) {
    throw new Error('Missing required question fields');
  }

  // Set timestamps
  const now = new Date();
  const question = {
    ...questionData,
    active: questionData.active !== false, // Default to active
    createdAt: now,
    updatedAt: now
  };

  const result = await db.collection('questions').insertOne(question);
  return { ...question, _id: result.insertedId };
}

/**
 * Get all questions, optionally filtered by practice area
 * @param {import('mongodb').Db} db - MongoDB database instance
 * @param {Object} options - Query options
 * @param {string} [options.practiceArea] - Filter by practice area
 * @param {boolean} [options.activeOnly=true] - Only return active questions
 * @returns {Promise<Array<Question>>} - Array of questions
 */
async function getQuestions(db, { practiceArea, activeOnly = true } = {}) {
  const query = {};
  
  if (practiceArea) {
    query.practiceArea = practiceArea;
  }
  
  if (activeOnly) {
    query.active = true;
  }
  
  return db.collection('questions').find(query).sort({ practiceArea: 1, id: 1 }).toArray();
}

/**
 * Get a question by ID
 * @param {import('mongodb').Db} db - MongoDB database instance
 * @param {string} id - Question ID
 * @returns {Promise<Question|null>} - Question or null if not found
 */
async function getQuestionById(db, id) {
  return db.collection('questions').findOne({ id });
}

/**
 * Update a question
 * @param {import('mongodb').Db} db - MongoDB database instance
 * @param {string} id - Question ID
 * @param {Partial<Question>} updates - Fields to update
 * @returns {Promise<Question|null>} - Updated question or null if not found
 */
async function updateQuestion(db, id, updates) {
  // Don't allow updating the ID
  const { id: _, _id: __, ...validUpdates } = updates;
  
  // Set updated timestamp
  validUpdates.updatedAt = new Date();
  
  const result = await db.collection('questions').findOneAndUpdate(
    { id },
    { $set: validUpdates },
    { returnDocument: 'after' }
  );
  
  // In MongoDB driver 6.x with returnDocument: 'after', the document is returned directly
  // If result is null, the document wasn't found
  return result || null;
}

/**
 * Delete a question
 * @param {import('mongodb').Db} db - MongoDB database instance
 * @param {string} id - Question ID
 * @returns {Promise<boolean>} - True if deleted, false if not found
 */
async function deleteQuestion(db, id) {
  const result = await db.collection('questions').deleteOne({ id });
  return result.deletedCount > 0;
}

module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion
};
