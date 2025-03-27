// Custom Cursor Animation
const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Update cursor position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    // Main cursor with faster animation
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    requestAnimationFrame(animateCursor);
}

// Start cursor animation
animateCursor();

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .school-card, .feature-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });

    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });

    element.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });

    element.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
});

// Counter Animation
const animateCounter = (counter, target) => {
    const duration = 2000; // Animation duration in milliseconds
    const steps = 50; // Number of steps in the animation
    const stepDuration = duration / steps;
    let currentValue = 0;
    const increment = target / steps;

    const updateCounter = () => {
        currentValue += increment;
        if (currentValue >= target) {
            counter.textContent = target;
            counter.classList.add('animate');
        } else {
            counter.textContent = Math.floor(currentValue);
            setTimeout(updateCounter, stepDuration);
        }
    };

    updateCounter();
};

// Intersection Observer for counters
const observeCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                entry.target.classList.add('counted');
                animateCounter(entry.target, target);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
};

// Initialize counter animations
document.addEventListener('DOMContentLoaded', () => {
    observeCounters();
});

// Image Carousel
const imageSlider = document.querySelector('.carousel-slider');
const imageSlides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dotsContainer = document.querySelector('.carousel-dots');
let currentSlide = 0;
let slideInterval;

// Create dots
imageSlides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dot');

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    imageSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
    resetInterval();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % imageSlides.length;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + imageSlides.length) % imageSlides.length;
    goToSlide(currentSlide);
}

function startInterval() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

prevBtn.addEventListener('click', () => {
    prevSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
});

// Start the carousel
startInterval();

// Pause on hover
imageSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

imageSlider.addEventListener('mouseleave', () => {
    startInterval();
});

// Touch support
let touchStartX = 0;
let touchEndX = 0;

imageSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

imageSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    }
}

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animation for Elements
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    fadeObserver.observe(section);
});

// Dynamic Triangle Background
const heroTriangle = document.querySelector('.hero-triangle');
let triangleWidth = window.innerWidth;

window.addEventListener('resize', () => {
    triangleWidth = window.innerWidth;
    updateTriangle();
});

function updateTriangle() {
    heroTriangle.style.borderLeftWidth = `${triangleWidth / 2}px`;
    heroTriangle.style.borderRightWidth = `${triangleWidth / 2}px`;
}

updateTriangle();

// School Cards Hover Effect
document.querySelectorAll('.school-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('fade-in');
        });
    });
});

// Program Showcase Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.querySelector('.carousel-track');
    if (!carouselTrack) return; // Exit if not on the SSE page

    const cards = Array.from(document.querySelectorAll('.program-card'));
    const prevBtn = document.querySelector('.carousel-nav-btn.prev');
    const nextBtn = document.querySelector('.carousel-nav-btn.next');
    
    let currentIndex = 0;

    function updateCarousel() {
        cards.forEach((card, index) => {
            // Remove all position classes
            card.classList.remove('main', 'left', 'left-far', 'right', 'right-far');
            
            // Calculate position relative to current card
            const position = (index - currentIndex + cards.length) % cards.length;
            
            // Add appropriate class based on position
            if (position === 0) {
                card.classList.add('main');
            } else if (position === 1) {
                card.classList.add('right');
            } else if (position === 2) {
                card.classList.add('right-far');
            } else if (position === cards.length - 1) {
                card.classList.add('left');
            } else {
                card.classList.add('left-far');
            }
        });
    }

    function moveNext() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }

    function movePrev() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }

    // Initialize carousel
    updateCarousel();

    // Add click handlers for navigation buttons
    nextBtn.addEventListener('click', moveNext);
    prevBtn.addEventListener('click', movePrev);

    // Auto rotate functionality
    let autoRotateInterval = setInterval(moveNext, 3000);

    // Pause on hover
    carouselTrack.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });

    carouselTrack.addEventListener('mouseleave', () => {
        autoRotateInterval = setInterval(moveNext, 3000);
    });

    // Add click handler for cards
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const steps = (index - currentIndex + cards.length) % cards.length;
            currentIndex = index;
            updateCarousel();
            // Reset auto-rotation
            clearInterval(autoRotateInterval);
            autoRotateInterval = setInterval(moveNext, 3000);
        });
    });
});

// School Cards Download Functionality
document.querySelectorAll('.school-card .download-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const school = e.target.closest('.school-card').getAttribute('data-school');
        const brochureUrls = {
            'sse': '/Current/Brochures/SSE Booklet-2.pdf',
            'sba': '/Current/Brochures/SBA Booklet-2.pdf',
            'ssah': '/Current/Brochures/SSAH Booklet-2.pdf'
        };
        
        // Create a temporary link to trigger the download
        const link = document.createElement('a');
        link.href = brochureUrls[school];
        link.download = `${school.toUpperCase()}-Brochure.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

// Add hover effect for school cards
document.querySelectorAll('.school-card').forEach(card => {
    const content = card.querySelector('.content');
    const effect = card.querySelector('.effect');
    
    card.addEventListener('mouseenter', () => {
        content.style.transform = 'translateY(-10px)';
        effect.style.transform = 'translateY(0)';
    });
    
    card.addEventListener('mouseleave', () => {
        content.style.transform = 'translateY(0)';
        effect.style.transform = 'translateY(100%)';
    });
});

// Replace the existing accreditation carousel code
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.accreditation-track');
    const items = document.querySelectorAll('.accreditation-item');
    const prevBtn = document.querySelector('.accreditation-nav.prev');
    const nextBtn = document.querySelector('.accreditation-nav.next');
    
    if (!track || !items.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const totalItems = items.length;
    let autoPlayInterval;

    function updateCarousel(direction = null) {
        // Calculate the maximum valid index (ensuring we show 2 items)
        const maxIndex = Math.max(0, totalItems - 2);
        
        // Ensure currentIndex stays within bounds
        if (currentIndex > maxIndex) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = maxIndex;
        }

        const translateX = -currentIndex * 50; // Move by 50% (2 items at a time)
        
        if (direction !== 'wrap') {
            track.style.transition = 'transform 0.5s ease';
        } else {
            track.style.transition = 'none';
        }
        
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update visibility of navigation buttons on mobile only
        if (window.innerWidth <= 768) {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }

    function moveCarousel(direction) {
        if (direction === 'next') {
            currentIndex += 2;
            if (currentIndex >= totalItems) {
                currentIndex = 0;
            }
        } else {
            currentIndex -= 2;
            if (currentIndex < 0) {
                currentIndex = Math.max(0, totalItems - 2);
            }
        }
        updateCarousel();
    }

    // Auto-play functionality
    function startAutoPlay() {
        stopAutoPlay(); // Clear any existing interval
        autoPlayInterval = setInterval(() => {
            moveCarousel('next');
        }, 3000); // Change slides every 3 seconds
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    // Event listeners for buttons
    prevBtn.addEventListener('click', () => {
        moveCarousel('prev');
        stopAutoPlay();
        startAutoPlay(); // Restart auto-play after manual interaction
    });

    nextBtn.addEventListener('click', () => {
        moveCarousel('next');
        stopAutoPlay();
        startAutoPlay(); // Restart auto-play after manual interaction
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        
        if (touchStartX - touchEndX > 50) {
            moveCarousel('next');
        } else if (touchEndX - touchStartX > 50) {
            moveCarousel('prev');
        }
        
        startAutoPlay(); // Restart auto-play after touch interaction
    });

    // Pause auto-play on hover
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Show/hide navigation buttons based on screen size
    function updateNavButtons() {
        if (window.innerWidth > 768) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            track.style.transform = 'translateX(0)';
            currentIndex = 0;
        } else {
            updateCarousel();
        }
    }

    // Listen for window resize
    window.addEventListener('resize', updateNavButtons);
    
    // Initial setup
    updateCarousel();
    startAutoPlay();
}); 