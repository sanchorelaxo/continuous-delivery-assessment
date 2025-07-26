/**
 * Question Loader
 * Handles dynamic loading of assessment questions from MongoDB
 */

window.questionLoader = {
    // Cache for loaded questions
    cache: {
        en_CA: null,
        fr_CA: null
    },
    
    // Current language
    currentLanguage: 'en_CA',
    
    // Current form values (to preserve when switching languages)
    formValues: {},
    
    /**
     * Initialize the question loader
     * @param {string} initialLanguage - Initial language to load (default: 'en_CA')
     * @returns {Promise<void>}
     */
    init: async function(initialLanguage = 'en_CA') {
        this.currentLanguage = initialLanguage;
        
        // Set up language change listener
        document.addEventListener('languageChanged', (event) => {
            const newLanguage = event.detail.language;
            this.handleLanguageChange(newLanguage);
        });
        
        // Initial load
        await this.loadQuestions(initialLanguage);
    },
    
    /**
     * Load questions from MongoDB for a specific language
     * @param {string} language - Language code ('en_CA' or 'fr_CA')
     * @returns {Promise<Object>} - Questions grouped by practice area
     */
    loadQuestions: async function(language = 'en_CA') {
        // Check if questions are already cached
        if (this.cache[language]) {
            return this.cache[language];
        }
        
        try {
            // Fetch questions from the API
            const response = await fetch('/api/questions');
            
            if (!response.ok) {
                throw new Error(`Failed to fetch questions: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error || 'Failed to fetch questions');
            }
            
            // Cache the questions
            this.cache[language] = data.data;

            
            return data.data;
        } catch (error) {
            console.error('Error loading questions:', error);
            
            // Fallback to hardcoded questions if available
            if (window.translations && window.translations.questionDatabase) {
                console.warn('Falling back to hardcoded questions');
                return window.translations.questionDatabase;
            }
            
            throw error;
        }
    },
    
    /**
     * Handle language change
     * @param {string} newLanguage - New language code
     * @returns {Promise<void>}
     */
    handleLanguageChange: async function(newLanguage) {
        // Save current form values before changing language
        this.saveFormValues();
        
        // Update current language
        this.currentLanguage = newLanguage;
        
        // Load questions for the new language
        await this.loadQuestions(newLanguage);
        
        // Render questions with the new language
        await this.renderQuestions();
        
        // Restore form values
        this.restoreFormValues();
    },
    
    /**
     * Save current form values
     */
    saveFormValues: function() {

        const form = document.getElementById('assessment-questions');
        if (!form) return;
        
        this.formValues = {};
        
        // Save radio button selections
        const radioButtons = form.querySelectorAll('input[type="radio"]:checked');
        radioButtons.forEach(radio => {
            this.formValues[radio.name] = radio.value;
        });
        
        // Save text inputs
        const textInputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
        textInputs.forEach(input => {
            this.formValues[input.name] = input.value;
        });
        

    },
    
    /**
     * Restore saved form values
     */
    restoreFormValues: function() {

        const form = document.getElementById('assessment-questions');
        if (!form) return;
        
        // Restore radio button selections
        Object.entries(this.formValues).forEach(([name, value]) => {
            // Handle radio buttons
            const radio = form.querySelector(`input[type="radio"][name="${name}"][value="${value}"]`);
            if (radio) {
                radio.checked = true;
            }
            
            // Handle text inputs
            const textInput = form.querySelector(`input[name="${name}"], textarea[name="${name}"]`);
            if (textInput && (textInput.type === 'text' || textInput.type === 'email' || textInput.tagName === 'TEXTAREA')) {
                textInput.value = value;
            }
        });
        

    },
    
    /**
     * Render questions for the current language
     * @returns {Promise<void>}
     */
    renderQuestions: async function() {

        
        // Get questions for the current language
        const questions = await this.loadQuestions(this.currentLanguage);
        if (!questions) {
            console.error('No questions available to render');
            return;
        }
        
        // Get the form element
        const form = document.getElementById('assessment-questions');
        if (!form) {
            console.error('Assessment form not found');
            return;
        }
        
        // Clear existing questions
        form.innerHTML = '';
        
        // Get practice areas navigation
        const practiceAreasNav = document.getElementById('practice-areas-nav');
        if (practiceAreasNav) {
            practiceAreasNav.innerHTML = '';
        }
        
        // Define practice areas order
        const practiceAreasOrder = [
            'buildManagement', 
            'environments', 
            'releaseManagement', 
            'testing',
            'dataManagement', 
            'configurationManagement', 
            'applicationArchitecture', 
            'observability'
        ];
        
        // Get UI translations with fallback
        const uiTranslations = window.translations && window.translations.ui ? 
            (window.translations.ui[this.currentLanguage] || window.translations.ui.en_CA || {}) : {};
        
        // Render assessment info section
        this.renderAssessmentInfoSection(form, uiTranslations);
        
        // Render each practice area
        practiceAreasOrder.forEach((practiceArea, index) => {
            if (!questions[practiceArea]) {
                console.warn(`No questions found for practice area: ${practiceArea}`);
                return;
            }
            
            // Get practice area title from translations with fallback
            let practiceAreaTitle = '';
            if (window.translations && window.translations.practiceAreas && 
                window.translations.practiceAreas[this.currentLanguage] && 
                window.translations.practiceAreas[this.currentLanguage][practiceArea]) {
                practiceAreaTitle = window.translations.practiceAreas[this.currentLanguage][practiceArea];
            } else {
                // Fallback: convert camelCase to proper title case
                practiceAreaTitle = practiceArea.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            }
            
            // Add to navigation
            if (practiceAreasNav) {
                const navItem = document.createElement('a');
                navItem.className = 'nav-link' + (index === 0 ? ' active' : '');
                navItem.href = `#${practiceArea}`;
                navItem.textContent = practiceAreaTitle;
                practiceAreasNav.appendChild(navItem);
            }
            
            // Create section for practice area
            const section = document.createElement('section');
            section.id = practiceArea;
            section.className = 'practice-area-section mb-5';
            
            // Add heading
            const heading = document.createElement('h2');
            heading.className = 'mb-4';
            heading.textContent = practiceAreaTitle;
            section.appendChild(heading);
            
            // Add questions
            questions[practiceArea].forEach(question => {
                const questionElement = this.createQuestionElement(question, practiceArea);
                section.appendChild(questionElement);
            });
            
            // Add to form
            form.appendChild(section);
        });
        

        
        // Set total questions count for progress tracking
        let totalCount = 0;
        Object.values(questions).forEach(areaQuestions => {
            totalCount += areaQuestions.length;
        });
        window.totalQuestions = totalCount;
        
        // Update progress tracking
        if (window.updateProgress) {
            window.updateProgress();
        }
    },
    
    /**
     * Render assessment info section
     * @param {HTMLElement} form - Form element
     * @param {Object} uiTranslations - UI translations
     */
    renderAssessmentInfoSection: function(form, uiTranslations) {
        // Create assessment info section if it doesn't exist
        let infoSection = document.getElementById('assessment-info');
        if (!infoSection) {
            infoSection = document.createElement('section');
            infoSection.id = 'assessment-info';
            infoSection.className = 'mb-5';
            
            const infoHeading = document.createElement('h2');
            infoHeading.className = 'mb-4';
            infoHeading.textContent = uiTranslations.assessmentInfo || 'Assessment Information';
            infoSection.appendChild(infoHeading);
            
            // Create form fields
            const formFields = `
                <div class="mb-3">
                    <label for="author-email" class="form-label">${uiTranslations.authorEmail || 'Author Email'}</label>
                    <input type="email" class="form-control" id="author-email" name="author-email" 
                           placeholder="${uiTranslations.authorEmailPlaceholder || 'Enter your email address'}" required>
                    <div id="auth-email-message" class="form-text d-none">
                        ${uiTranslations.emailFromAuth || 'Email from your authenticated account'}
                    </div>
                    <div class="invalid-feedback">${uiTranslations.invalidEmail || 'Please enter a valid email address'}</div>
                </div>
                <div class="mb-3">
                    <label for="team-name" class="form-label">${uiTranslations.teamName || 'Team/Squad Name'}</label>
                    <input type="text" class="form-control" id="team-name" name="team-name" 
                           placeholder="${uiTranslations.teamNamePlaceholder || 'Enter your team or squad name'}" required>
                    <div class="invalid-feedback">${uiTranslations.requiredField || 'This field is required'}</div>
                </div>
                <div class="mb-3">
                    <label for="system-name" class="form-label">${uiTranslations.systemName || 'System Name'}</label>
                    <input type="text" class="form-control" id="system-name" name="system-name" 
                           placeholder="${uiTranslations.systemNamePlaceholder || 'Enter system name (optional)'}">
                </div>
            `;
            
            const formFieldsContainer = document.createElement('div');
            formFieldsContainer.innerHTML = formFields;
            infoSection.appendChild(formFieldsContainer);
            
            // Insert at the beginning of the form
            form.insertBefore(infoSection, form.firstChild);
            
            // Update email field based on authentication status
            if (window.updateEmailFieldFromAuth) {
                window.updateEmailFieldFromAuth();
            }
        }
    },
    
    /**
     * Create a question element
     * @param {Object} question - Question data
     * @param {string} practiceArea - Practice area
     * @returns {HTMLElement} - Question element
     */
    createQuestionElement: function(question, practiceArea) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'card mb-4 question-card';
        questionDiv.dataset.questionId = question.id;
        
        // Get question text for current language
        const questionText = question.text[this.currentLanguage] || question.text.en_CA;
        
        // Create question header
        const header = document.createElement('div');
        header.className = 'card-header d-flex justify-content-between align-items-center';
        
        const questionTitle = document.createElement('h5');
        questionTitle.className = 'mb-0';
        questionTitle.textContent = questionText;
        header.appendChild(questionTitle);
        
        // Add weight indicator
        const weightBadge = document.createElement('span');
        weightBadge.className = `badge ${this.getWeightClass(question.weight)}`;
        weightBadge.textContent = this.getWeightText(question.weight);
        header.appendChild(weightBadge);
        
        questionDiv.appendChild(header);
        
        // Create question body with options
        const body = document.createElement('div');
        body.className = 'card-body';
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options-container';
        
        // Add options
        question.options.forEach(option => {
            const optionText = option.text[this.currentLanguage] || option.text.en_CA;
            
            const optionDiv = document.createElement('div');
            optionDiv.className = 'form-check mb-2';
            
            const input = document.createElement('input');
            input.className = 'form-check-input';
            input.type = 'radio';
            input.name = question.id;
            input.id = `${question.id}_${option.value}`;
            input.value = option.value;
            input.dataset.practiceArea = practiceArea;
            
            // Add change event listener
            input.addEventListener('change', (e) => {
                // Get the option index from the question options
                const optionIndex = question.options.findIndex(opt => opt.value.toString() === e.target.value.toString());
                
                // Store the response using handleQuestionResponse if available
                if (window.handleQuestionResponse) {
                    window.handleQuestionResponse(question.id, optionIndex);
                } else {
                    // Fallback: update userResponses directly
                    window.userResponses[question.id] = optionIndex;
                    if (window.updateProgress) {
                        window.updateProgress();
                    }
                }
                
                // Handle autoscroll to next question
                const questionCard = e.target.closest('.question-card');
                if (questionCard && window.moveToNextQuestion) {
                    window.moveToNextQuestion(questionCard);
                }
            });
            
            const label = document.createElement('label');
            label.className = 'form-check-label';
            label.htmlFor = `${question.id}_${option.value}`;
            label.textContent = optionText;
            
            optionDiv.appendChild(input);
            optionDiv.appendChild(label);
            optionsDiv.appendChild(optionDiv);
        });
        
        body.appendChild(optionsDiv);
        questionDiv.appendChild(body);
        
        return questionDiv;
    },
    
    /**
     * Get CSS class for weight badge
     * @param {number} weight - Question weight
     * @returns {string} - CSS class
     */
    getWeightClass: function(weight) {
        switch (weight) {
            case 1: return 'bg-secondary';
            case 2: return 'bg-primary';
            case 3: return 'bg-danger';
            default: return 'bg-secondary';
        }
    },
    
    /**
    }
    
    // Format practice area name for display
    const formattedName = practiceArea.replace(/([A-Z])/g, ' $1').trim();
    
    // Add to navigation
    if (practiceAreasNav) {
        const navItem = document.createElement('a');
        navItem.className = 'nav-link' + (index === 0 ? ' active' : '');
        navItem.href = `#${practiceArea}`;
        navItem.textContent = formattedName;
        practiceAreasNav.appendChild(navItem);
    }
    
    // Create section for practice area
    const section = document.createElement('section');
    section.id = practiceArea;
    section.className = 'practice-area-section mb-5';
    
    // Add heading
    const heading = document.createElement('h2');
    heading.className = 'mb-4';
    heading.textContent = formattedName;
    section.appendChild(heading);
    
    // Add questions
    questions[practiceArea].forEach(question => {
        const questionElement = this.createQuestionElement(question, practiceArea);
        section.appendChild(questionElement);
    });
    
    // Add to form
    form.appendChild(section);
});
        

        
// Update progress tracking
if (window.updateProgress) {
    window.updateProgress();
}
},
    
/**
 * Render assessment info section
 * @param {HTMLElement} form - Form element
 * @param {Object} uiTranslations - UI translations
 */
renderAssessmentInfoSection: function(form, uiTranslations) {
    // Create assessment info section if it doesn't exist
    let infoSection = document.getElementById('assessment-info');
    if (!infoSection) {
        infoSection = document.createElement('section');
        infoSection.id = 'assessment-info';
        infoSection.className = 'mb-5';
        
        const infoHeading = document.createElement('h2');
        infoHeading.className = 'mb-4';
        infoHeading.textContent = uiTranslations.assessmentInfo || 'Assessment Information';
        infoSection.appendChild(infoHeading);
        
        // Create form fields
        const formFields = `
            <div class="mb-3">
                <label for="author-email" class="form-label">${uiTranslations.authorEmail || 'Author Email'}</label>
                <input type="email" class="form-control" id="author-email" name="author-email" 
                       placeholder="${uiTranslations.authorEmailPlaceholder || 'Enter your email address'}" required>
                <div id="auth-email-message" class="form-text d-none">
                    ${uiTranslations.emailFromAuth || 'Email from your authenticated account'}
                </div>
                <div class="invalid-feedback">${uiTranslations.invalidEmail || 'Please enter a valid email address'}</div>
            </div>
            <div class="mb-3">
                <label for="team-name" class="form-label">${uiTranslations.teamName || 'Team/Squad Name'}</label>
                <input type="text" class="form-control" id="team-name" name="team-name" 
                       placeholder="${uiTranslations.teamNamePlaceholder || 'Enter your team or squad name'}" required>
                <div class="invalid-feedback">${uiTranslations.requiredField || 'This field is required'}</div>
            </div>
            <div class="mb-3">
                <label for="system-name" class="form-label">${uiTranslations.systemName || 'System Name'}</label>
                <input type="text" class="form-control" id="system-name" name="system-name" 
                       placeholder="${uiTranslations.systemNamePlaceholder || 'Enter system name (optional)'}">
            </div>
        `;
        
        const formFieldsContainer = document.createElement('div');
        formFieldsContainer.innerHTML = formFields;
        infoSection.appendChild(formFieldsContainer);
        
        // Insert at the beginning of the form
        form.insertBefore(infoSection, form.firstChild);
        
        // Update email field based on authentication status
        if (window.updateEmailFieldFromAuth) {
            window.updateEmailFieldFromAuth();
        }
    }
},
    
/**
 * Create a question element
 * @param {Object} question - Question data
 * @param {string} practiceArea - Practice area
 * @returns {HTMLElement} - Question element
 */
createQuestionElement: function(question, practiceArea) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'card mb-4 question-card';
    questionDiv.dataset.questionId = question.id;
    
    // Get question text for current language
    const questionText = question.text[this.currentLanguage] || question.text.en_CA;
    
    // Create question header
    const header = document.createElement('div');
    header.className = 'card-header d-flex justify-content-between align-items-center';
    
    const questionTitle = document.createElement('h5');
    questionTitle.className = 'mb-0';
    questionTitle.textContent = questionText;
    header.appendChild(questionTitle);
    
    // Add weight indicator
    const weightBadge = document.createElement('span');
    weightBadge.className = `badge ${this.getWeightClass(question.weight)}`;
    weightBadge.textContent = this.getWeightText(question.weight);
    header.appendChild(weightBadge);
    
    questionDiv.appendChild(header);
    
    // Create question body with options
    const body = document.createElement('div');
    body.className = 'card-body';
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options-container';
    
    // Add options
    question.options.forEach(option => {
        const optionText = option.text[this.currentLanguage] || option.text.en_CA;
        
        const optionDiv = document.createElement('div');
        optionDiv.className = 'form-check mb-2';
        
        const input = document.createElement('input');
        input.className = 'form-check-input';
        input.type = 'radio';
        input.name = question.id;
        input.id = `${question.id}_${option.value}`;
        input.value = option.value;
        input.dataset.practiceArea = practiceArea;
        
        // Add change event listener
        input.addEventListener('change', (e) => {
            // Get the option index from the question options
            const optionIndex = question.options.findIndex(opt => opt.value.toString() === e.target.value.toString());
            
            // Store the response using handleQuestionResponse if available
            if (window.handleQuestionResponse) {
                window.handleQuestionResponse(question.id, optionIndex);
            } else {
                // Fallback: update userResponses directly
                window.userResponses[question.id] = optionIndex;
                if (window.updateProgress) {
                    window.updateProgress();
                }
            }
            
            // Auto-scroll to next question
            setTimeout(() => {
                this.moveToNextQuestion(e.target.closest('.card'));
            }, 300); // Small delay to allow the selection to be visually confirmed
        });
        
        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.htmlFor = `${question.id}_${option.value}`;
        label.textContent = optionText;
        
        optionDiv.appendChild(input);
        optionDiv.appendChild(label);
        optionsDiv.appendChild(optionDiv);
    });
    
    body.appendChild(optionsDiv);
    questionDiv.appendChild(body);
    
    return questionDiv;
},
    
/**
 * Get CSS class for weight badge
 * @param {number} weight - Question weight
 * @returns {string} - CSS class
 */
getWeightClass: function(weight) {
    switch (weight) {
        case 1: return 'bg-secondary';
        case 2: return 'bg-primary';
        case 3: return 'bg-danger';
        default: return 'bg-secondary';
    }
},
    
/**
 * Get text for weight badge
 * @param {number} weight - Question weight
 * @returns {string} - Weight text
 */
getWeightText: function(weight) {
    const uiTranslations = window.translations && window.translations.ui ? 
        (window.translations.ui[this.currentLanguage] || window.translations.ui.en_CA || {}) : {};
    
    switch (weight) {
        case 1: return uiTranslations.standard || 'Standard';
        case 2: return uiTranslations.important || 'Important';
        case 3: return uiTranslations.critical || 'Critical';
        default: return uiTranslations.standard || 'Standard';
    }
},

/**
 * Move to the next question after an answer is selected
 * @param {HTMLElement} currentQuestionCard - The current question card element
 */
moveToNextQuestion: function(currentQuestionCard) {
    if (!currentQuestionCard) return;
    
    // Find the next question card in the same practice area
    let nextQuestionCard = currentQuestionCard.nextElementSibling;
    while (nextQuestionCard && !nextQuestionCard.classList.contains('card')) {
        nextQuestionCard = nextQuestionCard.nextElementSibling;
    }
    
    if (nextQuestionCard && nextQuestionCard.querySelector('.form-check-input')) {
        // Found next question in same practice area
        nextQuestionCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        // Look for the next practice area's first question
        const currentSection = currentQuestionCard.closest('.practice-area-section');
        if (currentSection) {
            let nextSection = currentSection.nextElementSibling;
            while (nextSection && !nextSection.classList.contains('practice-area-section')) {
                nextSection = nextSection.nextElementSibling;
            }
            
            if (nextSection) {
                const firstQuestionInNextSection = nextSection.querySelector('.card');
                if (firstQuestionInNextSection) {
                    firstQuestionInNextSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Update the active practice area in the navigation
                    const sectionId = nextSection.id;
                    const navLink = document.querySelector(`#practice-areas-nav .nav-link[href="#${sectionId}"]`);
                    if (navLink) {
                        // Remove active class from all nav links
                        document.querySelectorAll('#practice-areas-nav .nav-link').forEach(link => {
                            link.classList.remove('active');
                        });
                        // Add active class to the new nav link
                        navLink.classList.add('active');
                    }
                }
            }
        }
    }
}
};

// Initialize question loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Get initial language
    const initialLanguage = document.documentElement.lang || 'en_CA';
    
    // Initialize question loader
    window.questionLoader.init(initialLanguage).catch(error => {
        console.error('Failed to initialize question loader:', error);
    });
});
