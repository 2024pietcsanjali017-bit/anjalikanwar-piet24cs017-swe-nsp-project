// Check if user is logged in as teacher
window.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userType = sessionStorage.getItem('userType');
    
    if (!isLoggedIn || userType !== 'teacher') {
        window.location.href = 'index.html';
        return;
    }
    
    showPage('home');
});

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
});

const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('pageTitle');

const pageTitles = {
    'home': 'Teacher Dashboard',
    'mark-attendance': 'Mark Attendance',
    'student-list': 'Student List',
    'upload-marks': 'Upload Marks',
    'salary': 'Salary Details',
    'schedule': 'Weekly Schedule',
    'settings': 'Settings',
    'logout': 'Logout'
};

function showPage(pageName) {
    const allPages = document.querySelectorAll('.page-content');
    allPages.forEach(page => page.classList.add('hidden'));
    
    const selectedPage = document.getElementById(pageName + '-content');
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
    }
    
    if (pageTitles[pageName]) {
        pageTitle.textContent = pageTitles[pageName];
    }
}

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        
        if (page === 'logout') {
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.clear();
                window.location.href = 'welcome.html';
            }
            return;
        }
        
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        showPage(page);
        
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});