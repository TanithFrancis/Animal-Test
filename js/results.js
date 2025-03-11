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
    
    // Create dimensions breakdown
    metrics.forEach(metric => {
        const score = scores[metric.id];
        const dominantPole = score > 50 ? 0 : 1;
        const dominantColor = dominantPole === 0 ? metric.colorPrimary : metric.colorSecondary;
        const oppositeColor = dominantPole === 0 ? metric.colorSecondary : metric.colorPrimary;
        const percentageTowardsDominant = Math.abs(score - 50) * 2;
        const percentageTowardsOpposite = 100 - percentageTowardsDominant;
        
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
        
        // Use first letter of metric ID as icon
        iconDiv.textContent = metric.id[0];
        
        // Body section
        const bodyDiv = document.createElement('div');
        bodyDiv.className = 'dimension-body';
        
        // Result display with percentages
        const resultDiv = document.createElement('div');
        resultDiv.className = 'dimension-result';
        
        // Left pole
        const leftPoleDiv = document.createElement('div');
        leftPoleDiv.className = `dimension-pole ${dominantPole === 0 ? '' : 'pole-inactive'}`;
        
        const leftPoleName = document.createElement('div');
        leftPoleName.className = 'pole-name';
        leftPoleName.textContent = metric.poles[0];
        leftPoleName.style.color = metric.colorPrimary;
        
        const leftPolePercentage = document.createElement('div');
        leftPolePercentage.className = 'pole-percentage';
        leftPolePercentage.textContent = `${dominantPole === 0 ? percentageTowardsDominant : percentageTowardsOpposite}%`;
        leftPolePercentage.style.color = metric.colorPrimary;
        
        leftPoleDiv.appendChild(leftPoleName);
        leftPoleDiv.appendChild(leftPolePercentage);
        
        // Divider
        const dividerDiv = document.createElement('div');
        dividerDiv.className = 'dimension-divider';
        
        // Right pole
        const rightPoleDiv = document.createElement('div');
        rightPoleDiv.className = `dimension-pole ${dominantPole === 1 ? '' : 'pole-inactive'}`;
        
        const rightPoleName = document.createElement('div');
        rightPoleName.className = 'pole-name';
        rightPoleName.textContent = metric.poles[1];
        rightPoleName.style.color = metric.colorSecondary;
        
        const rightPolePercentage = document.createElement('div');
        rightPolePercentage.className = 'pole-percentage';
        rightPolePercentage.textContent = `${dominantPole === 1 ? percentageTowardsDominant : percentageTowardsOpposite}%`;
        rightPolePercentage.style.color = metric.colorSecondary;
        
        rightPoleDiv.appendChild(rightPoleName);
        rightPoleDiv.appendChild(rightPolePercentage);
        
        resultDiv.appendChild(leftPoleDiv);
        resultDiv.appendChild(dividerDiv);
        resultDiv.appendChild(rightPoleDiv);
        
        // Scale visualization
        const scaleContainer = document.createElement('div');
        scaleContainer.className = 'scale-container';
        
        const scaleFill = document.createElement('div');
        scaleFill.className = 'scale-fill';
        scaleFill.style.width = `${score}%`;
        scaleFill.style.setProperty('--left-color', metric.colorPrimary);
        scaleFill.style.setProperty('--right-color', metric.colorSecondary);
        
        scaleContainer.appendChild(scaleFill);
        
        // Scale labels
        const scaleLabels = document.createElement('div');
        scaleLabels.className = 'scale-labels';
        
        // Add label points (0%, 50%, 100%)
        const leftLabel = document.createElement('div');
        leftLabel.className = `scale-label ${dominantPole === 0 ? 'active' : ''}`;
        leftLabel.textContent = metric.poles[0];
        scaleLabels.appendChild(leftLabel);
        
        const rightLabel = document.createElement('div');
        rightLabel.className = `scale-label ${dominantPole === 1 ? 'active' : ''}`;
        rightLabel.textContent = metric.poles[1];
        scaleLabels.appendChild(rightLabel);
        
        // Description of the dominant trait
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'dimension-description';
        descriptionDiv.style.setProperty('--dominant-color', dominantColor);
        descriptionDiv.textContent = metric.poleDescriptions[metric.id[dominantPole]];
        
        // Assemble all elements
        bodyDiv.appendChild(resultDiv);
        bodyDiv.appendChild(scaleContainer);
        bodyDiv.appendChild(scaleLabels);
        bodyDiv.appendChild(descriptionDiv);
        
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