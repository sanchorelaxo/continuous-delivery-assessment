
        // Global variables
        window.userResponses = {};
        window.answeredQuestions = 0;
        window.totalQuestions = 0;
        window.currentQuestionElement = null;
        window.currentResults = null;
        window.currentChartData = null;
        
        // Initialize totalQuestions
        window.totalQuestions = Object.values(translations.questionDatabase).reduce((total, questions) => total + questions.length, 0);

        /**
         * Initialize the assessment by generating questions from the database
         */
        window.initializeAssessment = function() {
            const form = document.getElementById('assessment-questions');
            const currentLang = document.documentElement.lang;
            
            // Total questions is already initialized
            
            // Generate questions for each practice area
            Object.entries(translations.questionDatabase).forEach(([area, questions]) => {
                // Create section for this practice area
                const section = document.createElement('section');
                section.id = `section-${area}`;
                section.className = 'practice-area mb-5';
                
                // Get the practice area title from translations or fallback to formatted area name
                const areaTitle = translations.practiceAreas?.[currentLang]?.[area.replace('-', '')] || 
                    (area === 'applicationArchitecture' ? 'Application Architecture' : 
                    area.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
                
                // Add practice area header
                section.innerHTML = `
                    <div class="practice-area-title">
                        <h3>${areaTitle}</h3>
                        <span class="badge bg-primary practice-area-badge">${questions.length} ${translations[currentLang]?.questions || 'Questions'}</span>
                    </div>
                    <hr>
                `;
                
                // Add questions for this practice area
                questions.forEach(question => {
                    const questionCard = document.createElement('div');
                    questionCard.className = 'question-card';
                    
                    // Determine weight class and text
                    let weightClass = '';
                    let weightText = '';
                    
                    if (question.weight === 1) {
                        weightClass = 'weight-1';
                        weightText = translations.ui[currentLang].standard;
                    } else if (question.weight === 2) {
                        weightClass = 'weight-2';
                        weightText = translations.ui[currentLang].important;
                    } else if (question.weight === 3) {
                        weightClass = 'weight-3';
                        weightText = translations.ui[currentLang].critical;
                    }
                    
                    // Add question header
                    const areaKey = area.replace('-', '');
                    const questionText = translations.questions?.[currentLang]?.[areaKey]?.[question.id]?.text || question.text;
                    questionCard.innerHTML = `
                        <div class="mb-3">
                            <h5>${questionText} <span class="question-weight ${weightClass}">${weightText}</span></h5>
                        </div>
                    `;
                    
                    // Add options for this question
                    const optionsContainer = document.createElement('div');
                    
                    question.options.forEach((option, index) => {
                        const optionId = `${question.id}_option_${index}`;
                        
                        const optionDiv = document.createElement('div');
                        optionDiv.className = 'form-check';
                        const areaKey = area.replace('-', '');
                        const optionText = translations.questions?.[currentLang]?.[areaKey]?.[question.id]?.options?.[index] || question.options[index]?.text || question.options[index];
                        const maturityLevel = translations[currentLang]?.results?.maturityLevels?.[option.value] || option.value;
                        optionDiv.innerHTML = `
                            <input class="form-check-input visually-hidden" type="radio" name="${question.id}" id="${optionId}" value="${index}">
                            <label class="option-label" for="${optionId}">
                                <div class="d-flex justify-content-between">
                                    <span>${optionText}</span>
                                    <span class="badge ${window.getMaturityBadgeClass(option.value)}">${maturityLevel}</span>
                                </div>
                            </label>
                        `;
                        
                        // Add event listener for this option
                        optionDiv.querySelector('input').addEventListener('change', function() {
                            // Store response
                            window.userResponses[question.id] = index;
                            
                            // Update progress
                            window.answeredQuestions++;
                            updateProgress();
                            
                            // Enable calculate button if all questions are answered
                            if (window.answeredQuestions === window.totalQuestions) {
                                document.getElementById('calculate-btn').disabled = false;
                            }

                            // Move to next question
                            moveToNextQuestion(this.closest('.question-card'));
                        });
                        
                        optionsContainer.appendChild(optionDiv);
                    });
                    
                    questionCard.appendChild(optionsContainer);
                    section.appendChild(questionCard);
                });
                
                form.appendChild(section);
            });
        }

        /**
         * Move to the next question
         */
        window.moveToNextQuestion = function(currentQuestion) {
            const nextQuestion = currentQuestion.nextElementSibling;
            if (nextQuestion) {
                nextQuestion.scrollIntoView({ behavior: 'smooth' });
            }
        };

        /**
         * Handle when a user selects an answer to a question
         */
        window.handleQuestionResponse = function(questionId, optionIndex) {
            // Store the response
            window.userResponses[questionId] = optionIndex;
            
            // Update progress
            window.updateProgress();
        };

        // Language toggle function
        window.setLanguage = function(lang) {
            // Update current language
            window.currentLang = lang;
            // Update HTML lang attribute
            document.documentElement.lang = lang;
            // Ensure translations are loaded
            if (!translations.questions[lang]) {
                console.error('Translations not found for language:', lang);
                return;
            }
            
            // Update active button
            document.querySelectorAll('.lang-toggle .btn').forEach(btn => {
                btn.classList.remove('active');
                if ((lang === 'en_CA' && btn.textContent === 'EN') ||
                    (lang === 'fr_CA' && btn.textContent === 'FR')) {
                    btn.classList.add('active');
                }
            });
            
            // Store current responses
            const currentResponses = window.userResponses;
            
            // Clear the form
            document.getElementById('assessment-questions').innerHTML = '';
            
            // Update content
            const ui = translations.ui[lang];
            
            // Update header
            document.querySelector('h1').textContent = translations[lang].title;
            document.querySelector('.lead').textContent = translations[lang].subtitle;
            
            // Update legend
            document.getElementById('legend-title').textContent = ui.legend;
            document.getElementById('weight-standard').textContent = ui.standard;
            document.getElementById('weight-normal').textContent = ui.normalWeight;
            document.getElementById('weight-important').textContent = ui.important;
            document.getElementById('weight-double').textContent = ui.doubleWeight;
            document.getElementById('weight-critical').textContent = ui.critical;
            document.getElementById('weight-triple').textContent = ui.tripleWeight;
            
            // Update progress label
            document.getElementById('progress-label').textContent = ui.progressLabel;
            
            // Update buttons
            document.getElementById('calculate-btn').textContent = ui.calculateResults;
            
            // Update section titles
            document.getElementById('practice-areas-title').textContent = ui.practiceAreas;
            
            // Clear existing scrollspy
            const scrollSpyContent = document.querySelector('.col-md-9');
            bootstrap.ScrollSpy.getInstance(scrollSpyContent)?.dispose();
            
            // Reinitialize the assessment with new language
            window.initializeAssessment();
            
            // Restore previous responses
            window.userResponses = currentResponses;
            
            // Update radio buttons based on stored responses
            Object.entries(currentResponses).forEach(([questionId, optionIndex]) => {
                const input = document.querySelector(`input[name="${questionId}"][value="${optionIndex}"]`);
                if (input) {
                    input.checked = true;
                }
            });
            
            // Initialize new scrollspy after a short delay to ensure DOM is updated
            setTimeout(() => {
                new bootstrap.ScrollSpy(scrollSpyContent, {
                    target: '#practice-areas-nav',
                    offset: 100
                });
            }, 100);
            
            document.getElementById('overall-maturity-title').textContent = ui.overallMaturity;
            document.getElementById('practice-area-title').textContent = ui.practiceAreaMaturity;
            document.getElementById('radar-title').textContent = ui.maturityRadar;
            document.getElementById('recommendations-title').textContent = ui.recommendedActions;
            document.getElementById('scoring-explanation').innerHTML = ui.scoringExplanation;
            
            // Update scroll to top button text
            const scrollTopBtn = document.getElementById('scroll-top');
            scrollTopBtn.innerHTML = `<i class="bi bi-arrow-up"></i> ${translations.ui[lang].scrollToTop}`;

            // Clear and reinitialize the assessment form
            const assessmentForm = document.getElementById('assessment-questions');
            assessmentForm.innerHTML = '';
            window.initializeAssessment();
            
            // If results are currently displayed, recalculate them with the new language
            if (document.getElementById('results-container').style.display === 'block') {
                // Destroy existing chart to prevent memory leaks
                if (window.radarChart) {
                    window.radarChart.destroy();
                }
                
                // Calculate scores and update display
                const results = window.calculateResults();
                
                // Update progress
                window.updateProgress();
            }

            // Update practice areas menu
            const practiceAreasNav = document.getElementById('practice-areas-nav');
            practiceAreasNav.innerHTML = '';
            Object.entries(translations.questionDatabase).forEach(([area, questions]) => {
                const link = document.createElement('a');
                link.href = `#section-${area}`;
                const title = translations.practiceAreas[lang][area.replace('-', '')] || 
                    (area === 'applicationArchitecture' ? 'Application Architecture' : 
                    area.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
                link.className = 'nav-link';
                link.textContent = title;
                practiceAreasNav.appendChild(link);
            });
            
            // Reinitialize the assessment to update all questions and options
            const form = document.getElementById('assessment-questions');
            form.innerHTML = '';
            initializeAssessment();
            
            // Update results if they're visible
            if (document.getElementById('results-container').style.display === 'block' && window.currentResults) {
                displayResults(window.currentResults, window.currentChartData);
            }
        };
        
        // Initialize when document is ready
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize current language
            window.currentLang = 'en_CA';
            // Add event listeners
            document.getElementById('calculate-btn').addEventListener('click', window.validateAndCalculate);
            document.getElementById('restart-btn').addEventListener('click', window.restartAssessment);
            document.getElementById('export-btn').addEventListener('click', window.exportResultsAsCsv);
            document.getElementById('scroll-top').addEventListener('click', window.scrollToTop);
            
            // Initialize with English
            setLanguage('en_CA');

            // Initialize scrollspy
            const scrollSpyContent = document.querySelector('.col-md-9');
            new bootstrap.ScrollSpy(scrollSpyContent, {
                target: '#practice-areas-nav',
                offset: 100
            });
        });

        // Handle scroll to top button
        window.addEventListener('scroll', function() {
            const scrollTopBtn = document.getElementById('scroll-top');
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove('d-none');
            } else {
                scrollTopBtn.classList.add('d-none');
            }
        });

        
        /**
         * Get list of unanswered questions in the assessment
         */
        window.getUnansweredQuestions = function() {
            const questions = document.querySelectorAll('.question-card');
            const unanswered = [];
            
            questions.forEach(question => {
                const inputs = question.querySelectorAll('input[type="radio"]');
                const isAnswered = Array.from(inputs).some(input => input.checked);
                if (!isAnswered) {
                    const questionText = question.querySelector('h5')?.textContent || '';
                    const area = question.closest('.practice-area')?.querySelector('.practice-area-title h3')?.textContent || '';
                    unanswered.push({ text: questionText, area: area, element: question });
                }
            });
            
            return unanswered;
        };

        /**
         * Validate all questions are answered before calculating results
         */
        window.validateAndCalculate = function() {
            const unanswered = window.getUnansweredQuestions();
            const validationMessages = document.getElementById('validation-messages');
            const currentLang = document.documentElement.lang;
            
            if (unanswered.length > 0) {
                // Show validation message
                validationMessages.classList.remove('d-none');
                validationMessages.querySelector('.alert-heading').textContent = 
                    translations[currentLang].validation.incomplete;
                
                // Create list of unanswered questions
                const list = document.createElement('ul');
                list.className = 'mb-0';
                unanswered.forEach(q => {
                    const li = document.createElement('li');
                    li.textContent = `${q.area}: ${q.text}`;
                    list.appendChild(li);
                });
                
                const listContainer = validationMessages.querySelector('.unanswered-list');
                listContainer.innerHTML = `<strong>${translations[currentLang].validation.unansweredQuestions}</strong>`;
                listContainer.appendChild(list);
                
                // Update scroll button text
                validationMessages.querySelector('button').textContent = 
                    translations[currentLang].validation.scrollTo;
                
                // Scroll to validation message
                validationMessages.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.calculateResults();
            }
        };

        /**
         * Scroll to the first unanswered question
         */
        window.scrollToFirstUnanswered = function() {
            const unanswered = getUnansweredQuestions();
            if (unanswered.length > 0) {
                unanswered[0].element.scrollIntoView({ behavior: 'smooth' });
                // Add a temporary highlight effect
                unanswered[0].element.classList.add('highlight-question');
                setTimeout(() => {
                    unanswered[0].element.classList.remove('highlight-question');
                }, 2000);
            }
        };
        
        /**
         * Update the progress bar and enable/disable the calculate button
         */
        window.updateProgress = function() {
            // Count answered questions
            window.answeredQuestions = Object.keys(window.userResponses).length;
            
            // Update progress bar
            const progressPercentage = Math.round((window.answeredQuestions / window.totalQuestions) * 100);
            const progressBar = document.getElementById('progress-bar');
            progressBar.style.width = `${progressPercentage}%`;
            progressBar.setAttribute('aria-valuenow', progressPercentage);
            progressBar.textContent = `${progressPercentage}%`;
            
            // Enable calculate button if at least 50% of questions are answered
            const calculateBtn = document.getElementById('calculate-btn');
            if (progressPercentage >= 50) {
                calculateBtn.disabled = false;
            } else {
                calculateBtn.disabled = true;
            }
        };
        
        /**
         * Calculate and display assessment results
         */
        window.calculateResults = function() {
            // Calculate scores
            const results = window.calculateScores(window.userResponses, translations.questionDatabase);
            
            // Generate radar chart data
            const chartData = window.generateRadarChartData(results);
            
            // Display results
            window.displayResults(results, chartData);
            
            // Hide assessment form and show results
            document.getElementById('assessment-form').style.display = 'none';
            document.getElementById('results-container').style.display = 'block';
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        
        /**
         * Display the assessment results
         */
        window.displayResults = function(results, chartData) {
            const lang = document.documentElement.lang;
            const ui = translations.ui[lang];
            
            // Update title
            document.querySelector('#results-container h2').textContent = ui.resultsTitle;
            
            // Display overall maturity level
            const overallLevel = results.overall.maturityLevel;
            document.getElementById('overall-level').textContent = window.formatMaturityLevel(overallLevel);
            document.getElementById('overall-level').className = `maturity-level level-${overallLevel}`;
            document.getElementById('overall-description').textContent = window.getMaturityDescription(overallLevel);
            
            // Display practice area results
            const areaResultsList = document.getElementById('area-results');
            areaResultsList.innerHTML = '';
            
            Object.entries(results).forEach(([area, result]) => {
                if (area === 'overall') return;
                
                // Get translated practice area name
                const areaTitle = translations.practiceAreas[lang][area.replace('-', '')] || area
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase());
                
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                listItem.innerHTML = `
                    <span>${areaTitle}</span>
                    <span class="badge ${window.getMaturityBadgeClass(result.maturityLevel)} rounded-pill">${window.formatMaturityLevel(result.maturityLevel)}</span>
                `;
                
                areaResultsList.appendChild(listItem);
            });
            
            // Create radar chart
            window.createRadarChart(chartData);
            
            // Generate recommendations
            window.generateRecommendations(results);
            
            // Update buttons
            document.getElementById('export-btn').textContent = ui.exportCsv;
            document.getElementById('restart-btn').textContent = ui.restart;
        };
        
        /**
         * Create the radar chart visualization
         */
        // Store the chart instance
        window.radarChart = null;

        window.createRadarChart = function(chartData) {
            const ctx = document.getElementById('radar-chart').getContext('2d');
            
            // Destroy existing chart if it exists
            if (window.radarChart) {
                window.radarChart.destroy();
            }
            
            // Create new chart
            window.radarChart = new Chart(ctx, {
                type: 'radar',
                data: chartData,
                options: {
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            suggestedMin: 0,
                            suggestedMax: 5,
                            ticks: {
                                stepSize: 1,
                                callback: function(value) {
                                    return value - 1; // Adjust display to show original scale
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        };
        
        /**
         * Generate recommendations based on assessment results
         */
        window.generateRecommendations = function(results) {
            const recommendationsContainer = document.getElementById('recommendations');
            const overallLevel = results.overall.maturityLevel;
            const currentLang = document.documentElement.lang;
            const uiText = translations.ui[currentLang];
            
            // Clear previous recommendations
            recommendationsContainer.innerHTML = '';
            
            // General recommendation based on overall level
            let generalRecommendation = '';
            if (overallLevel === -1) {
                generalRecommendation = `
                    <p>${uiText.recommendationPrefix} <strong>${uiText.initial}</strong> ${uiText.maturityLevelSuffix}. 
                    ${uiText.recommendationInitial}</p>
                `;
            } else if (overallLevel === 0) {
                generalRecommendation = `
                    <p>${uiText.recommendationPrefix} <strong>${uiText.managed}</strong> ${uiText.maturityLevelSuffix}. 
                    ${uiText.recommendationManaged}</p>
                `;
            } else if (overallLevel === 1) {
                generalRecommendation = `
                    <p>${uiText.recommendationPrefix} <strong>${uiText.defined}</strong> ${uiText.maturityLevelSuffix}. 
                    ${uiText.recommendationDefined}</p>
                `;
            } else if (overallLevel === 2) {
                generalRecommendation = `
                    <p>${uiText.recommendationPrefix} <strong>${uiText.measured}</strong> ${uiText.maturityLevelSuffix}. 
                    ${uiText.recommendationMeasured}</p>
                `;
            } else if (overallLevel === 3) {
                generalRecommendation = `
                    <p>${uiText.recommendationPrefix} <strong>${uiText.optimizing}</strong> ${uiText.maturityLevelSuffix}. 
                    ${uiText.recommendationOptimizing}</p>
                `;
            }
            
            recommendationsContainer.innerHTML = generalRecommendation;
            
            // Sort practice areas by maturity level (ascending)
            const practiceAreas = Object.entries(results)
                .filter(([area]) => area !== 'overall')
                .sort((a, b) => a[1].maturityLevel - b[1].maturityLevel);
            
            // Create sections for different maturity levels
            const sections = {
                needsImprovement: { title: uiText.needsImprovement, items: [] },
                developing: { title: uiText.developing, items: [] },
                strong: { title: uiText.strong, items: [] }
            };
            
            // Categorize practice areas
            practiceAreas.forEach(([area, result]) => {
                const areaTitle = translations.practiceAreas[currentLang][area.replace('-', '')] || 
                    (area === 'applicationArchitecture' ? 'Application Architecture' : 
                    area.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
                
                const listItem = document.createElement('li');
                listItem.className = 'recommendation-card';
                const recommendations = window.getAreaRecommendation(area, result.maturityLevel);
                listItem.innerHTML = `
                    <h4>${areaTitle} <span class="badge ${window.getMaturityBadgeClass(result.maturityLevel)}">${window.formatMaturityLevel(result.maturityLevel)}</span></h4>
                    <ul class="recommendation-list">
                        ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                `;
                
                // Categorize based on maturity level
                if (result.maturityLevel <= 0) {
                    sections.needsImprovement.items.push(listItem);
                } else if (result.maturityLevel <= 1) {
                    sections.developing.items.push(listItem);
                } else {
                    sections.strong.items.push(listItem);
                }
            });
            
            // Add sections to recommendations container
            Object.values(sections).forEach(section => {
                if (section.items.length > 0) {
                    const sectionDiv = document.createElement('div');
                    sectionDiv.className = 'mb-4';
                    sectionDiv.innerHTML = `<h3 class="mb-3 section-header">${section.title}</h3>`;
                    
                    const sectionList = document.createElement('ul');
                    sectionList.className = 'list-unstyled';
                    section.items.forEach(item => sectionList.appendChild(item));
                    
                    sectionDiv.appendChild(sectionList);
                    recommendationsContainer.appendChild(sectionDiv);
                }
            });
            
            // Add next steps section
            const nextSteps = document.createElement('div');
            nextSteps.className = 'mt-4';
            nextSteps.innerHTML = `
                <h4>${uiText.nextSteps}</h4>
                <ol>
                    <li>${uiText.shareResults}</li>
                    <li>${uiText.createRoadmap}</li>
                    <li>${uiText.setGoals}</li>
                    <li>${uiText.reassess}</li>
                </ol>
            `;
            
            recommendationsContainer.appendChild(nextSteps);
        }
        
        /**
         * Export assessment results as CSV
         */
        window.exportResultsAsCsv = function() {
            // Calculate results again to ensure we have the latest data
            const results = window.calculateScores(window.userResponses, translations.questionDatabase);
            
            // Generate CSV content
            const csvContent = window.generateCsvExport(window.userResponses, results, translations.questionDatabase);
            
            // Create a blob with the CSV content
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            
            // Create a download link and trigger the download
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            link.setAttribute('href', url);
            link.setAttribute('download', 'continuous_delivery_maturity_assessment.csv');
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        
        /**
         * Restart the assessment
         */
        window.restartAssessment = function() {
            // Clear responses
            window.userResponses = {};
            window.answeredQuestions = 0;
            
            // Reset all radio buttons
            document.querySelectorAll('input[type="radio"]').forEach(input => {
                input.checked = false;
            });
            
            // Reset progress bar
            const progressBar = document.getElementById('progress-bar');
            progressBar.style.width = '0%';
            progressBar.setAttribute('aria-valuenow', 0);
            progressBar.textContent = '0%';
            
            // Disable calculate button
            document.getElementById('calculate-btn').disabled = true;
            
            // Show assessment form and hide results
            document.getElementById('assessment-form').style.display = 'block';
            document.getElementById('results-container').style.display = 'none';
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        /**
         * Scroll to the top of the page
         */
        window.scrollToTop = function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        /**
         * Move to the next question after an answer is selected
         * @param {HTMLElement} currentQuestionCard - The current question card element
         */
        function moveToNextQuestion(currentQuestionCard) {
            const nextQuestionCard = currentQuestionCard.nextElementSibling;
            if (nextQuestionCard && nextQuestionCard.classList.contains('question-card')) {
                nextQuestionCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                // If we're at the last question in this practice area,
                // find the next practice area's first question
                const currentPracticeArea = currentQuestionCard.closest('.practice-area');
                const nextPracticeArea = currentPracticeArea.nextElementSibling;
                if (nextPracticeArea) {
                    const firstQuestion = nextPracticeArea.querySelector('.question-card');
                    if (firstQuestion) {
                        firstQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Update the active practice area in the navigation
                        const areaId = nextPracticeArea.id;
                        document.querySelector(`#practice-areas-nav .nav-link[href="#${areaId}"]`).click();
                    }
                }
            }
        }
        
        /**
         * Format maturity level for display
         */
        window.formatMaturityLevel = function(level) {
            const currentLang = document.documentElement.lang;
            const uiText = translations.ui[currentLang];
            return `${uiText.level} ${level}`;
        };
        
        /**
         * Get the CSS class for a maturity level badge
         */
        window.getMaturityBadgeClass = function(level) {
            if (level === -1) return 'bg-danger';
            if (level === 0) return 'bg-warning text-dark';
            if (level === 1) return 'bg-info text-dark';
            if (level === 2) return 'bg-primary';
            if (level === 3) return 'bg-success';
            return 'bg-secondary';
        };
        
        /**
         * Get description for a maturity level
         */
        window.getMaturityDescription = function(level) {
            const currentLang = document.documentElement.lang;
            const uiText = translations.ui[currentLang];
            switch (level) {
                case 0:
                    return uiText.initial;
                case 1:
                    return uiText.managed;
                case 2:
                    return uiText.defined;
                case 3:
                    return uiText.measured;
                case 4:
                    return uiText.optimizing;
                default:
                    return 'Unknown';
            }
        };
        
        /**
         * Get recommendation for a specific practice area and maturity level
         */
        window.getAreaRecommendation = function(area, level) {
            const currentLang = document.documentElement.lang;
            const nextLevel = Math.min(level + 1, 3);
            try {
                return translations.recommendations?.[currentLang]?.[area]?.[`${level}_${nextLevel}`] || [];
            } catch (e) {
                console.warn(`No recommendations found for ${area} level ${level} to ${nextLevel}`);
                return '';
            }
        };