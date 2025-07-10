/**
 * Authentication Middleware
 * Handles JWT verification and user authentication
 */
const jwt = require('jsonwebtoken');

// Get JWT secret from environment or use a default for development
const JWT_SECRET = process.env.JWT_SECRET || 'cd_assessment_default_secret_key';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '24h';

/**
 * Generate a JWT token for a user
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
function generateToken(user) {
  // Create payload with user ID and role
  const payload = {
    userId: user._id.toString(),
    username: user.username,
    role: user.role
  };
  
  // Sign and return token
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

/**
 * Middleware to verify JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function authenticateToken(req, res, next) {
  // Get token from Authorization header or cookie
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1] || req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. No token provided.' 
    });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid or expired token.' 
    });
  }
}

/**
 * Middleware to check if user has required role
 * @param {string|Array} roles - Required role(s)
 * @returns {Function} Middleware function
 */
function authorizeRole(roles) {
  // Convert single role to array
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  
  return (req, res, next) => {
    // Check if user exists and has required role
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. Not authenticated.' 
      });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Insufficient permissions.' 
      });
    }
    
    next();
  };
}

/**
 * Optional authentication middleware
 * Attaches user to request if token is valid, but doesn't require it
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function optionalAuth(req, res, next) {
  // Get token from Authorization header or cookie
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1] || req.cookies.token;
  
  if (!token) {
    // No token, continue as anonymous
    req.user = null;
    return next();
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    // Invalid token, continue as anonymous
    req.user = null;
  }
  
  next();
}

module.exports = {
  generateToken,
  authenticateToken,
  authorizeRole,
  optionalAuth
};
