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
        const dominantPole = score > 50 ? 0 : 1; // 0 for first letter, 1 for second
        const dominantColor = dominantPole === 0 ? metric.colorPrimary : metric.colorSecondary;
        
        const dimensionDiv = document.createElement('div');
        dimensionDiv.className = 'dimension';
        
        const headerDiv = document.createElement('div');
        headerDiv.className = 'dimension-header';
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = metric.name;
        
        const scoreSpan = document.createElement('span');
        scoreSpan.textContent = `${Math.abs(score - 50) * 2}% ${metric.poles[dominantPole]}`;
        scoreSpan.style.color = dominantColor;
        
        headerDiv.appendChild(nameSpan);
        headerDiv.appendChild(scoreSpan);
        
        const barDiv = document.createElement('div');
        barDiv.className = 'dimension-bar';
        
        const fillDiv = document.createElement('div');
        fillDiv.className = 'dimension-fill';
        fillDiv.style.backgroundColor = dominantColor;
        fillDiv.style.width = `${score}%`;
        fillDiv.style.setProperty('--fill-width', `${score}%`);
        
        barDiv.appendChild(fillDiv);
        
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'dimension-description';
        descriptionDiv.textContent = metric.poleDescriptions[metric.id[dominantPole]];
        
        dimensionDiv.appendChild(headerDiv);
        dimensionDiv.appendChild(barDiv);
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