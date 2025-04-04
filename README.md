# Continuous Delivery Maturity Assessment Tool

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

A comprehensive web-based assessment tool to evaluate an organization's continuous delivery maturity across 8 key practice areas, with full support for English and French.

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
2. Run a local web server (e.g., `python -m http.server 8000`)
3. Open `index.html` in your browser
4. Select your preferred language (EN/FR)
5. Complete the assessment questions
6. View your results and recommendations
7. Export results as CSV if needed

## Technical Stack

- HTML5
- CSS3 with Bootstrap 5
- JavaScript (Vanilla)
- Chart.js for visualization
- No backend required - runs entirely in browser

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
