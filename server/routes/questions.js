/**
 * Question Routes
 * API endpoints for managing assessment questions
 */

const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const questionModel = require('../models/question');

// Get all questions (public)
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    if (!db) {
      return res.status(503).json({
        success: false,
        error: 'Database connection not available',
        connection_error: true
      });
    }

    const practiceArea = req.query.practiceArea;
    const includeInactive = req.query.includeInactive === 'true';
    
    const questions = await questionModel.getQuestions(db, {
      practiceArea,
      activeOnly: !includeInactive
    });

    // Group questions by practice area for easier frontend consumption
    const groupedQuestions = questions.reduce((acc, question) => {
      if (!acc[question.practiceArea]) {
        acc[question.practiceArea] = [];
      }
      acc[question.practiceArea].push(question);
      return acc;
    }, {});

    res.json({
      success: true,
      data: groupedQuestions
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'An error occurred while fetching questions'
    });
  }
});

// Get a specific question by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    if (!db) {
      return res.status(503).json({
        success: false,
        error: 'Database connection not available',
        connection_error: true
      });
    }

    const question = await questionModel.getQuestionById(db, req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        error: 'Question not found'
      });
    }

    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'An error occurred while fetching the question'
    });
  }
});

// Create a new question (admin only)
router.post('/', authenticateToken, authorizeRole(['sysAdmin', 'assessment_admin']), async (req, res) => {
  try {
    const db = req.app.locals.db;
    if (!db) {
      return res.status(503).json({
        success: false,
        error: 'Database connection not available',
        connection_error: true
      });
    }

    // Check if question with same ID already exists
    const existingQuestion = await questionModel.getQuestionById(db, req.body.id);
    if (existingQuestion) {
      return res.status(409).json({
        success: false,
        error: 'A question with this ID already exists'
      });
    }

    const question = await questionModel.createQuestion(db, req.body);
    
    res.status(201).json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'An error occurred while creating the question'
    });
  }
});

// Update a question (admin only)
router.put('/:id', authenticateToken, authorizeRole(['sysAdmin', 'assessment_admin']), async (req, res) => {
  try {
    const db = req.app.locals.db;
    if (!db) {
      return res.status(503).json({
        success: false,
        error: 'Database connection not available',
        connection_error: true
      });
    }

    const updatedQuestion = await questionModel.updateQuestion(db, req.params.id, req.body);
    
    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        error: 'Question not found'
      });
    }

    res.json({
      success: true,
      data: updatedQuestion
    });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'An error occurred while updating the question'
    });
  }
});

// Delete a question (admin only)
router.delete('/:id', authenticateToken, authorizeRole(['sysAdmin']), async (req, res) => {
  try {
    const db = req.app.locals.db;
    if (!db) {
      return res.status(503).json({
        success: false,
        error: 'Database connection not available',
        connection_error: true
      });
    }

    const deleted = await questionModel.deleteQuestion(db, req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Question not found'
      });
    }

    res.json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'An error occurred while deleting the question'
    });
  }
});

module.exports = router;
