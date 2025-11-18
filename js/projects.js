// Projects Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // WeChat Video Autoplay Fix
    const pageHeaderVideo = document.getElementById('pageHeaderVideo');
    if (pageHeaderVideo) {
        const isWeChat = /MicroMessenger/i.test(navigator.userAgent);
        
        if (isWeChat) {
            const playVideo = () => {
                pageHeaderVideo.play().catch(err => {
                    console.log('Video autoplay prevented:', err);
                });
            };
            
            playVideo();
            
            if (typeof WeixinJSBridge !== 'undefined') {
                WeixinJSBridge.invoke('getNetworkType', {}, playVideo);
            } else {
                document.addEventListener('WeixinJSBridgeReady', playVideo, false);
            }
            
            const events = ['touchstart', 'click', 'scroll'];
            const handleInteraction = () => {
                playVideo();
                events.forEach(event => {
                    document.removeEventListener(event, handleInteraction);
                });
            };
            events.forEach(event => {
                document.addEventListener(event, handleInteraction, { once: true });
            });
        }
    }

    const searchToggle = document.getElementById('searchToggle');
    const searchInput = document.getElementById('projectSearch');
    const searchWrapper = document.querySelector('.search-wrapper');
    
    // Expandable Search Bar Toggle
    searchToggle.addEventListener('click', function() {
        searchWrapper.classList.toggle('active');
        if (searchWrapper.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
            searchInput.blur();
            // Reset search when closing
            filterProjects('');
        }
    });

    // Close search when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchWrapper.contains(event.target) && searchWrapper.classList.contains('active')) {
            if (searchInput.value === '') {
                searchWrapper.classList.remove('active');
            }
        }
    });

    // Search Functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        filterProjects(searchTerm);
    });

    function filterProjects(searchTerm) {
        const projectItems = document.querySelectorAll('.project-item');
        const regionSections = document.querySelectorAll('.region-section');
        const projectCategories = document.querySelectorAll('.project-category');

        if (searchTerm === '') {
            // Show all items
            projectItems.forEach(item => item.classList.remove('hidden'));
            regionSections.forEach(section => section.classList.remove('hidden'));
            projectCategories.forEach(category => category.classList.remove('hidden'));
            return;
        }

        // Filter project items
        projectItems.forEach(item => {
            const projectName = item.textContent.toLowerCase();
            if (projectName.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        // Hide/show regions based on visible projects
        regionSections.forEach(section => {
            const visibleProjects = section.querySelectorAll('.project-item:not(.hidden)');
            if (visibleProjects.length === 0) {
                section.classList.add('hidden');
            } else {
                section.classList.remove('hidden');
            }
        });

        // Hide/show categories based on visible regions
        projectCategories.forEach(category => {
            const visibleRegions = category.querySelectorAll('.region-section:not(.hidden)');
            if (visibleRegions.length === 0) {
                category.classList.add('hidden');
            } else {
                category.classList.remove('hidden');
            }
        });
    }

    // Fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all project categories
    document.querySelectorAll('.project-category').forEach(category => {
        observer.observe(category);
    });
});
