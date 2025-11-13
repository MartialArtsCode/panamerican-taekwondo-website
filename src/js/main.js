/**
 * Panamerican Taekwondo Academy - Main JavaScript
 * Handles website interactivity and functionality
 * @version 1.0.0
 */

'use strict';

/**
 * Initialize the website when DOM is ready
 */
const initWebsite = () => {
    try {
        console.log('Panamerican Taekwondo Academy - Website initialized');

        // Initialize mobile navigation
        initMobileNavigation();

        // Initialize form validation
        initFormValidation();

        // Initialize smooth scrolling
        initSmoothScrolling();
    } catch (error) {
        console.error('Error initializing website:', error);
    }
};

/**
 * Initialize mobile navigation toggle functionality
 */
const initMobileNavigation = () => {
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });
    }
};

/**
 * Initialize form validation for contact forms
 */
const initFormValidation = () => {
    const forms = document.querySelectorAll('.contact-form');

    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!validateForm(form)) {
                event.preventDefault();
            }
        });
    });
};

/**
 * Validate form fields
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
const validateForm = form => {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
};

/**
 * Initialize smooth scrolling for anchor links
 */
const initSmoothScrolling = () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href');

            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    event.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
};

// Initialize website when DOM is ready
document.addEventListener('DOMContentLoaded', initWebsite);
