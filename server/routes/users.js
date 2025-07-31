/**
 * User Management Routes
 * Handles CRUD operations for users (admin only)
 */
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const userModel = require('../models/user');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Admin roles that can manage users
const ADMIN_ROLES = ['sysAdmin', 'assessment_admin'];

/**
 * @route GET /api/users
 * @desc Get all users with pagination
 * @access Admin only
 */
router.get('/', authenticateToken, authorizeRole(ADMIN_ROLES), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    // Get filter parameters
    const filter = {};
    if (req.query.role) {
      filter.role = req.query.role;
    }
    if (req.query.search) {
      filter.$or = [
        { username: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    const result = await userModel.listUsers(req.app.locals.db, page, limit, filter);
    
    res.json({
      success: true,
      users: result.users,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('Error listing users:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error retrieving users' 
    });
  }
});

/**
 * @route GET /api/users/:id
 * @desc Get user by ID
 * @access Admin only
 */
router.get('/:id', authenticateToken, authorizeRole(ADMIN_ROLES), async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const user = await userModel.findUserById(req.app.locals.db, userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error retrieving user' 
    });
  }
});

/**
 * @route POST /api/users
 * @desc Create a new user (admin only)
 * @access Admin only
 */
router.post('/', authenticateToken, authorizeRole(ADMIN_ROLES), async (req, res) => {
  try {
    const { username, email, password, role, groups } = req.body;
    
    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username, email and password are required' 
      });
    }
    
    // Only sysAdmin can create admin users
    if (role === 'sysAdmin' && req.user.role !== 'sysAdmin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only system administrators can create system administrator accounts' 
      });
    }
    
    const user = await userModel.createUser(req.app.locals.db, {
      username,
      email,
      password,
      role,
      groups
    });
    
    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

/**
 * @route PUT /api/users/:id
 * @desc Update user
 * @access Admin only
 */
router.put('/:id', authenticateToken, authorizeRole(ADMIN_ROLES), async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const { username, email, password, role, groups } = req.body;
    
    // Get current user data to check role
    const currentUser = await userModel.findUserById(req.app.locals.db, userId);
    if (!currentUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // Only sysAdmin can modify sysAdmin users or change roles to sysAdmin
    if ((currentUser.role === 'sysAdmin' || role === 'sysAdmin') && req.user.role !== 'sysAdmin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only system administrators can modify system administrator accounts' 
      });
    }
    
    // Update user
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (role) updateData.role = role;
    if (groups) updateData.groups = groups;
    
    const updatedUser = await userModel.updateUser(req.app.locals.db, userId, updateData);
    
    res.json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

/**
 * @route DELETE /api/users/:id
 * @desc Delete user
 * @access Admin only
 */
router.delete('/:id', authenticateToken, authorizeRole(ADMIN_ROLES), async (req, res) => {
  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user ID format' 
      });
    }
    
    const userId = new ObjectId(req.params.id);
    
    // Get current user data to check role
    const currentUser = await userModel.findUserById(req.app.locals.db, userId);
    if (!currentUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // Only sysAdmin can delete sysAdmin users
    if (currentUser.role === 'sysAdmin' && req.user.role !== 'sysAdmin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only system administrators can delete system administrator accounts' 
      });
    }
    
    // Prevent deleting yourself
    if (userId.toString() === req.user.userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'You cannot delete your own account' 
      });
    }
    
    const deleted = await userModel.deleteUser(req.app.locals.db, userId);
    
    if (!deleted) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found or could not be deleted' 
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error deleting user' 
    });
  }
});

module.exports = router;
