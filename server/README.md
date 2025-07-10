# MongoDB Integration for Continuous Delivery Assessment

This extension adds MongoDB integration to the Continuous Delivery Assessment tool, allowing assessment data to be saved to a MongoDB database when users complete the assessment.

## Features

- Saves assessment data to MongoDB when users click the "Calculate Results" button
- Configurable MongoDB connection via environment variables
- Simple Express.js server to handle API requests
- Client-side integration with the existing assessment tool

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or cloud-based like MongoDB Atlas)

### Installation

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure MongoDB connection:
   - Copy `.env.example` to `.env`
   - Edit `.env` to set your MongoDB connection string

4. Start the server:
   ```
   npm start
   ```

### Configuration Options

The MongoDB integration can be configured using the following environment variables in the `.env` file:

- `MONGODB_URI`: MongoDB connection string (default: `mongodb://localhost:27017/cd_assessment`)
- `PORT`: Server port (default: `3000`)
- `ENABLE_MONGODB`: Feature flag to enable/disable MongoDB integration (set to `true` or `false`)

For MongoDB Atlas or other cloud providers, use a connection string in this format:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### Feature Flag

The MongoDB integration can be toggled on or off using the `ENABLE_MONGODB` environment variable:

```
# Enable MongoDB integration
ENABLE_MONGODB=true

# Disable MongoDB integration
ENABLE_MONGODB=false
```

When disabled:
- The server will not attempt to connect to MongoDB
- API endpoints will return a feature disabled response
- Client-side code will gracefully handle the disabled feature
- The application will continue to function with existing Redis-based storage

## Data Structure

Assessment data is stored in the `assessments` collection with the following structure:

```json
{
  "_id": "ObjectId",
  "responses": {
    "questionId1": "optionIndex",
    "questionId2": "optionIndex",
    ...
  },
  "results": {
    "practiceArea1": {
      "rawScore": 10,
      "maxPossibleScore": 15,
      "normalizedScore": 0.67,
      "maturityLevel": 2,
      "answeredQuestions": 5,
      "totalQuestions": 5
    },
    ...
    "overall": {
      "maturityLevel": 1
    }
  },
  "timestamp": "ISODate",
  "metadata": {
    "userAgent": "User agent string",
    "ipAddress": "IP address"
  }
}
```

## Integration with Existing Features

This MongoDB integration is designed to work alongside the existing Redis-based user management system. While Redis handles user authentication, session management, and role-based access control, MongoDB is used specifically for storing detailed assessment data for analytics and reporting purposes.

## Next Steps

- Add admin dashboard for viewing assessment data
- Implement analytics features to track assessment trends over time
- Add user-specific assessment history views
