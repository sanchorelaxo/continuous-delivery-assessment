/**
 * Continuous Delivery Assessment Server
 * Handles MongoDB integration for assessment data storage and user authentication
 */

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoConfig = require('./config/mongodb');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const questionRoutes = require('./routes/questions');
const groupRoutes = require('./routes/groups');

// Import auth middleware
const { authenticateToken, optionalAuth } = require('./middleware/auth');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the project root directory
app.use(express.static('./'));

// MongoDB connection
let db = null;
let client = null;

// Connect to MongoDB if enabled
if (mongoConfig.enabled) {
  console.log('Attempting to connect to MongoDB...');
  MongoClient.connect(mongoConfig.uri, mongoConfig.options)
    .then(mongoClient => {
      console.log('Connected to MongoDB successfully');
      client = mongoClient; // Store client in the outer scope
      db = client.db();
      
      // Make db available to route handlers
      app.locals.db = db;
      app.locals.client = client; // Make client available to route handlers
      
      // Create indexes for better performance
      db.collection('assessments').createIndex({ timestamp: -1 })
        .then(() => console.log('Created timestamp index'))
        .catch(err => console.warn('Could not create timestamp index:', err));
      
      db.collection('assessments').createIndex({ userId: 1 })
        .then(() => console.log('Created userId index'))
        .catch(err => console.warn('Could not create userId index:', err));
        
      // Create indexes for users collection
      db.collection('users').createIndex({ username: 1 }, { unique: true })
        .then(() => console.log('Created username index'))
        .catch(err => console.warn('Could not create username index:', err));
        
      db.collection('users').createIndex({ email: 1 }, { unique: true })
        .then(() => console.log('Created email index'))
        .catch(err => console.warn('Could not create email index:', err));
        
      // Create default admin user if it doesn't exist
      const adminUsername = process.env.ADMIN_USERNAME || 'admin';
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      
      db.collection('users').findOne({ role: 'sysAdmin' })
        .then(admin => {
          if (!admin) {
            const bcrypt = require('bcrypt');
            bcrypt.hash(adminPassword, 10)
              .then(hashedPassword => {
                db.collection('users').insertOne({
                  username: adminUsername,
                  email: adminEmail,
                  password: hashedPassword,
                  role: 'sysAdmin',
                  createdAt: new Date(),
                  lastLogin: null,
                  groups: []
                });
                console.log('Created default admin user');
                if (adminPassword === 'admin123') {
                  console.warn('WARNING: Using default admin password. Change it immediately!');
                }
              })
              .catch(err => console.warn('Could not create default admin:', err));
          }
        })
        .catch(err => console.warn('Could not check for admin user:', err));
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB:', err);
      console.log('Server will continue running without MongoDB support');
    });
} else {
  console.log('MongoDB integration is disabled via feature flag');
}

/**
 * Standardize assessment results to ensure a consistent data structure
 * @param {Object} results - Assessment results to standardize
 * @returns {Object} - Standardized results object
 */
function standardizeResults(results) {
  // Handle null or undefined results
  if (!results) {
    console.warn('Results object is null or undefined, creating default structure');
    results = {};
  }
  
  // Define practice areas that should be present in all assessments
  const practiceAreas = [
    'buildManagement', 'environments', 'releaseManagement', 'testing',
    'dataManagement', 'configurationManagement', 'applicationArchitecture', 'observability'
  ];
  
  // Create a standardized results object
  const standardized = { ...results };
  
  // Ensure overall exists with required properties
  if (!standardized.overall) {
    standardized.overall = {
      maturityLevel: 0,
      rawScore: 0,
      maxPossibleScore: 0,
      normalizedScore: 0
    };
  } else {
    // Ensure all required properties exist
    standardized.overall.maturityLevel = standardized.overall.maturityLevel || 0;
    standardized.overall.rawScore = standardized.overall.rawScore || 0;
    standardized.overall.maxPossibleScore = standardized.overall.maxPossibleScore || 0;
    standardized.overall.normalizedScore = standardized.overall.normalizedScore || 0;
  }
  
  // Ensure each practice area exists with required properties
  practiceAreas.forEach(area => {
    if (!standardized[area]) {
      standardized[area] = {
        maturityLevel: 0,
        rawScore: 0,
        maxPossibleScore: 0,
        normalizedScore: 0
      };
    } else {
      // Ensure all required properties exist
      standardized[area].maturityLevel = standardized[area].maturityLevel || 0;
      standardized[area].rawScore = standardized[area].rawScore || 0;
      standardized[area].maxPossibleScore = standardized[area].maxPossibleScore || 0;
      standardized[area].normalizedScore = standardized[area].normalizedScore || 0;
    }
  });
  
  // If we have the old practiceAreas structure, migrate it to the new format
  if (standardized.practiceAreas) {
    Object.keys(standardized.practiceAreas).forEach(oldArea => {
      // Map old practice area names to new ones if needed
      const newArea = oldArea.replace(/\s+/g, '');
      if (!standardized[newArea] && standardized.practiceAreas[oldArea]) {
        standardized[newArea] = standardized.practiceAreas[oldArea];
      }
    });
  }
  
  return standardized;
}

// MongoDB API endpoints (available regardless of MongoDB status, but will handle disabled state)
// Save assessment data to MongoDB (optional authentication)
app.post('/api/save-assessment', optionalAuth, async (req, res) => {
  try {
    // Check if MongoDB integration is enabled
    if (!mongoConfig.enabled) {
      return res.status(200).json({ 
        success: false, 
        message: 'MongoDB integration is disabled via feature flag',
        feature_disabled: true
      });
    }
    
    // Check if database connection is established
    if (!db) {
      console.error('Database connection not established, but feature flag is enabled');
      return res.status(200).json({ 
        success: false, 
        message: 'Database connection not available',
        connection_error: true
      });
    }
    
    const collection = db.collection('assessments');
    
    // Standardize assessment data structure
    const assessmentData = {
      // Ensure responses exists
      responses: req.body.responses || {},
      
      // Standardize results structure
      results: standardizeResults(req.body.results),
      
      // Timestamps
      timestamp: new Date(),
      createdAt: new Date(),
      
      // Metadata with defaults
      metadata: req.body.metadata || {},
      
      // Default user information
      userId: 'anonymous',
      username: 'Anonymous User',
      userRole: 'anonymous',
      groupIds: []
    };
    
    // If user is authenticated, override with user information and get their groups
    if (req.user) {
      assessmentData.userId = req.user.userId;
      assessmentData.username = req.user.username;
      assessmentData.userRole = req.user.role;
      
      // Get user's groups from the groups collection
      try {
        const groupsCollection = db.collection('groups');
        const userGroups = await groupsCollection.find({ 
          members: { $in: [req.user.userId] } 
        }).toArray();
        assessmentData.groupIds = userGroups.map(group => group._id.toString());
      } catch (error) {
        console.warn('Error fetching user groups for assessment:', error);
        assessmentData.groupIds = [];
      }
    } else if (req.body.userId) {
      // For backward compatibility
      assessmentData.userId = req.body.userId;
      if (req.body.username) assessmentData.username = req.body.username;
    }
    
    const result = await collection.insertOne(assessmentData);
    
    // Add the assessment to the user's groups
    if (assessmentData.groupIds && assessmentData.groupIds.length > 0) {
      try {
        const groupsCollection = db.collection('groups');
        await groupsCollection.updateMany(
          { _id: { $in: assessmentData.groupIds.map(id => new ObjectId(id)) } },
          { 
            $addToSet: { assessments: result.insertedId.toString() },
            $set: { updatedAt: new Date() }
          }
        );
      } catch (error) {
        console.warn('Error adding assessment to groups:', error);
        // Don't fail the assessment creation if group update fails
      }
    }
    
    res.json({ 
      success: true, 
      id: result.insertedId,
      isAuthenticated: !!req.user,
      assignedToGroups: assessmentData.groupIds.length
    });
  } catch (error) {
    console.error('Error saving assessment:', error);
    // Return a 200 status with error details instead of 500
    // This allows the client to handle the error gracefully
    res.status(200).json({ 
      success: false, 
      error: error.message,
      connection_error: true
    });
  }
});

// Get a specific assessment by ID (optional authentication)
app.get('/api/assessment/:id', optionalAuth, async (req, res) => {
  try {
    // Check if MongoDB integration is enabled
    if (!mongoConfig.enabled) {
      return res.status(200).json({ 
        success: false, 
        message: 'MongoDB integration is disabled via feature flag',
        feature_disabled: true
      });
    }
    
    // Check if database connection is established
    if (!db) {
      console.error('Database connection not established, but feature flag is enabled');
      return res.status(200).json({ 
        success: false, 
        message: 'Database connection not available',
        connection_error: true
      });
    }
    
    // Validate MongoDB ObjectId
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid assessment ID format'
      });
    }
    
    const collection = db.collection('assessments');
    const assessment = await collection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!assessment) {
      return res.status(404).json({ 
        success: false, 
        error: 'Assessment not found' 
      });
    }
    
    // Check if user has permission to view this assessment
    // Users can view their own assessments
    // Admins can view any assessment
    // Anonymous assessments can be viewed by anyone
    const user = req.user;
    const isOwner = user && assessment.userId && assessment.userId === user.id;
    const isAdmin = user && (user.role === 'sysAdmin' || user.role === 'assessment_admin');
    const isAnonymous = !assessment.userId;
    
    if (!isAnonymous && !isOwner && !isAdmin) {
      return res.status(403).json({ 
        success: false, 
        error: 'You do not have permission to view this assessment'
      });
    }
    
    // Format dates for display
    const createdAt = assessment.createdAt || assessment.timestamp;
    const formattedDate = new Date(createdAt).toLocaleString();
    
    // Standardize the assessment data structure
    const standardizedResults = standardizeResults(assessment.results);
    
    // Format the assessment with additional info and standardized structure
    const formattedAssessment = {
      ...assessment,
      formattedDate,
      // Ensure consistent data structure
      results: standardizedResults,
      responses: assessment.responses || {},
      metadata: assessment.metadata || {},
      userId: assessment.userId || 'anonymous',
      username: assessment.username || 'Anonymous User',
      userRole: assessment.userRole || 'anonymous',
      groupIds: assessment.groupIds || [],
      // Add user display info if available
      userInfo: assessment.username ? {
        username: assessment.username,
        role: assessment.userRole || 'assessment_user'
      } : null
    };
    
    res.json({
      success: true,
      data: formattedAssessment
    });
  } catch (error) {
    console.error('Error retrieving assessment:', error);
    res.status(200).json({ 
      success: false, 
      error: error.message,
      connection_error: true
    });
  }
});

// Get all assessments (with pagination) - optional authentication
app.get('/api/assessments', optionalAuth, async (req, res) => {
  try {
    // Check if MongoDB integration is enabled
    if (!mongoConfig.enabled) {
      return res.status(200).json({ 
        success: false, 
        message: 'MongoDB integration is disabled via feature flag',
        feature_disabled: true,
        data: {
          assessments: [],
          pagination: { total: 0, page: 1, limit: 10, pages: 0 }
        }
      });
    }
    
    // Check if database connection is established
    if (!db) {
      console.error('Database connection not established, but feature flag is enabled');
      return res.status(200).json({ 
        success: false, 
        message: 'Database connection not available',
        connection_error: true,
        data: {
          assessments: [],
          pagination: { total: 0, page: 1, limit: 10, pages: 0 }
        }
      });
    }
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchTerm = req.query.search || '';
    const userOnly = req.query.userOnly === 'true';
    
    // Build query filter
    let filter = {};
    
    // If userOnly is true and user is authenticated, filter by userId
    if (userOnly && req.user) {
      // Check both possible user ID fields to ensure compatibility
      filter.$or = [
        { userId: req.user.id },
        { userId: req.user.userId },
        { userId: req.user._id }
      ];
    }
    
    // If search term is provided, add text search
    if (searchTerm) {
      // Create a text index if it doesn't exist
      try {
        await db.collection('assessments').createIndex({ 
          name: "text", 
          "metadata.organization": "text", 
          "metadata.team": "text", 
          "metadata.project": "text",
          "metadata.notes": "text"
        });
      } catch (indexError) {
        console.log('Index may already exist or could not be created:', indexError.message);
      }
      
      filter.$text = { $search: searchTerm };
    }
    
    const collection = db.collection('assessments');
    const assessments = await collection.find(filter)
      .sort({ timestamp: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    const total = await collection.countDocuments(filter);
    
    // Format dates and add user information
    const formattedAssessments = assessments.map(assessment => {
      // Format dates for display
      const createdAt = assessment.createdAt || assessment.timestamp;
      const formattedDate = new Date(createdAt).toLocaleString();
      
      return {
        ...assessment,
        formattedDate,
        // Add user display info if available
        userInfo: assessment.username ? {
          username: assessment.username,
          role: assessment.userRole || 'assessment_user'
        } : null
      };
    });
    
    res.json({
      success: true,
      data: {
        assessments: formattedAssessments,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error retrieving assessments:', error);
    res.status(200).json({ 
      success: false, 
      error: error.message,
      connection_error: true,
      data: {
        assessments: [],
        pagination: { total: 0, page: 1, limit: 10, pages: 0 }
      }
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    features: {
      mongodb: mongoConfig.enabled
    },
    connections: {
      mongodb: mongoConfig.enabled && db !== null
    }
  });
});

// Start server
async function startServer() {
  // MongoDB connection is now handled earlier in the code
  
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`MongoDB integration is ${mongoConfig.enabled ? 'ENABLED' : 'DISABLED'}`);
  });

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
    process.exit(0);
  });
}

// DELETE endpoint for removing an assessment by ID (requires authentication)
app.delete('/api/assessment/:id', authenticateToken, async (req, res) => {
  try {
    // Check if MongoDB integration is enabled
    if (!mongoConfig.enabled) {
      return res.status(200).json({ 
        success: false, 
        error: 'MongoDB integration is disabled',
        feature_disabled: true
      });
    }
    
    if (!client || !db) {
      return res.status(200).json({ 
        success: false, 
        error: 'Database connection not available',
        connection_error: true
      });
    }
    
    // Get user from JWT token
    const user = req.user;
    
    // Check if user is authenticated
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Authentication required',
        auth_required: true
      });
    }
    
    const assessmentId = req.params.id;
    
    // Validate MongoDB ObjectId
    if (!ObjectId.isValid(assessmentId)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid assessment ID format'
      });
    }
    
    const collection = db.collection('assessments');
    
    // First, get the assessment to check ownership
    const assessment = await collection.findOne({ _id: new ObjectId(assessmentId) });
    
    if (!assessment) {
      return res.status(404).json({ 
        success: false, 
        error: 'Assessment not found'
      });
    }
    
    // Check if user has permission to delete this assessment
    // Users can delete their own assessments
    // Admins can delete any assessment
    const isOwner = assessment.userId && assessment.userId === user.id;
    const isAdmin = user.role === 'sysAdmin' || user.role === 'assessment_admin';
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ 
        success: false, 
        error: 'You do not have permission to delete this assessment'
      });
    }
    
    // Delete the assessment
    const result = await collection.deleteOne({ _id: new ObjectId(assessmentId) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Assessment not found or already deleted'
      });
    }
    
    res.json({
      success: true,
      message: 'Assessment deleted successfully',
      id: assessmentId
    });
  } catch (error) {
    console.error('Error deleting assessment:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'An error occurred while deleting the assessment'
    });
  }
});

// Compare multiple assessments endpoint
app.post('/api/assessments/compare', optionalAuth, async (req, res) => {
  try {
    // Check if MongoDB integration is enabled
    if (!mongoConfig.enabled) {
      return res.status(200).json({ 
        success: false, 
        message: 'MongoDB integration is disabled via feature flag',
        feature_disabled: true
      });
    }
    
    if (!db) {
      return res.status(200).json({ 
        success: false, 
        message: 'Database connection not available',
        connection_error: true
      });
    }
    
    // Get assessment IDs from request body
    const { assessmentIds } = req.body;
    
    if (!assessmentIds || !Array.isArray(assessmentIds) || assessmentIds.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Assessment IDs array is required'
      });
    }
    
    // Validate all IDs are valid ObjectIds
    const validIds = assessmentIds.filter(id => ObjectId.isValid(id));
    
    if (validIds.length !== assessmentIds.length) {
      return res.status(400).json({ 
        success: false, 
        error: 'One or more invalid assessment IDs provided'
      });
    }
    
    // Convert string IDs to ObjectId
    const objectIds = validIds.map(id => new ObjectId(id));
    
    // Fetch all assessments
    const collection = db.collection('assessments');
    const assessments = await collection.find({ _id: { $in: objectIds } }).toArray();
    
    if (assessments.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'No assessments found with the provided IDs'
      });
    }
    
    // Check permissions - user can only compare assessments they own or anonymous ones
    // unless they are an admin
    if (req.user) {
      const isAdmin = req.user.role === 'sysAdmin' || req.user.role === 'assessment_admin';
      
      if (!isAdmin) {
        const unauthorized = assessments.some(assessment => {
          // If assessment has a userId and it's not the current user's ID
          return assessment.userId && assessment.userId !== 'anonymous' && assessment.userId !== req.user.userId;
        });
        
        if (unauthorized) {
          return res.status(403).json({ 
            success: false, 
            error: 'You do not have permission to access one or more of these assessments'
          });
        }
      }
    }
    
    // Generate comparison data
    const comparisonData = {
      labels: [],
      datasets: []
    };
    
    // Define standard colors for consistency
    const standardColors = [
      'rgba(255, 99, 132, 0.7)',   // Red
      'rgba(54, 162, 235, 0.7)',    // Blue
      'rgba(255, 206, 86, 0.7)',    // Yellow
      'rgba(75, 192, 192, 0.7)',    // Green
      'rgba(153, 102, 255, 0.7)',   // Purple
      'rgba(255, 159, 64, 0.7)',    // Orange
      'rgba(199, 199, 199, 0.7)',   // Gray
      'rgba(83, 102, 255, 0.7)',    // Indigo
      'rgba(255, 99, 255, 0.7)',    // Pink
      'rgba(99, 255, 132, 0.7)'     // Mint
    ];
    
    // Define standard practice areas
    const practiceAreas = [
      'buildManagement', 'environments', 'releaseManagement', 'testing',
      'dataManagement', 'configurationManagement', 'applicationArchitecture', 'observability'
    ];
    
    // Format practice area labels for display
    const formattedLabels = practiceAreas.map(area => {
      return area.replace(/([A-Z])/g, ' $1').trim();
    });
    
    // Set labels for the radar chart
    comparisonData.labels = formattedLabels;
    
    // Create a dataset for each assessment
    assessments.forEach((assessment, index) => {
      const color = standardColors[index % standardColors.length];
      // Set border color with 75% transparency (0.75)
      const borderColor = color.replace('0.7', '0.75');
      
      // Format date for display
      const date = assessment.createdAt || assessment.timestamp;
      const formattedDate = new Date(date).toLocaleDateString();
      
      // Create label with date and metadata if available
      let label = `Assessment ${index + 1} (${formattedDate})`;
      if (assessment.metadata && assessment.metadata.project) {
        label = `${assessment.metadata.project} (${formattedDate})`;
      }
      
      const dataset = {
        label,
        backgroundColor: 'transparent', // Make background transparent
        borderColor,
        borderWidth: 2, // Slightly thicker lines
        pointBackgroundColor: borderColor,
        pointRadius: 3, // Make points more visible
        pointHoverRadius: 5,
        fill: false, // Don't fill the area
        data: []
      };
      
      // Fill in maturity levels for each practice area
      practiceAreas.forEach(area => {
        const value = assessment.results && 
                     assessment.results[area] && 
                     typeof assessment.results[area].maturityLevel === 'number' ? 
                     assessment.results[area].maturityLevel : 0;
        dataset.data.push(value);
      });
      
      comparisonData.datasets.push(dataset);
    });
    
    res.json({
      success: true,
      data: {
        comparisonData,
        assessments: assessments.map(a => {
          // Format the date properly
          const timestamp = a.createdAt || a.timestamp;
          const date = timestamp ? new Date(timestamp) : null;
          const formattedDate = date && !isNaN(date.getTime()) ? 
            `${date.toLocaleDateString()} ${date.toLocaleTimeString()}` : 'Unknown Date';
          
          // Extract metadata with detailed logging
          console.log('Processing assessment for comparison:', {
            id: a._id,
            timestamp,
            metadata: a.metadata,
            user: a.user
          });
          
          return {
            id: a._id,
            date: timestamp,
            formattedDate,
            name: a.metadata?.title || a.metadata?.project || a.name || 
              // Generate a descriptive title if none exists
              `Assessment for ${a.user?.username || a.metadata?.username || a.username || 'Anonymous'} (${new Date(timestamp).toLocaleDateString()})`,
            username: a.user?.username || a.metadata?.username || a.username || 'Anonymous',
            metadata: a.metadata || {},
            results: a.results || {}, // Include the full results object
            responses: a.responses || {} // Include responses for potential recalculation
          };
        })
      }
    });
  } catch (error) {
    console.error('Error comparing assessments:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'An error occurred while comparing assessments'
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/groups', groupRoutes);

startServer().catch(console.error);
