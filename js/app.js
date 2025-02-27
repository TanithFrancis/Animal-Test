// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentQuestionIndex = 0;
    let userResponses = [];
    let chart = null;
    let shuffledQuestions = []; // Randomized questions array

    // Get DOM elements (if they exist)
    const startBtn = document.getElementById('start-btn'); // May not exist on test.html
    const retakeBtn = document.getElementById('retake-btn');
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const progressFill = document.getElementById('progress-fill'); // Optional: if you have a progress bar
    const questionCounter = document.getElementById('question-counter'); // Optional: if you show a question counter
    const loadingMessage = document.getElementById('loading-message'); // Optional: for loading screen

    // Attach event listeners:
    // On test.html, there is no start button – test starts automatically.
    if (startBtn) {
        startBtn.addEventListener('click', startAssessment);
    } else {
        startAssessment();
    }
    retakeBtn.addEventListener('click', function() {
        if (chart) {
            chart.destroy();
            chart = null;
        }
        startAssessment();
    });

    // Function to start the assessment
    function startAssessment() {
        currentQuestionIndex = 0;
        userResponses = [];
        // Shuffle ALL questions (assuming a global 'questions' array exists)
        shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        showScreen('question-screen');
        loadQuestion();
    }

    // Function to load a question and display it
    function loadQuestion() {
        // If the test is completed, proceed to results.
        if (currentQuestionIndex >= shuffledQuestions.length) {
            showLoadingScreen();
            return;
        }
        
        const question = shuffledQuestions[currentQuestionIndex];
        questionText.textContent = question.text;
        answerOptions.innerHTML = ""; // Clear previous answer options

        // Use your green theme for selections:
        // Selected answer style uses primary which is defined in Tailwind config as "#66CC99".
        const buttonColorClass = "bg-primary text-white";
        const buttonDefaultClass = "bg-gray-100 text-gray-800";

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
            button.className = `px-4 py-3 rounded transition-colors ${buttonDefaultClass}`;
            button.textContent = label;
            button.dataset.value = index + 1; // Scale is 1 to 7

            button.addEventListener("click", function () {
                recordResponse(question, parseInt(this.dataset.value));
                // Remove selection styles from all buttons in the container
                optionsContainer.querySelectorAll("button").forEach((btn) => {
                    btn.classList.remove("bg-primary", "text-white");
                    btn.classList.add("bg-gray-100", "text-gray-800");
                });
                // Mark the clicked button as selected with the green theme
                this.classList.remove("bg-gray-100", "text-gray-800");
                this.classList.add("bg-primary", "text-white");

                // Brief delay before advancing
                setTimeout(() => {
                    currentQuestionIndex++;
                    loadQuestion();
                }, 500);
            });
            optionsContainer.appendChild(button);
        });

        answerOptions.appendChild(optionsContainer);
        updateProgress();

        // Update question header border to use primary (green)
        const questionHeader = document.querySelector(".question-header");
        if (questionHeader) {
            questionHeader.classList.remove("border-secondary");
            questionHeader.classList.add("border-primary");
        }
    }

    // Function to update progress (if you have a progress bar or counter)
    function updateProgress() {
        if(progressFill && questionCounter && shuffledQuestions.length > 0){
            const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
            progressFill.style.width = `${progress}%`;
            questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
        }
    }

    // Record user response for each question
    function recordResponse(question, value) {
        const normalizedValue = value - 1; // Convert scale of 1-7 to 0-6
        let score;
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

    // Function to show a loading screen then calculate results
    function showLoadingScreen() {
        showScreen('loading-screen');
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            if(loadingMessage){
                loadingMessage.textContent = `Analyzing your responses... ${progress}%`;
            }
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    calculateResults();
                }, 500);
            }
        }, 100);
    }

    // Function to calculate results and display them
    function calculateResults() {
        const scores = {};
        
        // Initialize metrics at a neutral score; assume 'metrics' is a global array.
        metrics.forEach(metric => {
            scores[metric.id] = 50;
        });

        // Group responses by metric
        const metricResponses = {};
        metrics.forEach(metric => {
            metricResponses[metric.id] = [];
        });
        userResponses.forEach(response => {
            if (metricResponses[response.question.metric]) {
                metricResponses[response.question.metric].push(response);
            }
        });

        // Calculate averages
        metrics.forEach(metric => {
            const responses = metricResponses[metric.id];
            if (responses.length > 0) {
                const sum = responses.reduce((total, response) => total + response.score, 0);
                scores[metric.id] = Math.round(sum / responses.length);
            }
        });

        const typeCode = generateAnimalCode(scores);
        displayResults(scores);

        // Optionally update primary colour based on dominant metric (if your metrics define such colours)
        const dominantMetric = Object.keys(scores).reduce((a, b) =>
            Math.abs(scores[a] - 50) > Math.abs(scores[b] - 50) ? a : b
        );
        const primaryColor = scores[dominantMetric] > 50 
            ? metrics.find(m => m.id === dominantMetric).colorPrimary 
            : metrics.find(m => m.id === dominantMetric).colorSecondary;
        document.documentElement.style.setProperty('--primary-color', primaryColor);

        showScreen('results-screen');
        chart = createRadarChart(scores);
    }

    // Function to reset the assessment by restarting it immediately
    function resetAssessment() {
        if(chart) {
            chart.destroy();
            chart = null;
        }
        startAssessment();
    }

    // Efficient function to show a specific screen using the 'hidden' class
    function showScreen(screenId) {
        const screens = document.querySelectorAll('#question-screen, #results-screen, #loading-screen');
        screens.forEach(screen => {
            screen.classList.add('hidden');
        });
        const element = document.getElementById(screenId);
        if (element) {
            element.classList.remove('hidden');
        }
    }

    // Function to generate the animal type code from metric scores
    function generateAnimalCode(scores) {
        let code = "";
        metrics.forEach(metric => {
            const score = scores[metric.id];
            code += (score > 50 ? metric.id[0] : metric.id[1]);
        });
        return code;
    }

    // Helper: Convert hex to RGB if needed
    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    }
}); 