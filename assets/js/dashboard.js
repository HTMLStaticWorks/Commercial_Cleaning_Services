document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Toggle for Mobile
    const dashToggle = document.getElementById('dash-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainDash = document.querySelector('.main-dashboard');

    if (dashToggle && sidebar) {
        dashToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (sidebar && sidebar.classList.contains('active') && !sidebar.contains(e.target) && !dashToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Handle Active Menu State based on current URL
    const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.menu-item').forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});
