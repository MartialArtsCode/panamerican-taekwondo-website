// Panamerican Taekwondo Academy - Professional Dynamic Landing Page

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🥋 Panamerican Taekwondo Academy - Website Loaded');
    
    // Initialize all features
    initSmoothScrolling();
    initScrollAnimations();
    initButtonTracking();
    initHoverEffects();
    initMobileMenu();
    addDynamicStyles();
    initParticleEffect();
    initHeaderAnimation();
});

/**
 * Enable smooth scrolling for internal links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * Add animations when elements come into view
 */
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Add staggered animation for buttons
                const buttons = entry.target.querySelectorAll('.glassy-button');
                buttons.forEach((btn, index) => {
                    setTimeout(() => {
                        btn.style.animation = `fadeInUp 0.6s ease forwards`;
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

/**
 * Track button clicks for analytics
 */
function initButtonTracking() {
    const buttons = document.querySelectorAll('.glassy-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const buttonHref = this.getAttribute('href');
            
            // Log click event
            console.log(`✅ Button clicked: ${buttonText}`, {
                href: buttonHref,
                timestamp: new Date().toISOString()
            });
            
            // Add success animation
            this.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
}

/**
 * Add enhanced hover effects to buttons
 */
function initHoverEffects() {
    const buttons = document.querySelectorAll('.glassy-button');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add 3D tilt effect on mouse move
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav, .nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            const isExpanded = nav.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/**
 * Add dynamic styles and animations
 */
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        .particle {
            position: fixed;
            background: radial-gradient(circle, rgba(204, 31, 43, 0.4), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            filter: blur(2px);
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0.2;
            }
            50% {
                transform: translateY(-30px) translateX(15px);
                opacity: 0.5;
            }
        }
        
        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 5px rgba(204, 31, 43, 0.3);
            }
            50% {
                box-shadow: 0 0 20px rgba(204, 31, 43, 0.6);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Add subtle particle/glow effects to background
 */
function initParticleEffect() {
    const particleCount = 15;
    const body = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 80 + 40;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 4 + 3}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        body.appendChild(particle);
    }
}

/**
 * Add dynamic header animation
 */
function initHeaderAnimation() {
    const header = document.querySelector('header h1');
    if (header) {
        // Add subtle breathing glow effect
        setInterval(() => {
            header.style.animation = 'glow 3s ease-in-out infinite';
        }, 100);
    }
}

/**
 * Add parallax scrolling effect
 */
function initParallaxEffect() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', debounce(function() {
        const scrolled = window.pageYOffset;
        
        sections.forEach((section, index) => {
            const speed = (index + 1) * 0.1;
            section.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 10));
}

/**
 * Form validation utility
 */
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            input.style.borderColor = '#cc1f2b';
        } else {
            input.classList.remove('error');
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

/**
 * Utility: Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Add loading animation
 */
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Export utilities for use in other scripts
window.PTAcademy = {
    validateForm,
    debounce
};

console.log('✨ All features initialized successfully!');
