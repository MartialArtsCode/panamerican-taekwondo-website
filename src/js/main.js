// Panamerican Taekwondo Academy - Main JavaScript
// This file contains the JavaScript code for the website, handling interactivity and functionality.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Panamerican Taekwondo Academy website is ready!');

    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Contact form validation and handling
    initContactForm();
    
    // Mobile menu toggle (if needed in future)
    initMobileMenu();
});

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip empty or just # links
            if (!href || href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize contact form validation and submission
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!validateForm(name, email, message)) {
            return;
        }
        
        // In a real implementation, you would send this to a backend
        // For now, we'll just show a success message
        handleFormSubmission(name, email, phone, message);
    });
}

/**
 * Validate form inputs
 */
function validateForm(name, email, message) {
    // Name validation
    if (name.length < 2) {
        alert('Please enter a valid name (at least 2 characters).');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Message validation
    if (message.length < 10) {
        alert('Please enter a message (at least 10 characters).');
        return false;
    }
    
    return true;
}

/**
 * Handle form submission
 */
function handleFormSubmission(name, email, phone, message) {
    // Create mailto link as a fallback contact method
    const subject = encodeURIComponent('Contact Form Submission from ' + name);
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || 'Not provided'}\n\n` +
        `Message:\n${message}`
    );
    
    const mailtoLink = `mailto:panamericantkd22@gmail.com?subject=${subject}&body=${body}`;
    
    // Show success message
    alert('Thank you for your message! Your default email client will open to send your inquiry.');
    
    // Open mailto link
    window.location.href = mailtoLink;
    
    // Reset form
    document.getElementById('contactForm').reset();
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    // This can be expanded in the future if a mobile hamburger menu is needed
    // For now, the navigation is responsive with CSS
    
    // Add active class to current section in viewport
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}