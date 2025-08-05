

// Page navigation functions
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function showLogin() {
    showPage('loginPage');
}

function showSignup() {
    showPage('signupPage');
}

function showDashboard() {
    showPage('dashboardPage');
    loadDashboardData();
    updateNavButtons('dashboard');
}

function showLeaderboard() {
    showPage('leaderboardPage');
    loadLeaderboardData();
    updateNavButtons('leaderboard');
}

function updateNavButtons(active) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    if (active === 'dashboard') {
        document.querySelector('.nav-btn').classList.add('active');
    } else if (active === 'leaderboard') {
        document.querySelectorAll('.nav-btn')[1].classList.add('active');
    }
}

// Authentication functions (dummy)
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        showDashboard();
    } else {
        alert('Please enter both email and password!');
    }
}

function signup() {
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    if (name && email && password) {
        alert('Account created successfully! You can now login.');
        showLogin();
    } else {
        alert('Please fill in all fields!');
    }
}

function logout() {
    showLogin();
    // Clear form fields
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

// Data loading functions
function loadDashboardData() {
    const data = internData.current_intern;

    document.getElementById('internName').textContent = data.name;
    document.getElementById('referralCode').textContent = data.referral_code;
    document.getElementById('totalDonations').textContent = `$${data.total_donations.toLocaleString()}`;
    document.getElementById('monthlyDonations').textContent = `$${data.monthly_donations.toLocaleString()}`;
}


function loadLeaderboardData() {
    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardBody.innerHTML = '';

    internData.leaderboard.forEach(intern => {
        const row = document.createElement('tr');
        if (intern.name === 'Shweta Sharma') {
            row.style.backgroundColor = '#e8f4f8';
            row.style.fontWeight = 'bold';
        }

        const rankClass = intern.rank === 1 ? 'first' : intern.rank === 2 ? 'second' : intern.rank === 3 ? 'third' : '';

        row.innerHTML = `
                    <td><span class="rank ${rankClass}">#${intern.rank}</span></td>
                    <td>${intern.name}</td>
                    <td>${intern.referral_code}</td>
                    <td>$${intern.total_donations.toLocaleString()}</td>
                    <td>$${intern.monthly_donations.toLocaleString()}</td>
                `;

        leaderboardBody.appendChild(row);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    // Add some interactive effects
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});
