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
    
    // Show assessment form
    document.getElementById('assessment-form').style.display = 'block';
    document.getElementById('results-container').style.display = 'none';
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const navAssessment = document.getElementById('nav-assessment');
    if (navAssessment) {
      navAssessment.classList.add('active');
    }
  }
  
  /**
   * Initialize authentication UI
   */
  function init() {
    // Create and append UI elements
    createAuthModals();
    createProfileDropdown();
    
    // Add event listeners
    document.addEventListener('auth:login', handleLoginEvent);
    document.addEventListener('auth:logout', handleLogoutEvent);
    
    // Add navigation event listeners
    const navAssessment = document.getElementById('nav-assessment');
    if (navAssessment) {
      // Remove any existing event listeners
      navAssessment.removeEventListener('click', showAssessmentForm);
      // Add new event listener
      navAssessment.addEventListener('click', showAssessmentForm);
    }
    
    const navHistory = document.getElementById('nav-history');
    if (navHistory) {
      // Remove any existing event listeners
      const oldClickHandler = navHistory.onclick;
      navHistory.onclick = null;
      // Add new event listener that calls the assessmentHistoryUI.showHistory function
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
      // Remove any existing event listeners
      navAdmin.removeEventListener('click', showAdminDashboard);
      // Add new event listener
      navAdmin.addEventListener('click', showAdminDashboard);
    }
    
    // Update UI based on authentication status
    updateAuthUI();
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
    document.getElementById('show-register').addEventListener('click', showRegisterModal);
    document.getElementById('show-login').addEventListener('click', showLoginModal);
  }
  
  /**
   * Create profile dropdown in navbar
   */
  function createProfileDropdown() {
    // Find navbar
    const navbar = document.querySelector('.navbar-nav');
    if (!navbar) {
      console.warn('Navbar not found, cannot add profile dropdown');
      return;
    }
    
    // Create profile dropdown
    profileDropdown = document.createElement('li');
    profileDropdown.className = 'nav-item dropdown ml-auto';
    
    // Add auth buttons when logged out
    profileDropdown.innerHTML = `
      <div class="auth-buttons">
        <button class="btn btn-outline-primary btn-sm" id="nav-login-btn">Login</button>
        <button class="btn btn-primary btn-sm" id="nav-register-btn">Register</button>
      </div>
      
      <div class="auth-profile d-none">
        <a class="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" 
           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span id="username-display">User</span>
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileDropdown">
          <span class="dropdown-item-text" id="role-display">Role: User</span>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" id="view-profile">My Profile</a>
          <a class="dropdown-item" href="#" id="view-assessments">My Assessments</a>
          <div class="dropdown-divider admin-only d-none"></div>
          <a class="dropdown-item admin-only d-none" href="#" id="admin-dashboard">Admin Dashboard</a>
          <a class="dropdown-item admin-only d-none" href="#" id="manage-users">Manage Users</a>
          <a class="dropdown-item admin-only d-none" href="#" id="manage-questions">Manage Questions</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" id="logout-btn">Logout</a>
        </div>
      </div>
    `;
    
    // Append to navbar
    navbar.appendChild(profileDropdown);
    
    // Add event listeners
    document.getElementById('nav-login-btn').addEventListener('click', showLoginModal);
    document.getElementById('nav-register-btn').addEventListener('click', showRegisterModal);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    document.getElementById('view-profile').addEventListener('click', showProfile);
    document.getElementById('view-assessments').addEventListener('click', showAssessments);
    document.getElementById('admin-dashboard').addEventListener('click', showAdminDashboard);
    document.getElementById('manage-users').addEventListener('click', showManageUsers);
    document.getElementById('manage-questions').addEventListener('click', showManageQuestions);
  }
  
  /**
   * Update UI based on authentication status
   */
  function updateAuthUI() {
    const isAuthenticated = window.authService.isAuthenticated();
    const currentUser = window.authService.getCurrentUser();
    
    // Update profile dropdown
    const authButtons = document.querySelector('.auth-buttons');
    const authProfile = document.querySelector('.auth-profile');
    
    if (isAuthenticated && currentUser) {
      // Show profile dropdown
      authButtons.classList.add('d-none');
      authProfile.classList.remove('d-none');
      
      // Update username and role
      document.getElementById('username-display').textContent = currentUser.username;
      document.getElementById('role-display').textContent = `Role: ${formatRole(currentUser.role)}`;
      
      // Show/hide admin options
      const isAdmin = window.authService.hasRole(['sysAdmin', 'assessment_admin']);
      const adminElements = document.querySelectorAll('.admin-only');
      adminElements.forEach(el => {
        if (isAdmin) {
          el.classList.remove('d-none');
        } else {
          el.classList.add('d-none');
        }
      });
    } else {
      // Show login/register buttons
      authButtons.classList.remove('d-none');
      authProfile.classList.add('d-none');
    }
  }
  
  /**
   * Format role for display
   * @param {string} role - Role name
   * @returns {string} Formatted role name
   */
  function formatRole(role) {
    switch (role) {
      case 'sysAdmin':
        return 'System Administrator';
      case 'assessment_admin':
        return 'Assessment Administrator';
      case 'assessment_user':
        return 'User';
      default:
        return role;
    }
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

    
    // Hide other containers
    document.getElementById('assessment-form').style.display = 'none';
    document.getElementById('results-container').style.display = 'none';
    if (window.assessmentHistoryUI && typeof window.assessmentHistoryUI.hideHistory === 'function') {
      window.assessmentHistoryUI.hideHistory();
    }
    
    // Get the admin dashboard container
    const adminDashboardContainer = document.getElementById('admin-dashboard-container');
    
    // Show the container
    adminDashboardContainer.style.display = 'block';
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const navAdmin = document.getElementById('nav-admin');
    if (navAdmin) {
      navAdmin.classList.add('active');
    }
    
    // Create dashboard content
    adminDashboardContainer.innerHTML = `
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h3>Admin Dashboard</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4 mb-3">
              <div class="card h-100">
                <div class="card-header">User Management</div>
                <div class="card-body">
                  <p>Manage users and their roles</p>
                  <button id="manage-users-btn" class="btn btn-outline-primary">Manage Users</button>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="card h-100">
                <div class="card-header">Group Management</div>
                <div class="card-body">
                  <p>Create and manage user groups</p>
                  <button id="manage-groups-btn" class="btn btn-outline-primary">Manage Groups</button>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="card h-100">
                <div class="card-header">Assessment Analytics</div>
                <div class="card-body">
                  <p>View assessment statistics and trends</p>
                  <button id="view-analytics-btn" class="btn btn-outline-primary">View Analytics</button>
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
        alert('Group management feature coming soon!');
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
    event.preventDefault();

    
    // Get the admin dashboard container
    const adminDashboardContainer = document.getElementById('admin-dashboard-container');
    
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
      
      if (data.groups && data.groups.length > 0) {
        // Add groups to select
        data.groups.forEach(group => {
          const option = document.createElement('option');
          option.value = group.groupId;
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
      document.getElementById('edit-username').value = userData.username || '';
      document.getElementById('edit-email').value = userData.email || '';
      document.getElementById('edit-password').value = ''; // Clear password field
      
      // Set role
      const roleSelect = document.getElementById('edit-role');
      if (roleSelect) {
        for (let i = 0; i < roleSelect.options.length; i++) {
          if (roleSelect.options[i].value === userData.role) {
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
      
      // Add an event listener to fix accessibility issues with aria-hidden
      editUserModal.addEventListener('shown.bs.modal', function() {
        // Remove aria-hidden attribute if it was added by Bootstrap
        if (editUserModal.getAttribute('aria-hidden') === 'true') {
          editUserModal.removeAttribute('aria-hidden');
        }
        
        // Ensure focus is properly managed
        const usernameField = document.getElementById('edit-username');
        if (usernameField) {
          usernameField.focus();
        }
      });
      
      modal.show();
      
      // Load groups and set selected groups
      await loadGroupsForEdit(userData.groups || []);
      
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
    
    // Add an event listener to fix accessibility issues with aria-hidden
    deleteConfirmModal.addEventListener('shown.bs.modal', function() {
      // Remove aria-hidden attribute if it was added by Bootstrap
      if (deleteConfirmModal.getAttribute('aria-hidden') === 'true') {
        deleteConfirmModal.removeAttribute('aria-hidden');
      }
      
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
    
    // Auto-close after 5 seconds
    setTimeout(() => {
      bsAlert.close();
    }, 5000);
    
    // Remove from DOM after closed
    alertElement.addEventListener('closed.bs.alert', function() {
      this.remove();
    });
  }
  
  // Public API
  return {
    init,
    showLoginModal,
    showRegisterModal,
    updateAuthUI,
    showAdminDashboard,
    showManageUsers,
    showAssessmentForm
  };
})();
