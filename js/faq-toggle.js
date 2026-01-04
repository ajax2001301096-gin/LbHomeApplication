// ==============================================
// FAQ TOGGLE - Accordion Effect
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // FAQ ACCORDION
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Toggle active class on clicked item
                item.classList.toggle('active');
                
                // Optional: Close other FAQs when opening one (uncomment if desired)
                /*
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                */
            });
        }
    });
    
    // ==========================================
    // KEYBOARD NAVIGATION FOR FAQ
    // ==========================================
    faqItems.forEach(function(item, index) {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            // Make focusable
            question.setAttribute('tabindex', '0');
            
            // Handle keyboard events
            question.addEventListener('keydown', function(e) {
                // Enter or Space to toggle
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
                
                // Arrow Down - focus next FAQ
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextItem = faqItems[index + 1];
                    if (nextItem) {
                        nextItem.querySelector('.faq-question').focus();
                    }
                }
                
                // Arrow Up - focus previous FAQ
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevItem = faqItems[index - 1];
                    if (prevItem) {
                        prevItem.querySelector('.faq-question').focus();
                    }
                }
            });
        }
    });
    
});