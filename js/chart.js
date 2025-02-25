// Function to create the hexagonal radar chart
function createRadarChart(scores) {
    // Get the canvas element
    const ctx = document.getElementById('results-chart').getContext('2d');
    
    // Prepare data for the chart
    const data = {
        labels: metrics.map(m => m.name),
        datasets: [{
            label: 'Your Personality Profile',
            data: metrics.map(m => scores[m.id]),
            backgroundColor: 'rgba(74, 144, 226, 0.2)',
            borderColor: 'rgba(74, 144, 226, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: metrics.map(m => {
                const score = scores[m.id];
                return score > 50 ? m.colorPrimary : m.colorSecondary;
            }),
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(74, 144, 226, 1)',
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };
    
    // Chart configuration
    const config = {
        type: 'radar',
        data: data,
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 20,
                        backdropColor: 'transparent'
                    },
                    pointLabels: {
                        font: {
                            size: 12,
                            family: "'Poppins', sans-serif"
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
                            const metricId = metrics[context.dataIndex].id;
                            const score = context.raw;
                            const pole = score > 50 ? metricId[0] : metricId[1];
                            const poleName = metrics[context.dataIndex].poles[pole === metricId[0] ? 0 : 1];
                            return `${poleName}: ${score}%`;
                        }
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.2
                }
            }
        }
    };
    
    // Create the chart
    return new Chart(ctx, config);
} 