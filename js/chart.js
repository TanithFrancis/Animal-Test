// Function to create the hexagonal radar chart
function createRadarChart(scores) {
    // Get the canvas element
    const ctx = document.getElementById('results-chart').getContext('2d');
    
    // Prepare data for the chart
    const data = {
        labels: metrics.map(m => `${m.poles[0]} - ${m.poles[1]}`),
        datasets: [{
            label: 'Your Personality Profile',
            data: metrics.map(m => scores[m.id]),
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
                        stepSize: 20,
                        backdropColor: 'transparent',
                        font: {
                            size: 10
                        }
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            family: "'Quicksand', sans-serif",
                            weight: '600'
                        },
                        padding: 20,
                        callback: function(label) {
                            const words = label.split(' - ');
                            return [words[0], words[1]];
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
    
    // Create and return the chart
    return new Chart(ctx, config);
} 