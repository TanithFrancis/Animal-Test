// Function to display the results
function displayResults(scores) {
    // Generate the animal code
    const animalCode = generateAnimalCode(scores);
    
    // Get the animal type
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
    
    // Create dimensions breakdown
    const dimensionsBreakdown = document.getElementById('dimensions-breakdown');
    dimensionsBreakdown.innerHTML = '';
    
    metrics.forEach(metric => {
        const score = scores[metric.id];
        const dominantPole = score > 50 ? 0 : 1;
        const dominantColor = dominantPole === 0 ? metric.colorPrimary : metric.colorSecondary;
        const oppositeColor = dominantPole === 0 ? metric.colorSecondary : metric.colorPrimary;
        const percentageTowardsDominant = Math.abs(score - 50) * 2;
        
        const dimensionDiv = document.createElement('div');
        dimensionDiv.className = 'dimension';
        
        // Header with title and score
        const headerDiv = document.createElement('div');
        headerDiv.className = 'dimension-header';
        
        const titleSpan = document.createElement('span');
        titleSpan.className = 'dimension-title';
        titleSpan.textContent = metric.name;
        
        const scoreSpan = document.createElement('span');
        scoreSpan.className = 'dimension-score';
        scoreSpan.textContent = `${percentageTowardsDominant}%`;
        scoreSpan.style.backgroundColor = dominantColor;
        
        headerDiv.appendChild(titleSpan);
        headerDiv.appendChild(scoreSpan);
        
        // Create the visual scale
        const scaleContainer = document.createElement('div');
        scaleContainer.className = 'scale-container';
        
        // Scale track with gradient
        const scaleTrack = document.createElement('div');
        scaleTrack.className = 'scale-track';
        scaleTrack.style.setProperty('--left-color', metric.colorPrimary);
        scaleTrack.style.setProperty('--right-color', metric.colorSecondary);
        
        // Marker that shows position
        const scaleMarker = document.createElement('div');
        scaleMarker.className = 'scale-marker';
        scaleMarker.style.setProperty('--marker-color', dominantColor);
        scaleMarker.style.left = `${score}%`;
        
        // Percentage indicator
        const scalePercentage = document.createElement('div');
        scalePercentage.className = 'scale-percentage';
        scalePercentage.textContent = `${percentageTowardsDominant}%`;
        scalePercentage.style.setProperty('--marker-color', dominantColor);
        scalePercentage.style.left = `${score}%`;
        
        // Labels for both poles
        const scaleLabels = document.createElement('div');
        scaleLabels.className = 'scale-labels';
        
        const leftLabel = document.createElement('div');
        leftLabel.className = `scale-label ${dominantPole === 0 ? 'active' : ''}`;
        leftLabel.textContent = metric.poles[0];
        leftLabel.style.color = metric.colorPrimary;
        
        const rightLabel = document.createElement('div');
        rightLabel.className = `scale-label ${dominantPole === 1 ? 'active' : ''}`;
        rightLabel.textContent = metric.poles[1];
        rightLabel.style.color = metric.colorSecondary;
        
        scaleLabels.appendChild(leftLabel);
        scaleLabels.appendChild(rightLabel);
        
        // Add all elements to the scale container
        scaleContainer.appendChild(scaleTrack);
        scaleContainer.appendChild(scaleMarker);
        scaleContainer.appendChild(scalePercentage);
        
        // Description of the dominant trait
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'dimension-description';
        descriptionDiv.textContent = metric.poleDescriptions[metric.id[dominantPole]];
        
        // Assemble the complete dimension display
        dimensionDiv.appendChild(headerDiv);
        dimensionDiv.appendChild(scaleContainer);
        dimensionDiv.appendChild(scaleLabels);
        dimensionDiv.appendChild(descriptionDiv);
        
        dimensionsBreakdown.appendChild(dimensionDiv);
    });
    
    // Create the radar chart
    createRadarChart(scores);
    
    // Generate QR code for sharing
    new QRCode(document.getElementById("qr-code"), {
        text: window.location.href,
        width: 128,
        height: 128,
        colorDark: "#4A90E2",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Set up WhatsApp sharing
    document.getElementById('whatsapp-share').addEventListener('click', function() {
        const text = `I'm a ${animalType.animal} on the Animal Personality Assessment! My type is ${animalCode}. Take the test: ${window.location.href}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl);
    });
    
    // Set up results download
    document.getElementById('download-results').addEventListener('click', function() {
        // This is a simplified version - in a real implementation,
        // you would use html2canvas or a similar library to create an image
        alert("This would download your results as an image in a real implementation.");
    });
} 