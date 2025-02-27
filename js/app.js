// Assumes that questions.js defines a global variable `questions` containing your 60 question objects.

// Dummy metrics array for calculation
const metrics = [
    { id: "EX", colorPrimary: "#66CC99", colorSecondary: "#8FBC8F" }
];

// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    let currentQuestionIndex = 0;
    let userResponses = [];
    let chart = null;
    let shuffledQuestions = []; // Randomized questions array

    // DOM elements
    const startBtn = document.getElementById('start-btn'); // Only present on landing if used there
    const retakeBtn = document.getElementById('retake-btn');
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const progressFill = document.getElementById('progress-fill'); // Optional: For progress bar updates
    const questionCounter = document.getElementById('question-counter'); // Optional: For counter display
    const loadingMessage = document.getElementById('loading-message'); // Optional: For loading screen

    // Attach event listeners: start immediately if no button on the page
    if (startBtn) {
        startBtn.addEventListener('click', startAssessment);
    } else {
        startAssessment();
    }
    if (retakeBtn) {
        retakeBtn.addEventListener('click', function() {
            if (chart) { chart.destroy(); chart = null; }
            startAssessment();
        });
    }

    // Function to start the assessment
    function startAssessment() {
        currentQuestionIndex = 0;
        userResponses = [];
        // Randomize questions (assumes `questions` is defined in questions.js)
        shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
        showScreen('question-screen');
        loadQuestion();
    }

    // Function to load and display the current question
    function loadQuestion() {
        if (currentQuestionIndex >= shuffledQuestions.length) {
            showLoadingScreen();
            return;
        }
        
        const question = shuffledQuestions[currentQuestionIndex];
        // Display the current question number followed by the actual question statement from questions.js
        questionText.innerHTML = `<span class="block text-xl font-bold mb-2">
          Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}:
        </span> ${question.text}`;
        answerOptions.innerHTML = ""; // Clear previous answer options

        // Define elegant button styles with a slight shadow
        const buttonDefaultClass = "bg-gray-100 text-gray-800";
        const buttonSelectedClass = "bg-primary text-white";
        const baseButtonClasses = "px-4 py-3 rounded-lg shadow-sm transition duration-150 ease-in-out ";

        // Likert scale labels for a 7‑point scale
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
            button.className = baseButtonClasses + buttonDefaultClass + " hover:shadow-md";
            button.textContent = label;
            button.dataset.value = index + 1; // Scale: 1 to 7

            button.addEventListener("click", function () {
                recordResponse(question, parseInt(this.dataset.value));
                // Clear selection styling on all buttons in the container
                optionsContainer.querySelectorAll("button").forEach((btn) => {
                    btn.classList.remove("bg-primary", "text-white");
                    btn.classList.add("bg-gray-100", "text-gray-800");
                });
                // Apply selected styling using the green theme
                this.classList.remove("bg-gray-100", "text-gray-800");
                this.classList.add("bg-primary", "text-white");

                // Advance to the next question after a brief delay
                setTimeout(() => {
                    currentQuestionIndex++;
                    loadQuestion();
                }, 500);
            });
            optionsContainer.appendChild(button);
        });

        answerOptions.appendChild(optionsContainer);
        updateProgress();

        // (Optional) Ensure the question header border uses the primary (green) color
        const questionHeader = document.querySelector(".question-header");
        if (questionHeader) {
            questionHeader.classList.remove("border-secondary");
            questionHeader.classList.add("border-primary");
        }
    }

    // Update progress (if a progress bar or counter is used)
    function updateProgress() {
        if (progressFill && questionCounter && shuffledQuestions.length > 0) {
            const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
            progressFill.style.width = `${progress}%`;
            questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
        }
    }

    // Record the user's response for the current question
    function recordResponse(question, value) {
        const normalizedValue = value - 1; // Convert 1–7 scale to 0–6
        let score;
        if (question.direction === question.metric[0]) {
            score = (normalizedValue / 6) * 100;
        } else {
            score = ((6 - normalizedValue) / 6) * 100;
        }
        userResponses.push({ question, value, score });
    }

    // Show a loading screen before calculating results
    function showLoadingScreen() {
        showScreen('loading-screen');
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            if (loadingMessage) {
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

    // Calculate results and display them
    function calculateResults() {
        const scores = {};
        metrics.forEach(metric => {
            scores[metric.id] = 50;
        });

        const metricResponses = {};
        metrics.forEach(metric => {
            metricResponses[metric.id] = [];
        });
        userResponses.forEach(response => {
            if (metricResponses[response.question.metric]) {
                metricResponses[response.question.metric].push(response);
            }
        });

        metrics.forEach(metric => {
            const responses = metricResponses[metric.id];
            if (responses.length > 0) {
                const sum = responses.reduce((total, response) => total + response.score, 0);
                scores[metric.id] = Math.round(sum / responses.length);
            }
        });

        const typeCode = generateAnimalCode(scores);
        displayResults(scores);

        const dominantMetric = Object.keys(scores).reduce((a, b) =>
            Math.abs(scores[a] - 50) > Math.abs(scores[b] - 50) ? a : b
        );
        const primaryColor = scores[dominantMetric] > 50 
            ? metrics.find(m => m.id === dominantMetric).colorPrimary 
            : metrics.find(m => m.id === dominantMetric).colorSecondary;
        document.documentElement.style.setProperty('--primary-color', primaryColor);

        showScreen('results-screen');
        if (typeof createRadarChart === 'function') {
            chart = createRadarChart(scores);
        }
    }

    // Reset the assessment for "Retake Test"
    function resetAssessment() {
        if (chart) {
            chart.destroy();
            chart = null;
        }
        startAssessment();
    }

    // Utility function to show a specific screen by its ID (hiding others with the 'hidden' class)
    function showScreen(screenId) {
        const screens = document.querySelectorAll('#question-screen, #results-screen, #loading-screen');
        screens.forEach(screen => screen.classList.add('hidden'));
        const element = document.getElementById(screenId);
        if (element) {
            element.classList.remove('hidden');
        }
    }

    // Generate a dummy animal type code from metric scores.
    function generateAnimalCode(scores) {
        let code = "";
        metrics.forEach(metric => {
            const score = scores[metric.id];
            code += (score > 50 ? metric.id[0] : metric.id[1]);
        });
        return code;
    }

    // Helper: Convert a hex color to an RGB string if needed.
    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    }
}); 