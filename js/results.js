// Function to display the results
function displayResults(scores) {
    // Get the animal code and type
    const animalCode = generateAnimalCode(scores);
    const animalType = getAnimalType(animalCode);
    
    // Update the animal information
    document.getElementById('animal-name').textContent = animalType.animal;
    document.getElementById('animal-code').textContent = animalCode;
    document.getElementById('animal-image').src = animalType.image;
    document.getElementById('animal-description').textContent = animalType.description;
    
    // Update strengths
    const strengthsList = document.getElementById('strengths-list');
    strengthsList.innerHTML = '';
    animalType.strengths.forEach(strength => {
        const li = document.createElement('li');
        li.textContent = strength;
        strengthsList.appendChild(li);
    });
    
    // Update challenges
    const challengesList = document.getElementById('challenges-list');
    challengesList.innerHTML = '';
    animalType.challenges.forEach(challenge => {
        const li = document.createElement('li');
        li.textContent = challenge;
        challengesList.appendChild(li);
    });
    
    // Update compatible types
    const compatibleTypes = document.getElementById('compatible-types');
    compatibleTypes.innerHTML = '';
    animalType.compatibleWith.forEach(code => {
        const compatibleType = getAnimalType(code);
        const div = document.createElement('div');
        div.className = 'compatible-type';
        div.textContent = `${compatibleType.animal} (${code})`;
        compatibleTypes.appendChild(div);
    });
    
    // Update growth areas
    document.getElementById('growth-areas').textContent = animalType.growthAreas;
    
    // Clear existing dimensions breakdown
    const dimensionsBreakdown = document.getElementById('dimensions-breakdown');
    dimensionsBreakdown.innerHTML = '';
    
    // Updated function to create enhanced linear scales
    metrics.forEach(metric => {
        const score = scores[metric.id];
        const dominantPole = score > 50 ? 0 : 1;
        const dominantColor = dominantPole === 0 ? metric.colorPrimary : metric.colorSecondary;
        const oppositeColor = dominantPole === 0 ? metric.colorSecondary : metric.colorPrimary;
        const percentageTowardsDominant = Math.abs(score - 50) * 2;
        
        // Get RGB values from HEX for active color (for transparency)
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(dominantColor);
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
        
        // Create 11 tick marks (0%, 10%, 20%, ... 100%)
        for (let i = 0; i <= 10; i++) {
            const tick = document.createElement('div');
            tick.className = i % 5 === 0 ? 'scale-tick major' : 'scale-tick';
            
            // Add label for major ticks
            if (i % 5 === 0) {
                const tickLabel = document.createElement('div');
                tickLabel.className = 'scale-tick-label';
                tickLabel.textContent = `${i * 10}%`;
                tick.appendChild(tickLabel);
            }
            
            scaleTicks.appendChild(tick);
        }
        
        // Position marker
        const scaleMarker = document.createElement('div');
        scaleMarker.className = 'scale-marker';
        scaleMarker.style.setProperty('--marker-color', dominantColor);
        scaleMarker.style.left = `${score}%`;
        
        // Percentage pointer
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
        
        dimensionsBreakdown.appendChild(dimensionDiv);
    });
    
    // Create the radar chart
    createRadarChart(scores);
    
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
    
    // Set up WhatsApp sharing
    document.getElementById('whatsapp-share').addEventListener('click', function() {
        const text = `I'm a ${animalType.animal} on the Animal Personality Assessment! My type is ${animalCode}. Take the test: ${window.location.href}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl);
    });
    
    // Set up results download
    document.getElementById('download-results').addEventListener('click', function() {
        alert("This would download your results as an image in a real implementation.");
    });
} 