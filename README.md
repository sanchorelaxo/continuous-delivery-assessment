# Continuous Delivery Maturity Assessment Tool

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

A comprehensive web-based assessment tool to evaluate an organization's continuous delivery maturity across 8 key practice areas, with full support for English and French. Now includes user management, authentication, assessment history, and admin dashboard.

## Features

- **Comprehensive Assessment**: 48 questions covering 8 practice areas
- **Weighted Scoring**: Questions weighted by importance (critical, important, standard)
- **Visual Results**: Radar chart visualization of maturity levels
- **CSV Export**: Export detailed results for further analysis
- **Maturity Levels**: 5 maturity levels from Regressive (-1) to Optimizing (3)
- **Multi-language Support**: Full English and French translations
- **Real-time Progress**: Visual progress tracking with percentage indicator
- **Dynamic UI**: Responsive interface with practice area navigation
- **Smart Recommendations**: Tailored improvement suggestions based on maturity levels
- **User Authentication**: Secure login and MongoDB-based authentication system
- **Assessment History**: View and compare past assessment results
- **Cumulative Results**: Toggle between current and historical assessment data
- **Admin Dashboard**: User and group management for administrators
- **Role-based Access Control**: Different permission levels (sysAdmin, assessment_admin, assessment_user)

## Practice Areas

1. Build Management & Continuous Integration
2. Environments & Provisioning
3. Release Management & Compliance
4. Testing
5. Data Management
6. Configuration Management
7. Application Architecture
8. Observability

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables (copy `.env.example` to `.env` and adjust as needed)
4. Ensure MongoDB server is installed and running (see MongoDB Setup section below)
5. **Populate MongoDB with assessment questions**: `cd server/scripts && node migrate-questions.js`
6. Start the server: `npm start` or `node server/server.js`
7. Open `http://localhost:3000` in your browser
8. Register a new account or log in with default admin credentials
9. Select your preferred language (EN/FR)
10. Complete the assessment questions
11. View your results and recommendations
12. Access your assessment history through the History tab
13. Toggle between current and cumulative results
14. Administrators can manage users and groups through the Admin dashboard

## Technical Stack

- **Frontend**:
  - HTML5
  - CSS3 with Bootstrap 5
  - JavaScript (Vanilla)
  - Chart.js for visualization

- **Backend**:
  - Node.js with Express.js
  - MongoDB for data persistence
  - JWT for authentication
  - Role-based access control

## MongoDB Setup

### Installing MongoDB

1. **Install MongoDB Community Edition**:
   - **Ubuntu**:
     ```bash
     sudo apt-get install gnupg
     curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor
     echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
     sudo apt-get update
     sudo apt-get install -y mongodb-org
     ```
   
   - **macOS** (using Homebrew):
     ```bash
     brew tap mongodb/brew
     brew install mongodb-community
     ```
   
   - **Windows**:
     Download and run the MongoDB installer from the [official MongoDB website](https://www.mongodb.com/try/download/community).

2. **Start MongoDB Service**:
   - **Ubuntu**:
     ```bash
     sudo systemctl start mongod
     sudo systemctl enable mongod  # Start MongoDB on system boot
     ```
   
   - **macOS**:
     ```bash
     brew services start mongodb-community
     ```
   
   - **Windows**:
     MongoDB should be installed as a service and start automatically.

3. **Verify Installation**:
   ```bash
   mongosh --eval "db.runCommand({ connectionStatus: 1 })"
   ```

### Initial Database Setup

**IMPORTANT**: Before starting the application for the first time, you must populate the MongoDB database with assessment questions.

1. **Migrate Assessment Questions to MongoDB**:
   ```bash
   cd server/scripts
   node migrate-questions.js
   ```
   
   This script will:
   - Extract 48 assessment questions from the existing translations file
   - Transform them for MongoDB with multilingual support (English/French)
   - Insert them into the `cd_assessment.questions` collection
   - Create necessary database indexes
   
   **Note**: This script can be run multiple times safely - it will only insert questions if they don't already exist.

### Running the Test Users Script

To populate your MongoDB database with test users for development and testing:

1. Make sure MongoDB is running
2. Navigate to the project directory
3. Run the test users script:
   ```bash
   node scripts/create-test-users.js
   ```

This script will create the following test users:

| Username | Password | Role |
|----------|----------|------|
| admin    | admin123 | sysAdmin |
| manager  | manager123 | assessment_admin |
| user     | user123 | assessment_user |

> **Note**: These are test users for development purposes only. In production, use strong passwords and configure them through the `.env` file.

## Recent Updates

### UI and Navigation Improvements
- Improved autoscroll functionality between practice areas for seamless navigation
- Fixed validation scrolling to properly focus on invalid fields when submitting
- Enhanced navigation sidebar highlighting with manual class toggling
- Added ScrollSpy reinitialization after dynamic question rendering
- Removed temporary debug logging for cleaner production code
- Fixed syntax errors and improved code quality throughout the codebase

### Admin Dashboard and Navigation Improvements
- Added comprehensive admin dashboard with user management capabilities
- Fixed navigation links to work consistently across all UI contexts
- Implemented robust event handling for UI state management
- Added user management modal with CRUD operations
- Enhanced role-based access control for admin features

### Assessment History and Cumulative Results
- Fixed cumulative results toggle to work reliably in all contexts
- Improved error handling for assessment data loading
- Added automatic recovery for missing current assessment data
- Enhanced assessment history view with proper navigation
- Implemented defensive programming with null checks throughout the codebase

### User Management System
- Implemented comprehensive user authentication with JWT
- Added user MongoDB-based registration and login functionality
- Created role-based permissions (sysAdmin, assessment_admin, assessment_user)
- Added group management with role-based access
- Integrated MongoDB for persistent data storage

## Prompts2Use

To recreate this application, you can use the following prompts with an AI assistant:

1. "Create a web-based assessment tool for evaluating continuous delivery maturity with these requirements:
   - 8 practice areas (Build Management, Environments, Release Management, Testing, Data Management, Configuration Management, Application Architecture, Observability)
   - 5 maturity levels from Regressive (-1) to Optimizing (3)
   - Question weighting system (standard, important, critical)
   - Progress tracking
   - Results visualization with radar chart"

2. "Add multi-language support with these features:
   - English and French translations for all content
   - Language toggle button
   - Translations for questions, recommendations, and UI elements
   - Dynamic language switching without page reload"

3. "Enhance the UI/UX with:
   - Bootstrap 5 styling
   - Responsive sidebar navigation
   - Progress indicator with label
   - Maturity level badges
   - Smart recommendations based on assessment results"

4. "Implement data management features:
   - Local storage for responses
   - CSV export functionality
   - Result persistence between language switches"

5. "Add user authentication and management system with:
   - User MongoDB-based registration and login functionality
   - JWT-based authentication
   - Role-based access control (sysAdmin, assessment_admin, assessment_user)
   - MongoDB integration for data persistence
   - Assessment history tracking per user"

6. "Create an admin dashboard with:
   - User management (add, edit, delete users)
   - Group management with role-based permissions
   - Navigation between assessment, history, and admin views
   - Robust UI state management
   - Defensive programming with null checks"

7. "Implement assessment history and cumulative results features:
   - Toggle between current and cumulative results
   - Assessment history view with search and pagination
   - Compare selected assessments functionality
   - Error handling for data loading
   - Automatic recovery for missing data"
