// Solutions Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Scroll Animation for Solution Blocks
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

    // Observe all solution blocks
    document.querySelectorAll('.solution-block').forEach(block => {
        observer.observe(block);
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

    // Add hover effect to advantage list items
    const advantageItems = document.querySelectorAll('.advantage-list li');
    advantageItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});
