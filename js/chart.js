// Mobile-optimized chart implementation
function createRadarChart(scores) {
    const ctx = document.getElementById('results-chart').getContext('2d');
    
    // Check if we're on a mobile device
    const isMobile = window.innerWidth < 768;
    
    // Prepare data for the chart with mobile optimizations
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
                // Calculate percentage toward dominant pole
                return Math.abs(score - 50) * 2;
            }),
            backgroundColor: 'rgba(102, 204, 153, 0.2)',
            borderColor: 'rgba(102, 204, 153, 0.8)',
            borderWidth: isMobile ? 1 : 2, // Thinner lines on mobile
            pointBackgroundColor: metrics.map(m => {
                const score = scores[m.id];
                return score > 50 ? m.colorPrimary : m.colorSecondary;
            }),
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(102, 204, 153, 1)',
            pointRadius: isMobile ? 3 : 5, // Smaller points on mobile
            pointHoverRadius: isMobile ? 5 : 7
        }]
    };
    
    // Mobile-optimized chart configuration
    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            devicePixelRatio: 2, // For sharper rendering on high-DPI screens
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        display: !isMobile, // Hide ticks on mobile
                        font: {
                            size: isMobile ? 8 : 12
                        }
                    },
                    pointLabels: {
                        font: {
                            size: isMobile ? 9 : 14,
                            weight: 'bold'
                        },
                        color: metrics.map(m => {
                            const score = scores[m.id];
                            return score > 50 ? m.colorPrimary : m.colorSecondary;
                        }),
                        padding: isMobile ? 4 : 8
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        lineWidth: isMobile ? 0.5 : 1
                    },
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        lineWidth: isMobile ? 0.5 : 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    displayColors: false,
                    bodyFont: {
                        size: 14
                    },
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
                duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1000,
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