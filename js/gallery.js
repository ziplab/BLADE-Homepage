/**
 * Video-BLADE Homepage Gallery JavaScript
 * Handles image gallery, lightbox, and media interactions
 */

// ==========================================
// Gallery Configuration
// ==========================================
const galleryConfig = {
    lightboxEnabled: true,
    lazyLoading: true,
    keyboardNavigation: true,
    touchGestures: true,
    animationDuration: 300,
    zoomEnabled: true
};

let currentLightboxIndex = 0;
let lightboxImages = [];
let isLightboxOpen = false;
let touchStartX = 0;
let touchStartY = 0;

// ==========================================
// Initialize Gallery
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeImageGallery();
    initializeLightbox();
    initializeLazyLoading();
    setupKeyboardNavigation();
    setupTouchGestures();
    
    console.log('Gallery system initialized');
});

// ==========================================
// Image Gallery Initialization
// ==========================================
function initializeImageGallery() {
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    galleryImages.forEach((img, index) => {
        // Add click event for lightbox
        img.addEventListener('click', function() {
            if (galleryConfig.lightboxEnabled) {
                openLightbox(img, index);
            }
        });
        
        // Add loading states
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.classList.add('error');
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDEzVjE5QzIxIDIwLjEgMjAuMSAyMSAxOSAyMUg1QzMuOSAyMSAzIDIwLjEgMyAxOVY1QzMgMy45IDMuOSAzIDUgM0gxMVYxM0wyMSAxM1oiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTE0IDE2TDEwIDEyTDcgMTZIMTRaIiBmaWxsPSIjOUNBM0FGIi8+CjxjaXJjbGUgY3g9IjE3LjUiIGN5PSI2LjUiIHI9IjEuNSIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
        });
        
        // Store image data for lightbox
        lightboxImages.push({
            src: img.src,
            alt: img.alt,
            caption: img.dataset.caption || img.alt
        });
    });
    
    // Add hover effects
    addHoverEffects();
}

// ==========================================
// Lightbox Functionality
// ==========================================
function initializeLightbox() {
    createLightboxHTML();
    
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const overlay = document.querySelector('.lightbox-overlay');
    
    // Event listeners
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));
    if (overlay) overlay.addEventListener('click', closeLightbox);
    
    // Prevent lightbox content clicks from closing
    const lightboxContent = document.querySelector('.lightbox-content');
    if (lightboxContent) {
        lightboxContent.addEventListener('click', (e) => e.stopPropagation());
    }
}

function createLightboxHTML() {
    const lightboxHTML = `
        <div id="lightbox" class="lightbox">
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">
                    <i class="fas fa-times"></i>
                </button>
                <button class="lightbox-prev" aria-label="Previous image">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="lightbox-next" aria-label="Next image">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="lightbox-image-container">
                    <img class="lightbox-image" src="" alt="" />
                    <div class="lightbox-loading">
                        <div class="loading-spinner"></div>
                    </div>
                </div>
                <div class="lightbox-caption"></div>
                <div class="lightbox-counter"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Add lightbox styles
    addLightboxStyles();
}

function addLightboxStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: none;
            opacity: 0;
            transition: opacity ${galleryConfig.animationDuration}ms ease;
        }
        
        .lightbox.active {
            display: flex;
            opacity: 1;
        }
        
        .lightbox-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
        }
        
        .lightbox-content {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .lightbox-image-container {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            transition: transform 0.3s ease;
        }
        
        .lightbox-loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: none;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .lightbox-close,
        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            font-size: 1.2rem;
        }
        
        .lightbox-close:hover,
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }
        
        .lightbox-close {
            top: 2rem;
            right: 2rem;
        }
        
        .lightbox-prev {
            left: 2rem;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .lightbox-next {
            right: 2rem;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .lightbox-caption {
            position: absolute;
            bottom: 4rem;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            text-align: center;
            background: rgba(0, 0, 0, 0.7);
            padding: 1rem 2rem;
            border-radius: 25px;
            max-width: 80%;
            backdrop-filter: blur(10px);
        }
        
        .lightbox-counter {
            position: absolute;
            top: 2rem;
            left: 2rem;
            color: white;
            background: rgba(0, 0, 0, 0.7);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            backdrop-filter: blur(10px);
        }
        
        /* Mobile styles */
        @media (max-width: 768px) {
            .lightbox-content {
                padding: 1rem;
            }
            
            .lightbox-close,
            .lightbox-prev,
            .lightbox-next {
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
            
            .lightbox-close {
                top: 1rem;
                right: 1rem;
            }
            
            .lightbox-prev {
                left: 1rem;
            }
            
            .lightbox-next {
                right: 1rem;
            }
            
            .lightbox-caption {
                bottom: 2rem;
                padding: 0.75rem 1.5rem;
                font-size: 0.9rem;
            }
            
            .lightbox-counter {
                top: 1rem;
                left: 1rem;
                font-size: 0.8rem;
            }
        }
        
        /* Gallery image hover effects */
        .gallery-img {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .gallery-img:hover {
            transform: scale(1.05);
            filter: brightness(1.1);
        }
        
        .gallery-img.loaded {
            opacity: 1;
        }
        
        .gallery-img.error {
            opacity: 0.5;
            filter: grayscale(100%);
        }
    `;
    
    document.head.appendChild(style);
}

function openLightbox(img, index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxCounter = document.querySelector('.lightbox-counter');
    const lightboxLoading = document.querySelector('.lightbox-loading');
    
    if (!lightbox || !lightboxImage) return;
    
    currentLightboxIndex = index;
    isLightboxOpen = true;
    
    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Show loading spinner
    lightboxLoading.style.display = 'block';
    lightboxImage.style.opacity = '0';
    
    // Load image
    const imageData = lightboxImages[index];
    lightboxImage.src = imageData.src;
    lightboxImage.alt = imageData.alt;
    
    lightboxImage.onload = function() {
        lightboxLoading.style.display = 'none';
        lightboxImage.style.opacity = '1';
    };
    
    // Update caption and counter
    lightboxCaption.textContent = imageData.caption;
    lightboxCounter.textContent = `${index + 1} / ${lightboxImages.length}`;
    
    // Update navigation button states
    updateNavigationButtons();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    isLightboxOpen = false;
    
    // Reset zoom if applied
    const lightboxImage = document.querySelector('.lightbox-image');
    if (lightboxImage) {
        lightboxImage.style.transform = '';
    }
}

function navigateLightbox(direction) {
    const newIndex = currentLightboxIndex + direction;
    
    if (newIndex >= 0 && newIndex < lightboxImages.length) {
        const img = document.querySelectorAll('.gallery-img')[newIndex];
        if (img) {
            openLightbox(img, newIndex);
        }
    }
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (prevBtn) {
        prevBtn.style.opacity = currentLightboxIndex === 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentLightboxIndex === 0 ? 'none' : 'auto';
    }
    
    if (nextBtn) {
        nextBtn.style.opacity = currentLightboxIndex === lightboxImages.length - 1 ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentLightboxIndex === lightboxImages.length - 1 ? 'none' : 'auto';
    }
}

// ==========================================
// Lazy Loading
// ==========================================
function initializeLazyLoading() {
    if (!galleryConfig.lazyLoading) return;
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// Keyboard Navigation
// ==========================================
function setupKeyboardNavigation() {
    if (!galleryConfig.keyboardNavigation) return;
    
    document.addEventListener('keydown', function(e) {
        if (!isLightboxOpen) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateLightbox(1);
                break;
        }
    });
}

// ==========================================
// Touch Gestures
// ==========================================
function setupTouchGestures() {
    if (!galleryConfig.touchGestures) return;
    
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    lightbox.addEventListener('touchstart', function(e) {
        if (!isLightboxOpen) return;
        
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    lightbox.addEventListener('touchend', function(e) {
        if (!isLightboxOpen) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchStartX - touchEndX;
        const deltaY = touchStartY - touchEndY;
        
        // Horizontal swipe
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                navigateLightbox(1); // Swipe left, go to next
            } else {
                navigateLightbox(-1); // Swipe right, go to previous
            }
        }
        
        // Vertical swipe down to close
        if (deltaY < -100) {
            closeLightbox();
        }
    });
}

// ==========================================
// Hover Effects
// ==========================================
function addHoverEffects() {
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.filter = 'brightness(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'brightness(1)';
        });
    });
}

// ==========================================
// Utility Functions
// ==========================================
function preloadImages() {
    lightboxImages.forEach(imageData => {
        const img = new Image();
        img.src = imageData.src;
    });
}

// Preload images for better performance
setTimeout(preloadImages, 1000);

// ==========================================
// Export for testing
// ==========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openLightbox,
        closeLightbox,
        navigateLightbox
    };
}