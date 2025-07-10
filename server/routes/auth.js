/**
 * Authentication Routes
 * Handles user registration, login, and session management
 */
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const userModel = require('../models/user');
const { generateToken, authenticateToken } = require('../middleware/auth');

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide username, email and password' 
      });
    }
    
    // Create user with default role (assessment_user)
    const user = await userModel.createUser(req.app.locals.db, {
      username,
      email,
      password
    });
    
    // Generate token
    const token = generateToken(user);
    
    // Set token as cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

/**
 * @route POST /api/auth/login
 * @desc Login user and return token
 * @access Public
 */
router.post('/login', async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    
    console.log('Login attempt for:', usernameOrEmail);
    
    if (!usernameOrEmail || !password) {
      console.log('Missing username/email or password');
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide username/email and password' 
      });
    }
    
    // Find user by username or email
    console.log('Searching for user in database...');
    const user = await userModel.findUserByCredentials(req.app.locals.db, usernameOrEmail);
    
    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    console.log('User found:', user.username, 'with role:', user.role);
    
    // Verify password
    console.log('Verifying password...');
    const isPasswordValid = await userModel.verifyPassword(password, user.password);
    
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('Password verification failed');
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    // Update last login time
    await userModel.updateLastLogin(req.app.locals.db, user._id);
    
    // Generate token
    const token = generateToken(user);
    
    // Set token as cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

/**
 * @route GET /api/auth/me
 * @desc Get current user profile
 * @access Private
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userId = new ObjectId(req.user.userId);
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
    console.error('Error getting user profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error retrieving user profile' 
    });
  }
});

/**
 * @route POST /api/auth/logout
 * @desc Logout user and clear cookie
 * @access Public
 */
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
});

/**
 * @route POST /api/auth/validate
 * @desc Validate token and return user info
 * @access Public
 */
router.post('/validate', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = router;
