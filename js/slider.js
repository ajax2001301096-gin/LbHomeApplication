// ==============================================
// SLIDER.JS - 3D Cube Slider & Members Slider
// ==============================================

// ==========================================
// 3D CUBE HERO SLIDER
// ==========================================
let cubeRotation = 0;
let cubeInterval;

function rotateCube() {
    const cube = document.querySelector('.cube');
    if (!cube) return;
    
    // Rotate to next face
    cubeRotation -= 90;
    cube.style.transform = `rotateY(${cubeRotation}deg)`;
}

function startCubeSlider() {
    // Auto rotate every 3 seconds
    cubeInterval = setInterval(rotateCube, 3000);
}

function stopCubeSlider() {
    if (cubeInterval) {
        clearInterval(cubeInterval);
    }
}

// Start cube slider when page loads
document.addEventListener('DOMContentLoaded', function() {
    startCubeSlider();
});

// ==========================================
// MEMBERS SLIDER
// ==========================================
let currentMemberIndex = 0;
let memberSlides = [];

function initMembersSlider() {
    memberSlides = document.querySelectorAll('.member-slide');
    if (memberSlides.length === 0) return;
    
    // Show first slide
    showMemberSlide(0);
}

function showMemberSlide(index) {
    // Hide all slides
    memberSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide
    if (memberSlides[index]) {
        memberSlides[index].classList.add('active');
        currentMemberIndex = index;
    }
}

function nextMember() {
    let nextIndex = currentMemberIndex + 1;
    if (nextIndex >= memberSlides.length) {
        nextIndex = 0; // Loop back to first
    }
    showMemberSlide(nextIndex);
}

function prevMember() {
    let prevIndex = currentMemberIndex - 1;
    if (prevIndex < 0) {
        prevIndex = memberSlides.length - 1; // Loop to last
    }
    showMemberSlide(prevIndex);
}

// Initialize members slider when page loads
document.addEventListener('DOMContentLoaded', function() {
    initMembersSlider();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevMember();
        } else if (e.key === 'ArrowRight') {
            nextMember();
        }
    });
    
    // Auto-advance members slider every 3 seconds
    setInterval(nextMember, 3000);
});

// Make functions globally accessible for onclick handlers
window.nextMember = nextMember;
window.prevMember = prevMember;

// ==========================================
// TOUCH SWIPE SUPPORT FOR MOBILE
// ==========================================
let touchStartX = 0;
let touchEndX = 0;

function handleMemberSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next member
        nextMember();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - prev member
        prevMember();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const membersSlider = document.querySelector('.members-slider');
    
    if (membersSlider) {
        membersSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        membersSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleMemberSwipe();
        }, { passive: true });
    }
    
    // Same for cube slider
    const cubeContainer = document.querySelector('.cube-container');
    
    if (cubeContainer) {
        cubeContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        cubeContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            
            if (touchEndX < touchStartX - 50) {
                rotateCube();
            }
        }, { passive: true });
    }
});

// ==========================================
// SLIDER INDICATORS (Optional)
// ==========================================
function createMemberIndicators() {
    const membersSlider = document.querySelector('.members-slider');
    if (!membersSlider || memberSlides.length === 0) return;
    
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'slider-indicators';
    
    memberSlides.forEach((slide, index) => {
        const indicator = document.createElement('span');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        
        indicator.addEventListener('click', function() {
            showMemberSlide(index);
            updateIndicators(index);
        });
        
        indicatorsContainer.appendChild(indicator);
    });
    
    membersSlider.appendChild(indicatorsContainer);
}

function updateIndicators(activeIndex) {
    const indicators = document.querySelectorAll('.slider-indicators .indicator');
    indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Override showMemberSlide to update indicators
const originalShowMemberSlide = showMemberSlide;
showMemberSlide = function(index) {
    originalShowMemberSlide(index);
    updateIndicators(index);
};

// Initialize indicators after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(createMemberIndicators, 100);
});