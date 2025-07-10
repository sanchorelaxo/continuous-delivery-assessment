/**
 * Assessment History UI Component
 * Displays user's assessment history and provides comparison functionality
 */
window.assessmentHistoryUI = (function() {
  // Private variables
  let currentPage = 1;
  let pageSize = 10;
  let totalPages = 0;
  let assessments = [];
  let selectedAssessments = [];
  
  /**
   * Initialize the assessment history component
   */
  function init() {
    try {
      // Create history container if it doesn't exist
      if (!document.getElementById('assessment-history-container')) {
        createHistoryContainer();
      }
      
      // Add event listeners - only if element exists
      const navHistoryElement = document.getElementById('nav-history');
      if (navHistoryElement) {
        navHistoryElement.addEventListener('click', showHistory);
      } else {
        console.warn('Assessment history navigation element not found');
      }
      
      // Hide history by default
      hideHistory();
      
      console.log('Assessment history UI initialized successfully');
    } catch (error) {
      console.error('Error initializing assessment history UI:', error);
    }
  }
  
  /**
   * Create the assessment history container
   */
  function createHistoryContainer() {
    const container = document.createElement('div');
    container.id = 'assessment-history-container';
    container.className = 'container mb-5 d-none';
    
    container.innerHTML = `
      <h2 class="mt-4 mb-3">Assessment History</h2>
      
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="input-group">
            <input type="text" class="form-control" id="history-search" placeholder="Search assessments...">
            <button class="btn btn-outline-secondary" type="button" id="history-search-btn">
              <i class="bi bi-search"></i> Search
            </button>
          </div>
        </div>
        <div class="col-md-6 text-end">
          <button class="btn btn-primary" id="compare-selected-btn" disabled>
            <i class="bi bi-bar-chart-line"></i> Compare Selected
          </button>
        </div>
      </div>
      
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th><input type="checkbox" id="select-all-assessments"></th>
              <th>Date</th>
              <th>Overall Maturity</th>
              <th>User</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="assessment-history-table">
            <!-- Assessment rows will be inserted here -->
            <tr>
              <td colspan="5" class="text-center">Loading assessments...</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <nav aria-label="Assessment history pagination">
        <ul class="pagination justify-content-center" id="history-pagination">
          <!-- Pagination will be inserted here -->
        </ul>
      </nav>
      
      <!-- Assessment Comparison Modal -->
      <div class="modal fade" id="comparison-modal" tabindex="-1" aria-labelledby="comparisonModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="comparisonModalLabel">Assessment Comparison</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div id="comparison-content">
                <!-- Content will be dynamically generated here -->
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Append to the main container
    document.querySelector('.container.mb-5').after(container);
    
    // Add event listeners - only if elements exist
    const selectAllCheckbox = document.getElementById('select-all-assessments');
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', toggleSelectAll);
    }
    
    const compareBtn = document.getElementById('compare-selected-btn');
    if (compareBtn) {
      compareBtn.addEventListener('click', showComparisonModal);
    }
    
    const searchBtn = document.getElementById('history-search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', searchAssessments);
    }
    
    const exportBtn = document.getElementById('export-comparison-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportComparison);
    }
  }
  
  /**
   * Show the assessment history
   * @param {Event} event - Click event
   */
  async function showHistory(event) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    
    // Hide assessment form and results
    document.getElementById('assessment-form').style.display = 'none';
    document.getElementById('results-container').style.display = 'none';
    
    // Hide admin dashboard if it exists
    const adminDashboardContainer = document.getElementById('admin-dashboard-container');
    if (adminDashboardContainer) {
      adminDashboardContainer.style.display = 'none';
    }
    
    // Show history container
    const historyContainer = document.getElementById('assessment-history-container');
    if (historyContainer) {
      historyContainer.classList.remove('d-none');
      historyContainer.style.display = 'block';
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const navHistory = document.getElementById('nav-history');
    if (navHistory) {
      navHistory.classList.add('active');
    }
    
    // Initialize currentResults with the most recent assessment
    try {
      const response = await window.dbIntegration.getAllAssessments(1, 1, true);
      if (response.success && response.data && response.data.assessments && response.data.assessments.length > 0) {
        const mostRecent = response.data.assessments[0];
        if (mostRecent && mostRecent.results && mostRecent.results.practiceAreas) {
          window.currentResults = mostRecent.results;
          window.currentChartData = {
            labels: Object.keys(mostRecent.results.practiceAreas),
            datasets: [{
              label: 'Maturity Level',
              data: Object.values(mostRecent.results.practiceAreas).map(area => area.maturityLevel),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(54, 162, 235, 1)'
            }]
          };
        }
      }
    } catch (error) {
      console.error('Error initializing currentResults:', error);
    }
    
    // Load assessments
    await loadAssessments();
  }
  
  /**
   * Hide the assessment history
   */
  function hideHistory() {
    // Hide history container
    const historyContainer = document.getElementById('assessment-history-container');
    if (historyContainer) {
      historyContainer.classList.add('d-none');
      historyContainer.style.display = 'none';
    }
  }
  
  /**
   * Load assessments from the server
   * @param {string} searchTerm - Optional search term
   */
  /**
   * Force check MongoDB status
   * @returns {Promise<boolean>} True if MongoDB is enabled and connected
   */
  async function checkMongoDBStatus() {
    try {
      // Force a fresh check of MongoDB status
      const status = await window.dbIntegration.checkStatus(true);
      
      if (!status.enabled) {
        console.error('MongoDB integration is disabled. Please check server configuration.');
        return false;
      }
      
      if (!status.connected) {
        console.error('MongoDB is not connected. Please check server logs.');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error checking MongoDB status:', error);
      return false;
    }
  }

  /**
   * Load assessments from the server
   * @param {string} [searchTerm] - Optional search term
   */
  async function loadAssessments(searchTerm = '') {
    try {
      // Check if user is authenticated
      if (!window.authService || !window.authService.isAuthenticated()) {
        showAuthRequiredMessage();
        return;
      }
    
    // Show loading state
    document.getElementById('assessment-history-table').innerHTML = `
      <tr>
        <td colspan="5" class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </td>
      </tr>
    `;
    
    // Disable compare button while loading
    document.getElementById('compare-selected-btn').disabled = true;
    
    // Reset selected assessments
    selectedAssessments = [];
    
    // Check MongoDB status before proceeding
    const mongoDBReady = await checkMongoDBStatus();
    if (!mongoDBReady) {
      document.getElementById('assessment-history-table').innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-danger">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            MongoDB connection issue. Please check server configuration.
          </td>
        </tr>
      `;
      return;
    }
    
    // Get assessments from the server
    const result = await window.dbIntegration.getAllAssessments(currentPage, pageSize, true, searchTerm);
    
    if (!result.success) {
      document.getElementById('assessment-history-table').innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-danger">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            Failed to load assessments: ${result.error || 'Unknown error'}
          </td>
        </tr>
      `;
      return;
    }
    
    // Store assessments and pagination info
    assessments = result.data.assessments;
    totalPages = result.data.pagination.pages;
    
    // Clear selected assessments
    selectedAssessments = [];
    updateCompareButton();
    
    // Render assessments
    renderAssessments();
    
    // Render pagination
    renderPagination();
  } catch (error) {
    console.error('Error loading assessments:', error);
    document.getElementById('assessment-history-table').innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-danger">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          Failed to load assessments: ${error.message || 'Unknown error'}
        </td>
      </tr>
    `;
  }
  }
  
  /**
   * Render assessments in the table
   */
  function renderAssessments() {
    const tableBody = document.getElementById('assessment-history-table');
    
    // Clear table
    tableBody.innerHTML = '';
    
    if (assessments.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="5" class="text-center">No assessments found</td></tr>';
      return;
    }
    
    // Add assessment rows
    assessments.forEach(assessment => {
      const row = document.createElement('tr');
      
      // Format date
      const date = new Date(assessment.timestamp);
      const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      
      // Calculate overall maturity
      const overallMaturity = window.calculateOverallMaturity(assessment.results);
      
      row.innerHTML = `
        <td><input type="checkbox" class="assessment-checkbox" data-id="${assessment._id}"></td>
        <td>${formattedDate}</td>
        <td>
          <span class="badge ${getMaturityBadgeClass(overallMaturity)}">
            ${formatMaturityLevel(overallMaturity)}
          </span>
        </td>
        <td>${assessment.username || 'Anonymous'}</td>
        <td>
          <button class="btn btn-sm btn-outline-primary view-assessment" data-id="${assessment._id}">
            <i class="bi bi-eye"></i> View
          </button>
          <button class="btn btn-sm btn-outline-danger delete-assessment" data-id="${assessment._id}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      
      tableBody.appendChild(row);
    });
    
    // Add event listeners
    document.querySelectorAll('.assessment-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', toggleAssessmentSelection);
    });
    
    document.querySelectorAll('.view-assessment').forEach(button => {
      button.addEventListener('click', viewAssessment);
    });
    
    document.querySelectorAll('.delete-assessment').forEach(button => {
      button.addEventListener('click', deleteAssessment);
    });
  }
  
  /**
   * Render pagination controls
   */
  function renderPagination() {
    const pagination = document.getElementById('history-pagination');
    
    // Clear pagination
    pagination.innerHTML = '';
    
    // Previous button
    const prevItem = document.createElement('li');
    prevItem.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevItem.innerHTML = `<a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>`;
    pagination.appendChild(prevItem);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
      pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
      pagination.appendChild(pageItem);
    }
    
    // Next button
    const nextItem = document.createElement('li');
    nextItem.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextItem.innerHTML = `<a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>`;
    pagination.appendChild(nextItem);
    
    // Add event listeners
    document.querySelectorAll('.page-link').forEach(link => {
      link.addEventListener('click', changePage);
    });
  }
  
  /**
   * Change the current page
   * @param {Event} event - Click event
   */
  async function changePage(event) {
    event.preventDefault();
    
    // Get page number
    const page = parseInt(event.target.dataset.page);
    
    // Check if page is valid
    if (isNaN(page) || page < 1 || page > totalPages) {
      return;
    }
    
    // Update current page
    currentPage = page;
    
    // Load assessments for the new page
    await loadAssessments();
  }
  
  /**
   * Toggle selection of all assessments
   * @param {Event} event - Change event
   */
  function toggleSelectAll(event) {
    const checked = event.target.checked;
    
    // Update all checkboxes
    document.querySelectorAll('.assessment-checkbox').forEach(checkbox => {
      checkbox.checked = checked;
      
      // Update selected assessments
      const assessmentId = checkbox.dataset.id;
      if (checked) {
        if (!selectedAssessments.includes(assessmentId)) {
          selectedAssessments.push(assessmentId);
        }
      } else {
        selectedAssessments = selectedAssessments.filter(id => id !== assessmentId);
      }
    });
    
    // Update compare button
    updateCompareButton();
  }
  
  /**
   * Toggle selection of an assessment
   * @param {Event} event - Change event
   */
  function toggleAssessmentSelection(event) {
    const checkbox = event.target;
    const assessmentId = checkbox.dataset.id;
    
    if (checkbox.checked) {
      // Add to selected assessments
      if (!selectedAssessments.includes(assessmentId)) {
        selectedAssessments.push(assessmentId);
      }
    } else {
      // Remove from selected assessments
      selectedAssessments = selectedAssessments.filter(id => id !== assessmentId);
      
      // Uncheck "select all" checkbox
      document.getElementById('select-all-assessments').checked = false;
    }
    
    // Update compare button
    updateCompareButton();
  }
  
  /**
   * Update the compare button state
   */
  function updateCompareButton() {
    const compareButton = document.getElementById('compare-selected-btn');
    compareButton.disabled = selectedAssessments.length < 2;
  }
  
  /**
   * View an assessment
   * @param {Event} event - Click event
   */
  async function viewAssessment(event) {
    const assessmentId = event.target.closest('button').dataset.id;
    
    try {
      // Get assessment data - already standardized by getAssessmentById
      const result = await window.dbIntegration.getAssessmentById(assessmentId);
      
      if (!result.success) {
        alert(`Failed to load assessment: ${result.error || 'Unknown error'}`);
        return;
      }
      
      const assessment = result.data;
      console.log('Viewing assessment:', assessment);
      
      // Ensure we have a valid assessment
      if (!assessment) {
        alert('Assessment data is missing or invalid');
        return;
      }
      
      // Extract metadata from various possible locations
      const metadata = assessment.metadata || {};
      
      // Store the assessment data for reference
      window.currentAssessmentInfo = {
        authorEmail: metadata.authorEmail || assessment.authorEmail || assessment.userId || 'Unknown',
        teamName: metadata.teamName || assessment.teamName || assessment.username || 'Unknown Team',
        systemName: metadata.systemName || assessment.systemName || ''
      };
      
      // Store the responses and results
      window.userResponses = assessment.responses || {};
      window.currentResults = assessment.results;
      
      // Generate chart data from the results
      const chartData = window.generateRadarChartData(assessment.results);
      window.currentChartData = chartData;
      
      // Hide history and assessment form, show results
      hideHistory();
      document.getElementById('assessment-form').style.display = 'none';
      document.getElementById('results-container').style.display = 'block';
      
      // Display the results
      window.displayResults(assessment.results, chartData);
      
      // Add a back button to return to history if it doesn't already exist
      let backButton = document.querySelector('#results-container .back-to-history-btn');
      if (!backButton) {
        backButton = document.createElement('button');
        backButton.className = 'btn btn-outline-secondary mt-3 back-to-history-btn';
        backButton.innerHTML = '<i class="bi bi-arrow-left"></i> Back to History';
        backButton.addEventListener('click', function() {
          document.getElementById('results-container').style.display = 'none';
          showHistory();
        });
        document.getElementById('results-container').appendChild(backButton);
      }
    } catch (error) {
      console.error('Error displaying assessment results:', error);
      alert('There was an error displaying this assessment: ' + error.message);
    }
  }
  
  /**
   * Delete an assessment
   * @param {Event} event - Click event
   */
  async function deleteAssessment(event) {
    const button = event.target.closest('button');
    const assessmentId = button.dataset.id;
    
    // Confirm deletion
    if (!confirm('Are you sure you want to delete this assessment?')) {
      return;
    }
    
    try {
      // Show loading state
      const originalText = button.innerHTML;
      button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Deleting...';
      button.disabled = true;
      
      // Get authentication token
      const token = localStorage.getItem('token');
      
      if (!token) {
        showAuthRequiredMessage();
        return;
      }
      
      // Send delete request
      const response = await fetch(`/api/assessment/${assessmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete assessment');
      }
      
      // Show success message
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-success alert-dismissible fade show';
      alertDiv.innerHTML = `
        Assessment deleted successfully.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      
      const historyContainer = document.getElementById('assessment-history-container');
      historyContainer.insertBefore(alertDiv, historyContainer.firstChild);
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alertDiv);
        bsAlert.close();
      }, 5000);
      
      // Reload assessments
      await loadAssessments();
    } catch (error) {
      console.error('Error deleting assessment:', error);
      
      // Show error message
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-danger alert-dismissible fade show';
      alertDiv.innerHTML = `
        Error deleting assessment: ${error.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      
      const historyContainer = document.getElementById('assessment-history-container');
      historyContainer.insertBefore(alertDiv, historyContainer.firstChild);
      
      // Reset button
      button.innerHTML = originalText;
      button.disabled = false;
    }
  }
  
  /**
   * Search assessments
   * @param {Event} event - Click event
   */
  async function searchAssessments(event) {
    if (event) event.preventDefault();
    
    // Get search term
    const searchTerm = document.getElementById('history-search').value.trim();
    
    // Reset to first page
    currentPage = 1;
    
    // Load assessments with search term
    await loadAssessments(searchTerm);
  }
  
  /**
   * Show the comparison modal
   */
  async function showComparisonModal() {
    if (selectedAssessments.length < 2) {
      return;
    }
    
    try {
      // Show loading state
      document.getElementById('comparisonModalLabel').textContent = 'Loading comparison...';
      document.getElementById('comparison-content').innerHTML = `
        <div class="d-flex justify-content-center my-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      `;
      
      // Show modal
      const modal = new bootstrap.Modal(document.getElementById('comparison-modal'));
      modal.show();
      
      // Get authentication token
      const token = window.authService ? window.authService.getToken() : null;
      
      // Prepare request payload
      const payload = {
        assessmentIds: selectedAssessments
      };
      
      // Send request to comparison endpoint
      const response = await fetch('/api/assessments/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to compare assessments');
      }
      
      // Update modal title
      document.getElementById('comparisonModalLabel').textContent = 
        `Assessment Comparison (${selectedAssessments.length} assessments)`;
      
      // Render comparison using the server-generated data
      if (result.data && result.data.comparisonData) {
        renderComparisonFromServerData(result.data);
      } else {
        throw new Error('Invalid comparison data received from server');
      }
    } catch (error) {
      console.error('Error comparing assessments:', error);
      
      // Show error in modal
      document.getElementById('comparison-content').innerHTML = `
        <div class="alert alert-danger" role="alert">
          <h4 class="alert-heading">Error comparing assessments</h4>
          <p>${error.message}</p>
        </div>
      `;
    }
  }
  
  /**
   * Render comparison from server-generated data
   * @param {Object} data - Server response data containing comparison information
   */
  function renderComparisonFromServerData(data) {
    console.log('renderComparisonFromServerData called with data:', JSON.stringify(data));
    
    // Extract the data structure correctly
    // The server response has a different structure than what our rendering functions expect
    let comparisonData, assessmentsData;
    
    // Server response structure from /api/assessments/compare endpoint
    comparisonData = data.comparisonData;
    assessmentsData = data.assessments;
    
    console.log('Processing server data for comparison:', {
      comparisonData: comparisonData,
      assessmentsData: assessmentsData
    });
    
    // Ensure assessmentsData has all required fields for CSV export
    if (assessmentsData && assessmentsData.length) {
      assessmentsData.forEach((assessment, index) => {
        console.log(`Assessment ${index} data:`, assessment);
      });
    } else {
      console.warn('No assessment data available for comparison');
      assessmentsData = [];
    }
    
    console.log('Extracted comparisonData:', JSON.stringify(comparisonData));
    console.log('Extracted assessments:', JSON.stringify(assessmentsData));
    
    // Check if assessments have the full results object
    assessmentsData.forEach((assessment, index) => {
      console.log(`Assessment ${index} (${assessment.id}) - Has results object:`, !!assessment.results);
      if (assessment.results) {
        console.log(`Assessment ${index} practice areas:`, Object.keys(assessment.results));
      } else {
        console.log(`Assessment ${index} is missing results object. Full assessment:`, JSON.stringify(assessment));
      }
    });
    
    // Clear previous content
    const comparisonContent = document.getElementById('comparison-content');
    comparisonContent.innerHTML = '';
    
    // Create chart container with fixed height
    const chartContainer = document.createElement('div');
    chartContainer.id = 'comparison-chart-container';
    chartContainer.className = 'mb-4';
    chartContainer.innerHTML = '<canvas id="comparison-chart"></canvas>';
    comparisonContent.appendChild(chartContainer);
    
    // Create table container
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-responsive';
    comparisonContent.appendChild(tableContainer);
    
    // Create export button
    const exportButton = document.createElement('button');
    exportButton.className = 'btn btn-outline-primary mt-3';
    exportButton.innerHTML = '<i class="bi bi-download"></i> Export as CSV';
    exportButton.addEventListener('click', () => exportComparison(comparisonData, assessmentsData));
    comparisonContent.appendChild(exportButton);
    
    // Destroy existing chart if it exists
    if (window.comparisonChart instanceof Chart) {
      window.comparisonChart.destroy();
    }
    
    // Render chart
    const ctx = document.getElementById('comparison-chart').getContext('2d');
    window.comparisonChart = new Chart(ctx, {
      type: 'radar',
      data: comparisonData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 20
        },
        scales: {
          r: {
            beginAtZero: true,
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
              font: {
                size: 12
              }
            },
            pointLabels: {
              font: {
                size: 14
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              boxWidth: 15,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.raw.toFixed(2);
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
    
    // Render comparison table
    renderComparisonTable(comparisonData, assessmentsData);
  }
  
  /**
   * Render the comparison chart and table (legacy method)
   * @param {Array} assessments - Array of assessment data
   */
  function renderComparison(assessments) {
    // Prepare data for chart
    const labels = Object.keys(assessments[0].results.practiceAreas);
    const datasets = assessments.map((assessment, index) => {
      const date = new Date(assessment.timestamp);
      return {
        label: `Assessment ${index + 1} (${date.toLocaleDateString()})`,
        data: labels.map(area => assessment.results.practiceAreas[area].maturityLevel),
        borderWidth: 2,
        fill: false
      };
    });
    
    // Create chart
    const ctx = document.getElementById('comparison-chart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.comparisonChart) {
      window.comparisonChart.destroy();
    }
    
    // Create new chart
    window.comparisonChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
    
    // Render comparison table
    renderComparisonTable(assessments, labels);
  }
  
  /**
   * Render the comparison table
   * @param {Array} assessments - Array of assessment data
   * @param {Array} areas - Array of practice areas
   */
  /**
   * Render comparison table from server-generated data
   * @param {Object} comparisonData - Chart.js formatted comparison data
   * @param {Array} assessments - Assessment metadata
   */
  function renderComparisonTable(comparisonData, assessments) {
    console.log('renderComparisonTable called with:');
    console.log('comparisonData:', comparisonData);
    console.log('assessments:', assessments);
    
    // Create table element
    const tableContainer = document.querySelector('#comparison-content .table-responsive');
    const table = document.createElement('table');
    table.id = 'comparison-table';
    table.className = 'table table-striped table-hover';
    tableContainer.appendChild(table);
    
    // Extract labels (practice areas) and datasets from comparison data
    const { labels, datasets } = comparisonData;
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Add practice area header
    headerRow.innerHTML = '<th>Practice Area</th>';
    
    // Add assessment headers from datasets
    datasets.forEach(dataset => {
      headerRow.innerHTML += `<th>${dataset.label}</th>`;
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    
    // Add rows for each practice area
    labels.forEach((area, areaIndex) => {
      const row = document.createElement('tr');
      
      // Add practice area name
      row.innerHTML = `<td>${area}</td>`;
      
      // Add maturity levels for each assessment
      datasets.forEach(dataset => {
        const maturityLevel = dataset.data[areaIndex];
        row.innerHTML += `
          <td>
            <span class="badge ${getMaturityBadgeClass(maturityLevel)}">
              ${formatMaturityLevel(maturityLevel)}
            </span>
          </td>
        `;
      });
      
      tbody.appendChild(row);
    });
    
    // Add overall maturity row
    const overallRow = document.createElement('tr');
    overallRow.className = 'table-active';
    overallRow.innerHTML = '<td><strong>Overall Maturity</strong></td>';
    
    // Recalculate overall maturity for each assessment using the same logic as in scoring.js
    console.log('Processing overall maturity for assessments:', assessments);
    assessments.forEach((assessment, index) => {
      // Get the assessment data
      console.log(`Assessment ${index}:`, JSON.stringify(assessment));
      
      // Make sure we have a valid overall maturity value
      let overallMaturity = 0;
      
      // Use the same logic as in scoring.js to calculate the overall maturity
      if (assessment.results) {
        const practiceAreas = [
          'buildManagement', 'environments', 'releaseManagement', 'testing',
          'dataManagement', 'configurationManagement', 'applicationArchitecture', 'observability'
        ];
        
        // Extract maturity levels from each practice area
        const maturityLevels = [];
        practiceAreas.forEach(area => {
          if (assessment.results[area] && typeof assessment.results[area].maturityLevel === 'number') {
            maturityLevels.push(assessment.results[area].maturityLevel);
          }
        });
        
        // Calculate overall maturity as the minimum of all practice area maturity levels
        // This matches the logic in scoring.js: results.overall = { maturityLevel: Math.min(...maturityLevels) }
        if (maturityLevels.length > 0) {
          overallMaturity = Math.min(...maturityLevels);
          console.log(`Calculated overall maturity (minimum of all areas): ${overallMaturity}`);
        } else {
          console.log('No valid maturity levels found in assessment results');
        }
      } else {
        console.log('No results object found in assessment');
      }
      
      console.log(`Final overall maturity for assessment ${index}:`, overallMaturity);
      
      overallRow.innerHTML += `
        <td>
          <span class="badge ${getMaturityBadgeClass(overallMaturity)}">
            <strong>${formatMaturityLevel(overallMaturity)}</strong>
          </span>
        </td>
      `;
    });
    
    tbody.appendChild(overallRow);
    table.appendChild(tbody);
  }
  
  /**
   * Export comparison data as CSV
   */
  // Legacy exportComparison function - removed to avoid duplication
  
  /**
   * Show message that authentication is required
   */
  function showAuthRequiredMessage() {
    const tableBody = document.getElementById('assessment-history-table');
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center">
          <div class="alert alert-info">
            <i class="bi bi-info-circle"></i> 
            Please <a href="#" onclick="window.authUI.showLoginModal(); return false;">login</a> 
            or <a href="#" onclick="window.authUI.showRegisterModal(); return false;">register</a> 
            to view your assessment history.
          </div>
        </td>
      </tr>
    `;
  }
  
  /**
   * Calculate overall maturity level from results
   * @param {Object} results - Assessment results
   * @returns {number} Overall maturity level
   */
  window.calculateOverallMaturity = function(results) {
    // Handle null or undefined results
    if (!results) {
      console.warn('Results object is null or undefined');
      return 0;
    }
    
    // Check if we have the new structure with direct category properties
    const directCategories = [
      'buildManagement', 'environments', 'releaseManagement', 'testing',
      'dataManagement', 'configurationManagement', 'applicationArchitecture', 'observability'
    ];
    
    // Check if we have the new structure
    if (results.buildManagement || results.overall) {
      // If overall maturity is already calculated, use it
      if (results.overall && results.overall.maturityLevel !== undefined) {
        return results.overall.maturityLevel;
      }
      
      // Otherwise calculate from categories
      let sum = 0;
      let count = 0;
      
      directCategories.forEach(category => {
        if (results[category] && results[category].maturityLevel !== undefined) {
          sum += results[category].maturityLevel;
          count++;
        }
      });
      
      return count > 0 ? Math.round((sum / count) * 10) / 10 : 0;
    }
    
    // Fall back to old structure with practiceAreas
    if (results.practiceAreas) {
      const areas = Object.keys(results.practiceAreas);
      const sum = areas.reduce((total, area) => {
        return total + results.practiceAreas[area].maturityLevel;
      }, 0);
      
      return Math.round((sum / areas.length) * 10) / 10;
    }
    
    console.warn('Unknown results structure:', results);
    return 0;
  }
  
  /**
   * Export comparison data as CSV
   * @param {Object} comparisonData - Chart.js formatted comparison data
   * @param {Array} assessments - Assessment metadata
   */
  function exportComparison(comparisonData, assessments) {
    console.log('Exporting comparison data to CSV:', comparisonData, assessments);
    const { labels, datasets } = comparisonData;
    
    // Create CSV header row
    let csvContent = 'Practice Area,';
    csvContent += datasets.map(dataset => `"${dataset.label}"`).join(',');
    csvContent += '\n';
    
    // Add data rows for each practice area
    labels.forEach((area, areaIndex) => {
      let row = `"${area}",`;
      row += datasets.map(dataset => {
        const value = dataset.data[areaIndex] || 0;
        return value.toFixed(2);
      }).join(',');
      csvContent += row + '\n';
    });
    
    // Add overall maturity row using assessment data directly
    let overallRow = '"Overall Maturity",';
    overallRow += assessments.map((assessment) => {
      // Get overall maturity from assessment or calculate it
      let overallMaturity = 0;
      
      console.log('CSV export - assessment data:', JSON.stringify(assessment));
      
      // Use the same logic as in scoring.js to calculate the overall maturity
      if (assessment.results) {
        const practiceAreas = [
          'buildManagement', 'environments', 'releaseManagement', 'testing',
          'dataManagement', 'configurationManagement', 'applicationArchitecture', 'observability'
        ];
        
        // Extract maturity levels from each practice area
        const maturityLevels = [];
        practiceAreas.forEach(area => {
          if (assessment.results[area] && typeof assessment.results[area].maturityLevel === 'number') {
            maturityLevels.push(assessment.results[area].maturityLevel);
          }
        });
        
        // Calculate overall maturity as the minimum of all practice area maturity levels
        // This matches the logic in scoring.js: results.overall = { maturityLevel: Math.min(...maturityLevels) }
        if (maturityLevels.length > 0) {
          overallMaturity = Math.min(...maturityLevels);
          console.log('CSV export - calculated overall maturity (minimum of all areas):', overallMaturity);
        } else {
          console.log('CSV export - no valid maturity levels found in assessment results');
        }
      } else {
        console.log('CSV export - no results object found in assessment');
      }
      
      console.log('CSV export - final overall maturity:', overallMaturity);
      return overallMaturity.toFixed(2);
    }).join(',');
    csvContent += overallRow + '\n\n';
    
    // Add assessment metadata
    csvContent += '\n"Assessment Details:"\n';
    
    // Log the full assessments data to debug
    console.log('CSV export - full assessments data:', JSON.stringify(assessments));
    
    assessments.forEach((assessment, index) => {
      const dataset = datasets[index];
      let dateStr = 'Unknown Date';
      
      // Handle date formatting safely
      try {
        // Use the date directly from the assessment object
        const timestamp = assessment.date || assessment.timestamp || assessment.createdAt;
        if (timestamp) {
          const date = new Date(timestamp);
          if (!isNaN(date.getTime())) { // Check if date is valid
            dateStr = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            console.log(`CSV export - formatted date for assessment ${index}:`, dateStr);
          }
        }
      } catch (e) {
        console.error('Error formatting date:', e);
      }
      
      // Use the name and username directly from the assessment object
      // These fields were explicitly added in the server response
      const title = assessment.name || 'Untitled';
      const username = assessment.username || 'Anonymous';
      
      console.log(`CSV export - assessment ${index} details:`, {
        label: dataset.label,
        date: dateStr,
        title,
        username
      });
      
      csvContent += `"${dataset.label}","${dateStr}","${title}","${username}"\n`;
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `assessment-comparison-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }, 100);
  }
  
  /**
   * Format maturity level for display
   * @param {number} level - Maturity level
   * @returns {string} Formatted maturity level
   */
  function formatMaturityLevel(level) {
    return level.toFixed(1);
  }
  
  /**
   * Get the CSS class for a maturity level badge
   * @param {number} level - Maturity level
   * @returns {string} CSS class
   */
  function getMaturityBadgeClass(level) {
    if (level < 1) return 'bg-danger';
    if (level < 2) return 'bg-warning text-dark';
    if (level < 3) return 'bg-info text-dark';
    if (level < 4) return 'bg-primary';
    return 'bg-success';
  }
  
  // Public API
  return {
    init,
    showHistory,
    hideHistory,
    loadAssessments
  };
})();