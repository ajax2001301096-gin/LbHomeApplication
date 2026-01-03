// ==============================================
// SERVICES SLIDESHOW - Auto Image Rotation
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize slideshow for Real Estate section
    initSlideshow('realEstateSlideshow', 2000);
    
    // Initialize slideshow for Cleaning Service section
    initSlideshow('cleaningSlideshow', 2000);
    
});

/**
 * Initialize slideshow for a specific container
 * @param {string} containerId - ID of the slideshow container
 * @param {number} interval - Time in milliseconds between slides
 */
function initSlideshow(containerId, interval) {
    const container = document.getElementById(containerId);
    
    if (!container) return;
    
    const slides = container.querySelectorAll('.slideshow-item');
    
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    
    // Function to show next slide
    function showNextSlide() {
        // Remove active class from current slide
        slides[currentIndex].classList.remove('active');
        
        // Move to next slide
        currentIndex = (currentIndex + 1) % slides.length;
        
        // Add active class to next slide
        slides[currentIndex].classList.add('active');
    }
    
    // Start auto rotation
    setInterval(showNextSlide, interval);
}

// Export for potential external use
window.initSlideshow = initSlideshow;