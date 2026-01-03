// ==============================================
// PAGE TRANSITION WITH LOADER - Walking Person Finding Home
// ==============================================

(function() {
    'use strict';
    
    let isTransitioning = false;
    
    // ==========================================
    // HIDE LOADER IMMEDIATELY WHEN DOM READY
    // ==========================================
    function hideLoader() {
        const loader = document.querySelector('.page-loader');
        const body = document.body;
        
        if (loader) {
            loader.classList.add('hidden');
        }
        if (body) {
            body.classList.add('page-loaded');
        }
    }
    
    // ==========================================
    // INITIALIZE ON DOM READY
    // ==========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        const body = document.body;
        const loader = document.querySelector('.page-loader');
        
        // Hide loader after a short delay (ensures smooth appearance)
        setTimeout(hideLoader, 1000);
        
        // Fallback: Force hide after 2 seconds
        setTimeout(function() {
            if (loader && !loader.classList.contains('hidden')) {
                console.log('Forcing loader hide (fallback)');
                hideLoader();
            }
        }, 2000);
        
        // Also hide on window load (for slow connections)
        window.addEventListener('load', function() {
            setTimeout(hideLoader, 300);
        });
        
        // ==========================================
        // HANDLE LINK CLICKS
        // ==========================================
        const links = document.querySelectorAll('a');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                // Prevent if already transitioning
                if (isTransitioning) {
                    e.preventDefault();
                    return;
                }
                
                const href = this.getAttribute('href');
                
                // Skip if:
                // - External link
                // - Anchor link
                // - Opens in new tab
                // - No href
                // - Special links (mailto, tel, etc)
                if (
                    !href || 
                    href === '#' ||
                    href.startsWith('#') || 
                    href.startsWith('mailto:') || 
                    href.startsWith('tel:') ||
                    href.startsWith('javascript:') ||
                    this.target === '_blank' ||
                    this.hostname !== window.location.hostname
                ) {
                    return;
                }
                
                // Prevent default and start transition
                e.preventDefault();
                isTransitioning = true;
                
                // Show loader
                if (loader) {
                    loader.classList.remove('hidden');
                }
                
                // Fade out page
                if (body) {
                    body.classList.remove('page-loaded');
                    body.classList.add('page-transition');
                }
                
                // Navigate after short delay
                setTimeout(function() {
                    window.location.href = href;
                }, 1000);
            });
        });
        
        // ==========================================
        // HANDLE BROWSER BACK/FORWARD
        // ==========================================
        window.addEventListener('pageshow', function(event) {
            if (event.persisted) {
                // Page loaded from cache
                isTransitioning = false;
                hideLoader();
            }
        });
        
        // Reset transitioning flag on page hide
        window.addEventListener('pagehide', function() {
            isTransitioning = false;
        });
    }
    
})();