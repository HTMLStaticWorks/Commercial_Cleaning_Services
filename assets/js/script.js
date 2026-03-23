document.addEventListener('DOMContentLoaded', () => {
    // Theme Switch Engine
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light';

    const applyTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
        }
    };

    applyTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // RTL Toggle Logic
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const currentDir = localStorage.getItem('dir') || 'ltr';

    const applyDir = (dir) => {
        document.documentElement.setAttribute('dir', dir);
        localStorage.setItem('dir', dir);
        rtlToggles.forEach(toggle => {
            const isDashOnly = toggle.classList.contains('theme-toggle');
            if (isDashOnly) {
                toggle.innerHTML = dir === 'rtl' ? '<i class="ri-text-direction-l"></i>' : '<i class="ri-text-direction-r"></i>';
            } else if (toggle.classList.contains('menu-item')) {
                 toggle.innerHTML = dir === 'rtl' ? '<i class="ri-text-direction-l"></i> LTR Mode' : '<i class="ri-text-direction-r"></i> RTL Mode';
            } else {
                toggle.innerHTML = dir === 'rtl' ? '<i class="ri-text-direction-l"></i> LTR' : '<i class="ri-text-direction-r"></i> RTL';
            }
        });
    };

    applyDir(currentDir);

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const newDir = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
            applyDir(newDir);
        });
    });

    // Navbar Scroll Interaction
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Drawer Logic
    const hamburger = document.querySelector('.hamburger');
    const drawer = document.querySelector('.mobile-drawer');
    const overlay = document.querySelector('.drawer-overlay');
    const closeDrawer = document.getElementById('close-drawer');

    const toggleDrawer = () => {
        drawer.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = drawer.classList.contains('active') ? 'hidden' : 'auto';
    };

    if (hamburger) {
        hamburger.addEventListener('click', toggleDrawer);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleDrawer);
    }

    if (closeDrawer) {
        closeDrawer.addEventListener('click', toggleDrawer);
    }

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Form Handling - Demo Implementation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Message Sent Successfully!';
                btn.style.backgroundColor = '#10b981';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    contactForm.reset();
                }, 3000);
            }, 1000);
        });
    }

    // Back to Top Logic
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Reveal CSS (needed for the script)
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .reveal-active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.append(style);
