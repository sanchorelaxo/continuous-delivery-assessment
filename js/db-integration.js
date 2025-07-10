/**
 * MongoDB Integration for Continuous Delivery Assessment
 * Client-side module to interact with MongoDB via API
 */

// Initialize the DB integration namespace
window.dbIntegration = {};

/**
 * Standardize assessment results to ensure a consistent data structure
 * @param {Object} results - Assessment results to standardize
 * @returns {Object} - Standardized results object
 */
window.dbIntegration.standardizeResults = function(results) {
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
};

/**
 * Assessment history functions
 */
window.assessmentHistory = {
    /**
     * Get assessment history for the current user
     * @param {number} page - Page number (default: 1)
     * @param {number} limit - Results per page (default: 10)
     * @param {string} searchTerm - Optional search term to filter assessments
     * @returns {Promise<Object>} - Promise resolving to the assessment history data
     */
    getUserHistory: async function(page = 1, limit = 10, searchTerm = '') {
        // Ensure user is authenticated
        if (!window.authService || !window.authService.isAuthenticated()) {
            return {
                success: false,
                error: 'User not authenticated',
                auth_required: true
            };
        }
        
        try {
            // Build query parameters
            let queryParams = `page=${page}&limit=${limit}&userOnly=true`;
            if (searchTerm) {
                queryParams += `&search=${encodeURIComponent(searchTerm)}`;
            }
            
            // Set up headers for authentication
            const headers = {};
            const token = window.authService.getToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            // Fetch user's assessment history
            const response = await fetch(`/api/assessments?${queryParams}`, {
                headers: headers,
                credentials: 'include'
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error fetching assessment history:', errorData);
                return {
                    success: false,
                    error: errorData.message || 'Failed to fetch assessment history'
                };
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error retrieving assessment history:', error);
            return {
                success: false,
                error: error.message,
                clientError: true,
                assessments: [],
                pagination: { total: 0, page, limit, pages: 0 }
            };
        }
    },
    
    /**
     * Delete an assessment by ID
     * @param {string} assessmentId - ID of the assessment to delete
     * @returns {Promise<Object>} - Promise resolving to the deletion result
     */
    deleteAssessment: async function(assessmentId) {
        // Ensure user is authenticated
        if (!window.authService || !window.authService.isAuthenticated()) {
            return {
                success: false,
                error: 'User not authenticated',
                auth_required: true
            };
        }
        
        try {
            // Set up headers for authentication
            const headers = {
                'Content-Type': 'application/json'
            };
            const token = window.authService.getToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            // Send delete request
            const response = await fetch(`/api/assessment/${assessmentId}`, {
                method: 'DELETE',
                headers: headers,
                credentials: 'include'
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error deleting assessment:', errorData);
                return {
                    success: false,
                    error: errorData.message || 'Failed to delete assessment'
                };
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting assessment:', error);
            return {
                success: false,
                error: error.message,
                clientError: true
            };
        }
    },
    
    /**
     * Compare multiple assessments
     * @param {Array<string>} assessmentIds - Array of assessment IDs to compare
     * @returns {Promise<Object>} - Promise resolving to the comparison data
     */
    compareAssessments: async function(assessmentIds) {
        console.log('compareAssessments called with IDs:', assessmentIds);
        if (!assessmentIds || !Array.isArray(assessmentIds) || assessmentIds.length === 0) {
            console.error('No assessment IDs provided for comparison');
            return {
                success: false,
                error: 'No assessment IDs provided for comparison'
            };
        }
        
        try {
            // Fetch each assessment
            const assessmentPromises = assessmentIds.map(id => 
                window.dbIntegration.getAssessmentById(id)
            );
            
            const assessmentResults = await Promise.all(assessmentPromises);
            console.log('Assessment results fetched:', assessmentResults);
            
            // Check if all assessments were fetched successfully
            const failedAssessments = assessmentResults.filter(result => !result.success);
            if (failedAssessments.length > 0) {
                console.error('Failed to fetch assessments:', failedAssessments);
                return {
                    success: false,
                    error: 'Failed to fetch one or more assessments for comparison',
                    failedAssessments
                };
            }
            
            // Extract assessment data
            const assessments = assessmentResults.map(result => result.data);
            console.log('Extracted assessment data:', assessments);
            
            // Generate comparison data
            const comparisonData = this.generateComparisonData(assessments);
            console.log('Generated comparison data:', comparisonData);
            
            return {
                success: true,
                data: comparisonData
            };
        } catch (error) {
            console.error('Error comparing assessments:', error);
            return {
                success: false,
                error: error.message,
                clientError: true
            };
        }
    },
    
    /**
     * Generate comparison data from multiple assessments
     * @param {Array<Object>} assessments - Array of assessment objects
     * @returns {Object} - Structured comparison data
     * @private
     */
    generateComparisonData(assessments) {
      console.log('Generating comparison data from assessments:', assessments);
      
      // Define practice areas to ensure consistency
      const practiceAreas = [
        'buildManagement',
        'environments',
        'releaseManagement',
        'testing',
        'dataManagement',
        'configurationManagement',
        'applicationArchitecture',
        'observability'
      ];
      
      // Process assessments to ensure required structure
      const processedAssessments = assessments.map(assessment => {
        // Deep clone to avoid mutating original data
        const processedAssessment = JSON.parse(JSON.stringify(assessment));
        
        // Ensure results object exists
        if (!processedAssessment.results) {
          processedAssessment.results = {};
        }
        
        // Calculate overall maturity from practice areas if it doesn't exist
        let overallMaturity = 0;
        let validAreas = 0;
        
        // Process each practice area
        practiceAreas.forEach(area => {
          // Ensure practice area exists
          if (!processedAssessment.results[area]) {
            processedAssessment.results[area] = { maturityLevel: 0 };
          } else if (processedAssessment.results[area].maturityLevel !== undefined) {
            // Add to overall calculation if maturity level exists
            overallMaturity += processedAssessment.results[area].maturityLevel;
            validAreas++;
          }
        });
        
        // Get all maturity levels to calculate overall maturity
        const maturityLevels = [];
        practiceAreas.forEach(area => {
          if (processedAssessment.results[area] && 
              typeof processedAssessment.results[area].maturityLevel === 'number') {
            maturityLevels.push(processedAssessment.results[area].maturityLevel);
          }
        });
        
        // Calculate overall maturity as the minimum of all practice area maturity levels
        // This matches the logic in scoring.js: results.overall = { maturityLevel: Math.min(...maturityLevels) }
        if (maturityLevels.length > 0) {
          overallMaturity = Math.min(...maturityLevels);
          console.log(`Calculated overall maturity (minimum of all areas): ${overallMaturity}`);
        }
        
        // Set the overall maturity in the results object
        if (!processedAssessment.results.overall) {
          processedAssessment.results.overall = { maturityLevel: overallMaturity };
        } else {
          processedAssessment.results.overall.maturityLevel = overallMaturity;
        }
        console.log(`Final overall maturity: ${overallMaturity}`);
        
        
        // Add overallMaturity property for easier access
        processedAssessment.overallMaturity = processedAssessment.results.overall.maturityLevel;
        
        console.log(`Processed assessment ${processedAssessment._id || 'unknown'} with overall maturity:`, processedAssessment.overallMaturity);
        
        // Force the overallMaturity to be a number
        if (typeof processedAssessment.overallMaturity !== 'number') {
          processedAssessment.overallMaturity = parseInt(processedAssessment.overallMaturity) || 0;
        }
        
        return processedAssessment;
      });
      
      console.log('Processed assessments before creating comparison data:', JSON.stringify(processedAssessments));
      
      // Format practice area labels for display
      const formattedLabels = practiceAreas.map(area => {
        return area.replace(/([A-Z])/g, ' $1').trim();
      });
      
      // Create comparison data structure with metadata and chart data
      const comparisonData = {
        assessments: processedAssessments.map(assessment => {
          console.log(`Processing assessment ${assessment._id || assessment.id} for comparison data`);
          console.log(`Results object exists: ${!!assessment.results}`);
          if (assessment.results) {
            console.log(`Results keys: ${Object.keys(assessment.results)}`);
            console.log(`Overall maturity in results: ${assessment.results.overall?.maturityLevel}`);
          }
          console.log(`Direct overallMaturity property: ${assessment.overallMaturity}`);
          
          // Include the full results object in the comparison data
          return {
            id: assessment._id || assessment.id,
            name: assessment.name || assessment.metadata?.title || 'Assessment',
            date: assessment.timestamp || assessment.createdAt,
            formattedDate: new Date(assessment.timestamp || assessment.createdAt).toLocaleString(),
            overallMaturity: assessment.overallMaturity,
            results: assessment.results, // Include the full results object
            metadata: {
              title: assessment.metadata?.title || assessment.name || 'Untitled',
            },
            user: {
              username: assessment.user?.username || assessment.username || 'Anonymous'
            }
          };
        }),
        chartData: {
          labels: formattedLabels,
          datasets: []
        }
      };
      
      // Log the overall maturity values and results for debugging
      comparisonData.assessments.forEach((assessment, index) => {
        console.log(`Assessment ${index} in comparisonData:`);
        console.log(`- ID: ${assessment.id}`);
        console.log(`- Overall maturity: ${assessment.overallMaturity}`);
        console.log(`- Has results object: ${!!assessment.results}`);
        if (assessment.results) {
          console.log(`- Results keys: ${Object.keys(assessment.results)}`);
        }
      });
        
        // Generate random colors for each assessment
        const colors = processedAssessments.map(() => ({
            r: Math.floor(Math.random() * 200),
            g: Math.floor(Math.random() * 200),
            b: Math.floor(Math.random() * 200)
        }));
        
        // Create chart datasets
        processedAssessments.forEach((assessment, index) => {
            const date = new Date(assessment.timestamp || assessment.createdAt);
            const formattedDate = date.toLocaleDateString();
            
            comparisonData.chartData.datasets.push({
                label: `${assessment.name || assessment.username || `Assessment ${index + 1}`} (${formattedDate})`,
                data: practiceAreas.map(area => assessment.results[area]?.maturityLevel || 0),
                backgroundColor: `rgba(${colors[index].r}, ${colors[index].g}, ${colors[index].b}, 0.2)`,
                borderColor: `rgba(${colors[index].r}, ${colors[index].g}, ${colors[index].b}, 1)`,
                borderWidth: 2,
                pointBackgroundColor: `rgba(${colors[index].r}, ${colors[index].g}, ${colors[index].b}, 1)`
            });
        });
        
        // Add debug logs to see what we're returning
        console.log('Final chart data:', JSON.stringify(comparisonData.chartData, null, 2));
        console.log('Final assessments data:', JSON.stringify(comparisonData.assessments, null, 2));
        
        // Return both the comparison data and the assessments
        return {
            comparisonData: comparisonData.chartData,
            assessments: comparisonData.assessments
        };
    },
    
    /**
     * Generate random colors for chart datasets
     * @param {number} count - Number of colors to generate
     * @returns {Array<Object>} - Array of RGB color objects
     * @private
     */
    generateRandomColors: function(count) {
        const predefinedColors = [
            { r: 54, g: 162, b: 235 },  // Blue
            { r: 255, g: 99, b: 132 },  // Red
            { r: 75, g: 192, b: 192 },  // Green
            { r: 255, g: 159, b: 64 },  // Orange
            { r: 153, g: 102, b: 255 }, // Purple
            { r: 255, g: 205, b: 86 },  // Yellow
            { r: 201, g: 203, b: 207 }, // Grey
            { r: 54, g: 72, b: 92 }     // Dark blue
        ];
        
        const colors = [];
        
        // Use predefined colors first
        for (let i = 0; i < count; i++) {
            if (i < predefinedColors.length) {
                colors.push(predefinedColors[i]);
            } else {
                // Generate random colors if we need more than predefined
                colors.push({
                    r: Math.floor(Math.random() * 255),
                    g: Math.floor(Math.random() * 255),
                    b: Math.floor(Math.random() * 255)
                });
            }
        }
        
        return colors;
    }
}

// Cache for feature and connection status
window.dbIntegration.status = {
    enabled: true,  // Default to true until proven otherwise
    connected: true,  // Default to true until proven otherwise
    checking: false,
    lastChecked: 0
};

/**
 * Check if MongoDB integration is enabled and connected
 * @returns {Promise<Object>} - Promise resolving to status object with enabled and connected properties
 */
window.dbIntegration.checkStatus = async function(forceCheck = false) {
    const now = Date.now();
    const cacheTimeout = 30000; // 30 seconds cache timeout
    
    // Return cached status if we're already checking or if cache is still valid
    if (window.dbIntegration.status.checking || 
        (!forceCheck && (now - window.dbIntegration.status.lastChecked) < cacheTimeout)) {
        return {
            enabled: window.dbIntegration.status.enabled,
            connected: window.dbIntegration.status.connected
        };
    }
    
    try {
        window.dbIntegration.status.checking = true;
        
        // Add cache buster to prevent browser caching
        const cacheBuster = `?_=${Date.now()}`;
        const response = await fetch(`/api/health${cacheBuster}`);
        
        if (!response.ok) {
            console.warn('Health check failed, but will continue with current status');
            // Don't change the status if the health check fails - keep using what we have
            return { 
                enabled: window.dbIntegration.status.enabled, 
                connected: window.dbIntegration.status.connected 
            };
        }
        
        const data = await response.json();
        
        // Only update if we get valid data
        if (data && data.features && typeof data.features.mongodb === 'boolean') {
            window.dbIntegration.status.enabled = data.features.mongodb;
            window.dbIntegration.status.connected = data.connections && data.connections.mongodb === true;
            window.dbIntegration.status.lastChecked = now;
            
            console.log(`MongoDB integration is ${window.dbIntegration.status.enabled ? 'enabled' : 'disabled'} and ${window.dbIntegration.status.connected ? 'connected' : 'not connected'}`);
        } else {
            console.warn('Invalid health check response, keeping current status');
        }
        
        return {
            enabled: window.dbIntegration.status.enabled,
            connected: window.dbIntegration.status.connected
        };
    } catch (error) {
        console.error('Failed to check MongoDB status:', error);
        // Don't change status on error, just return current status
        return { 
            enabled: window.dbIntegration.status.enabled, 
            connected: window.dbIntegration.status.connected 
        };
    } finally {
        window.dbIntegration.status.checking = false;
    }
};

/**
 * Save assessment data to MongoDB
 * @param {Object} responses - User responses to assessment questions
 * @param {Object} results - Calculated assessment results
 * @returns {Promise<Object>} - Promise resolving to the server response
 */
window.dbIntegration.saveToMongoDB = async function(responses, results) {
    try {
        // Check if MongoDB is enabled and connected
        const status = await window.dbIntegration.checkStatus();
        
        if (!status.enabled) {
            console.warn('MongoDB integration is disabled');
            return { 
                success: false, 
                error: 'MongoDB integration is disabled',
                feature_disabled: true
            };
        }
        
        if (!status.connected) {
            console.warn('MongoDB is not connected');
            return { 
                success: false, 
                error: 'MongoDB is not connected',
                connection_error: true
            };
        }
        
        // Get current user if authenticated
        const currentUser = window.authService ? window.authService.getCurrentUser() : null;
        
        // Standardize results structure to ensure consistency
        const standardizedResults = window.dbIntegration.standardizeResults(results);
        
        // Prepare data for saving with standardized structure
        const assessmentData = {
            responses: responses || {},
            results: standardizedResults,
            timestamp: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            userId: currentUser ? currentUser._id : 'anonymous',
            username: currentUser ? currentUser.username : 'Anonymous User',
            userRole: currentUser ? currentUser.role : 'anonymous',
            groupIds: currentUser && currentUser.groups ? currentUser.groups : [],
            metadata: {
                systemName: document.getElementById('system-name')?.value || '',
                teamName: document.getElementById('team-name')?.value || '',
                authorEmail: document.getElementById('author-email')?.value || ''
            }
        };
        
        // Send data to server with authentication token if available
        const headers = {
            'Content-Type': 'application/json'
        };
        
        // Add authorization header if user is authenticated
        const token = window.authService ? window.authService.getToken() : null;
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Send data to server
        const response = await fetch('/api/save-assessment', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(assessmentData),
            credentials: 'include'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error saving to MongoDB:', errorData);
            return { 
                success: false, 
                error: errorData.message || 'Failed to save assessment'
            };
        }
        
        const data = await response.json();
        console.log('Assessment saved to MongoDB:', data);
        return { 
            success: true, 
            data: data 
        };
    } catch (error) {
        console.error('Error in saveToMongoDB:', error);
        return { 
            success: false, 
            error: error.message || 'An unexpected error occurred'
        };
    }
};

/**
 * Get assessment data by ID
 * @param {string} id - MongoDB ID of the assessment
 * @returns {Promise<Object>} - Promise resolving to the assessment data
 */
window.dbIntegration.getAssessmentById = async function(id) {
    try {
        // Check if MongoDB is enabled and connected
        const status = await window.dbIntegration.checkStatus();
        
        if (!status.enabled) {
            console.warn('MongoDB integration is disabled');
            return { 
                success: false, 
                error: 'MongoDB integration is disabled',
                feature_disabled: true
            };
        }
        
        if (!status.connected) {
            console.warn('MongoDB is not connected');
            return { 
                success: false, 
                error: 'MongoDB is not connected',
                connection_error: true
            };
        }
        
        // Set up headers for authentication if available
        const headers = {};
        const token = window.authService ? window.authService.getToken() : null;
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Fetch assessment from server
        const response = await fetch(`/api/assessment/${id}`, {
            headers: headers,
            credentials: 'include'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error fetching assessment ${id}:`, errorData);
            return { 
                success: false, 
                error: errorData.message || 'Failed to fetch assessment'
            };
        }
        
        const data = await response.json();
        console.log(`Assessment ${id} data:`, JSON.stringify(data, null, 2));
        
        // Log the structure of the results object
        if (data && data.results) {
            console.log(`Assessment ${id} results structure:`, Object.keys(data.results));
            
            // Check for practice areas
            const practiceAreas = [
                'buildManagement', 'environments', 'releaseManagement', 'testing',
                'dataManagement', 'configurationManagement', 'applicationArchitecture', 'observability'
            ];
            
            practiceAreas.forEach(area => {
                console.log(`Assessment ${id} has ${area}:`, !!data.results[area]);
                if (data.results[area]) {
                    console.log(`${area} maturityLevel:`, data.results[area].maturityLevel);
                }
            });
            
            // Check for overall maturity
            if (data.results.overall) {
                console.log(`Assessment ${id} overall maturity:`, data.results.overall.maturityLevel);
            } else {
                console.log(`Assessment ${id} has no overall maturity property`);
            }
        } else {
            console.log(`Assessment ${id} has no results property`);
        }
        
        // Extract the actual assessment data
        let assessmentData;
        if (data.data) {
            // If the response has a data property, use that
            assessmentData = data.data;
        } else if (data._id) {
            // If the response itself is the assessment, use that
            assessmentData = data;
        } else {
            console.error('Invalid assessment data structure:', data);
            return {
                success: false,
                error: 'Invalid assessment data structure'
            };
        }
        
        // Standardize the assessment data
        const standardizedAssessment = {
            ...assessmentData,
            results: window.dbIntegration.standardizeResults(assessmentData.results),
            responses: assessmentData.responses || {},
            metadata: assessmentData.metadata || {}
        };
        
        console.log('Standardized assessment:', standardizedAssessment);
        
        return { 
            success: true, 
            data: standardizedAssessment 
        };
    } catch (error) {
        console.error('Error in getAssessmentById:', error);
        return { 
            success: false, 
            error: error.message || 'An unexpected error occurred'
        };
    }
};

/**
 * Get all assessments with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Results per page (default: 10)
 * @param {boolean} userOnly - Only fetch current user's assessments (default: false)
 * @returns {Promise<Object>} - Promise resolving to the assessments data with pagination
 */
window.dbIntegration.getAllAssessments = async function(page = 1, limit = 10, userOnly = false) {
    try {
        // Check if MongoDB is enabled and connected
        const status = await window.dbIntegration.checkStatus();
        
        if (!status.enabled) {
            console.warn('MongoDB integration is disabled');
            return { 
                success: false, 
                error: 'MongoDB integration is disabled',
                feature_disabled: true
            };
        }
        
        if (!status.connected) {
            console.warn('MongoDB is not connected');
            return { 
                success: false, 
                error: 'MongoDB is not connected',
                connection_error: true
            };
        }
        
        // Set up headers for authentication if available
        const headers = {};
        const token = window.authService ? window.authService.getToken() : null;
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Build query parameters
        let queryParams = `page=${page}&limit=${limit}`;
        if (userOnly && window.authService && window.authService.isAuthenticated()) {
            queryParams += '&userOnly=true';
        }
        
        // Fetch assessments from server
        const response = await fetch(`/api/assessments?${queryParams}`, {
            headers: headers,
            credentials: 'include'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching assessments:', errorData);
            return { 
                success: false, 
                error: errorData.message || 'Failed to fetch assessments'
            };
        }
        
        const data = await response.json();
        console.log('Assessments fetched:', data);
        return data;
    } catch (error) {
        console.error('Error retrieving assessments:', error);
        return { 
            success: false, 
            error: error.message,
            clientError: true,
            assessments: [],
            pagination: { total: 0, page, limit, pages: 0 }
        };
    }
};
