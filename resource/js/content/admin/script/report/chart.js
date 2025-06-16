const statusPieCtx = document.getElementById('statusPieChart').getContext('2d');
const statusPieChart = new Chart(statusPieCtx, {
    type: 'pie',
    data: {
        labels: ['Approved', 'Pending', 'Rejected'],
        datasets: [{
            label: 'Status Distribution',
            data: [78, 25, 17], // contoh data
            backgroundColor: ['#198754', '#ffc107', '#dc3545'],
            borderColor: ['#fff'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

// Bar Chart - Monthly Requests
const monthlyBarCtx = document.getElementById('monthlyBarChart').getContext('2d');
const monthlyBarChart = new Chart(monthlyBarCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Product Requests',
            data: [12, 19, 15, 22, 30, 25], // contoh data
            backgroundColor: '#0d6efd',
            borderRadius: 4,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

const omsetCtx = document.getElementById('omsetChart').getContext('2d');
new Chart(omsetCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        datasets: [{
            label: 'Omset (Rp)',
            data: [50000000, 60000000, 55000000, 70000000, 80000000, 75000000],
            backgroundColor: '#0d6efd',
            borderRadius: 6
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { callback: val => `Rp ${val.toLocaleString('id-ID')}` }
            }
        }
    }
});

// 2. Pendapatan Bersih Chart (Line)
const profitCtx = document.getElementById('profitChart').getContext('2d');
new Chart(profitCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        datasets: [{
            label: 'Pendapatan Bersih (Rp)',
            data: [20000000, 25000000, 23000000, 30000000, 35000000, 32000000],
            fill: false,
            borderColor: '#198754',
            backgroundColor: '#198754',
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: { callback: val => `Rp ${val.toLocaleString('id-ID')}` }
            }
        }
    }
});

// 3. Sentimen Chart (Pie)
const sentimentCtx = document.getElementById('sentimentChart').getContext('2d');
new Chart(sentimentCtx, {
    type: 'doughnut',
    data: {
        labels: ['Positif', 'Netral', 'Negatif'],
        datasets: [{
            data: [65, 20, 15],
            backgroundColor: ['#198754', '#ffc107', '#dc3545'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});

const soldProductCtx = document.getElementById('soldProductChart').getContext('2d');
new Chart(soldProductCtx, {
    type: 'bar',
    data: {
        labels: ['Smartphone', 'Headphones', 'Smartwatch', 'Tablet', 'Laptop'],
        datasets: [{
            label: 'Unit Terjual',
            data: [120, 90, 75, 40, 60],
            backgroundColor: '#6610f2',
            borderRadius: 6
        }]
    },
    options: {
        indexAxis: 'y', // Makes it horizontal
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});
