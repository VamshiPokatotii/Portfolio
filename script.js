// Portfolio JavaScript - Interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');

    mobileMenuBtn.addEventListener('click', function() {
        const isActive = mobileNavMenu.classList.contains('active');
        
        if (isActive) {
            mobileNavMenu.classList.remove('active');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        } else {
            mobileNavMenu.classList.add('active');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }
    });

    // Smooth Scrolling for Navigation Links
    function scrollToSection(href) {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu if open
        mobileNavMenu.classList.remove('active');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }

    // Add event listeners to all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('data-href');
            scrollToSection(href);
        });
    });

    // Add event listeners to hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('data-href');
            if (href) {
                scrollToSection(href);
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const type = formData.get('type');
        const message = formData.get('message');

        // Basic form validation
        if (!name || !email || !type || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Create mailto link with form data
            const subject = encodeURIComponent(${type}: ${name});
            const body = encodeURIComponent(Name: ${name}\nEmail: ${email}\nType: ${type}\n\nMessage:\n${message});
            const mailtoLink = mailto:vamshipokatoti@gmail.com?subject=${subject}&body=${body};
            
            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            showNotification('Message sent! Thank you for reaching out. I\'ll get back to you soon.', 'success');

            // Reset form
            contactForm.reset();
        } catch (error) {
            showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });

    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = notification notification-${type};
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            max-width: 400px;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            ${type === 'success' 
                ? 'background-color: #10b981; color: white;' 
                : type === 'error' 
                ? 'background-color: #ef4444; color: white;' 
                : 'background-color: #3b82f6; color: white;'
            }
        `;

        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        `;

        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.8;
            transition: opacity 0.2s ease;
        `;

        notification.querySelector('.notification-close').addEventListener('mouseenter', function() {
            this.style.opacity = '1';
        });

        notification.querySelector('.notification-close').addEventListener('mouseleave', function() {
            this.style.opacity = '0.8';
        });

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Scroll-based animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animateElements = document.querySelectorAll('.card-hover, .skill-category, .project-card');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });

    // Typing effect for hero quote (optional enhancement)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Uncomment to enable typing effect on hero quote
    // const heroQuote = document.querySelector('.hero-quote');
    // if (heroQuote) {
    //     const quoteText = heroQuote.textContent;
    //     setTimeout(() => {
    //         typeWriter(heroQuote, quoteText, 80);
    //     }, 1000);
    // }

    // Active navigation indicator based on scroll position
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current section's nav link
                document.querySelectorAll([data-href="#${sectionId}"]).forEach(link => {
                    link.classList.add('active');
                });
            }
        });
    }

    // Add active navigation styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--blue-accent) !important;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Initialize active navigation on page load
    updateActiveNavigation();

    // Smooth reveal animation for elements on scroll
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    // Add reveal class to elements that should animate
    document.querySelectorAll('.highlight-item, .education-card, .skill-category, .project-card')
        .forEach(element => {
            element.classList.add('reveal');
        });

    // Add CSS for reveal animation
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.6s ease-out;
        }
        
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyle);

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Parallax effect for hero background (optional)
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = translateY(${scrolled * speed}px);
        });
    }

    // Uncomment to enable parallax effect
    // window.addEventListener('scroll', parallaxEffect);

    console.log('Portfolio JavaScript loaded successfully!');
});

// Utility function to handle external links
function handleExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto"], a[href^="tel"]');
    
    externalLinks.forEach(link => {
        if (link.href.startsWith('http')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// Initialize external links handling
handleExternalLinks();