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
    
    // Function to load a question (ensuring the blue color is always used)
    function loadQuestion() {
        const question = shuffledQuestions[currentQuestionIndex];
        questionText.textContent = question.text;
        answerOptions.innerHTML = "";

        // Fixed blue color (primary) from our Tailwind config
        const buttonColorClass = "bg-blue-500 text-white",
              buttonDefaultClass = "bg-gray-100 text-gray-800";

        const likertLabels = [
            "Strongly Disagree",
            "Disagree",
            "Slightly Disagree",
            "Neutral",
            "Slightly Agree",
            "Agree",
            "Strongly Agree"
        ];

        const optionsContainer = document.createElement("div");
        optionsContainer.className = "flex flex-col gap-4";

        likertLabels.forEach((label, index) => {
            const button = document.createElement("button");
            button.className = `likert-button px-4 py-3 rounded transition-colors ${buttonDefaultClass}`;
            button.textContent = label;
            button.dataset.value = index + 1;

            button.addEventListener("click", function () {
                recordResponse(question, parseInt(this.dataset.value));

                // Remove dynamic (non-blue) selections from all buttons.
                document
                    .querySelectorAll(".likert-button")
                    .forEach((btn) => {
                        btn.classList.remove("bg-blue-500", "text-white");
                        btn.classList.add("bg-gray-100", "text-gray-800");
                    });

                // Mark the clicked button as selected.
                this.classList.remove("bg-gray-100", "text-gray-800");
                this.classList.add("bg-blue-500", "text-white");

                // Brief delay before advancing.
                setTimeout(() => {
                    nextQuestion();
                }, 500);
            });

            optionsContainer.appendChild(button);
        });

        answerOptions.appendChild(optionsContainer);

        // Update progress if applicable.
        updateProgress();

        // Ensure any question header styling remains blue (using Tailwind).
        const questionHeader = document.querySelector(".question-header");
        if (questionHeader) {
            questionHeader.classList.remove("border-secondary");
            questionHeader.classList.add("border-blue-500");
        }
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
    
    // Helper function to convert hex to RGB
    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    }
}); 