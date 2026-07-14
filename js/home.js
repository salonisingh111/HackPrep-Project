/**
 * home.js
 * 
 * Main JavaScript file for the HackPrep Home Page.
 * Handles interactive elements such as the theme toggle, Login Modal, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // === Login Modal Functionality ===
    const loginModal = document.getElementById('homeLoginModal');
    const protectedLinks = document.querySelectorAll('.home-protected');
    const modalCloseBtn = document.querySelector('.home-modal-close');
    const bodyElement = document.body;

    // Open modal when any protected feature is clicked
    protectedLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default navigation
            openModal();
        });
    });

    // Close modal when close button is clicked
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking on the overlay (outside the modal content)
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                closeModal();
            }
        });
    }

    // Close modal on escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginModal.classList.contains('active')) {
            closeModal();
        }
    });

    function openModal() {
        if (loginModal) {
            loginModal.classList.add('active');
            bodyElement.classList.add('home-modal-open');
        }
    }

    function closeModal() {
        if (loginModal) {
            loginModal.classList.remove('active');
            bodyElement.classList.remove('home-modal-open');
        }
    }


    // === Form Submission (Prevent Default) ===
    const loginForm = document.querySelector('.home-modal-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Typically you would handle authentication here.
            // For now, it just prevents page reload.
            console.log("Login submitted");
        });
    }

    // === Theme Toggle Functionality (Optional/Basic) ===
    const themeToggleBtn = document.querySelector('.home-theme-toggle');
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            console.log("Theme toggle clicked");
            // Theme toggling logic would go here
        });
    }


    // === Scroll Animations & Navbar Glass Effect ===
    const navbar = document.querySelector('.home-navbar');
    
    // Check scroll position on load and scroll
    function checkScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Init on load


    // Intersection Observer for fade/slide animations
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                // Apply optional delay if defined in data-delay attribute
                const delay = el.getAttribute('data-delay');
                if (delay) {
                    el.style.transitionDelay = delay;
                }
                
                el.classList.add('home-animate-visible');
                
                // Unobserve after animating if you only want it to happen once
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly offset the trigger point
    });
    
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
});
