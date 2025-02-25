// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentQuestionIndex = 0;
    let userResponses = [];
    let chart = null;
    
    // Shuffle questions to randomize the order
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    
    // Get DOM elements
    const startBtn = document.getElementById('start-btn');
    const retakeBtn = document.getElementById('retake-btn');
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const progressFill = document.getElementById('progress-fill');
    const questionCounter = document.getElementById('question-counter');
    const loadingMessage = document.getElementById('loading-message');
    
    // Event listeners
    startBtn.addEventListener('click', startAssessment);
    retakeBtn.addEventListener('click', resetAssessment);
    
    // Function to start the assessment
    function startAssessment() {
        // Reset variables
        currentQuestionIndex = 0;
        userResponses = [];
        
        // Show question screen
        showScreen('question-screen');
        
        // Load first question
        loadQuestion();
    }
    
    // Function to load a question
    function loadQuestion() {
        const question = shuffledQuestions[currentQuestionIndex];
        
        // Update question text
        questionText.textContent = question.text;
        questionText.classList.remove('question-enter');
        void questionText.offsetWidth; // Trigger reflow
        questionText.classList.add('question-enter');
        
        // Update progress
        const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
        progressFill.style.width = `${progress}%`;
        questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
        
        // Set up answer options
        const likertOptions = document.querySelectorAll('.likert-option');
        likertOptions.forEach(option => {
            option.classList.remove('selected');
            option.addEventListener('click', function() {
                // Remove selected class from all options
                likertOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Record response
                const value = parseInt(this.getAttribute('data-value'));
                recordResponse(question, value);
                
                // Move to next question after a short delay
                setTimeout(() => {
                    nextQuestion();
                }, 500);
            });
        });
        
        // Update background color based on the current metric
        const metric = metrics.find(m => m.id === question.metric);
        document.documentElement.style.setProperty('--primary-color', question.direction === metric.id[0] ? metric.colorPrimary : metric.colorSecondary);
    }
    
    // Function to record a response
    function recordResponse(question, value) {
        userResponses.push({
            question: question,
            value: value
        });
    }
    
    // Function to move to the next question
    function nextQuestion() {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < shuffledQuestions.length) {
            loadQuestion();
        } else {
            showLoadingScreen();
        }
    }
    
    // Function to show the loading screen
    function showLoadingScreen() {
        showScreen('loading-screen');
        
        // Simulate loading time with changing messages
        const loadingMessages = [
            "Analyzing your personality traits...",
            "Identifying your animal characteristics...",
            "Matching you with your perfect animal type...",
            "Almost there! Finalizing your results..."
        ];
        
        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            loadingMessage.textContent = loadingMessages[messageIndex];
            messageIndex++;
            
            if (messageIndex >= loadingMessages.length) {
                clearInterval(messageInterval);
                setTimeout(() => {
                    calculateResults();
                }, 1500);
            }
        }, 1500);
    }
    
    // Function to calculate results
    function calculateResults() {
        // Initialize scores for each metric
        const scores = {};
        metrics.forEach(metric => {
            scores[metric.id] = 50; // Start at neutral (50%)
        });
        
        // Calculate scores based on responses
        userResponses.forEach(response => {
            const question = response.question;
            const value = response.value;
            const metric = question.metric;
            const direction = question.direction;
            
            // Calculate the impact on the score
            // Value is 1-5, we convert to -2 to +2 range
            const impact = (value - 3) * 5; // -10 to +10 per question
            
            // If direction is the first letter of the metric, positive values increase the score
            // If direction is the second letter, positive values decrease the score
            if (direction === metric[0]) {
                scores[metric] += impact;
            } else {
                scores[metric] -= impact;
            }
        });
        
        // Ensure scores are within 0-100 range
        Object.keys(scores).forEach(metric => {
            scores[metric] = Math.max(0, Math.min(100, scores[metric]));
        });
        
        // Display results
        displayResults(scores);
        showScreen('results-screen');
        
        // Reset primary color
        document.documentElement.style.setProperty('--primary-color', '#4A90E2');
    }
    
    // Function to reset the assessment
    function resetAssessment() {
        // Destroy chart if it exists
        if (chart) {
            chart.destroy();
            chart = null;
        }
        
        // Show intro screen
        showScreen('intro-screen');
    }
    
    // Function to show a specific screen
    function showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show the specified screen
        document.getElementById(screenId).classList.add('active');
    }
}); 