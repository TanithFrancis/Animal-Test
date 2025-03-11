// Mobile-optimized results.js
function displayResults(scores) {
    // Get the animal code and type
    const animalCode = generateAnimalCode(scores);
    const animalType = getAnimalType(animalCode);
    
    // Update the animal information
    document.getElementById('animal-name').textContent = animalType.animal;
    document.getElementById('animal-code').textContent = animalCode;
    document.getElementById('animal-image').src = animalType.image;
    document.getElementById('animal-description').textContent = animalType.description;
    
    // Create radar chart
    if (typeof createRadarChart === 'function') {
        createRadarChart(scores);
    }
    
    // Clear existing dimensions
    const dimensionsBreakdown = document.getElementById('dimensions-breakdown');
    dimensionsBreakdown.innerHTML = '';
    
    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Process each metric
    metrics.forEach(metric => {
        const score = scores[metric.id];
        const dominantPole = score > 50 ? 0 : 1;
        const dominantColor = dominantPole === 0 ? metric.colorPrimary : metric.colorSecondary;
        const oppositeColor = dominantPole === 0 ? metric.colorSecondary : metric.colorPrimary;
        const percentageTowardsDominant = Math.abs(score - 50) * 2;
        
        // Get RGB values from HEX for active color (for transparency)
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? 
                `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
                '102, 204, 153';
        };
        
        // Create dimension card
        const dimensionDiv = document.createElement('div');
        dimensionDiv.className = 'dimension';
        
        // Header section
        const headerDiv = document.createElement('div');
        headerDiv.className = 'dimension-header';
        
        const titleSpan = document.createElement('span');
        titleSpan.className = 'dimension-title';
        titleSpan.textContent = metric.name;
        
        const subtitleSpan = document.createElement('span');
        subtitleSpan.className = 'dimension-subtitle';
        subtitleSpan.textContent = metric.description;
        
        headerDiv.appendChild(titleSpan);
        headerDiv.appendChild(subtitleSpan);
        
        // Icon for dimension
        const iconDiv = document.createElement('div');
        iconDiv.className = 'dimension-icon';
        iconDiv.style.setProperty('--dominant-color', dominantColor);
        iconDiv.textContent = metric.id[0];
        
        // Body section
        const bodyDiv = document.createElement('div');
        bodyDiv.className = 'dimension-body';
        
        // Enhanced scale container
        const scaleContainer = document.createElement('div');
        scaleContainer.className = 'scale-container';
        
        // Scale track and gradient
        const scaleTrack = document.createElement('div');
        scaleTrack.className = 'scale-track';
        
        const scaleGradient = document.createElement('div');
        scaleGradient.className = 'scale-gradient';
        scaleGradient.style.setProperty('--left-color', metric.colorPrimary);
        scaleGradient.style.setProperty('--right-color', metric.colorSecondary);
        
        scaleTrack.appendChild(scaleGradient);
        
        // Tick marks
        const scaleTicks = document.createElement('div');
        scaleTicks.className = 'scale-ticks';
        
        for (let i = 0; i <= 10; i++) {
            const tick = document.createElement('div');
            tick.className = i % 5 === 0 ? 'scale-tick major' : 'scale-tick';
            
            if (i % 5 === 0) {
                const tickLabel = document.createElement('div');
                tickLabel.className = 'scale-tick-label';
                tickLabel.textContent = `${i * 10}%`;
                tick.appendChild(tickLabel);
            }
            
            scaleTicks.appendChild(tick);
        }
        
        // Scale marker (position indicator)
        const scaleMarker = document.createElement('div');
        scaleMarker.className = 'scale-marker';
        scaleMarker.style.setProperty('--marker-color', dominantColor);
        scaleMarker.style.left = `${score}%`;
        
        // Scale pointer (percentage display)
        const scalePointer = document.createElement('div');
        scalePointer.className = 'scale-pointer';
        scalePointer.textContent = `${percentageTowardsDominant}%`;
        scalePointer.style.setProperty('--marker-color', dominantColor);
        scalePointer.style.left = `${score}%`;
        
        // Add all elements to scale container
        scaleContainer.appendChild(scaleTrack);
        scaleContainer.appendChild(scaleTicks);
        scaleContainer.appendChild(scaleMarker);
        scaleContainer.appendChild(scalePointer);
        
        // Scale labels with better descriptions
        const scaleLabels = document.createElement('div');
        scaleLabels.className = 'scale-labels';
        
        // Center line to visually separate the two sides
        const centerLine = document.createElement('div');
        centerLine.className = 'scale-center-line';
        scaleLabels.appendChild(centerLine);
        
        // Left label (first pole)
        const leftLabelContainer = document.createElement('div');
        leftLabelContainer.style.flex = '1';
        
        const leftLabel = document.createElement('div');
        leftLabel.className = `scale-label ${dominantPole === 0 ? 'active' : ''}`;
        leftLabel.textContent = metric.poles[0];
        leftLabel.style.color = metric.colorPrimary;
        leftLabel.style.setProperty('--active-color', metric.colorPrimary);
        leftLabel.style.setProperty('--active-color-rgb', hexToRgb(metric.colorPrimary));
        
        const leftDescription = document.createElement('div');
        leftDescription.className = 'scale-label-description';
        leftDescription.textContent = metric.poleDescriptions[metric.id[0]].split('.')[0] + '.';
        
        leftLabelContainer.appendChild(leftLabel);
        leftLabelContainer.appendChild(leftDescription);
        
        // Right label (second pole)
        const rightLabelContainer = document.createElement('div');
        rightLabelContainer.style.flex = '1';
        rightLabelContainer.style.textAlign = 'right';
        
        const rightLabel = document.createElement('div');
        rightLabel.className = `scale-label ${dominantPole === 1 ? 'active' : ''}`;
        rightLabel.textContent = metric.poles[1];
        rightLabel.style.color = metric.colorSecondary;
        rightLabel.style.setProperty('--active-color', metric.colorSecondary);
        rightLabel.style.setProperty('--active-color-rgb', hexToRgb(metric.colorSecondary));
        
        const rightDescription = document.createElement('div');
        rightDescription.className = 'scale-label-description';
        rightDescription.textContent = metric.poleDescriptions[metric.id[1]].split('.')[0] + '.';
        rightDescription.style.marginLeft = 'auto';
        
        rightLabelContainer.appendChild(rightLabel);
        rightLabelContainer.appendChild(rightDescription);
        
        // Add labels to scale labels container
        scaleLabels.appendChild(leftLabelContainer);
        scaleLabels.appendChild(rightLabelContainer);
        
        // Main description of dominant trait
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'dimension-description';
        descriptionDiv.style.setProperty('--dominant-color', dominantColor);
        
        // Create a more detailed description with trait emphasis
        const descriptionContent = document.createElement('p');
        descriptionContent.innerHTML = `You are <strong>${percentageTowardsDominant}%</strong> towards <strong style="color: ${dominantColor}">${metric.poles[dominantPole]}</strong>. ${metric.poleDescriptions[metric.id[dominantPole]]}`;
        descriptionDiv.appendChild(descriptionContent);
        
        // Assemble all elements
        bodyDiv.appendChild(scaleContainer);
        bodyDiv.appendChild(scaleLabels);
        bodyDiv.appendChild(descriptionDiv);
        
        // Add result summary display
        const resultSummary = document.createElement('div');
        resultSummary.className = 'result-summary';
        resultSummary.innerHTML = `<strong>${metric.poles[dominantPole]}</strong> (${percentageTowardsDominant}%)`;
        resultSummary.style.color = dominantColor;
        resultSummary.style.textAlign = 'center';
        resultSummary.style.fontSize = '1.1rem';
        resultSummary.style.marginTop = '1rem';
        resultSummary.style.fontWeight = '600';
        bodyDiv.appendChild(resultSummary);
        
        // Assemble the full card
        dimensionDiv.appendChild(headerDiv);
        dimensionDiv.appendChild(iconDiv);
        dimensionDiv.appendChild(bodyDiv);
        
        fragment.appendChild(dimensionDiv);
    });
    
    // Append all dimensions at once for better performance
    dimensionsBreakdown.appendChild(fragment);
    
    // Update strengths
    const strengthsList = document.getElementById('strengths-list');
    strengthsList.innerHTML = '';
    const strengthsFragment = document.createDocumentFragment();
    animalType.strengths.forEach(strength => {
        const li = document.createElement('li');
        li.textContent = strength;
        strengthsFragment.appendChild(li);
    });
    strengthsList.appendChild(strengthsFragment);
    
    // Update challenges
    const challengesList = document.getElementById('challenges-list');
    challengesList.innerHTML = '';
    const challengesFragment = document.createDocumentFragment();
    animalType.challenges.forEach(challenge => {
        const li = document.createElement('li');
        li.textContent = challenge;
        challengesFragment.appendChild(li);
    });
    challengesList.appendChild(challengesFragment);
    
    // Update compatible types
    const compatibleTypes = document.getElementById('compatible-types');
    compatibleTypes.innerHTML = '';
    const compatibleFragment = document.createDocumentFragment();
    animalType.compatibleWith.forEach(code => {
        const compatibleType = getAnimalType(code);
        const div = document.createElement('div');
        div.className = 'compatible-type';
        div.textContent = `${compatibleType.animal} (${code})`;
        compatibleFragment.appendChild(div);
    });
    compatibleTypes.appendChild(compatibleFragment);
    
    // Update growth areas
    document.getElementById('growth-areas').textContent = animalType.growthAreas;
    
    // Set up sharing features
    setupShareFeatures(scores);
    
    // Set up touch interactions for mobile
    setupTouchInteractions();
    
    // Save results to localStorage for future visits
    try {
        localStorage.setItem('personalityResults', JSON.stringify(scores));
        localStorage.setItem('resultsTimestamp', Date.now().toString());
    } catch (e) {
        console.warn('Could not save results to localStorage', e);
    }
}

// Generate animal code based on scores
function generateAnimalCode(scores) {
    let code = '';
    
    // E/I dimension
    code += scores.EI > 50 ? 'E' : 'I';
    
    // N/S dimension
    code += scores.NS > 50 ? 'N' : 'S';
    
    // T/F dimension
    code += scores.TF > 50 ? 'T' : 'F';
    
    // J/P dimension
    code += scores.JP > 50 ? 'J' : 'P';
    
    // A/T dimension
    code += scores.AT > 50 ? 'A' : 'T';
    
    // P/I dimension
    code += scores.PI > 50 ? 'P' : 'I';
    
    return code;
}

// Setup mobile-specific touch interactions
function setupTouchInteractions() {
    // Only run on touch devices
    if ('ontouchstart' in window) {
        // Use passive listeners for better scroll performance
        document.querySelectorAll('.dimension').forEach(dim => {
            dim.addEventListener('touchstart', () => {
                dim.classList.add('touched');
            }, { passive: true });
            
            dim.addEventListener('touchend', () => {
                setTimeout(() => {
                    dim.classList.remove('touched');
                }, 200);
            }, { passive: true });
        });
        
        // Optimize mobile sharing
        document.getElementById('whatsapp-share').addEventListener('touchend', function(e) {
            const text = generateShareText();
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
            window.open(whatsappUrl);
        }, { passive: true });
    }
}

// Helper function for share text
function generateShareText() {
    const animalName = document.getElementById('animal-name').textContent;
    const animalCode = document.getElementById('animal-code').textContent;
    return `I'm a ${animalName} on the Animal Personality Assessment! My type is ${animalCode}. Take the test: ${window.location.href}`;
}

// Setup share features
function setupShareFeatures(scores) {
    // Generate QR code for sharing
    if (window.QRCode) {
        new QRCode(document.getElementById("qr-code"), {
            text: window.location.href,
            width: 128,
            height: 128,
            colorDark: "#4A90E2",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
    
    // Set up WhatsApp sharing with optimized handler
    document.getElementById('whatsapp-share').addEventListener('click', function() {
        const text = generateShareText();
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl);
    });
    
    // Set up download with deferred execution
    document.getElementById('download-results').addEventListener('click', function() {
        // Implementing a real download capability would go here
        alert("This would download your results as an image in a real implementation.");
    });
}

// Get animal type from code
function getAnimalType(code) {
    // This would be replaced with your actual animal type definitions
    const animalTypes = {
        'INTJTI': {
            animal: 'Fox',
            image: 'images/animals/fox.png',
            description: 'Cunning and adaptive—you unravel challenges with strategic savvy.',
            strengths: ['Cunning', 'Adaptive', 'Resourceful'],
            challenges: ['Mischievous', 'Distrustful'],
            compatibleWith: ['INTPTP', 'ISTPTI', 'ESFPAP'],
            growthAreas: 'Build trust to balance your independent streak.'
        },
        // Add other animal types here
    };
    
    // Return the animal type or a default if not found
    return animalTypes[code] || {
        animal: 'Mystery Animal',
        image: 'images/animals/default.png',
        description: 'A unique combination of traits makes you special!',
        strengths: ['Adaptability', 'Uniqueness'],
        challenges: ['Being understood'],
        compatibleWith: [],
        growthAreas: 'Explore how your unique combination of traits works together.'
    };
} 