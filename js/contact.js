// Contact Form Handler

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const successMessage = document.getElementById('success-message');
    
    // Check if success parameter exists in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        if (successMessage) {
            successMessage.style.display = 'block';
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Auto-hide after 10 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
                // Remove success parameter from URL
                window.history.replaceState({}, document.title, window.location.pathname);
            }, 10000);
        }
    }
    
    // Form submission handler
    if (contactForm) {
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalButtonText = submitButton.textContent;
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const subject = this.querySelector('#subject').value;
            const message = this.querySelector('#message').value.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Submit form to Web3Forms
            try {
                const formData = new FormData(this);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Redirect to success page
                    window.location.href = '/contact.html?success=true';
                } else {
                    alert('There was a problem sending your message. Please try again.');
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
            } catch (error) {
                alert('There was a problem sending your message. Please try again.');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
});
