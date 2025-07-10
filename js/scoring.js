/**
 * Continuous Delivery Maturity Assessment Scoring Logic
 * 
 * This module handles:
 * - Calculating weighted scores for each practice area
 * - Determining maturity levels based on scores
 * - Generating radar chart data
 * - Creating CSV export
 */

// questionDatabase is available from translations.js

/**
 * Calculate scores for all practice areas based on responses
 * @param {Object} responses - Object with question IDs as keys and selected option indices as values
 * @param {Object} questionDb - The question database
 * @returns {Object} Calculated scores and maturity levels for each practice area
 */
function calculateScores(responses, questionDb) {
    const results = {};
    const practiceAreas = Object.keys(questionDb);
    
    // Process each practice area
    practiceAreas.forEach(area => {
        const areaQuestions = questionDb[area];
        let totalWeightedScore = 0;
        let totalMaxScore = 0;
        let answeredQuestions = 0;
        
        // Process each question in this practice area
        areaQuestions.forEach(question => {
            const questionId = question.id;
            
            // Skip if question wasn't answered
            if (!responses.hasOwnProperty(questionId)) {
                return;
            }
            
            const responseIndex = responses[questionId];
            const selectedOption = question.options[responseIndex];
            const questionWeight = question.weight;
            
            // Calculate weighted score for this question
            const weightedScore = selectedOption.value * questionWeight;
            
            // Calculate max possible score for this question
            const maxScore = 3 * questionWeight; // 3 is the highest maturity level
            
            totalWeightedScore += weightedScore;
            totalMaxScore += maxScore;
            answeredQuestions++;
        });
        
        // Only calculate results if at least one question was answered
        if (answeredQuestions > 0) {
            // Calculate normalized score (0-100%)
            const normalizedScore = (totalWeightedScore + totalMaxScore) / (2 * totalMaxScore);
            
            // Map normalized score to maturity level (-1 to 3)
            const maturityLevel = mapScoreToMaturityLevel(normalizedScore);
            
            results[area] = {
                rawScore: totalWeightedScore,
                maxPossibleScore: totalMaxScore,
                normalizedScore: normalizedScore,
                maturityLevel: maturityLevel,
                answeredQuestions: answeredQuestions,
                totalQuestions: areaQuestions.length
            };
        }
    });
    
    // Calculate overall maturity level (lowest of all areas)
    const maturityLevels = Object.values(results).map(r => r.maturityLevel);
    results.overall = {
        maturityLevel: Math.min(...maturityLevels)
    };
    
    return results;
}

/**
 * Maps a normalized score (0-100%) to a maturity level (-1 to 3)
 * @param {number} normalizedScore - Score from 0 to 1
 * @returns {number} Maturity level from -1 to 3
 */
function mapScoreToMaturityLevel(normalizedScore) {
    if (normalizedScore < 0.2) return -1;
    if (normalizedScore < 0.4) return 0;
    if (normalizedScore < 0.6) return 1;
    if (normalizedScore < 0.8) return 2;
    return 3;
}

/**
 * Generate data for radar chart visualization
 * @param {Object} results - Results from calculateScores
 * @returns {Object} Data formatted for radar chart
 */
function generateRadarChartData(results) {
    // Handle null or undefined results
    if (!results) {
        console.warn('Results object is null or undefined');
        return {
            labels: [],
            datasets: [{
                label: 'Maturity Level',
                data: [],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
            }]
        };
    }
    
    // Safely extract practice area results without destructuring
    const practiceAreaResults = {};
    Object.keys(results).forEach(key => {
        if (key !== 'overall') {
            practiceAreaResults[key] = results[key];
        }
    });
    
    const labels = [];
    const data = [];
    const lang = document.documentElement.lang || 'en';
    
    // Convert maturity levels to positive numbers for visualization
    // (-1 becomes 0, 0 becomes 1, 1 becomes 2, etc.)
    Object.entries(practiceAreaResults).forEach(([area, result]) => {
        // Get translated area name
        const formattedArea = translations.practiceAreas[lang][area];
        
        labels.push(formattedArea);
        data.push(result.maturityLevel + 1); // Add 1 to make all values positive
    });
    
    return {
        labels: labels,
        datasets: [{
            label: translations.ui[lang].maturityLevel,
            data: data,
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderColor: 'rgba(52, 152, 219, 1)',
            pointBackgroundColor: 'rgba(52, 152, 219, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
        }]
    };
}

/**
 * Generate CSV export of assessment results
 * @param {Object} responses - User responses
 * @param {Object} results - Calculated results
 * @param {Object} questionDb - Question database
 * @param {Object} assessmentInfo - Assessment information (authorEmail, teamName, systemName)
 * @returns {string} CSV formatted string
 */
function generateCsvExport(responses, results, questionDb, assessmentInfo = {}) {
    // Ajouter les informations d'évaluation au début
    let csv = 'Assessment Information\n';
    csv += `Author Email,${assessmentInfo.authorEmail || ''}\n`;
    csv += `Team/Squad Name,${assessmentInfo.teamName || ''}\n`;
    csv += `System Name,${assessmentInfo.systemName || ''}\n`;
    csv += `Assessment Date,${new Date().toISOString().split('T')[0]}\n`;
    csv += '\n'; // Ligne vide pour séparer
    
    // En-tête des données détaillées
    csv += 'practice_area,question_id,question_text,response_text,response_value,weight,weighted_score,max_score\n';
    
    // Process each practice area
    Object.entries(questionDb).forEach(([area, questions]) => {
        // Format the practice area name
        const formattedArea = area
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
        
        // Process each question in this practice area
        questions.forEach(question => {
            const questionId = question.id;
            
            // Skip if question wasn't answered
            if (!responses.hasOwnProperty(questionId)) {
                return;
            }
            
            const responseIndex = responses[questionId];
            const selectedOption = question.options[responseIndex];
            const questionWeight = question.weight;
            
            // Calculate weighted score for this question
            const weightedScore = selectedOption.value * questionWeight;
            
            // Calculate max possible score for this question
            const maxScore = 3 * questionWeight; // 3 is the highest maturity level
            
            // Format the question text for CSV (escape quotes)
            const escapedQuestionText = question.text.replace(/"/g, '""');
            const escapedResponseText = selectedOption.text.replace(/"/g, '""');
            
            // Add row to CSV
            csv += `"${formattedArea}","${questionId}","${escapedQuestionText}","${escapedResponseText}",${selectedOption.value},${questionWeight},${weightedScore},${maxScore}\n`;
        });
    });
    
    // Add summary rows
    csv += '\n"Summary","","","","","","",""';
    Object.entries(results).forEach(([area, result]) => {
        if (area === 'overall') return;
        
        // Format the practice area name
        const formattedArea = area
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
        
        csv += `\n"${formattedArea}","","Maturity Level","${formatMaturityLevel(result.maturityLevel)}","${result.maturityLevel}","","${result.rawScore}","${result.maxPossibleScore}"`;
    });
    
    // Add overall result
    csv += `\n"Overall","","Maturity Level","${formatMaturityLevel(results.overall.maturityLevel)}","${results.overall.maturityLevel}","","",""`;
    
    return csv;
}

/**
 * Format maturity level for display
 * @param {number} level - Maturity level (-1 to 3)
 * @returns {string} Formatted level
 */
function formatMaturityLevel(level) {
    return `Level ${level}`;
}

// Export functions for use in the assessment
if (typeof module !== 'undefined') {
    module.exports = {
        calculateScores,
        generateRadarChartData,
        generateCsvExport
    };
}
