// Component Loader - Dynamically loads header and footer

document.addEventListener('DOMContentLoaded', function() {
    // Load Header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initializeNavigation();
        })
        .catch(error => console.error('Error loading header:', error));

    // Load Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});

function initializeNavigation() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 968) {
                navMenu.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.textContent = '☰';
                }
            }
        });
    });

    // Active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Add enhanced scroll effect to header: scrolled, hide-on-scroll-down, show-on-scroll-up
    const header = document.querySelector('.header');
    if (header) {
        let lastKnownScrollY = window.pageYOffset;
        let lastScrollY = lastKnownScrollY;
        let ticking = false;
        const SCROLL_THRESHOLD = 80; // when header should switch to scrolled state

        function onScrollTick() {
            const currentScrollY = lastKnownScrollY;

            // add/remove scrolled class
            if (currentScrollY > SCROLL_THRESHOLD) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // hide on scroll down, show on scroll up
            if (Math.abs(currentScrollY - lastScrollY) > 10) {
                if (currentScrollY > lastScrollY && currentScrollY > SCROLL_THRESHOLD) {
                    // scrolling down
                    header.classList.add('hidden');
                } else {
                    // scrolling up
                    header.classList.remove('hidden');
                }
            }

            lastScrollY = currentScrollY;
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            lastKnownScrollY = window.pageYOffset;
            if (!ticking) {
                window.requestAnimationFrame(onScrollTick);
                ticking = true;
            }
        }, { passive: true });

        // Also remove hidden state on focus/keyup to ensure header appears when user navigates with keyboard
        window.addEventListener('keydown', function(e) {
            if (e.key === 'Tab' || e.key === 'ArrowUp') {
                header.classList.remove('hidden');
            }
        });
    }
}
