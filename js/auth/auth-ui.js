/**
 * Authentication UI Components
 * Handles login, registration, and user profile UI
 */
window.authUI = (function() {
  // DOM elements cache
  let loginModal = null;
  let registerModal = null;
  let profileDropdown = null;
  
  /**
   * Show assessment form
   * @param {Event} [event] - Click event (optional)
   */
  function showAssessmentForm(event) {
    // Safely handle the event parameter
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    
    // Hide admin dashboard if it exists
    const adminDashboardContainer = document.getElementById('admin-dashboard-container');
    if (adminDashboardContainer) {
      adminDashboardContainer.style.display = 'none';
    }
    
    // Hide history if it exists
    if (window.assessmentHistoryUI && typeof window.assessmentHistoryUI.hideHistory === 'function') {
      window.assessmentHistoryUI.hideHistory();
    }
    
    // Show assessment form with null checks
    const assessmentForm = document.getElementById('assessment-form');
    if (assessmentForm) {
      assessmentForm.style.display = 'block';
    }
    
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
      resultsContainer.style.display = 'none';
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const navAssessment = document.getElementById('nav-assessment');
    if (navAssessment) {
      navAssessment.classList.add('active');
    }
  }
  

  
  /**
   * Create authentication modals (login and register)
   */
  function createAuthModals() {
    // Create login modal
    loginModal = document.createElement('div');
    loginModal.id = 'login-modal';
    loginModal.className = 'modal fade';
    loginModal.setAttribute('tabindex', '-1');
    loginModal.setAttribute('role', 'dialog');
    loginModal.setAttribute('aria-labelledby', 'loginModalLabel');
    loginModal.setAttribute('aria-hidden', 'true');
    
    loginModal.innerHTML = `
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="login-form">
              <div class="form-group">
                <label for="login-username">Username or Email</label>
                <input type="text" class="form-control" id="login-username" required>
              </div>
              <div class="form-group">
                <label for="login-password">Password</label>
                <input type="password" class="form-control" id="login-password" required>
              </div>
              <div class="alert alert-danger d-none" id="login-error"></div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="login-submit">Login</button>
            <button type="button" class="btn btn-link" id="show-register">Need an account? Register</button>
          </div>
        </div>
      </div>
    `;
    
    // Create register modal
    registerModal = document.createElement('div');
    registerModal.id = 'register-modal';
    registerModal.className = 'modal fade';
    registerModal.setAttribute('tabindex', '-1');
    registerModal.setAttribute('role', 'dialog');
    registerModal.setAttribute('aria-labelledby', 'registerModalLabel');
    registerModal.setAttribute('aria-hidden', 'true');
    
    registerModal.innerHTML = `
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="registerModalLabel">Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="register-form">
              <div class="form-group">
                <label for="register-username">Username</label>
                <input type="text" class="form-control" id="register-username" required>
              </div>
              <div class="form-group">
                <label for="register-email">Email</label>
                <input type="email" class="form-control" id="register-email" required>
              </div>
              <div class="form-group">
                <label for="register-password">Password</label>
                <input type="password" class="form-control" id="register-password" required>
              </div>
              <div class="form-group">
                <label for="register-confirm-password">Confirm Password</label>
                <input type="password" class="form-control" id="register-confirm-password" required>
              </div>
              <div class="alert alert-danger d-none" id="register-error"></div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" id="register-submit">Register</button>
            <button type="button" class="btn btn-link" id="show-login">Already have an account? Login</button>
          </div>
        </div>
      </div>
    `;
    
    // Append modals to body
    document.body.appendChild(loginModal);
    document.body.appendChild(registerModal);
    
    // Add event listeners
    document.getElementById('login-submit').addEventListener('click', handleLogin);
    document.getElementById('register-submit').addEventListener('click', handleRegister);
    document.getElementById('show-register').addEventListener('click', () => window.authUI.showRegisterModal());
    document.getElementById('show-login').addEventListener('click', () => window.authUI.showLoginModal());
    
    // Add modal cleanup event listeners to fix aria-hidden issues
    $(loginModal).on('hidden.bs.modal', function() {
      setTimeout(() => {
        loginModal.setAttribute('aria-hidden', 'true');
        // Remove any leftover backdrop
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      }, 100);
    });
    
    $(registerModal).on('hidden.bs.modal', function() {
      setTimeout(() => {
        registerModal.setAttribute('aria-hidden', 'true');
        // Remove any leftover backdrop
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      }, 100);
    });
  }
  
  /**
   * Create profile dropdown in navbar
   */
  function createProfileDropdown() {
    // Check if profile dropdown already exists and remove it to prevent duplicates
    const existingDropdown = document.getElementById('auth-profile-container');
    if (existingDropdown) {
      existingDropdown.remove();
    }
    
    // Find navbar - we want to append to the end of the navbar-nav
    const navbarNav = document.querySelector('#navbarNav');
    if (!navbarNav) {
      console.warn('Navbar navigation not found, cannot add profile dropdown');
      return;
    }
    
    // Create profile dropdown container that will be appended to the navbar
    profileDropdown = document.createElement('ul');
    profileDropdown.id = 'auth-profile-container';
    profileDropdown.className = 'navbar-nav ms-auto';
    
    // Add auth buttons when logged out
    profileDropdown.innerHTML = `
      <li class="nav-item ms-auto">
        <div class="auth-buttons">
          <button class="btn btn-outline-primary btn-sm" id="nav-login-btn">Login</button>
          <button class="btn btn-primary btn-sm" id="nav-register-btn">Register</button>
        </div>
        
        <div class="auth-profile d-none">
          <a class="nav-link dropdown-toggle text-nowrap" href="#" id="profileDropdown" role="button" 
             data-bs-toggle="dropdown" aria-expanded="false">
            <span id="username-display" class="text-truncate d-inline-block" style="max-width: 120px; vertical-align: middle;">User</span>
          </a>
          <div class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
            <span class="dropdown-item-text" id="role-display">Role: User</span>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" id="view-profile">My Profile</a>
            <a class="dropdown-item" href="#" id="view-assessments">My Assessments</a>
            <div class="dropdown-divider admin-only d-none"></div>
            <a class="dropdown-item sysadmin-only d-none" href="#" id="admin-dashboard">Admin Dashboard</a>
            <a class="dropdown-item admin-only d-none" href="#" id="manage-users">Manage Users</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" id="logout-btn">Logout</a>
          </div>
        </div>
      </li>
    `;
    
    // Append the profile dropdown to the navbar
    navbarNav.appendChild(profileDropdown);
    
    // Set up event listeners for login/register buttons
    const loginBtn = document.getElementById('nav-login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => window.authUI.showLoginModal());
    }
    
    const registerBtn = document.getElementById('nav-register-btn');
    if (registerBtn) {
      registerBtn.addEventListener('click', () => window.authUI.showRegisterModal());
    }
  }
  
  /**
   * Update authentication UI based on current user status
   */
  function updateAuthUI() {
    try {
      // Get profile dropdown elements
      const authButtons = document.querySelector('.auth-buttons');
      const authProfile = document.querySelector('.auth-profile');
      
      if (!authButtons || !authProfile) {
        console.warn('Auth UI elements not found, recreating...');
        createProfileDropdown();
        return;
      }
      
      // Check if user is logged in
      const currentUser = window.authService.getCurrentUser();
      
      if (currentUser) {
        // Show profile dropdown
        authButtons.classList.add('d-none');
        authProfile.classList.remove('d-none');
        
        // Update username display
        const usernameDisplay = document.getElementById('username-display');
        const roleDisplay = document.getElementById('role-display');
        
        if (usernameDisplay) {
          usernameDisplay.textContent = currentUser.username || 'User';
        }
        
        if (roleDisplay) {
          roleDisplay.textContent = `Role: ${formatRole(currentUser.role)}`;
        }
        
        // Check if user is sysAdmin (only sysAdmin can see Admin and Question Editor)
        // Check if user is admin (sysAdmin or assessment_admin)
        const isAdmin = window.authService.hasRole(['sysAdmin', 'assessment_admin']);
        const isSysAdmin = window.authService.hasRole(['sysAdmin']);
        
        console.log('Is admin:', isAdmin, 'Is sysAdmin:', isSysAdmin, 'User role:', currentUser.role);
        
        // Show/hide admin options in dropdown menu
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
          if (isAdmin) {
            el.classList.remove('d-none');
          } else {
            el.classList.add('d-none');
          }
        });
        
        // Show/hide sysAdmin-only elements (like admin dashboard)
        const sysAdminElements = document.querySelectorAll('.sysadmin-only');
        sysAdminElements.forEach(el => {
          if (isSysAdmin) {
            el.classList.remove('d-none');
          } else {
            el.classList.add('d-none');
          }
        });
        
        // Specifically ensure nav-admin and nav-question-editor are visible ONLY if user is sysAdmin
        const navAdmin = document.getElementById('nav-admin');
        const navQuestionEditor = document.getElementById('nav-question-editor');
        
        if (navAdmin) {
          if (isSysAdmin) {
            navAdmin.parentElement.classList.remove('d-none');
          } else {
            navAdmin.parentElement.classList.add('d-none');
          }
        }
        
        if (navQuestionEditor) {
          if (isSysAdmin) {
            navQuestionEditor.parentElement.classList.remove('d-none');
          } else {
            navQuestionEditor.parentElement.classList.add('d-none');
          }
        }
        
        // Set up dropdown event listeners (only when authenticated)
        setupDropdownEventListeners();
      } else {
        // Show login/register buttons
        authButtons.classList.remove('d-none');
        authProfile.classList.add('d-none');
        
        // Hide admin navigation items when logged out
        const navAdmin = document.getElementById('nav-admin');
        const navQuestionEditor = document.getElementById('nav-question-editor');
        
        if (navAdmin) navAdmin.parentElement.classList.add('d-none');
        if (navQuestionEditor) navQuestionEditor.parentElement.classList.add('d-none');
      }
    } catch (error) {
      console.warn('Could not update auth UI yet, will retry later:', error.message);
    }
  }
  
  /**
   * Set up event listeners for dropdown menu items
   */
  function setupDropdownEventListeners() {
    // Remove existing event listeners to prevent duplicates
    const adminDashboardLink = document.getElementById('admin-dashboard');
    const manageUsersLink = document.getElementById('manage-users');
    const viewProfileLink = document.getElementById('view-profile');
    const viewAssessmentsLink = document.getElementById('view-assessments');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Admin Dashboard
    if (adminDashboardLink) {
      adminDashboardLink.removeEventListener('click', showAdminDashboard);
      adminDashboardLink.addEventListener('click', showAdminDashboard);
    }
    
    // Manage Users
    if (manageUsersLink) {
      manageUsersLink.removeEventListener('click', showManageUsers);
      manageUsersLink.addEventListener('click', showManageUsers);
    }
    
    // View Profile (placeholder for now)
    if (viewProfileLink) {
      viewProfileLink.removeEventListener('click', handleViewProfile);
      viewProfileLink.addEventListener('click', handleViewProfile);
    }
    
    // View Assessments
    if (viewAssessmentsLink) {
      viewAssessmentsLink.removeEventListener('click', handleViewAssessments);
      viewAssessmentsLink.addEventListener('click', handleViewAssessments);
    }
    
    // Logout
    if (logoutBtn) {
      logoutBtn.removeEventListener('click', handleLogout);
      logoutBtn.addEventListener('click', handleLogout);
    }
  }
  
  /**
   * Update navigation visibility based on user role
   * @param {boolean} isSysAdmin - Whether the current user is a sysAdmin
   */
  function updateNavVisibility(isSysAdmin) {
    try {
      const navAdmin = document.getElementById('nav-admin');
      const navQuestionEditor = document.getElementById('nav-question-editor');
      
      if (navAdmin) {
        if (isSysAdmin) {
          navAdmin.parentElement.classList.remove('d-none');
        } else {
          navAdmin.parentElement.classList.add('d-none');
        }
      }
      
      if (navQuestionEditor) {
        if (isSysAdmin) {
          navQuestionEditor.parentElement.classList.remove('d-none');
        } else {
          navQuestionEditor.parentElement.classList.add('d-none');
        }
      }
    } catch (error) {
      console.warn('Error updating navigation visibility:', error);
    }
  }
  
  /**
   * Format role for display
   * @param {string} role - Role name
   * @returns {string} Formatted role name
   */
  function formatRole(role) {
    if (!role) return 'User';
    
    // Convert snake_case to Title Case
    return role
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  /**
   * Show login modal
   */
  function showLoginModal() {
    // Hide register modal if open
    $(registerModal).modal('hide');
    
    // Clear form
    document.getElementById('login-form').reset();
    document.getElementById('login-error').classList.add('d-none');
    
    // Show login modal
    $(loginModal).modal('show');
  }
  
  /**
   * Show register modal
   */
  function showRegisterModal() {
    // Hide login modal if open
    $(loginModal).modal('hide');
    
    // Clear form
    document.getElementById('register-form').reset();
    document.getElementById('register-error').classList.add('d-none');
    
    // Show register modal
    $(registerModal).modal('show');
  }
  
  /**
   * Handle login form submission
   */
  async function handleLogin() {
    // Get form values
    const usernameOrEmail = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    // Validate form
    if (!usernameOrEmail || !password) {
      showLoginError('Please enter username/email and password');
      return;
    }
    
    // Disable submit button
    const submitButton = document.getElementById('login-submit');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Logging in...';
    
    // Call login API
    const result = await window.authService.login(usernameOrEmail, password);
    
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = 'Login';
    
    if (result.success) {
      // Close modal
      $(loginModal).modal('hide');
    } else {
      // Show error
      showLoginError(result.message || 'Login failed');
    }
  }
  
  /**
   * Handle register form submission
   */
  async function handleRegister() {
    // Get form values
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Validate form
    if (!username || !email || !password || !confirmPassword) {
      showRegisterError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      showRegisterError('Passwords do not match');
      return;
    }
    
    // Disable submit button
    const submitButton = document.getElementById('register-submit');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Registering...';
    
    // Call register API
    const result = await window.authService.register(username, email, password);
    
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = 'Register';
    
    if (result.success) {
      // Close modal
      $(registerModal).modal('hide');
    } else {
      // Show error
      showRegisterError(result.message || 'Registration failed');
    }
  }
  
  /**
   * Handle logout
   */
  async function handleLogout() {
    await window.authService.logout();
  }
  
  /**
   * Handle view profile
   */
  function handleViewProfile(e) {
    e.preventDefault();
    // TODO: Implement profile view functionality
    console.log('View profile clicked - functionality to be implemented');
  }
  
  /**
   * Handle view assessments
   */
  function handleViewAssessments(e) {
    e.preventDefault();
    // Show assessment history
    if (window.assessmentHistoryUI && typeof window.assessmentHistoryUI.showHistory === 'function') {
      window.assessmentHistoryUI.showHistory(e);
    } else {
      console.error('Assessment history UI not initialized');
    }
  }
  
  /**
   * Show login error
   * @param {string} message - Error message
   */
  function showLoginError(message) {
    const errorElement = document.getElementById('login-error');
    errorElement.textContent = message;
    errorElement.classList.remove('d-none');
  }
  
  /**
   * Show register error
   * @param {string} message - Error message
   */
  function showRegisterError(message) {
    const errorElement = document.getElementById('register-error');
    errorElement.textContent = message;
    errorElement.classList.remove('d-none');
  }
  
  /**
   * Handle login event
   * @param {CustomEvent} event - Login event
   */
  function handleLoginEvent(event) {
    updateAuthUI();
  }
  
  /**
   * Handle logout event
   */
  function handleLogoutEvent() {
    updateAuthUI();
  }
  
  /**
   * Show user profile
   * @param {Event} event - Click event
   */
  function showProfile(event) {
    event.preventDefault();
    // TODO: Implement profile view

  }
  
  /**
   * Show user assessments
   * @param {Event} event - Click event
   */
  function showAssessments(event) {
    event.preventDefault();
    // TODO: Implement assessments view

  }
  
  /**
   * Show admin dashboard
   * @param {Event} [event] - Click event (optional)
   */
  function showAdminDashboard(event) {
    // Safely handle the event parameter
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    
    // Hide other containers with null checks
    const assessmentForm = document.getElementById('assessment-form');
    if (assessmentForm) {
      assessmentForm.style.display = 'none';
    }
    
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
      resultsContainer.style.display = 'none';
    }
    
    if (window.assessmentHistoryUI && typeof window.assessmentHistoryUI.hideHistory === 'function') {
      window.assessmentHistoryUI.hideHistory();
    }
    
    // Get or create the admin dashboard container
    let adminDashboardContainer = document.getElementById('admin-dashboard-container');
    
    // If admin dashboard container doesn't exist, create it
    if (!adminDashboardContainer) {
      console.log('Admin dashboard container not found, creating it');
      adminDashboardContainer = document.createElement('div');
      adminDashboardContainer.id = 'admin-dashboard-container';
      adminDashboardContainer.className = 'container-fluid mt-3';
      
      // Find a suitable place to append it
      const mainContent = document.querySelector('.container') || document.body;
      mainContent.appendChild(adminDashboardContainer);
    }
    
    // Show the admin dashboard container
    adminDashboardContainer.classList.remove('d-none');
    adminDashboardContainer.style.display = 'block';
    
    // Create admin dashboard content if it doesn't exist
    if (!document.getElementById('admin-dashboard-content')) {
      try {
        // Create the admin dashboard content
        const dashboardContent = `
          <div class="container mt-4" id="admin-dashboard-content">
            <h2>Admin Dashboard</h2>
            <div class="row mt-4">
              <div class="col-md-4 mb-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">User Management</h5>
                    <p class="card-text">Manage users, roles, and permissions.</p>
                    <button id="manage-users-btn" class="btn btn-primary">Manage Users</button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Group Management</h5>
                    <p class="card-text">Manage groups, members, and assessments.</p>
                    <button id="manage-groups-btn" class="btn btn-primary">Manage Groups</button>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Assessment Analytics</h5>
                    <p class="card-text">View analytics and reports for assessments.</p>
                    <button id="view-analytics-btn" class="btn btn-primary">View Analytics</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        
        // Set the content
        adminDashboardContainer.innerHTML = dashboardContent;
      } catch (error) {
        console.error('Error creating admin dashboard content:', error);
        return;
      }
      
      // Add event listeners for the buttons
      const manageUsersBtn = document.getElementById('manage-users-btn');
      if (manageUsersBtn) {
        manageUsersBtn.addEventListener('click', function(e) {
          e.preventDefault();
          showManageUsers();
        });
      }
      
      const manageGroupsBtn = document.getElementById('manage-groups-btn');
      if (manageGroupsBtn) {
        manageGroupsBtn.addEventListener('click', function(e) {
          e.preventDefault();
          showManageGroups();
        });
      }
      
      const viewAnalyticsBtn = document.getElementById('view-analytics-btn');
      if (viewAnalyticsBtn) {
        viewAnalyticsBtn.addEventListener('click', function(e) {
          e.preventDefault();
          alert('Analytics feature coming soon!');
        });
      }
    }
    
    // Show the container
    adminDashboardContainer.style.display = 'block';
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const navAdmin = document.getElementById('nav-admin');
    if (navAdmin) {
      navAdmin.classList.add('active');
    }
    
    // Get current language and translations
    const currentLang = window.currentLang || 'en_CA';
    const ui = window.translations ? window.translations.ui[currentLang] : null;
    
    // Fallback translations if not available
    const t = ui || {
      adminDashboard: 'Admin Dashboard',
      userManagement: 'User Management',
      groupManagement: 'Group Management',
      manageUsers: 'Manage Users',
      manageGroups: 'Manage Groups',
      manageUsersDesc: 'Manage users and their roles',
      manageGroupsDesc: 'Create and manage user groups',
      assessmentAnalytics: 'Assessment Analytics',
      viewAnalytics: 'View Analytics',
      viewAnalyticsDesc: 'View assessment statistics and trends'
    };
    
    // Create dashboard content with translations
    adminDashboardContainer.innerHTML = `
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h3>${t.adminDashboard}</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4 mb-3">
              <div class="card h-100">
                <div class="card-header">${t.userManagement}</div>
                <div class="card-body">
                  <p>${t.manageUsersDesc}</p>
                  <button id="manage-users-btn" class="btn btn-outline-primary">${t.manageUsers}</button>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="card h-100">
                <div class="card-header">${t.groupManagement}</div>
                <div class="card-body">
                  <p>${t.manageGroupsDesc}</p>
                  <button id="manage-groups-btn" class="btn btn-outline-primary">${t.manageGroups}</button>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="card h-100">
                <div class="card-header">${t.assessmentAnalytics}</div>
                <div class="card-body">
                  <p>${t.viewAnalyticsDesc}</p>
                  <button id="view-analytics-btn" class="btn btn-outline-primary">${t.viewAnalytics}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add event listeners after the HTML has been inserted
    const manageUsersBtn = document.getElementById('manage-users-btn');
    if (manageUsersBtn) {
      manageUsersBtn.addEventListener('click', showManageUsers);
    }
    
    const manageGroupsBtn = document.getElementById('manage-groups-btn');
    if (manageGroupsBtn) {
      manageGroupsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showManageGroups();
      });
    }
    
    const viewAnalyticsBtn = document.getElementById('view-analytics-btn');
    if (viewAnalyticsBtn) {
      viewAnalyticsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Analytics feature coming soon!');
      });
    }
    

  }
  
  /**
   * Show user management
   * @param {Event} event - Click event
   */
  function showManageUsers(event) {
    // Safely handle the event parameter
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    
    // Get the admin dashboard container
    const adminDashboardContainer = document.getElementById('admin-dashboard-container');
    
    // Check if the container exists
    if (!adminDashboardContainer) {
      console.warn('Admin dashboard container not found');
      return;
    }
    
    // Create user management interface
    adminDashboardContainer.innerHTML = `
      <div class="card">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3>User Management</h3>
          <button id="back-to-admin" class="btn btn-sm btn-light">Back to Dashboard</button>
        </div>
        <div class="card-body">
          <div class="row mb-4">
            <div class="col-md-6">
              <div class="input-group">
                <input type="text" id="user-search" class="form-control" placeholder="Search users...">
                <button class="btn btn-outline-secondary" type="button">Search</button>
              </div>
            </div>
            <div class="col-md-6 text-end">
              <button id="add-user-btn" class="btn btn-success">Add New User</button>
            </div>
          </div>
          
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Groups</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="users-table-body">
                <tr>
                  <td colspan="6" class="text-center">Loading users...</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <nav aria-label="User pagination">
            <ul class="pagination justify-content-center">
              <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
    `;
    
    // Add event listener for back button
    document.getElementById('back-to-admin').addEventListener('click', function(e) {
      e.preventDefault();
      // Call showAdminDashboard without parameters
      showAdminDashboard();
    });
    
    // Add event listener for add user button
    document.getElementById('add-user-btn').addEventListener('click', function(e) {
      e.preventDefault();
      showAddUserModal();
    });
    
    // Load users
    loadUsers();
  }
  
  /**
   * Show question management
   * @param {Event} event - Click event
   */
  function showManageQuestions(event) {
    event.preventDefault();
    // TODO: Implement question management

  }
  
  /**
   * Show add user modal
   */
  function showAddUserModal() {
    // Create modal if it doesn't exist
    let addUserModal = document.getElementById('add-user-modal');
    
    if (!addUserModal) {
      addUserModal = document.createElement('div');
      addUserModal.id = 'add-user-modal';
      addUserModal.className = 'modal fade';
      addUserModal.setAttribute('tabindex', '-1');
      addUserModal.setAttribute('role', 'dialog');
      addUserModal.setAttribute('aria-labelledby', 'addUserModalLabel');
      addUserModal.setAttribute('aria-hidden', 'true');
      
      addUserModal.innerHTML = `
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addUserModalLabel">Add New User</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="add-user-form">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input type="text" class="form-control" id="username" required>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" required>
                </div>
                <div class="mb-3">
                  <label for="role" class="form-label">Role</label>
                  <select class="form-select" id="role" required>
                    <option value="assessment_user">Assessment User</option>
                    <option value="assessment_admin">Assessment Admin</option>
                    <option value="sysAdmin">System Admin</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="groups" class="form-label">Groups</label>
                  <select class="form-select" id="groups" multiple>
                    <!-- Groups will be loaded dynamically -->
                    <option value="loading" disabled>Loading groups...</option>
                  </select>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" id="save-user-btn">Save User</button>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(addUserModal);
      
      // Add event listener for save button
      document.getElementById('save-user-btn').addEventListener('click', saveNewUser);
    }
    
    // Add event listeners to fix accessibility issues with focus management
    addUserModal.addEventListener('hide.bs.modal', function() {
      // Remove focus from the active element to prevent aria-hidden warnings
      if (document.activeElement) {
        document.activeElement.blur();
      }
    });
    
    // Clean up modal and backdrop when hidden
    addUserModal.addEventListener('hidden.bs.modal', function() {
      // Remove any lingering backdrops
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.remove());
      
      // Delay modal removal to let Bootstrap finish its cleanup
      setTimeout(() => {
        if (addUserModal && addUserModal.parentNode) {
          addUserModal.remove();
        }
      }, 100);
    });
    
    // Show modal
    const modal = new bootstrap.Modal(addUserModal);
    modal.show();
    
    // Load groups for the dropdown
    loadGroups();
  }
  
  /**
   * Load users from the server
   */
  function loadUsers() {
    const usersTableBody = document.getElementById('users-table-body');
    
    // Get authentication token
    const token = window.authService.getToken();
    
    // Show loading state
    usersTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center">
          <div class="spinner-border spinner-border-sm text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          Loading users...
        </td>
      </tr>
    `;
    
    // Fetch users from API
    fetch('/api/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load users');
      }
      return response.json();
    })
    .then(data => {
      if (data.users && data.users.length > 0) {
        // Clear loading state
        usersTableBody.innerHTML = '';
        
        // Add users to table
        data.users.forEach(user => {
          const row = document.createElement('tr');
          
          // Format last login date
          const lastLogin = user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never';
          
          // Format groups
          const groups = user.groups && user.groups.length > 0 ? 
            user.groups.join(', ') : 
            'None';
          
          // Ensure we're using the correct ID field (_id for MongoDB)
          const userId = user._id || user.id || user.userId;
          
          row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${formatRole(user.role)}</td>
            <td>${groups}</td>
            <td>${lastLogin}</td>
            <td>
              <div class="btn-group btn-group-sm" role="group">
                <button type="button" class="btn btn-outline-primary edit-user" data-user-id="${userId}">Edit</button>
                <button type="button" class="btn btn-outline-danger delete-user" data-user-id="${userId}">Delete</button>
              </div>
            </td>
          `;
          
          usersTableBody.appendChild(row);
        });
        
        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-user').forEach(button => {
          button.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            editUser(userId);
          });
        });
        
        document.querySelectorAll('.delete-user').forEach(button => {
          button.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            deleteUser(userId);
          });
        });
      } else {
        usersTableBody.innerHTML = `
          <tr>
            <td colspan="6" class="text-center">No users found</td>
          </tr>
        `;
      }
    })
    .catch(error => {
      console.error('Error loading users:', error);
      usersTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center text-danger">
            Error loading users: ${error.message}
          </td>
        </tr>
      `;
    });
  }
  
  /**
   * Load groups for the user form
   */
  function loadGroups() {
    const groupsSelect = document.getElementById('groups');
    
    // Get authentication token
    const token = window.authService.getToken();
    
    // Show loading state
    groupsSelect.innerHTML = '<option value="loading" disabled selected>Loading groups...</option>';
    
    // Fetch groups from API
    fetch('/api/groups', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load groups');
      }
      return response.json();
    })
    .then(data => {
      // Clear loading state
      groupsSelect.innerHTML = '';
      
      // Handle array response directly
      if (Array.isArray(data) && data.length > 0) {
        // Add groups to select
        data.forEach(group => {
          const option = document.createElement('option');
          option.value = group.id;
          option.textContent = group.name;
          groupsSelect.appendChild(option);
        });
      } else {
        groupsSelect.innerHTML = '<option value="" disabled selected>No groups available</option>';
      }
    })
    .catch(error => {
      console.error('Error loading groups:', error);
      groupsSelect.innerHTML = '<option value="" disabled selected>Error loading groups</option>';
    });
  }
  
  /**
   * Save a new user
   */
  function saveNewUser() {
    // Get form values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // Get selected groups
    const groupsSelect = document.getElementById('groups');
    const selectedGroups = Array.from(groupsSelect.selectedOptions).map(option => option.value);
    
    // Validate form
    if (!username || !email || !password || !role) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Get authentication token
    const token = window.authService.getToken();
    
    // Create user object
    const userData = {
      username,
      email,
      password,
      role,
      groups: selectedGroups
    };
    
    // Send request to API
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      return response.json();
    })
    .then(data => {
      // Hide modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('add-user-modal'));
      modal.hide();
      
      // Reload users
      loadUsers();
      
      // Show success message
      alert('User created successfully');
    })
    .catch(error => {
      console.error('Error creating user:', error);
      alert(`Error creating user: ${error.message}`);
    });
  }
  
  /**
   * Edit a user
   * @param {string} userId - User ID
   */
  function editUser(userId) {
    // Show the edit user modal with the user's data
    showEditUserModal(userId);
  }
  
  /**
   * Show edit user modal
   * @param {string} userId - User ID to edit
   */
  async function showEditUserModal(userId) {
    try {
      // Fetch the user data first
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      // Loading indicator removed
      
      // Fetch user data
      const response = await fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const userData = await response.json();
      
      // Extract the actual user data based on the API response structure
      // The API returns { success: true, user: {...} } structure
      const userDataToUse = userData.user || userData;
      
      // Hide loading indicator
      // Loading indicator removed
      
      // Create modal if it doesn't exist
      let editUserModal = document.getElementById('edit-user-modal');
      
      if (!editUserModal) {
        editUserModal = document.createElement('div');
        editUserModal.id = 'edit-user-modal';
        editUserModal.className = 'modal fade';
        editUserModal.setAttribute('tabindex', '-1');
        editUserModal.setAttribute('role', 'dialog');
        editUserModal.setAttribute('aria-labelledby', 'editUserModalLabel');
        
        // Use the same structure as the add user modal for consistency
        editUserModal.innerHTML = `
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editUserModalLabel">Edit User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="edit-user-form">
                  <input type="hidden" id="edit-user-id">
                  <div class="mb-3">
                    <label for="edit-username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="edit-username" required>
                  </div>
                  <div class="mb-3">
                    <label for="edit-email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="edit-email" required>
                  </div>
                  <div class="mb-3">
                    <label for="edit-password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="edit-password" placeholder="Leave blank to keep current password">
                    <small class="form-text text-muted">Leave blank to keep the current password</small>
                  </div>
                  <div class="mb-3">
                    <label for="edit-role" class="form-label">Role</label>
                    <select class="form-select" id="edit-role" required>
                      <option value="assessment_user">Assessment User</option>
                      <option value="assessment_admin">Assessment Admin</option>
                      <option value="sysAdmin">System Admin</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="edit-groups" class="form-label">Groups</label>
                    <select class="form-select" id="edit-groups" multiple>
                      <!-- Groups will be loaded dynamically -->
                      <option value="loading" disabled>Loading groups...</option>
                    </select>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="update-user-btn">Update User</button>
              </div>
            </div>
          </div>
        `;
        
        document.body.appendChild(editUserModal);
        
        // Add event listener for update button
        document.getElementById('update-user-btn').addEventListener('click', saveEditedUser);
      }
      
      // Populate form with user data
      document.getElementById('edit-user-id').value = userId;
      document.getElementById('edit-username').value = userDataToUse.username || '';
      document.getElementById('edit-email').value = userDataToUse.email || '';
      document.getElementById('edit-password').value = ''; // Clear password field
      
      // Set role
      const roleSelect = document.getElementById('edit-role');
      if (roleSelect) {
        for (let i = 0; i < roleSelect.options.length; i++) {
          if (roleSelect.options[i].value === userDataToUse.role) {
            roleSelect.selectedIndex = i;
            break;
          }
        }
      }
      
      // Show modal
      const modal = new bootstrap.Modal(editUserModal, {
        // Add options to improve accessibility
        focus: true
      });
      
      // Add event listeners to fix accessibility issues with focus management
      editUserModal.addEventListener('hide.bs.modal', function() {
        // Remove focus from the active element to prevent aria-hidden warnings
        if (document.activeElement) {
          document.activeElement.blur();
        }
      });
      
      // Clean up modal and backdrop when hidden
      editUserModal.addEventListener('hidden.bs.modal', function() {
        // Remove any lingering backdrops
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => backdrop.remove());
        
        // Delay modal removal to let Bootstrap finish its cleanup
        setTimeout(() => {
          if (editUserModal && editUserModal.parentNode) {
            editUserModal.remove();
          }
        }, 100);
      });
      
      editUserModal.addEventListener('shown.bs.modal', function() {
        // Ensure focus is properly managed
        const usernameField = document.getElementById('edit-username');
        if (usernameField) {
          usernameField.focus();
        }
      });
      
      modal.show();
      
      // Load groups and set selected groups
      await loadGroupsForEdit(userDataToUse.groups || []);
      
    } catch (error) {
      console.error('Error showing edit user modal:', error);
      // Loading indicator removed
      showErrorAlert('Failed to load user data: ' + error.message);
    }
  }
  
  /**
   * Load groups for the edit user modal
   * @param {Array} selectedGroups - Array of group IDs that should be selected
   */
  async function loadGroupsForEdit(selectedGroups = []) {
    try {
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch('/api/groups', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }
      
      const groups = await response.json();
      const groupsSelect = document.getElementById('edit-groups');
      
      // Clear existing options
      groupsSelect.innerHTML = '';
      
      // Add groups to select
      groups.forEach(group => {
        const option = document.createElement('option');
        option.value = group.id;
        option.textContent = group.name;
        option.selected = selectedGroups.includes(group.id);
        groupsSelect.appendChild(option);
      });
      
      // If no groups, show message
      if (groups.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No groups available';
        option.disabled = true;
        groupsSelect.appendChild(option);
      }
      
    } catch (error) {
      console.error('Error loading groups for edit:', error);
      const groupsSelect = document.getElementById('edit-groups');
      groupsSelect.innerHTML = '<option value="" disabled>Failed to load groups</option>';
    }
  }
  
  /**
   * Save edited user data
   */
  async function saveEditedUser() {
    try {
      // Get form data
      const userId = document.getElementById('edit-user-id').value;
      const username = document.getElementById('edit-username').value;
      const email = document.getElementById('edit-email').value;
      const password = document.getElementById('edit-password').value;
      const role = document.getElementById('edit-role').value;
      
      // Get selected groups
      const groupsSelect = document.getElementById('edit-groups');
      const selectedGroups = Array.from(groupsSelect.selectedOptions).map(option => option.value);
      
      // Validate form
      if (!username || !email || !role) {
        showErrorAlert('Please fill in all required fields');
        return;
      }
      
      // Show loading indicator
      // Loading indicator removed
      
      // Prepare user data
      const userData = {
        username,
        email,
        role,
        groups: selectedGroups
      };
      
      // Only include password if it was changed
      if (password) {
        userData.password = password;
      }
      
      // Get token
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      // Send update request
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }
      
      // Hide loading indicator
      // Loading indicator removed
      
      // Close modal
      const editUserModal = document.getElementById('edit-user-modal');
      const modal = bootstrap.Modal.getInstance(editUserModal);
      modal.hide();
      
      // Show success message
      showSuccessAlert('User updated successfully');
      
      // Reload users table
      loadUsers();
      
    } catch (error) {
      console.error('Error updating user:', error);
      // Loading indicator removed
      showErrorAlert('Failed to update user: ' + error.message);
    }
  }
  
  /**
   * Delete a user
   * @param {string} userId - User ID
   */
  function deleteUser(userId) {
    // Show confirmation dialog
    showDeleteConfirmationModal(userId);
  }
  
  /**
   * Show delete confirmation modal
   * @param {string} userId - User ID to delete
   */
  function showDeleteConfirmationModal(userId) {
    // Create modal if it doesn't exist
    let deleteConfirmModal = document.getElementById('delete-user-confirm-modal');
    
    if (!deleteConfirmModal) {
      deleteConfirmModal = document.createElement('div');
      deleteConfirmModal.id = 'delete-user-confirm-modal';
      deleteConfirmModal.className = 'modal fade';
      deleteConfirmModal.setAttribute('tabindex', '-1');
      deleteConfirmModal.setAttribute('role', 'dialog');
      deleteConfirmModal.setAttribute('aria-labelledby', 'deleteUserConfirmModalLabel');
      
      deleteConfirmModal.innerHTML = `
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteUserConfirmModalLabel">Confirm Deletion</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this user? This action cannot be undone.</p>
              <input type="hidden" id="delete-user-id">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="confirm-delete-btn">Delete User</button>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(deleteConfirmModal);
      
      // Add event listener for confirm button
      document.getElementById('confirm-delete-btn').addEventListener('click', confirmDeleteUser);
    }
    
    // Set user ID in hidden field
    document.getElementById('delete-user-id').value = userId;
    
    // Show modal
    const modal = new bootstrap.Modal(deleteConfirmModal, {
      // Add options to improve accessibility
      focus: true
    });
    
    // Add event listeners to fix accessibility issues with focus management
    deleteConfirmModal.addEventListener('hide.bs.modal', function() {
      // Remove focus from the active element to prevent aria-hidden warnings
      if (document.activeElement) {
        document.activeElement.blur();
      }
    });
    
    // Clean up modal and backdrop when hidden
    deleteConfirmModal.addEventListener('hidden.bs.modal', function() {
      // Remove any lingering backdrops
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.remove());
      
      // Delay modal removal to let Bootstrap finish its cleanup
      setTimeout(() => {
        if (deleteConfirmModal && deleteConfirmModal.parentNode) {
          deleteConfirmModal.remove();
        }
      }, 100);
    });
    
    deleteConfirmModal.addEventListener('shown.bs.modal', function() {
      // Ensure focus is properly managed
      const confirmButton = document.getElementById('confirm-delete-btn');
      if (confirmButton) {
        confirmButton.focus();
      }
    });
    
    modal.show();
  }
  
  /**
   * Confirm and process user deletion
   */
  async function confirmDeleteUser() {
    try {
      // Get user ID from hidden field
      const userId = document.getElementById('delete-user-id').value;
      
      if (!userId) {
        throw new Error('User ID is missing');
      }
      
      // Get authentication token
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      // Show loading indicator
      // Loading indicator removed
      
      // Send delete request to API
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }
      
      // Hide loading indicator
      // Loading indicator removed
      
      // Close modal
      const deleteConfirmModal = document.getElementById('delete-user-confirm-modal');
      const modal = bootstrap.Modal.getInstance(deleteConfirmModal);
      modal.hide();
      
      // Show success message
      showSuccessAlert('User deleted successfully');
      
      // Reload users table
      loadUsers();
      
    } catch (error) {
      console.error('Error deleting user:', error);
      // Loading indicator removed
      showErrorAlert('Failed to delete user: ' + error.message);
      
      // Close modal even if there's an error
      const deleteConfirmModal = document.getElementById('delete-user-confirm-modal');
      const modal = bootstrap.Modal.getInstance(deleteConfirmModal);
      if (modal) {
        modal.hide();
      }
    }
  }
  
  // Loading overlay functions removed as they are not needed
  
  /**
   * Show success alert
   * @param {string} message - Success message
   */
  function showSuccessAlert(message) {
    showAlert(message, 'success');
  }
  
  /**
   * Show error alert
   * @param {string} message - Error message
   */
  function showErrorAlert(message) {
    showAlert(message, 'danger');
  }
  
  /**
   * Show alert with message and type
   * @param {string} message - Alert message
   * @param {string} type - Alert type (success, danger, warning, info)
   */
  function showAlert(message, type = 'info') {
    // Create alert container if it doesn't exist
    let alertContainer = document.getElementById('alert-container');
    
    if (!alertContainer) {
      alertContainer = document.createElement('div');
      alertContainer.id = 'alert-container';
      alertContainer.className = 'position-fixed top-0 end-0 p-3';
      alertContainer.style.zIndex = '9999';
      document.body.appendChild(alertContainer);
    }
    
    // Create alert
    const alertId = 'alert-' + Date.now();
    const alertElement = document.createElement('div');
    alertElement.id = alertId;
    alertElement.className = `alert alert-${type} alert-dismissible fade show`;
    alertElement.role = 'alert';
    
    alertElement.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Add alert to container
    alertContainer.appendChild(alertElement);
    
    // Initialize Bootstrap alert
    const bsAlert = new bootstrap.Alert(alertElement);
    
    // Auto-close after 5 seconds, but only if the alert still exists
    const autoCloseTimeout = setTimeout(() => {
      if (alertElement && alertElement.parentNode && bsAlert) {
        try {
          bsAlert.close();
        } catch (error) {
          // Alert was already removed, just clean up
          if (alertElement && alertElement.parentNode) {
            alertElement.remove();
          }
        }
      }
    }, 5000);
    
    // Remove from DOM after closed and clear timeout
    alertElement.addEventListener('closed.bs.alert', function() {
      clearTimeout(autoCloseTimeout);
      this.remove();
    });
  }
  
  /**
   * Show group management interface
   */
  function showManageGroups() {
    const adminDashboardContainer = document.getElementById('admin-dashboard-container');
    if (!adminDashboardContainer) return;
    
    adminDashboardContainer.innerHTML = `
      <div class="container-fluid py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>Group Management</h2>
          <div>
            <button id="add-group-btn" class="btn btn-primary me-2">Add Group</button>
            <button id="back-to-admin-btn" class="btn btn-secondary">Back to Admin</button>
          </div>
        </div>
        
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">Groups</h5>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Members</th>
                        <th>Assessments</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody id="groups-table-body">
                      <tr>
                        <td colspan="6" class="text-center">Loading groups...</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add event listeners
    const addGroupBtn = document.getElementById('add-group-btn');
    if (addGroupBtn) {
      addGroupBtn.addEventListener('click', showAddGroupModal);
    }
    
    const backToAdminBtn = document.getElementById('back-to-admin-btn');
    if (backToAdminBtn) {
      backToAdminBtn.addEventListener('click', showAdminDashboard);
    }
    
    // Load groups
    loadGroupsTable();
  }
  
  /**
   * Load groups into the table
   */
  async function loadGroupsTable() {
    try {
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch('/api/groups', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }
      
      const groups = await response.json();
      const tableBody = document.getElementById('groups-table-body');
      
      if (!groups || groups.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="6" class="text-center text-muted">No groups found</td>
          </tr>
        `;
        return;
      }
      
      tableBody.innerHTML = groups.map(group => {
        const memberCount = group.memberDetails ? group.memberDetails.length : 0;
        const assessmentCount = group.assessments ? group.assessments.length : 0;
        const createdDate = new Date(group.createdAt).toLocaleDateString();
        
        return `
          <tr>
            <td><strong>${group.name}</strong></td>
            <td>${group.description || '-'}</td>
            <td>
              <span class="badge bg-info">${memberCount} members</span>
              ${memberCount > 0 ? `<button class="btn btn-sm btn-outline-info ms-1" onclick="window.authUI.showGroupMembers('${group.id}')">View</button>` : ''}
            </td>
            <td>
              <span class="badge bg-success">${assessmentCount} assessments</span>
              ${assessmentCount > 0 ? `<button class="btn btn-sm btn-outline-success ms-1" onclick="window.authUI.showGroupAssessments('${group.id}')">View</button>` : ''}
            </td>
            <td>${createdDate}</td>
            <td>
              <div class="btn-group btn-group-sm" role="group">
                <button class="btn btn-outline-primary" onclick="window.authUI.editGroup('${group.id}')" title="Edit Group">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline-info" onclick="window.authUI.manageGroupMembers('${group.id}')" title="Manage Members">
                  <i class="fas fa-users"></i>
                </button>
                <button class="btn btn-outline-success" onclick="window.authUI.manageGroupAssessments('${group.id}')" title="Manage Assessments">
                  <i class="fas fa-clipboard-list"></i>
                </button>
                <button class="btn btn-outline-danger" onclick="window.authUI.deleteGroup('${group.id}')" title="Delete Group">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
      
    } catch (error) {
      console.error('Error loading groups:', error);
      const tableBody = document.getElementById('groups-table-body');
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center text-danger">Error loading groups: ${error.message}</td>
        </tr>
      `;
    }
  }
  
  /**
   * Show add group modal
   */
  function showAddGroupModal() {
    const modalHtml = `
      <div class="modal fade" id="add-group-modal" tabindex="-1" aria-labelledby="add-group-modal-label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="add-group-modal-label">Add New Group</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="add-group-form">
                <div class="mb-3">
                  <label for="group-name" class="form-label">Group Name *</label>
                  <input type="text" class="form-control" id="group-name" required>
                </div>
                <div class="mb-3">
                  <label for="group-description" class="form-label">Description</label>
                  <textarea class="form-control" id="group-description" rows="3" placeholder="Optional description for the group"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" id="save-group-btn">Create Group</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('add-group-modal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Initialize modal
    const modal = new bootstrap.Modal(document.getElementById('add-group-modal'));
    const addGroupModal = document.getElementById('add-group-modal');
    
    // Add save event listener
    const saveBtn = document.getElementById('save-group-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', saveNewGroup);
    }
    
    // Add event listeners to fix accessibility issues with focus management
    addGroupModal.addEventListener('hide.bs.modal', function() {
      // Remove focus from the active element to prevent aria-hidden warnings
      if (document.activeElement) {
        document.activeElement.blur();
      }
    });
    
    // Clean up modal and backdrop when hidden
    addGroupModal.addEventListener('hidden.bs.modal', function() {
      // Remove any lingering backdrops
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.remove());
      
      // Delay modal removal to let Bootstrap finish its cleanup
      setTimeout(() => {
        if (addGroupModal && addGroupModal.parentNode) {
          addGroupModal.remove();
        }
      }, 100);
    });
    
    addGroupModal.addEventListener('shown.bs.modal', function() {
      // Ensure focus is properly managed
      const nameField = document.getElementById('group-name');
      if (nameField) {
        nameField.focus();
      }
    });
    
    modal.show();
  }
  
  /**
   * Save new group
   */
  async function saveNewGroup() {
    try {
      const name = document.getElementById('group-name').value.trim();
      const description = document.getElementById('group-description').value.trim();
      
      if (!name) {
        showErrorAlert('Group name is required');
        return;
      }
      
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          description
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create group');
      }
      
      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('add-group-modal'));
      modal.hide();
      
      // Reload groups table
      loadGroupsTable();
      
      showAlert('Group created successfully!', 'success');
      
    } catch (error) {
      console.error('Error creating group:', error);
      showErrorAlert('Failed to create group: ' + error.message);
    }
  }
  
  /**
   * Manage assessments for a group
   * @param {string} groupId - Group ID
   */
  async function manageGroupAssessments(groupId) {
    try {
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      // Fetch group details and available assessments
      const [groupResponse, assessmentsResponse] = await Promise.all([
        fetch(`/api/groups/${groupId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/assessments', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);
      
      if (!groupResponse.ok) {
        throw new Error('Failed to fetch group details');
      }
      
      const group = await groupResponse.json();
      let assessments = [];
      
      if (assessmentsResponse.ok) {
        const assessmentsData = await assessmentsResponse.json();
        // Handle the API response structure: { success: true, data: { assessments: [...] } }
        if (assessmentsData.success && assessmentsData.data && assessmentsData.data.assessments) {
          assessments = assessmentsData.data.assessments;
        }
      }
      
      showAssessmentManagementModal(group, assessments);
      
    } catch (error) {
      console.error('Error managing group assessments:', error);
      showErrorAlert('Failed to load assessment management: ' + error.message);
    }
  }
  
  /**
   * Show assessment management modal
   * @param {Object} group - Group object
   * @param {Array} assessments - Available assessments
   */
  function showAssessmentManagementModal(group, assessments) {
    const modalHtml = `
      <div class="modal fade" id="manage-assessments-modal" tabindex="-1" aria-labelledby="manage-assessments-modal-label" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="manage-assessments-modal-label">Manage Assessments for "${group.name}"</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <h6>Available Assessments</h6>
                  <div class="list-group" id="available-assessments">
                    ${assessments.filter(a => !group.assessments.includes(a._id.toString())).map(assessment => `
                      <div class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>${assessment.metadata?.systemName || 'Unnamed Assessment'}</strong>
                          <br><small class="text-muted">${assessment.metadata?.teamName || ''}</small>
                          <br><small class="text-muted">${new Date(assessment.timestamp).toLocaleDateString()}</small>
                        </div>
                        <button class="btn btn-sm btn-success" onclick="addAssessmentToGroup('${group.id}', '${assessment._id}')">
                          <i class="fas fa-plus"></i> Add
                        </button>
                      </div>
                    `).join('')}
                  </div>
                  ${assessments.filter(a => !group.assessments.includes(a._id.toString())).length === 0 ? '<p class="text-muted">No available assessments</p>' : ''}
                </div>
                <div class="col-md-6">
                  <h6>Assigned Assessments</h6>
                  <div class="list-group" id="assigned-assessments">
                    ${group.assessments.map(assessmentId => {
                      const assessment = assessments.find(a => a._id.toString() === assessmentId);
                      return assessment ? `
                        <div class="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <strong>${assessment.metadata?.systemName || 'Unnamed Assessment'}</strong>
                            <br><small class="text-muted">${assessment.metadata?.teamName || ''}</small>
                            <br><small class="text-muted">${new Date(assessment.timestamp).toLocaleDateString()}</small>
                          </div>
                          <button class="btn btn-sm btn-danger" onclick="removeAssessmentFromGroup('${group.id}', '${assessment._id}')">
                            <i class="fas fa-minus"></i> Remove
                          </button>
                        </div>
                      ` : `
                        <div class="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <strong>Unknown Assessment</strong>
                            <br><small class="text-muted">ID: ${assessmentId}</small>
                          </div>
                          <button class="btn btn-sm btn-danger" onclick="removeAssessmentFromGroup('${group.id}', '${assessmentId}')">
                            <i class="fas fa-minus"></i> Remove
                          </button>
                        </div>
                      `;
                    }).join('')}
                  </div>
                  ${group.assessments.length === 0 ? '<p class="text-muted">No assessments assigned</p>' : ''}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('manage-assessments-modal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Initialize modal
    const modal = new bootstrap.Modal(document.getElementById('manage-assessments-modal'));
    const manageAssessmentsModal = document.getElementById('manage-assessments-modal');
    
    // Add event listeners to fix accessibility issues with focus management
    manageAssessmentsModal.addEventListener('hide.bs.modal', function() {
      // Remove focus from the active element to prevent aria-hidden warnings
      if (document.activeElement) {
        document.activeElement.blur();
      }
    });
    
    // Clean up modal and backdrop when hidden
    manageAssessmentsModal.addEventListener('hidden.bs.modal', function() {
      // Remove any lingering backdrops
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.remove());
      
      // Delay modal removal to let Bootstrap finish its cleanup
      setTimeout(() => {
        if (manageAssessmentsModal && manageAssessmentsModal.parentNode) {
          manageAssessmentsModal.remove();
        }
      }, 100);
    });
    
    modal.show();
  }
  
  /**
   * Show member management modal
   * @param {Object} group - Group object
   * @param {Array} users - Available users
   */
  function showMemberManagementModal(group, users) {
    const modalHtml = `
      <div class="modal fade" id="manage-members-modal" tabindex="-1" aria-labelledby="manage-members-modal-label">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="manage-members-modal-label">Manage Members for "${group.name}"</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <h6>Available Users</h6>
                  <div class="list-group" id="available-users">
                    ${(() => {
                      // Ensure members is an array
                      const members = Array.isArray(group.members) ? group.members : [];
                      
                      return users.filter(user => {
                        // Check if user ID is in members array
                        const userId = user._id.toString();
                        return !members.some(memberId => {
                          return memberId === userId || memberId.toString() === userId;
                        });
                      }).map(user => `
                        <div class="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <strong>${user.username || 'Unknown User'}</strong>
                            <br><small class="text-muted">${user.email || ''}</small>
                            <br><small class="text-muted">Role: ${user.role || 'User'}</small>
                          </div>
                          <button class="btn btn-sm btn-success" onclick="addUserToGroup('${group._id}', '${user._id}')">
                            <i class="fas fa-plus"></i> Add
                          </button>
                        </div>
                      `).join('');
                    })()
                    }
                  </div>
                  ${(() => {
                    // Ensure members is an array
                    const members = Array.isArray(group.members) ? group.members : [];
                    
                    const availableUsers = users.filter(user => {
                      // Check if user ID is in members array
                      const userId = user._id.toString();
                      return !members.some(memberId => {
                        return memberId === userId || memberId.toString() === userId;
                      });
                    });
                    
                    return availableUsers.length === 0 ? 
                      '<p class="text-muted">No available users</p>' : 
                      availableUsers.map(user => `
                        <div class="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <strong>${user.username || 'Unknown User'}</strong>
                            <br><small class="text-muted">${user.email || ''}</small>
                            <br><small class="text-muted">Role: ${user.role || 'User'}</small>
                          </div>
                          <button class="btn btn-sm btn-success" onclick="addUserToGroup('${group._id}', '${user._id}')">
                            <i class="fas fa-plus"></i> Add
                          </button>
                        </div>
                      `).join('');
                  })()}
                </div>
                <div class="col-md-6">
                  <h6>Group Members</h6>
                  <div class="list-group" id="group-members">
                    ${(() => {
                      // Ensure members is an array
                      const members = Array.isArray(group.members) ? group.members : [];
                      
                      // If we have memberDetails, use those
                      if (group.memberDetails && Array.isArray(group.memberDetails) && group.memberDetails.length > 0) {
                        return group.memberDetails.map(member => `
                          <div class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <strong>${member.username || 'Unknown User'}</strong>
                              <br><small class="text-muted">${member.email || ''}</small>
                              <br><small class="text-muted">Role: ${member.role || 'User'}</small>
                            </div>
                            <button class="btn btn-sm btn-danger" onclick="removeUserFromGroup('${group._id}', '${member._id}')">
                              <i class="fas fa-minus"></i> Remove
                            </button>
                          </div>
                        `).join('');
                      }
                      
                      // Otherwise, try to find matching users from the users array
                      if (members.length > 0 && users && Array.isArray(users)) {
                        const memberUsers = members.map(memberId => {
                          // Find the user in the users array
                          const user = users.find(u => u._id === memberId || u._id.toString() === memberId);
                          return user || { _id: memberId, username: memberId.includes('anonymous') ? 'Anonymous' : 'User ' + memberId };
                        });
                        
                        return memberUsers.map(member => `
                          <div class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <strong>${member.username || 'Unknown User'}</strong>
                              <br><small class="text-muted">${member.email || ''}</small>
                              <br><small class="text-muted">Role: ${member.role || 'User'}</small>
                            </div>
                            <button class="btn btn-sm btn-danger" onclick="removeUserFromGroup('${group._id}', '${member._id}')">
                              <i class="fas fa-minus"></i> Remove
                            </button>
                          </div>
                        `).join('');
                      }
                      
                      return '';
                    })()} 
                  </div>
                  ${(() => {
                    const members = Array.isArray(group.members) ? group.members : [];
                    const memberDetails = Array.isArray(group.memberDetails) ? group.memberDetails : [];
                    return (members.length === 0 && memberDetails.length === 0) ? '<p class="text-muted">No members in this group</p>' : '';
                  })()}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('manage-members-modal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Initialize modal
    const modal = new bootstrap.Modal(document.getElementById('manage-members-modal'));
    const manageMembersModal = document.getElementById('manage-members-modal');
    
    // Add event listener to fix accessibility issues with focus management
    manageMembersModal.addEventListener('hide.bs.modal', function() {
      // Remove focus from the active element to prevent aria-hidden warnings
      if (document.activeElement) {
        document.activeElement.blur();
      }
    });
    
    // Clean up modal and backdrop when hidden
    manageMembersModal.addEventListener('hidden.bs.modal', function() {
      // Remove any lingering backdrops
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.remove());
      
      // Delay modal removal to let Bootstrap finish its cleanup
      setTimeout(() => {
        if (manageMembersModal && manageMembersModal.parentNode) {
          manageMembersModal.remove();
        }
      }, 100);
    });
    
    modal.show();
  }
  
  /**
   * Add assessment to group
   * @param {string} groupId - Group ID
   * @param {string} assessmentId - Assessment ID
   */
  window.addAssessmentToGroup = async function(groupId, assessmentId) {
    try {
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`/api/groups/${groupId}/assessments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ assessmentId })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to add assessment to group');
      }
      
      // Close modal and refresh group management
      const modal = bootstrap.Modal.getInstance(document.getElementById('manage-assessments-modal'));
      modal.hide();
      
      // Refresh the group management view
      loadGroupsTable();
      
      showAlert('Assessment added to group successfully!', 'success');
      
    } catch (error) {
      console.error('Error adding assessment to group:', error);
      showErrorAlert('Failed to add assessment to group: ' + error.message);
    }
  };
  
  /**
   * Remove assessment from group
   * @param {string} groupId - Group ID
   * @param {string} assessmentId - Assessment ID
   */
  window.removeAssessmentFromGroup = async function(groupId, assessmentId) {
    try {
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`/api/groups/${groupId}/assessments/${assessmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to remove assessment from group');
      }
      
      // Close modal and refresh group management
      const modal = bootstrap.Modal.getInstance(document.getElementById('manage-assessments-modal'));
      modal.hide();
      
      // Refresh the group management view
      loadGroupsTable();
      
      showAlert('Assessment removed from group successfully!', 'success');
      
    } catch (error) {
      console.error('Error removing assessment from group:', error);
      showErrorAlert('Failed to remove assessment from group: ' + error.message);
    }
  };
  
  /**
   * Add user to group
   * @param {string} groupId - Group ID
   * @param {string} userId - User ID
   */
  window.addUserToGroup = async function(groupId, userId) {
    try {
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`/api/groups/${groupId}/members`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to add user: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Close any existing modal first
      const existingModal = bootstrap.Modal.getInstance(document.getElementById('manage-members-modal'));
      if (existingModal) {
        existingModal.hide();
      }
      
      if (data.success || (data.id || data._id)) {
        showSuccessAlert('User added to group');
        // Refresh the modal with a slight delay to ensure DOM is updated
        setTimeout(() => {
          window.authUI.manageGroupMembers(groupId);
        }, 100);
      } else {
        throw new Error(data.message || 'Failed to add user');
      }
      
    } catch (error) {
      console.error('Error adding user to group:', error);
      showErrorAlert('Failed to add user: ' + error.message);
    }
  };
  
  /**
   * Remove user from group
   * @param {string} groupId - Group ID
   * @param {string} userId - User ID
   */
  window.removeUserFromGroup = async function(groupId, userId) {
    try {
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`/api/groups/${groupId}/members/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to remove user: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Close any existing modal first
      const existingModal = bootstrap.Modal.getInstance(document.getElementById('manage-members-modal'));
      if (existingModal) {
        existingModal.hide();
      }
      
      if (data.success || (data.id || data._id)) {
        showSuccessAlert('User removed from group');
        // Refresh the modal with a slight delay to ensure DOM is updated
        setTimeout(() => {
          window.authUI.manageGroupMembers(groupId);
        }, 100);
      } else {
        throw new Error(data.message || 'Failed to remove user');
      }
      
    } catch (error) {
      console.error('Error removing user from group:', error);
      showErrorAlert('Failed to remove user: ' + error.message);
    }
  };
  

  /**
   * Manage group members
   * @param {string} groupId - Group ID
   */
  async function manageGroupMembers(groupId) {
    try {
      // Get the group data
      const groupResponse = await fetch(`/api/groups/${groupId}`, {
        headers: {
          'Authorization': `Bearer ${window.authService.getToken()}`
        }
      });
      
      if (!groupResponse.ok) {
        throw new Error(`Failed to fetch group: ${groupResponse.status}`);
      }
      
      let groupData = await groupResponse.json();
      let group;
      
      // Handle the API response structure
      if (groupData.success && groupData.data) {
        group = groupData.data;
      } else if (groupData.id || groupData._id) {
        group = groupData;
        if (!group._id && group.id) {
          group._id = group.id;
        }
      }
      
      // Ensure members is an array
      if (!group.members) {
        group.members = [];
      } else if (!Array.isArray(group.members)) {
        group.members = [group.members];
      }
      
      // Get all users
      const usersResponse = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${window.authService.getToken()}`
        }
      });
      
      if (!usersResponse.ok) {
        throw new Error(`Failed to fetch users: ${usersResponse.status}`);
      }
      
      const usersData = await usersResponse.json();
      const users = usersData.success && Array.isArray(usersData.data) ? usersData.data : [];
      
      // Show the modal
      showMemberManagementModal(group, users);
      
      // Show the modal
      const modal = new bootstrap.Modal(document.getElementById('manage-members-modal'));
      modal.show();
      
    } catch (error) {
      console.error('Error managing group members:', error);
      showErrorAlert('Failed to manage group members: ' + error.message);
    }
  };
  
  /**
   * Show group management modal
   * @param {Object} group - Group object
   */
  function showManageGroupModal(group) {
    const modalHtml = `
      <div class="modal fade" id="manage-group-modal" tabindex="-1" aria-labelledby="manage-group-modal-label" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="manage-group-modal-label">Manage Group "${group.name}"</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <h6>Group Details</h6>
                  <div class="list-group">
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Group Name</strong>
                        <br><small class="text-muted">${group.name}</small>
                      </div>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Group Description</strong>
                        <br><small class="text-muted">${group.description}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <h6>Actions</h6>
                  <div class="list-group">
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Edit Group</strong>
                        <br><small class="text-muted">Edit group details</small>
                      </div>
                      <button class="btn btn-sm btn-primary" onclick="window.authUI.editGroup('${group._id}')">
                        <i class="fas fa-edit"></i> Edit
                      </button>
                    </div>
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Delete Group</strong>
                        <br><small class="text-muted">Delete group permanently</small>
                      </div>
                      <button class="btn btn-sm btn-danger" onclick="window.authUI.deleteGroup('${group._id}')">
                        <i class="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('manage-group-modal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Initialize modal
    const modal = new bootstrap.Modal(document.getElementById('manage-group-modal'));
    const manageGroupModal = document.getElementById('manage-group-modal');
    
    // Add event listeners to fix accessibility issues with focus management
    manageGroupModal.addEventListener('hide.bs.modal', function() {
      // Remove focus from the active element to prevent aria-hidden warnings
      if (document.activeElement) {
        document.activeElement.blur();
      }
    });
    
    // Clean up modal and backdrop when hidden
    manageGroupModal.addEventListener('hidden.bs.modal', function() {
      // Remove any lingering backdrops
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.remove());
      
      // Delay modal removal to let Bootstrap finish its cleanup
      setTimeout(() => {
        if (manageGroupModal && manageGroupModal.parentNode) {
          manageGroupModal.remove();
        }
      }, 100);
    });
    
    modal.show();
  }
  
  /**
   * Show group assessments modal
   * @param {Object} group - Group object
   */
  function showManageGroupAssessmentsModal(group) {
    // Ensure group has the required properties
    if (!group) {
      console.error('Group data is missing');
      showErrorAlert('Unable to load assessment management: Group data is missing');
      return;
    }
    
    console.log('Showing modal for group:', group);
    console.log('Group assessments:', group.assessments);
    
    // Ensure assessments and availableAssessments are arrays
    const groupAssessments = Array.isArray(group.assessments) ? group.assessments : [];
    const availableAssessments = Array.isArray(group.availableAssessments) ? group.availableAssessments : [];
    
    console.log('Processed group assessments:', groupAssessments);
    console.log('Available assessments:', availableAssessments);
    
    const modalHtml = `
      <div class="modal fade" id="manage-group-assessments-modal" tabindex="-1" aria-labelledby="manage-group-assessments-modal-label">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="manage-group-assessments-modal-label">Manage Assessments for Group "${group.name || 'Unknown'}"</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <h6>Assigned Assessments</h6>
                  <div class="list-group" id="assigned-assessments">
                    ${groupAssessments.length > 0 ? 
                      groupAssessments.map(assessment => {
                        // Handle both object and string ID references
                        const assessmentName = assessment.name || 'Assessment';
                        const assessmentId = typeof assessment === 'object' ? assessment._id : assessment;
                        return `
                          <div class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <strong>${assessmentName}</strong>
                              <br><small class="text-muted">ID: ${assessmentId}</small>
                            </div>
                            <button class="btn btn-sm btn-danger" onclick="removeAssessmentFromGroup('${group._id}', '${assessmentId}')">
                              <i class="fas fa-minus"></i> Remove
                            </button>
                          </div>
                        `;
                      }).join('') : 
                      '<p class="text-muted">No assessments assigned</p>'
                    }
                  </div>
                </div>
                <div class="col-md-6">
                  <h6>Available Assessments</h6>
                  <div class="list-group" id="available-assessments">
                    ${availableAssessments.length > 0 ? 
                      availableAssessments.map(assessment => {
                        // Handle both object and string ID references
                        const assessmentName = assessment.name || 'Assessment';
                        const assessmentId = typeof assessment === 'object' ? assessment._id : assessment;
                        return `
                          <div class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <strong>${assessmentName}</strong>
                              <br><small class="text-muted">ID: ${assessmentId}</small>
                            </div>
                            <button class="btn btn-sm btn-success" onclick="addAssessmentToGroup('${group._id}', '${assessmentId}')">
                              <i class="fas fa-plus"></i> Add
                            </button>
                          </div>
                        `;
                      }).join('') : 
                      '<p class="text-muted">No assessments available</p>'
                    }
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('manage-group-assessments-modal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Initialize modal
    const modal = new bootstrap.Modal(document.getElementById('manage-group-assessments-modal'));
    const manageGroupAssessmentsModal = document.getElementById('manage-group-assessments-modal');
    
    // Add event listener to fix accessibility issues with focus management
    manageGroupAssessmentsModal.addEventListener('hide.bs.modal', function() {
      // Remove focus from the active element to prevent aria-hidden warnings
      if (document.activeElement) {
        document.activeElement.blur();
      }
    });
    
    // Clean up modal and backdrop when hidden
    manageGroupAssessmentsModal.addEventListener('hidden.bs.modal', function() {
      // Remove any lingering backdrops
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.remove());
      
      // Delay modal removal to let Bootstrap finish its cleanup
      setTimeout(() => {
        if (manageGroupAssessmentsModal && manageGroupAssessmentsModal.parentNode) {
          manageGroupAssessmentsModal.remove();
        }
      }, 100);
    });
    
    modal.show();
  }
  
  /**
   * Manage group assessments
   * @param {string} groupId - Group ID
   */
  async function manageGroupAssessments(groupId) {
    try {
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      // Fetch group details and all assessments
      const [groupResponse, assessmentsResponse] = await Promise.all([
        fetch(`/api/groups/${groupId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }),
        fetch('/api/assessments', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
      ]);
      
      if (!groupResponse.ok) {
        throw new Error(`Failed to fetch group: ${groupResponse.status}`);
      }
      
      if (!assessmentsResponse.ok) {
        throw new Error(`Failed to fetch assessments: ${assessmentsResponse.status}`);
      }
      
      const groupData = await groupResponse.json();
      const assessmentsData = await assessmentsResponse.json();
      
      let group = {};
      let assessments = [];
      
      // Handle the API response structure
      if (groupData.success && groupData.data) {
        // Standard success response with data wrapper
        group = groupData.data;
      } else if (groupData.id || groupData._id) {
        // The API returned the group object directly without a wrapper
        group = groupData;
        // Ensure the group has an _id property
        if (!group._id && group.id) {
          group._id = group.id;
        }
      } else if (groupData.success === false && groupData.message) {
        throw new Error(groupData.message);
      } else {
        // If we can't determine the structure, create a minimal valid group object
        group = { _id: groupId, name: 'Group ' + groupId, assessments: [], members: [] };
      }
      
      // Handle the API response structure
      if (assessmentsData.success && assessmentsData.data) {
        assessments = assessmentsData.data;
      }
      
      // Ensure assessments is an array
      if (!Array.isArray(assessments)) {
        assessments = [];
      }
      
      // Filter out assessments already assigned to the group
      const availableAssessments = assessments.filter(assessment => {
        // Check if group.assessments exists and is an array
        if (!group.assessments || !Array.isArray(group.assessments)) {
          return true; // If no assessments array, all assessments are available
        }
        
        // Check if the assessment is not already in the group's assessments
        return !group.assessments.some(groupAssessment => {
          // Handle both object references and string IDs
          const assessmentId = typeof groupAssessment === 'object' ? groupAssessment._id : groupAssessment;
          return assessmentId === assessment._id;
        });
      });
      
      // Update group object with available assessments
      group.availableAssessments = availableAssessments;
      
      // Ensure group.assessments is an array
      if (!Array.isArray(group.assessments)) {
        group.assessments = [];
      }
      
      showManageGroupAssessmentsModal(group);
      
    } catch (error) {
      console.error('Error managing group assessments:', error);
      showErrorAlert('Failed to load assessment management: ' + error.message);
    }
  }
  
  /**
   * Show edit group modal
   * @param {Object} group - Group object
   */
  function showEditGroupModal(group) {
    const modalHtml = `
      <div class="modal fade" id="edit-group-modal" tabindex="-1" aria-labelledby="edit-group-modal-label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="edit-group-modal-label">Edit Group</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="edit-group-form">
                <div class="mb-3">
                  <label for="edit-group-name" class="form-label">Group Name</label>
                  <input type="text" class="form-control" id="edit-group-name" value="${group.name || ''}" required>
                </div>
                <div class="mb-3">
                  <label for="edit-group-description" class="form-label">Description</label>
                  <textarea class="form-control" id="edit-group-description" rows="3">${group.description || ''}</textarea>
                </div>
                <input type="hidden" id="edit-group-id" value="${group._id}">
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" id="update-group-btn">Update Group</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('edit-group-modal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Initialize modal
    const modal = new bootstrap.Modal(document.getElementById('edit-group-modal'));
    const editGroupModal = document.getElementById('edit-group-modal');
    
    // Add event listeners to fix accessibility issues with focus management
    editGroupModal.addEventListener('hide.bs.modal', function() {
      // Remove focus from the active element to prevent aria-hidden warnings
      if (document.activeElement) {
        document.activeElement.blur();
      }
    });
    
    // Clean up modal and backdrop when hidden
    editGroupModal.addEventListener('hidden.bs.modal', function() {
      // Remove any lingering backdrops
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.remove());
      
      // Delay modal removal to let Bootstrap finish its cleanup
      setTimeout(() => {
        if (editGroupModal && editGroupModal.parentNode) {
          editGroupModal.remove();
        }
      }, 100);
    });
    
    editGroupModal.addEventListener('shown.bs.modal', function() {
      // Ensure focus is properly managed
      const nameField = document.getElementById('edit-group-name');
      if (nameField) {
        nameField.focus();
      }
    });
    
    // Add update event listener
    const updateBtn = document.getElementById('update-group-btn');
    if (updateBtn) {
      updateBtn.addEventListener('click', updateGroup);
    }
    
    modal.show();
  }
  
  /**
   * Update group
   */
  async function updateGroup() {
    try {
      const groupId = document.getElementById('edit-group-id').value;
      const name = document.getElementById('edit-group-name').value.trim();
      const description = document.getElementById('edit-group-description').value.trim();
      
      if (!name) {
        showErrorAlert('Group name is required');
        return;
      }
      
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update group: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        showSuccessAlert('Group updated successfully');
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('edit-group-modal'));
        if (modal) {
          modal.hide();
        }
        
        // Refresh groups table
        loadGroupsTable();
      } else {
        throw new Error(data.message || 'Failed to update group');
      }
      
    } catch (error) {
      console.error('Error updating group:', error);
      showErrorAlert('Failed to update group: ' + error.message);
    }
  }
  
  /**
   * Show delete group confirmation
   * @param {string} groupId - Group ID
   */
  async function showDeleteGroupConfirmation(groupId) {
    try {
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      // First fetch the group to check if it has assessments
      const response = await fetch(`/api/groups/${groupId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch group: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success || !data.data) {
        throw new Error(data.message || 'Failed to fetch group details');
      }
      
      const group = data.data;
      
      // Check if the group has assessments
      if (group.assessments && group.assessments.length > 0) {
        // Show error modal instead of delete confirmation
        showErrorAlert('Cannot delete group: This group has assessments assigned to it. Please remove all assessments before deleting.');
        return;
      }
      
      const modalHtml = `
      <div class="modal fade" id="delete-group-modal" tabindex="-1" aria-labelledby="delete-group-modal-label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="delete-group-modal-label">Confirm Delete</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this group? This action cannot be undone.</p>
              <p class="text-danger"><strong>Warning:</strong> Deleting this group will remove all user associations.</p>
              <input type="hidden" id="delete-group-id" value="${groupId}">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="confirm-delete-group-btn">Delete Group</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('delete-group-modal');
    if (existingModal) {
      existingModal.remove();
    }
    
    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Initialize modal
    const modal = new bootstrap.Modal(document.getElementById('delete-group-modal'));
    const deleteGroupModal = document.getElementById('delete-group-modal');
    
    // Add event listeners to fix accessibility issues with focus management
    deleteGroupModal.addEventListener('hide.bs.modal', function() {
      // Remove focus from the active element to prevent aria-hidden warnings
      if (document.activeElement) {
        document.activeElement.blur();
      }
    });
    
    // Clean up modal and backdrop when hidden
    deleteGroupModal.addEventListener('hidden.bs.modal', function() {
      // Remove any lingering backdrops
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.remove());
      
      // Delay modal removal to let Bootstrap finish its cleanup
      setTimeout(() => {
        if (deleteGroupModal && deleteGroupModal.parentNode) {
          deleteGroupModal.remove();
        }
      }, 100);
    });
    
    deleteGroupModal.addEventListener('shown.bs.modal', function() {
      // Ensure focus is properly managed
      const confirmButton = document.getElementById('confirm-delete-group-btn');
      if (confirmButton) {
        confirmButton.focus();
      }
    });
    
    // Add delete event listener
    const deleteBtn = document.getElementById('confirm-delete-group-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', confirmDeleteGroup);
    }
    
    modal.show();
    } catch (error) {
      console.error('Error showing delete confirmation:', error);
      showErrorAlert('Failed to show delete confirmation: ' + error.message);
    }
  }
  
  /**
   * Confirm delete group
   */
  async function confirmDeleteGroup() {
    try {
      const groupId = document.getElementById('delete-group-id').value;
      
      const token = window.authService ? window.authService.getToken() : null;
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`/api/groups/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete group: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        showSuccessAlert('Group deleted successfully');
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('delete-group-modal'));
        if (modal) {
          modal.hide();
        }
        
        // Refresh groups table
        loadGroupsTable();
      } else {
        throw new Error(data.message || 'Failed to delete group');
      }
      
    } catch (error) {
      console.error('Error deleting group:', error);
      showErrorAlert('Failed to delete group: ' + error.message);
    }
  }
  
  // Public API
  
  return {
    showLoginModal,
    showRegisterModal,
    updateAuthUI,
    showAdminDashboard,
    showManageUsers,
    showAssessmentForm,
    showManageGroups,
    editGroup: async function(groupId) {
      try {
        const token = window.authService ? window.authService.getToken() : null;
        if (!token) {
          throw new Error('Authentication required');
        }
        
        // Fetch group details
        const response = await fetch(`/api/groups/${groupId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch group: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          // Ensure we have a valid group object
          const group = data.data;
          if (!group || typeof group !== 'object') {
            throw new Error('Invalid group data format');
          }
          showEditGroupModal(group);
        } else {
          throw new Error(data.message || 'Failed to fetch group details');
        }
        
      } catch (error) {
        console.error('Error editing group:', error);
        showErrorAlert('Failed to edit group: ' + error.message);
      }
    },
    
    deleteGroup: async function(groupId) {
      try {
        showDeleteGroupConfirmation(groupId);
      } catch (error) {
        console.error('Error showing delete confirmation:', error);
        showErrorAlert('Failed to show delete confirmation: ' + error.message);
      }
    },
    manageGroupMembers: async function(groupId) {
      try {
        const token = window.authService ? window.authService.getToken() : null;
        if (!token) {
          throw new Error('Authentication required');
        }
        
        // Fetch group details and available users
        const [groupResponse, usersResponse] = await Promise.all([
          fetch(`/api/groups/${groupId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch('/api/users', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
        ]);
        
        if (!groupResponse.ok) {
          throw new Error(`Failed to fetch group: ${groupResponse.status}`);
        }
        
        if (!usersResponse.ok) {
          throw new Error(`Failed to fetch users: ${usersResponse.status}`);
        }
        
        const groupData = await groupResponse.json();
        const usersData = await usersResponse.json();
        
        let group = {};
        let users = [];
        
        // Handle the API response structure
        if (groupData.success && groupData.data) {
          group = groupData.data;
        } else if (groupData.id || groupData._id) {
          // The API returned the group object directly without a wrapper
          group = groupData;
          // Ensure the group has an _id property
          if (!group._id && group.id) {
            group._id = group.id;
          }
        }
        
        // Handle the API response structure
        if (usersData.success && usersData.data) {
          users = usersData.data;
        }
        
        showMemberManagementModal(group, users);
        
      } catch (error) {
        console.error('Error managing group members:', error);
        showErrorAlert('Failed to load member management: ' + error.message);
      }
    },
    manageGroupAssessments: manageGroupAssessments,
    manageGroupMembers: manageGroupMembers,
    showGroupMembers: async function(groupId) {
      try {
        // Reuse the manageGroupMembers function since it already does what we need
        this.manageGroupMembers(groupId);
      } catch (error) {
        console.error('Error showing group members:', error);
        showErrorAlert('Failed to show group members: ' + error.message);
      }
    },
    
    showGroupAssessments: async function(groupId) {
      try {
        // Simply call the manageGroupAssessments function directly
        // It already has all the necessary logic to fetch group and assessment data
        // and display the modal
        await manageGroupAssessments(groupId);
      } catch (error) {
        console.error('Error showing group assessments:', error);
        showErrorAlert('Failed to show group assessments: ' + error.message);
      }
    },
    
    /**
     * Initialize authentication UI components
     */
    init: function() {
      try {
        console.log('Initializing authentication UI...');
        
        // Create authentication modals
        createAuthModals();
        
        // Create the auth UI elements in the navbar
        createProfileDropdown();
        
        // Cache DOM elements
        loginModal = document.getElementById('login-modal');
        registerModal = document.getElementById('register-modal');
        
        // Add auth event listeners
        document.addEventListener('auth:login', handleLoginEvent);
        document.addEventListener('auth:logout', handleLogoutEvent);
        
        // Set up event listeners for auth-related buttons
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
          loginBtn.addEventListener('click', showLoginModal);
        }
        
        const registerBtn = document.getElementById('register-btn');
        if (registerBtn) {
          registerBtn.addEventListener('click', showRegisterModal);
        }
        
        // Add navigation event listeners (skip on question editor page)
        const isQuestionEditorPage = window.location.pathname.includes('question-editor.html');
        
        if (!isQuestionEditorPage) {
          const navAssessment = document.getElementById('nav-assessment');
          if (navAssessment) {
            navAssessment.addEventListener('click', showAssessmentForm);
          }
          
          const navHistory = document.getElementById('nav-history');
          if (navHistory) {
            navHistory.addEventListener('click', function(e) {
              e.preventDefault();
              if (window.assessmentHistoryUI && typeof window.assessmentHistoryUI.showHistory === 'function') {
                window.assessmentHistoryUI.showHistory(e);
              } else {
                console.error('Assessment history UI not initialized');
              }
            });
          }
          
          const navAdmin = document.getElementById('nav-admin');
          if (navAdmin) {
            navAdmin.addEventListener('click', showAdminDashboard);
          }
        }
        
        // Check authentication status and update UI
        updateAuthUI();
        
        // Force a check for admin status and update navigation visibility
        try {
          const currentUser = window.authService ? window.authService.getCurrentUser() : null;
          if (currentUser) {
            const isSysAdmin = currentUser.role === 'sysAdmin';
            
            // Update visibility of admin navigation items
            updateNavVisibility(isSysAdmin);
          }
        } catch (error) {
          console.warn('Error checking admin status:', error);
        }
        
        // Set up dropdown event listeners with a small delay to ensure DOM is ready
        setTimeout(() => {
          if (window.authService && window.authService.isAuthenticated()) {
            setupDropdownEventListeners();
          }
        }, 100);
        
        // Initialize group management if available
        const groupsTableBody = document.getElementById('groups-table-body');
        if (groupsTableBody) {
          loadGroupsTable();
        }
        
        // Listen for language change events
        document.addEventListener('authUILanguageChanged', function(event) {
          const { translations, language } = event.detail;
          // Call the method on the authUI object
          window.authUI.updateAuthUILabels(translations);
        });
        
        console.log('Authentication UI initialized successfully');
      } catch (error) {
        console.error('Error initializing authentication UI:', error);
      }
    },
    
    /**
     * Update authentication UI labels for language changes
     * @param {Object} translations - Translation object
     */
    updateAuthUILabels: function(translations) {
      try {
        // Update dynamically created modal titles and content
        const modalTitles = {
          'add-user-modal': translations.addUser,
          'edit-user-modal': translations.editUser,
          'delete-user-confirm-modal': translations.deleteUser,
          'add-group-modal': translations.addGroup,
          'edit-group-modal': translations.editGroup,
          'delete-group-modal': translations.deleteGroup,
          'manage-members-modal': translations.manageMembers,
          'manage-assessments-modal': translations.manageAssessments,
          'manage-group-modal': translations.groupManagement,
          'manage-group-assessments-modal': translations.manageAssessments
        };
        
        // Update modal titles
        Object.entries(modalTitles).forEach(([modalId, title]) => {
          const modal = document.getElementById(modalId);
          if (modal) {
            const titleElement = modal.querySelector('.modal-title');
            if (titleElement) {
              titleElement.textContent = title;
            }
          }
        });
        
        // Update button texts in modals
        const buttonTexts = {
          'save-user-btn': translations.save,
          'save-group-btn': translations.save,
          'confirm-delete-btn': translations.delete
        };
        
        Object.entries(buttonTexts).forEach(([buttonId, text]) => {
          const button = document.getElementById(buttonId);
          if (button) {
            button.textContent = text;
          }
        });
        
        // Update form labels in modals
        const labelMappings = {
          'username': translations.username,
          'email': translations.email,
          'password': translations.password,
          'confirm-password': translations.confirmPassword,
          'role': translations.role,
          'group-name': translations.groupName,
          'group-description': translations.groupDescription
        };
        
        Object.entries(labelMappings).forEach(([fieldName, labelText]) => {
          const labels = document.querySelectorAll(`label[for*="${fieldName}"]`);
          labels.forEach(label => {
            label.textContent = labelText;
          });
        });
        
        // Update table headers in admin dashboard
        const tableHeaders = document.querySelectorAll('#admin-dashboard-container th');
        tableHeaders.forEach(th => {
          const text = th.textContent.trim();
          if (text === 'Username' || text === 'Nom d\'utilisateur') th.textContent = translations.username;
          else if (text === 'Email' || text === 'Courriel') th.textContent = translations.email;
          else if (text === 'Role' || text === 'Rôle') th.textContent = translations.role;
          else if (text === 'Actions') th.textContent = translations.actions;
          else if (text === 'Members' || text === 'Membres') th.textContent = translations.members;
          else if (text === 'Assessments' || text === 'Évaluations') th.textContent = translations.assessments;
          else if (text === 'Group Name' || text === 'Nom du groupe') th.textContent = translations.groupName;
          else if (text === 'Description') th.textContent = translations.groupDescription;
        });
        
        // Update dropdown menu items
        const adminDashboardLink = document.getElementById('admin-dashboard');
        if (adminDashboardLink) {
          adminDashboardLink.textContent = translations.adminDashboard;
        }
        
        const manageUsersLink = document.getElementById('manage-users');
        if (manageUsersLink) {
          manageUsersLink.textContent = translations.manageUsers;
        }
        
        const viewProfileLink = document.getElementById('view-profile');
        if (viewProfileLink) {
          viewProfileLink.textContent = translations.myProfile || 'My Profile';
        }
        
        const viewAssessmentsLink = document.getElementById('view-assessments');
        if (viewAssessmentsLink) {
          viewAssessmentsLink.textContent = translations.myAssessments || 'My Assessments';
        }
        
        // Update logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
          logoutBtn.textContent = translations.logout || 'Logout';
        }
        
        // Update role display text
        const roleDisplay = document.getElementById('role-display');
        if (roleDisplay) {
          const currentRole = roleDisplay.textContent.split(': ')[1] || 'User';
          roleDisplay.textContent = `${translations.role || 'Role'}: ${currentRole}`;
        }
        
        // Update action buttons in tables
        const actionButtons = document.querySelectorAll('#admin-dashboard-container button, #admin-dashboard-container .btn');
        actionButtons.forEach(btn => {
          const text = btn.textContent.trim();
          if (text === 'Edit' || text === 'Modifier') btn.textContent = translations.edit;
          else if (text === 'Delete' || text === 'Supprimer') btn.textContent = translations.delete;
          else if (text === 'Add User' || text === 'Ajouter un utilisateur') btn.textContent = translations.addUser;
          else if (text === 'Add Group' || text === 'Ajouter un groupe') btn.textContent = translations.addGroup;
          else if (text === 'Manage Members' || text === 'Gérer les membres') btn.textContent = translations.manageMembers;
          else if (text === 'Manage Assessments' || text === 'Gérer les évaluations') btn.textContent = translations.manageAssessments;
        });
        
        console.log('Auth UI labels updated for language change');
      } catch (error) {
        console.error('Error updating auth UI labels:', error);
      }
    },
  };
})();
