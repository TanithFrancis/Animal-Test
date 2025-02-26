// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentQuestionIndex = 0;
    let userResponses = [];
    let chart = null;
    let shuffledQuestions = []; // Define at the top level
    
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
        
        // Shuffle ALL questions to randomize the order properly
        shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        
        // Show question screen
        showScreen('question-screen');
        
        // Load first question
        loadQuestion();
    }
    
    // Function to load a question
    function loadQuestion() {
        // Get the current question
        const question = shuffledQuestions[currentQuestionIndex];
        
        // Update question text
        questionText.textContent = question.text;
        
        // Clear previous options
        answerOptions.innerHTML = '';
        
        // Get the metric for this question
        const metricId = question.metric;
        const metric = metrics.find(m => m.id === metricId);
        
        // Get the appropriate color based on question direction
        const buttonColor = question.direction === metricId[0] ? 
                            metric.colorPrimary : 
                            metric.colorSecondary;
        
        // Define the Likert scale text labels
        const likertLabels = [
            "Strongly Disagree",
            "Disagree", 
            "Slightly Disagree",
            "Neutral",
            "Slightly Agree", 
            "Agree",
            "Strongly Agree"
        ];
        
        // Create container for options
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'likert-options-container';
        
        // Set a data attribute for the metric on the container
        optionsContainer.dataset.metric = metricId;
        
        // Add each option as a button
        likertLabels.forEach((label, index) => {
            const button = document.createElement('button');
            button.className = 'likert-button';
            button.textContent = label;
            button.dataset.value = index + 1; // Store 1-7 as the value
            
            // Add click event
            button.addEventListener('click', function() {
                // Record response
                recordResponse(question, parseInt(this.dataset.value));
                
                // Highlight selected button with the metric color
                document.querySelectorAll('.likert-button').forEach(btn => {
                    btn.classList.remove('selected');
                });
                this.classList.add('selected');
                this.style.backgroundColor = buttonColor;
                
                // Move to next question after a brief delay
                setTimeout(() => {
                    nextQuestion();
                }, 500);
            });
            
            optionsContainer.appendChild(button);
        });
        
        // Add to DOM
        answerOptions.appendChild(optionsContainer);
        
        // Update question header with metric color
        const questionHeader = document.querySelector('.question-header');
        if (questionHeader) {
            questionHeader.style.borderColor = buttonColor;
        }
        
        // Update progress
        updateProgress();
        
        // Set CSS variable for the current metric color
        document.documentElement.style.setProperty('--current-metric-color', buttonColor);
        
        // Helper function to convert hex to RGB
        function hexToRgb(hex) {
            hex = hex.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            return `${r}, ${g}, ${b}`;
        }
        
        document.documentElement.style.setProperty('--current-metric-color-rgb', hexToRgb(buttonColor));
    }
    
    // Function to update progress indicators
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
        progressFill.style.width = `${progress}%`;
        questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    }
    
    // Function to record a response
    function recordResponse(question, value) {
        // Normalize value to 0-6 (scale 1-7 -> 0-6)
        const normalizedValue = value - 1;
        let score;
        // Check: if question.direction equals the first letter of the metric, use one formula; otherwise, reverse it.
        if (question.direction === question.metric[0]) {
            score = (normalizedValue / 6) * 100;
        } else {
            score = ((6 - normalizedValue) / 6) * 100;
        }
        
        userResponses.push({
            question: question,
            value: value,
            score: score
        });
    }
    
    // Function to move to the next question
    function nextQuestion() {
        // Increment the index
        currentQuestionIndex++;
        
        // Check if there are more questions
        if (currentQuestionIndex < shuffledQuestions.length) {
            // Load the next question
            loadQuestion();
        } else {
            // Show loading screen before results
            showLoadingScreen();
        }
    }
    
    // Function to show loading screen
    function showLoadingScreen() {
        // Show loading screen
        showScreen('loading-screen');
        
        // Simulate processing
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            loadingMessage.textContent = `Analyzing your responses... ${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    calculateResults();
                }, 500);
            }
        }, 100);
    }
    
    // Function to calculate results
    function calculateResults() {
        const scores = {};
        
        // Initialize each metric's score.
        metrics.forEach(metric => {
            scores[metric.id] = 50; // start from neutral
        });
        
        // Group responses by metric.
        const metricResponses = {};
        metrics.forEach(metric => {
            metricResponses[metric.id] = [];
        });
        
        // Distribute responses into each metric.
        userResponses.forEach(response => {
            if (metricResponses[response.question.metric]) {
                metricResponses[response.question.metric].push(response);
            }
        });
        
        // For each metric, calculate the average score.
        metrics.forEach(metric => {
            const responses = metricResponses[metric.id];
            if (responses.length > 0) {
                const sum = responses.reduce((total, response) => total + response.score, 0);
                scores[metric.id] = Math.round(sum / responses.length);
            }
        });
        
        // Now generate the 6-letter code (the method below assumes you iterate in metric order)
        const typeCode = generateAnimalCode(scores);
        
        // Display results
        displayResults(scores);
        
        // Update primary color based on dominant animal type
        const animalType = getAnimalType(typeCode);
        const dominantMetric = Object.keys(scores).reduce((a, b) => {
            return Math.abs(scores[a] - 50) > Math.abs(scores[b] - 50) ? a : b;
        });
        
        const primaryColor = scores[dominantMetric] > 50 
            ? metrics.find(m => m.id === dominantMetric).colorPrimary 
            : metrics.find(m => m.id === dominantMetric).colorSecondary;
        
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        
        // Show results screen with animation
        showScreen('results-screen');
        
        // Create and animate the radar chart
        chart = createRadarChart(scores);
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
    
    // Function to generate the type code from scores.
    function generateAnimalCode(scores) {
        let code = "";
        metrics.forEach(metric => {
            const score = scores[metric.id];
            // If score > 50, choose the first letter; otherwise choose the second.
            code += (score > 50 ? metric.id[0] : metric.id[1]);
        });
        return code;
    }
}); 