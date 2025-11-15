// Utilities and Common Functionality

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// Video modal functionality
function openVideoModal(videoUrl) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div class="video-modal-content" style="position: relative; width: 90%; max-width: 1000px;">
            <button class="video-modal-close" aria-label="Close" style="position: absolute; top: 10px; right: 10px; color: white; font-size: 1.75rem; background: transparent; border: none; cursor: pointer;">&times;</button>
            <div class="responsive-embed" style="width: 100%;">
                <iframe src="${videoUrl}" frameborder="0" allowfullscreen style="width: 100%; height: 100%;"></iframe>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.video-modal-close');
    closeBtn.onclick = function() {
        modal.remove();
    };
    
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    };
}

// Cookie consent
function showCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #1a1a1a;
            color: white;
            padding: 1.5rem;
            z-index: 9999;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
        `;
        
        banner.innerHTML = `
            <div class="cookie-content" style="max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                <p style="margin: 0;">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. 
                <a href="cookies.html" style="color: #ff6b35;">Learn more</a></p>
                <button class="btn-accept-cookies" style="background: #ff6b35; color: white; padding: 0.5rem 1.5rem; border: none; border-radius: 25px; cursor: pointer; font-weight: 600;">Accept</button>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        banner.querySelector('.btn-accept-cookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'true');
            banner.remove();
        });
    }
}

// Show cookie consent on page load
window.addEventListener('load', showCookieConsent);
