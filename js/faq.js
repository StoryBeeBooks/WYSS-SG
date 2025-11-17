// FAQ Page JavaScript - Accordion functionality

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    // Make questions keyboard accessible and toggle accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        // make focusable and announce role
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-controls', '');
        question.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');

        const toggle = () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const q = otherItem.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                }
            });
            // Toggle current item
            const nowActive = item.classList.toggle('active');
            question.setAttribute('aria-expanded', nowActive ? 'true' : 'false');
        };

        question.addEventListener('click', toggle);
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });

    // Open first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const q0 = faqItems[0].querySelector('.faq-question');
        if (q0) q0.setAttribute('aria-expanded','true');
    }

    // Category sidebar behavior and accessibility
    const catButtons = document.querySelectorAll('.category-link');
    const categories = document.querySelectorAll('.faq-category');
    if (catButtons.length && categories.length) {
        catButtons.forEach(btn => {
            const target = btn.dataset.cat;
            btn.setAttribute('role','tab');
            btn.setAttribute('aria-controls', target);
            btn.setAttribute('tabindex','0');
            btn.setAttribute('aria-selected', btn.classList.contains('active') ? 'true' : 'false');

            btn.addEventListener('click', ()=>{
                activateCategory(btn, target);
            });

            btn.addEventListener('keydown', (e)=>{
                // Left/Up = previous, Right/Down = next
                const keys = ['ArrowLeft','ArrowUp','ArrowRight','ArrowDown','Home','End'];
                if (!keys.includes(e.key)) return;
                e.preventDefault();
                const all = Array.from(catButtons);
                const idx = all.indexOf(btn);
                let nextIdx = idx;
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nextIdx = (idx - 1 + all.length) % all.length;
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIdx = (idx + 1) % all.length;
                if (e.key === 'Home') nextIdx = 0;
                if (e.key === 'End') nextIdx = all.length - 1;
                all[nextIdx].focus();
                all[nextIdx].click();
            });
        });

        function activateCategory(button, targetId){
            catButtons.forEach(b=>{b.classList.remove('active'); b.setAttribute('aria-selected','false');});
            categories.forEach(c=>c.classList.add('hidden'));
            button.classList.add('active');
            button.setAttribute('aria-selected','true');
            const target = document.getElementById(targetId);
            if (target) {
                target.classList.remove('hidden');
                const firstFaq = target.querySelector('.faq-item');
                if (firstFaq) firstFaq.scrollIntoView({behavior:'smooth', block:'start'});
            }
        }

        // ensure first category shown
        const activeBtn = document.querySelector('.category-link.active') || catButtons[0];
        activateCategory(activeBtn, activeBtn.dataset.cat);
    }
});
