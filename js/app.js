// Do not redefine "metrics" here – use the global variable defined in questions.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentScreen = 'intro-screen';
    let currentQuestionIndex = 0;
    const userResponses = [];
    
    // DOM elements
    const screens = document.querySelectorAll('.screen');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    const progressBar = document.getElementById('progress-bar');
    const questionText = document.getElementById('question-text');
    const questionNumber = document.getElementById('question-number');
    const totalQuestions = document.getElementById('total-questions');
    const likertOptions = document.querySelectorAll('.likert-option');
    const retakeBtn = document.getElementById('retake-btn');
    
    // Set total questions
    if (totalQuestions) {
        totalQuestions.textContent = questions.length;
    }
    
    // Initialize with intro screen
    showScreen('intro-screen');
    
    // Add passive event listeners for better performance on mobile
    if (startBtn) {
        startBtn.addEventListener('click', startAssessment, { passive: true });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion, { passive: true });
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', previousQuestion, { passive: true });
    }
    
    if (retakeBtn) {
        retakeBtn.addEventListener('click', restartAssessment, { passive: true });
    }
    
    // Add touch events for likert options with better mobile performance
    likertOptions.forEach(option => {
        option.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        option.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
            selectOption(this);
        }, { passive: true });
        
        option.addEventListener('click', function() {
            selectOption(this);
        }, { passive: true });
    });
    
    // Handle swipe gestures for question navigation
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.getElementById('question-screen')?.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.getElementById('question-screen')?.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 100; // Minimum distance for swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next question
            if (currentQuestionIndex < questions.length - 1 && isCurrentQuestionAnswered()) {
                nextQuestion();
            }
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous question
            if (currentQuestionIndex > 0) {
                previousQuestion();
            }
        }
    }
    
    // Functions
    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            currentScreen = screenId;
            
            // Apply entrance animations
            if (screenId === 'results-screen') {
                targetScreen.classList.add('results-active');
            }
        }
    }
    
    function startAssessment() {
        currentQuestionIndex = 0;
        userResponses.length = 0;
        showScreen('question-screen');
        displayQuestion(0);
        updateProgressBar();
    }
    
    function displayQuestion(index) {
        const question = questions[index];
        if (!question) return;
        
        questionText.textContent = question.text;
        questionNumber.textContent = index + 1;
        
        // Reset options
        likertOptions.forEach(option => {
            option.classList.remove('selected');
        });
        
        // Set selected option if previously answered
        const previousResponse = userResponses.find(r => r.question === question);
        if (previousResponse) {
            const selectedOption = document.querySelector(`.likert-option[data-value="${previousResponse.score}"]`);
            if (selectedOption) {
                selectedOption.classList.add('selected');
            }
        }
        
        // Update button states
        updateButtonStates();
    }
    
    function selectOption(option) {
        // Remove selection from all options
        likertOptions.forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Add selection to clicked option
        option.classList.add('selected');
        
        // Save response
        const value = parseInt(option.getAttribute('data-value'));
        const currentQuestion = questions[currentQuestionIndex];
        
        // Find if question was already answered
        const existingResponseIndex = userResponses.findIndex(r => r.question === currentQuestion);
        
        if (existingResponseIndex !== -1) {
            userResponses[existingResponseIndex].score = value;
        } else {
            userResponses.push({
                question: currentQuestion,
                score: value
            });
        }
        
        // Enable next button
        updateButtonStates();
        
        // Auto-advance after short delay on mobile
        if (window.innerWidth < 768 && currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                nextQuestion();
            }, 500);
        }
    }
    
    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
            updateProgressBar();
        } else {
            calculateResults();
        }
    }
    
    function previousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
            updateProgressBar();
        }
    }
    
    function updateProgressBar() {
        const progress = ((currentQuestionIndex) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    function updateButtonStates() {
        if (backBtn) {
            backBtn.disabled = currentQuestionIndex === 0;
        }
        
        if (nextBtn) {
            const isLastQuestion = currentQuestionIndex === questions.length - 1;
            nextBtn.textContent = isLastQuestion ? 'See Results' : 'Next';
            nextBtn.disabled = !isCurrentQuestionAnswered();
        }
    }
    
    function isCurrentQuestionAnswered() {
        const currentQuestion = questions[currentQuestionIndex];
        return userResponses.some(r => r.question === currentQuestion);
    }
    
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
    
        // Show results screen
        showScreen('results-screen');
        
        // Display results
        if (typeof displayResults === 'function') {
            displayResults(scores);
        }
    }
    
    function restartAssessment() {
        showScreen('intro-screen');
    }
    
    // Check for saved results in URL or localStorage
    checkForSavedResults();
    
    function checkForSavedResults() {
        // Check URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const resultsParam = urlParams.get('results');
        
        if (resultsParam) {
            try {
                const scores = JSON.parse(atob(resultsParam));
                showScreen('results-screen');
                if (typeof displayResults === 'function') {
                    displayResults(scores);
                }
                return;
            } catch (e) {
                console.error('Failed to parse results from URL', e);
            }
        }
        
        // Check localStorage
        try {
            const savedResults = localStorage.getItem('personalityResults');
            if (savedResults) {
                const scores = JSON.parse(savedResults);
                // Only auto-load if less than 24 hours old
                const timestamp = localStorage.getItem('resultsTimestamp');
                const isRecent = timestamp && (Date.now() - parseInt(timestamp)) < 86400000;
                
                if (isRecent) {
                    showScreen('results-screen');
                    if (typeof displayResults === 'function') {
                        displayResults(scores);
                    }
                }
            }
        } catch (e) {
            console.error('Failed to load results from localStorage', e);
        }
    }
    
    // Register service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registered with scope:', registration.scope);
                })
                .catch(error => {
                    console.error('ServiceWorker registration failed:', error);
                });
        });
    }
}); 