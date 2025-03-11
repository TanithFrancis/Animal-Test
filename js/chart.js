// Function to create the hexagonal radar chart
function createRadarChart(scores) {
    // Get the canvas element
    const ctx = document.getElementById('results-chart').getContext('2d');
    
    // Prepare data for the chart correctly showing dominant poles
    const data = {
        labels: metrics.map(m => {
            const score = scores[m.id];
            const dominantPole = score > 50 ? 0 : 1;
            return m.poles[dominantPole]; // Show only the dominant pole name
        }),
        datasets: [{
            label: 'Your Personality Profile',
            data: metrics.map(m => {
                const score = scores[m.id];
                // Calculate percentage toward dominant pole (same as in dimensions display)
                return Math.abs(score - 50) * 2;
            }),
            backgroundColor: 'rgba(102, 204, 153, 0.2)',
            borderColor: 'rgba(102, 204, 153, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: metrics.map(m => {
                const score = scores[m.id];
                return score > 50 ? m.colorPrimary : m.colorSecondary;
            }),
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(102, 204, 153, 1)',
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };
    
    // Chart configuration
    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 25,
                        backdropColor: 'transparent',
                        font: {
                            size: 9
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 12,
                            family: "'Quicksand', sans-serif",
                            weight: '600'
                        },
                        padding: 15,
                        color: context => {
                            const index = context.index;
                            const score = scores[metrics[index].id];
                            return score > 50 ? metrics[index].colorPrimary : metrics[index].colorSecondary;
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const metricId = metrics[index].id;
                            const score = scores[metricId];
                            const dominantPole = score > 50 ? 0 : 1;
                            const poleName = metrics[index].poles[dominantPole];
                            return `${poleName}: ${Math.abs(score - 50) * 2}%`;
                        }
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.2
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    };
    
    // Add title above chart
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer && !document.querySelector('.chart-title')) {
        const title = document.createElement('div');
        title.className = 'chart-title';
        title.textContent = 'Your Personality Profile';
        chartContainer.insertBefore(title, document.getElementById('results-chart'));
    }
    
    // Create and return the chart
    return new Chart(ctx, config);
} 