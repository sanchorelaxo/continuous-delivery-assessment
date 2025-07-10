/**
 * Authentication Service
 * Handles user authentication, registration, and session management
 */
window.authService = (function() {
  // Private variables
  let currentUser = null;
  let isAuthenticated = false;
  
  // Check if user is already logged in (from localStorage)
  function init() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        currentUser = JSON.parse(userData);
        isAuthenticated = true;
        validateToken();
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        logout();
      }
    }
  }
  
  /**
   * Validate stored token with server
   * @returns {Promise<boolean>} True if token is valid
   */
  async function validateToken() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;
      
      const response = await fetch('/api/auth/validate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        logout();
        return false;
      }
      
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }
  
  /**
   * Register a new user
   * @param {string} username - Username
   * @param {string} email - Email address
   * @param {string} password - Password
   * @returns {Promise<Object>} Registration result
   */
  async function register(username, email, password) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store user data and token
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Update state
        currentUser = data.user;
        isAuthenticated = true;
        
        // Trigger event for UI updates
        document.dispatchEvent(new CustomEvent('auth:login', { 
          detail: { user: data.user } 
        }));
      }
      
      return data;
    } catch (error) {
      console.error('Error during registration:', error);
      return { 
        success: false, 
        message: 'Registration failed. Please try again.' 
      };
    }
  }
  
  /**
   * Login user
   * @param {string} usernameOrEmail - Username or email
   * @param {string} password - Password
   * @returns {Promise<Object>} Login result
   */
  async function login(usernameOrEmail, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usernameOrEmail, password }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store user data and token
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Update state
        currentUser = data.user;
        isAuthenticated = true;
        
        // Trigger event for UI updates
        document.dispatchEvent(new CustomEvent('auth:login', { 
          detail: { user: data.user } 
        }));
      }
      
      return data;
    } catch (error) {
      console.error('Error during login:', error);
      return { 
        success: false, 
        message: 'Login failed. Please try again.' 
      };
    }
  }
  
  /**
   * Logout user
   * @returns {Promise<Object>} Logout result
   */
  async function logout() {
    try {
      // Call logout API
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Update state
      currentUser = null;
      isAuthenticated = false;
      
      // Trigger event for UI updates
      document.dispatchEvent(new CustomEvent('auth:logout'));
      
      return { success: true };
    } catch (error) {
      console.error('Error during logout:', error);
      return { 
        success: false, 
        message: 'Logout failed. Please try again.' 
      };
    }
  }
  
  /**
   * Get current user profile
   * @returns {Promise<Object>} User profile
   */
  async function getProfile() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { 
          success: false, 
          message: 'Not authenticated' 
        };
      }
      
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update stored user data
        currentUser = data.user;
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Error getting profile:', error);
      return { 
        success: false, 
        message: 'Failed to get profile. Please try again.' 
      };
    }
  }
  
  /**
   * Get authentication token
   * @returns {string|null} JWT token or null if not authenticated
   */
  function getToken() {
    return localStorage.getItem('token');
  }
  
  /**
   * Check if user is authenticated
   * @returns {boolean} True if authenticated
   */
  function isUserAuthenticated() {
    return isAuthenticated;
  }
  
  /**
   * Get current user
   * @returns {Object|null} Current user or null if not authenticated
   */
  function getCurrentUser() {
    return currentUser;
  }
  
  /**
   * Check if user has specific role
   * @param {string|Array} roles - Role(s) to check
   * @returns {boolean} True if user has role
   */
  function hasRole(roles) {
    if (!currentUser) return false;
    
    const rolesToCheck = Array.isArray(roles) ? roles : [roles];
    return rolesToCheck.includes(currentUser.role);
  }
  
  // Initialize on load
  init();
  
  // Public API
  return {
    register,
    login,
    logout,
    getProfile,
    getToken,
    isAuthenticated: isUserAuthenticated,
    getCurrentUser,
    hasRole
  };
})();
