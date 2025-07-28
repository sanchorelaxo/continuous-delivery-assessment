# Continuous Delivery Assessment App: Next Steps

## Notes
- MongoDB integration is working and supports anonymous submissions.
- User authentication, assessment history, comparison features, and admin dashboard are implemented and working.
- Navigation and cumulative results toggle are now robust and error-handled.
- Redis integration implemented for user management system and cumulative results tracking.
- Role-based access control system implemented with three roles: sysAdmin, assessment_admin, assessment_user.
- Groups entity with permissions implemented - only sysAdmin and assessment_admin can add users to groups.
- User sign-up screen and authentication with JWT tokens implemented.
- Toggle above radar chart to show cumulative results vs current submission implemented.
- Questions will be stored in MongoDB, not hardcoded in JS.
- The number of questions per section may now vary and must be handled dynamically in score calculations.
- Debugged and resolved delete-assessment (history view) error: fixed client variable scope in server and improved error handling in frontend.
- Admin configuration system implemented with configurable credentials via .env file.

## Task List
- [x] Implement feature flag and error handling for MongoDB
- [x] Store and retrieve assessments from MongoDB
- [x] Implement user authentication (login, register, associate assessments with users)
- [x] Create assessment history view for users
- [x] Add comparison features for assessments (per user, and/or across users)
- [x] Build admin dashboard for managing and analyzing assessment data
- [x] Debug and fix delete-assessment error in history view
- [x] Implement comprehensive user management system with Redis
- [x] Create user roles (sysAdmin, assessment_admin, assessment_user)
- [x] Implement groups with role-based permissions
- [x] Add user sign-up screen
- [x] Implement toggle for cumulative results vs current submission
- [x] Create admin configuration system with security validation
- [x] Implement question editor for admins (edit/add/delete questions, set weights/content)
- [x] Add weight selection feature (select element with 3 options: low, medium, high)
- [x] Refactor frontend (main and admin pages) and backend to load questions from MongoDB
- [x] Update score calculation logic to support variable number of questions per section
- [x] Migrate existing questions into MongoDB
- [x] Debug and fix frontend issues (progress tracking, Calculate Results button, language toggle, UI translations)
- [x] Debug question editor UI for admins (correctly saving across languages)
- [ ] Debug user management UI for admins
- [ ] Add group management UI for admins
- [ ] Add Assessment Analytics UI for admins

## Current Goal
- [ ] Debug user management UI for admins