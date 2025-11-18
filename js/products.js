// Products Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Scroll Animation for Product Items
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all product items and cards
    document.querySelectorAll('.product-item, .product-card').forEach(item => {
        observer.observe(item);
    });

    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Add subtle animation on click
            this.style.transform = 'scale(0.95) translateY(-3px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }

    // Add hover effect to spec badges
    const specBadges = document.querySelectorAll('.spec-badge');
    specBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Enhanced product image hover effects
    const productImages = document.querySelectorAll('.product-image, .card-image');
    productImages.forEach(imageContainer => {
        const img = imageContainer.querySelector('img');
        if (img) {
            imageContainer.addEventListener('mouseenter', function() {
                img.style.transition = 'transform 0.4s ease';
            });
        }
    });
});
