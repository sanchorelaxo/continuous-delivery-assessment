/**
 * User Model
 * Defines the schema and methods for user authentication
 */
const bcrypt = require('bcrypt');

/**
 * User schema definition
 * @typedef {Object} User
 * @property {string} username - Unique username
 * @property {string} email - Unique email address
 * @property {string} password - Hashed password
 * @property {string} role - User role (user, admin, sysAdmin)
 * @property {Date} createdAt - Account creation timestamp
 * @property {Date} lastLogin - Last login timestamp
 * @property {Array} groups - Groups the user belongs to
 */

/**
 * Create a new user
 * @param {Object} db - MongoDB database connection
 * @param {Object} userData - User data to create
 * @returns {Promise<Object>} - Created user object (without password)
 */
async function createUser(db, userData) {
  // Validate required fields
  if (!userData.username || !userData.email || !userData.password) {
    throw new Error('Username, email and password are required');
  }
  
  const collection = db.collection('users');
  
  // Check if username or email already exists
  const existingUser = await collection.findOne({
    $or: [
      { username: userData.username },
      { email: userData.email }
    ]
  });
  
  if (existingUser) {
    throw new Error('Username or email already exists');
  }
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  // Create user object
  const newUser = {
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
    role: userData.role || 'assessment_user', // Default role
    createdAt: new Date(),
    lastLogin: null,
    groups: userData.groups || []
  };
  
  // Insert user into database
  const result = await collection.insertOne(newUser);
  
  // Return user without password
  const { password, ...userWithoutPassword } = newUser;
  userWithoutPassword._id = result.insertedId;
  
  return userWithoutPassword;
}

/**
 * Find user by ID
 * @param {Object} db - MongoDB database connection
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - User object (without password)
 */
async function findUserById(db, userId) {
  const collection = db.collection('users');
  const user = await collection.findOne({ _id: userId });
  
  if (!user) {
    return null;
  }
  
  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Find user by username or email
 * @param {Object} db - MongoDB database connection
 * @param {string} usernameOrEmail - Username or email
 * @returns {Promise<Object>} - User object (with password for verification)
 */
async function findUserByCredentials(db, usernameOrEmail) {
  const collection = db.collection('users');
  return collection.findOne({
    $or: [
      { username: usernameOrEmail },
      { email: usernameOrEmail }
    ]
  });
}

/**
 * Update user's last login time
 * @param {Object} db - MongoDB database connection
 * @param {string} userId - User ID
 * @returns {Promise<void>}
 */
async function updateLastLogin(db, userId) {
  const collection = db.collection('users');
  await collection.updateOne(
    { _id: userId },
    { $set: { lastLogin: new Date() } }
  );
}

/**
 * Verify password against stored hash
 * @param {string} password - Plain text password to verify
 * @param {string} hashedPassword - Stored hashed password
 * @returns {Promise<boolean>} - True if password matches
 */
async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Update user
 * @param {Object} db - MongoDB database connection
 * @param {string} userId - User ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} - Updated user object (without password)
 */
async function updateUser(db, userId, updateData) {
  const collection = db.collection('users');
  
  // Don't allow updating username or email to existing values
  if (updateData.username || updateData.email) {
    const existingUser = await collection.findOne({
      $and: [
        { _id: { $ne: userId } },
        { $or: [
          updateData.username ? { username: updateData.username } : {},
          updateData.email ? { email: updateData.email } : {}
        ]}
      ]
    });
    
    if (existingUser) {
      throw new Error('Username or email already exists');
    }
  }
  
  // Hash password if provided
  if (updateData.password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(updateData.password, salt);
  }
  
  // Update user
  await collection.updateOne(
    { _id: userId },
    { $set: updateData }
  );
  
  // Return updated user
  return findUserById(db, userId);
}

/**
 * Delete user
 * @param {Object} db - MongoDB database connection
 * @param {string} userId - User ID
 * @returns {Promise<boolean>} - True if user was deleted
 */
async function deleteUser(db, userId) {
  const collection = db.collection('users');
  const result = await collection.deleteOne({ _id: userId });
  return result.deletedCount === 1;
}

/**
 * List users with pagination
 * @param {Object} db - MongoDB database connection
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Number of users per page
 * @param {Object} filter - Filter criteria
 * @returns {Promise<Object>} - Paginated users and metadata
 */
async function listUsers(db, page = 1, limit = 10, filter = {}) {
  const collection = db.collection('users');
  
  // Calculate skip value for pagination
  const skip = (page - 1) * limit;
  
  // Get users without passwords
  const users = await collection.find(filter)
    .project({ password: 0 })
    .skip(skip)
    .limit(limit)
    .toArray();
  
  // Get total count for pagination
  const total = await collection.countDocuments(filter);
  
  return {
    users,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
}

module.exports = {
  createUser,
  findUserById,
  findUserByCredentials,
  updateLastLogin,
  verifyPassword,
  updateUser,
  deleteUser,
  listUsers
};
