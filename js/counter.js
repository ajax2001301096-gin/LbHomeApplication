// ==============================================
// COUNTER.JS - Animated Number Counter
// ==============================================

// ==========================================
// COUNTER ANIMATION
// ==========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(function() {
        current += increment;
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==========================================
// INTERSECTION OBSERVER FOR COUNTERS
// ==========================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5, // Trigger when 50% visible
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                // Mark as counted to prevent re-animation
                entry.target.classList.add('counted');
                
                // Get target number from data attribute
                const target = parseInt(entry.target.getAttribute('data-target'));
                
                if (!isNaN(target)) {
                    // Start from 0
                    entry.target.textContent = '0';
                    
                    // Animate to target
                    animateCounter(entry.target, target, 2000);
                }
                
                // Stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all counter elements
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ==========================================
// EASING FUNCTIONS FOR SMOOTHER ANIMATION
// ==========================================
function easeOutQuad(t) {
    return t * (2 - t);
}

function animateCounterWithEasing(element, target, duration = 2000) {
    const startTime = performance.now();
    const startValue = 0;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apply easing
        const easedProgress = easeOutQuad(progress);
        const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

// ==========================================
// ENHANCED COUNTER WITH FORMATTING
// ==========================================
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function animateCounterFormatted(element, target, duration = 2000) {
    const startTime = performance.now();
    const startValue = 0;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apply easing
        const easedProgress = easeOutQuad(progress);
        const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
        
        // Format with commas
        element.textContent = formatNumber(currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = formatNumber(target);
        }
    }
    
    requestAnimationFrame(update);
}

// ==========================================
// INIT ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Use the enhanced version with easing and formatting
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                
                const target = parseInt(entry.target.getAttribute('data-target'));
                
                if (!isNaN(target)) {
                    entry.target.textContent = '0';
                    
                    // Use enhanced animation with easing and formatting
                    animateCounterFormatted(entry.target, target, 2500);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
});

// ==========================================
// COUNTER SUFFIX SUPPORT (e.g., "100+", "1K+")
// ==========================================
function animateCounterWithSuffix(element, target, suffix = '', duration = 2000) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easedProgress = easeOutQuad(progress);
        const currentValue = Math.floor(target * easedProgress);
        
        element.textContent = formatNumber(currentValue) + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = formatNumber(target) + suffix;
        }
    }
    
    requestAnimationFrame(update);
}

// Export functions for use in other files
window.animateCounter = animateCounter;
window.animateCounterWithEasing = animateCounterWithEasing;
window.animateCounterFormatted = animateCounterFormatted;
window.animateCounterWithSuffix = animateCounterWithSuffix;